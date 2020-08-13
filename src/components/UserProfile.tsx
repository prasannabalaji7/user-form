import React, { ChangeEvent, MouseEvent } from 'react';
import ProfileCard from './ProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import { InitialStateInterface } from '../store/root-reducer';
import { UserDetail } from './UserDetail';
import RootDispatcher from '../store/root-dispatcher';
import { Button } from 'react-bootstrap';

export const UserProfile = () => {
  const formData = useSelector<InitialStateInterface, InitialStateInterface>(
    (state: InitialStateInterface) => ({ ...state })
  );

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    rootDispatcher.nameChange(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    rootDispatcher.emailChange(e.target.value);
  };

  const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
    rootDispatcher.numberChange(e.target.value);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    rootDispatcher.countryChange(e.target.value);
  };

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    rootDispatcher.roleChange(e.target.value);
  };

  const handleSubmit = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (formData.isEditEnabled) {
      rootDispatcher.onEdit(formData.isEditEnabled);
    } else {
      rootDispatcher.onSubmit(
        formData.userFormData.userName,
        formData.userFormData.email,
        formData.userFormData.role,
        formData.userFormData.mobile,
        formData.userFormData.country,
        formData.isEditEnabled
      );
    }
  };

  const handleCancel = () => {
    if (!formData.isEditEnabled) {
      rootDispatcher.onCancel();
    }
  };

  let valid = !formData.isEditEnabled && formData.formValid;
  const { isEditEnabled, formValid } = formData;
  const {
    userProfileName,
    userProfileRole,
    userProfileCountry,
    file,
  } = formData.profileData;
  const { userName, email, role, country, mobile } = formData.userFormData;

  return (
    <div className='usercontainer'>
      <div className='flexParent'>
        <ProfileCard
          userProfileName={userProfileName}
          file={file}
          userProfileRole={userProfileRole}
          userProfileCountry={userProfileCountry}
          isEditEnabled={isEditEnabled}
        />

        <UserDetail
          handleEmailChange={handleEmailChange}
          handleCountryChange={handleCountryChange}
          handleUserName={handleUserName}
          handleMobileChange={handleMobileChange}
          handleRoleChange={handleRoleChange}
          userName={userName}
          email={email}
          role={role}
          mobile={mobile}
          country={country}
          isEditEnabled={isEditEnabled}
          formValid={formValid}
        />
      </div>
      <div className='toolBar'>
        <Button
          type='submit'
          data-testId="submit"
          className='customSpacing'
          disabled={formData.isEditEnabled ? false : !valid}
          onClick={handleSubmit}
        >
          {formData.isEditEnabled ? 'Edit' : 'Submit'}
        </Button>
        <Button
          className='customSpacing'
          data-testId="cancel"
          variant='outline-primary'
          onClick={handleCancel}
        >
          {formData.isEditEnabled ? 'Home' : 'Cancel'}
        </Button>
      </div>
    </div>
  );
};