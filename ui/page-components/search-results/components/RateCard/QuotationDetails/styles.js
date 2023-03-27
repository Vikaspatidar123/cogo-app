import styled from '@cogoport/front/styled';
import animated from '@cogo/deprecated_legacy/animated';

export const Container = styled.div`
	width: 100%;
	background: #ffffff;
	border-radius: 0px 0px 10px 10px;
`;

export const Service = styled.div`
	background: #f5fafe;
	margin-bottom: 2px;
	padding: 16px 30px;

	display: flex;
	justify-content: space-between;

	&:last-child {
		border-radius: 0px 0px 10px 10px;
		margin-bottom: 0px;
	}

	&.confirmed {
		background: #d9eafd;
	}

	@media (max-width: 400px) {
		flex-direction: column;
		padding: 16px 10px;
	}
`;

export const ServiceText = styled.p`
	margin: 0px;
	font-size: 14px;
	line-height: 12px;
	display: flex;
	align-items: center;
	letter-spacing: 0.02em;
	color: #333333;
`;

export const Price = styled.div`
	font-size: 14px;
	font-weight: 500;
	line-height: 12px;
	letter-spacing: 0.02em;
	margin: auto;
	margin-right: 20px;

	@media (max-width: 500px) {
		margin-right: 8px;
	}

	&.no-rate {
		display: flex;
		justify-content: flex-end;

		@media (max-width: 500px) {
			margin-right: 0px;
		}
	}
`;

export const LineItem = styled.div`
	padding: 12px 60px 12px 36px;
	font-size: 12px;
	font-weight: 400;
	line-height: 12px;
	letter-spacing: 0.02em;
	display: flex;

	@media (max-width: 760px) {
		padding: 12px;
		flex-direction: column;
	}
`;

export const Line = styled.div`
	border: 1px solid #efefef;
`;

export const Line2 = styled.div`
	border-top: 4px solid #ffffff;
	width: 100%;
`;

export const Pill = styled.div`
	border: 1px solid #66acf7;
	border-radius: 10px;
	color: #66acf7;
	text-transform: capitalize;
	padding: 2px 8px;
	margin-top: -2px;
	margin-left: 4px;
	font-size: 10px;
	height: fit-content;
	width: fit-content;

	&.main {
		background: #66acf7;
		color: #ffffff;
		padding: 2px 4px;
		margin-top: 0px;
	}

	&.no-margin {
		margin-left: 6px;
	}
`;

export const Space = styled.span`
	display: flex;
	margin-left: 4px;
	margin-top: 6px;

	&.top {
		margin-top: 0px;
	}
`;

export const FlexRow = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
`;

export const Text = styled.div`
	max-width: 250px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const MobileMargins = styled.div`
	display: flex;
	justify-content: flex-end;
	font-size: 10px;
	white-space: nowrap;
	margin-top: 8px;

	&.top {
		margin-top: 12px;
	}
`;

export const ServiceDetails = styled.div`
	background: #f1f1f1;
	color: #333333;
	font-size: 12px;
	font-weight: 500;
	text-transform: uppercase;
	padding: 6px 60px 4px 30px;
	margin-top: -2px;

	display: flex;
	justify-content: space-between;

	@media (max-width: 760px) {
		padding-left: 10px;
		padding-right: 10px;
	}
`;

export const ServiceInfo = styled.div`
	@media (max-width: 760px) {
		width: 150px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
		easing: 'easeInOutQuad',
		duration: 300,
	},
});

export const TotalPrice = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: auto;
	align-items: flex-end;
`;

export const BtnContainer = styled.div`
	display: flex;
	align-items: center;
`;
