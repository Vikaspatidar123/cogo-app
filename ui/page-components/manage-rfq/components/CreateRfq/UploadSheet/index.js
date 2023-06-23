import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { UploadFileControls } from '../../../configurations/create-quotation-controls';
import useCreateRfqRequestSheet from '../../../hooks/useCreateRfqRequestSheet';

import FirstStep from './FirstStep';
import Footer from './Footer';
import ResultModal from './ResultModal';
import styles from './styles.module.css';

import { useForm, UploadController } from '@/packages/forms';
import RadioController from '@/packages/forms/Controlled/RadioController';

function UploadSheet({
	watchRequestType,
	currentStep,
	setCurrentStep,
	importerExporterDetails,
	...basicDetails
}) {
	const isCogoFormat = watchRequestType === 'cogo_format';

	const [showResult, setShowResult] = useState({
		showModal : false,
		isSuccess : false,
		errorText : '',
	});
	const fields = UploadFileControls(isCogoFormat);
	const {
		formState: { errors },
		control,
		watch,
		setValue,
		handleSubmit,
	} = useForm();

	const { createRfqSheet, rfqSheetLoading } = useCreateRfqRequestSheet({
		watchRequestType,
		setShowResult,
		basicDetails,
		importerExporterDetails,
	});

	const watchServicetype = watch('search_type');
	const isUploaded = !isEmpty(watch('file_url'));

	return (
		<form className={styles.container} onSubmit={handleSubmit(createRfqSheet)}>
			<div className={styles.content}>
				<div className={styles.title}>
					{`Upload ${isCogoFormat ? 'excel' : 'file'} in ${isCogoFormat ? 'cogo' : 'any'} format`}
				</div>
				<div className={styles.step}>Step 1: Select service</div>

				<div className={styles.radiogroup_wrapper}>
					<RadioController {...fields[0]} control={control} />
					{errors?.search_type && <div className={styles.error}>{errors?.search_type?.message}</div>}
				</div>
				<div className={styles.line} />

				{isCogoFormat && (
					<>
						<FirstStep service={watchServicetype} />
						<div className={styles.line} />
					</>
				)}

				<div className={styles.step}>
					Step
					{isCogoFormat ? 3 : 2}
					: Upload your filled sheet
				</div>
				<div className={cl`${styles.uploader} ${isUploaded && styles.uploaded}`}>
					<UploadController {...fields[1]} control={control} />
				</div>
				<div className={styles.error}>{errors?.file_url?.message}</div>
			</div>

			<Footer setCurrentStep={setCurrentStep} rfqSheetLoading={rfqSheetLoading} />

			<ResultModal
				showResult={showResult}
				setValue={setValue}
				setShowResult={setShowResult}
			/>
		</form>
	);
}

export default UploadSheet;
