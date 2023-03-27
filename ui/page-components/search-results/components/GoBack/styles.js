import styled from '@cogoport/front/styled';

export const Back = styled.div`
	font-size: 16px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.2;
	letter-spacing: normal;
	cursor: pointer;
	color: #333;
	
	&:hover {
		transform: translateY(-1px);
	}
`;

export const RowBack = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;
	width: max-content;

	&.shipment {
		margin-bottom: 0px;
	}
`;
