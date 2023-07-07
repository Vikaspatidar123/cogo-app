import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADING_ARR = [...Array(4).keys()];

function MobileView({
	fields, infoData = () => {}, itm, loading = false,
}) {
	return (
		<div className={styles.container}>
			{loading ? (
				LOADING_ARR.map(() => (
					<div className={styles.div}>
						<div className={styles.loader}>
							<Placeholder height="20px" width="130px" />
						</div>
						<div className={styles.loader}>
							<Placeholder height="20px" width="130px" />
						</div>
					</div>
				))
			) : (
				fields.map((config) => (
					<div className={styles.flex} key={config.key}>
						<div className={styles.label}>{config?.label}</div>
						<div className={styles.value}>{infoData(config, itm)}</div>
					</div>
				)))}
		</div>
	);
}
export default MobileView;
