import { useEffect, useState } from 'react';

import FormTitleAndDescription from '../../common/FormTitleAndDescription';
import Uploader from '../Uploader';

import FormFields from './FormFields';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import { useSelector } from '@/packages/store';

const DETAILS_ARRAY = ['company_details', 'poc', 'requirements'];

function BasicDetailsForm() {
	const { profile } = useSelector((state) => state);
	const [show, setShow] = useState(false);

	const [gstDetails, setGSTDetails] = useState({});

	const [documentDetails, setDocumentDetails] = useState({});

	const { image_url = '' } = documentDetails || {};

	const fileName = image_url?.split('/')?.slice(-1)?.join('');

	const {
		handleSubmit,
		control,
		setValue,
		// reset,
		// setError,
		// formState: { errors },
		// getValues,
	} = useForm({
		defaultValues: {
			pan: profile?.organization?.registration_number,
		},
	});

	const clearDocumentDetails = () => {
		setDocumentDetails({});
	};

	useEffect(() => {
		setValue('gst_proof', fileName);
	}, [fileName, setValue]);

	return (
		DETAILS_ARRAY.map((details) => (
			<div className={styles.wrapper}>
				<div className={styles.form_description}>
					<FormTitleAndDescription details={details} />
				</div>
				<div className={styles.form}>
					<form type="submit">
						<FormFields
							control={control}
							details={details}
							setShow={setShow}
							documentDetails={documentDetails}
							gstDetails={gstDetails}
							setGSTDetails={setGSTDetails}
							clearDocumentDetails={clearDocumentDetails}
							handleSubmit={handleSubmit}
						/>
					</form>
				</div>
				{show && (
					<Uploader
						show={show}
						setShow={setShow}
						documentDetails={documentDetails}
						setDocumentDetails={setDocumentDetails}
					/>
				)}
			</div>
		))

	);
}

export default BasicDetailsForm;
