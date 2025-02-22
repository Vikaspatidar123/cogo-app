import { useContext } from 'react';

import { ShipmentDetailContext } from '../components/ShipmentDetails/common/Context';

import { useSelector } from '@/packages/store';

const useGetSopPayload = (
	formValues,
	trade_partners_details,
	dataFromOtherSource,
) => {
	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));
	let [{ shipment_data, primary_service }] = useContext(ShipmentDetailContext);

	shipment_data = dataFromOtherSource?.shipment_data || shipment_data;
	primary_service = dataFromOtherSource?.primary_service || primary_service;

	const conditions = {
		shipper: {
			data : trade_partners_details?.shipper?.trade_party_id,
			key  : 'shipper_trade_party_id',
		},

		consignee: {
			data : trade_partners_details?.consignee?.trade_party_id,
			key  : 'consignee_trade_party_id',
		},

		commodity: {
			data : primary_service?.commodity_description,
			key  : 'commodity',
		},

		origin: {
			data: (primary_service?.origin_port || primary_service?.origin_airport)
				?.country?.country_id,
			key: 'origin_country_id',
		},

		destination: {
			data: (
				primary_service?.destination_port
				|| primary_service?.destination_airport
			)?.country?.country_id,
			key: 'destination_country_id',
		},

		country: {
			data: (primary_service?.origin_port || primary_service?.origin_airport)
				?.country?.country_id,
			key: 'country_id',
		},
	};
	const sop_instructions = [];
	(formValues.instruction_items || []).forEach((element) => {
		const addable = element?.instruction || element?.file?.length;
		const instruction = {
			instruction: element?.instruction,
		};

		if (element?.file?.length) {
			instruction.url_links = element?.file;
		}

		if (addable) {
			sop_instructions.push(instruction);
		}
	});
	const payload = {
		organization_id : shipment_data?.importer_exporter_id,
		heading         : formValues?.heading,
		sop_instructions,
	};
	const sopConditions = {};
	(formValues?.conditions || []).forEach((condition) => {
		if (conditions[condition]?.data) {
			sopConditions[conditions[condition].key] = conditions[condition]?.data;
		}
	});
	const shipmentPayload = { ...payload };
	shipmentPayload.shipment_id = dataFromOtherSource?.shipment_id || query?.id;

	const booking_party_payload = { ...payload, ...sopConditions };
	return {
		shipment_payload : shipmentPayload,
		booking_party_payload,
		status           : sop_instructions?.length > 0,
	};
};
export default useGetSopPayload;
