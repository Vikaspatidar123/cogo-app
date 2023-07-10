import React, { useState } from 'react';

import FormCard from '../../../common/FormCard';

import ChequeType from './ChequeType';
import DocInformation from './DocInformation';
import PdcUploadCheque from './PdcUploadCheque';
import styles from './styles.module.css';
import UdcUpload from './UdcUpload';
import UndatedCheques from './UndatedCheques';

function OptUdcAndPdc({ getCreditRequestResponse, refetch, loading, active }) {
	const [selectedType, setSelectedType] = useState();
	const [udcCheque, setUdcCheque] = useState({});

	const common = {
		title       : 'Select cheque type',
		description : 'Learn More',
		Component   : ChequeType,
	};

	const mapping = {
		UDC: [
			common,
			{
				title: 'Document Preview & Upload',
				description:
					'Go through the preview document carefully & upload the signed copy of the document',
				Component: UdcUpload,
			},
			{
				title       : 'Upload 5 Undated Cheques',
				description : 'View Sample',
				Component   : UndatedCheques,
			},
		],
		PDC: [
			common,
			{
				title: 'Document Preview & Upload',
				description:
					'Go through the preview document carefully & upload the signed copy of the document',
				Component: PdcUploadCheque,
			},
		],
	};

	const mappingComponent = mapping[selectedType] || [
		common,
		{
			title       : 'What is UDC?',
			description : 'Learn More about UDC',
			Component   : DocInformation,
		},
		{
			title       : 'What is PDC?',
			description : 'Learn More About PDC',
			Component   : DocInformation,
		},
	];
	console.log(udcCheque, 'aaa');

	return (
		<div className={styles.container}>
			<div className={styles.header}>UDC/PDC</div>
			<FormCard
				componentMapping={mappingComponent}
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
				loading={loading}
				selectedType={selectedType}
				setSelectedType={setSelectedType}
				infoType="UDC"
				udcCheque={udcCheque}
				setUdcCheque={setUdcCheque}
			/>
		</div>
	);
}

export default OptUdcAndPdc;
