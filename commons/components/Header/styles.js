import styled from '@cogoport/front/styled';

export const Container = styled.nav`
	min-height: 56px;
	width: 100%;
	padding: 0 40px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	transition: top 0.3s;

	box-shadow: 0px 1px 6px rgba(169, 188, 218, 0.65);
	z-index: 999;

	@media (max-width: 1164px) {
		padding: 8px 20px;
	}
`;

export const Right = styled.div`
	display: flex;
	align-items: center;
`;
