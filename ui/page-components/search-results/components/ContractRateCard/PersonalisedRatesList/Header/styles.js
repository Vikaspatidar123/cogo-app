import styled from '@cogoport/front/styled';
import { Grid } from '@cogoport/front/components';

const { Col } = Grid;
export const Container = styled.div`
	width: 100%;
	padding: 10px;
	left: 0;
	position: absolute;
	background: #ffffff;
	box-shadow: 0px 1px 6px rgba(169, 188, 218, 0.65);
	display: flex;
	align-items: center;
	.space-top {
		display: flex;
		align-items: center;
	}
`;

export const ServiceName = styled.div`
	text-transform: uppercase;
	color: #393f70;
	font-weight: 500;
	font-size: 14px;
`;
export const IconDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledCol = styled(Col)`
	border-right: 1px solid #f2f2f2;
	display: flex;
	align-items: center;
`;
