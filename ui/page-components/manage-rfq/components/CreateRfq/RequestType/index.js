import { CreateQuotationConfig } from '../../../configurations/request-type';

import Footer from './Footer';
import SelectBucket from './SelectBucket';
import styles from './styles.module.css';

import RadioController from '@/packages/forms/Controlled/RadioController';

function RequestType({ fields, control, setCurrentStep, ...basicDetails }) {
	const creationFields = fields?.[2];
	const Options = creationFields?.options;
	const formattedOptions = Options.map((item, index) => ({
		...item,
		label: <SelectBucket {...CreateQuotationConfig[index]} index={index} />,
	}));

	creationFields.options = formattedOptions;

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.title}>
					Please select your preferred method of requesting for quotation
				</div>
				<RadioController {...creationFields} control={control} radioGroup />
			</div>
			<Footer basicDetails={basicDetails} setCurrentStep={setCurrentStep} />
		</div>
	);
}

export default RequestType;
