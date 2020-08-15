import { RootReducer, initialState } from "../RootReducer";

describe("RootReducer", () => {
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

    test("form becomes invalid when values in the form are wrong which disabls submit", () => {
        expect(
            RootReducer(undefined, {
                type: "nameChange",
                payload: {
                    userName: "",
                },
            })
        ).toEqual({
            ...initialState,
            formValid: false,
            userFormData: {
                ...initialState.userFormData,
                userName: "",
            }
        });
    });
    test("when mobile number changed", () => {
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
    test("when country value in the form changes", () => {
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