import React from 'react';
import Flex from '@cogoport/front/components/Flex';
import Button from '@cogoport/front/components/Button';
import { ButtonWrapper } from '../styles';

const StatusTabs = ({ loading, requestType, setRequestType }) => {
	return (
		<Flex justifyContent="center">
			<ButtonWrapper disabled={loading} style={{ borderRadius: '10px' }}>
				<Button
					onClick={() => setRequestType('Unpaid')}
					ghost={!(requestType === 'Unpaid')}
					size="md"
					style={{ borderRadius: '10px 0px 0px 10px' }}
				>
					Unpaid Shipments
				</Button>
				<Button
					onClick={() => setRequestType('All')}
					ghost={!(requestType === 'All')}
					size="md"
					style={{ borderRadius: '0px 10px 10px 0px' }}
				>
					All Shipments
				</Button>
			</ButtonWrapper>
		</Flex>
	);
};

export default StatusTabs;
