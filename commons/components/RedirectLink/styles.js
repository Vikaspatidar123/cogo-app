import styled from '@cogoport/front/styled';
import { Link } from '@/temp/next';

export const Container = styled.div`
	display: flex;
	align-items: center;

	color: #333;
	font-size: 14px;
	padding: 0 8px;
`;

export const Label = styled.span`
	margin-right: 8px;
`;

export const AnchorLink = styled(Link)`
	cursor: pointer;

	color: #356efd;
	font-size: 14px;
	font-weight: 500;

	&:hover {
		text-decoration: underline;
	}
`;
