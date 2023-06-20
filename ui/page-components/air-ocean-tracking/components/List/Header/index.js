import {
	ButtonIcon, Tabs, TabPanel, cl, Button, Popover,
} from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import { TAB_MAPPING, VIEW_MAPPING } from '../../../constant/tabMapping';
import useExportData from '../../../hooks/useExportData';
import useGetDsrList from '../../../hooks/useGetDsrList';
import useRedirectFn from '../../../hooks/useRedirectFn';

import DailyReport from './DailyReport';
import FilterSection from './FilterSection';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Header(props) {
	const { globalFilter, filterChangeHandler } = props;

	const { query } = useRouter();
	const [showConfigure, setShowConfigure] = useState(false);

	const { isArchived = false } = query || {};
	const { activeTab = '', search_type = '' } = globalFilter;

	const { redirectArchivedList, redirectToDashboard } = useRedirectFn();
	const { loading, getTrackingData } = useExportData();

	const dsrListValue = useGetDsrList({ showConfigure });

	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.first_row}`}>

				<div className={styles.flex_box}>
					<ButtonIcon size="lg" icon={<IcMArrowBack />} themeType="primary" onClick={redirectToDashboard} />
					<h2>{isArchived ? 'Archive List' : 'Shipment List'}</h2>
					<div>
						<Tabs
							themeType="tertiary"
							activeTab={activeTab}
							onChange={(e) => filterChangeHandler('activeTab', e)}
						>
							{Object.keys(TAB_MAPPING).map((tab) => (
								<TabPanel key={tab} name={tab} title={TAB_MAPPING?.[tab]} />
							))}
						</Tabs>
					</div>
				</div>

				<div className={styles.flex_box}>
					{!isArchived && (
						<>
							<Button
								type="button"
								themeType="linkUi"
								onClick={() => redirectArchivedList(activeTab)}
							>
								Archived List
							</Button>

							{activeTab === 'ocean' && (
								<Popover
									caret={false}
									visible={showConfigure}
									content={(
										<DailyReport
											activeTab={activeTab}
											dsrListValue={dsrListValue}
											setShowConfigure={setShowConfigure}
										/>
									)}
									placement="bottom-end"
								>
									<Button
										themeType="secondary"
										type="button"
										onClick={() => setShowConfigure((prev) => !prev)}
									>
										Daily Status Report
									</Button>
								</Popover>
							)}
						</>
					)}
					{activeTab === 'ocean' && (
						<Button
							type="button"
							loading={loading}
							className={styles.export_btn}
							onClick={getTrackingData}
						>
							Export Data
						</Button>
					)}
				</div>

			</div>

			<div className={cl`${styles.flex_box} ${styles.second_row}
				${activeTab === 'ocean' ? styles.ocean_row : ''}`}
			>
				{activeTab === 'ocean'	&& (
					<div style={{ width: '42%' }}>
						<Tabs
							activeTab={search_type}
							onChange={(e) => filterChangeHandler('search_type', e)}
							themeType="secondary"
							fullWidth
						>
							{Object.keys(VIEW_MAPPING).map((tab) => (
								<TabPanel key={tab} name={tab} title={VIEW_MAPPING?.[tab]} />
							))}
						</Tabs>
					</div>
				)}

				<FilterSection {...props} />
			</div>
		</div>
	);
}

export default Header;
