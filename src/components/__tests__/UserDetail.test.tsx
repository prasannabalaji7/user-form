import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { UserDetail } from '../UserDetail';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/root-reducer';
import { screen } from '@testing-library/dom';
import renderer from 'react-test-renderer';

describe('<UserDetail />', () => {
    const mockStore = configureStore();
    test('Snapshot Testing', () => {
        const store = mockStore(initialState);
        const tree = renderer
            .create(
                <Provider store={store}>
                    <UserDetail
                        handleEmailChange={() => {}}
                        handleCountryChange={() => {}}
                        handleUserName={() => {}}
                        handleMobileChange={() => {}}
                        handleRoleChange={() => {}}
                        userName='TestUser'
                        userEmail='testEmail'
                        userRole='testRole'
                        userMobile='12345'
                        userCountry='Singapore'
                        isEditBtnVisible={false}
                        formValid={true}
                    />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Snapshot Testing - Invalid Values', () => {
        const store = mockStore(initialState);
        const tree = renderer
            .create(
                <Provider store={store}>
                    <UserDetail
                        handleEmailChange={() => {}}
                        handleCountryChange={() => {}}
                        handleUserName={() => {}}
                        handleMobileChange={() => {}}
                        handleRoleChange={() => {}}
                        userName='!!'
                        userEmail=''
                        userRole='!!'
                        userMobile=''
                        userCountry=''
                        isEditBtnVisible={true}
                        formValid={true}
                    />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});