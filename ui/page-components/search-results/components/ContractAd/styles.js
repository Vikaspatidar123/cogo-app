import styled from '@cogoport/front/styled';
import Button from '@cogoport/front/components/admin/Button';
import Ad from '../Icons/lock-price-banner.svg';
import ContractTagSvg from '../Icons/contract-tag.svg';

export const Advertise = styled(Ad)`
	width: 100%;
	height: 120px;
`;

export const Container = styled.div`
	width: 100%;
	max-height: 125px;
	margin-top: 10px;
	margin-bottom: -10px;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	background: #f1f8ff;

	&.advertise {
		background: #fff;
	}
`;

export const ContractTag = styled(ContractTagSvg)`
	height: 100px;
	width: 200px;
	position: relative;
	top: -10px;
	left: -5px;
`;

export const Label = styled.div`
	color: #4f4f4f;
	font-size: 21px;
	font-weight: 600;
`;

export const ContractBtn = styled(Button)`
	background: #221f20;
	width: 123px;
	height: 30px;
	text-transform: capitalize !important;
	color: #ffffff;
	font-weight: 500;
	font-weight: 12px;
`;

export const Content = styled.div`
	display: flex;
	justify-content: space-between;
	margin: -30px 20px 20px 20px;
`;
