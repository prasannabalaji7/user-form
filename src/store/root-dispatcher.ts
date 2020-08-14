import { Dispatch } from 'redux';
import { DispatchAction } from './root-reducer';

export class RootDispatcher {
    private readonly dispatch: Dispatch<DispatchAction>;

    constructor(dispatch: Dispatch<DispatchAction>) {
        this.dispatch = dispatch;
    }

    nameChange = (userName: string) =>
        this.dispatch({ type: 'nameChange', payload: { userName } });

    emailChange = (userEmail: string) =>
        this.dispatch({ type: 'emailChange', payload: { userEmail } });

    roleChange = (userRole: string) =>
        this.dispatch({ type: 'roleChange', payload: { userRole } });

    numberChange = (userMobile: string) =>
        this.dispatch({ type: 'numberChange', payload: { userMobile } });

    countryChange = (userCountry: string) =>
        this.dispatch({ type: 'countryChange', payload: { userCountry } });

    validateSubmit = (formValid: boolean) =>
        this.dispatch({ type: 'validateSubmit', payload: { formValid } });

    onCancel = () => this.dispatch({ type: 'onCancel', payload: {} });

    onEdit = (isEditBtnVisible: boolean) =>
        this.dispatch({ type: 'onEdit', payload: { isEditBtnVisible } });

    onSubmit = (
        userName: string,
        userEmail: string,
        userRole: string,
        userMobile: string,
        userCountry: string,
        isEditBtnVisible: boolean
    ) =>
        this.dispatch({
            type: 'onSubmit',
            payload: {
                userName,
                userEmail,
                userRole,
                userMobile,
                userCountry,
                isEditBtnVisible,
            },
        });
}

export default RootDispatcher;