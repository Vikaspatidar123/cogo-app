import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;

	padding: 36px 22px 22px 24px;
	background: #2c3e50;
	box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
	position: relative;
`;

export const IconContainer = styled.div`
	position: absolute;
	top: -12px;
	right: -13px;
`;

export const Header = styled.div`
	font-size: 24px;
	line-height: 30px;
	letter-spacing: 0.02em;
	color: #ffffff;

	& .blue {
		color: #b3d5fb;
		font-weight: bold;
	}
`;

export const InfoContainer = styled.div`
	background: #f1f3fe;
	border-radius: 10px;
	margin: 30px 0px;
	display: flex;
	align-items: center;
	padding: 17px 11px;
`;

export const SvgContainer = styled.div`
	background: #e0e4fd;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 9px 12px;
	margin-right: 12px;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	.core-ui-button-root {
		background: #ffffff !important;
		color: #333333 !important;
		font-weight: 600;
		padding: 8px 32px;
	}
`;
