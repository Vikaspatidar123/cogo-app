import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin-top: 4px;
	padding: 8px;

	cursor: pointer;

	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;

	background-color: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 4px;

	&:hover {
		border: 1px solid #000;
	}
`;

export const PillTextContainer = styled.div`
	background-color: #ded7fc;
	border-radius: 4px;

	padding: 2px 4px;
	margin: 2px;

	display: flex;
	flex-direction: row;
`;

export const PillTextLabel = styled.span`
	font-weight: 400;
	font-size: 10px;
	color: #393f70;

	margin-right: 2px;
`;

export const PillTextValue = styled.span`
	font-weight: 500;
	font-size: 10px;
	color: #393f70;
`;
