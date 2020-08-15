import React, { ChangeEvent, MouseEvent } from 'react';
import ProfileCard from './ProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import { InitialStateInterface } from '../store/RootReducer';
import { UserDetail } from './UserDetail';
import RootDispatcher from '../store/RootDispatcher';
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
    rootDispatcher.onSubmit(
      formData.userFormData.userName,
      formData.userFormData.userEmail,
      formData.userFormData.userRole,
      formData.userFormData.userMobile,
      formData.userFormData.userCountry,
      formData.isEditBtnVisible
    );
  };

  const handleEdit = (e: MouseEvent<HTMLInputElement>) => {
    rootDispatcher.onEdit(formData.isEditBtnVisible);
  };
  const handleCancel = () => {
    if (!formData.isEditBtnVisible) {
      rootDispatcher.onCancel();
    }
  };

  const valid = !formData.isEditBtnVisible && formData.formValid;
  const { isEditBtnVisible, formValid } = formData;

  return (
    <div className='usercontainer'>
      <div className='flexParent'>
        <ProfileCard
          isEditBtnVisible={isEditBtnVisible}
          {...formData.profileData}
        />

        <UserDetail
          handleEmailChange={handleEmailChange}
          handleCountryChange={handleCountryChange}
          handleUserName={handleUserName}
          handleMobileChange={handleMobileChange}
          handleRoleChange={handleRoleChange}
          isEditBtnVisible={isEditBtnVisible}
          formValid={formValid}
          {...formData.userFormData}
        />
      </div>
      <div className='toolBar'>
        {formData.isEditBtnVisible ? (
          <Button
            type='submit'
            data-testId='submit'
            className='customSpacing'
            disabled={formData.isEditBtnVisible ? false : !valid}
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          <Button
            type='submit'
            data-testId='submit'
            className='customSpacing'
            disabled={formData.isEditBtnVisible ? false : !valid}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
        <Button
          className='customSpacing'
          data-testId='cancel'
          variant='outline-primary'
          onClick={handleCancel}
        >
          {formData.isEditBtnVisible ? 'Home' : 'Cancel'}
        </Button>
      </div>
    </div>
  );
};