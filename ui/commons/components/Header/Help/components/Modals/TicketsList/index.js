import { Modal, Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FilterType from '../../../common/FilterType';
import TicketStructure from '../../../common/TicketStructure';
import { tabsKeysMapping } from '../../../configurations/key-mapping';
import useListTickets from '../../../hooks/useListTickets';

import styles from './styles.module.css';

const translationKey = 'common:components_header_tickets_list';

function TicketsList({ setModalData = () => {} }) {
	const { t } = useTranslation(['common']);

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

	const tabsMapping = tabsKeysMapping({ t });

	return (
		<>
			<Modal.Header title={t(`${translationKey}_tickets`)} />
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
