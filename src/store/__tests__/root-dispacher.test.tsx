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
    test('Dispatch Role Change', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).roleChange('User Role');
        expect(dispatch).toBeCalledWith({
            payload: { role: 'User Role' },
            type: 'roleChange',
        });
    });
    test('Dispatch Number Change', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).numberChange('100');
        expect(dispatch).toBeCalledWith({
            payload: { mobile: '100' },
            type: 'numberChange',
        });
    });
    test('Dispatch onEidt', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).onEdit(true);
        expect(dispatch).toBeCalledWith({
            payload: { editBtnVisible: true },
            type: 'onEdit',
        });
    });
    test('Dispatch Validate Submir', () => {
        const dispatch = jest.fn();
        new RootDispatcher(dispatch).validateSubmit(true);
        expect(dispatch).toBeCalledWith({
            payload: { formValid: true },
            type: 'validateSubmit',
        });
    });
});