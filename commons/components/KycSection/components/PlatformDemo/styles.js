import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: linear-gradient(90.08deg, #012f45 -5.25%, #093f56 44.6%);
	border-radius: 20px;
	padding: 42px 86px;
	margin: 54px 0;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	z-index: 10;

	@media (max-width: 768px) {
		padding: 16px 8px;
		margin: 64px 0 16px 0;
	}
`;

export const Heading = styled.div`
	font-weight: 500;
	font-size: 35px;
	color: #ffffff;
	margin-bottom: 32px;

	@media (max-width: 768px) {
		font-size: 14px;
		margin-bottom: 12px;
	}
`;

export const ContentContainer = styled.div`
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const VideoContainer = styled.div`
	display: flex;
	flex: 1;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding-left: 24px;
`;

export const Text = styled.div`
	font-size: 16px;
	line-height: 24px;
	color: #ffffff;

	@media (max-width: 768px) {
		font-size: 10px;
	}
`;

export const VideoResponsive = styled.div`
	display: flex;
	flex: 1;
	padding-right: 24px;
	justify-content: center;
	margin: 12px 16px;
	overflow: hidden;
	width: 400px;
	height: 280px;

	iframe {
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
	}

	@media (max-width: 768px) {
		padding-right: 0;
		width: 300px;
		height: 250px;
	}
`;
