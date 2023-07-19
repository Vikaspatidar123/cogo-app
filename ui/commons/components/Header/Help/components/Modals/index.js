import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import RaiseTicket from './RaiseTicket';
import styles from './styles.module.css';
import TicketChat from './TicketChat';
import TicketsList from './TicketsList';

const renderModalComponent = {
	tickets_list   : TicketsList,
	raise_a_ticket : RaiseTicket,
	ticket_details : TicketChat,
};

function Modals(props) {
	const { modalData, setModalData } = props;

	const { type = '' } = modalData || {};

	const ModalComponent = renderModalComponent?.[type] || null;

	if (!ModalComponent) {
		return null;
	}

	return (
		<Modal
			size="sm"
			show={!isEmpty(modalData)}
			placement="right"
			scroll={false}
			showCloseIcon={type !== 'ticket_details'}
			onClose={() => setModalData(null)}
			className={styles.modal_container}
		>
			<ModalComponent {...props} />
		</Modal>
	);
}

export default Modals;
