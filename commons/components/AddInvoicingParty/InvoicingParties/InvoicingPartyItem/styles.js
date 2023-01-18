import styled from '@cogoport/front/styled';

export const Container = styled.div`
	.core-ui-radio-icon.primary {
		background-color: #034afd;
	}

	.core-ui-radio-radio-container.primary {
		border: 1px solid #034afd;
	}
`;

export const BusinessName = styled.p`
	font-size: 14px;
	line-height: 10px;
	margin: 0;
	color: #333333;
	margin: 16px 0px 4px;
	font-weight: 500;
`;

export const RadioWrapper = styled.div`
	.core-ui-radio-root {
		width: 100%;
		border-bottom: 1px solid #eceff8;
		padding: 12px 8px;

		&:hover {
			background: #e7efff;
			border-radius: 4px;
		}

		@media (max-width: 768px) {
			width: 100%;
		}
	}
	.core-ui-radiogroup-container {
		width: 100%;
		margin-bottom: 16px;
		justify-content: flex-start;
	}
	.core-ui-radio-label {
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: 0.04em;
		color: #393f70;
		opacity: 1;
		margin-left: 10px;
	}
`;

export const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 8px;
`;

export const AddressText = styled.p`
	font-weight: 400;
	font-size: 12px;
	line-height: 16px;
	color: #a8acce;
	margin: 0;
`;

export const GstNumber = styled.p`
	font-weight: 400;
	font-size: 10px;
	line-height: 16px;
	color: #2c3e50;
	margin: 0;
`;

export const LabelContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const AddressAlign = styled.div`
	display: flex;
	flex-direction: row;
`;

export const AddAddress = styled.div`
	color: #034afd;
	font-size: 12px;
	cursor: pointer;
	text-decoration: underline;
`;
