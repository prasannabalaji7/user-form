import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { RootDispatcher } from '../store/root-dispatcher';
import { Form, Row, Col } from 'react-bootstrap';
import { countryData, ErrorMessage } from '../constants/Constants';
import {
	validatePlainText,
	validateEmail,
	validateMobile,
} from '../utils/Validate';

export interface UserDetailProps {
	userName: string;
	userEmail: string;
	userRole: string;
	userMobile: string;
	userCountry: string;
	isEditBtnVisible: boolean;
	formValid: boolean;
	handleUserName: (e: ChangeEvent<HTMLInputElement>) => void;
	handleRoleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleMobileChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleCountryChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const UserDetail: React.FC<UserDetailProps> = (props) => {
	const {
		userName,
		userEmail,
		userRole,
		userMobile,
		userCountry,
		isEditBtnVisible,
		formValid,
	} = props;

	const dispatch = useDispatch();
	const rootDispatcher = new RootDispatcher(dispatch);
	const [valid, setValid] = useState({
		notEditable: '',
		readOnly: false,
		isValidEmail: true,
		isValidUser: true,
		isValidRole: true,
		isValidMobile: true,
	});

	const editableClass = classNames('childContainer', {
		readOnlyMode: isEditBtnVisible,
	});
	const fieldClass = classNames('', {
		plainView: isEditBtnVisible,
	});

	const userValidClass = classNames(fieldClass, {
		'in-valid': valid.isValidUser,
	});

	const emailValidClass = classNames(fieldClass, {
		'in-valid': valid.isValidEmail,
	});

	const roleValidClass = classNames(fieldClass, {
		'in-valid': valid.isValidRole,
	});

	const mobileValidClass = classNames(fieldClass, {
		'in-valid': valid.isValidMobile,
	});

	useEffect(() => {
		setValid((state) => ({
			...state,
			isValidUser: validatePlainText(userName),
		}));
	}, [userName]);

	useEffect(() => {
		setValid((state) => ({
			...state,
			isValidEmail: validateEmail(userEmail),
		}));
	}, [userEmail]);

	useEffect(() => {
		setValid((state) => ({
			...state,
			isValidRole: validatePlainText(userRole),
		}));
	}, [userRole]);

	useEffect(() => {
		setValid((state) => ({
			...state,
			isValidMobile: validateMobile(userMobile, userCountry),
		}));
	}, [userMobile, userCountry]);

	useEffect(() => {
		if (
			valid.isValidEmail &&
			valid.isValidUser &&
			valid.isValidMobile &&
			valid.isValidRole
		) {
			rootDispatcher.validateSubmit(false);
		} else {
			rootDispatcher.validateSubmit(true);
		}
	}, [
		valid.isValidEmail,
		valid.isValidUser,
		valid.isValidMobile,
		valid.isValidRole,
	]);

	return (
		<div className={editableClass}>
			<Form>
				<Form.Group as={Row} id='formHorizontalName'>
					<Form.Label column sm={4}>
						Full Name
					</Form.Label>
					<Col sm={8}>
						<Form.Control
							className={userValidClass}
							readOnly={isEditBtnVisible}
							type='text'
							placeholder='Name'
							data-testId='user-name'
							value={userName}
							onChange={props.handleUserName}
							required
						/>
						{!userValidClass && (
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
							className={emailValidClass}
							readOnly={props.isEditBtnVisible}
							type='userEmail'
							data-testId='userEmail'
							placeholder='Email'
							value={userEmail}
							onChange={props.handleEmailChange}
						/>
						{!emailValidClass && (
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
							className={roleValidClass}
							readOnly={isEditBtnVisible}
							type='text'
							placeholder='Role'
							data-testId='userRole'
							value={userRole}
							onChange={props.handleRoleChange}
						/>
						{!roleValidClass && (
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
							className={mobileValidClass}
							readOnly={isEditBtnVisible}
							type='text'
							data-testId='userMobile'
							placeholder='Mobile'
							value={userMobile}
							onChange={props.handleMobileChange}
						/>
						{!mobileValidClass && (
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
						{!props.isEditBtnVisible ? (
							<Form.Control
								as='select'
								className={valid.notEditable}
								id='inlineFormCustomSelect'
								data-testId='userCountry'
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
								className={fieldClass}
								readOnly={isEditBtnVisible}
								type='text'
								placeholder='Name'
								value={userCountry}
							/>
						)}
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
};