import { Tag } from '@cogoport/front/components/admin';
import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	background: #ffffff;
	margin: 56px 32px;
	padding: 24px 32px;
	box-shadow: 0px 1px 6px rgba(169, 188, 218, 0.65);
	border-radius: 4px;
`;

export const HeaderText = styled.div`
	font-weight: 500;
	font-size: 16px;
	color: #333333;
	margin-bottom: 16px;
`;

export const VerifiedTag = styled(Tag)`
	display: flex;
	background: #cdf7d4;
	font-size: 14px;
	align-items: center;
	color: #333333;
	margin-right: 21px;
	padding: 0 6px;
`;

export const RejectedTag = styled(Tag)`
	display: flex;
	background: #f7cdcd;
	font-size: 14px;
	align-items: center;
	color: #333333;
	margin-right: 21px;
	padding: 0 6px;
`;

export const PendingTag = styled(Tag)`
	display: flex;
	background: #fce4bf;
	font-size: 14px;
	align-items: center;
	color: #333333;
	margin-right: 21px;
	padding: 0 6px;
`;

export const IncompleteTag = styled(Tag)`
	display: flex;
	background: #f2f2f2;
	font-size: 14px;
	align-items: center;
	color: #333333;
	margin-right: 21px;
	padding: 0 6px;
`;
