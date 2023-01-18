import styled from '@cogoport/front/styled';

import Avatar from './icons/avatar.svg';

export const Container = styled.div`
	width: 300px;

	a {
		&:hover {
			opacity: 0.8;
		}
	}
`;

export const A = styled.a`
	text-decoration: none;
	outline: none;
	background: transparent;
	padding: 0;
	border: none;
	box-shadow: none;
	margin: 16px 0;

	font-size: 14px;
	line-height: 16px;

	color: black;

	display: block;

	width: 100%;
	text-align: left;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
	&.sub-navlink {
		margin: 0.5rem 0;
	}
`;

export const ProfileHeader = styled.div`
	background: #f5fafe;
	padding: 6px 8px;
	border-radius: 4px;
	margin: 0 -9px;

	cursor: ${(props) =>
		props.isTermsAndConditionAccepted ? '' : 'not-allowed'};

	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const StyledAvatar = styled(Avatar)`
	height: 42px;
	width: 42px;

	margin-right: 6px;
	cursor: pointer;
`;

export const UserDetails = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	.business_name_container {
		font-weight: 300;
		font-size: 11px;
		line-height: 12px;
		display: flex;
		align-items: center;
		letter-spacing: 0.02em;
		color: #000000;
	}

	.business_name {
		max-width: 72%;
	}

	.kycSubmited {
		margin: 0 0 0 8px;

		font-weight: 400;
		font-size: 10px;
		display: flex;
		align-items: center;
		color: #67c676;
	}

	.kycRejected {
		margin: 0 0 0 8px;

		font-weight: 400;
		font-size: 10px;
		display: flex;
		align-items: center;
		color: #cb6464;
	}
`;

export const Name = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	display: flex;
	align-items: center;
	letter-spacing: 0.02em;
	color: #333333;

	cursor: pointer;
`;

export const Separator = styled.div`
	width: 100%;
	border: 0.5px solid #bdbdbd;

	margin: 8px 0;
`;

export const LogoutContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const AccountSettings = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const NameAndSwitchAccountText = styled.div`
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	margin-bottom: 6px;
`;

export const SwitchAccountText = styled.div`
	font-weight: 300;
	font-size: 12px;
	display: flex;
	align-items: center;
	text-decoration-line: underline;
	color: #034afd;

	cursor: pointer;
`;

export const SubscriptionContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid #e0e0e0;
`;

export const Flex = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-left: 0.5rem;
`;
