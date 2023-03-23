import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin: 8px;

	.core-ui-button-root {
		margin: 8px;
	}
	.touchpoint_error {
		margin-left: 0px;
	}

	.ui-modal-dialog {
		width: 350px !important;
	}
`;

export const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
`;

export const Content = styled.div`
	padding: 0 24px 0 8px;
`;

export const Title = styled.div`
	font-weight: 500;
	margin-left: 16px;
	font-size: 18px;
	line-height: 30px;
	text-transform: uppercase;
	color: #393f70;
`;

export const BtnWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 36px;
`;

export const InputField = styled.div`
	width: 100%;
	margin: 24px 0;
`;

export const ErrorMessage = styled.div`
	display: flex;
	font-size: 12px;
	line-height: 14px;
	color: #cb6464;
	margin-left: 32px;
`;

export const InputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 95%;
	margin-left: 30px;

	.custom-select-input-container {
		.custom-select-input-subcontainer {
			border: 1px solid #cbcff5;
			.core-ui-input-root {
				border: unset !important;
			}
			:hover {
				border: 1px solid blue;
				box-shadow: none;
			}
		}
	}

	.custom-select-input-select-placeholder {
		color: #cbcff5;
	}

	& svg {
		width: 22px;
		height: 22px;
		margin: 0 8px 0 4px;
		cursor: pointer;
	}

	.core-ui-location-select {
		width: 100%;
	}
`;

export const AddIconContainer = styled.div`
	width: 10%;
`;
