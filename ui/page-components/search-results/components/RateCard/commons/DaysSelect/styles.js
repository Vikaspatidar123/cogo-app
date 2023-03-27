import styled from '@cogoport/front/styled';
import { Flex, Text } from '@cogoport/front/components';

export const Container = styled(Flex)`
	border: 1px solid #bdaff9;
	border-radius: 4px;
	align-items: center;
	max-width: 92px;

	.core-ui-input-root {
		border: none;
		width: 28px;
		margin: 4px;
		padding: 0px;
	}

	.core-ui-input-control {
		text-align: center;
	}
`;

export const MethodContainer = styled.div`
	padding: 10px;
	cursor: pointer;
`;

export const Vline = styled.div`
	height: 24px;
	border: 1px solid #bdaff9;
	margin: 4px auto;
`;

export const StyledText = styled(Text)`
	font-size: 12px;
	color: #393f70;
	margin-top: 4px;
`;
