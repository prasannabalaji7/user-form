import { Action, Reducer } from 'redux';

export interface ProfileData {
    userProfileName: string;
    userProfileRole: string;
    userProfileCountry: string;
}

export interface UserFormData {
    userName: string;
    userEmail: string;
    userRole: string;
    userMobile: string;
    userCountry: string;
}

export interface InitialStateInterface {
    profileData: ProfileData;
    userFormData: UserFormData;
    formValid: boolean;
    isEditBtnVisible: boolean;
}

export const initialState: InitialStateInterface = {
    userFormData: {
        userName: 'User Name',
        userEmail: 'email@domain.com',
        userRole: 'User Role',
        userMobile: '+9311111111',
        userCountry: 'Afghanistan',
    },
    profileData: {
        userProfileName: 'User Name',
        userProfileRole: 'User Role',
        userProfileCountry: 'Afghanistan',
    },
    formValid: true,
    isEditBtnVisible: false,
};

export interface DispatchAction extends Action {
    payload: any;
}

export const RootReducer: Reducer<InitialStateInterface, DispatchAction> = (
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
                    userEmail: action.payload.userEmail,
                },
            };
        case 'roleChange':
            return {
                ...state,
                userFormData: {
                    ...state.userFormData,
                    userRole: action.payload.userRole,
                },
            };
        case 'numberChange':
            return {
                ...state,
                userFormData: {
                    ...state.userFormData,
                    userMobile: action.payload.userMobile,
                },
            };
        case 'countryChange':
            return {
                ...state,
                userFormData: {
                    ...state.userFormData,
                    userCountry: action.payload.userCountry,
                },
            };
        case 'validateSubmit':
            return { ...state, formValid: action.payload.formValid };
        case 'onEdit':
            return {
                ...state,
                isEditBtnVisible: !action.payload.isEditBtnVisible,
            };
        case 'onSubmit':
            return {
                ...state,
                profileData: {
                    userProfileName: action.payload.userName,
                    userProfileRole: action.payload.userRole,
                    userProfileCountry: action.payload.userCountry,
                },
                isEditBtnVisible: !action.payload.isEditBtnVisible,
            };
        case 'onCancel':
            return { ...initialState };
        default:
            return { ...state };
    }
};