import RootDispatcher from '../RootDispatcher';

describe('Root Dispatcher', () => {
    test('when name Change', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).nameChange('User Name');
        expect(dispatch).toBeCalledWith({
            payload: { userName: 'User Name' },
            type: 'nameChange',
        });
    });
    test('when role is changed', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).roleChange('User Role');
        expect(dispatch).toBeCalledWith({
            payload: { userRole: 'User Role' },
            type: 'roleChange',
        });
    });
    test('when mobile is change', () => {
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