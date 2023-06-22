import { Tabs, TabPanel } from '@cogoport/components';
import { upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Filters({ services, activeTab, setActiveTab }) {
	return (
		<>
			{' '}
			{(services || []).length > 1 && (
				<div className={styles.container}>
					<Tabs
						activeTab={activeTab || services[0]}
						themeType="primary"
						onChange={setActiveTab}
					>
						{services.map((label) => (
							<TabPanel name={label} title={upperCase(label).slice(0, 3)} />
						))}

					</Tabs>
				</div>
			)}
		</>
	);
}

export default Filters;
