import { Toast, Button, cl } from '@cogoport/components';
import { IcMArrowNext, IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import getField from '../../../../../../packages/forms/Controlled';
import { chargeControls as fields } from '../../../configuration/controls';
import { ProductCartIcon } from '../../../configuration/icon-configuration';
import useFreightCharges from '../../../hook/useFreightCharges';
import style from '../styles.module.css';

import FreightModal from './FreightModal';
import IncotermCharges from './IncotermCharges';
import styles from './styles.module.css';

const SelectController = getField('select');
const NumberSelector = getField('number');

const errorHandler = ({ t }) => {
	Toast.error(t('dutiesTaxesCalculator:form_charge_toast_err_msg'));
};

function Charge({
	setFormStepper,
	setStepper,
	prevHandler,
	setFormData,
	incoterm,
	setIncoterm,
	serviceRates,
	serviceRateData = {},
	serviceRatesLoading,
	isQuotaLeft = false,
	formData,
	transportMode,
	portDetails,
	prevCurr,
	formHook,
}) {
	const { t } = useTranslation(['common', 'dutiesTaxesCalculator']);

	const [showFreightModal, setShowFreightModal] = useState(false);
	const [spotCharge, setSpotCharge] = useState('');

	const { control, watch, handleSubmit, setValue, formState:{ errors } } = formHook;
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

	return (
		<div>
			<div className={styles.title_container}>
				<div className={style.title}>
					<img src={ProductCartIcon} alt="" />
					<div>{t('dutiesTaxesCalculator:form_charge_title')}</div>
				</div>
				<div className={cl`${styles.incoterm} ${style.col}`}>
					<div className={style.label}>{fields[1]?.label}</div>
					<SelectController
						{...fields[1]}
						handleChange={(data) => setIncoterm(data?.value)}
						control={control}
					/>
					{errors?.incoterm && (
						<div className={style.error_txt}>
							*
							{errors?.incoterm?.type}
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
						control={control}
						suffix={(
							<div className={styles.suffix_container}>
								<Button
									size="sm"
									themeType="linkUi"
									onClick={() => setShowFreightModal(true)}
									className={`${styles.get_rates}`}
								>
									{t('dutiesTaxesCalculator:form_charge_rate')}
								</Button>
								<div className={style.text}>{prevCurr}</div>
							</div>
						)}
					/>

				</div>
				{errors?.freightCharge && (
					<div className={style.error_txt}>
						*
						{errors?.freightCharge?.message || errors?.freightCharge?.type}
					</div>
				)}
				<div className={`${styles.incoterm_charges} ${style.col}`}>
					<IncotermCharges
						{...fields[2]}
						incoterm={incoterm}
						error={errors}
						watchIncotermCharges={watchIncotermCharges}
						setValue={setValue}
						formIncoterm={formIncoterm}
						prevCurr={prevCurr}
						control={control}
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
						onClick={handleSubmit(submitHandler, () => errorHandler({ t }))}
						loading={serviceRatesLoading}
					>
						{t('common:continue')}
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
