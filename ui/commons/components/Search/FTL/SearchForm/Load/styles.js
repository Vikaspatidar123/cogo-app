import styled from '@cogoport/front/styled';

export const Main = styled.div`
	width: 450px;
	max-height: 416px;
	overflow-y: scroll;

	@media (max-width: 768px) {
		width: 320px;
	}

	.ui-tabs-list {
		flex-direction: row;
		justify-content: center;
		margin-bottom: 12px;
	}

	.ui-tabs-list.horizontal.two {
		width: fit-content !important;
		margin: 0px !important;
		border: none !important;
		box-shadow: none !important;
	}

	.ui-tabs-list-container.horizontal.two.active {
		box-shadow: none;
		padding: 8px 32px !important;
	}

	.ui-tabs-list-container.horizontal.two {
		box-shadow: none !important;
		border-right: none !important;
		border-bottom: none;
		padding: 8px 32px !important;
	}

	.ui-tabs-list-title.horizontal.two {
		font-weight: 400 !important;
		font-size: 12px !important;
		color: #2c3e50 !important;
		padding: 4px !important;
	}

	.ui-tabs-list-title.horizontal.two.active {
		font-weight: 500 !important;
		font-size: 12px !important;
		color: #2c3e50 !important;
	}

	.segmented-control {
		padding-left: 10px;
	}

	.ui-tabs-list-container {
		margin-bottom: 16px;
	}

	.core-ui-input-root {
		height: 40px;
	}
`;

export const Container = styled.div`
	margin-left: 12px;
	width: 50%;
	display: flex;
	flex-direction: column;

	.tippy-box .tippy-arrow {
		display: none !important;
	}

	@media (max-width: 768px) {
		width: 100%;
		margin-left: 0px;
		padding-top: 10px;
	}
`;

export const Label = styled.label`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	color: #393f70;
	margin-bottom: 8px;
`;

export const ErrorMsg = styled.div`
	margin: 0px;
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	color: rgb(203, 100, 100);
`;
