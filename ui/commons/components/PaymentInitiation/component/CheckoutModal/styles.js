import styled from '@cogoport/front/styled';
import Modal from '@cogoport/front/components/admin/Modal';

export const CheckBoxWrapper = styled.div`
	display: flex;
	gap: 5px;
	align-items: center;
	justify-content: space-between;
	.checkbox {
		display: flex;
		align-items: center;
	}
	.checkboxText {
		margin-left: 3px;
	}
	.button {
		background: #db4634 !important;
		border-radius: 4px !important;
		padding: 6px !important;
		border: none !important;
		color: #ffffff !important;
		text-transform: none !important;
		font-size: 15px !important;
		font-weight: 400 !important;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	height: 100px;
	margin: 5px;
	&.expiry {
		flex-direction: row;
	}
	.flex {
		display: flex;
	}
	.flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.flex-fill {
		display: flex;
		flex: 1 1;
	}
	.flex-vertical {
		display: flex;
		flex-direction: column;
	}
	.flex-vertical-center {
		display: flex;
		align-items: center;
	}
	.flex-between {
		display: flex;
		justify-content: space-between;
	}
	.card-property-title {
		display: flex;
		flex-direction: column;
	}
`;

export const LogoContainer = styled.div`
	display: flex;
	.companylogo {
		margin-right: 5px;
	}
`;

export const StyledModal = styled(Modal)`
	.ui-modal-dialog {
		width: 200px !important;
	}
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	font-size: 16px;
	font-weight: 500;
	color: #f68b21;
	align-items: center;
	align-content: center;
	svg {
		width: 15px;
		height: 15px;
		animation: rotate 1.2s infinite;
		margin-right: 5px;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(180deg);
		}
	}
`;
