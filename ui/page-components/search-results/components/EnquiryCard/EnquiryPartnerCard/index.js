import React from 'react';
import { useSelector } from '@cogo/store';
import { Button, Flex } from '@cogoport/front/components';
import useCreateRateTask from '../../../hooks/useCreateRateTask';
import { Header, Text } from './styles';

const CREATE_JOB_SERVICES = ['fcl_freight_local'];

const ENQUIRY_NOT_ALLOWED_SERVICES = [
	'fcl_freight',
	'lcl_freight',
	'air_freight',
];

const EnquiryPartnerCard = ({ data = {}, setShow = () => {} }) => {
	const { isMobile } = useSelector(({ general }) => ({
		isMobile: general.isMobile,
	}));

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
			<Flex>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no-gst-icon.svg"
					alt="girl-illustration"
					width={112}
					height={112}
					style={
						isMobile
							? { marginBottom: '-4px' }
							: { marginLeft: '-10px', marginBottom: '-4px' }
					}
				/>

				<Flex display="block">
					<Header>Not happy with the rates you’ve got?</Header>
					<Text>
						No need to worry, place an enquiry with us and our team will get
						back to you soon
					</Text>
				</Flex>
			</Flex>
			{create_enquiry_check ? (
				<Button
					onClick={() => setShow(true)}
					style={
						isMobile
							? {
									margin: 'auto',
									width: 'fit-content',
									padding: '16px 32px',
									height: 'fit-content',
									background: '#ffffff',
									color: '#000000',
									border: 'none',
							  }
							: {
									marginTop: '26px',
									padding: '16px 32px',
									height: 'fit-content',
									background: '#ffffff',
									color: '#000000',
									border: 'none',
							  }
					}
				>
					<div>Create Enquiry</div>
				</Button>
			) : (
				<Button
					onClick={handleCreateJob}
					disabled={rateTaskLoad}
					style={
						isMobile
							? {
									margin: 'auto',
									width: 'fit-content',
									padding: '16px 32px',
									height: 'fit-content',
									background: '#ffffff',
									color: '#000000',
									border: 'none',
							  }
							: {
									marginTop: '26px',
									padding: '16px 32px',
									height: 'fit-content',
									background: '#ffffff',
									color: '#000000',
									border: 'none',
							  }
					}
				>
					<div>Request Rate</div>
				</Button>
			)}
		</>
	);
};

export default EnquiryPartnerCard;
