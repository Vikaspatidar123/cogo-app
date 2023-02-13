import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 60px 30px 36px 30px;
`;

export const Heading = styled.div`
	font-weight: bold;
	font-size: 22px;
`;

export const Content = styled.p`
	font-size: 16px;
`;

export const IcContainer = styled.div`
	max-width: 17%;
	min-width: 10%;
	@media (max-width: 767px) {
		display: none;
	}
`;

export const Wrapper = styled.div`
	max-width: 45%;
	&.side {
		max-width: 100%;
	}
	@media (max-width: 767px) {
		max-width: 100%;
	}
`;
