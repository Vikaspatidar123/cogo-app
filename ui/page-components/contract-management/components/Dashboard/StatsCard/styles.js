import styled from '@cogoport/front/styled';
import { Skeleton } from '@cogoport/front/components/admin';
import { Grid } from '@cogoport/front/components';

const { Col, Row } = Grid;

export const StyledRow = styled(Row)`
	margin-top: 15px;
	justify-content: center;
`;

export const StyledCol = styled(Col)`
	@media (max-width: 768px) {
		margin-bottom: 12px;
	}
`;

export const Card = styled.div`
	width: 100%;
	background: ${(props) => props.bgColor};
	border-radius: 4px;
	padding: 20px;
	box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
		0px 1px 2px rgba(16, 24, 40, 0.06);
	transition: 0.4s;

	:hover {
		transform: scale(1.01, 1.03);
		box-shadow: 2px 2px 4px rgba(44, 62, 80, 0.3);
		transition: 0.2s;
	}
`;

export const Title = styled.div`
	font-weight: 500;
	font-size: 16px;
`;

export const Count = styled.div`
	margin-top: 10px;
	font-weight: 600;
	font-size: 30px;
`;

export const Comparison = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	svg.line-graph-svg {
		width: 80px;
		height: 46px;

		path:first-child {
			fill: ${({ stroke }) => stroke};
		}

		path:nth-child(3) {
			stroke: ${({ fill }) => fill};
		}
	}
`;

export const Ratio = styled.div`
	display: flex;
	align-items: center;
	color: #667085;
`;

export const UpwordIcon = styled.div`
	margin-right: 5px;
	color: ${({ loss }) => (loss ? '#cb6464' : '#12b76a')};
	transform: ${({ loss }) => (loss ? 'rotate(270deg)' : 'rotate(90deg)')};
`;

export const RatioCount = styled.div`
	margin-right: 5px;
	font-weight: 500;
	font-size: 14px;
	color: ${({ loss }) => (loss ? '#cb6464' : '#027a48')};
`;

export const SkeletonWrapper = styled(Skeleton)`
	border-radius: 10px;
`;
