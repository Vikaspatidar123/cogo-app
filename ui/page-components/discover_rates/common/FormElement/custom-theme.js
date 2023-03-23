import { css } from '@cogo/styled';

const CUSTOM_THEME = {
	input: {
		inputContainer: css`
			&.mid {
				border: 1px solid #e0e0e0;
				border-radius: 4px;
				height: inherit !important;
			}
		`,
		inputField: css`
			font-size: 12px;
			line-height: 14px;
			color: #000000;
			height: 28px;

			::placeholder {
				font-size: 12px;
				line-height: 14px;
				color: #828282;
			}
		`,
		inputGroup: css`
			padding: 0 !important;
			margin: auto 5px !important;
			border: none !important;
		`,
	},
};

export default CUSTOM_THEME;
