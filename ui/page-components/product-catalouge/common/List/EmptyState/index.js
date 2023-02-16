import React from 'react';

import EmptyIcon from '../../../assets/ic-empty-non-funded.svg';

import { Container, Content, Wrapper } from './styles';

function EmptyState({ placement = 'center', message = '' }) {
	return (
		<Container>
			{placement === 'center' && <EmptyIcon width={300} height={300} />}
			<Wrapper className={placement}>
				<Content>{message}</Content>
			</Wrapper>
		</Container>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
