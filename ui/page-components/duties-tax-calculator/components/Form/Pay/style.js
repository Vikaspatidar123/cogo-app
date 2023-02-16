// import styled from '@cogoport/front/styled';

export const Container = styled.div``;

export const Head = styled.div`
	padding: 12px 0px 16px;
`;
export const Line = styled.div`
	border-top: 1px solid #e5e5e5;
	margin: 0 12px;
`;
export const Heading = styled.div`
	display: flex;
	align-items: center;
`;
export const Text = styled.div`
	font-weight: 500;
	font-size: 16px;
	color: #2c3e50;
	padding-left: 7px;
`;

export const TextHead = styled.div`
	font-size: 16px;
	color: #e84855;
`;

export const TextDiv = styled.div`
	padding: 6px 39px 0px 39px;
`;
export const Route = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

export const Txt = styled.p`
	margin: 0;
	font-weight: 400;
	font-size: 12px;
	color: #221f20;

	&.port {
		position: relative;
		width: 120px;
		text-align: center;
	}

	&.origin {
		right: 50px;
	}
	&.destination {
		left: 50px;
	}
	.incoterm {
		background: #ced1ed;
		border-radius: 4px;
		padding: 3px 6px;
		font-weight: 400;
		font-size: 10px;
	}
	.tooltipPort {
		cursor: pointer;
	}
`;

export const Icon = styled.div`
	&.left {
		margin: -4px -6px;
	}
`;
export const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	.dot {
		flex: 1;
		border-bottom: 2px solid #cfeaed;
	}
`;
export const Dot = styled.div`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #88cad1;
	bottom: 20.4px;
`;
export const PortText = styled.div`
	font-weight: 500;
	font-size: 14px;
	color: #2c3e50;
	t
`;
export const RouteText = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const ButtonCard = styled.div`
	width: 100%;
	height: 72px;
	display: flex;
	justify-content: end;
	background: #ffffff;
	box-shadow: 0px -2px 4px rgba(20, 20, 43, 0.12);
	border-radius: 0px 0px 10px 10px;
	align-items: center;
	.button {
		background: #db4634;
		border-radius: 4px;
		border-color: #db4634;
		margin-right: 33px;
		padding: 11px;
		font-weight: 500;
		font-size: 14px;
		text-transform: capitalize;
	}

	.loading {
		background: #e8afa8;
		border: none;
	}
`;

export const RouteDiv = styled.div`
	padding: 15px 16px 25px 16px;
`;

export const DotLeft = styled.div`
	background: #9d9fab;
	width: 6%;
	height: 36px;
	border-radius: 29px;
	position: absolute;
	bottom: 308px;
	margin-left: -23px;
`;

export const DotRight = styled.div`
	background: #9d9fab;
	width: 6%;
	height: 36px;
	border-radius: 29px;
	position: absolute;
	bottom: 308px;
	right: -22px;
`;
