import useCreateOrgTradeParty from '../../hooks/useCreateOrgTradeParty';
import { getDocumentControls } from '../../utils/controls';

import { useForm } from '@/packages/forms';

const useDocuments = ({
	filledDetails = {},
	setFilledDetails = () => {},
	orgResponse = {},
	tradePartyType = {},
	setShowModal = () => {},
	fetchOrganizationTradeParties = () => {},
	source = '',
}) => {
	const documentControls = getDocumentControls({ values: filledDetails.documents }) || [];

	const { documentFormProps, control } = useForm();

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
		control,
	};
};

export default useDocuments;
