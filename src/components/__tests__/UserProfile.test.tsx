import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/RootReducer';
import { screen, waitFor } from '@testing-library/dom';
import { UserProfile } from '../UserProfile';
import renderer from 'react-test-renderer';

//UNIT TESTING ON VALUE SETTING FOR FIELDS HERE Validtion Validate-test.ts and dispatch Root_Reducer will have the implementation testing

describe('<UserProfile />', () => {
  const mockStore = configureStore();
  test('Snapshot Testing', () => {
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <UserProfile />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();

  });
  test('when user name is updates in form  it reflects in the element', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    expect((store.getState() as any).userFormData.userName).toBe('User Name');
    const inputNode = screen.getByTestId("user-name") as HTMLInputElement;
    expect(inputNode.value).toEqual('User Name');
    inputNode.value = 'User Name 2';
    fireEvent.change(inputNode);
    expect(inputNode.value).toEqual('User Name 2');   
  });
  test('when email is updates in form  it reflects in the element', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    expect((store.getState() as any).userFormData.userEmail).toBe('email@domain.com');
    const emailId = getByTestId('userEmail') as HTMLInputElement;
    expect(emailId.value).toEqual('email@domain.com');
    emailId.value = "test@gmail.com";
    fireEvent.change(emailId);
    expect(emailId.value).toEqual('test@gmail.com');

  });
  test('when user role is updates in form  it reflects in the element', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    expect((store.getState() as any).userFormData.userRole).toBe('User Role');
    const userRole = getByTestId('userRole') as HTMLInputElement;
    expect(userRole.value).toEqual('User Role');
    userRole.value = "Engineer";    
    fireEvent.change(userRole);
    expect(userRole.value).toEqual('Engineer');    
  });
  test('when we enter mobile number it updates in form- element', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
     expect((store.getState() as any).userFormData.userRole).toBe('User Role');
    const userMobile = getByTestId('userMobile') as HTMLInputElement;
    expect(userMobile.value).toEqual('+9311111111');
    userMobile.value = "+911111111";    
    fireEvent.change(userMobile);    
    expect(userMobile.value).toBe('+911111111');
  });

  test('when we change the country code mobile number prefix updates in form- userCountry', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    expect((store.getState() as any).userFormData.userCountry).toBe('Afghanistan');
    const userCountry = getByTestId('userCountry') as HTMLInputElement;
    expect(userCountry.value).toEqual('Afghanistan');
    userCountry.value = "Singapore";    
    fireEvent.change(userCountry);    
    expect(userCountry.value).toBe('Singapore');
  });

  
  test('when we click submit in the form we display details it in profile - submit', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    fireEvent.click(getByTestId('submit'), { target: { value: 1 } });
    expect((store.getState() as any).isEditBtnVisible).toBe(false);

  });
  test('when we click cancel in the form reset to inital state- cancel', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    fireEvent.click(getByTestId('cancel'), { target: { value: 1 } });
    expect((store.getState() as any).isEditBtnVisible).toBe(false);

  });  
});