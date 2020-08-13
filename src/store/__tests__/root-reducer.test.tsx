import { rootReducer, initialState } from '../root-reducer';

describe('rootReducer', () => {
    test('Submit Reducer', () => {
        expect(
            rootReducer(undefined, {
                type: 'onSubmit',
                payload: {
                    userName: 'New User Name',
                    role: 'New Role',
                    country: 'New Country',
                },
            })
        ).toEqual({
            ...initialState,
            editBtnVisible: true,
            profileData: {
                userProfileName: 'New User Name',
                userProfileRole: 'New Role',
                userProfileCountry: 'New Country',
            },
        });
    });
});