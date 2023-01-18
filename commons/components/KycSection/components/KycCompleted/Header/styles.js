import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	z-index: 10;
	padding: 48px 186px;
	margin-bottom: -64px;

	@media (max-width: 768px) {
		padding: 24px;
		flex-direction: column-reverse;
	}
`;

export const Content = styled.div`
	font-size: 24px;
	margin-right: 78px;
	color: #333333;

	.bold {
		font-weight: 500;
	}

	@media (max-width: 768px) {
		font-size: 12px;
		margin-right: unset;
	}
`;

export const ImageContainer = styled.div``;

export const LeftLinesContainer = styled.div`
	position: absolute;
	left: 0px;
	top: 360px;

	@media (max-width: 768px) {
		top: 100px;
		left: -8px;
	}
`;

export const RightLinesContainer = styled.div`
	position: absolute;
	right: -36px;
	top: 36px;

	@media (max-width: 768px) {
		right: -12px;
		top: 0;
	}
`;

export const BottomCirclesContainer = styled.div`
	position: absolute;
	right: 70px;
	top: 420px;
`;

export const HeaderText = styled.div`
	font-weight: 600;
	font-size: 40px;
	color: #263238;
	margin-bottom: 24px;

	@media (max-width: 768px) {
		font-size: 22px;
		margin: 10px 0;
		text-align: center;
	}
`;

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
