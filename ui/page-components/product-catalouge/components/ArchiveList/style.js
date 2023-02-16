import styled from '@cogoport/front/styled';
import { IcMOverflowDot } from '@cogoport/icons-react';

export const Back = styled.div`
	margin-top: 10px;
	display: flex;
	cursor: pointer;
`;

export const Title = styled.div`
	margin-left: 10px;
	font-weight: 500;
	font-size: 22px;
	color: #000000;
`;

export const Info = styled.div`
	background: #fff;
	width: 90px;
	cursor: pointer;
	.text {
		margin: 0px;
		display: flex;
		align-items: center;
		padding: 7px 5px;
		text-align: left;
		font-size: 14px;
	}

	.text p {
		margin: 0;
		font-size: 10px;
		margin-left: 10px;
	}

	.info {
		display: flex;
	}
`;

export const Icon = styled(IcMOverflowDot)`
	cursor: pointer;
	transform: rotate(180deg);
`;

export const IconButton = styled.div`
	margin: 3px 4px 0px 14px;
`;
