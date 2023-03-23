import { Grid } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';

const { Col } = Grid;

export const Section = styled(Col)``;

export const Container = styled.div`
	border-radius: 10px;
	padding: 8px 0px 8px 8px;
	width: 100%;
	display: flex;

	&.small {
		display: flex;
		width: 100%;
		background: #f9f9f9;
		padding: 0px;
		border-radius: 0px;
	}

	&.result {
		width: 95%;

		@media (max-width: 768px) {
			width: 85%;
		}
	}

	&.contract {
		background: #ffffff;
	}
	&.mobile {
		padding: 0px;
	}

	@media (max-width: 768px) {
		padding: 0px 8px 12px;
		background: #ffffff;
		flex-direction: column;
	}
`;

export const Main = styled.div`
	width: 55%;

	@media (max-width: 768px) {
		width: 100%;
	}

	&.rfq {
		max-width: 100%;
	}

	&.contract {
		max-width: 100%;
	}
`;

export const Options = styled.div`
	width: 45%;
	display: flex;
	align-items: flex-start;
	padding-left: 12px;

	@media (max-width: 768px) {
		width: 100%;
		flex-direction: column;
		padding-left: 0px;
	}
`;

export const Heading = styled.p`
	font-size: 20px;
	margin: 0 0 12px 8px;
	color: #393f70;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Icon = styled.div`
	font-weight: 500;
	font-size: 14px;
	color: #5936f0;
	text-decoration-line: underline;
	cursor: pointer;

	& svg {
		width: 10px;
		height: 10px;
		margin-right: 4px;
	}
`;
