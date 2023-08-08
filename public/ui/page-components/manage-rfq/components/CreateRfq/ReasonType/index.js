import { useEffect } from 'react';

import Footer from './Footer';
import styles from './styles.module.css';

import { DatepickerController, InputController } from '@/packages/forms';
import RadioController from '@/packages/forms/Controlled/RadioController';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const date = new Date();

const suggestDate = formatDate({
	date       : date || '-',
	dateFormat : GLOBAL_CONSTANTS.formats.date.MMM,
	formatType : 'date',
});

const FIRST_ELEMENT = 0;
const SECOND_ELEMENT = 1;
const FOURTH_ELEMENT = 3;

function ReasonType({
	fields,
	setValue,
	currentStep,
	setCurrentStep,
	control,
	errors,
	watchReasonType,
	...basicDetails
}) {
	const {
		profile: { organization = {} },
	} = useSelector((state) => state);

	const suggestName = `${organization.business_name}_${suggestDate}_RFQ`;

	const handleSetValue = () => {
		setValue('quotation_name', suggestName);
	};

	useEffect(() => {
		if (watchReasonType !== 'bidding') {
			setValue('bidding_date', null);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchReasonType]);

	return (
		<div className={styles.container}>
			<div className={styles.content}>

				<div className={styles.field}>
					<p className={styles.label}>{fields[FIRST_ELEMENT]?.label}</p>
					<InputController control={control} {...fields?.[FIRST_ELEMENT]} />
				</div>

				<div className={styles.suggestion}>
					<span>Suggestions</span>
					<div className={styles.name} role="presentation" onClick={() => handleSetValue()}>
						+
						{' '}
						{suggestName.toLowerCase()}
					</div>
				</div>

				<p className={styles.label}>Please select reason for creation of Quotation</p>
				<RadioController control={control} {...fields?.[SECOND_ELEMENT]} radioGroup />

				{watchReasonType === 'bidding' ? (
					<div className={styles.date_container}>
						<p className={styles.label}>{fields[FOURTH_ELEMENT].label}</p>

						<DatepickerController {...fields[FOURTH_ELEMENT]} control={control} />
						<p className={styles.error}>
							{errors.bidding_date ? errors.bidding_date?.message : null}
						</p>
					</div>
				) : null}
			</div>

			<Footer
				setCurrentStep={setCurrentStep}
				basicDetails={basicDetails}
			/>
		</div>
	);
}

export default ReasonType;
