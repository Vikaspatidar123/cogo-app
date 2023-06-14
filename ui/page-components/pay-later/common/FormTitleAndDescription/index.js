import styles from './styles.module.css';

const MAPPING = {
	company_details: {
		heading     : 'Company Details',
		description : 'Provide company information',
	},
	poc: {
		heading     : 'Point of Contact',
		description : 'Any 2 are mandatory. Selected POC will be reflected on agreement',
	},
	requirements: {
		heading     : 'Pay Later Requirements',
		description : 'Fill in the required details',
	},
	method: {
		heading     : 'Method',
		description : 'Select method of signature',
	},
	signatory: {
		heading     : 'Signatory',
		description : 'Select the authorised signatory',
	},
	preview_and_upload: {
		heading     : 'Document Preview',
		description : 'Go through the preview documents carefully and request E-sign Link',
	},
	upload_signed_copy: {
		heading     : 'Upload Signed Copy',
		description : 'Upload the signed copy of abovedocuments',
	},
};

function FormTitleAndDescription({ details = '' }) {
	const { description = '', heading = '' } = MAPPING[details];
	return (
		<div className={styles.details_wrapper}>
			<div className={styles.heading}>
				{heading}
			</div>
			<div className={styles.description}>
				{description}
			</div>
		</div>
	);
}
export default FormTitleAndDescription;
