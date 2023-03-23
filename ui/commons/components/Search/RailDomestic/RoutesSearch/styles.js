import styled from '@cogoport/front/styled';

export const Container = styled.div`
	& .form-item-label {
		margin-top: 0;
		margin-bottom: 8px;
		color: #828282;
		text-transform: uppercase;
		font-weight: 500;
		font-size: 12px;
		font-weight: 500;
	}

	& .form-layout-root-col {
		width: 100% !important;
		max-width: 100% !important;
		flex: 0 0 100% !important;
	}

	& .err-msz {
		padding-left: 0;
	}

	& .custom-select-input-select-placeholder {
		margin-bottom: 4px;
		font-size: 14px;
		color: #b7a8f8;
	}

	& .custom-select-input-subcontainer {
		border: 1px solid #ded7fc !important;
	}
`;

export const ArrowIconContainer = styled.div`
	margin-top: 14px;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;

	height: calc(100% - 12px);

	& svg {
		transform: rotate(90deg);
	}

	@media (min-width: 768px) {
		justify-content: center;

		& svg {
			transform: rotate(0deg);
		}
	}
`;
