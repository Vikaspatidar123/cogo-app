import styled from '@cogoport/front/styled';
import { Link } from '@/temp/next';

export const Container = styled.div`
	padding: 16px;
`;

export const Title = styled.div`
	font-size: 14px;
	line-height: 16px;
`;

export const Name = styled.div`
	font-weight: 700;
	font-size: 14px;
	line-height: 16px;
	color: #333333;
	margin: 8px 0;
`;

export const Label = styled.div`
	font-style: italic;
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	color: #333333;
`;

export const Contact = styled.a`
	font-size: 12px;
	line-height: 14px;
	text-decoration-line: underline;
	color: #333333;
	cursor: pointer;
	margin-right: 8px;
`;

export const Section = styled.div`
	margin-bottom: 8px;
`;

export const LinkText = styled(Link)`
	font-size: 12px;
	text-decoration-line: underline;
	cursor: pointer;
`;
