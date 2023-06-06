import { Input, TabPanel, Tabs } from '@cogoport/components';
import { IcMDocument, IcMEnquiriesReceived, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import QuoteList from './QuoteList';
import EmptyState from './QuoteList/EmptyState';
import styles from './styles.module.css';

function List({
	data = {},
	loading = false,
	deleteQuote,
	deleteLoading = false,
	setGlobalFilter,
	debounceQuery,
}) {
	const [activeTab, setActiveTab] = useState('SENT');
	const [searchTerm, setSearchTerm] = useState();

	const searchChangeHandler = (val) => {
		setSearchTerm(val);
		debounceQuery(val);
	};
	return (
		<div>
			<h2 className={styles.title}>Lists of Quotation</h2>
			<div className={styles.row_desktop}>
				<div className={styles.tab_container}>
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
				</div>

				<div className={styles.input_box}>
					<Input
						size="sm"
						placeholder="Quotation Id"
						value={searchTerm}
						onChange={searchChangeHandler}
						suffix={<IcMSearchlight />}
						disabled={activeTab === 'RECEIVED'}
					/>
				</div>
			</div>
			{activeTab === 'SENT' && (
				<QuoteList
					data={data}
					loading={loading}
					deleteQuote={deleteQuote}
					deleteLoading={deleteLoading}
					setGlobalFilter={setGlobalFilter}
				/>
			)}
			{activeTab === 'RECEIVED' && (
				<EmptyState text="No Data Avaliable" />
			)}
		</div>
	);
}

export default List;
