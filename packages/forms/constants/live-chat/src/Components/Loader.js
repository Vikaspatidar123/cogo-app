import React from 'react';
import { Loader } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';

const LoaderWrapper = styled.div`
	width: 100%;
	height: 80%;
	display: flex;
	justify-content: center;
	align-content: center;
`;

const LoaderComponent = () => (
	<LoaderWrapper>
		<Loader size="medium" />
	</LoaderWrapper>
);

export default LoaderComponent;
