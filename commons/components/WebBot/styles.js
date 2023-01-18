import styled from '@cogoport/front/styled';

export const BotIcon = styled.div`
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: 50px;
	height: 50px;
	z-index: 1000;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #ffde01;
	box-shadow: 1px 2px 13px 4px rgba(0, 0, 0, 0.2);
	border-radius: 50%;
	@media (max-width: 768px) {
		bottom: 60px;
		right: 20px;
	}
	svg {
		height: 35px;
		width: 35px;
		cursor: pointer;
		align-items: center;
	}
`;
export const BotCard = styled.div`
	position: fixed;
	bottom: 20px;
	right: 20px;
	background-color: white;
	z-index: 1000;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
	transition: 150ms ease-in-out;
	&.active_all {
		width: 360px;
		height: 500px;
	}
	@media (max-width: 768px) {
		top: 0% !important;
		left: 0% !important;
		border-radius: 3px !important;
		&.active_all {
			width: 100% !important;
			height: 100vh;
		}
	}
	@media (max-height: 568px) {
		&.active_all {
			bottom: 0% !important;
		}
	}
`;
export const BotHead = styled.div`
	background: #ffde01;
	font-size: 21px;
	font-weight: bold;
	padding: 10px 15px;
	height: 12%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
`;

export const BotHeadImg = styled.div`
	display: flex;
	align-items: center;
	svg {
		width: 30px;
		height: 30px;
		object-fit: cover;
		border-radius: 36%;
		margin-right: 9px;
	}
`;

export const BotName = styled.div`
	display: flex;
	align-items: center;
	font-weight: 500;
	font-size: 18px;
	line-height: 17px;
	letter-spacing: 0.02em;
	color: #ed3726;
`;

export const HeaderIcons = styled.div`
	display: flex;
	align-items: end;
	width: 7%;
	justify-content: space-around;
	svg {
		height: 20px;
		width: 20px;
		cursor: pointer;
	}
`;

export const NoOfMessages = styled.div`
	background-color: rgba(255, 109, 157, 1);
	color: white;
	position: absolute;
	width: 18px;
	height: 18px;
	top: -5px;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50px;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;
