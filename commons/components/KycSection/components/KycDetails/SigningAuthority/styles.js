import styled from '@cogoport/front/styled';

export const SubHeading = styled.div`
	font-size: 14px;
	color: #333333;
`;

export const LayoutContainer = styled.div`
	background: #f9f9f9;
	border-radius: 10px;
	padding: 32px;
	margin: 16px 0;

	.form-item-label {
		margin: 16px 0 8px 0;
		font-size: 10px;
		color: #333333;
	}

	@media (max-width: 768px) {
		padding: 0 16px 16px;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 16px;
`;

export const SelectContainer = styled.div`
	width: 32.4%;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const SelectLabel = styled.h1`
	margin: 16px 0 10px 0;
	font-size: 10px;
	color: #333333;
`;

export const DivisionContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const Separator = styled.div`
	border-bottom: 1px solid #e0e0e0;
	width: 50%;
`;

export const SeparatorText = styled.div`
	font-weight: 500;
	font-size: 18px;
	z-index: 10;
	color: #000000;
	margin: 8px;
`;
