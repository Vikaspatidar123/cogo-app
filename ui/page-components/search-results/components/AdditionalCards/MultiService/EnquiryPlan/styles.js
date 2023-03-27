import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: #F2F6FF;
	border: 1px solid #CDDBFF;
	box-sizing: border-box;
	border-radius: 10px;
	padding: 16px;
	margin-bottom: 24px;
	width: 84%;

	@media (max-width: 760px){
		width: 100%;
		margin-top: 18px;
	}
`;

export const SpaceBetween = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const SettingIcon = styled.div`
	background: #FFFFFF;
	border-radius: 10px;
	margin-right: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 7px;

	@media (max-width: 760px) {
		margin-left: -5px;
		height: 31px;
		margin-top: 2px;
		width: 32px;
	}
`;

export const Desktop = styled.div`
	@media (max-width: 760px) {
		display: none;
	}
`;

export const Mobile = styled.div`
	@media (min-width: 760px) {
		display: none;
	}
	
	@media (max-width: 760px) {
		font-size: 12px;
		margin-left: 34px;
		margin-top: 15px;
	}
	
	&.mobile {
		@media (max-width: 760px) {
			margin-top: 2px;
			margin-left: 4px;
		}
	}
`;

export const PlanType = styled.p`
	margin: 0;
	font-style: normal;
	font-weight: bold;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: 0.04em;
	color: #000000;

	&.subType {
		font-weight: normal;
		font-size: 10px;
		line-height: 12px;
	}
`;

export const Benefit = styled.p`
	margin: 0px;
	font-size: 10px;
	line-height: 12px;
	letter-spacing: 0.04em;	
	color: #828282;

	&.trialLeft {
		text-transform: uppercase;
		color: #67C676;
		margin-bottom: 4px;
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;

export const Main = styled.div`
	@media (max-width: 760px) {
		margin-top: 0px;
		margin-left: -15px;
	}
`;
