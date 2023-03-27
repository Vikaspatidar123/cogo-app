import styled from '@cogoport/front/styled';

export const Container = styled.div`
	padding: 16px;
	border-radius: 10px;
	margin-bottom: 16px;
	background-color: #d9e5fc;
`;

export const Title = styled.h5`
	font-size: 14px;
	font-weight: bold;
	line-height: 18px;
	color: #1a4696;
	margin: 0 0 8px;
`;

export const Description = styled.p`
	font-size: 12px;
	line-height: 16px;
	color: #1a4696;
	margin: 0 0 16px;
`;

export const Action = styled.button`
	border: none;
	padding: none;
	background: transparent;
	font-size: 14px;
	font-weight: 750;
	line-height: 18px;
	text-align: right;
	color: #1a4696;
	margin-left: auto;
	display: block;
	cursor: pointer;
	outline: none;

	&:hover {
		text-decoration: underline;
	}
`;

export const ActionContainer = styled.p`
	margin: 0;
	font-size: 14px;
	font-weight: 600;
	line-height: 18px;
	text-align: right;
	color: #1a4696;
`;
