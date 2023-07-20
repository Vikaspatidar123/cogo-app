import { useEffect, useState } from 'react';

import useCreateTicket from '../../../hooks/useCreateTicket';

import CreateTicket from './CreateTicket';
import RaisedTickets from './RaisedTickets';
import styles from './styles.module.css';
import SuccessModal from './SuccessModal';
import SuggestedFaq from './SuggestedFaq';

function RaiseTicket({ setModalData = () => {} }) {
	const [childModalData, setChildModalData] = useState(true);
	const [selectedQuery, setSelectedQuery] = useState('');

	const {
		createTicket = () => {},
		ticketId = '',
		loading = false,
		setTicketId = () => {},
	} = useCreateTicket();

	const showFaqs = !selectedQuery || selectedQuery === 'None of the above';

	useEffect(() => {
		setChildModalData(!ticketId);
	}, [ticketId]);

	return (
		<>
			{ticketId ? (
				<SuccessModal
					ticketId={ticketId}
					setTicketId={setTicketId}
					setModalData={setModalData}
				/>
			) : (
				<CreateTicket
					createTicket={createTicket}
					loading={loading}
					setSelectedQuery={setSelectedQuery}
				/>
			)}

			{childModalData && (
				<div className={styles.sub_modal_container}>
					{showFaqs ? (
						<RaisedTickets listType="create" />
					) : (
						<SuggestedFaq selectedQuery={selectedQuery} />
					)}
				</div>
			)}
		</>
	);
}

export default RaiseTicket;
