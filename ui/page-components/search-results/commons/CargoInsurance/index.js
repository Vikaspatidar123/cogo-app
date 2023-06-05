/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useAddCargoInsurance from '../../hooks/useAddCargoInsurance';
import useGetCargoInsuranceRate from '../../hooks/useGetCargoInsuranceRate';
import useGetCommodityOptions from '../../hooks/useGetCommodityOptions';
import useGetCargoInsuranceSupportedCountries from '../../hooks/useGetInsuranceSupportedCountries';

import finalControls from './controls';
import EmptyState from './EmptyState';
import NewEmptyState from './EmptyState/NewEmptyState';
import Loading from './Loading';
import PremiumRate from './PremiumRate';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import { getCountryCode } from '@/ui/commons/utils/getCountryDetails';

const isCargoInsuranceApplicable = ({
	importer_exporter_country_id,
	origin_country_id,
	destination_country_id,
	trade_type,
}) => {
	const importer_exporter_country_code = getCountryCode({
		country_id: importer_exporter_country_id,
	});
	const TRADE_TYPE_MAPPING = {
		export({ origin_country_code }) {
			return origin_country_code === importer_exporter_country_code;
		},
		import({ destination_country_code }) {
			return destination_country_code === importer_exporter_country_code;
		},
		domestic({ origin_country_code, destination_country_code }) {
			return (
				origin_country_code === importer_exporter_country_code
				&& destination_country_code === importer_exporter_country_code
			);
		},
	};

	let is_applicable = false;

	if (importer_exporter_country_code in GLOBAL_CONSTANTS.cargo_insurance) {
		is_applicable = !isEmpty(
			GLOBAL_CONSTANTS.cargo_insurance[importer_exporter_country_code],
		);
	}

	if (!is_applicable) {
		return {
			is_applicable : false,
			type          : 'CARGO_INSURANCE_NOT_AVIALABLE_IN_YOUR_COUNTRY',
		};
	}

	const origin_country_code = getCountryCode({ country_id: origin_country_id });

	const destination_country_code = getCountryCode({
		country_id: destination_country_id,
	});

	is_applicable = TRADE_TYPE_MAPPING[trade_type]?.({
		origin_country_code,
		destination_country_code,
	});
	if (!is_applicable) {
		let type = 'OWN_COUNTRY_LOCATION_NOT_SELECTED_IN_ORIGIN_OR_DESTINATION';

		if (trade_type === 'domestic') {
			type = 'OWN_COUNTRY_LOCATION_NOT_SELECTED_IN_ORIGIN_AND_DESTINATION';
		}

		return { is_applicable: false, type };
	}

	return { is_applicable: true, type: '' };
};

const TRANSIT_MODE_MAPPING = {
	fcl_freight : 'SEA',
	lcl_freight : 'SEA',
	air_freight : 'AIR',
	ftl_freight : 'ROAD',
	ltl_freight : 'ROAD',
};

const POLICY_TYPE_MAPPING = {
	export   : 'EXPORT',
	import   : 'IMPORT',
	domestic : 'INLAND',
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
	importer_exporter = {},
	allowCargoInsurance = true,
	setShowCargoInsuranceIP = () => {},
	setOpenAddServiceModal = () => {},
}) {
	const [commodity, setCommodity] = useState('');
	const [rateData, setRateData] = useState({});

	const cargoInsuranceCountryId =		trade_type === 'export' ? destination_country_id : origin_country_id;

	const { isEligible, loading: apiLoading } =	useGetCargoInsuranceSupportedCountries(cargoInsuranceCountryId);
	const importer_exporter_country_id =	importer_exporter?.country_id || importer_exporter?.country?.id;
	const transitMode = TRANSIT_MODE_MAPPING[service_type] || 'ROAD';

	const { list = [] } = useGetCommodityOptions();

	const {
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		control,
	} = useForm();

	const {
		cargo_value: cargoValue,
		cargo_value_currency: cargoValueCurrency,
		cargo_insurance_commodity_description: cargoInsuranceCommodityDescription,
		cargo_insurance_commodity: cargoInsuranceCommodity,
	} = watch();

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
		setRateData,
	});

	useEffect(() => {
		if (cargoValue && !isEmpty(cargoInsuranceCommodity)) {
			getCargoInsruanceRate({
				performedBy        : importer_exporter_id,
				policyType         : POLICY_TYPE_MAPPING[trade_type] || 'INLAND',
				trade_type,
				descriptionOfCargo : cargoInsuranceCommodityDescription,
				policyCommodityId  : cargoInsuranceCommodity,
				invoiceValue       : cargoValue,
				policyCountryId    : cargoInsuranceCountryId,
				policyCurrency     : cargoValueCurrency,
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
		refetch,
		setAddCargoInsurance,
		rateData,
		commodity,
		transitMode,
	});

	const { is_applicable = true, type = '' } = isCargoInsuranceApplicable({
		importer_exporter_country_id,
		origin_country_id,
		destination_country_id,
		trade_type,
	});

	if (
		!is_applicable
	) {
		return <EmptyState reason={type} />;
	}

	if (!allowCargoInsurance) {
		return (
			<div>
				<NewEmptyState
					importer_exporter_country_id={importer_exporter_country_id}
				/>

				<Button
					onClick={() => {
						setShowCargoInsuranceIP(true);
						setAddCargoInsurance(false);
						setOpenAddServiceModal(false);
					}}
					type="button"
					style={{ margin: '0 16px' }}
				>
					+Add Invoicing Party
				</Button>
			</div>
		);
	}
	// const notValidSearch =		(trade_type === 'export'
	// 		&& origin_country_id !== GLOBAL_CONSTANTS.country_ids.IN)
	// 	|| (trade_type === 'import'
	// 		&& destination_country_id !== GLOBAL_CONSTANTS.country_ids.IN)
	// 	|| (trade_type === 'domestic'
	// 		&& (origin_country_id === destination_country_id)
	// 			!== GLOBAL_CONSTANTS.country_ids.IN);

	// if (notValidSearch) {
	// 	return <EmptyState reason="not_valid_search" />;
	// }

	if (apiLoading) {
		return <Loading />;
	}

	if (!isEligible) {
		return <EmptyState reason="blocked_country" />;
	}

	return (
		<div className={styles.container}>
			<Modal.Header title="Add Cargo Insurance" />
			<Modal.Body>
				<div className={styles.header_container}>
					{finalControls.map((item) => {
						const Element = getField(item.type);
						return (
							<div className={styles.field} key={item.name}>
								<div className={styles.lable}>{item.label}</div>
								<Element {...item} control={control} />
								{errors && (
									<div className={styles.errors}>
										{errors[item?.name]?.message}
									</div>
								)}
							</div>
						);
					})}

				</div>
				{loading && <Loading />}

				{!isEmpty(rateData) && !loading ? (
					<PremiumRate rateData={rateData} />
				) : null}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.btn_wrap}>
					<div className={styles.cancel_btn_wrap}>
						<Button
							type="button"
							size="md"
							themeType="tertiary"
							disabled={loading || cargoLoading}
							onClick={() => setAddCargoInsurance(false)}
						>
							Cancel
						</Button>
					</div>

					<Button
						type="button"
						onClick={handleSubmit(handleAddCargoInsurance)}
						loading={cargoLoading}
						disabled={isEmpty(rateData) || loading}
					>
						Save and proceed
					</Button>
				</div>
			</Modal.Footer>
		</div>
	);
}

export default CargoInsurance;
