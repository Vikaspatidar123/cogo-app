import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';

const useAddCargoInsurance = ({
	checkout_id = '',
	scope = '',
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

	const AddCargoInsuranceApi = useRequest('post', false, scope)(`/${apiName}`);

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
			id: spot_search_id || checkout_id,
			service: 'cargo_insurance',
			[key]: [
				{
					risk_coverage: 'all_risk',
					trade_type,
					transit_mode: `${transitMode}`.toLowerCase(),
					cargo_value,
					cargo_value_currency,
					cargo_insurance_commodity_id: cargo_insurance_commodity,
					origin_country_id,
					destination_country_id,
					commodity,
					cargo_insurance_commodity_description,
					status: 'active',
					saas_rate: { ...rateData },
				},
			],
		};

		try {
			const res = await AddCargoInsuranceApi.trigger({
				data: payload,
			});

			if (!res.hasError) {
				toast.success('Cargo Insurance added successfully!');
				setAddCargoInsurance(false);
				refetch();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return {
		handleAddCargoInsurance,
		cargoLoading: AddCargoInsuranceApi.loading,
	};
};

export default useAddCargoInsurance;
