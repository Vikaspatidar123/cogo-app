import styled from '@cogoport/front/styled';

export const Container = styled.div`
	border: 1px solid #e6e6e6;
	margin-bottom: 8px;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	transition: 0.2s;

	:hover {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
		transition: 0.2s;
	}
`;

export const Heading = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px 12px;
	margin: 4px;
	transition: 0.6s ease-in-out;
	cursor: pointer;
	font-weight: 500;

	&.active {
		box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 0 0 4px 4px;
		margin: 4px;
		transition: 0.3s ease-in-out;
	}

	.caret {
		margin-bottom: -9px;
		transition: 0.4s;

		&.active {
			transform: rotate(180deg);
			transition: 0.3s;
		}
	}
`;

export const Content = styled.div`
	overflow: hidden;
	transition: max-height 0.4s;
	max-height: 0;
	font-size: 14px;
	color: #8c8c8c;

	&.open {
		transition: max-height 2s;
		max-height: 800px;
	}

	div {
		padding: 20px 12px;
	}
`;
