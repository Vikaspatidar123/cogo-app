import { Input, TabPanel, Tabs } from '@cogoport/components';
import { IcMDocument, IcMEnquiriesReceived, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import QuoteList from './QuoteList';
import styles from './styles.module.css';

function List() {
	const [activeTab, setActiveTab] = useState('SENT');
	return (
		<div>
			<h2>Lists of Quotation</h2>
			<div className={styles.row}>
				<Tabs themeType="tertiary" activeTab={activeTab} onChange={setActiveTab}>
					<TabPanel
						name="SENT"
						title={(
							<div className={styles.tab_panel}>
								<IcMDocument />
								<span className={styles.text}>Send</span>
							</div>
						)}
					/>
					<TabPanel
						name="RECEIVED"
						title={(
							<div className={styles.tab_panel}>
								<IcMEnquiriesReceived />
								<span className={styles.text}>Received</span>
							</div>
						)}
					/>
				</Tabs>
				<div className={styles.input_box}>
					<Input size="sm" placeholder="Quotation Id" suffix={<IcMSearchlight />} />
				</div>
			</div>
			{activeTab === 'SENT' && (
				<QuoteList />
			)}
		</div>
	);
}

export default List;
