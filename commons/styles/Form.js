import styled from '@cogoport/front/styled';

export const Form = styled.form`
	display: flex;
	flex-direction: column;

	& .form-item-container {
		margin-bottom: 16px;

		display: flex;
		flex-direction: column;
	}

	& .form-item-label,
	& .business-checkbox-label {
		margin-top: 0;
		margin-bottom: 0;

		color: #828282;
		font-size: 12px;
		font-weight: 400;
		margin-bottom: 4px;
	}

	& .business-checkbox-label {
		margin-bottom: unset;
	}

	& .core-ui-input-root {
		padding: 12px;

		& .core-ui-input-suffix {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	}

	& .core-ui-select__control {
		height: 40px;
	}

	& .err-msz {
		padding-left: 0;
	}

	& input.toUpperCase,
	& .toUpperCase input {
		text-transform: uppercase;
	}

	.business-checkbox-label {
		margin-bottom: 0;
	}
`;
