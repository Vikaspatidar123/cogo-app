import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useAddCargoInsurance = ({
	checkout_id = '',
	refetch = () => {},
	setAddCargoInsurance,
	rateData = {},
	commodity = '',
	transitMode = '',
	spot_search_id = '',
	origin_country_id = '',
	destination_country_id = '',
	trade_type = '',
}) => {
	const apiName = checkout_id
		? 'create_checkout_service'
		: 'create_spot_search_service';

	const [{ loading }, AddCargoInsuranceApi] = useRequest(
		{
			url    : `/${apiName}`,
			method : 'post',
		},
		{ manual: true },
	);

	const key = checkout_id
		? 'cargo_insurance_services_attributes'
		: 'cargo_insurance_services';

	const handleAddCargoInsurance = async (values) => {
		const {
			cargo_value = '',
			cargo_value_currency = '',
			cargo_insurance_commodity = '',
			cargo_insurance_commodity_description = '',
		} = values;
		const payload = {
			id      : spot_search_id || checkout_id,
			service : 'cargo_insurance',
			[key]   : [
				{
					risk_coverage                : 'all_risk',
					trade_type,
					transit_mode                 : `${transitMode}`.toLowerCase(),
					cargo_value,
					cargo_value_currency,
					cargo_insurance_commodity_id : cargo_insurance_commodity,
					origin_country_id,
					destination_country_id,
					commodity,
					cargo_insurance_commodity_description,
					status                       : 'active',
					saas_rate                    : { ...rateData },
				},
			],
		};

		try {
			const res = await AddCargoInsuranceApi({
				data: payload,
			});

			if (!res.hasError) {
				Toast.success('Cargo Insurance added successfully!');
				setAddCargoInsurance(false);
				refetch();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return {
		handleAddCargoInsurance,
		cargoLoading: loading,
	};
};

export default useAddCargoInsurance;
