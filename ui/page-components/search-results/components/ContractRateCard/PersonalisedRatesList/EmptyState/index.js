import React from 'react';
import { useRouter } from '@cogo/next';
import { Container, Content, Wrapper, Div, BackIcon } from './styles';

const EmptyState = (showBackICon = false) => {
	const { push } = useRouter();
	return (
		<Div>
			{showBackICon && (
				<BackIcon onClick={() => push('/contract-rates', `/contract-rates`)} />
			)}
			<Container>
				<Wrapper>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-state.svg"
						alt="non-funded"
						height="100%"
						width="100%"
					/>
					<Content>Rates are currently not available.</Content>
				</Wrapper>
			</Container>
		</Div>
	);
};

export default EmptyState;
