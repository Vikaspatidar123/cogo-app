import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	position: absolute;
	top: 0;
`;

export const ItemContainer = styled.div`
	background-color: #ded7fc;
	border-radius: 4px;
	padding: 2px 4px;
	margin: 2px;

	display: flex;
	flex-direction: row;
`;

export const Label = styled.div`
	font-weight: 400;
	font-size: 10px;
	color: #393f70;

	margin-right: 2px;
`;

export const Value = styled.div`
	font-weight: 500;
	font-size: 10px;
	color: #393f70;
`;

export const NoContainers = styled.div`
	font-size: 14px;
	color: #b7a8f8;
`;
