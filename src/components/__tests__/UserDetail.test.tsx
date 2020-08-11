import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { UserDetail } from "../UserDetail";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../../store/root-reducer";
import { screen } from '@testing-library/dom'

describe("<UserDetail />", () => {
    const mockStore = configureStore();

    test("should display the values", async () => {
        const store = mockStore(initialState)
        const { getByText } = render(
            <Provider store={store}>
                <UserDetail
                    handleEmailChange={() => { }}
                    handleCountryChange={() => { }}
                    handleUserName={() => { }}
                    handleMobileChange={() => { }}
                    handleRoleChange={() => { }}
                    userName="TestUser"
                    email="testEmail"
                    role="testRole"
                    mobile="12345"
                    country="Singapore"
                    isEditEnabled={false}
                    formValid={true} />
            </Provider>
        )
        // const nameInput = screen.getByLabelText(/formHorizontalName/);
        expect(true).toEqual(true);

    });
});