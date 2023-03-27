import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin-bottom: 10px;
`;

export const Card = styled.div`
	background: white;
	border: 1px solid #e0e0e0;
	border-radius: 10px;

	transition: 0.3s;

	&.active {
		background: #f2f2f2;
	}

	&.inactive {
		opacity: 0.5;
	}
`;
