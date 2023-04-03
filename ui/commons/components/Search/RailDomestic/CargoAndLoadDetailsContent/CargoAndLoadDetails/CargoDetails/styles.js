import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	& .form-item-container {
		margin-bottom: 16px;
		height: 100%;
	}

	& .form-item-label {
		margin-top: 0;
		margin-bottom: 2px;

		color: #393f70;
		font-size: 12px;
		line-height: 16px;
		font-weight: 500;

		text-transform: capitalize;
	}

	& .err-msz {
		padding-left: 0;
		text-transform: capitalize;
	}

	& .core-ui-select__control {
		max-height: 34px !important;
	}

	& .core-ui-input-root {
		min-height: 42px !important;
	}

	& .core-ui-select-caret-icon {
		margin-left: 0px !important;
	}
`;
