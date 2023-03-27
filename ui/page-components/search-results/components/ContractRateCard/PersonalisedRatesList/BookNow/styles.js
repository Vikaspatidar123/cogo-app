import styled from '@cogoport/front/styled';

export const Text = styled.div`
	font-weight: ${({ bold }) => (bold ? '500' : '400')};
	font-size: ${({ size }) => size || '12px'};
	color: #393f70;
	display: flex;
	padding: 4px;
	align-items: center;
`;

export const BookingContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	border-left: 1px dashed #aab9d6;
	text-align: right;
	padding: 10px;
`;

export const PerTruck = styled.div`
	display: flex;
	justify-content: flex-end;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: end;
	flex-direction: column;
	align-items: end;
	margin-top: 10px;
`;
