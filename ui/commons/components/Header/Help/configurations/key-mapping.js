const translationKey = 'common:components_header_tickets_keymapping';

export const actionButtonKeys = ({ t }) => ({
	unresolved: {
		label : t(`${translationKey}_resolve`),
		name  : 'resolve',
	},
	closed: {
		label : t(`${translationKey}_reopen`),
		name  : 'reopen',
	},
	pending: {
		label : t(`${translationKey}_resolve`),
		name  : 'resolve',
	},
	escalated: {
		label : t(`${translationKey}_resolve`),
		name  : 'resolve',
	},
	reject_requested: {
		label : t(`${translationKey}_resolve`),
		name  : 'resolve',
	},
	resolve_requested: {
		label : t(`${translationKey}_resolve`),
		name  : 'resolve',
	},
});

export const tabsKeysMapping = ({ t }) => [
	{
		name  : 'all',
		title : t(`${translationKey}_all`),
	},
	{
		name  : 'open',
		title : t(`${translationKey}_open`),
	},
	{
		name  : 'solved',
		title : t(`${translationKey}_solved`),
	},
];

export const statusLabelTransformation = ({ t }) => ({
	open: {
		label : t(`${translationKey}_open`),
		color : '#D6B300',
	},
	closed: {
		label : t(`${translationKey}_solved`),
		color : '#ABCD62',
	},
	rejected: {
		label : t(`${translationKey}_rejected`),
		color : '#F37166',
	},
});
