import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	&.app {
		background: #f9f9f9;
		border: 1px solid #e0e0e0;
		border-radius: 5px;
		height: fit-content;
	}

	@media (min-width: 760px) {
		&.search {
			position: fixed;
		}

		right: 16px;
		min-width: 250px;
		max-width: 350px;
	}
`;

export const Text = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;

	color: #2c3e50;
	margin-bottom: 4px;
`;

export const ServicesWrap = styled.div`
	background: #f9f9f9;
	border-radius: 4px;
	margin-bottom: 18px;
	padding: 12px 16px;

	.core-ui-select-root {
		margin: 2px;
	}

	.core-ui-button-root {
		display: flex;
		align-items: center;
		margin-left: auto;
	}

	.core-ui-input-root {
		width: 98%;
		margin: 2px 2px 16px 2px;
	}

	.core-ui-select__menu {
		min-width: 100px !important;
	}

	@media (min-width: 760px) {
		max-height: 600px;
		max-width: ${({ scope }) => (scope === 'app' ? '300px' : '250px')};
	}
`;

export const Pill = styled.div`
	background: #e6fbe9;
	border: 1px solid #c0ffc9;
	padding: 4px 10px;
	margin-bottom: 8px;
	box-sizing: border-box;
	border-radius: 4px;

	display: flex;
	justify-content: space-between;

	&.inactive {
		background: #f4f4f4;
		border: 1px solid #cdcdcd;
		cursor: pointer;
		padding: 6px 10px;
	}
`;

export const Services = styled.div`
	font-size: 10px;
	font-weight: bold;
	line-height: 16px;
	text-align: center;
	letter-spacing: 0.02em;
	text-transform: uppercase;

	color: #000000;
	margin: auto 6px;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const ServicesIcon = styled.span`
	width: 10px;
	height: 0px;
	font-size: 40px;
	cursor: pointer;
	margin-top: -20px;
	margin-left: 4px;

	&.add {
		font-size: 20px;
		margin-top: -7px;
	}
`;

export const Line = styled.div`
	border: 1px solid #eceef1;
	margin-bottom: 10px;
`;

export const ActiveService = styled.div``;

export const ButtonWrap = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-top: 20px;

	.core-ui-button-root {
		height: 32px;
		width: 100px;
	}
`;
