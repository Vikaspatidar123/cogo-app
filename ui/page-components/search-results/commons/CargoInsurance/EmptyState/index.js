import { IcMVerySad } from '@cogoport/icons-react';
import { NoSupport, SadContainer, SadText } from './styles';

const TEXT_MAPPING = {
	blocked_country:
		'We are sorry , We do not offer insurance for this port pair yet.',
	non_indian_search:
		'We are sorry , We offer insurance only for shipments that operates from/to India only',
	not_valid_search:
		'We are sorry, we offer insurance only for shipments that operates from INDIA or to INDIA',
};

const EmptyState = ({ reason }) => {
	return (
		<NoSupport>
			<SadContainer>
				<IcMVerySad style={{ marginTop: '10px' }} width={40} height={40} />
				<SadText>{TEXT_MAPPING[reason]}</SadText>
			</SadContainer>
		</NoSupport>
	);
};
export default EmptyState;
