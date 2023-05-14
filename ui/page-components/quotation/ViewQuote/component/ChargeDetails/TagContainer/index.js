import { cl } from '@cogoport/components';

import styles from './styles.module.css';

const renderTitle = ({ transportMode }) => {
	if (transportMode === 'AIR') {
		return 'Package Details: ';
	}
	if (transportMode === 'OCEAN') {
		return 'Container Details: ';
	}
	return null;
};

function TagContainer({
	transportMode,
	packageHandling,
	packageType,
	quantity,
	containerSize,
	containerType,
	containerCount,
	weight,
	volume,
}) {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{renderTitle({ transportMode })}</h2>
			<div className={styles.tag_row}>
				{packageHandling && <div className={styles}>{packageHandling}</div>}

				{quantity && <div className={styles.tags}>{quantity}</div>}
				{containerType && <div className={styles.tags}>{containerType}</div>}
				{packageType && <div className={styles.tags}>{packageType}</div>}
				{containerCount && (
					<div className={cl`${styles.tags} ${styles.tags_color}`}>
						Container Count
						{' '}
						{containerCount}
					</div>
				)}
				{containerSize && (
					<div className={cl`${styles.tags} ${styles.tags_color}`}>
						Container Size
						{' '}
						{containerSize}
					</div>
				)}
				{weight && (
					<div className={cl`${styles.tags} ${styles.tags_color}`}>
						{weight}
						{' '}
						Kgs
					</div>
				)}
				{volume && (
					<div className={cl`${styles.tags} ${styles.tags_color}`}>
						{volume}
						{' '}
						cbm
					</div>
				)}
			</div>
		</div>
	);
}

export default TagContainer;
