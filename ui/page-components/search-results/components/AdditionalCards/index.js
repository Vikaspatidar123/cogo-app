import React from 'react';
import { useSelector } from '@cogo/store';
import { AuthorizeKyc } from '@cogo/authorization';
import { Container, Title, Description, Action } from './styles';

const GenericCard = ({
	theme = '',
	title = '',
	description = '',
	cta = '',
	onClick = () => {},
	bg = '',
	kyc = {},
}) => {
	const scope = useSelector((state) => (state.general || {}).scope);

	const action = (
		<Action theme={theme} onClick={onClick}>
			{cta}
		</Action>
	);

	const actionWithKyc = (
		<AuthorizeKyc config={kyc?.message}>{action}</AuthorizeKyc>
	);

	return (
		<Container theme={theme} bg={bg}>
			<Title theme={theme}>{title}</Title>

			<Description theme={theme}>{description}</Description>

			{kyc?.check && scope === 'app' ? actionWithKyc : action}
		</Container>
	);
};

export default GenericCard;
