import styled from '@cogoport/front/styled';
import { Form as StyledForm } from '../../../../../styles/Form';

export const Container = styled.div`
	.tradeLaneHeader {
		margin: 6px 0;

		font-weight: 400;
		font-size: 16px;
		color: #333333;
	}
`;

export const Form = styled(StyledForm)`
	flex: 11;
	padding: 12px;
	border-radius: 10px;
	background: #f9f9f9;

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
`;

export const AddedTradelanesContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	min-height: 60px;

	${(props) => props.showBorderBottom && `border-bottom: 1px solid #bdbdbd;`}
`;

export const ButtonContainer = styled.div`
	width: 100%;
	margin-top: 12px;
	display: flex;
	justify-content: flex-end;
`;

export const SpinnerIconContainer = styled.div`
	width: 100%;
	padding: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
