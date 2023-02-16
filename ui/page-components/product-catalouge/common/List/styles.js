import styled from '@cogoport/front/styled';

export const Container = styled.div`
	.list {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.pagination {
		display: flex;
		justify-content: flex-end;
	}
`;

export const PaginationDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	& > nav > ul > li > a {
		background: ${(props) => (props.drillDown ? '#fff' : '#eceff8;')};
	}
`;

export const PageContainer = styled.div`
	.pagination {
		float: right;
		display: flex;
		justify-content: center;
		color: black;
		.paginationContainer {
			margin: 10px !important;
		}

		.page,
		.break {
			border: none !important;
			background: transparent !important;
			font-weight: 500 !important;
		}

		.selected {
			background: #fef3e9 !important;
			color: black;
		}

		.next,
		.previous {
			background: transparent !important;
			border: none !important;

			svg {
				stroke-width: 0.5px;
				stroke: #333;
			}

			svg path {
				fill: #333;
			}
		}

		.disabled {
			cursor: not-allowed;
			svg {
				stroke-width: 0.5px;
				stroke: #9a9ea5;
			}

			svg path {
				fill: #9a9ea5;
			}
		}
	}
`;
