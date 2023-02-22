import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;
	padding: 10px;
`;

export const Title = styled.div`
	font-size: 22px;
	color: #170f49;
	font-weight: 500;
	&.noresult {
		font-weight: 400;
		font-size: 19px;
	}
`;

export const Txt = styled.div`
	color: #535075;
	margin: 10px 0;

	&.error {
		font-size: 16px;
	}
`;

export const Image = styled.img`
	width: 100px;
	height: 100px;
`;
