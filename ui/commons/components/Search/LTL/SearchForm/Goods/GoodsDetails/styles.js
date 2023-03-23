import styled from '@cogoport/front/styled';

export const Container = styled.div`
	min-width: 400px;
	padding: 6px 6px;
	@media (max-width: 768px) {
		min-width: 300px;
	}

	.form-item-label {
		margin: 12px 0;

		font-weight: 500;
		font-size: 12px;
		color: #393f70;
	}

	.core-ui-select__control {
		background: #ffffff;
		border: 1px solid #cbcff5;
		border-radius: 4px;
	}

	.core-ui-select-root {
		max-height: 32px;
	}

	.commodityType {
		font-weight: 500;
		font-size: 12px;
		color: #393f70;

		margin-bottom: 16px;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;

	margin-bottom: 16px;
	padding: 16px 0;
	border-bottom: 1px solid #ded7fc;

	.headerText {
		font-size: 12px;
		color: #393f70;

		white-space: nowrap;
		margin-right: 4px;
	}

	.errMessage {
		font-size: 12px;
		color: red;
	}
`;

export const DatePickerContainer = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
`;

export const SelectedValue = styled.div`
	width: fit-content;
	font-size: 10px;
	padding: 2px 8px;
	margin: 4px 0 0 16px;

	background: #eef0fc;
	border-radius: 4px;
`;

export const ButtonContainer = styled.div`
	width: 100%;
	margin-top: 10px;
	display: flex;
	justify-content: flex-end;
`;

export const SpecialConsiderationContainer = styled.div`
	margin-bottom: 12px;
`;

export const SpecialConsiderationOptions = styled.div`
	width: fit-content;

	display: flex;
	align-items: center;

	padding: 10px 18px;

	background: #ffffff;
	border: 1px solid #5936f0;
	border-radius: 4px;

	cursor: pointer;

	.ui-core-checkbox-root {
		width: 18px;
		height: 18px;

		&.primary.checked {
			background: #393f70;
		}
	}

	&:hover {
		background-color: rgb(236, 236, 236);
	}
`;

export const Label = styled.div``;

export const DateContainer = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid #cbcff5;
	border-radius: 4px;
	padding: 4px 12px;
	cursor: pointer;

	& svg {
		margin-right: 12px;
	}
`;

export const DateDiv = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SelectDate = styled.div`
	font-size: 8px;
	display: flex;
	align-items: center;
	color: #cbcff5;
`;

export const DateContent = styled.div`
	font-size: 12px;
	display: flex;
	align-items: center;
	color: #5c6186;
`;
