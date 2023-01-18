import styled from '@cogoport/front/styled';

export const SubHeading = styled.div`
	font-size: 14px;
	color: #333333;
`;

export const LayoutContainer = styled.div`
	background: #f9f9f9;
	border-radius: 10px;
	padding: 16px 32px;
	margin: 16px 0;

	.form-item-label {
		margin: 16px 0 8px 0;
		font-size: 12px;
		color: #333333;
	}

	@media (max-width: 768px) {
		padding: 0 16px 16px;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;
