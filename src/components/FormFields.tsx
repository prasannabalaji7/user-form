import React, { ChangeEvent } from "react";
import { Form, Row, Col } from "react-bootstrap";

export interface FormFieldProps {
	fieldId: string;
	testId: string;
	label: string;
	isValidClass: string;
	isReadOnly: boolean;
	fieldValue: string;
	errorMsg: string;
	fieldValid: boolean;
	userAction: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = (props) => {
	const {
		label,
		isValidClass,
		isReadOnly,
		fieldValue,
		errorMsg,
		userAction,
		fieldId,
		testId,
		fieldValid,
	} = props;
	return (
		<Form.Group as={Row} id={fieldId}>
			<Form.Label column sm={4}>
				{label}
			</Form.Label>
			<Col sm={8}>
				<Form.Control
					className={isValidClass}
					readOnly={isReadOnly}
					type="text"
					placeholder="Name"
					data-testId={testId}
					value={fieldValue}
					onChange={userAction}
					required
				/>
				{!fieldValid && (
					<Form.Control.Feedback className="d-block" type="invalid">
						{errorMsg}
					</Form.Control.Feedback>
				)}
			</Col>
		</Form.Group>
	);
};