import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatcher } from '../store/root-dispatcher';
import { Form, Row, Col } from 'react-bootstrap';
import { countryData, ErrorMessage } from '../constants/Constants';
import {
	validatePlainText,
	validateEmail,
	validateMobile,
} from './Validate';

export interface UserDetailProps {
	userName: string;
	email: string;
	role: string;
	mobile: string;
	country: string;
	isEditEnabled: boolean;
	formValid: boolean;
	handleUserName: (e: ChangeEvent<HTMLInputElement>) => void;
	handleRoleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleMobileChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleCountryChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const UserDetail: React.FC<UserDetailProps> = (props) => {
	const dispatch = useDispatch();
	const rootDispatcher = new RootDispatcher(dispatch);
	const [valid, setValid] = useState({
		notEditable: '',
		readOnly: false,
		emailValid: '',
		userValid: '',
		roleValid: '',
		mobileValid: '',
		formValid: false,
	});
	const [editableClass, setEditableClass] = useState('childContainer');

	useEffect(() => {
		if (validatePlainText(props.userName)) {
			setValid((state) => ({ ...state, userValid: '' }));
		} else {
			setValid((state) => ({
				...state,
				userValid: 'is-invalid',
			}));
		}
	}, [props.userName]);

	useEffect(() => {
		if (validateEmail(props.email)) {
			setValid((state) => ({ ...state, emailValid: '' }));
		} else {
			setValid((state) => ({
				...state,
				emailValid: 'is-invalid',
			}));
		}
	}, [props.email]);

	useEffect(() => {
		if (validatePlainText(props.role)) {
			setValid((state) => ({ ...state, roleValid: '' }));
		} else {
			setValid((state) => ({
				...state,
				roleValid: 'is-invalid',
			}));
		}
	}, [props.role]);

	useEffect(() => {
		if (validateMobile(props.mobile, props.country)) {
			setValid((state) => ({ ...state, mobileValid: '' }));
		} else {
			setValid((state) => ({
				...state,
				mobileValid: 'is-invalid',
			}));
		}
	}, [props.mobile, props.country]);

	useEffect(() => {
		if (props.isEditEnabled) {
			setValid((state) => ({
				...state,
				notEditable: 'plainView',
				readOnly: true,
			}));
		} else {
			setValid((state) => ({
				...state,
				notEditable: '',
				readOnly: false,
			}));
		}
	}, [props.isEditEnabled]);

	useEffect(() => {
		if (props.isEditEnabled) {
			setEditableClass(() => 'childContainer readOnlyMode');
		} else {
			setEditableClass(() => 'childContainer');
		}
	}, [props.isEditEnabled]);

	return (
		<div className={editableClass}>
			<Form>
				<Form.Group as={Row} id='formHorizontalName'>
					<Form.Label column sm={4}>
						Full Name
					</Form.Label>
					<Col sm={8}>
						<Form.Control
							className={
								valid.notEditable + ' ' + valid.userValid
							}
							readOnly={valid.readOnly}
							type='text'
							placeholder='Name'
							value={props.userName}
							onChange={props.handleUserName}
							required
						/>
						{valid.userValid && (
							<Form.Control.Feedback
								className='d-block'
								type='invalid'
							>
								{ErrorMessage.nameError}
							</Form.Control.Feedback>
						)}
					</Col>
				</Form.Group>

				<Form.Group as={Row} id='formHorizontalEmail'>
					<Form.Label column sm={4}>
						Email
					</Form.Label>
					<Col sm={8}>
						<Form.Control
							className={
								valid.notEditable + ' ' + valid.emailValid
							}
							readOnly={valid.readOnly}
							type='email'
							placeholder='Email'
							value={props.email}
							onChange={props.handleEmailChange}
						/>
						{valid.emailValid && (
							<Form.Control.Feedback
								className='d-block'
								type='invalid'
							>
								{ErrorMessage.mailError}
							</Form.Control.Feedback>
						)}
					</Col>
				</Form.Group>

				<Form.Group as={Row} id='formHorizontalRole'>
					<Form.Label column sm={4}>
						Role
					</Form.Label>
					<Col sm={8}>
						<Form.Control
							className={
								valid.notEditable + ' ' + valid.roleValid
							}
							readOnly={valid.readOnly}
							type='text'
							placeholder='Role'
							value={props.role}
							onChange={props.handleRoleChange}
						/>
						{valid.roleValid && (
							<Form.Control.Feedback
								className='d-block'
								type='invalid'
							>
								{ErrorMessage.nameError}
							</Form.Control.Feedback>
						)}
					</Col>
				</Form.Group>

				<Form.Group as={Row}>
					<Form.Label column sm={4}>
						Mobile
					</Form.Label>
					<Col sm={8}>
						<Form.Control
							className={
								valid.notEditable + ' ' + valid.mobileValid
							}
							readOnly={valid.readOnly}
							type='text'
							placeholder='Mobile'
							value={props.mobile}
							onChange={props.handleMobileChange}
						/>
						{valid.mobileValid && (
							<Form.Control.Feedback
								className='d-block'
								type='invalid'
							>
								{ErrorMessage.mobileError}
							</Form.Control.Feedback>
						)}
					</Col>
				</Form.Group>

				<Form.Group as={Row} id='formHorizontalCountry'>
					<Form.Label column sm={4}>
						Country
					</Form.Label>
					<Col sm={8}>
						{!props.isEditEnabled ? (
							<Form.Control
								as='select'
								className={valid.notEditable}
								id='inlineFormCustomSelect'
								onChange={props.handleCountryChange}
							>
								{countryData.map((item) => {
									return (
										<option
											key={item.code}
											value={item.name}
										>
											{item.name}
										</option>
									);
								})}
							</Form.Control>
						) : (
							<Form.Control
								className={valid.notEditable}
								readOnly={valid.readOnly}
								type='text'
								placeholder='Name'
								value={props.country}
							/>
						)}
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
};