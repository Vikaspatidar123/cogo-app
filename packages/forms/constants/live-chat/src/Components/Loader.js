import { Loader } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';
import React from 'react';

const LoaderWrapper = styled.div`
	width: 100%;
	height: 80%;
	display: flex;
	justify-content: center;
	align-content: center;
`;

function LoaderComponent() {
	return (
		<LoaderWrapper>
			<Loader size="medium" />
		</LoaderWrapper>
	);
}

export default LoaderComponent;
