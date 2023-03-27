import styled from '@cogoport/front/styled';

export const Container = styled.div`
	width: 100%;
	background : #F2F6FF;
	display:flex;
	padding: 20px;
	flex-direction: column;
	align-items: flex-start;
	margin: 30px 0px 20px -30px;
	border-radius: 0px 10px 10px 0px;

	@media (max-width: 760px) {
		margin-top: 20px;
	}

`;
export const MainContiner = styled.div``;

export const Refund = styled.p`
	margin: 0px;
	font-weight: bold;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: 0.04em;
	color: #828282;
	margin-top: 32px;

	&.normal {
		font-weight: normal;
		margin-top: 0px;
		margin-bottom: 8px;
	}
`;

export const InnerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
	align-items: center;
	padding-left: 15px;

	&.label{
		justify-content: flex-start;
	}
`;
export const TextLabel = styled.div`
	font-size: 10px;
	text-transform: uppercase;
	color: #67C676;
	letter-spacing: 0.04em;
`;
export const Text = styled.div`
	font-size: 14px;
	color: #000000;
	letter-spacing: 0.04em;
	text-transform: capitalize;

	&.rate {
	color: #828282;
	font-size: 12px;
	text-transform: lowercase;
}
	&.text {
		color: #828282;
		font-size: 12px;
		padding-left: 10px;
		text-transform: none;
	}
`;

export const Footer = styled.div`
	margin-top: 30px;
`;

export const Icon = styled.div`
`;

export const Tab = styled.div`
	font-size: 8px;
	width: 40px;
	max-height: 24px;
	background: #B4F3BE;
	border: 1px solid #67C676;
	border-radius: 4px;
	padding: 2px 8px;
	margin-left: 60px;

	@media (max-width: 760px) {
		margin-left: 20px;
	}
`;
