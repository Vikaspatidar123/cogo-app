import { Upload } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { UploadFileControls } from '../../../configurations/create-quotation-controls';
import useCreateRfqRequestSheet from '../../../hooks/useCreateRfqRequestSheet';

import { useForm } from '@/packages/forms';
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

	const {
		formState: { errors },
		watch,
		setValue,
		handleSubmit,
	} = useForm();

	const { createRfqSheet } = useCreateRfqRequestSheet({
		watchRequestType,
		setShowResult,
		basicDetails,
		importerExporterDetails,
	});

	const watchServicetype = watch('search_type');
	const isUploaded = !isEmpty(watch('file_url'));

	return (
		<div className="" onSubmit={handleSubmit(createRfqSheet)}>
			<Content>
				<Title>
					Upload
					{' '}
					{isCogoFormat ? 'excel' : 'file'}
					{' '}
					in
					{' '}
					{isCogoFormat ? 'cogo' : 'any'}
					{' '}
					format
				</Title>
				<Step>Step 1: Select service</Step>

				<RadioGroupWrapper>
					<RadioController {...fields.search_type} />
					<Error>{errors?.search_type?.message}</Error>
				</RadioGroupWrapper>
				<Line />

				{isCogoFormat && (
					<>
						<FirstStep service={watchServicetype} />
						<Line />
					</>
				)}

				<Step>
					Step
					{isCogoFormat ? 3 : 2}
					: Upload your filled sheet
				</Step>
				<Uploader isUploaded={isUploaded}>
					<FileUploader {...fields.file_url} />
				</Uploader>
				<Error>{errors?.file_url?.message}</Error>
			</Content>

			<Footer setCurrentStep={setCurrentStep} />

			<ResultModal
				showResult={showResult}
				setValue={setValue}
				setShowResult={setShowResult}
			/>
		</div>
	);
}

export default UploadSheet;
