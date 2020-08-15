import { validatePlainText, validateEmail, validateMobile } from "../Validate";

describe("Validate Fields", () => {
	test("field in the form validated", () => {
		expect(validatePlainText("User Name")).toEqual(true);
		expect(validateEmail("prasanna@123.co")).toEqual(true);
		expect(validateMobile("+658616262", "Singapore")).toEqual(true);
	});

	test("incorrect values for validation", () => {
		expect(validatePlainText("")).toEqual(false);
		expect(validatePlainText("@#$%^&")).toEqual(false);

		expect(validateEmail("")).toEqual(false);
		expect(validateEmail("@##2")).toEqual(false);

		expect(validateMobile("", "")).toEqual(false);
		expect(validateMobile("+3", "Abc")).toEqual(false);
	});
});