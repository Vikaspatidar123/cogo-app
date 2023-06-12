import FormTitleAndDescription from '../../common/FormTitleAndDescription';

import CompanyDetailsForm from './CompanyDetailsForm';
import PaymentRequirements from './PaymentRequirements';
import POCForm from './POCForm';
import styles from './styles.module.css';

const DETAILS_ARRAY = ['company_details', 'poc', 'requirements'];

const formMapping = {
	company_details : CompanyDetailsForm,
	poc             : POCForm,
	requirements    : PaymentRequirements,
};

function BasicDetailsForm({ getCreditRequestResponse = {} }) {
	return (
		DETAILS_ARRAY.map((details) => {
			const FormFields = formMapping[details];
			return (
				<div className={styles.wrapper}>
					<div className={styles.form_description}>
						<FormTitleAndDescription details={details} />
					</div>
					<div className={styles.form}>
						<FormFields getCreditRequestResponse={getCreditRequestResponse} />
					</div>
				</div>
			);
		})

	);
}

export default BasicDetailsForm;
