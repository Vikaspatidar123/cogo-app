import { useTranslation } from 'next-i18next';

const getConfig = () => {
	const { t } = useTranslation(['profile']);
	const translationKey =
		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.bankDetailsDocument.configurations.list.';
	return {
		list: [
			{
				key: 'accountHolderName',
				label: t(`${translationKey}accountHolderName.label`),
				span: 1.5,
			},
			{
				key: 'bankAccountNumber',
				label: t(`${translationKey}bankAccountNumber.label`),
				span: 2,
			},
			{
				key: 'bankName',
				label: t(`${translationKey}bankName.label`),
				span: 2,
			},
			{
				key: 'branchName',
				label: t(`${translationKey}branchName.label`),
				span: 2,
			},
			{
				key: 'ifsc',
				label: t(`${translationKey}ifsc.label`),
				span: 2,
			},
			{
				key: 'documentProof',
				label: t(`${translationKey}documentProof.label`),
				span: 1.5,
			},
			{
				key: 'status',
				label: t(`${translationKey}status.label`),
				span: 1,
			},
		],
	};
};

export default getConfig;
