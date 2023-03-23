import { IcMTick } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Filters({ services, activeTab, setActiveTab }) {
	return (
		<>
			{' '}
			{(services || []).length > 1 && (
				<div className={styles.container}>
					<div className={styles.tags}>
						{services.map((label, key) => (
							<div
								className={styles.tag}
								role="presentation"
								onClick={() => {
									setActiveTab(key);
								}}
							>
								{key === activeTab && <IcMTick />}
								{upperCase(label).slice(0, 3)}
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default Filters;
