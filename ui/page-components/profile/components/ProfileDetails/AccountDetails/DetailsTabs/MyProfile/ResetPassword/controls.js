// import { getGeoConstants } from '@/constants/geo';

// const geo = getGeoConstants();

const getControls = ({ t = () => {} }) => {
	const translationKey =		'profile:accountDetails.tabOptions.profile.resetPassword.controls';

	return [
		{
			label : t(`${translationKey}.password.label`),
			name  : 'password',
			type  : 'password',
			span  : 12,
			rules : {
				required : true,
				pattern  : {
					// value   : geo.regex.PASSWORD.PASSWORD_PATTERN,
					message: t(`${translationKey}.password.rules.pattern.message`),
				},
			},
		},
		{
			name  : 'confirmPassword',
			label : t(`${translationKey}.confirmPassword.label`),
			type  : 'password',
			span  : 12,
			rules : {
				required: true,
			},
		},
	];
};

export default getControls;
