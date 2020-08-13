import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import {
	DispatchAction,
	rootReducer,
	InitialStateInterface,
} from './store/root-reducer';
import App from './App';

const store = createStore<
	InitialStateInterface,
	DispatchAction,
	unknown,
	unknown
>(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<App></App>
	</Provider>,
	document.getElementById('root')
);