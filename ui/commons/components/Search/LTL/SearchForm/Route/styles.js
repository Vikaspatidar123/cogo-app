import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	align-items: flex-end;

	@media (max-width: 540px) {
		flex-direction: column;
	}

	.core-ui-select__control {
		border: solid 1px #e0e0e0;
		box-shadow: none;
		height: 40px !important;

		:focus-within {
			border-color: #000000;
			box-shadow: none;
		}
	}
`;

export const Section = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 45%;
	min-width: 45%;

	@media (max-width: 540px) {
		width: 100%;
		margin-bottom: 16px;
	}

	.custom-select-input-select-value {
		font-size: 14px;
		color: #000000;
		line-height: 16px;
		font-weight: bold;
	}

	.custom-select-input-container {
		.custom-select-input-subcontainer {
			border: 1px solid #cbcff5;
			.core-ui-input-root {
				border: unset !important;
			}
		}
	}

	.custom-select-input-subcontainer {
		height: 40px;
		border: solid 1px #e0e0e0;
		cursor: text;
		box-shadow: none;
		:focus {
			border: 1px solid black;
			box-shadow: none;
		}
		:focus-within {
			border: 1px solid black;
			box-shadow: none;
		}
		:hover {
			border: 1px solid black;
			box-shadow: none;
		}
	}

	&.small {
		.custom-select-input-subcontainer {
			height: 40px;
		}
	}
`;

export const Arrow = styled.div`
	text-align: center;

	@media (max-width: 540px) {
		display: none;
	}
`;

export const Label = styled.label`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	color: #393f70;
	margin-bottom: 8px;
`;

export const ArrowSection = styled.div`
	margin-bottom: 8px;
	display: flex;
	justify-content: center;
	width: 20%;
`;

export const ErrorMsg = styled.div`
	margin: 0px;
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	color: rgb(203, 100, 100);
`;
