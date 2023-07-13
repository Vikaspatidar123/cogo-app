import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSubmitBuyerDetails = ({
	getCreditRequestResponse,
	setOpenAddBuyer,
	addressDetail,
	countryData,
	refetch,
}) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'create_export_factoring_buyer_details',
		},
		{ manual: true },
	);

	const onSubmit = async (value) => {
		const isCountry = value?.country === addressDetail?.country?.country_id;
		const country = {
			country_name: isCountry
				? addressDetail?.country?.name
				: countryData?.name,

			country_id: isCountry
				? addressDetail?.country?.country_id
				: countryData?.country_id,
		};

		const values = {
			...value,
			country,
			buyer_id: '',
		};

		try {
			const payload = {
				export_factoring_service_attributes : { buyer_details: { ...values } },
				credit_id                           : getCreditRequestResponse?.credit_id,
			};
			await trigger({
				data: payload,
			});
			refetch();
			setOpenAddBuyer(false);
			Toast.success('Buyer Details Saved');
		} catch (err) {
			Toast.error(err.data);
		}
	};
	return {
		onSubmit,
		loading,
	};
};

export default useSubmitBuyerDetails;
