import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: #f5fafe;
	border-radius: 4px;

	padding: 4px 8px;
	margin: 0 -8px;

	cursor: ${({ tnc_accepted }) => (tnc_accepted ? '' : 'not-allowed')};

	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const UserDetails = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

export const Name = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	color: #2d3d4f;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;

	margin-bottom: 4px;
`;

export const SwitchAccount = styled.div`
	font-weight: 300;
	font-size: 12px;
	text-decoration: underline;
	color: #034afd;
	cursor: pointer;
`;

export const Footer = styled.div`
	font-weight: 300;
	font-size: 10px;
	line-height: 12px;
	display: flex;
	align-items: center;
	color: #2d3d4f;
`;
export const BusinessName = styled.div`
	max-width: 70%;
`;
