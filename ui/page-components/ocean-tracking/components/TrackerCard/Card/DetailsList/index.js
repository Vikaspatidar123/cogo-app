import { IcMArrowBack, IcMArrowNext, IcMOverflowDot } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DetailsList() {
	return (
		<div className={styles.container}>
			<div className={styles.title_div}>
				<div className={styles.title}>20 FT | </div>
				<div className={styles.title}> Standard Dry</div>
				<div className={styles.arrow_div}>
					<IcMArrowBack />
					<IcMArrowNext />
				</div>
			</div>
			<div className={styles.list_container}>
				<div className={styles.element1}>
					<div className={styles.sub_element}>Container no</div>
					<div>
						<IcMOverflowDot />
					</div>
					<div className={styles.sub_element}>MRKU9470415</div>
				</div>
				<div className={styles.element1}>
					<div className={styles.sub_element}>Commodity</div>
					<div>
						<IcMOverflowDot />
					</div>
					<div className={styles.sub_element}>General</div>
				</div>
				<div className={styles.element1}>
					<div className={styles.sub_element}>Quantity</div>
					<div>
						<IcMOverflowDot />
					</div>
					<div className={styles.sub_element}>10</div>
				</div>
			</div>
		</div>
	);
}

export default DetailsList;
