import styled from '@cogoport/front/styled';

export const Container = styled.div``;

export const PaginationWrapper = styled.div`
	padding-block: 6px;
	nav .md {
		justify-content: flex-end;
		padding-right: 0;
	}
	@media screen and (max-width: 767px) {
		nav .md div {
			font-size: 10px;
		}
	}
`;

export const Empty = styled.p`
	text-align: center;
`;
