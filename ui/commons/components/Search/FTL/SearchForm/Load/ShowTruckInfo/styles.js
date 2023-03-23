import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 12px;
	height: 40px;
	background: #ffffff;
	border: 1px solid #cbcff5;
	border-radius: 4px;
	cursor: pointer;

	.text {
		font-size: 14px;
		color: #cbcff5;
	}

	&:hover {
		border: 1px solid blue;
	}
`;

export const DetailsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: fit-content;
	max-height: 36px;
	padding: 4px 0px;
	overflow-y: scroll;
	align-items: center;
`;

export const Details = styled.div`
	margin-right: 4px;
	background: #f2efff;
	border-radius: 4px;
	padding: 2px 5px;
	margin-bottom: 4px;
	font-size: 8px;
	line-height: 14px;
	color: #393f70;
`;

export const ToolTipContent = styled.div`
	padding: 8px;
	border-bottom: 1px solid #cbcff5;
	font-size: 14px;
	color: #393f70;

	&.no-margin {
		border-bottom: unset;
	}
`;
