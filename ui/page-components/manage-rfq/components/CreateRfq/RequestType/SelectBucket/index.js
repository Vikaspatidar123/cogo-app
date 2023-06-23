import { Pill } from '@cogoport/components';

import styles from './styles.module.css';

function SelectBucket({ icon: Svg, title, subTitle, tags, fill, index }) {
	return (
		<div className={styles.section}>
			<Svg width={28} height={28} fill={fill} />
			<div className={styles.container}>
				<div className={styles.label}>
					<div className={styles.title}>{title}</div>
					<div className={styles.subtitle}>{subTitle}</div>
				</div>
				<div className={styles.tags}>
					{(tags || []).map((item) => {
						const Icon = item.icon;
						return (
							<Pill className={styles.tag} color={index === 0 ? 'green' : 'yellow'}>
								<Icon />
								{item.label}
							</Pill>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default SelectBucket;
