import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useUpdateTicketActivity from '../../hooks/useUpdateTicketActivity';

import EmptyStateTicketStructure from './EmptyStateTicketStructure';
import styles from './styles.module.css';
import TicketStructureBody from './TicketStructureBody';
import TicketStructureLoader from './TicketStructureLoader';

function TicketStructure(props) {
	const {
		ticketData = {},
		refreshTickets = () => {},
		listLoading = false,
		handleScroll = () => {},
		setModalData = () => {},
		listType = '',
	} = props;

	const { updateTicketActivity = () => {} } = useUpdateTicketActivity({
		refreshTickets,
	});

	if (isEmpty(ticketData) && !listLoading) {
		return (
			<EmptyStateTicketStructure
				setModalData={setModalData}
				listType={listType}
			/>
		);
	}

	return (
		<div
			className={cl`${
				listType === 'create' ? styles.raised_box : styles.ticket_box
			}`}
			onScroll={(e) => handleScroll(
				e.target.clientHeight,
				e.target.scrollTop,
				e.target.scrollHeight,
			)}
		>
			{!(listType === 'create' && listLoading)
				&& (ticketData || []).map((item = {}) => (
					<TicketStructureBody
						key={item?.ID}
						item={item}
						updateTicketActivity={updateTicketActivity}
						setModalData={setModalData}
						listType={listType}
					/>
				))}
			{listLoading && <TicketStructureLoader listType={listType} />}
		</div>
	);
}

export default TicketStructure;
