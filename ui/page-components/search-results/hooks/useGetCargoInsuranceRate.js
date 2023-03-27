import { useRequest } from '@cogo/commons/hooks';

const useGetCargoInsuranceRate = (props) => {
	const { checkout_id = '', scope, setRateData } = props || {};

	const apiName = checkout_id
		? 'get_checkout_cargo_insurance_rate'
		: 'get_spot_search_cargo_insurance_rate';

	const getCargoInsuranceRateApi = useRequest(
		'get',
		false,
		scope,
	)(`/${apiName}`);

	const getCargoInsruanceRate = async (values) => {
		try {
			const res = await getCargoInsuranceRateApi.trigger({
				params: { ...values },
			});
			setRateData(res?.data);
		} catch (err) {
			console.log(err);
		}
	};

	return {
		getCargoInsruanceRate,
		loading: getCargoInsuranceRateApi.loading,
	};
};
export default useGetCargoInsuranceRate;
