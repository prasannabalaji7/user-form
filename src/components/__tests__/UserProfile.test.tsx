import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { UserDetail } from '../UserDetail';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/root-reducer';
import { screen, waitFor } from '@testing-library/dom';
import { UserProfile } from '../UserProfile';
import renderer from 'react-test-renderer';

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
  test('when we enter data in user name it updates in form- User Name', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    fireEvent.change(getByTestId('user-name'), {
      target: { value: 'User Name' },
    });
    expect((store.getState() as any).userFormData.userName).toBe('User Name');
  });
  test('whe we enter data in email it updates in form- userEmail', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    fireEvent.change(getByTestId('userEmail'), { target: { value: 1 } });
    expect((store.getState() as any).userFormData.userEmail).toBe(
      'userEmail@domain.com'
    );
  });
  test('when we enter data in role it updates in form - userRole', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    fireEvent.change(getByTestId('userRole'), {
      target: { value: 'User Role' },
    });
    expect((store.getState() as any).userFormData.userRole).toBe('User Role');
  });
  test('when we enter mobile number it updates in form- userMobile', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    fireEvent.change(getByTestId('userMobile'), {
      target: { value: '+9311111111' },
    });
    expect((store.getState() as any).userFormData.userMobile).toBe(
      '+9311111111'
    );
  });
  test('when we change the country code mobile number prefix updates in form- userCountry', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    fireEvent.change(getByTestId('userCountry'), {
      target: { value: 'Afghanistan' },
    });
    expect((store.getState() as any).userFormData.userCountry).toBe(
      'Afghanistan'
    );

    expect((store.getState() as any).userFormData.userMobile).toContain('+93');
  });
  test('when we click submit in the form we display details it in profile - submit', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    fireEvent.click(getByTestId('submit'), { target: { value: 1 } });
  });
  test('when we click cancel in the form reset to inital state- cancel', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    fireEvent.click(getByTestId('cancel'), { target: { value: 1 } });
  });
  test('when incorrect value entered in  form it becomes in valid', async () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );

    fireEvent.change(getByTestId('userRole'), {
      target: { value: 'User Role2' },
    });

    expect((store.getState() as any).userFormData.userRole).toBe('User Role');
    expect((store.getState() as any).formValid).toBe(false);

    fireEvent.change(getByTestId('userEmail'), { target: { value: '' } });
    expect((store.getState() as any).formValid).toBe(false);

    fireEvent.change(getByTestId('userMobile'), { target: { value: '0000' } });
    expect((store.getState() as any).formValid).toBe(false);
  });
});