import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { FormField } from "../FormFields";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from '../../store/RootReducer';

test("what dom renderer is inital load will remain after theere is change in state", () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const tree = renderer
        .create(
            <Provider store={store}>
                <FormField
                    fieldId="anyId"
                    testId="anyField"
                    label="Role"
                    isReadOnly={false}
                    fieldValue="Test 2"
                    errorMsg="errorMsg"
                    userAction={() => {}}
                    type="text"
                    validate={(text: string, country?: string) => false}
                />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});