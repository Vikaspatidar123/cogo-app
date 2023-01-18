import { useEffect, useState } from 'react';
import { toast } from '@cogoport/front/components';
import { useSelector } from '@cogoport/front/store';
import useRequest from '@/temp/request/useRequest';

const useGetDefaultValues = ({
	frieghtType,
	setValues,
	setAddedTradeLanesArray,
}) => {
	const [componentLoading, setComponentLoading] = useState(false);

	const {
		profile: { partner },
	} = useSelector((state) => state);

	const getOrganizationServicesApi = useRequest(
		'get',
		false,
		'partner',
	)(`/get_organization_services`);

	const fetchOrganizationServicesApi = async () => {
		try {
			const response = await getOrganizationServicesApi.trigger({
				params: {
					organization_id: partner?.twin_service_provider_id,
					service: frieghtType,
				},
			});

			const getApiList = response.data?.[frieghtType] || [];
			const defaultListAddedTradeLanes = getApiList?.service_expertise?.map(
				(element) => {
					return {
						mapping_id: element.id,
						trade_type: element.trade_type,
						location_id: element.location_id,
					};
				},
			);

			setAddedTradeLanesArray(defaultListAddedTradeLanes);
			const locationsFill = getApiList?.service_expertise?.map((val) => {
				return {
					location_id: val?.location?.id,
					trade_type: val?.trade_type,
					total_teus: val?.total_teus,
				};
			});
			const cargoFill = getApiList?.service_data?.cargo_types;
			if (locationsFill?.length > 0) {
				setValues({
					locations: locationsFill,
				});
			}
			if (cargoFill?.length > 0) {
				setValues({
					cargo_types: cargoFill,
				});
			}
			setComponentLoading(false);
		} catch (error) {
			toast.error(error.data);
		}
	};

	useEffect(() => {
		fetchOrganizationServicesApi();
	}, []);

	return {
		fetchOrganizationServicesApi,
		componentLoading,
		loadingGetPartnerUser: getOrganizationServicesApi?.loading,
	};
};

export default useGetDefaultValues;
