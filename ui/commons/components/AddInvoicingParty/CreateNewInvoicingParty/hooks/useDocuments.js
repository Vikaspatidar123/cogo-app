import { useTranslation } from 'next-i18next';

import useCreateOrgTradeParty from '../../hooks/useCreateOrgTradeParty';
import getDocumentControls from '../../utils/documentControls';

import { useForm } from '@/packages/forms';

const useDocuments = ({
	filledDetails = {},
	setFilledDetails = () => {},
	orgResponse = {},
	tradePartyType = {},
	setShowModal = () => {},
	fetchOrganizationTradeParties = () => {},
	source,
}) => {
	const { t } = useTranslation(['common']);
	const documentControls =		getDocumentControls({ values: filledDetails.documents, t }) || [];

	const documentFormProps = useForm();

	const { onSubmit = () => {}, loading = false } = useCreateOrgTradeParty({
		orgResponse,
		tradePartyType,
		setShowModal,
		filledDetails,
		setFilledDetails,
		fetchOrganizationTradeParties,
		source,
	});

	return {
		onSubmit,
		loading,
		documentControls,
		documentFormProps,
		t,
	};
};

export default useDocuments;
