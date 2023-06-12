import { useContext } from 'react';

import { ShipmentDetailContext } from '../common/Context';

const useGetPocList = ({
	stakeholder = {},
	setUtilities = () => {},
	utilities,
}) => {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const handleAddExternalPoc = (props) => {
		setUtilities({
			...utilities,
			roleCheck    : 'external_poc',
			businessName : stakeholder.trade_party_type
				? stakeholder?.trade_partner_details?.business_name
				: shipment_data?.importer_exporter?.business_name,
			addExternlPocModal : true,
			trade_party_id     : stakeholder?.trade_party_id,
			trade_type         : props,
		});
	};

	const handleAddPoc = () => {
		setUtilities({
			...utilities,
			roleCheck    : stakeholder.trade_party_type || 'booking_party',
			businessName : stakeholder.trade_party_type
				? stakeholder.trade_partner_details?.business_name
				: shipment_data?.importer_exporter?.business_name,
			addPocModal    : true,
			trade_party_id : stakeholder.trade_party_id,
		});
	};

	const handleEdit = () => {
		setUtilities({
			...utilities,
			roleCheck:
				stakeholder?.trade_party_type === 'self'
					? 'booking_party'
					: stakeholder?.trade_party_type,
			addCompanyModal: true,
			trade_party_id:
				stakeholder?.trade_party_type === 'collection_party'
					? stakeholder.service_provider_id
					: stakeholder.trade_party_id,
		});
	};

	return {
		handleEdit,
		handleAddPoc,
		handleAddExternalPoc,
	};
};

export default useGetPocList;
