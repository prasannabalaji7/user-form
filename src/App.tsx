import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileCard from './components/ProfileCard';
import FormComponent from './components/FormComponent'
import {useSelector} from "react-redux";
import {InitialState} from "./store/root-reducer";

interface StateProps {
    fullName?: string;
   	email?: string;
   	role? : string;
  	mobile?:string;
   	country?:string;
   	isEdittable:boolean;
}
 
function App() {

	 const formData = useSelector<InitialState, StateProps>((state: InitialState) => {

        return {
           fullName: state.fullName,
           email: state.email,
           role : state.role,
           mobile:state.mobile,
           country:state.country,
           isEdittable: state.isEdittable
        }

    });

	
  return (
  	<div  className="flexParent">
        <ProfileCard {...formData}/>
        <FormComponent {...formData}/>
		
	</div>
  	);
}

export default App;