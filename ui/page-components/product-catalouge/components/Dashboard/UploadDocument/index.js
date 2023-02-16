import { Button, FileSelect } from '@cogoport/components/';
import { useState } from 'react';

// import AwsUploader from '../../../../../common/components/AwsUploader';
import useUploadDocuments from '../../../hooks/useUploadDocuments';

import {
	csvImg, downloadUrl, successBackgroundImg, tickIcon,
} from './link';
import {
	Container,
	UploadContainer,
	StyledButton,
	Heading,
	Link,
	HeaderCtn,
	ButtonContainer,
	DownloadErrorLink,
	TickIcon,
	SuccessMsg,
	SuccessBackG,
	SuccessModal,
	AwsContainer,
} from './style';

function UploadDocument({ uploadModal, setUploadModal, refetchProduct }) {
	const [show, setShow] = useState(undefined);
	const {
		uploadDocuments, fileValue, setFileValue, loading, value, getDownloadExcel,
	} =		useUploadDocuments({
		setUploadModal,
		refetchProduct,
		setShow,
	});

	const { success = false } = fileValue || {};

	const downloadSample = () => {
		window.open(downloadUrl, '_self');
	};

	const handleFileChange = (url) => {
		setFileValue(url);
	};

	const generateInvalidRecordsId = value.generateInvalidEntriesId;

	const getInvalidExcel = () => {
		getDownloadExcel(generateInvalidRecordsId);
	};

	return (
		<Container
			show={uploadModal}
			onClose={() => setUploadModal(false)}
			onOuterClick={() => setUploadModal(false)}
			width="550"
			height="200"
		>
			<>
				{show === undefined && (
					<>
						<HeaderCtn>
							<Heading>
								<img src={`${csvImg}`} alt="csv img" height="20" width="30" />
								Import .csv document
							</Heading>
							<Button onClick={downloadSample}>Sample File</Button>
						</HeaderCtn>
						<UploadContainer>
							<AwsContainer>
								<FileSelect
									docName=".xlsx"
									onChange={(e) => handleFileChange(e)}
									drag
									uploadType="aws"
									themeType="primary"
									uploadIcon="ic-upload"
									format=".xlsx"
									accept=".xlsx"
								/>
							</AwsContainer>
							<ButtonContainer>
								<StyledButton
									loading={loading}
									disabled={!success}
									onClick={uploadDocuments}
								>
									SUBMIT
								</StyledButton>
							</ButtonContainer>
						</UploadContainer>
					</>
				)}
			</>

			{!show && show !== undefined && (
				<>
					<SuccessBackG>
						<img src={`${successBackgroundImg}`} width="550" height="120" alt="success" />
					</SuccessBackG>
					<TickIcon>
						<img src={`${tickIcon}`} width="100" height="45" alt="tick icon" />
					</TickIcon>
					<SuccessMsg>Your document has been partially uploaded !</SuccessMsg>

					<DownloadErrorLink>
						<Link onClick={() => getInvalidExcel()}>Download</Link>
						&nbsp;error file and re-upload &nbsp;
						<Link
							onClick={() => {
								setShow(undefined);
								setFileValue({});
							}}
						>
							here
						</Link>
					</DownloadErrorLink>
				</>
			)}

			{show && (
				<SuccessModal>
					<SuccessBackG>
						<img src={`${successBackgroundImg}`} width="550" height="140" alt="success" />
					</SuccessBackG>
					<TickIcon>
						<img src={`${tickIcon}`} width="100" height="45" alt="tick icon" />
					</TickIcon>
					<SuccessMsg>You have successfully uploaded the document!</SuccessMsg>
				</SuccessModal>
			)}
		</Container>
	);
}

export default UploadDocument;
