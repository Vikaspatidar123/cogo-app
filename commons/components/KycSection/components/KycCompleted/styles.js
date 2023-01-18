import styled from '@cogoport/front/styled';

export const BlogsContainer = styled.div`
	background: #f8f9fa;
	border: 1px solid #e7eced;
	border-radius: 4px;
	z-index: 10;
`;

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;

	.bg-kyc {
		clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
		height: 95vh;
		width: 100%;
		background-image: linear-gradient(
			to right bottom,
			rgba(238, 238, 238, 0.8),
			rgba(238, 238, 238, 0.8)
		);
	}
`;

export const BgImageContainer = styled.div`
	position: absolute;
	left: 0;
	right: 0;
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
