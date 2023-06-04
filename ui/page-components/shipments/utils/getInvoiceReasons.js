import incoTerms from '@cogo/smart-components/constants/inco-terms.json';

import mainServices from '../configurations/common/main-services.json';

const getInvoiceNotGeneratonReasons = (type, services) => {
	const service = services.find((serviceObj) => mainServices.includes(serviceObj?.service_type));
	const service_type = service?.service_type;
	const inco_term = service?.inco_term;
	const bl_type = service?.bl_type;
	const trade_type = incoTerms.find(
		(inco) => inco.value === inco_term,
	)?.tradeType;
	if (type === 'invoice') {
		const mapps = {
			fcl_freight_service_export     : 'Vessel may not be departed',
			fcl_freight_service_export_rfs : 'Containers may not be gated in',
			fcl_freight_service_import     : 'Vessel may not be arrived',
			lcl_freight_service_export     : 'Draft bill of lading may not be uploaded',
			lcl_freight_service_import     : 'Cargo may not be handed over',
			air_freight_service_export     : 'Draft house airway bill may not be uploaded',
			air_freight_service_import     : 'Delivery order may not be uploaded',
			trailer_freight_service        : 'Trailer Freight service may not be completed',
			ftl_freight_service            : 'FTL Freight service may not be completed',
			ltl_freight_service            : 'LTL Freight service may not be completed',
			haulage_freight_service        : 'Haulage Freight service may not be completed',
		};
		return (
			mapps[`${service_type}_${trade_type}_${bl_type}`]
			|| mapps[`${service_type}_${trade_type}`]
			|| mapps[service_type]
		);
	}
	if (type === 'proforma') {
		const mapps = {
			fcl_freight_service_export: 'Containers may not be gated in',
			fcl_freight_service_export_rfs:
				'Service may not be confirmed by service provider',
			fcl_freight_service_import:
				'Service may not be confirmed by service provider',
			lcl_freight_service_export : 'Cargo may not be carted in',
			lcl_freight_service_import : 'Vessel may not be arrived',
			air_freight_service_export : 'Cargo may not be handed over at origin',
			air_freight_service_import : 'Flight may not have been arrived',
			trailer_freight_service    : 'Containers may not be picked up',
			ftl_freight_service        : 'Cargo may not be picked up',
			ltl_freight_service        : 'Cargo may not be picked up',
			haulage_freight_service:
				'Service may not be confirmed by service provider',
		};
		return (
			mapps[`${service_type}_${trade_type}_${bl_type}`]
			|| mapps[`${service_type}_${trade_type}`]
			|| mapps[service_type]
		);
	}
	return null;
};
export default getInvoiceNotGeneratonReasons;
