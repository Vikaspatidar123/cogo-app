import styled from '@cogoport/front/styled';

export const Container = styled.div`
	.core-ui-button-root {
		padding: 5px !important;
	}

	.core-ui-button-root div {
		background-color: #7a5ef3;
	}

	.core-ui-input-root {
		border: 1px solid #cddbff !important;
	}
`;

export const Wrapper = styled.div`
	height: 220px;
	overflow-y: auto;
	.form-item-label {
		font-weight: 500;
		font-size: 12px;
		color: #393f70;
		margin: 12px 0 8px 0;
	}

	.core-ui-button-root {
		font-weight: 400;
		font-size: 12px;
		color: #393f70;
		border: none !important;
		text-transform: none;
	}

	.form-field-array-add-btn {
		font-size: 18px;
		height: 20px;
		width: 20px;
		font-weight: 500;
	}

	.form-fieldArray-cargos {
		padding-left: 0px;
		padding-right: 0px;
	}

	.core-ui-select__control {
		border: 1px solid #cddbff;
	}

	.form-layout-root-row {
		margin: 0 -16px !important;
	}

	.core-ui-input-suffix {
		display: flex;
		align-items: center;
		color: #828282;
		font-size: 14px;
	}
`;

export const ButtonContainer = styled.div`
	width: 100%;
	margin-top: 10px;
	display: flex;
	justify-content: flex-end;

	.core-ui-button-root {
		border: 1px solid #393f70 !important;
	}
`;
