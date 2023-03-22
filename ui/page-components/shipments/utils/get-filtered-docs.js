const blServices = ['fcl_freight_service', 'lcl_freight_service'];
const showDoc = (doc, contextValues) => {
	const { viewAs, shipment_data, services } = contextValues || {};
	const blService = (services || []).find((service) => blServices.includes(service?.service_type)) || shipment_data;
	// hide MBL for importer exporter if opted for HBL
	const conditions = {
		bl_hide_for_imp_if_bl_cat_hbl:
			viewAs === 'importer_exporter'
			&& blService?.bl_category === 'hbl'
			&& (doc?.document_type === 'bill_of_lading' || doc?.document_type === 'draft_bill_of_lading'),
	};
	let show = true;
	Object.keys(conditions).forEach((condition) => {
		if (conditions[condition]) {
			show = false;
		}
	});
	return show;
};
const getFilteredDocs = (docs, contextValues) => docs.filter((doc) => showDoc(doc, contextValues));
export default getFilteredDocs;
