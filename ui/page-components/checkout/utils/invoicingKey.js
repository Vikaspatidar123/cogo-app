// import { get } from '@cogoport/front/utils';

// const getInvoicingComponentKey = ({ invoice }) => {
// 	const invoicingParties = get(invoice, 'billing_addresses', []);
// 	const invoicingPartiesComponentKey = invoicingParties
// 		.map((invoicingParty) => {
// 			const { id, services } = invoicingParty;
// 			const servicesIds = (services || []).map(({ service_id }) => service_id);
// 			return `${id}_${servicesIds.join('_')}`;
// 		})
// 		.join('_');
// 	return invoicingPartiesComponentKey;
// };
// export default getInvoicingComponentKey;
