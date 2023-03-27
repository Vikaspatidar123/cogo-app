import styled from '@cogoport/front/styled';

export const TouchPointsName = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
`;

export const TouchContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	@media (min-width: 768px) {
		padding: 0 32px;
	}
`;

export const Text = styled.div`
	font-weight: ${({ bold }) => (bold ? '500' : '400')};
	font-size: ${({ size }) => size || '12px'};
	color: #393f70;
	display: flex;
	padding: 4px;
	align-items: center;
`;

export const TransitHeading = styled.div`
	font-weight: 400;
	font-size: 14px;
	color: #333333;
`;

export const Days = styled.div`
	font-weight: 700;
	font-size: 16px;
	color: #333333;
`;

export const TransitDiv = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 24px;
`;
