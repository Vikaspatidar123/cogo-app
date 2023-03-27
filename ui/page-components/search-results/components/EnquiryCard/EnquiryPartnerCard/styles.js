import styled from '@cogoport/front/styled';

export const Header = styled.div`
	font-size: 16px;
	font-weight: 700;
	line-height: 36px;
	padding-top: 14px;
`;

export const Text = styled.div`
	font-size: 14px;
	font-weight: 400;
	line-height: 14px;
	margin-top: 4px;
	width: 427px;

	@media (max-width: 760px) {
		width: auto;
		padding-right: 24px;
	}
`;
