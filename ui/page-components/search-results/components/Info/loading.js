import { Flex } from '@cogoport/front/components';
import { Skeleton } from '@cogoport/front/components/admin';
import styled from '@cogoport/front/styled';
import React from 'react';

import { Line, ServiceWrap, FlexDisplay } from './styles';

function Loading({ isMobile = false, scope = '' }) {
	return (
		<Container className={scope === 'app' ? 'app' : ''}>
			<ServiceWrap>
				<Skeleton width="50px" />
				<Skeleton
					width="50px"
					style={isMobile ? { marginLeft: '10px' } : { marginTop: '10px' }}
				/>
			</ServiceWrap>
			<Line style={isMobile ? { marginBottom: '10px' } : {}} />

			<Flex style={{ padding: '10px 20px' }}>
				<Flex display="block">
					<Skeleton width={isMobile ? '120px' : '200px'} />
					<Skeleton
						width={isMobile ? '80px' : '150px'}
						style={{ marginTop: '10px' }}
					/>
				</Flex>

				<Flex display="block" style={{ marginLeft: '30px' }}>
					<Skeleton width={isMobile ? '120px' : '200px'} />
					<Skeleton
						width={isMobile ? '80px' : '150px'}
						style={{ marginTop: '10px' }}
					/>
				</Flex>
			</Flex>

			<FlexDisplay>
				<Line style={isMobile ? { marginTop: '10px' } : {}} />

				<Flex display="block" style={{ padding: '10px 20px' }}>
					<Skeleton width="200px" />
					<Skeleton width="200px" style={{ marginTop: '10px' }} />
				</Flex>
			</FlexDisplay>
		</Container>
	);
}

export default Loading;

const Container = styled.div`
	width: 100%;
	border-radius: 10px;
	display: flex;
	background: #f9f9f9;

	&.app {
		border: 1px solid #e0e0e0;
	}

	@media (max-width: 760px) {
		border: 1px solid #bdbdbd;
		flex-direction: column;
	}

	@media (max-width: 1164px) {
		background: #ffffff;
	}
`;
