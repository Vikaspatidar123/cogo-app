import styled from '@cogoport/front/styled';

import CloseIcon from './Close.svg';
import ShipIcon from './Ship.svg';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	right: 0;
	top: 0;
	width: 30%;
	min-width: 360px;
	height: 96vh;
	min-height: 100vh;
	overflow: auto;

	background: #fff;
	transform: ${({ show }) =>
		show === true ? 'translateX(0%)' : 'translateX(150%)'};
	z-index: 100000;
	box-shadow: -2px 2px 25px rgba(0, 0, 0, 0.15);

	.primary.sm {
		margin: 4px 0px 0px 48px;
	}

	@media (max-width: 768px) {
		width: 95%;
		min-width: 95%;
	}
`;

export const Close = styled(CloseIcon)`
	margin: 8px;
	top: 0;
	cursor: pointer;
`;

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 20px;
	align-items: center;
`;

export const Text = styled.div`
	font-size: 16px;
	line-height: 20px;
	color: #828282;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
	padding: 12px;
`;

export const Ship = styled(ShipIcon)``;

export const MainContainer = styled.div`
	padding: 12px;

	&:hover {
		background: #f9f9f9;
	}
`;

export const Line = styled.div`
	height: 1px;
	margin: 4px 20px;
	background-color: #e0e0e0;
`;
