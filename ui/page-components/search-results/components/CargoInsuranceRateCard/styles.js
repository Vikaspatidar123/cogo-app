import styled from '@cogoport/front/styled';
import animated from '@cogo/deprecated_legacy/animated';

export const Container = styled.div`
	position: relative;
	margin-bottom: 16px;
	margin-top: 16px;
	background: #ffffff;
	border: 1px solid #e0e0e0;
	box-sizing: border-box;
	border-radius: 10px;

	@media (max-width: 760px) {
		border: 1px solid rgb(224, 224, 224);
	}
`;

export const Card = styled.div`
	display: flex;
	@media (max-width: 760px) {
		flex-direction: column;
	}
`;

export const AnimatedContainer = animated({
	enter: {
		translateY: [-10, 0],
		opacity: [0, 1],
		easing: 'easeInOutQuad',
		duration: 500,
	},
	exit: {
		translateY: [0, 10],
		opacity: [1, 0],
		duration: 300,
	},
});

export const LineVrt = styled.div`
	background-color: #e7e7e7;
	height: auto;
	width: 1px;
`;

export const RouteContainer = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	padding: 10px 24px 0px 24px;
	width: 100%;

	@media (max-width: 760px) {
		max-width: 380px;
		margin-top: 30px;
	}
`;

export const Circle = styled.div`
	width: 10px;
	height: 10px;
	background: #d9eafd;
	border: 1px solid #696969;
	border-radius: 100%;
	margin-top: 2px;

	&.main {
		width: 14px;
		height: 14px;
		margin-top: 0px;
	}

	&.inactive {
		border: 1px solid #e7e7e7;
		background: #ffffff;
	}
`;

export const Line = styled.div`
	width: 100%;
	height: 1px;
	background: #696969;
	margin-top: 6px;

	&.main {
		height: 3px;
		background: #929292;
		min-width: 100px;
		margin-top: 5px;

		@media (max-width: 1260px) {
			min-width: 60px;
		}
	}

	&.inactive {
		background: #dfdfdf;
	}
`;

export const Location = styled.div`
	font-size: 10px;
	font-weight: 400;
	margin-top: 8px;
	width: 100px;
	text-align: center;

	&.main {
		font-weight: 700;
	}
`;

export const CogoAssured = styled.div`
	position: absolute;
	background: #d9eafd;
	border-radius: 9px 0px 4px 0px;
	width: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4px 12px;
	&.cogo_assured_rate {
		height: 48px;
		border-radius: 9px 0px 8px 0px;
	}

	svg {
		font-size: 20px;
		margin-right: 8px;
	}
`;
