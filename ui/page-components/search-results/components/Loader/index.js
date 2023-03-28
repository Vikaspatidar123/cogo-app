import { Flex } from '@cogoport/front/components';
import { Skeleton } from '@cogoport/front/components/admin';
import React from 'react';

import { Container, Card, LineVrt, FlexDisplay } from './styles';

function Loader({ isMobile = false, scope = '' }) {
	return (
		<Container className={scope === 'app' ? 'app' : ''}>
			<Card>
				<Flex display="block" flex={1}>
					<Skeleton
						width={isMobile ? '250px' : '540px'}
						height="40px"
						style={
						isMobile
							? { margin: '20px auto 20px auto' }
							: { margin: '30px 30px 20px 30px' }
					}
					/>

					<Skeleton width="200px" height="30px" style={{ margin: 'auto' }} />

					<LineVrt className="horizontal" />

					<Skeleton width="200px" style={{ margin: '10px 0px 10px 20px' }} />
				</Flex>

				<FlexDisplay>
					<LineVrt />

					<Flex display="block" flex={1} style={{ margin: 'auto' }}>
						{!isMobile && <Skeleton width="160px" style={{ margin: 'auto' }} />}

						<Skeleton
							width="160px"
							height="44px"
							style={{ margin: 'auto', marginTop: '30px', marginBottom: '20px' }}
						/>

						{!isMobile && <Skeleton width="160px" style={{ margin: 'auto' }} />}
					</Flex>
				</FlexDisplay>
			</Card>
		</Container>
	);
}

export default Loader;
