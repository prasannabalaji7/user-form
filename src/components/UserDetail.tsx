import React,{ChangeEvent,MouseEvent,useEffect,useState}  from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootDispatcher} from "../store/root-dispatcher";
import {Button,Form,Row,Col} from 'react-bootstrap';
import {countryData} from '../constants/Constants';

interface UserDetailProps {
   userName: string;
   email: string;
   role: string;
   mobile:string;
   country:string;
   isEdittable:boolean;
   formValid:boolean;
   handleUserName: (e: ChangeEvent<HTMLInputElement>)=>void;
   handleRoleChange: (e: ChangeEvent<HTMLInputElement>)=>void;
   handleMobileChange: (e: ChangeEvent<HTMLInputElement>)=>void;
   handleEmailChange : (e: ChangeEvent<HTMLInputElement>)=>void;
   handleCountryChange: (e: ChangeEvent<HTMLInputElement>)=>void;
   
}



const UserDetailComponent :React.FC<UserDetailProps> = (props) =>{


	const dispatch = useDispatch();
	
    const rootDispatcher = new RootDispatcher(dispatch);
    const [valid,setValid] = useState({notEditable:"",
    											readOnly:false,
    											emailValid:"",
    											userValid:"",
    											roleValid:"",
    											mobileValid:"",
    											formValid:false});


	function validate(field:string) {

	switch(field){
		case "userName":
		{
			let lettersOnly = new RegExp('^[a-zA-Z_ ]*$', 'i');
			if (lettersOnly.test(props.userName)) {
			      setValid((state)=>({...state,userValid:""}));
			    } else {
			      setValid((state)=>({...state,userValid:"is-invalid"}));
			    }
		}
		case "email":
		{
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(props.email)) {
		      setValid((state)=>({...state,emailValid:""}));
		    } else {
		      setValid((state)=>({...state,emailValid:"is-invalid"}));
		    }			
		}
		case "role":
		{
			let lettersOnly = new RegExp('^[a-zA-Z_ ]*$', 'i');
			if (lettersOnly.test(props.role)) {
			      setValid((state)=>({...state,roleValid:""}));
			    } else {
			      setValid((state)=>({...state,roleValid:"is-invalid"}));
			    }
		}
		case "mobile":
		{
			let  mobilecode = countryData.filter(item => item.name === props.country)[0].value;
			if (/^\+[1-9]{1}[0-9]{7,11}$/.test(props.mobile) && props.mobile.startsWith("+"+mobilecode)) {
		      setValid((state)=>({...state,mobileValid:""}));
		    } else {
		      setValid((state)=>({...state,mobileValid:"is-invalid"}));
		    }
			
		}
		default : 
		{
			setValid((state)=>({...state}));
		}
	}
}

	useEffect(()=>{
		if(!valid.emailValid && !valid.userValid && !valid.roleValid && !valid.mobileValid){
			rootDispatcher.validateSubmit(valid.formValid);
		}

	},[valid.emailValid,valid.userValid,valid.roleValid,valid.mobileValid]);

    useEffect(()=>{		
    	validate("userName");
    },[props.userName]);

    useEffect(()=>{
    	validate("email");
    },[props.email]);

     useEffect(()=>{
     	validate("role");
    },[props.role]);

     useEffect(()=>{
     	validate("mobile")
     },[props.mobile]);

     useEffect(()=>{
     	validate("mobile")
     },[props.country]);

     useEffect(()=>{
     	if(props.isEdittable) {
     		setValid((state)=>({...state,notEditable:"plainView",readOnly:true}));
     	}else{     		
     		setValid((state)=>({...state,notEditable:"",readOnly:false}));
     	}

     },[props.isEdittable]);




	return (

		<div className="borderContainer">
		<Form >
			<Form.Group as={Row} controlId="formHorizontalName">
		    <Form.Label column sm={4}>
		      Full Name
		    </Form.Label>
		    <Col sm={8}>

			<Form.Control className={valid.notEditable+' '+valid.userValid}  readOnly={valid.readOnly} type="text" placeholder="Name" value={props.userName} onChange={props.handleUserName} required/>
			{ (valid.userValid) && <Form.Control.Feedback className ="d-block" type="invalid">
	            please enter a valid only alphabets
	      		</Form.Control.Feedback>
	      	}
		    </Col>
		    
		  </Form.Group>
		  

		  <Form.Group as={Row} controlId="formHorizontalEmail">
		    <Form.Label column sm={4}>
		      Email
		    </Form.Label>
		    <Col sm={8}>
		      <Form.Control className={valid.notEditable +' '+valid.emailValid} readOnly={valid.readOnly} type="email" placeholder="Email" value={props.email} onChange={props.handleEmailChange}/>
		      { (valid.emailValid) && <Form.Control.Feedback className ="d-block" type="invalid">
	            	please enter email in email@domain.com format
	      		</Form.Control.Feedback>
	      	}
		    </Col>
		  </Form.Group>

		  <Form.Group as={Row} controlId="formHorizontalRole">
		    <Form.Label column sm={4}>
		      Role
		    </Form.Label>
		    <Col sm={8}>
		      <Form.Control className={valid.notEditable +' '+valid.roleValid} readOnly={valid.readOnly} type="text" placeholder="Role" value={props.role} onChange={props.handleRoleChange}/>
		      { (valid.roleValid) && <Form.Control.Feedback className ="d-block" type="invalid">
	            please enter a valid only alphabets
	      		</Form.Control.Feedback>
	      	  }
		    </Col>
		  </Form.Group>

		  <Form.Group as={Row}>
		    <Form.Label column sm={4}>
		      Mobile 
		    </Form.Label>
		    <Col sm={8}>
		      <Form.Control className={valid.notEditable +' '+valid.mobileValid} readOnly={valid.readOnly} type="text" placeholder="Mobile" value={props.mobile} onChange={props.handleMobileChange}/>
		      { (valid.mobileValid) && <Form.Control.Feedback className ="d-block" type="invalid">
	            please apply correct country code and number
	      		</Form.Control.Feedback>
	      	  }
		    </Col>
		  </Form.Group>

		  <Form.Group as={Row} controlId="formHorizontalCountry">
		    <Form.Label column sm={4}>
		      Country 
		    </Form.Label>
		    <Col sm={8}>
		    	{(!props.isEdittable) ? (
		       <Form.Control
		        as="select"
		        className ={valid.notEditable}
		        readOnly={valid.readOnly}
		        id="inlineFormCustomSelect"	onChange={props.handleCountryChange}>
		      {

		      	countryData.map((item)=> {
		         return <option key={item.code} value={item.name}>{item.name}</option>
		      	})
		      }
		      </Form.Control>):(
		      <Form.Control className ={valid.notEditable} type="text" placeholder="Name" value={props.country}/>
		      )}
		    </Col>
		  </Form.Group>		 
		</Form>
		</div>


		)
}

export default UserDetailComponent;