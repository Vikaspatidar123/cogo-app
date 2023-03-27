import styled from '@cogoport/front/styled';
import { IcMInfo } from '@cogoport/icons-react';

export const Flex = styled.div`
	display: flex;
`;

export const Rate = styled.div`
	display: flex;
	justify-content: space-between;

	&.final {
		border-bottom: 1px solid rgb(242 226 195);
	}
`;

export const TooltipContainer = styled.div`
	max-width: 250px;
	font-weight: 300;
	font-size: 12px;
`;

export const InfoIcon = styled(IcMInfo)`
	margin-left: 5px;
	width: 10px;
	height: 10px;
	align-items: center;
	cursor: pointer;
`;
