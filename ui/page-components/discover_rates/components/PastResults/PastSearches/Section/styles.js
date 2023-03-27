import styled from '@cogo/styled';

export const Container = styled.div`
	border: 1px solid #e0e0e0;
	box-sizing: border-box;
	border-radius: 5px;
	margin-bottom: 24px;
	display: flex;
	padding: 10px;
	background: white;
	&:hover {
		box-shadow: rgba(0, 0, 0, 0.14) 0px 0px 12px 0px;
	}
`;

export const IconSection = styled.div`
	margin-right: 36px;
	&.mobile {
		margin-right: 16px;
	}
`;

export const Content = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
	align-items: center;
	&.mobile {
		width: 80%;
	}
`;

export const Box = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	&.column {
		flex-direction: column;
		align-items: flex-end;
		margin-top: 6px;
	}

	&.mobile {
		flex-direction: column;
		align-items: flex-start;
		width: 80%;
	}
`;

export const Rates = styled.button`
	padding: 9px 12px;
	margin: 0;
	border: none;
	cursor: pointer;

	background: #034afd;
	border-radius: 4px;

	font-weight: 500;
	font-size: 12px;
	line-height: 14px;

	text-transform: uppercase;

	color: white;

	&.mobile {
		padding: 4px 6px;
		margin: 0;

		box-sizing: border-box;
		border-radius: 6px;
		cursor: pointer;
		margin-bottom: 4px;

		background: #475876;

		text-transform: none;
		font-style: normal;
		font-weight: normal;
		font-size: 10px;
		line-height: 140%;

		text-align: center;
		letter-spacing: 0.02em;

		color: #000000;
	}

	&.negotiation {
		padding: 0 12px;
		margin: 12px 0 0;
		border: none;
		cursor: pointer;
		text-decoration: none;

		background: black;
		border-radius: 4px;

		font-weight: 500;
		font-size: 12px;
		line-height: 14px;

		display: flex;
		align-items: center;

		text-transform: uppercase;

		color: white;

		&:hover {
			opacity: 0.7;
		}
	}

	&:hover {
		opacity: 0.7;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	}
`;

export const EditOptions = styled.button`
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 14px;
	border: none;
	background: transparent;
	cursor: pointer;
	outline: none;

	letter-spacing: 0.02em;
	&:hover {
		text-decoration-line: underline;
	}
`;
