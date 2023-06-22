import { Toast, Button } from '@cogoport/components';
import { IcMArrowNext, IcMArrowBack } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import getField from '../../../../../../packages/forms/Controlled';
import { ProductCartIcon } from '../../../configuration/icon-configuration';
import useFreightCharges from '../../../hook/useFreightCharges';
import style from '../styles.module.css';

import FreightModal from './FreightModal';
import IncotermCharges from './IncotermCharges';
import styles from './styles.module.css';

function Charge({
	fields,
	error,
	setFormStepper,
	setStepper,
	prevHandler,
	handleSubmit,
	setFormData,
	incoterm,
	setIncoterm,
	serviceRates,
	serviceRateData = {},
	serviceRatesLoading,
	isQuotaLeft = false,
	watch,
	setValue,
	formData,
	transportMode,
	portDetails,
	prevCurr,
	chargeControls,
}) {
	const [showFreightModal, setShowFreightModal] = useState(false);
	const [spotCharge, setSpotCharge] = useState('');
	const SelectController = getField('select');
	const NumberSelector = getField('number');
	const { createSpotSearch, spotSearchLoading, spotSearchData } = useFreightCharges();

	const watchIncotermCharges = watch('incotermCharges');
	const { incoterm: formIncoterm = [] } = formData;

	useEffect(() => {
		if (spotCharge !== '') {
			setValue('freightCharge', spotCharge);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [spotCharge]);

	const submitHandler = async (data) => {
		const dataLength = Object.keys(serviceRateData).length;
		if (dataLength === 0 && !isQuotaLeft) {
			await serviceRates();
		}
		setFormData((prev) => ({
			...prev,
			...data,
		}));
		setFormStepper((prev) => ({
			...prev,
			formChargeDetails : false,
			formPayDetails    : true,
		}));
		setStepper((prev) => ({
			...prev,
			payDetails: true,
		}));
	};

	const errorHandler = () => {
		Toast.error('Fill all mandatory details');
	};

	return (
		<div>
			<div className={styles.title_container}>
				<div className={style.title}>
					<img src={ProductCartIcon} alt="" />
					<div>Charges Details</div>
				</div>
				<div className={`${styles.incoterm} ${style.col}`}>
					<div className={style.label}>{fields[1]?.label}</div>
					<SelectController
						{...fields[1]}
						handleChange={(data) => setIncoterm(data?.value)}
						control={chargeControls}
					/>
					{error?.incoterm && (
						<div className={style.error_txt}>
							*
							{error?.incoterm?.type}
						</div>
					)}
				</div>
			</div>
			<form>
				<div className={style.col}>
					<div className={style.label}>{fields?.freightCharge?.label}</div>
					<NumberSelector
						{...fields[0]}
						className={style.freight_charge}
						control={chargeControls}
						suffix={(
							<div className={styles.suffix_container}>
								<Button
									size="sm"
									themeType="linkUi"
									onClick={() => setShowFreightModal(true)}
									className={`${styles.get_rates}`}
								>
									Get Rates

								</Button>
								<div className={style.text}>{prevCurr}</div>
							</div>
						)}
					/>

				</div>
				{error?.freightCharge && (
					<div className={style.error_txt}>
						*
						{error?.freightCharge?.message || error?.freightCharge?.type}
					</div>
				)}
				<div className={`${styles.incoterm_charges} ${style.col}`}>
					<IncotermCharges
						{...fields[2]}
						incoterm={incoterm}
						error={error}
						watchIncotermCharges={watchIncotermCharges}
						setValue={setValue}
						formIncoterm={formIncoterm}
						prevCurr={prevCurr}
						control={chargeControls}
						controls={fields[2].controls}
					/>
				</div>
				<div className={style.btn_container}>
					<Button size="md" themeType="secondary" onClick={prevHandler}>
						<IcMArrowBack width={16} height={16} />
					</Button>
					<Button
						size="md"
						type="button"
						onClick={handleSubmit(submitHandler, errorHandler)}
						loading={serviceRatesLoading}
					>
						Continue
						<IcMArrowNext />
					</Button>
				</div>
			</form>
			{showFreightModal && (
				<FreightModal
					showFreightModal={showFreightModal}
					setShowFreightModal={setShowFreightModal}
					formData={formData}
					createSpotSearch={createSpotSearch}
					spotSearchLoading={spotSearchLoading}
					spotSearchData={spotSearchData}
					transportMode={transportMode}
					incoterm={incoterm}
					portDetails={portDetails}
					setSpotCharge={setSpotCharge}
					prevCurr={prevCurr}
				/>
			)}
		</div>
	);
}

export default Charge;
