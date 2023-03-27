import styled from '@cogoport/front/styled';

export const RowContainer = styled.div`
	padding: 0 30px;
	margin: 16px 0px;

	.line-item {
		border-bottom: 1px dashed #aab9d6;
		padding: 5px;
	}

	.line-item:last-child {
		border-bottom: unset;
	}
`;
export const ChargeName = styled.div`
	font-weight: 400;
	font-size: 12px;
	color: #363e6e;
`;

export const TotalPrice = styled.div`
	font-weight: 500;
	font-size: 12px;
	color: #393f70;
`;

export const Unit = styled.div`
	font-weight: 400;
	font-size: 12px;
	color: #a8acce;
`;

export const CostCalculation = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const Quantity = styled.div`
	font-weight: 600;
	font-size: 12px;
	color: #393f70;
	margin-right: 6px;
`;

export const Price = styled.div`
	font-weight: 400;
	font-size: 12px;
	color: #393f70;
	margin-right: 6px;
`;

export const Cross = styled.div`
	font-weight: 400;
	font-size: 12px;
	color: #393f70;
	margin-right: 6px;
`;
