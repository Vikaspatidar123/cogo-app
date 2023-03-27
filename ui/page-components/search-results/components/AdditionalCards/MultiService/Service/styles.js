import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: #ffffff;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	padding: 10px 16px;
	justify-content: space-between;
	cursor: pointer;
	margin: auto;
	margin-bottom: ${(p) => p.marginBottom}px;
	box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
	width: 96%;

	&:hover {
		box-shadow: 0px 2px 55px rgba(56, 59, 68, 0.1);
	}

	&.notAdded {
		width: 90%;
	}

	&.mainNotAdded {
		width: 90%;

		@media (max-width: 500px) {
			width: 100%;
			padding: 8px;
		}
	}
	.cargo-detail-box {
		background: #fcedbf;
	}
`;

export const IconContainer = styled.div`
	svg {
		* {
			fill: black;
		}
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;

export const Div = styled.div`
	&.hover {
		box-shadow: 11px 11px rgba(33, 33, 33, 33);
	}
`;

export const ServiceType = styled.div`
	font-weight: 700;
	font-size: 12px;
	line-height: 12px;
	letter-spacing: 0.04em;
	color: #333333;
	margin-bottom: 6px;

	@media (max-width: 760px) {
		margin-right: 8px;
	}
`;

export const Button = styled.button`
	border-radius: 50%;
	border: none;
	cursor: pointer;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 160%;
	margin-bottom: 0px;
	display: flex;
	align-items: center;
	justify-content: center;
	letter-spacing: 0.02em;
	height: 30px;
	width: 30px;
	outline: none;
	background: #356efd;
	color: #ffffff;
	box-shadow: 0px 2px 25px rgba(60, 67, 83, 0.1);

	&:focus-visible {
		outline: auto blue;
	}
`;

export const EnquiryStatus = styled.p`
	margin: 0px;
	background: #b4f3be;
	border: 1px solid #67c676;
	padding: 2px 6px;
	font-size: 8px;
	line-height: 12px;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: #000000;
	opacity: 0.9;
	border-radius: 4px;
`;

export const PortWrapper = styled.div`
	width: 40%;

	.business-port-pair-container {
		width: 100%;
	}

	@media (max-width: 768px) {
		width: 40%;
	}
`;
export const CheckBoxContainer = styled.div`
	display: flex;
	margin-left: 12px;
	margin-bottom: 10px;
	.ui-core-checkbox-root {
		border: 1px solid #333333;
	}
`;

export const PortPairs = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
	width: fit-content;
`;

export const Port = styled.div`
	white-space: nowrap;
	width: 150px;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 12px;
	font-weight: 500;
	color: #4f4f4f;
`;

export const ServiceDetails = styled.div`
	margin-top: 5px;
	margin-left: 58px;
	display: flex;
	flex-wrap: wrap;
`;

export const Value = styled.div`
	width: 47%;
	color: #333333;
	font-size: 10px;
	font-weight: 700;

	&.heading {
		color: #828282;
		font-weight: 400;
	}
`;

export const FlexRow = styled.div`
	display: flex;
	width: 48%;
	margin: 4px 0px;
`;
