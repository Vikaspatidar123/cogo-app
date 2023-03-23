import styled from '@cogoport/front/styled';

export const Container = styled.div`
	.form-item-label {
		font-weight: 500;
		font-size: 12px;
		color: #393f70;
		margin: 12px 0 8px 0;
	}

	.core-ui-button-root div {
		background-color: #7a5ef3;
	}
`;

export const Wrapper = styled.div`
	.core-ui-input-root {
		border: 1px solid #cddbff !important;
	}

	.core-ui-select__control {
		border: 1px solid #cddbff;
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
