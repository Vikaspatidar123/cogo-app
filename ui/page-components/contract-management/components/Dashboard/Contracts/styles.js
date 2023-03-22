import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin-top: 26px;
`;

export const Header = styled.div`
	margin-block: 8px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Title = styled.div`
	font-weight: 500;
	font-size: 20px;
	color: #2c3e50;
`;

export const PaginationWrap = styled.div`
	display: flex;
	justify-content: flex-end;
`;

export const Tags = styled.div`
	display: flex;
`;

export const Tag = styled.div`
	border-radius: 4px;
	padding: 4px 8px;
	margin-right: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: 1px solid ${({ active }) => (active ? `#ACDADF` : `#bdbdbd `)};
	background: ${({ active }) => (active ? `#CFEAED` : `unset`)};

	svg {
		height: 18px;
		width: 18px;
		margin-right: 4px;
	}
`;
