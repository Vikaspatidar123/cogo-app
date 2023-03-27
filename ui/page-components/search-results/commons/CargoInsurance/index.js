import FormElement from '@cogo/app-search/common/FormElement';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { useSelector } from '@cogo/store';
import { Button } from '@cogoport/front/components/admin';
import { useFormCogo } from '@cogoport/front/hooks';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useAddCargoInsurance from '../../hooks/useAddCargoInsurance';
import useGetCargoInsuranceRate from '../../hooks/useGetCargoInsuranceRate';
import useGetCommodityOptions from '../../hooks/useGetCommodityOptions';
import useGetCargoInsuranceSupportedCountries from '../../hooks/useGetInsuranceSupportedCountries';

import controls from './controls';
import EmptyState from './EmptyState';
import Loading from './Loading';
import PremiumRate from './PremiumRate';
import { Container, BtnWrap, CancelBtnWrap, Text } from './styles';

const LABEL_MAPPING = {
	export   : 'Destination Location',
	import   : 'Origin Location',
	domestic : 'Select Country',
};

const TRANSIT_MODE_MAPPING = {
	fcl_freight : 'SEA',
	lcl_freight : 'SEA',
	air_freight : 'AIR',
	ftl_freight : 'ROAD',
	ltl_freight : 'ROAD',
};

function CargoInsurance({
	setAddCargoInsurance = () => {},
	origin_country_id = '',
	destination_country_id = '',
	service_type = '',
	trade_type = '',
	user_id = '',
	checkout_id = '',
	refetch = () => {},
	spot_search_id = '',
	importer_exporter_id,
}) {
	const {
		general: { scope = '' },
	} = useSelector((state) => state);

	const [commodity, setCommodity] = useState('');
	const [rateData, setRateData] = useState({});

	const cargoInsuranceCountryId =		trade_type === 'export' ? destination_country_id : origin_country_id;

	const { isEligible, loading: apiLoading } =		useGetCargoInsuranceSupportedCountries(cargoInsuranceCountryId);

	const transitMode = TRANSIT_MODE_MAPPING[service_type] || 'ROAD';

	const { list = [] } = useGetCommodityOptions();

	const finalControls = controls({
		locationLabel: LABEL_MAPPING[trade_type] || 'Select Country',
		transitMode,
	});

	const {
		fields,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useFormCogo(finalControls);

	const cargoValue = watch('cargo_value');
	const cargoValueCurrency = watch('cargo_value_currency');
	const cargoInsuranceCommodityDescription = watch(
		'cargo_insurance_commodity_description',
	);
	const cargoInsuranceCommodity = watch('cargo_insurance_commodity');

	useEffect(() => {
		const optionselected = (list || []).find(
			(option) => option.id === cargoInsuranceCommodity,
		);
		setCommodity(optionselected?.commodity);
		setValue(
			'cargo_insurance_commodity_description',
			optionselected?.cargoDescription,
		);
	}, [cargoInsuranceCommodity]);

	const { getCargoInsruanceRate, loading = '' } = useGetCargoInsuranceRate({
		checkout_id,
		scope,
		setRateData,
	});

	useEffect(() => {
		if (cargoValue && !isEmpty(cargoInsuranceCommodity)) {
			getCargoInsruanceRate({
				user_id,
				importer_exporter_id,
				trade_type,
				cargo_insurance_commodity_description:
					cargoInsuranceCommodityDescription,
				cargo_insurance_commodity_id : cargoInsuranceCommodity,
				cargo_value                  : cargoValue,
				cargo_insurance_country_id   : cargoInsuranceCountryId,
				cargo_value_currency         : cargoValueCurrency,
			});
		} else {
			setRateData({});
		}
	}, [JSON.stringify(watch())]);

	const { handleAddCargoInsurance, cargoLoading } = useAddCargoInsurance({
		spot_search_id,
		origin_country_id,
		destination_country_id,
		service_type,
		trade_type,
		user_id,
		checkout_id,
		scope,
		refetch,
		setAddCargoInsurance,
		rateData,
		commodity,
		transitMode,
	});

	if (
		![origin_country_id, destination_country_id].includes(
			GLOBAL_CONSTANTS.country_ids.IN,
		)
	) {
		return <EmptyState reason="non_indian_search" />;
	}

	const notValidSearch =		(trade_type === 'export'
			&& origin_country_id !== GLOBAL_CONSTANTS.country_ids.IN)
		|| (trade_type === 'import'
			&& destination_country_id !== GLOBAL_CONSTANTS.country_ids.IN)
		|| (trade_type === 'domestic'
			&& (origin_country_id === destination_country_id)
				!== GLOBAL_CONSTANTS.country_ids.IN);

	if (notValidSearch) {
		return <EmptyState reason="not_valid_search" />;
	}

	if (apiLoading) {
		return <Loading />;
	}

	if (!isEligible) {
		return <EmptyState reason="blocked_country" />;
	}

	return (
		<Container>
			<Text>Add Cargo Insurance</Text>

			<FormElement controls={finalControls} fields={fields} errors={errors} />

			{loading && <Loading />}

			{!isEmpty(rateData) && !loading ? (
				<PremiumRate rateData={rateData} />
			) : null}

			<BtnWrap>
				<CancelBtnWrap>
					<Button
						type="button"
						disabled={loading || cargoLoading}
						onClick={() => setAddCargoInsurance(false)}
					>
						Cancel
					</Button>
				</CancelBtnWrap>

				<Button
					onClick={handleSubmit(handleAddCargoInsurance)}
					loading={cargoLoading}
					disabled={isEmpty(rateData) || loading}
				>
					Save and proceed
				</Button>
			</BtnWrap>
		</Container>
	);
}

export default CargoInsurance;
