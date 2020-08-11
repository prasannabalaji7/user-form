import { Action, Reducer } from "redux";

export interface ProfileData {
    userProfileName: string;
    userProfileRole: string;
    userProfileCountry: string;
    file: any;
}

export interface InitialStateInterface {
    userName: string;
    email: string;
    role: string;
    mobile: string;
    country: string;
    profileData: ProfileData;
    mobilecode: string;
    isEdittable: boolean;
    emailValid: boolean;
    mobileValid: boolean;
    userValid: boolean;
    roleValid: boolean;
    formValid: boolean;
}

export const initialState: InitialStateInterface = {
    userName: 'User Name',
    email: 'email@domain.com',
    role: 'User Role',
    mobile: '+9311111111',
    country: 'Afghanistan',
    mobilecode: "+65",
    isEdittable: false,
    profileData: {
        userProfileName: 'User Name',
        userProfileRole: 'User Role',
        userProfileCountry: 'Afghanistan',
        file: "",
    },
    emailValid: true,
    mobileValid: true,
    userValid: true,
    roleValid: true,
    formValid:false
};

export interface DispatchAction extends Action {
    payload: any;
}


export const rootReducer: Reducer<InitialStateInterface, DispatchAction> = (state = initialState, action) => {
    switch (action.type) {
        case "nameChange":
            return { ...state, userName: action.payload.userName}
        case "emailChange":
            return { ...state, email: action.payload.email};
        case "roleChange":
            return { ...state, role: action.payload.role}
        case "numberChange":
            return { ...state, mobile: action.payload.mobile}
        case "countryChange":
            return { ...state,country: action.payload.country }
        case "formValid":
            return {...state,formValid: !action.payload.formValid} 
        case "onEdit":
            return { ...state, isEdittable: !action.payload.isEdittable }
        case "onSubmit":
            return {
                ...state,
                profileData: {
                    userProfileName: action.payload.userName,
                    userProfileRole: action.payload.role,
                    userProfileCountry: action.payload.country,
                    file: "",
                },
                isEdittable: !action.payload.isEdittable
            }
        default:
            return state;
    }
};