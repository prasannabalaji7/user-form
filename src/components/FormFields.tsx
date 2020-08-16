import React, { ChangeEvent, useState, useEffect } from "react";
import classNames from "classnames";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { RootDispatcher } from "../store/RootDispatcher";

export interface FormFieldProps {
	fieldId: string;
	testId: string;
	label: string;
	isReadOnly: boolean;
	fieldValue: string;
	errorMsg: string;
	userCountry?: string;
	type: string;
	validate: (matchText: string, userCountry?: string) => boolean;
	userAction: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = (props) => {
	const {
		label,
		isReadOnly,
		fieldValue,
		errorMsg,
		userAction,
		userCountry,
		validate,
		fieldId,
		testId,
		type,
	} = props;
	const dispatch = useDispatch();
	const rootDispatcher = new RootDispatcher(dispatch);
	const [formValid, setFormValid] = useState(true);
	useEffect(() => {
		if (formValid) {
			rootDispatcher.validateSubmit(true);
		} else {
			rootDispatcher.validateSubmit(false);
		}
	}, [formValid]);


	const appendClass = (
		container: string,
		key: string,
		condition: boolean
	) => {
		return classNames(container, { [key]: condition });
	};

	const fieldClass = appendClass("", "plainView", isReadOnly);

	const validateForm = (e: ChangeEvent<HTMLInputElement>) => {
		if (validate(e.target.value, userCountry)) {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	};

	return (
		<Form.Group as={Row} id={fieldId}>
			<Form.Label column sm={4}>
				{label}
			</Form.Label>
			<Col sm={8}>
				<Form.Control
					className={fieldClass}
					readOnly={isReadOnly}
					type={type}
					data-testId={testId}
					value={fieldValue}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						userAction(e);
						validateForm(e);
					}}
					required
				/>
				{!validate(fieldValue, userCountry) && (
					<Form.Control.Feedback className="d-block" type="invalid">
						{errorMsg}
					</Form.Control.Feedback>
				)}
			</Col>
		</Form.Group>
	);
};