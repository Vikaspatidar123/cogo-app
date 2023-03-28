import { Button } from '@cogoport/components';
import React from 'react';

import useCreateRateTask from '../../../hooks/useCreateRateTask';

import styles from './styles.module.css';

const CREATE_JOB_SERVICES = ['fcl_freight_local'];

const ENQUIRY_NOT_ALLOWED_SERVICES = [
	'fcl_freight',
	'lcl_freight',
	'air_freight',
];

function EnquiryPartnerCard({ data = {}, setShow = () => {} }) {
	const create_enquiry_check = !CREATE_JOB_SERVICES.includes(data?.search_type);

	const { loading: rateTaskLoad, handleCreateJob } = useCreateRateTask({
		data,
	});

	const isenquiryNotAllowed = ENQUIRY_NOT_ALLOWED_SERVICES.includes(
		data?.search_type,
	);

	if (isenquiryNotAllowed) {
		return null;
	}

	return (
		<>
			<div className={styles.flex}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no-gst-icon.svg"
					alt="girl-illustration"
					width={112}
					height={112}
					style={{ marginLeft: '-10px', marginBottom: '-4px' }}
				/>

				<div className={styles.flex}>
					<div className={styles.header}>Not happy with the rates you’ve got?</div>
					<div>
						No need to worry, place an enquiry with us and our team will get
						back to you soon
					</div>
				</div>
			</div>
			{create_enquiry_check ? (
				<Button
					onClick={() => setShow(true)}
					style={
					{
						marginTop  : '26px',
						padding    : '16px 32px',
						height     : 'fit-content',
						background : '#ffffff',
						color      : '#000000',
						border     : 'none',
					}
					}
				>
					<div>Create Enquiry</div>
				</Button>
			) : (
				<Button
					onClick={handleCreateJob}
					disabled={rateTaskLoad}
					style={{
						marginTop  : '26px',
						padding    : '16px 32px',
						height     : 'fit-content',
						background : '#ffffff',
						color      : '#000000',
						border     : 'none',
					}}
				>
					<div>Request Rate</div>
				</Button>
			)}
		</>
	);
}

export default EnquiryPartnerCard;
