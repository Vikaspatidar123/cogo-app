import React from 'react';
import { Container, Heading, Content, IcContainer, Wrapper } from './styles';
import ICNonFunded from '../../../assets/ic-empty-non-funded.svg';

function EmptyState({ heading = 'data', placement = 'center' }) {
	return (
		<Container>
			<Wrapper className={placement}>
				<Heading>No {heading} found</Heading>
				<Content>Looks like you do not have any {heading} in this category</Content>
			</Wrapper>
			{placement === 'center' ? (
				<IcContainer>
					<ICNonFunded height="100%" width="100%" style={{ marginLeft: 12 }} />
				</IcContainer>
			) : null}
		</Container>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
