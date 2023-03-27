import styled from '@cogo/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 70%;
	&.otp {
		max-width: 100%;
	}
	@media (max-width: 768px) {
		max-width: 100%;
	}
`;

export const Heading = styled.p`
	font-weight: bold;
	font-size: 16px;
	line-height: 16px;
	color: #333333;
	font-style: normal;
	margin: 0;
`;

export const SubHeading = styled.p`
	line-height: 21px;
	font-weight: normal;
	font-size: 14px;
	color: #333333;
	margin: 0;
	margin-top: 16px;
	@media (max-width: _md) {
		word-wrap: break-word;
		margin-right: 8px;
	}
	&.otp {
		font-weight: bold;
		font-size: 16px;
		line-height: 24px;
		color: #333333;
	}
`;
