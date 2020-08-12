import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RootDispatcher } from "../store/root-dispatcher";
import { Form, Row, Col } from "react-bootstrap";
import { countryData,userExp,emailExp,mobileExp,ErrorMessage } from "../constants/Constants";

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
		notEditable: "",
		readOnly: false,
		emailValid: "",
		userValid: "",
		roleValid: "",
		mobileValid: "",
		formValid: false,
	});
	const [editableClass, setEditableClass] = useState("childContainer");

	function validate(field: string) {
		switch (field) {
			case "userName":
				{
					if (userExp.test(props.userName)) {
						setValid((state) => ({ ...state, userValid: "" }));
					} else {
						setValid((state) => ({
							...state,
							userValid: "is-invalid",
						}));
					}
				}
				break;
			case "email":
				{
					if (
						emailExp.test(
							props.email
						)
					) {
						setValid((state) => ({ ...state, emailValid: "" }));
					} else {
						setValid((state) => ({
							...state,
							emailValid: "is-invalid",
						}));
					}
				}
				break;
			case "role":
				{
					if (userExp.test(props.role)) {
						setValid((state) => ({ ...state, roleValid: "" }));
					} else {
						setValid((state) => ({
							...state,
							roleValid: "is-invalid",
						}));
					}
				}
				break;
			case "mobile":
				{
					let mobilecode = countryData.filter(
						(item) => item.name === props.country
					)[0].value;
					if (mobileExp.test(props.mobile) &&
						props.mobile.startsWith("+" + mobilecode)
					) {
						setValid((state) => ({ ...state, mobileValid: "" }));
					} else {
						setValid((state) => ({
							...state,
							mobileValid: "is-invalid",
						}));
					}
				}
				break;
			default: {
				setValid((state) => ({ ...state }));
			}
		}
	}

	useEffect(() => {
		if (
			!valid.emailValid &&
			!valid.userValid &&
			!valid.roleValid &&
			!valid.mobileValid
		) {
			//rootDispatcher.validateSubmit(valid.formValid);
		} else {
			//rootDispatcher.validateSubmit(true);
		}
	}, [
		valid.emailValid,
		valid.userValid,
		valid.formValid,
		rootDispatcher,
		valid.roleValid,
		valid.mobileValid,
	]);

	useEffect(() => {
		validate("userName");
	}, [props.userName]);

	useEffect(() => {
		validate("email");
	}, [props.email]);

	useEffect(() => {
		validate("role");
	}, [props.role]);

	useEffect(() => {
		validate("mobile");
	}, [props.mobile]);

	useEffect(() => {
		validate("mobile");
	}, [props.country]);

	useEffect(() => {
		if (props.isEditEnabled) {
			setValid((state) => ({
				...state,
				notEditable: "plainView",
				readOnly: true,
			}));
		} else {
			setValid((state) => ({
				...state,
				notEditable: "",
				readOnly: false,
			}));
		}
	}, [props.isEditEnabled]);

	useEffect(() => {
		if (props.isEditEnabled) {
			setEditableClass(() => "childContainer readOnlyMode");
		} else {
			setEditableClass(() => "childContainer");
		}
	}, [props.isEditEnabled]);

	return (
		<div className={editableClass}>
			<Form>
				<Form.Group as={Row} controlId="formHorizontalName">
					<Form.Label column sm={4}>
						Full Name
					</Form.Label>
					<Col sm={8}>
						<Form.Control
							className={
								valid.notEditable + " " + valid.userValid
							}
							readOnly={valid.readOnly}
							type="text"
							placeholder="Name"
							value={props.userName}
							onChange={props.handleUserName}
							required
						/>
						{valid.userValid && (
							<Form.Control.Feedback
								className="d-block"
								type="invalid"
							>
								{ErrorMessage.nameError}
							</Form.Control.Feedback>
						)}
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalEmail">
					<Form.Label column sm={4}>
						Email
					</Form.Label>
					<Col sm={8}>
						<Form.Control
							className={
								valid.notEditable + " " + valid.emailValid
							}
							readOnly={valid.readOnly}
							type="email"
							placeholder="Email"
							value={props.email}
							onChange={props.handleEmailChange}
						/>
						{valid.emailValid && (
							<Form.Control.Feedback
								className="d-block"
								type="invalid"
							>
								{ErrorMessage.mailError}
							</Form.Control.Feedback>
						)}
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalRole">
					<Form.Label column sm={4}>
						Role
					</Form.Label>
					<Col sm={8}>
						<Form.Control
							className={
								valid.notEditable + " " + valid.roleValid
							}
							readOnly={valid.readOnly}
							type="text"
							placeholder="Role"
							value={props.role}
							onChange={props.handleRoleChange}
						/>
						{valid.roleValid && (
							<Form.Control.Feedback
								className="d-block"
								type="invalid"
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
								valid.notEditable + " " + valid.mobileValid
							}
							readOnly={valid.readOnly}
							type="text"
							placeholder="Mobile"
							value={props.mobile}
							onChange={props.handleMobileChange}
						/>
						{valid.mobileValid && (
							<Form.Control.Feedback
								className="d-block"
								type="invalid"
							>
								{ErrorMessage.mobileError}
							</Form.Control.Feedback>
						)}
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalCountry">
					<Form.Label column sm={4}>
						Country
					</Form.Label>
					<Col sm={8}>
						{!props.isEditEnabled ? (
							<Form.Control
								as="select"
								className={valid.notEditable}
								id="inlineFormCustomSelect"
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
								type="text"
								placeholder="Name"
								value={props.country}
							/>
						)}
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
};