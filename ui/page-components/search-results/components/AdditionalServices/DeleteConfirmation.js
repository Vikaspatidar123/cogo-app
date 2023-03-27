import React from 'react';
import startCase from '@cogo/utils/startCase';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import { useRequest } from '@cogo/commons/hooks';
import { Button, toast } from '@cogoport/front/components';
import { ButtonWrap } from './styles';

const DELETE_SUBSIDIARY_SERVICES = ['ftl_freight'];

function DeleteConfirmation({
	deleteService = '',
	setShow = () => {},
	setDeleteService = () => {},
	loading = false,
	setLoading = () => {},
	servicesList = [],
	data = {},
	refetch = () => {},
	scope = '',
}) {
	let updateSpotSearchApi = {};
	if (!data?.checkout_id) {
		updateSpotSearchApi = useRequest(
			'post',
			false,
			scope,
		)('/update_spot_search');
	} else {
		updateSpotSearchApi = useRequest(
			'post',
			false,
			scope,
		)('/update_checkout_service');
	}

	const handleDeleteService = async () => {
		const service_split = deleteService.split(':');
		let serviceToBeDeleted = service_split[1]
			? service_split[1]
			: service_split[0];

		if (
			data?.service_type === 'fcl_freight' &&
			serviceToBeDeleted === 'trailer_freight' &&
			data?.checkout_id
		) {
			serviceToBeDeleted = 'haulage_freight';
		} else if (
			data?.service_type === 'air_freight' &&
			data?.trade_type === 'domestic' &&
			service_split.includes('Agent Handling Fees - Rebate')
		) {
			serviceToBeDeleted = 'Agent Handling Fees - Rebate';
		}

		let trade_type = '';
		if (service_split[0] === 'origin') {
			trade_type = 'export';
		} else if (service_split[0] === 'destination') {
			trade_type = 'import';
		} else if (
			data?.service_type === 'air_freight' &&
			data?.trade_type === 'domestic'
		) {
			trade_type = 'domestic';
		}

		let deleted_services = [];

		deleted_services = (servicesList || []).filter(
			(item) =>
				(item?.service_type === service_split[1] ||
					item?.service_name === service_split[1]) &&
				(item?.trade_type === trade_type || !item?.trade_type),
		);

		if (serviceToBeDeleted === 'air_freight_local') {
			deleted_services = [];
			deleted_services = (servicesList || []).filter((item) => {
				if (data?.service_type === 'air_freight') {
					return (
						item?.service_type === serviceToBeDeleted &&
						item?.trade_type === trade_type
					);
				}

				return item?.service_type === serviceToBeDeleted;
			});
		} else if (serviceToBeDeleted === 'Agent Handling Fees - Rebate') {
			deleted_services = [];
			deleted_services = (servicesList || []).filter(
				(item) =>
					item?.service_name === serviceToBeDeleted &&
					item?.trade_type === trade_type,
			);
		} else if (serviceToBeDeleted === 'cargo_insurance') {
			deleted_services = [];
			deleted_services = (servicesList || []).filter(
				(item) => item?.service_type === serviceToBeDeleted,
			);
		}

		if (
			data?.service_type === 'ftl_freight' &&
			DELETE_SUBSIDIARY_SERVICES.includes(serviceToBeDeleted)
		) {
			deleted_services = [];
			deleted_services = (servicesList || []).filter(
				(item) => item?.service_name === service_split[0],
			);
		}

		const isSubsidiary = deleted_services?.[0]?.service_type === 'subsidiary';
		const ids = deleted_services.map((service) => service.id);

		if (isSubsidiary) {
			serviceToBeDeleted = 'subsidiary';
		}

		const service_type = isSubsidiary
			? 'subsidiary_services_attributes'
			: `${serviceToBeDeleted}_services_attributes`;

		const params = (ids || []).map((id) => ({ id, status: 'inactive' }));

		setLoading(true);
		try {
			const payload = {
				id: data?.checkout_id ? data?.checkout_id : data?.spot_search_id,
				service: serviceToBeDeleted,
				[service_type]: params,
			};

			const res = await updateSpotSearchApi.trigger({ data: payload });

			if (!res.hasError) {
				toast.success('Service deleted successfully!');
				setLoading(false);
				setShow(false);
				refetch();
			}
		} catch (err) {
			showErrorsInToast(err?.data);
			setShow(false);
			setLoading(false);
		}
		setLoading(false);
	};

	const handleServiceName = (service) => {
		const splitName = service.split(':');
		if (splitName[2]) {
			return `${startCase(splitName[0])} ${splitName[1]} (${startCase(
				splitName[2],
			)})`;
		}
		return startCase(service);
	};

	return (
		<>
			<h2 style={{ marginTop: '0px' }}>
				{`Are you sure you want to delete - ${handleServiceName(
					deleteService,
				)}?`}
			</h2>

			<ButtonWrap>
				<Button
					id="search_results_additional_service_delete_cancel_btn"
					onClick={() => {
						setShow(false);
						setDeleteService('');
					}}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					style={{
						background: '#ffffff',
						color: '#000000',
						border: '1px solid #000000',
					}}
					onClick={() => handleDeleteService()}
					disabled={loading}
					id="search_results_additional_service_delete_save_btn"
				>
					Delete
				</Button>
			</ButtonWrap>
		</>
	);
}

export default DeleteConfirmation;
