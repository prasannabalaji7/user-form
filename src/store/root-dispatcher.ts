import {Dispatch} from 'redux';
import {DispatchAction, InitialState, rootReducer} from "./root-reducer";


export class RootDispatcher {

    private readonly dispatch: Dispatch<DispatchAction>;

    constructor(dispatch: Dispatch<DispatchAction>){

        this.dispatch = dispatch; 

    }

    nameChange = (fullName: string) => this.dispatch({type: "nameChange", payload: {fullName}});    

    emailChange = (email: string) => this.dispatch({type: "emailChange", payload: {email}});    

    roleChange = (role: string) => this.dispatch({type: "roleChange", payload: {role}});    

	numberChange = (mobile: string) => this.dispatch({type: "numberChange", payload: {mobile}});    

    countryChange = (country:string,mobilecode: string) => this.dispatch({type: "countryChange", payload: {country,mobilecode}});  

    onEdit  = (isEdittable: boolean) => this.dispatch({type: "onEdit", payload: {isEdittable}});


}

export default RootDispatcher;