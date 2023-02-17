import { Button, Toast } from '@cogoport/components';
import { IcMArrowNext, IcMArrowBack } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import getField from '../../../../../../packages/forms/Controlled';
import CommonButton from '../../../common/Button';
import { ProductCartIcon } from '../../../configuration/icon-configuration';
import useFreightCharges from '../../../hook/useFreightCharges';

// import {
// 	Title, Col, Label, BtnContainer, ErrorTxt, Text,
// } from '../styles.module.css';

import style from '../styles.module.css';

import FreightModal from './FreightModal';
import IncotermCharges from './IncotermCharges';
// import { Container, TitleContainer } from './style';
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
	isMobile = false,
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
		Toast.error('Fill all mandatory details', {
			autoClose : 3000,
			style     : { color: '#333', background: '#FFD9D4' },
		});
	};

	return (
		<div>
			<div className={styles.title_container}>
				<div className={style.title}>
					<img src={ProductCartIcon} alt="" />
					<div>Charges Details</div>
				</div>
				<div className={`${styles.incoterm} ${style.col}`}>
					<div className={style.label}>{fields?.incoterm?.label}</div>
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
					<div className={style.flex_col}>
						<NumberSelector
							{...fields[0]}
							className={style.freight_charge}
							control={chargeControls}
						/>
						<Button
							className="primary  sm text"
							onClick={() => setShowFreightModal(true)}
						>
							Get Rates
						</Button>
						<div className={style.text}>{prevCurr}</div>
					</div>
					{error?.freightCharge && (
						<div className={style.error_txt}>
							*
							{error?.freightCharge?.message || error?.freightCharge?.type}
						</div>
					)}
				</div>
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
					<CommonButton size="md" isPrev onClick={prevHandler}>
						<IcMArrowBack width={16} height={16} />
					</CommonButton>
					<CommonButton
						size="md"
						type="button"
						onClick={handleSubmit(submitHandler, errorHandler)}
						loading={serviceRatesLoading}
					>
						Continue
						{' '}
						<IcMArrowNext />
					</CommonButton>
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
					isMobile={isMobile}
				/>
			)}
		</div>
	);
}

export default Charge;
