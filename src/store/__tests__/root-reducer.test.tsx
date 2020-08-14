import { rootReducer, initialState } from '../root-reducer';

describe('rootReducer', () => {
    test('Submit Reducer', () => {
        expect(
            rootReducer(undefined, {
                type: 'onSubmit',
                payload: {
                    userName: 'New User Name',
                    userRole: 'New Role',
                    userCountry: 'New Country',
                },
            })
        ).toEqual({
            ...initialState,
            isEditBtnVisible: true,
            profileData: {
                userProfileName: 'New User Name',
                userProfileRole: 'New Role',
                userProfileCountry: 'New Country',
            },
        });
    });
});