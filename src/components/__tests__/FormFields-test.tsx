 import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import {FormField} from '../FormFields';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';


 test('what dom renderer is inital load will remain after theere is change in state', () => {
        const tree = renderer
            .create(
                <FormField
                   fieldId="anyId"
                    testId="anyField"
                    label="Role"
                    fieldValid={true}
                    isValidClass=""
                    isReadOnly={false}
                    fieldValue="Test 2"
                    errorMsg="errorMsg"
                    userAction={() => {}}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });