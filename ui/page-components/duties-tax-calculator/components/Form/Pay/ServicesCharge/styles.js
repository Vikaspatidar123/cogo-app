// import styled from '@cogoport/front/styled';

export const Container = styled.div`
	padding: 0 22px;
	margin: 30px 0;
`;

export const Title = styled.div`
	color: #e84855;
	margin-bottom: 10px;
`;

export const Row = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: 500;
	.quantity {
		color: #7278ad;
		font-weight: 300;
	}

	.hscode {
		display: flex;
		align-items: center;
		gap: 5px;

		svg {
			vertical-align: middle;
			margin-bottom: 3px;
		}
	}
`;
