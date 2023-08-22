import { Tabs, TabPanel } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import MobileHeader from '../../../../MobileHeader';

import useAccountDetails from './hooks/useActiveDetails';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function AlertsPreferences() {
	const { push } = useRouter();
	const { t } = useTranslation(['settings']);
	const { activeTab, setActiveTab, OPTIONS_MAPPING, controlValues } = useAccountDetails();
	const onClickBackButton = () => {
		push('/settings');
	};
	const {
		containerComponent: ActiveContainerComponent = null,
	} = OPTIONS_MAPPING[activeTab];
	return (
		<>
			<MobileHeader
				heading="Alerts & Preferences"
				onClickBackButton={onClickBackButton}
			/>

			<div className={styles.main_container}>
				<div className={styles.header_container}>{t('settings:settings_page_tab_4')}</div>

				<Tabs
					key={activeTab}
					activeTab={activeTab}
					onChange={(obj) => setActiveTab(obj)}
					className={styles.main_container}
				>
					{(controlValues || []).map((option) => {
						const { key = '', title = '', icon = '' } = option;
						return <TabPanel key={key} name={key} title={title} icon={icon} />;
					})}
				</Tabs>
				<ActiveContainerComponent />
			</div>
		</>
	);
}

export default AlertsPreferences;
