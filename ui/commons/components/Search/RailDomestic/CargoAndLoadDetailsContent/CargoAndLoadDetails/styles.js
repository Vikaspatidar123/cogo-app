import styled from '@cogoport/front/styled';

export const Container = styled.div`
	height: 100%;
	position: relative;
`;

export const HeaderContainer = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	position: sticky;
	top: 0;
	left: 0;
	right: 0;

	background-color: #ffffff;
	padding: 8px 16px;
	z-index: 1;
	box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.div`
	color: #393f70;
	font-size: 18px;
	font-weight: 500;
`;

export const ActionButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;

export const MainContainer = styled.main`
	padding: 16px 32px;
`;

export const CargoDetailsContainer = styled.div`
	margin-bottom: 16px;
	border-bottom: 1px solid #e0e0e0;
`;

export const CargoContainersDetailsContainer = styled.div``;
