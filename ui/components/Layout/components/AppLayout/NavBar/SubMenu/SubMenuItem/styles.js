import styled from '@cogoport/front/styled';
import { Link } from '@/temp/next';

export const Container = styled(Link)`
	text-decoration: none;

	width: calc(50% - 24px);
	padding: 18px 15px;
	border-radius: 4px;

	display: flex;
	align-items: flex-start;

	&.rate {
		align-items: center;
	}

	&:hover {
		background: #f2f6ff;
	}

	&.active {
		background: #f2f6ff;
		align-items: center;
	}
`;

export const Main = styled.div`
	margin-left: 16px;
`;

export const Title = styled.div`
	font-size: 18px;
	line-height: 20px;
	color: #333333;

	margin-top: 1px;
`;

export const Description = styled.div`
	margin-top: 2px;
	font-weight: 400;
	font-size: 12px;
	line-height: 12px;
	color: #ababab;
`;
