import { Tabs, TabPanel } from '@cogoport/components';

import MobileMenu from '../../MobileMenu';

import styles from './styles.module.css';
import useAccountDetails from './useAccountDetails';

import { useSelector } from '@/packages/store';

function AccountDetails() {
	const { isMobile } = useSelector(({ general }) => general);

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

	if (isMobile) {
		return (
			<MobileMenu
				activeTab={activeTab}
				handleChangeTab={handleChangeTab}
				OPTIONS_MAPPING={OPTIONS_MAPPING}
				tabOptions={tabOptions}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.tabs_container}>
				<Tabs
					key={activeTab}
					activeTab={activeTab}
					themeType="primary-vertical"
					onChange={(obj) => handleChangeTab(obj)}
					className={styles.main_container}
				>
					{tabOptions?.map((option) => {
						const { key = '', title = '' } = option;

						return <TabPanel key={key} name={key} title={title} />;
					})}
				</Tabs>
			</div>

			<div className={styles.tab_panel_container}>
				<ActiveContainerComponent title={activeTitle} />
			</div>
		</div>
	);
}

export default AccountDetails;
