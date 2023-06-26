import { useState } from 'react';

import RaiseTicket from '../../common/RaiseTicket';
import SearchFaq from '../../common/SearchFaq';

import FaqTopics from './FaqTopics';
import RecentQueries from './RecentQueries';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import Modals from '@/ui/commons/components/Header/Help/components/Modals';

function Dashboard() {
	const { isMobile } = useSelector((state) => state.general);

	const [modalData, setModalData] = useState({});

	return (
		<div className={styles.container}>
			<div className={styles.faqs_container}>
				<SearchFaq setModalData={setModalData} key={modalData} />
				<FaqTopics isMobile={isMobile} />
			</div>
			<div className={styles.view_history_styles}>
				<RecentQueries isMobile={isMobile} />
			</div>

			<div className={styles.raise_ticket}>
				<RaiseTicket setModalData={setModalData} isDashboard />
			</div>
			<Modals modalData={modalData} setModalData={setModalData} />
		</div>
	);
}

export default Dashboard;
