import styled from '@cogoport/front/styled';
import { Form as StyledForm } from '@/commons/styles/Form';

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	border-radius: 8px;

	& .form-item-container .form-item-label {
		color: #333333;
	}

	.ui-textarea {
		font-family: Roboto;
	}

	@media (max-width: 768px) {
		padding: 12px 16px 16px;
	}
`;

export const InputsContainer = styled.div`
	.core-ui-select__indicators {
		height: inherit;
	}
`;

export const DocHeader = styled.div`
	font-weight: 400;
	font-size: 12px;
	color: #828282;
`;

export const DocContainer = styled.div`
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	padding: 8px 20px;
	margin: 8px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
`;

export const DocText = styled.div`
	font-weight: 400;
	font-size: 12px;
`;

export const LinkText = styled.div`
	font-weight: 500;
	font-size: 10px;
	color: #034afd;
	text-decoration-line: underline;
	cursor: pointer;
`;

export const CheckboxContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 12px;

	margin-bottom: 16px;

	.checkboxLabel {
		margin-left: 8px;
		color: #828282;
	}

	.knowMore {
		color: #356efd;

		&:hover {
			text-decoration: underline;
			cursor: pointer;
		}
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;

export const Form = styled(StyledForm)`
	margin-top: 16px;

	& .form-item-label {
		color: #828282;
	}

	& .form-lower-label {
		color: #67c676;
	}

	& .core-ui-Pills-container {
		margin: -4px;

		& .core-ui-Pills-item {
			margin: 4px;
		}

		& .core-ui-tag-root {
			border: 1px solid #ddd;
			background-color: #ffffff;
			padding: 4px 8px;
		}
	}
`;
