import styled from '@cogoport/front/styled';

export const SpinnerIconContainer = styled.div`
	width: 100%;
	padding: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	& .form-item-container {
		margin-bottom: 16px;

		display: flex;
		flex-direction: column;
	}

	& .form-item-label {
		margin-top: 5px;
		margin-bottom: 0;

		color: #333333;
		font-size: 15px;
		font-weight: 400;
		margin-bottom: 4px;
	}
`;

export const ButtonContainer = styled.div`
	width: 100%;
	margin-top: 12px;
	display: flex;
	justify-content: flex-end;
`;

export const LayoutContainer = styled.div`
	padding: 12px;
	background: #f9f9f9;
	border-radius: 10px;

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
