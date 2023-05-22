import { cl } from '@cogoport/components';
import { IcMPin } from '@cogoport/icons-react';

import {
	FILTER_KEY_TO_LABEL,
	FILTER_WIDTH,
	WIDE_FILTER_KEY,
} from '../../common/constants';

import styles from './styles.module.css';

function FilterCards({ id, onClick, activeKey, stats, ...props }) {
	const wide = FILTER_WIDTH[id];
	if (wide === 1 || wide === 2) {
		const headingKey = id;
		const subheading1Key = WIDE_FILTER_KEY[id].subheading1;
		const subheading2Key = WIDE_FILTER_KEY[id].subheading2;

		const heading = FILTER_KEY_TO_LABEL[headingKey];
		const subheading1 = FILTER_KEY_TO_LABEL[subheading1Key];
		const subheading2 = FILTER_KEY_TO_LABEL[subheading2Key];

		const subheading1Value = stats[subheading1Key] || 0;
		const subheading2Value = stats[subheading2Key] || 0;
		const headingValue = stats[headingKey] || 0;
		const trackedContainer = stats.container_tracked || 0;

		const isDisabled = headingValue === 0;
		const isSubheading1Disabled = subheading1Value === 0;
		const isSubheading2Disabled = subheading2Value === 0;
		return (
			<div className={styles.tab_container}>
				{wide === 2 ? (
					<div
						role="presentation"
						className={`${styles.header_container1} ${
							isDisabled && styles.disabled_card
						} ${id === activeKey && styles.active}`}
						disabled={isDisabled}
						onClick={() => !isDisabled && onClick(headingKey)}
					>
						<div className={styles.heading}>
							<h3>{heading}</h3>
							<h1>{headingValue}</h1>
						</div>

						<div className={styles.total_container}>
							<div className={styles.horizontal_line} />
							<div className={styles.sub_content}>
								<div>Total Containers</div>
								<div>{trackedContainer}</div>
							</div>
						</div>
					</div>
				) : (
					<div
						role="presentation"
						className={cl`${styles.header_container} ${
							isDisabled && styles.disabled_card
						} ${id === activeKey && styles.active}`}
						disabled={isDisabled}
						onClick={() => !isDisabled && onClick(headingKey)}
					>
						<h3>{heading}</h3>
						<h1>{headingValue}</h1>
					</div>
				)}
				<div className={styles.horizontal_line} />
				<div className={styles.flex}>
					<div
						role="presentation"
						className={cl`${styles.sub_heading} ${
							isSubheading1Disabled && styles.disabled_card
						} ${id === activeKey && styles.active}`}
						disabled={isSubheading1Disabled}
						onClick={() => !isSubheading1Disabled && onClick(subheading1Key)}
					>
						<p className={styles.label}>{subheading1}</p>
						<p className={styles.value}>{subheading1Value}</p>
					</div>
					<div className={styles.vertical_line} />
					<div
						role="presentation"
						className={cl`${styles.sub_heading} ${
							isSubheading2Disabled && styles.disabled_card
						} ${id === activeKey && styles.active}`}
						disabled={isSubheading2Disabled}
						onClick={() => !isSubheading2Disabled && onClick(subheading2Key)}
					>
						<p className={styles.label}>{subheading2}</p>
						<p className={styles.value}>{subheading2Value}</p>
					</div>
				</div>
			</div>
		);
	}
	const label = FILTER_KEY_TO_LABEL[id];
	const value = stats[id] || 0;
	const isDisabled = value === 0;
	console.log(label, 'label', stats[id], stats);
	return (
		<div
			role="presentation"
			className={cl`${styles.tab_container} ${
				isDisabled && styles.disabled_card
			} ${id === activeKey && styles.active}`}
			{...props}
			disabled={isDisabled}
			onClick={() => !isDisabled && onClick(id)}
		>
			<div className={styles.card_content}>
				{id === activeKey && <div className={styles.icon}><IcMPin /></div>}
				<h3 className={styles.text}>{label}</h3>
				<h1 className={styles.text}>{value}</h1>
			</div>
		</div>
	);
}
export default FilterCards;
