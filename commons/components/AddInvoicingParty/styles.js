import styled from '@cogoport/front/styled';

export const Container = styled.div``;

export const RadioWrapper = styled.div`
	.core-ui-radio-icon.primary {
		background-color: #034afd !important;
	}

	.core-ui-radio-radio-container.primary {
		border: 1px solid #034afd !important;
	}

	.core-ui-radio-root {
		margin-bottom: 14px;
		width: 100%;
	}
	.core-ui-radiogroup-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-bottom: 16px;
		justify-content: flex-start;

		@media (min-width: 768px) {
			flex-direction: row;
		}
	}
	.core-ui-radio-label {
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: 0.04em;
		color: #2c3e50;
		opacity: 1;
		margin-left: 10px;
	}
`;
