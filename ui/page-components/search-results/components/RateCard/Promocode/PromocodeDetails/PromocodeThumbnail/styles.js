import styled from '@cogoport/front/styled';

export const Container = styled.div`
	position: relative;
	margin: 10px;

	background: rgba(242, 246, 255, 0.5);
	border: 3px dashed rgba(154, 183, 254, 0.7);
	border-radius: 6px;
	cursor: pointer;

	width: 275px;
	height: 160px;
`;

export const BannerImage = styled.div`
	position: relative;
	background-image: url(${({ img }) => img});
	background-repeat: no-repeat;
	background-size: cover;
	height: 100px;
	width: 100%;
`;

export const CircleICon = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	position: absolute;
	top: 0;
	right: 0;
	background: rgba(154, 183, 254, 0.7);
	border-bottom-left-radius: 100%;

	height: 45px;
	width: 45px;
`;

export const Badge = styled.div`
	position: absolute;
	top: 0;
	right: 0;

	padding: 2px;
	width: fit-content;
	background: rgba(154, 183, 254, 0.7);
	border-radius: 3px;
`;

export const DiscountAmount = styled.div`
	font-weight: 500;
	font-size: 14px;

	text-align: right;
	letter-spacing: 0.02em;

	color: #356efd;
`;

export const Discount = styled.div`
	font-weight: 700;
	font-size: 14px;

	text-align: right;
	letter-spacing: 0.02em;

	color: #356efd;
`;

export const PromoCodeName = styled.div`
	background: #356efd;
	color: #ffffff;
	border-radius: 4px;

	font-weight: 600;
	font-size: 12px;
	letter-spacing: 0.02em;

	position: absolute;
	bottom: 0px;
	left: 0px;
	padding: 2px 10px;
`;

export const PromoCodeDescription = styled.div`
	padding: 5px;
	font-weight: 400;
	font-size: 10px;
	height: 50px;
	overflow: hidden;

	color: #333333;
`;
