import styled from '@cogoport/front/styled';

export const LayoutContainer = styled.div`
	background: #f9f9f9;
	border-radius: 10px;
	padding: 32px;
	margin: 16px 0;
	display: flex;

	@media (max-width: 768px) {
		padding: 12px 16px 16px;
	}

	& .ui-core-checkbox-root {
		&.checked {
			background-color: #034afd !important;
			border: 1px solid #034afd !important;
		}
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;

export const Body = styled.div`
	font-size: 16px;
	color: #000000;
	width: 95%;
	margin-left: 16px;
`;
