import styled from '@cogoport/front/styled';

export const Container = styled.div`
	border-radius: 8px;
	padding: 8px 8px;
	margin-left: 16px;

	box-shadow: 0px 1px 4px #e4e9ff;

	.pop-arrow {
		filter: none !important;
		z-index: 1 !important;
	}

	:hover {
		background: #e4e9ff;
	}

	.tippy-arrow {
		display: none;
	}
`;

export const ContainerFlex = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
`;

export const BussinessName = styled.div`
	text-overflow: ellipsis;
	overflow: hidden;
	font-size: 14px;
	font-weight: 500;
	width: 120px;
	white-space: nowrap;
	padding-left: 10px;
`;
