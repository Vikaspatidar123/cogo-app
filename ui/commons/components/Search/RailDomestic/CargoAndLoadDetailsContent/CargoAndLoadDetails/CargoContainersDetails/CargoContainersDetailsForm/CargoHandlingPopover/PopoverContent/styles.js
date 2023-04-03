import styled from '@cogoport/front/styled';

export const Container = styled.section`
	display: flex;
	flex-direction: column;

	padding: 0 7px 11px 7px;

	width: 100%;
	max-height: 500px;
	overflow-y: auto;
	overflow-x: hidden;

	position: relative;

	@media (min-width: 768px) {
		width: 320px;
	}
`;

export const Header = styled.header`
	position: sticky;
	top: 0;

	margin-bottom: 8px;
	padding-bottom: 8px;

	background-color: #fff;
	border-bottom: 1px solid #e0e0e0;

	z-index: 1;
`;

export const ActionsButton = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;

export const Main = styled.main`
	margin-bottom: 8px;

	& .form-item-container {
		margin-bottom: 8px;
		height: 100%;
	}

	& .form-item-label {
		margin-top: 0;
		margin-bottom: 2px;

		color: #393f70;
		font-size: 12px;
		line-height: 16px;
		font-weight: 500;

		text-transform: capitalize;
	}

	& .err-msz {
		padding-left: 0;
	}

	& .form-fieldArray-container {
		padding: 0;
	}

	& .form-fieldArray-content {
		padding: 8px;
		border: 1px solid #e0e0e0;
		border-radius: 8px;

		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	& .form-fieldArray-button-container {
		margin-top: 16px;
	}
`;
