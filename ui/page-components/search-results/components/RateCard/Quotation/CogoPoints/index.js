import { IcCCogoCoin } from '@cogoport/icons-react';

import { Container, Label, Points } from './styles';

function CogoPoints({ rate }) {
	if (rate?.earnable_cogopoints > 0) {
		return (
			<Container>
				<Label>You will earn</Label>
				<IcCCogoCoin style={{ wdith: 16, height: 16, margin: '0 4px' }} />
				<Points>{rate?.earnable_cogopoints}</Points>
				<Label>CogoPoints</Label>
			</Container>
		);
	}

	return null;
}

export default CogoPoints;
