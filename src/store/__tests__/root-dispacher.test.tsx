import RootDispatcher from '../root-dispatcher';

describe('Root Dispatcher', () => {
    test('Dispatch Name Change', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).nameChange('User Name');
        expect(dispatch).toBeCalledWith({
            payload: { userName: 'User Name' },
            type: 'nameChange',
        });
    });
    test('when user name is changed', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).roleChange('User Role');
        expect(dispatch).toBeCalledWith({
            payload: { userRole: 'User Role' },
            type: 'roleChange',
        });
    });
    test('when use mobile is change', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).numberChange('100');
        expect(dispatch).toBeCalledWith({
            payload: { userMobile: '100' },
            type: 'numberChange',
        });
    });
    test('when use edit button is clicked', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).onEdit(true);
        expect(dispatch).toBeCalledWith({
            payload: { isEditBtnVisible: true },
            type: 'onEdit',
        });
    });
    test('when submit button is clicked', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).validateSubmit(true);
        expect(dispatch).toBeCalledWith({
            payload: { formValid: true },
            type: 'validateSubmit',
        });
    });
});