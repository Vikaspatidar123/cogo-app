import Footer from './Footer';
import styles from './styles.module.css';

import { InputController } from '@/packages/forms';
import RadioController from '@/packages/forms/Controlled/RadioController';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function ReasonType({
	fields,
	setValue,
	currentStep,
	setCurrentStep,
	control,
	...basicDetails
}) {
	const {
		profile: { organization = {} },
	} = useSelector((state) => state);
	const date = new Date();

	const suggestDate = formatDate({
		date       : date || '-',
		dateFormat : GLOBAL_CONSTANTS.formats.date.MMM,
		formatType : 'date',
	});

	const suggestName = `${organization.business_name}_${suggestDate}_RFQ`;

	const handleSetValue = () => {
		setValue(
			'quotation_name',
			`${organization.business_name}_${suggestDate}_RFQ`,
		);
	};
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.field}>
					<p className={styles.label}>{fields[0]?.label}</p>
					<InputController control={control} {...fields?.[0]} />
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
				<RadioController control={control} {...fields?.[1]} radioGroup />
			</div>

			<Footer
				setCurrentStep={setCurrentStep}
				basicDetails={basicDetails}
			/>
		</div>
	);
}

export default ReasonType;
