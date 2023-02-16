// import styled from '@cogoport/front/styled';

export const Container = styled.div`
	width: 550px;
	position: absolute;
	z-index: 10000;
	background: #fff;
	top: -900px;
	left: 28%;
	box-shadow: 0px 12px 44px 0px #14142b57, 0px -2px 4px 0px #14142b1f,
		0px 3px 14px 0px #4a3aff08;

	animation: fromTop 1s linear 0.1s 1;
	animation-fill-mode: forwards;
	max-height: 100%;
	overflow: scroll;
	::-webkit-scrollbar {
		display: none;
	}
	@keyframes fromTop {
		0% {
			top: -900px;
		}

		100% {
			top: 0;
		}
	}

	@media screen and (max-width: 767px) {
		left: 5%;
		width: 91%;
	}
`;
export const IconContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px;
	margin-top: 25px;
`;
export const IconImage = styled.img`
	width: 130px;
`;

export const HeaderContainer = styled.div`
	text-align: center;
	padding: 20px;
	.title {
		font-size: 25px;
		font-weight: 500;
		margin-bottom: 12px;
	}

	.subTitle {
		font-weight: 300;
		margin: auto;
		margin-bottom: 12px;
	}
`;
export const Section = styled.div`
	.heading {
		margin-bottom: 15px;
	}
	.sectionHeading {
		padding: 12px 40px;
	}
	.charges {
		background: #f9f9f9;
		padding: 16px 40px;
		margin-bottom: 28px;
	}
`;

export const Title = styled.div`
	font-weight: 500;
	font-size: 15px;
`;

export const Line = styled.div`
	width: 15%;
	height: 2px;
	background: #fbd1a6;
	margin-top: 3px;
`;

export const DashedLine = styled.div`
	border-top: 2px dashed #a4a4a4;
	&.total {
		margin: 0 30px;
	}
`;

export const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 12px 0;
	.quantity {
		color: #7278ad;
		font-weight: 300;
	}

	&.total {
		font-weight: 500;
		font-size: 16px;
	}
	&.finalTotal {
		font-weight: 500;
		font-size: 20px;
		padding: 0px 40px;
	}
	&.dutiesTotal {
		font-size: 17px;
	}

	.flex {
		display: flex;
		gap: 5px;
		align-items: flex-end;
	}
	.iconContainer {
		margin-bottom: -2px;
	}

	@media screen and (max-width: 767px) {
		&.finalTotal {
			font-size: 19px;
		}
		&.dutiesTotal {
			font-size: 17px;
		}
	}
`;

export const Heading = styled.div`
	font-weight: 500;
	font-size: 16px;
`;

export const BtnContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 20px 33px 20px;
`;

export const TooltipContainer = styled.div`
	padding: 12px 8px;
	width: 250px;
	font-weight: 300;
	font-size: 12px;

	.heading {
		font-weight: 500;
		font-size: 14px;
		border-bottom: 0.5px dashed #333;
	}
`;
