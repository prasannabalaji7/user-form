import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { UserDetail } from '../UserDetail';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/root-reducer';
import { screen } from '@testing-library/dom';

const country = [
    {
        name: 'Afghanistan',
        code: 'AF',
        value: '93',
    },
    {
        name: 'Albania',
        code: 'AL',
        value: '355',
    },
];

describe('<UserDetail />', () => {
    const mockStore = configureStore();

    test('should display the values', async () => {
        const store = mockStore(initialState);
        const { getByText, container } = render(
            <Provider store={store}>
                <UserDetail
                    handleEmailChange={() => {}}
                    handleCountryChange={() => {}}
                    handleUserName={() => {}}
                    handleMobileChange={() => {}}
                    handleRoleChange={() => {}}
                    userName='TestUser'
                    email='testEmail'
                    role='testRole'
                    mobile='12345'
                    country='Singapore'
                    isEditEnabled={false}
                    formValid={true}
                />
            </Provider>
        );
    });
});