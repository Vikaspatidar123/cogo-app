import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;

	.loading_banner {
		width: 300;
		height: auto;
	}

	.loading {
		width: 40px;
		height: auto;
		margin-bottom: 32px;
	}
`;

export const Title = styled.div`
	font-size: 22px;
	color: #170f49;
	font-weight: 500;
`;

export const Txt = styled.div`
	color: #535075;
	margin: 10px 0;

	&.error {
		font-size: 16px;
	}
`;
