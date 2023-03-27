import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin-top: 10px;
	padding: 0px 20px 20px 20px;
	border-radius: 5px;
`;

export const LineItemCon = styled.div`
	margin: 20px;
`;

export const BtnContainer = styled.div`
	padding: 10px;
	margin-top: 10px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	box-shadow: rgb(0 0 0 / 40%) 0px 0px 6px;
`;

export const PriceCon = styled.div`
	margin-right: 15px;
	color: #333333;
	font-size: 14px;
	font-weight: 600;
`;

export const Text = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
	font-size: 14px;

	.price {
		margin-left: 10px;
		font-weight: 500;
		font-size: 16px;
		color: #393f70;
	}
`;

export const LeadText = styled.div`
	font-weight: 400;
	font-size: 10px;
	color: #828282;
`;
