import styled from '@cogoport/front/styled';

export const SubHeading = styled.div`
	font-size: 14px;
	color: #333333;
	width: 85%;
`;

export const LayoutContainer = styled.div`
	background: #f9f9f9;
	border-radius: 10px;
	padding: 32px;
	margin: 16px 0;
	display: flex;
	flex-direction: column;
	width: 100%;

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
`;

export const ControlContainer = styled.div`
	width: 33%;
	margin-right: 48px;

	@media (max-width: 768px) {
		width: 100%;
		margin-right: unset;
	}
`;

export const ControlHeader = styled.div`
	margin: 16px 0 8px 0;
	font-size: 10px;
	color: #333333;
	font-weight: bold;
`;

export const VerificationText = styled.div`
	font-size: 10px;
	line-height: 12px;
	text-decoration-line: underline;
	color: #034afd;
	text-align: right;
	cursor: pointer;
`;

export const ValueText = styled.div`
	font-size: 14px;
	color: #333333;
`;

export const ValueContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const VerifiedIconTextContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const VerifiedText = styled.div`
	font-style: italic;
	font-weight: 300;
	font-size: 12px;
	color: #333333;
`;
