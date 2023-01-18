import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: linear-gradient(90.08deg, #012f45 -5.25%, #093f56 44.6%);
	border-radius: 20px;
	display: flex;
	overflow: hidden;
	margin: 36px 0;
`;

export const BackgroundImage = styled.div`
	${(props) => {
		const { backgroundImageUrl = '' } = props;

		if (!backgroundImageUrl) {
			return '';
		}

		return `
			height: auto;
			width: 100%;
			background-image: url('${backgroundImageUrl}');
			background-position: top center;
			background-repeat: no-repeat;
			background-size: cover;
		`;
	}}
`;

export const HeaderText = styled.p`
	font-size: 18px;
	line-height: 24px;
	margin: 0;
	color: #b3d5fb;
	margin-bottom: 42px;

	@media (max-width: 768px) {
		font-size: 8px;
		line-height: 12px;
		margin-bottom: 16px;
	}
`;

export const Content = styled.div`
	padding: 64px 0 64px 64px;
	display: flex;
	flex-direction: column;
	flex: 1;

	@media (max-width: 768px) {
		padding: 16px 20px;
	}
`;

export const BackgroundImageContainer = styled.div`
	display: flex;
	transform: scaleX(-1);
	flex: 1;
`;

export const KycText = styled.div`
	font-weight: 500;
	font-size: 40px;
	color: #ffffff;
	margin-bottom: 8px;

	& .kyc {
		color: #67c676;
	}

	@media (max-width: 768px) {
		font-size: 16px;
	}
`;

export const KycSubText = styled.div`
	font-size: 22px;
	color: #ffffff;

	& .bold {
		font-weight: 500;
	}

	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

export const ButtonContainer = styled.div`
	margin-top: 24px;

	@media (max-width: 768px) {
		.core-ui-button-root {
			font-size: 12px !important;
			font-weight: 500 !important;
		}
	}
`;
