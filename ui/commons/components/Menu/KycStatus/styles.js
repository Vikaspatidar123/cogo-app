import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	align-items: center;
	margin-left: 4px;
`;

export const Label = styled.span`
	margin-right: 2px;

	font-weight: 400;
	font-size: 10px;
	color: #cb6464;

	&.kyc-verified {
		color: #67c676;
	}

	&.kyc-pending {
		color: #d99a3a;
	}
`;
