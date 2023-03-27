import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	background: #ffffff;
	border-radius: 10px;
	padding: 20px;
	margin-bottom: 20px;
	transition: all 0.3s;
	align-items: center;
	padding-left: 10px;
	padding-right: 10px;
	position: relative;
`;

export const Heading = styled.h1`
	font-weight: 700;
	font-size: 12px;
	line-height: 16px;
	color: #000000;
	margin: 0px;
`;

export const Communicate = styled.h2`
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: 0.02em;
	color: #4f4f4f;
	margin-top: 7px;
`;

export const ViewResult = styled.a`
	font-style: normal;
	font-weight: bold;
	font-size: 12px;
	line-height: 14px;
	letter-spacing: 0.02em;
	text-decoration-line: underline;
	color: #333333;
	cursor: pointer;

	&.disable {
		cursor: not-allowed;
	}
`;

export const Deviation = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #9b86f6;
	margin-right: 10px;
	position: relative;
`;
