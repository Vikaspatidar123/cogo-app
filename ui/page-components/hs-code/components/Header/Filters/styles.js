import styled from '@cogoport/front/styled';

export const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	@media screen and (max-width: 767px) {
		margin-top: 20px;
		width: 100%;
		flex-direction: column;
		justify-content: space-between;
	}
`;
export const FieldsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	gap: 12px;

	.core-ui-select-root {
		min-width: 180px;
		@media screen and (max-width: 1300px) {
			min-width: 120px !important;
		}
		@media screen and (max-width: 962px) {
			min-width: 100px !important;
		}
	}
	.core-ui-input-root {
		min-width: 180px;
		@media screen and (max-width: 1300px) {
			min-width: 120px !important;
		}
		@media screen and (max-width: 962px) {
			min-width: 100px !important;
		}
	}
	@media screen and (max-width: 767px) {
		margin-top: 20px;
		width: 100%;
		flex-direction: column;
		justify-content: space-between;
	}
`;

export const Container = styled.div`
	align-items: center;
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 22px;

	@media screen and (max-width: 1300px) {
		gap: 8px;
	}
	.core-ui-button-root {
		&.primary {
			background: #221f20 !important;
			border-radius: 6px;
		}
		&.secondary {
			color: #221f20;
			border-radius: 6px;
		}
	}
	@media screen and (max-width: 767px) {
		margin-top: 20px;
		justify-content: flex-end;
		width: 100%;
		margin-top: 30px;
	}
`;

export const StyledButton = styled.div``;

export const ErrorMessage = styled.div`
	margin: 0;
	color: #ff733b;
`;
