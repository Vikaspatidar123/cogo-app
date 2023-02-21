export const getPanHolderStatusOptions = ({ t = () => {} }) => {
	const translationKey =
		'common:components.addInvoicingParty.utils.panHolderStatus';
	return [
		{
			label: t(`${translationKey}.private_limited.label`),
			value: 'private_limited',
		},
		{
			label: t(`${translationKey}.public_limited.label`),
			value: 'public_limited',
		},
		{
			label: t(`${translationKey}.partnership.label`),
			value: 'partnership',
		},
		{
			label: t(`${translationKey}.limited_liability_partnership.label`),
			value: 'limited_liability_partnership',
		},
		{
			label: t(`${translationKey}.proprietorship.label`),
			value: 'proprietorship',
		},
		{ label: 'Other', value: 'other' },
	];
};

const PAN_HOLDER_STATUS = {
	C: 'private_limited',
	F: 'partnership',
	P: 'proprietorship',
};

export const getPanHolderStatus = (pan = '') => {
	if ((pan || '').length !== 10) {
		return null;
	}

	return PAN_HOLDER_STATUS[pan[3]] || 'other';
};
