import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { UserDetail } from '../UserDetail';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/root-reducer';
import { screen, waitFor } from '@testing-library/dom'
import { UserProfile } from '../UserProfile';
import renderer from 'react-test-renderer';

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
    fireEvent.change(getByTestId('email'), { target: { value: 1 } });
    expect((store.getState() as any).userFormData.email).toBe('email@domain.com')
  });
  test('Handle Change events - role', async () => {
    const store = mockStore(initialState)
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>)
    fireEvent.change(getByTestId('role'), { target: { value: 'User Role' } });
    expect((store.getState() as any).userFormData.role).toBe('User Role')
  });
  test('Handle Change events - mobile', async () => {
    const store = mockStore(initialState)
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>)
    fireEvent.change(getByTestId('mobile'), { target: { value: '+9311111111' } });
    expect((store.getState() as any).userFormData.mobile).toBe('+9311111111')
  });
  test('Handle Change events - country', async () => {
    const store = mockStore(initialState)
    const { getByTestId } = render(<Provider store={store}>
      <UserProfile />
    </Provider>)
    fireEvent.change(getByTestId('country'), { target: { value: 'Afghanistan' } });
    expect((store.getState() as any).userFormData.country).toBe('Afghanistan')
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