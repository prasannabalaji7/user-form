import React, { ChangeEvent, MouseEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileCard from './ProfileCard';
import { useSelector, useDispatch } from "react-redux";
import { InitialStateInterface } from "../store/root-reducer";
import UserDetailComponent from './UserDetail';
import RootDispatcher from '../store/root-dispatcher';
import { Button, Form, Row, Col } from 'react-bootstrap';

import { countryData } from '../constants/Constants';


export const UserProfile = () => {

  const formData = useSelector<InitialStateInterface, InitialStateInterface>((state: InitialStateInterface) => ({ ...state }));

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    rootDispatcher.nameChange(e.target.value);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    rootDispatcher.emailChange(e.target.value);
  }

  const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
    rootDispatcher.numberChange(e.target.value  );
  }

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => { 
    rootDispatcher.countryChange(e.target.value);
  }

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    rootDispatcher.roleChange(e.target.value);
  }

  const handleSubmit = () => {
  }

  const handleCancel = () => {
  }

  const { userName, role, country, isEdittable,formValid } = formData;
  const { userProfileName, userProfileRole, userProfileCountry, file } = formData.profileData;
  const userDetails = { ...formData }
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const valid = true;

  return (
    <div className ="usercontainer">
    <div className="">
      <div className="flexParent">
        <ProfileCard userProfileName={userProfileName} file={file} userProfileRole={userProfileRole} userProfileCountry={userProfileCountry} isEdittable={isEdittable}/>

        <UserDetailComponent
          handleEmailChange={handleEmailChange}
          handleCountryChange={handleCountryChange}
          handleUserName={handleUserName}
          handleMobileChange={handleMobileChange}
          handleRoleChange={handleRoleChange}
          {...userDetails} />
      </div>
      <div className="toolBar">
        <Button type="submit" className="customSpacing" disabled={!valid} onClick={(e: MouseEvent<HTMLInputElement>) => {
          e.preventDefault();
          if (formData.isEdittable) {
            rootDispatcher.onEdit(formData.isEdittable);
          } else {
            rootDispatcher.onSubmit(formData.userName, formData.email, formData.role, formData.mobile, formData.country, formData.isEdittable);
          }
        }
        }>
          {formData.isEdittable ? 'Edit' : 'Submit'}
        </Button>
        <Button className="customSpacing btn-outline-light" variant="secondary">Home</Button>
      </div>
    </div>
</div>
  );
}

