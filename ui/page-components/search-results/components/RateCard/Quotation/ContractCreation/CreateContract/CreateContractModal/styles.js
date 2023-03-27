import styled from '@cogoport/front/styled';
import { Grid } from '@cogoport/front/components';

const { Row, Col } = Grid;

export const Container = styled.div`
	.lg .core-ui-select__control {
		min-height: 40px !important;
		padding-top: 6px !important;
	}
	.ui-single-date-picker-input-container {
		height: 40px !important;
		border-radius: 4px !important;
		border: 1px solid #cbcff5;
		.core-ui-input-root {
			:focus-within {
				box-shadow: none !important;
			}
		}
		.core-ui-input-control {
			margin-top: 8px;
		}
	}
`;

export const StyledRow = styled(Row)`
	margin: 20px !important;

	.core-ui-select__menu {
		max-width: 50% !important;
		min-width: 250px !important;
	}
`;

export const StyledCol = styled(Col)`
	&.end-date {
		margin-top: 10px !important;
	}
`;

export const Label = styled.div`
	font-size: 14px;
	font-weight: 500;
	text-align: left;
	color: #393f70;
	margin-bottom: -10px;

	.lower-label {
		color: #436df4;
		font-size: 12px;
	}
	.shipping-line {
		color: #f68b21;
		font-weight: 400;
		font-size: 12px;
	}
`;

export const ErrorText = styled.div`
	font-size: 12px;
	color: #cb6464;
`;

export const InlineLabel = styled.div`
	font-size: 10px;
	line-height: 16px;
	color: #333333;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	top: 9px;
	z-index: 1;
	background: white;
	left: 10px;
	padding: 0px 1px;
	width: fit-content;
`;

export const Note = styled.div`
	color: #f68b21;
	margin-left: 30px;
`;

export const SubLabel = styled.span`
	color: #436df4;
	font-size: 12px;
`;
