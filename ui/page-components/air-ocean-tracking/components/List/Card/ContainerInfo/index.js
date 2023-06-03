import { cl } from '@cogoport/components';
import { IcMAlert, IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { useMemo } from 'react';

import styles from './styles.module.css';

const config = {
	container_no : 'Container no',
	commodity    : 'Commodity',
};

function ContainerInfo({
	currentContainer = {}, shipmentInfo = {}, activeContainerIndex,
	setActiveContainerIndex, containerDetailsLength = 0,
}) {
	const { container_length = 0, container_description = '' } = currentContainer || {};

	const tableData = useMemo(() => {
		const { commodity = '', hs_code = '' } = shipmentInfo || {};
		return {
			commodity    : commodity - `${(hs_code)}` || <IcMAlert />,
			container_no : currentContainer?.container_no,
		};
	}, [currentContainer, shipmentInfo]);

	const incrementHandler = (value) => {
		setActiveContainerIndex((prev) => (value ? prev + 1 : prev - 1));
	};

	return (
		<div className={styles.container}>

			<div className={styles.flex_box}>
				<h3>Container Details</h3>
				{containerDetailsLength > 1 && (
					<div className={styles.pagination_container}>
						<IcMArrowLeft onClick={() => incrementHandler(false)} />
						<span className={styles.num}>{activeContainerIndex}</span>
						/
						<span className={styles.num}>{containerDetailsLength}</span>
						<IcMArrowRight onClick={() => incrementHandler(true)} />
					</div>
				)}
			</div>

			<div className={styles.line} />

			<div className={styles.info_container}>
				<p className={styles.info_title}>
					{container_length ? `${container_length} Ft |` : ''}
					{' '}
					{container_description}
				</p>

				<div className={styles.info_table}>
					{Object.keys(config).map((item) => (
						<div className={cl`${styles.flex_box} ${styles.row}`}>
							<div className={cl`${styles.label} ${styles.col}`}>
								{config[item]}
							</div>
							<div className={styles.col}>
								:
							</div>
							<div className={cl`${styles.value} ${styles.col}`}>
								{tableData?.[item]}
							</div>

						</div>
					))}

				</div>
			</div>
		</div>
	);
}

export default ContainerInfo;
