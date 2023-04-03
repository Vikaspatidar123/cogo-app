import { useRequestBf } from '@/packages/request';

const useGetCargoInsuranceSupportedCountries = (country_id) => {
	// const apiData = useRequest('get', true, 'saas', {

	// })('saas/insurance/country-supported', {
	// 	params: {
	// 		policyCountryId: country_id,
	// 	},
	// });
	const [{ loading, data }] = useRequestBf(
		{
			url     : 'saas/insurance/country-supported',
			authkey : 'saas_insurance_country_supported',
			method  : 'get',
			params  : {
				policyCountryId: country_id,
			},
		},
		{ manual: false },
	);

	return {
		isEligible: data,
		loading,
	};
};

export default useGetCargoInsuranceSupportedCountries;
