import { useSelector } from '@cogoport/front/store';
import { ToolTip } from '@cogoport/front/components';

import Support from './Support';
import HelpIcon from './ic-help.svg';

import { Container, StyledTooltipContainer } from './styles';

function Help() {
	const { agent } = useSelector(({ profile }) => ({
		agent: profile.partner?.entity_manager,
	}));

	return (
		<StyledTooltipContainer>
			<ToolTip
				animation="shift-away"
				placement="bottom"
				content={<Support agent={agent} />}
				theme="light"
				interactive
			>
				<Container>
					<Container>
						<HelpIcon
							style={{ cursor: 'pointer' }}
							width="22px"
							height="22px"
						/>
					</Container>
				</Container>
			</ToolTip>
		</StyledTooltipContainer>
	);
}

export default Help;
