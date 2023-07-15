export const prompts = (t = () => {}) => {
	const loginTranslationKey = 'common:loginLoading_prompt';
	const signupTranslationKey = 'authentication:signupLoading_prompt';

	const generatePrompts = (translationKey, count) => {
		const promptsArray = Array.from({ length: count }, (_, index) => t(`${translationKey}_${index + 1}`));

		return promptsArray;
	};

	return {
		login  : generatePrompts(loginTranslationKey, 5),
		signup : generatePrompts(signupTranslationKey, 9),
	};
};
