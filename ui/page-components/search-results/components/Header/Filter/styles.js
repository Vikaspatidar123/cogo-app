import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin-right: 4px;
	position: relative;
	.bussiness_module_filter_header {
		margin-bottom: 0px;
	}
	.filter-control-label {
		margin-top: 14px;
	}
	.core-ui-select__control {
		width: 100%;
	}

	&.web-view {
		.core-ui-button-root {
			padding: 6px 16px;
		}
	}

	&.mobile-view {
		.core-ui-button-root {
			padding: 6px 10px;
		}
	}
`;

export const FilterDot = styled.div`
	border-radius: 50%;
	background: rgb(3, 74, 253);
	position: absolute;
	top: 6px;
	right: 12px;
	height: 8px;
	width: 8px;
`;
