import React, { ChangeEvent,MouseEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileCard from './ProfileCard';
import {useSelector, useDispatch} from "react-redux";
import {InitialState} from "../store/root-reducer";
import UserDetailComponent from './UserDetail';
import RootDispatcher from '../store/root-dispatcher';
import {Button,Form,Row,Col} from 'react-bootstrap';

import {countryData} from '../constants/Constants';

// TODO: remove
interface UserProfileProps {
    userName: string;
   	email: string;
   	role : string;
  	mobile:string;
   	country:string;
    userProfileName:string;
    userProfileRole:string;
    userProfileCountry:string;
   	isEdittable:boolean;
    emailValid : boolean;
    mobileValid : boolean;
    userValid : boolean;
    roleValid: boolean; 
    file:any;   
}
 
export const UserProfile = () => {

  const formData = useSelector<InitialState, UserProfileProps>((state: InitialState) => ({...state}));
  
  const handleUserName = (e: ChangeEvent<HTMLInputElement>)=>{
		const lettersOnly = new RegExp('^[a-zA-Z_ ]*$', 'i');
    let value = e.target.value,userValid=true;
  		if(lettersOnly.test(e.target.value)){
         userValid = true;
  		}else {
        userValid = false;
      }    
    rootDispatcher.nameChange(value,userValid); 
   }

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>)=>{
    let value = e.target.value,mailValid=true;
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
      mailValid =  true;
      }else {
      mailValid=false;
    }  
    rootDispatcher.emailChange(value,mailValid);
     
 }

	const handleMobileChange = (e: ChangeEvent<HTMLInputElement>)=>{
    let value = e.target.value,numberValid=true;
    if(/^\+?([0-9]{3}|[0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{3}|[0-9]{7})$/.test(e.target.value)){
      numberValid = true;      
    }else {
      numberValid=false;
    }
      rootDispatcher.numberChange(value,numberValid);
    
  }

	const handleCountryChange = (e: ChangeEvent<HTMLInputElement>)=>{
      const data = {
        country:e.target.value,
        mobilecode : countryData.filter(item=>item.name===e.target.value)[0].value
      }
      rootDispatcher.countryChange(data.country,data.mobilecode);
  }

	const handleRoleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    let value = e.target.value,roleValid=true;
    const lettersOnly = new RegExp('^[a-zA-Z_ ]*$', 'i');
    let result = formData.role;
    if(lettersOnly.test(e.target.value)){
      roleValid =  true;
    }else {
      roleValid = false;
    }
    rootDispatcher.roleChange(value,roleValid);
  }

	const handleSubmit = ()=>{
	}

	const handleCancel = ()=>{
	}

  const {userName,role,country,isEdittable,file} = formData;
  const userDetails = {...formData}
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  return (
    <div className="parentForm">
      <div  className="flexParent">
        <ProfileCard userProfileName={userName} file={file} userProfileRole={role} userProfileCountry ={country} isEdittable={isEdittable}/>
        <UserDetailComponent 
        handleEmailChange={handleEmailChange} 
        handleCountryChange={handleCountryChange}
        handleUserName={handleUserName} 
        handleMobileChange={handleMobileChange} 
        handleRoleChange={handleRoleChange} 
        {...userDetails}/>
      </div>
      <div className="toolBar">
           <Button type="submit" className="customSpacing" onClick={(e: MouseEvent<HTMLInputElement>) => {
              e.preventDefault();  
              if(formData.isEdittable) {
                rootDispatcher.onEdit(formData.isEdittable);
              }else{
                rootDispatcher.onSubmit(formData.userName,formData.email,formData.role,formData.mobile,formData.country,formData.isEdittable);
              }
            }
          }>
          {formData.isEdittable?'Edit':'Submit'}
          </Button>
            <Button className="customSpacing" variant="secondary">Home</Button>
               </div>
    </div>

  );
}

