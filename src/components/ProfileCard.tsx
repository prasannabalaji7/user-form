import React from 'react';
import {Card, Button, Image,ListGroupItem,ListGroup} from 'react-bootstrap';

interface StateProps {
   fullName?: string;
   email?: string;
   role ?: string;
   mobile?:string;
   country?:string;
   isEdittable:boolean;
}

const ProfileCard :React.FC<StateProps> = (props) =>{


	return (

		<div className="borderContainer">
       <Card className="card text-center w-75">
		  <Card.Body>
		    <Image src="https://i.stack.imgur.com/YQu5k.png" alt="laugh" roundedCircle/>
		  	<ListGroup className="list-group-flush borderless">
			    <ListGroupItem className ="borderless h5">{props.fullName}</ListGroupItem>
			    <ListGroupItem className ="borderless">{props.role}</ListGroupItem>
			    <ListGroupItem className ="borderless">{props.country}</ListGroupItem>
			  </ListGroup>
			{(!props.isEdittable) && 
			<div>
		   	<label className="custom-file-input btn btn-outline-primary" htmlFor="Upload" /> 
		   	<input id="Upload" type="file"name="_photos" accept="image/*" style={{visibility: 'hidden'}}/>
		   	</div>
		   	}
		  </Card.Body>
		</Card>
		</div>

		)
}

export default ProfileCard;