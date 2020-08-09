import React,{ChangeEvent,MouseEvent,useEffect,useState}  from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootDispatcher} from "../store/root-dispatcher";
import {Button,Form,Row,Col} from 'react-bootstrap';
import {countryData} from '../constants/Constants';

interface StateProps {
   fullName?: string;
   email?: string;
   role ?: string;
   mobile?:string;
   country?:string;
   isEdittable:boolean;
}

const FormComponent :React.FC<StateProps> = (props) =>{

	const dispatch = useDispatch();

    const rootDispatcher = new RootDispatcher(dispatch);

    const [plainView,setPlainView] = useState({});

    useEffect(() => {
		let isEdittable = props.isEdittable;
	    setPlainView({className:isEdittable?"plainView":"",readOnly:isEdittable?"readOnly":""})
	    },
	    [ props.isEdittable ]
	  );



	return (

		<div className="borderContainer">
		<Form >
			<Form.Group as={Row} controlId="formHorizontalName">
		    <Form.Label column sm={4}>
		      Full Name
		    </Form.Label>
		    <Col sm={8}>

		      <Form.Control {...plainView} type="text" placeholder="Name" value={props.fullName} onChange={(e: ChangeEvent<HTMLInputElement>) => {

                           rootDispatcher.nameChange(e.target.value)}

                       } required/>
		    </Col>
		  </Form.Group>
		  <Form.Group as={Row} controlId="formHorizontalEmail">
		    <Form.Label column sm={4}>
		      Email
		    </Form.Label>
		    <Col sm={8}>
		      <Form.Control {...plainView} type="email" placeholder="Email" value={props.email} onChange={(e: ChangeEvent<HTMLInputElement>) => {

                           rootDispatcher.emailChange(e.target.value)}

                       }/>
		    </Col>
		  </Form.Group>

		  <Form.Group as={Row} controlId="formHorizontalRole">
		    <Form.Label column sm={4}>
		      Role
		    </Form.Label>
		    <Col sm={8}>
		      <Form.Control {...plainView} type="text" placeholder="Role" value={props.role} onChange={(e: ChangeEvent<HTMLInputElement>) => {

                           rootDispatcher.roleChange(e.target.value)}

                       }/>
		    </Col>
		  </Form.Group>

		  <Form.Group as={Row}>
		    <Form.Label column sm={4}>
		      Mobile 
		    </Form.Label>
		    <Col sm={8}>
		      <Form.Control {...plainView} type="text" placeholder="Mobile" value={props.mobile} onChange={(e: ChangeEvent<HTMLInputElement>) => {

                           rootDispatcher.numberChange(e.target.value)}

                       }/>
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
		        {...plainView}
		        id="inlineFormCustomSelect"	onChange={(e: ChangeEvent<HTMLInputElement>) => {
		        			const data = {
		        				country:e.target.value,
		        				mobilecode : countryData.filter(item=>item.name===e.target.value)[0].value
		        			}

                           rootDispatcher.countryChange(data.country,data.mobilecode)}
                       }>
		      {

		      	countryData.map((item)=> {
		         return <option key={item.code} value={item.name}>{item.name}</option>
		      	})
		      }
		      </Form.Control>):(
		      <Form.Control {...plainView} type="text" placeholder="Name" value={props.country}/>
		      )}
		    </Col>
		  </Form.Group>
		 
		  <Form.Group as={Row}>
		    <Col sm={6}>
		      <Button type="submit" className="btn-block" onClick={(e: MouseEvent<HTMLInputElement>) => {
		      				e.preventDefault();	
                           rootDispatcher.onEdit(props.isEdittable)}

                       }>{props.isEdittable?'Edit':'Submit'}</Button>
		    </Col>
		    <Col sm={6}>
		      <Button className="btn-block" variant="secondary">Home</Button>
		    </Col>
		  </Form.Group>
		</Form>
		</div>


		)
}

export default FormComponent;