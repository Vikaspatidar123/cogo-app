import styles from './styles.module.css';

import { iconMappings, tabOptions } from '@/ui/configurations/color-options';

function CustomTabs({
	activeTab, handleActiveTab, disabled,
}) {
	return (
		<div className={styles.tabs}>
			{tabOptions.map(({ label, value }) => (
				<button
					disabled={disabled}
					key={value}
					onClick={() => handleActiveTab(value)}
					className={[styles.tab, value === activeTab ? styles.active_tab : ''].join(' ')}
				>
					<div className={styles.icon}>{iconMappings[value]}</div>
					<div className={styles.label}>{label}</div>
				</button>
			))}
		</div>
	);
}

export default CustomTabs;
