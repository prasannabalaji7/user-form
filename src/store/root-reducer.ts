import { Action, Reducer } from 'redux';

export interface ProfileData {
    userProfileName: string;
    userProfileRole: string;
    userProfileCountry: string;
    file: any;
}

export interface UserFormData {
    userName: string;
    email: string;
    role: string;
    mobile: string;
    country: string;
}

export interface InitialStateInterface {
    profileData: ProfileData;
    userFormData: UserFormData;
    formValid: boolean;
    isEditEnabled: boolean;
}

export const initialState: InitialStateInterface = {
    userFormData: {
        userName: 'User Name',
        email: 'email@domain.com',
        role: 'User Role',
        mobile: '+9311111111',
        country: 'Afghanistan',
    },
    profileData: {
        userProfileName: 'User Name',
        userProfileRole: 'User Role',
        userProfileCountry: 'Afghanistan',
        file: '',
    },
    formValid: true,
    isEditEnabled: false,
};

export interface DispatchAction extends Action {
    payload: any;
}

export const rootReducer: Reducer<InitialStateInterface, DispatchAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'nameChange':
            return {
                ...state,
                userFormData: {
                    ...state.userFormData,
                    userName: action.payload.userName,
                },
            };
        case 'emailChange':
            return {
                ...state,
                userFormData: {
                    ...state.userFormData,
                    email: action.payload.email,
                },
            };
        case 'roleChange':
            return {
                ...state,
                userFormData: {
                    ...state.userFormData,
                    role: action.payload.role,
                },
            };
        case 'numberChange':
            return {
                ...state,
                userFormData: {
                    ...state.userFormData,
                    mobile: action.payload.mobile,
                },
            };
        case 'countryChange':
            return {
                ...state,
                userFormData: {
                    ...state.userFormData,
                    country: action.payload.country,
                },
            };
        case 'validateSubmit':
            return { ...state, formValid: !action.payload.formValid };
        case 'onEdit':
            return { ...state, isEditEnabled: !action.payload.isEditEnabled };
        case 'onSubmit':
            return {
                ...state,
                profileData: {
                    userProfileName: action.payload.userName,
                    userProfileRole: action.payload.role,
                    userProfileCountry: action.payload.country,
                    file: '',
                },
                isEditEnabled: !action.payload.isEditEnabled,
            };
        case 'onCancel':
            return { ...initialState };
        default:
            return { ...state };
    }
};