import { validatePlainText, validateEmail, validateMobile } from '../Validate';

describe('Validate Fields', () => {
	test('test field validation', () => {
		expect(validatePlainText('User Name')).toEqual(true);
		expect(validatePlainText('User2')).toEqual(false);

		expect(validateEmail('prasanna@123.co')).toEqual(true);
		expect(validateEmail('prasanna))')).toEqual(false);

		expect(validateMobile('+65', 'Afghanistan')).toEqual(false);
		expect(validateMobile('+658616262', 'Singapore')).toEqual(true);
		expect(validateMobile('+3', 'Abc')).toEqual(false);
	});
});