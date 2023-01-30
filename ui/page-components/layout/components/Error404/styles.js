import styled from '@cogoport/front/styled';

export const Component = styled.div`
	width: 100%;
	margin: auto;
	position: relative;
	text-align: center;
`;

export const Container = styled.div`
	@media (min-width: 768px) {
		width: 100%;
		position: absolute;
		top: 200px;
		text-align: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.core-ui-button-root {
		background: #2c3e50;
	}
`;

export const Title = styled.h1`
	font-weight: 700;
	font-size: 160px;
	color: #336f89;
	margin: 24px 0 0;
`;

export const Description = styled.div`
	font-weight: 500;
	font-size: 24px;
	color: #033349;
	margin-bottom: 16px;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;
