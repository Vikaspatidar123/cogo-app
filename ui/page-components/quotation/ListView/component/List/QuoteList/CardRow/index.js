import { cl } from '@cogoport/components';

import styles from '../styles.module.css';

const getData = ({ item, data }) => {
	if (item?.renderFunc) {
		return null;
	}
	return data[item?.key];
};

function CardRow({ data, config }) {
	return (
		<div className={cl`${styles.card_row} ${styles.row_item}`}>
			{config.map((item) => (
				<div className={styles.col} style={{ width: `${item?.width}` }}>
					{getData({ item, data })}
				</div>
			))}
		</div>
	);
}

export default CardRow;
