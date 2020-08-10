import React,{ChangeEvent,MouseEvent,useEffect,useState}  from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootDispatcher} from "../store/root-dispatcher";
import {Button,Form,Row,Col} from 'react-bootstrap';
import {countryData} from '../constants/Constants';

interface UserDetailProps {
   userName: string;
   handleUserName: (e: ChangeEvent<HTMLInputElement>)=>void;
   handleRoleChange: (e: ChangeEvent<HTMLInputElement>)=>void;
   handleMobileChange: (e: ChangeEvent<HTMLInputElement>)=>void;
   handleEmailChange : (e: ChangeEvent<HTMLInputElement>)=>void;
   handleCountryChange: (e: ChangeEvent<HTMLInputElement>)=>void;
   email: string;
   role: string;
   mobile:string;
   country:string;
   isEdittable:boolean;
   emailValid:boolean;
   userValid:boolean;
   roleValid:boolean;
   mobileValid:boolean;

}


const UserDetailComponent :React.FC<UserDetailProps> = (props) =>{
	
	
	const dispatch = useDispatch();
	
    const rootDispatcher = new RootDispatcher(dispatch);
    const [plainView,setPlainView] = useState({notEditable:"",
    											readOnly:"",
    											emailValid:"",
    											userValid:"",
    											roleValid:"",
    											mobileValid:""});


    useEffect(()=>{
		let isEdittable = props.isEdittable;
	    setPlainView({notEditable:isEdittable?"plainView":"", 
	    			readOnly:isEdittable?"readOnly":"",
	    			emailValid:props.emailValid?"":"error",
    				userValid:props.userValid?"":"error",
    				roleValid:props.roleValid?"":"error",
    				mobileValid:props.mobileValid?"":"error"});

    },[props.userValid,props.emailValid,props.roleValid,props.mobileValid,props.isEdittable]);


	return (

		<div className="borderContainer">
		<Form >
			<Form.Group as={Row} controlId="formHorizontalName">
		    <Form.Label column sm={4}>
		      Full Name
		    </Form.Label>
		    <Col sm={8}>

			<Form.Control className={plainView.notEditable +' '+plainView.userValid}  type="text" placeholder="Name" value={props.userName} onChange={props.handleUserName} required/>
		    </Col>
		  </Form.Group>

		  <Form.Group as={Row} controlId="formHorizontalEmail">
		    <Form.Label column sm={4}>
		      Email
		    </Form.Label>
		    <Col sm={8}>
		      <Form.Control className={plainView.notEditable +' '+plainView.emailValid} type="email" placeholder="Email" value={props.email} onChange={props.handleEmailChange}/>
		    </Col>
		  </Form.Group>

		  <Form.Group as={Row} controlId="formHorizontalRole">
		    <Form.Label column sm={4}>
		      Role
		    </Form.Label>
		    <Col sm={8}>
		      <Form.Control className={plainView.notEditable +' '+plainView.roleValid} type="text" placeholder="Role" value={props.role} onChange={props.handleRoleChange}/>
		    </Col>
		  </Form.Group>

		  <Form.Group as={Row}>
		    <Form.Label column sm={4}>
		      Mobile 
		    </Form.Label>
		    <Col sm={8}>
		      <Form.Control className={plainView.notEditable +' '+plainView.mobileValid} type="text" placeholder="Mobile" value={props.mobile} onChange={props.handleMobileChange}/>
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
		        className ={plainView.notEditable}
		        id="inlineFormCustomSelect"	onChange={props.handleCountryChange}>
		      {

		      	countryData.map((item)=> {
		         return <option key={item.code} value={item.name}>{item.name}</option>
		      	})
		      }
		      </Form.Control>):(
		      <Form.Control className ={plainView.notEditable} type="text" placeholder="Name" value={props.country}/>
		      )}
		    </Col>
		  </Form.Group>		 
		</Form>
		</div>


		)
}

export default UserDetailComponent;