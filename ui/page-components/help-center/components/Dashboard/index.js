import { useState } from 'react';

import RaiseTicket from '../../common/RaiseTicket';
import SearchFaq from '../../common/SearchFaq';

import FaqTopics from './FaqTopics';
import RecentQueries from './RecentQueries';
import styles from './styles.module.css';

import Modals from '@/ui/commons/components/Header/Help/components/Modals';

function Dashboard() {
	const [modalData, setModalData] = useState({});

	return (
		<div className={styles.container}>
			<div className={styles.faqs_container}>
				<SearchFaq setModalData={setModalData} key={modalData} />
				<FaqTopics />
			</div>
			<div className={styles.view_history_styles}>
				<RecentQueries />
			</div>

			<div className={styles.raise_ticket}>
				<RaiseTicket setModalData={setModalData} isDashboard />
			</div>
			<Modals modalData={modalData} setModalData={setModalData} />
		</div>
	);
}

export default Dashboard;
