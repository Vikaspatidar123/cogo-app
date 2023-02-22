import styled from '@cogoport/front/styled';
import Skeleton from '@cogoport/front/components/Skeleton';
import Grid from '@cogoport/front/components/Grid';

const { Row, Col } = Grid;
export const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	overflow: scroll;
	svg {
		margin-top: 30%;
		margin-bottom: 20px;
	}
`;

export const Card = styled(Row)`
	background: #ffffff;
	border: 1px solid #e0e6e9;
	border-radius: 6px !important;
	height: 250px !important;
	align-items: center !important;
	padding: 10px !important;
	margin-bottom: 10px;
	width: 100% !important;
`;

export const NameColumn = styled(Col)`
	font-weight: 500;
	font-size: 14px;
	color: #221f20;
`;

export const Column = styled(Col)``;

export const Percentage = styled.div`
	font-weight: 600;
	font-size: 24px;
	color: ${(props) => (props.weight < 0.5 ? '#db4634' : '#849e4c')};
`;

export const ScoreText = styled.div`
	font-size: 10px;
	color: #65677a;
`;

export const Heading2 = styled.div`
	font-weight: 500 !important;
	font-size: 12px !important;
	color: #65677a !important;
	padding: 2px !important;
`;

export const Text2 = styled.div`
	font-size: 12px;
	color: #65677a;
	width: 100% !important;
	padding: 2px;
`;

export const ColumnedRow = styled(Row)`
	display: flex !important;
	flex-direction: column !important;
	width: 100% !important;
`;

export const Wrapper2 = styled.div`
	height: 96%;
`;

export const StyledRow = styled(Row)`
	width: 100% !important;
	padding: 2px !important;
`;

export const Title = styled.div`
	font-weight: 500;
	font-size: 16px;
	color: #221f20;
	padding-bottom: 5px !important;
`;

export const Label = styled.div`
	text-align: center;
	display: flex;
	font-weight: 500;
	font-size: 18px;
	color: #849e4c;
	.bold {
		margin-right: 5px;
		font-weight: 600;
		font-size: 18px;
		color: black;
	}
`;

export const StyledSkeleton = styled(Skeleton)`
	height: 180px;
	width: 350px;
	border-radius: 10px;
`;

export const Column2 = styled(Col)`
	display: flex;
	align-items: center;
	cursor: pointer;
	.text {
		text-decoration: underline;
		font-weight: 500;
		font-size: 14px;
		margin-left: 5px;
		color: #034afd;
	}
`;

export const Div = styled.div`
	margin-top: 30%;
	margin-bottom: 20px;
	font-weight: 500;
	font-size: 20px;
	color: #221f20;
	text-align: center;
`;

export const Column3 = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	.text {
		text-decoration: underline;
		font-weight: 500;
		font-size: 14px;
		margin-left: 5px;
		color: #034afd;
	}
`;
