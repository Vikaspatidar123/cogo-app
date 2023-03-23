import styled from '@cogoport/front/styled';

export const Container = styled.div`
	position: relative;
	overflow-y: scroll;

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
	.form-item-label {
		font-weight: 500;
		font-size: 12px;
		line-height: 14px;
		color: #393f70;
		margin: 12px 0 8px 0;
	}

	.core-ui-button-root {
		font-weight: 400;
		font-size: 12px;
		color: #393f70;
		border: none !important ;
		text-transform: none;
	}

	.form-field-array-add-btn {
		font-size: 18px;
		height: 20px;
		width: 20px;
		font-weight: 500;
	}

	.core-ui-select__control {
		border: 1px solid #cddbff;
	}
`;

export const ButtonContainer = styled.div`
	width: 100%;
	margin-top: 10px;
	display: flex;
	background: #ffffff;
	justify-content: flex-end;
	position: sticky;
	padding: 8px 0 2px;
	bottom: 0;

	.core-ui-button-root {
		border: 1px solid #393f70 !important;
	}
`;
