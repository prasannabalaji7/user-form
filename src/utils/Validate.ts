import { countryData,userExp,emailExp,mobileExp } from '../constants/Constants';

export const validatePlainText=(matchText:string)=>userExp.test(matchText);

export const validateEmail=(matchText:string)=>emailExp.test(matchText);

export const validateMobile=(matchText:string,country:string)=>{
	let mobilecode = countryData.filter(
						(item) => item.name === country
					)[0];
	return mobileExp.test(matchText) && matchText.startsWith('+' + mobilecode['value']);
}