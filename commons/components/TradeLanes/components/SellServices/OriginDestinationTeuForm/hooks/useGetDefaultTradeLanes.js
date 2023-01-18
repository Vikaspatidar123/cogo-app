import { useEffect } from 'react';
import { toast } from '@cogoport/front/components';
import useRequest from '@/temp/request/useRequest';
import { useSelector } from '@cogoport/front/store';

const useGetDefaultTradeLanes = ({
	frieghtType,
	setValues,
	setAddedTradeLanesArray,
}) => {
	const { profile } = useSelector((state) => state);

	const api = useRequest('get', false, 'partner')('/get_organization_services');

	const fetchGetOrganizationServices = async () => {
		try {
			const response = await api.trigger({
				params: {
					organization_id: profile?.partner?.twin_service_provider_id,
				},
			});

			const getApiList = response.data?.[frieghtType] || [];

			const defaultListAddedTradeLanes = getApiList?.service_expertise?.map(
				(item) => {
					return {
						mapping_id: item?.id,
						origin_id: item?.origin_location?.id,
						destination_id: item?.destination_location?.id,
						teu: item?.total_teus,
					};
				},
			);

			const locationsFill = getApiList?.service_expertise?.map((val) => {
				return {
					origin_location_id: val?.origin_location?.id,
					destination_location_id: val?.destination_location?.id,
					total_teus: val?.total_teus,
				};
			});

			const cargoFill = getApiList?.service_data?.cargo_types;

			const shippingFill = getApiList?.service_data?.shipping_lines;
			const airlinesFill = getApiList?.service_data?.airlines;

			if (locationsFill?.length > 0) {
				setValues({
					location_pairs: locationsFill,
				});
			}
			if (cargoFill?.length > 0) {
				setValues({
					cargo_types: cargoFill,
				});
			}
			if (shippingFill?.length > 0) {
				setValues({
					shipping_lines: shippingFill,
				});
			}
			if (airlinesFill?.length > 0) {
				setValues({
					airlines: airlinesFill,
				});
			}

			setAddedTradeLanesArray(defaultListAddedTradeLanes);
		} catch (error) {
			toast.error(error.data);
		}
	};

	useEffect(() => {
		fetchGetOrganizationServices();
	}, []);

	return {
		fetchGetOrganizationServices,
		loadingGetPartnerUser: api.loading,
	};
};

export default useGetDefaultTradeLanes;
