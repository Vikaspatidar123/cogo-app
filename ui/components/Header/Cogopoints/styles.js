import styled from '@cogoport/front/styled';
import { Link } from '@/temp/next';

export const Container = styled.div`
	border-radius: 4px;
	box-shadow: 0 1px 4px #e4e9ff;
	transition: 0.2s;

	:hover {
		box-shadow: 0 1px 6px #bdbdbd;
		transition: 0.2s;
	}
`;

export const A = styled(Link)`
	display: flex;
	align-items: center;
	padding: 6px 10px;
`;

export const Points = styled.span`
	color: #e99c19;
	font-weight: 400;
	font-size: 14px;
	margin-left: 4px;
`;

export const Heading = styled.span`
	color: #e99c19;
	font-weight: 500;
	font-size: 14px;
	margin-left: 4px;
`;
