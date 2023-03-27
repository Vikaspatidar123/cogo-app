import React from 'react';
import { Skeleton } from '@cogoport/front/components/admin';
import { Container } from './styles';

const Loader = () => (
	<Container>
		<div>
			<Skeleton width="320px" height="50px" margin="0 0 8px" />
			<Skeleton width="220px" height="20px" />
		</div>
		<div>
			<Skeleton width="50px" height="20px" />
		</div>
	</Container>
);

export default Loader;
