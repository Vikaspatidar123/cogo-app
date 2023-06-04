import { Toast } from '@cogoport/components';

import getFormattedValues from '@/ui/commons/utils/getFormattedValues';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const addService = async ({
	performed_by_org_id, trigger, obj, values, idVal, refetch, handleClose, service_id,
}) => {
	const payload = {
		performed_by_org_id,
		name         : obj.name,
		code         : obj.code,
		service_type : obj.service_type,
		category     : obj.category,
		...getFormattedValues(values),
		...idVal,
	};
	if (service_id) {
		payload.service_id = service_id;
	}
	let funcRes = {};
	try {
		const res = await trigger({ data: payload });
		if (!res.hasError) {
			if (!service_id) {
				refetch();
				handleClose();
				Toast.success('Additional service added successfully!');
			} else {
				funcRes = { success: true, res };
			}
		} else if (!service_id) {
			showErrorsInToast(
				res.messages || [
					'The application has encountered an unknown error. Our team is looking into this with the utmost urgency. Please try again after some time. If the issue persists, please contact us via chat.',
				],
			);
			handleClose();
		} else {
			funcRes = { success: false, err: res.messages };
		}
		return funcRes;
	} catch (err) {
		if (!service_id) {
			showErrorsInToast(err?.data);
		} else {
			funcRes = { success: false, err: err?.data };
		}
		return funcRes;
	}
};

const createAdditionalService = ({
	selectedService,
	scope,
	user_id,
	service_id,
	values,
	refetch,
	handleClose,
	id,
	services,
	trigger,
	allServices,
	viewAs,
}) => {
	const performed_by_org_id = scope === 'partner' ? user_id : undefined;
	if (!selectedService) {
		Toast.error('Please selcet a service');
	} else {
		const idVal = service_id ? { service_id, shipment_id: id } : { shipment_id: id };
		const obj = services.find((item) => item.value === selectedService);
		const servicesToAddIn = [];
		if (viewAs === 'importer_exporter') {
			allServices.forEach((service) => {
				if (
					service?.service_type === obj.service_type
					&& !service?.main_service_id
					&& (!service?.trade_type || !obj.trade_types || (obj.trade_types
						|| []).includes(service?.trade_type))) {
					servicesToAddIn.push(service);
				}
			});
		}
		if (values) {
			if (servicesToAddIn.length > 1) {
				const promises = [];
				servicesToAddIn.forEach((service) => {
					promises.push(addService({
						performed_by_org_id, trigger, obj, values, idVal, refetch, handleClose, service_id: service?.id,
					}));
				});
				Promise.all(promises).then((res) => {
					let allResolved = true;
					res.forEach((promiseRes) => {
						if (!promiseRes?.success) {
							allResolved = false;
						}
					});
					if (allResolved) {
						refetch();
						handleClose();
						Toast.success('Additional service added successfully!');
					} else {
						const errors = [];
						res.forEach((newErr) => {
							errors.push(newErr.err);
						});
						showErrorsInToast(errors);
					}
				}).catch((err) => {
					console.log(err);
					Toast.error('Something went wrong please try again');
				});
			} else if (viewAs === 'importer_exporter' && servicesToAddIn.length === 1) {
				idVal.service_id = servicesToAddIn[0]?.id;
				addService({ performed_by_org_id, trigger, obj, values, idVal, refetch, handleClose });
			} else {
				addService({ performed_by_org_id, trigger, obj, values, idVal, refetch, handleClose });
			}
		}
	}
};

export default createAdditionalService;
