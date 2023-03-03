import { Tabs, TabPanel } from '@cogoport/components';

import MobileMenu from '../../MobileMenu';

import styles from './styles.module.css';
import useAccountDetails from './useAccountDetails';

function AccountDetails() {
	const {
		activeTab,
		tabOptions = [],
		OPTIONS_MAPPING = {},
		handleChangeTab,
	} = useAccountDetails();

	const {
		title: activeTitle,
		containerComponent: ActiveContainerComponent = null,
	} = OPTIONS_MAPPING[activeTab];

	return (
		<div>
			<div className={styles.mobile}>
				<MobileMenu
					activeTab={activeTab}
					handleChangeTab={handleChangeTab}
					OPTIONS_MAPPING={OPTIONS_MAPPING}
					tabOptions={tabOptions}
				/>
			</div>
			<div className={styles.container}>
				<div className={styles.tabs_container}>
					<Tabs
						key={activeTab}
						activeTab={activeTab}
						themeType="primary-vertical"
						onChange={(obj) => handleChangeTab(obj)}
						className={styles.main_container}
					>
						{(tabOptions || []).map((option) => {
							const { key = '', title = '' } = option;
							return <TabPanel key={key} name={key} title={title} />;
						})}
					</Tabs>
				</div>

				<div className={styles.tab_panel_container}>
					<ActiveContainerComponent title={activeTitle} />
				</div>
			</div>
		</div>
	);
}

export default AccountDetails;
