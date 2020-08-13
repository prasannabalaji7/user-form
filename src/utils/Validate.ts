import {
	countryData,
	userExp,
	emailExp,
	mobileExp,
} from '../constants/Constants';

export const validatePlainText = (matchText: string): boolean =>
	userExp.test(matchText);

export const validateEmail = (matchText: string): boolean =>
	emailExp.test(matchText);

export const validateMobile = (matchText: string, country: string): boolean => {
	const mobilecode = countryData.filter((item) => item.name === country)[0];
	return (
		mobileExp.test(matchText) &&
		matchText.startsWith('+' + mobilecode['value'])
	);
};