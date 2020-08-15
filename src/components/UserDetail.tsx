import React, { ChangeEvent, useEffect, useState } from "react";
import classNames from "classnames";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { RootDispatcher } from "../store/RootDispatcher";
import { FormField } from "./FormFields";
import { countryData, ErrorMessage } from "../constants/Constants";
import {
	validatePlainText,
	validateEmail,
	validateMobile,
} from "../utils/Validate";

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
		notEditable: "",
		readOnly: false,
		isValidEmail: true,
		isValidUser: true,
		isValidRole: true,
		isValidMobile: true,
	});

	const appendClass = (
		container: string,
		key: string,
		condition: boolean
	) => {
		return classNames(container, { [key]: condition });
	};

	const fieldClass = appendClass("", "plainView", isEditBtnVisible);

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
		<div
			className={appendClass(
				"childContainer",
				"readOnlyMode",
				isEditBtnVisible
			)}
		>
			<Form>
				<FormField
					fieldId="formHorizontalName"
					testId="user-name"
					label="Full Name"
					fieldValid={valid.isValidUser}
					isValidClass={appendClass(
						fieldClass,
						"plainView",
						valid.isValidUser
					)}
					isReadOnly={isEditBtnVisible}
					fieldValue={userName}
					userAction={props.handleUserName}
					errorMsg={ErrorMessage.nameError}
				/>
				<FormField
					fieldId="formHorizontalEmail"
					testId="userEmail"
					label="Email"
					fieldValid={valid.isValidEmail}
					isValidClass={appendClass(
						fieldClass,
						"in-valid",
						valid.isValidEmail
					)}
					isReadOnly={isEditBtnVisible}
					fieldValue={userEmail}
					userAction={props.handleEmailChange}
					errorMsg={ErrorMessage.mailError}
				/>
				<FormField
					fieldId="formHorizontalRole"
					testId="userRole"
					label="Role"
					fieldValid={valid.isValidRole}
					isValidClass={appendClass(
						fieldClass,
						"in-valid",
						valid.isValidRole
					)}
					isReadOnly={isEditBtnVisible}
					fieldValue={userRole}
					userAction={props.handleRoleChange}
					errorMsg={ErrorMessage.nameError}
				/>
				<FormField
					fieldId="formHorizontalMobile"
					testId="userMobile"
					label="Mobile"
					fieldValid={valid.isValidMobile}
					isValidClass={appendClass(
						fieldClass,
						"in-valid",
						valid.isValidMobile
					)}
					isReadOnly={isEditBtnVisible}
					fieldValue={userMobile}
					userAction={props.handleMobileChange}
					errorMsg={ErrorMessage.mobileError}
				/>

				<Form.Group as={Row} id="formHorizontalCountry">
					<Form.Label column sm={4}>
						Country
					</Form.Label>
					<Col sm={8}>
						{!isEditBtnVisible ? (
							<Form.Control
								as="select"
								className={valid.notEditable}
								id="inlineFormCustomSelect"
								data-testId="userCountry"
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
								type="text"
								placeholder="Name"
								value={userCountry}
							/>
						)}
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
};