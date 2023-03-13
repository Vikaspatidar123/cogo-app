import { Input, TabPanel, Tabs } from '@cogoport/components';
import { IcMDocument, IcMEnquiriesReceived, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import QuoteList from './QuoteList';
import EmptyState from './QuoteList/EmptyState';
import styles from './styles.module.css';

function List({
	data = {},
	loading = false,
	pagination,
	setPagination,
	setSortObj,
	searchTerm,
	setSearchTerm,
	deleteQuote,
	deleteLoading = false,
}) {
	const [activeTab, setActiveTab] = useState('SENT');
	return (
		<div>
			<div className={styles.desktop_view}>
				<h2>Lists of Quotation</h2>
				<div className={styles.row_desktop}>
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
						<Input
							size="sm"
							placeholder="Quotation Id"
							value={searchTerm}
							onChange={setSearchTerm}
							suffix={<IcMSearchlight />}
							disabled={activeTab === 'RECEIVED'}
						/>
					</div>
				</div>
				{activeTab === 'SENT' && (
					<QuoteList
						data={data}
						loading={loading}
						pagination={pagination}
						setPagination={setPagination}
						setSortObj={setSortObj}
						deleteQuote={deleteQuote}
						deleteLoading={deleteLoading}
					/>
				)}
				{activeTab === 'RECEIVED' && (
					<EmptyState text="No Data Avaliable" />
				)}
			</div>
			<div className={styles.mobile_view}>
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
				</div>
				<div className={styles.input_box}>
					<Input
						size="sm"
						placeholder="Quotation Id"
						value={searchTerm}
						onChange={setSearchTerm}
						suffix={<IcMSearchlight />}
						disabled={activeTab === 'RECEIVED'}
					/>
				</div>

				{activeTab === 'SENT' && (
					<QuoteList
						data={data}
						loading={loading}
						pagination={pagination}
						setPagination={setPagination}
						setSortObj={setSortObj}
						deleteQuote={deleteQuote}
						deleteLoading={deleteLoading}
					/>
				)}
				{activeTab === 'RECEIVED' && (
					<EmptyState text="No Data Avaliable" />
				)}

			</div>
		</div>
	);
}

export default List;
