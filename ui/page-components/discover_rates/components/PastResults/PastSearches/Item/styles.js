import styled from '@cogo/styled';

export const Container = styled.div`
	margin-top: 30px;
	padding: 20px;

	background: white;
	border-radius: 10px;

	&.disabled {
		background: #f9f9f9;
		border: 1px solid #bdbdbd;
	}

	&.enabled {
		background-color: white;

		&:hover {
			filter: drop-shadow(0px 4px 80px rgba(0, 0, 0, 0.15));
		}
	}
`;

export const Section = styled.div`
	display: flex;
	align-items: center;
	&.mobile {
		flex-direction: column;
		align-items: flex-start;
		width: 85%;
	}
`;

export const Main = styled.div`
	margin-left: 24px;
	flex-grow: 1;
	margin-right: 16px;

	&.mobile {
		margin-left: 12px;
		margin-right: 8px;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 85%;
	}
`;

export const IconSection = styled.div`
	&.mobile {
		width: 10%;
	}
`;
