import {Action, Reducer} from "redux";

export interface InitialState {
   userName: string;
   email: string;
   role: string;
   mobile:string;
   country:string;
   file : any;
   mobilecode:string;
   isEdittable:boolean;
   emailValid:boolean;
   mobileValid:boolean;
   userValid : boolean;   
   roleValid:boolean;
   userProfileName:string;
   userProfileRole:string;
   userProfileCountry:string;
}

export const initialState: InitialState = {
    userName: 'User Name',
    email: 'email@domain.com',
    role : 'User Role',   
    mobile:'+93',   
    country:'Afghanistan',
    mobilecode:"+65",
    isEdittable : false,
     userProfileName:'User Name',
    userProfileRole:'User Role',
    userProfileCountry:'Afghanistan',
    emailValid : true,
    mobileValid:true,
    userValid: true,
    roleValid:true,
    file:""

};

export interface DispatchAction extends Action{
    payload: any;
}
 

export const rootReducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
    switch (action.type) {
        case "nameChange" : 
        return {...state,userName:action.payload.userName,userValid:action.payload.userValid}
        case "emailChange" : 
        return {...state,email:action.payload.email,mailValid:action.payload.mailValid};
        case "roleChange" : 
        return {...state,role:action.payload.role,roleValid:action.payload.roleValid}        
        case "numberChange" :
        return {...state,mobile:action.payload.mobile,numberValid:action.payload.numberValid}
        case "countryChange" :
        return {...state,mobile:"+"+action.payload.mobilecode,country:action.payload.country}
        case "onEdit" :
        return {...state,isEdittable:!action.payload.isEdittable}
        case "onSubmit" :
        return {...state,userProfileName:action.payload.userName,
                        userProfileRole:action.payload.role,
                        userProfileCountry:action.payload.country,
                        isEdittable:!action.payload.isEdittable
                      }
        default:
        return state;
    }
};