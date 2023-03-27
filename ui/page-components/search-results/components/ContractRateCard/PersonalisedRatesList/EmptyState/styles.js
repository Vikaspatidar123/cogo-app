import styled from '@cogoport/front/styled';
import { IcMArrowBack } from '@cogoport/icons-react';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	height: 80vh;
	margin: auto;
`;

export const Content = styled.p`
	font-weight: 500;
	font-size: 16px;
	color: #393f70;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #ffffff;
	padding: 60px 30px 36px 30px;
	height: 360px;
	width: 80%;
`;

export const Div = styled.div`
	padding: 20px 8px;
`;
export const BackIcon = styled(IcMArrowBack)`
	cursor: pointer;
`;
