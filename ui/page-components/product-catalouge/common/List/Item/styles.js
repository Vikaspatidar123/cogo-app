import styled from '@cogoport/front/styled';
import Grid from '@cogoport/front/components/Grid';

const { Row: GridRow } = Grid;

export const TitleBlack = styled.div`
	font-size: 12px;
	line-height: 20px;
	text-align: center;
	display: inline-block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	max-width: 100%;
	color: #000000;
`;

export const Row = styled(GridRow)`
	position: relative;
	width: 100%;
	height: 78px;
	background: #ffffff;
	box-shadow: 0px 17.8px 60px rgba(71, 111, 211, 0.11),
		0px 2.23306px 18.612px rgba(71, 111, 211, 0.055);
	border-radius: 9px;
	align-items: center !important;
	padding-left: 11px;
	margin-left: 0px !important;
`;

export const Label = styled.caption`
	font-size: 8px;
	line-height: 12px;
	letter-spacing: 0.02em;
	text-transform: capitalize;
	color: #4f4f4f;
	width: max-content;
	@media (min-width: 768px) {
		display: none;
	}
`;

export const Info = styled.div`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	max-width: 164px;
	display: inline-block;
	font-weight: 500;
	font-size: 14px;
	color: #828282;
	line-height: 16px;
	color: #2c3e50;
`;

export const Container = styled.div`
	border-radius: 9px;
	border: 1px solid #cddbff;
	margin-bottom: 25px;
	display: flex;
	flex-direction: column;
	width: 100%;
	&.displayDrill {
		border: 1px solid #a4b6e5;
	}
	&.mobile {
		max-width: 100vw;
		padding-bottom: 5px;
	}
`;
