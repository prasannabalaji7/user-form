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
    rootDispatcher.onSubmit(
      formData.userFormData.userName,
      formData.userFormData.email,
      formData.userFormData.role,
      formData.userFormData.mobile,
      formData.userFormData.country,
      formData.editBtnVisible
    );
  };

  const handleEdit = (e: MouseEvent<HTMLInputElement>) => {
    rootDispatcher.onEdit(formData.editBtnVisible);
  };
  const handleCancel = () => {
    if (!formData.editBtnVisible) {
      rootDispatcher.onCancel();
    }
  };

  const valid = !formData.editBtnVisible && formData.formValid;
  const { editBtnVisible, formValid } = formData;

  return (
    <div className='usercontainer'>
      <div className='flexParent'>
        <ProfileCard
          editBtnVisible={editBtnVisible}
          {...formData.profileData}
        />

        <UserDetail
          handleEmailChange={handleEmailChange}
          handleCountryChange={handleCountryChange}
          handleUserName={handleUserName}
          handleMobileChange={handleMobileChange}
          handleRoleChange={handleRoleChange}
          editBtnVisible={editBtnVisible}
          formValid={formValid}
          {...formData.userFormData}
        />
      </div>
      <div className='toolBar'>
        {formData.editBtnVisible ? (
          <Button
            type='submit'
            data-testId='submit'
            className='customSpacing'
            disabled={formData.editBtnVisible ? false : !valid}
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          <Button
            type='submit'
            data-testId='submit'
            className='customSpacing'
            disabled={formData.editBtnVisible ? false : !valid}
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
          {formData.editBtnVisible ? 'Home' : 'Cancel'}
        </Button>
      </div>
    </div>
  );
};