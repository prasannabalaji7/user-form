import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/RootReducer';
import { UserProfile } from '../UserProfile';
import renderer from 'react-test-renderer';
import { screen } from '@testing-library/dom';

describe('<UserProfile />', () => {

  const mockStore = configureStore();
  test('Snapshot Testing', () => {
    const store = mockStore(initialState)
    const tree = renderer
      .create(<Provider store={store}>
        <UserProfile />
      </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('after state update', async () => {
    const store = mockStore({ ...initialState, 
                              userFormData: { userName: "Scoot",
                              userRole: "Developer",
                              userEmail: 'user@cts.com',
                              userMobile: "+65234242",
                              userCountry: "Singapore"
                             } })
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>);
    
    const inputNode = screen.getByTestId("user-name") as HTMLInputElement;
    expect(inputNode.value).toEqual('Scoot');    
    expect((store.getState() as any).userFormData.userName).toBe('Scoot');

    const emailinput = screen.getByTestId("userEmail") as HTMLInputElement;
    expect(emailinput.value).toEqual('user@cts.com');    
    expect((store.getState() as any).userFormData.userEmail).toBe('user@cts.com');

    const roleInput = screen.getByTestId("userRole") as HTMLInputElement;
    expect(roleInput.value).toEqual('Developer');    
    expect((store.getState() as any).userFormData.userRole).toBe('Developer');

    const mobileInput = screen.getByTestId("userMobile") as HTMLInputElement;
    expect(mobileInput.value).toEqual('+65234242');    
    expect((store.getState() as any).userFormData.userMobile).toBe('+65234242');
    
    const countryInput = screen.getByTestId("userCountry") as HTMLInputElement;
    fireEvent.change(getByTestId("userCountry"),{target:{value: "Singapore"}});
    expect(countryInput.value).toEqual('Singapore');    
    expect((store.getState() as any).userFormData.userCountry).toBe('Singapore');
  });


  test('Handle Change events - User Name', async () => {
    const store = mockStore(initialState)
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>)
    fireEvent.change(getByTestId('user-name'), { target: { value: 'User Name' } });
    expect((store.getState() as any).userFormData.userName).toBe('User Name')
  });
  test('Handle Change events - email', async () => {
    const store = mockStore(initialState)
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>)
    fireEvent.change(getByTestId('userEmail'), { target: { value: 1 } });
    expect((store.getState() as any).userFormData.userEmail).toBe('email@domain.com')
  });
  test('Handle Before state change- role', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>)
    const inputNode = screen.getByTestId("user-name") as HTMLInputElement;
    expect(inputNode.value).toEqual('User Name');    
    expect((store.getState() as any).userFormData.userName).toBe('User Name')
  });

  test('Handle Change events - mobile', async () => {
    const store = mockStore(initialState)
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>)
    fireEvent.change(getByTestId('userMobile'), { target: { value: '+9311111111' } });
    expect((store.getState() as any).userFormData.userMobile).toBe('+9311111111')
  });
  test('Handle Change events - country', async () => {
    const store = mockStore(initialState)
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>)
    fireEvent.change(getByTestId('userCountry'), { target: { value: 'Afghanistan' } });
    expect((store.getState() as any).userFormData.userCountry).toBe('Afghanistan')
  });
  test('Handle Change events - submit', async () => {
    const store = mockStore(initialState)
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>)
    fireEvent.click(getByTestId('submit'), { target: { value: 1 } });
  });
  test('Handle Change events - cancel', async () => {
    const store = mockStore(initialState)
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>)
    fireEvent.click(getByTestId('cancel'), { target: { value: 1 } });
  });
});