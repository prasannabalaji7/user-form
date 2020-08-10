import {Dispatch} from 'redux';
import {DispatchAction, InitialState, rootReducer} from "./root-reducer";


export class RootDispatcher {

    private readonly dispatch: Dispatch<DispatchAction>;

    constructor(dispatch: Dispatch<DispatchAction>){

        this.dispatch = dispatch; 

    }

    nameChange = (userName: string,userValid:boolean) => this.dispatch({type: "nameChange", payload: {userName,userValid}});    

    emailChange = (email: string,mailValid:boolean) => this.dispatch({type: "emailChange", payload: {email,mailValid}});    

    roleChange = (role: string,roleValid:boolean) => this.dispatch({type: "roleChange", payload: {role,roleValid}});    

	numberChange = (mobile: string,numberValid:boolean) => this.dispatch({type: "numberChange", payload: {mobile,numberValid}});    

    countryChange = (country:string,mobilecode: string) => this.dispatch({type: "countryChange", payload: {country,mobilecode}});  

    onEdit  = (isEdittable: boolean) => this.dispatch({type: "onEdit", payload: {isEdittable}});

    onSubmit  = (userName: string,email: string,role: string,mobile: string,country:string,isEdittable: boolean) => this.dispatch({type: "onSubmit", payload: {userName,email,role,mobile,country,isEdittable}});


}

export default RootDispatcher;