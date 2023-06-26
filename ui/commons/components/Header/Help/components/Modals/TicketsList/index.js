import { Modal, Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import FilterType from '../../../common/FilterType';
import TicketStructure from '../../../common/TicketStructure';
import { tabsKeysMapping } from '../../../configurations/key-mapping';
import useListTickets from '../../../hooks/useListTickets';

import styles from './styles.module.css';

function TicketsList({ setModalData = () => {} }) {
	const [activeTab, setActiveTab] = useState('all');
	const [searchValue, setSearchValue] = useState('');

	const {
		handleScroll = () => {},
		refreshTickets = () => {},
		listLoading = false,
		ticketData = {},
	} = useListTickets({
		searchValue,
		activeTab,
	});

	const tabsMapping = tabsKeysMapping();

	return (
		<>
			<Modal.Header title="All Tickets" />
			<Modal.Body className={styles.modal_body}>
				<Tabs activeTab={activeTab} onChange={setActiveTab}>
					{tabsMapping.map(({ name, title }) => (
						<TabPanel key={name} name={name} title={title}>
							<FilterType
								searchValue={searchValue}
								setSearchValue={setSearchValue}
							/>
							<TicketStructure
								setModalData={setModalData}
								handleScroll={handleScroll}
								refreshTickets={refreshTickets}
								listLoading={listLoading}
								ticketData={ticketData}
							/>
						</TabPanel>
					))}
				</Tabs>
			</Modal.Body>
		</>
	);
}

export default TicketsList;
