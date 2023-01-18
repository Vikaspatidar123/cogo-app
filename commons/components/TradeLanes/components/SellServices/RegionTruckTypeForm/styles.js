import styled from '@cogoport/front/styled';

export const SpinnerIconContainer = styled.div`
	width: 100%;
	padding: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Container = styled.div``;

export const Title = styled.div`
	margin-bottom: 20px;
	font-weight: 400;
	font-size: 14px;
	line-height: 130%;
	letter-spacing: -0.02em;
	color: #333333;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	flex: 11;

	& .form-item-container {
		margin-bottom: 16px;

		display: flex;
		flex-direction: column;
	}

	& .form-item-label {
		margin-top: 0;
		margin-bottom: 0;

		color: #858484;
		font-size: 12px;
		font-weight: 400;
		margin-bottom: 4px;
	}

	& .core-ui-select__placeholder {
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		display: flex;
		align-items: center;
		letter-spacing: 0.02em;
		color: #858383;
	}
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
