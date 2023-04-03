import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	& .form-item-container {
		margin-bottom: 16px;
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

	& .core-ui-input-suffix.with-suffix {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	& .business-checkbox-group-container {
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	& .ui-core-checkbox-root.checked {
		border: 1px solid #393f70;
		background-color: #393f70;
	}

	& .business-checkbox-label {
		color: #393f70;
		font-size: 12px;
		line-height: 16px;
		font-weight: 500;
	}

	& .err-msz {
		padding-left: 0;
		text-transform: capitalize;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;
