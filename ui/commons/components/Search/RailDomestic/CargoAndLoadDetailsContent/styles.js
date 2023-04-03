import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Title = styled.div`
	margin-bottom: 8px;
	color: #333;
	font-size: 12px;
	line-height: 16px;
	font-weight: 500;
	color: #828282;
	text-transform: uppercase;
`;

export const ContentContainer = styled.div`
	cursor: pointer;

	height: 44px;
	padding: 2px 8px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	border: 1px solid #ded7fc;
	background-color: #ffffff;
	border-radius: 4px;

	font-size: 14px;
	line-height: 16px;

	&:hover {
		border: solid 1px #000;
	}

	position: relative;
	overflow: auto;
`;

export const ErrorMessage = styled.p`
	color: #cb6464;
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	margin: 0px;
`;
