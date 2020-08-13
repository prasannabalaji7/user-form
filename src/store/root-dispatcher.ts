import { Dispatch } from 'redux';
import { DispatchAction } from './root-reducer';

export class RootDispatcher {
    private readonly dispatch: Dispatch<DispatchAction>;

    constructor(dispatch: Dispatch<DispatchAction>) {
        this.dispatch = dispatch;
    }

    nameChange = (userName: string) =>
        this.dispatch({ type: 'nameChange', payload: { userName } });

    emailChange = (email: string) =>
        this.dispatch({ type: 'emailChange', payload: { email } });

    roleChange = (role: string) =>
        this.dispatch({ type: 'roleChange', payload: { role } });

    numberChange = (mobile: string) =>
        this.dispatch({ type: 'numberChange', payload: { mobile } });

    countryChange = (country: string) =>
        this.dispatch({ type: 'countryChange', payload: { country } });

    validateSubmit = (formValid: boolean) =>
        this.dispatch({ type: 'validateSubmit', payload: { formValid } });

    onCancel = () => this.dispatch({ type: 'onCancel', payload: {} });

    onEdit = (isEditEnabled: boolean) =>
        this.dispatch({ type: 'onEdit', payload: { isEditEnabled } });

    onSubmit = (
        userName: string,
        email: string,
        role: string,
        mobile: string,
        country: string,
        isEditEnabled: boolean
    ) =>
        this.dispatch({
            type: 'onSubmit',
            payload: { userName, email, role, mobile, country, isEditEnabled },
        });
}

export default RootDispatcher;