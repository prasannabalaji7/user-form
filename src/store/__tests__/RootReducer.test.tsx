import { RootReducer, initialState } from "../RootReducer";

describe("RootReducer", () => {
    //setting compoent validation to state for submit button enabling
    test("form is validated on UI and state is updated", () => {
        expect(
            RootReducer(undefined, {
                type: "validateSubmit",
                payload: {
                    formValid: true,
                },
            })
        ).toEqual({
            ...initialState,
            formValid: true
        });
    });

    test("Submit Reducer", () => {
        expect(
            RootReducer(undefined, {
                type: "onSubmit",
                payload: {
                    userName: "New User Name",
                    userRole: "New Role",
                    userCountry: "New Country",
                },
            })
        ).toEqual({
            ...initialState,
            isEditBtnVisible: true,
            profileData: {
                userProfileName: "New User Name",
                userProfileRole: "New Role",
                userProfileCountry: "New Country",
            },
        });
    });

    test("name is changed and it reflects in state", () => {
        expect(
            RootReducer(undefined, {
                type: "nameChange",
                payload: {
                    userName: "Prasanna",
                },
            })
        ).toEqual({
            ...initialState,
            formValid: true,
            userFormData: {
                ...initialState.userFormData,
                userName: "Prasanna",
            }
        });
    });

    test("role is changed and it reflects in state", () => {
        expect(
            RootReducer(undefined, {
                type: "roleChange",
                payload: {
                    userRole: "Engineer",
                },
            })
        ).toEqual({
            ...initialState,
            formValid: true,
            userFormData: {
                ...initialState.userFormData,
                userRole: "Engineer",
            }
        });
    });

    test("number is changed and it reflects in state", () => {
        expect(
            RootReducer(undefined, {
                type: "numberChange",
                payload: {
                    userMobile: "+9189128392",
                },
            })
        ).toEqual({
            ...initialState,
            userFormData: {
                ...initialState.userFormData,
                userMobile: "+9189128392",
            }
        });
    });
    test("country is changed and it reflects in state", () => {
        expect(
            RootReducer(undefined, {
                type: "countryChange",
                payload: {
                    userCountry: "India",
                },
            })
        ).toEqual({
            ...initialState,
            userFormData: {
                ...initialState.userFormData,
                userCountry: "India",
            }
        });
    });


});