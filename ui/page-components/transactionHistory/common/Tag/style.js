import styled from '@cogoport/front/styled';

export const Container = styled.div`
	&.tag {
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		padding: 3px 5px;
		border-radius: 3px;
	}

	.point {
		border-radius: 50px;
		width: 7px;
		height: 7px;
		margin-right: 4px;
	}

	&.PAID {
		background: #cdf7d4;
	}

	.PAID {
		background: #67c676;
	}
`;
