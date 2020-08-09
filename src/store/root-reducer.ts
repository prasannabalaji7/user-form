import {Action, Reducer} from "redux";

export interface InitialState {
   fullName?: string;
   email?: string;
   role ?: string;
   mobile?:string;
   country?:string;
   mobilecode?:string;
   isEdittable:boolean
}

export const initialState: InitialState = {

    fullName: 'User Name',

    email: 'email@domain.com',

    role : 'User Role',
   
    mobile:'+93',
   
    country:'Afghanistan',

    isEdittable : false

};
export interface DispatchAction extends Action{
    payload: Partial<InitialState>;
}
 

export const rootReducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
    switch (action.type) {
        case "nameChange" : 
        return {...state,fullName:action.payload.fullName};
        case "emailChange" : 
        return {...state,email:action.payload.email};
        case "roleChange" : 
        return {...state,role:action.payload.role}        
        case "numberChange" :
        return {...state,mobile:action.payload.mobile}
        case "countryChange" :
        return {...state,mobile:"+"+action.payload.mobilecode,country:action.payload.country}
        case "onEdit" :
        return {...state,isEdittable:!action.payload.isEdittable}
        default:
        return state;
    }
};