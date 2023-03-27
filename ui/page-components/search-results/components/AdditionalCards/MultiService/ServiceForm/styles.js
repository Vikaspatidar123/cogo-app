import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin: -24px 24px 16px 24px;

	.core-ui-input-suffix {
		display: flex;
		align-items: center;
	}

	.core-ui-tag-root {
		background: #e0e0e0;

		&:hover {
			border-color: #333333 !important;
		}
	}

	.active .core-ui-tag-root {
		background: #b4f3be !important;
		border-color: #b4f3be !important;
		cursor: default;
	}

	.form-item-label {
		margin-top: 16px !important;
		margin-bottom: 8px !important;
	}

	.core-ui-select__indicators {
		margin: auto;
	}
`;

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	background: #fcedbf;
	border-radius: 0px 0px 8px 8px;
	padding: 16px 24px;
`;

export const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 24px;
`;
