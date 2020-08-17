import React, { ChangeEvent,useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
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

	const [countrySelected,setCountrySelected]=useState(userCountry);

	return (
		<div className="childContainer">
			<Form>
				<FormField
					fieldId="formHorizontalName"
					testId="user-name"
					label="Full Name"
					validate={validatePlainText}
					type="text"
					isReadOnly={isEditBtnVisible}
					fieldValue={userName}
					userAction={props.handleUserName}
					errorMsg={ErrorMessage.nameError}
				/>
				<FormField
					fieldId="formHorizontalEmail"
					testId="userEmail"
					label="Email"
					type="email"
					validate={validateEmail}
					isReadOnly={isEditBtnVisible}
					fieldValue={userEmail}
					userAction={props.handleEmailChange}
					errorMsg={ErrorMessage.mailError}
				/>
				<FormField
					fieldId="formHorizontalRole"
					testId="userRole"
					label="Role"
					type="text"
					//fieldValid={valid.isValidRole}
					validate={validatePlainText}
					isReadOnly={isEditBtnVisible}
					fieldValue={userRole}
					userAction={props.handleRoleChange}
					errorMsg={ErrorMessage.nameError}
				/>
				<FormField
					fieldId="formHorizontalMobile"
					testId="userMobile"
					label="Mobile"
					type="text"
					userCountry={countrySelected}
					validate={validateMobile}
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
								id="inlineFormCustomSelect"
								data-testId="userCountry"
								onChange={(e: ChangeEvent<HTMLInputElement>) =>{			
									setCountrySelected(e.target.value);						
									return props.handleCountryChange(e);
								}
								}
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
									className="plainView"
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