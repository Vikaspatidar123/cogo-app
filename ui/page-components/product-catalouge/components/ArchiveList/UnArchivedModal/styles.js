import styled from '@cogoport/front/styled';
import Button from '@cogoport/front/components/Button';
import Modal from '@cogoport/front/components/admin/Modal';

export const Container = styled(Modal)`
	@media (max-width: 760px) {
		.ui-modal-dialog.sm {
			width: 0px;
		}
	}
`;

export const IconDiv = styled.div`
	display: flex;
	justify-content: center;
`;

export const Heading = styled.div`
	font-weight: 700;
	font-size: 18px;
	color: #221f20;
	margin-bottom: 8px;
	display: flex;
	justify-content: center;
`;

export const Text = styled.div`
	font-size: 13px;
	color: #828282;
	display: flex;
	justify-content: center;
	margin-bottom: 33px;
`;

export const ButtonDiv = styled.div`
	display: flex;
	border-radius: 8px 8px 0px 0px;
	margin: 0px 10px 10px;
	justify-content: center;
`;

export const SecondaryButton = styled(Button)`
	background: #ffffff;
	border: 1px solid #e0e6e9;
	color: #221f20;
	height: 30px;
	width: 120px;
	margin-right: 20px;
`;

export const PrimaryButton = styled(Button)`
	height: 30px;
	width: 120px;
`;
