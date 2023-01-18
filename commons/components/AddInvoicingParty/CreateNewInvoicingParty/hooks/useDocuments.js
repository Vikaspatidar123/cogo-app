import { useFormCogo } from '@cogoport/front/hooks';
import useCreateOrgTradeParty from '../../hooks/useCreateOrgTradeParty';
import { getDocumentControls } from '../../utils/controls';

const useDocuments = ({
	filledDetails = {},
	setFilledDetails = () => {},
	orgResponse = {},
	tradePartyType = {},
	setShowModal = () => {},
	fetchOrganizationTradeParties = () => {},
}) => {
	const documentControls =
		getDocumentControls({ values: filledDetails.documents }) || [];

	const documentFormProps = useFormCogo(documentControls);

	const { onSubmit = () => {}, loading = false } = useCreateOrgTradeParty({
		orgResponse,
		tradePartyType,
		setShowModal,
		filledDetails,
		setFilledDetails,
		fetchOrganizationTradeParties,
	});

	return {
		onSubmit,
		loading,
		documentControls,
		documentFormProps,
	};
};

export default useDocuments;
