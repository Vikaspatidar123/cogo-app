import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: #f9f9f9;
	border-radius: 10px;
	padding: 12px 16px;
	margin-bottom: 20px;
	margin-top: 20px;
	position: relative;

	@media (max-width: 760px) {
		background: #ffffff;
		border: 1px solid #e2e2e2;
	}
`;

export const Main = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: space-between;
`;

export const Title = styled.h3`
	font-weight: bold;
	font-size: 22px;
	line-height: 26px;
	color: black;
	margin: 0 0 15px;
`;

export const Description = styled.div`
	font-size: 16px;
	line-height: 19px;
	color: black;
	max-width: 380px;

	&.bold {
		font-weight: bold;
		margin-bottom: 20px;
	}
`;

export const Label = styled.div`
	font-weight: 500;
	font-size: 10px;
	line-height: 12px;
	text-transform: uppercase;
	color: #4f4f4f;
	margin-bottom: 3px;
`;

export const Bg = styled.img`
	width: 250px;
	height: 172px;
	position: absolute;
	bottom: 22px;
	right: 15px;

	@media (max-width: 760px) {
		right: -20px;
	}

	@media (max-width: 480px) {
		position: relative;
		right: 0px;
		top: 0px;
	}
`;

export const MobileDiv = styled.div`
	@media (max-width: 480px) {
		margin-top: 180px;
	}
`;
