import styled from '@cogoport/front/styled';

export const Container = styled.div`
	width: 100%;
	border-radius: 10px;
	display: flex;
	background: #f9f9f9;

	&.app {
		border: 1px solid #e0e0e0;
	}

	@media (max-width: 760px) {
		border: 1px solid #bdbdbd;
		flex-direction: column;
	}

	@media (max-width: 1164px) {
		background: #ffffff;
	}
`;

export const ServiceWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 16px;
	justify-content: center;
	align-items: center;

	@media (max-width: 760px) {
		justify-content: flex-start;
		flex-direction: row;
	}
`;

export const ServiceTypeText = styled.div`
	font-size: 10px;
	color: #8fbdb1;
	margin-top: 2px;
`;

export const Line = styled.div`
	border: 1px solid #e0e0e0;

	@media (max-width: 760px) {
		border: none;
		border-top: 1px solid #d6d6d6;
		width: 100%;
	}

	&.mobile {
		border: 1px solid #e0e0e0;
		height: 100%;
		width: 1px;
	}
`;

export const CommodityDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	padding: 16px;
`;

export const StyledText = styled.div`
	text-transform: uppercase;
	color: #828282;
	margin-right: 16px;
	font-size: 12px;
`;

export const DescriptionContainer = styled.div`
	display: flex;

	align-items: center;
`;

export const Commodity = styled.div`
	font-size: 12px;
	background: #dfe1ef;
	padding: 2px 4px;
	border-radius: 6px;
	max-width: 180px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const CommodityDescription = styled.div`
	font-size: 12px;
	margin-top: 4px;
	background: #dfe1ef;
	padding: 2px 4px;
	border-radius: 6px;
	max-width: 180px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const TradeTypeContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const TradeTypeFlexContainer = styled.div`
	display: flex;
	align-items: center;
	margin-left: 16px;
`;
