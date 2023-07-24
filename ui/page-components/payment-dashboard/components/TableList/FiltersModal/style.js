import styled from '@cogoport/front/styled';
import { Modal, Select } from '@cogoport/front/components';

export const ModalWrapper = styled(Modal)`
	.ui-modal-close-btn {
		background: aliceblue;
	}
`;

export const SearchContainer = styled.div`
	display: flex;
	flex-direction: row-reverse;
	.input-icons {
		position: absolute;
		margin-bottom: 12px;
		padding: 10px;
		padding: 2px 10px 10px 10px;
		min-width: 50px;
		height: 50px;
		width: 50px;
		text-align: center;
		filter: opacity(0.5);
	}

	.input-field {
		width: 100%;
		padding: 10px;
		border: none;
		border-radius: '2px';
		box-sizing: border-box;
		font-size: '14px';
		color: '#828282';
	}
`;

export const SelectWrapper = styled(Select)`
	.core-ui-select__control {
		height: 24px;
	}
`;
