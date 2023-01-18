import Tooltip from '@cogoport/front/components/ToolTip';

import { Container } from './styles';

function CustomTooltip({ children, message }) {
	return (
		<Tooltip content={<Container>{message}</Container>}>{children}</Tooltip>
	);
}

export default CustomTooltip;
