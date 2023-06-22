import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useBookShipment = ({
	serviceId,
	setOpen = () => { },
	service_type,
	origin_id,
	destination_id,
	importer_exporter_id,
	user,
	branch,
	bookShipmentRef,
	dateTimePickerValue,
}) => {
	const {
		profile: { id },
	} = useSelector((state) => state);

	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);

	const [{ loading: apiLoading }, trigger] = useRequest({
		url    : '/create_contract_trade_requirements_draft',
		method : 'post',
	}, { manual: true });

	const handleFormSubmit = async () => {
		setLoading(true);

		const data_containers = bookShipmentRef.current.options?.values.containers;

		const containers = data_containers.map((item) => {
			const {
				container_size,
				containers_count,
				cargo_weight_per_container,
				container_type_commodity,
			} = item;

			const { container_type, commodity } = container_type_commodity || {};

			return {
				containers_count,
				container_size,
				container_type,
				commodity,
				cargo_weight_per_container,
			};
		});

		if (!user) {
			Toast.error('user id is required');
			setLoading(false);

			return;
		}

		if (!dateTimePickerValue) {
			Toast.error('departure date is required');
			setLoading(false);

			return;
		}

		try {
			const payload = {
				service_type,
				inco_term                   : bookShipmentRef.current.options?.values.inco_term,
				origin_location_id          : origin_id,
				destination_location_id     : destination_id,
				departure_date              : dateTimePickerValue,
				created_by_id               : id,
				importer_exporter_id,
				containers,
				user_id                     : user,
				importer_exporter_branch_id : branch,
				source_id                   : serviceId,
			};

			await trigger({ data: payload });
			Toast.success('Success!!');
			setOpen(false);
		} catch (err) {
			showErrorsInToast(err.response.data);
		} finally {
			setLoading(false);
		}
	};

	const onError = (errs) => {
		setErrors(errs);
	};

	return {
		errors,
		onError,
		loading,
		scheduleLoading: apiLoading,
		handleFormSubmit,
	};
};

export default useBookShipment;
