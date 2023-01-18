import styled from '@cogoport/front/styled';
import { Form as StyledForm } from '../../../../../styles/Form';
import Spinner from '../../../../Spinner';

export const Container = styled.div`
	border-radius: 6px;

	.title {
		font-weight: 400;
		font-size: 14px;
		line-height: 130%;
		letter-spacing: -0.02em;
		color: #333333;
	}

	.tradeLaneHeader {
		margin: 12px 0;

		font-weight: 500;
		font-size: 14px;
		line-height: 130%;
		letter-spacing: -0.02em;
		color: #333333;
	}
`;

export const Form = styled(StyledForm)`
	flex: 11;
	margin-top: 30px;

	& .core-ui-select__placeholder {
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		display: flex;
		align-items: center;
		letter-spacing: 0.02em;
		color: #858383;
	}

	.form-fieldArray-button_delete_container {
		margin-top: 8px !important;

		svg {
			height: 1.8em !important;
		}
	}
	.form-fieldArray-addBtn {
		margin-bottom: 12px !important;
		margin-top: 0px !important;
		justify-content: end;
		margin-right: 40px;
	}
	.border-layout {
		border-right: 1px solid #dcdcdc;
	}
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const StyledSpinner = styled(Spinner)``;

export const IconContainer = styled.div`
	flex: 1;
	cursor: pointer;
	margin-right: -20px;

	position: relative;
	top: 15px;
`;

export const ButtonContainer = styled.div`
	width: 100%;
	margin-top: 12px;
	display: flex;
	justify-content: flex-end;
`;

export const CardContainer = styled.div`
	padding: 12px;
	border-radius: 10px;

	background: #f9f9f9;
`;
