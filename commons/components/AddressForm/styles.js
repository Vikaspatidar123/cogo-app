import styled from '@cogoport/front/styled';

export const Container = styled.section`
	& .form-item-label {
		color: #2c3e50;
		font-size: 12px;
		font-weight: 400;

		margin-top: 16px;
		margin-bottom: 4px;
	}

	& .business-checkbox-group-container {
		margin-top: 16px;

		& .ui-core-checkbox-root {
			&.checked {
				border: 1px solid #356efd;
				background-color: #356efd;
			}
		}
	}

	& .business-checkbox-label {
		color: #2c3e50;
		font-size: 12px;
		font-weight: 400;
	}

	& .core-ui-input-control.uppercase {
		text-transform: uppercase;
	}

	& .ui-textarea {
		height: 54px;
	}
`;

export const BtnGrp = styled.div`
	display: flex;
	justify-content: flex-end;
	position: sticky;
	bottom: 0px;
	background: #ffffff;
	padding: 16px 0;
	border-top: 1px solid #cddbff;
`;
