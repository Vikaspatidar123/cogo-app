import isEmpty from '@cogo/utils/isEmpty';

import { getData } from '../apis';

const getInitialTaskRequirments = async ({
	configs,
	setIsLoading,
	setConfigs,
	getProperConfigs,
	data,
	user_id,
	scope,
	setResponse,
	shipment_data,
	viewAs,
	docMappings,
}) => {
	setIsLoading(true);
	const performed_by_org_id = configs.params?.performed_by_org_id ? user_id : undefined;
	const allParams = { ...(configs.params || {}), performed_by_org_id };
	const { response: apiResponse } = await getData(configs.getEndPoint, allParams, scope);
	const documentType = docMappings[data?.task];
	let is_house_doc_uploaded = false;
	const categories = ['hbl', 'hawb'];
	if (viewAs === 'service_provider' && documentType && categories.includes(shipment_data?.bl_category)) {
		const { response: doc } = await getData('/list_shipment_documents', { filters: { document_type: documentType, shipment_id: shipment_data?.shipment_id } }, scope);
		is_house_doc_uploaded = doc?.list?.length > 0;
	}
	const invoiceData = (apiResponse?.data || [])[0] || {};
	const additionalServiceData = (apiResponse?.list || [])[0] || {};
	if (configs.getEndPoint === 'get_shipment_invoice_preference') {
		setResponse({
			...invoiceData,
			invoice_id: invoiceData.id,
		});
		setIsLoading(false);
	} else if (configs.getEndPoint === 'list_shipment_additional_services') {
		setResponse({ ...additionalServiceData });
		setConfigs(
			getProperConfigs({ ...data, ...additionalServiceData, pending_task_id: data.id, user_id }),
		);
		setIsLoading(false);
	} else if (configs.getEndPoint === 'get_shipment_quotation') {
		const temp = (apiResponse?.service_charges || []).map((item) => item);

		if (!isEmpty(apiResponse?.other_charges)) {
			temp.push(apiResponse?.other_charges);
		}
		setResponse({ serviceCharges: temp });
		setIsLoading(false);
	} else if (configs.getEndPoint === 'get_sailing_schedules') {
		const allSailingSchedules = apiResponse?.list || [];
		const mainSailingSchedule = allSailingSchedules.find((item) => item?.shipping_line_id === shipment_data?.shipping_line_id);
		setConfigs(getProperConfigs({ ...data, mainSailingSchedule, pending_task_id: data.id, user_id }));
		setIsLoading(false);
	} else {
		const newResponse = {
			...apiResponse,
			is_house_doc_uploaded,
			invoice_id : apiResponse.id,
			containers : (apiResponse || []).list,
			total      : apiResponse.total_count || 0,
		};
		setResponse({ ...newResponse });
		setConfigs(getProperConfigs({ ...data, ...newResponse, pending_task_id: data.id, user_id }));
		setIsLoading(false);
	}
};

export default getInitialTaskRequirments;
