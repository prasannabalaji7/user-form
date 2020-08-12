import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { UserDetail } from '../UserDetail';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/root-reducer';
import { screen,waitFor } from '@testing-library/dom'
import {UserProfile} from '../UserProfile';

describe('<UserProfile />', () => {    
	
	const mockStore = configureStore();
    test('should display the values', async () => {
        const store = mockStore(initialState)
        const {getByText,getByLabelText,container} = render(
        	<Provider store={store}>            
            <UserProfile />
            </Provider>
            );
       });