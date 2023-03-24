import { css } from '@cogo/styled';

export const modalTheme = {
	modal: {
		dialog: css`
			&.mid {
				width: 844px;
				padding: 24px;
				border-radius: 8px;
				top: 32px;
				@media (max-width: _md) {
					padding: 16px;
				}
				iframe {
					border: none;
				}
			}
		`,
	},
};
