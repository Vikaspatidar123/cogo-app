import { cl, Placeholder } from '@cogoport/components';
import { IcMAlert, IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { useMemo } from 'react';

import GET_MAPPING from '../../../../constant/card';

import styles from './styles.module.css';

function ContainerInfo({
	currentContainer = {}, shipmentInfo = {}, activeContainerIndex,
	setActiveContainerIndex, containerDetailsLength = 0,
	loading = true, activeTab,
}) {
	const { container_length = 0, container_description = '' } = currentContainer || {};

	const MAPPING = GET_MAPPING?.[activeTab];
	const { SHIPMENT_TITLE, SHIPMENT_INFO, LOADING_ICON } = MAPPING;

	const tableData = useMemo(() => {
		const { commodity = '', hs_code = '' } = shipmentInfo || {};
		return {
			commodity    : hs_code ? `${commodity} - (${hs_code})` : <IcMAlert />,
			container_no : currentContainer?.container_no,
		};
	}, [currentContainer, shipmentInfo]);

	const incrementHandler = (value) => {
		setActiveContainerIndex((prev) => (value ? prev + 1 : prev - 1));
	};

	if (loading) {
		return (
			<div className={styles.skeleton_loader}>
				<Placeholder height="182px">
					{LOADING_ICON}
				</Placeholder>
			</div>
		);
	}

	return (
		<div className={styles.container}>

			<div className={styles.flex_box}>
				<h3>{SHIPMENT_TITLE}</h3>

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
					{Object.keys(SHIPMENT_INFO).map((item) => (
						<div key={item} className={cl`${styles.flex_box} ${styles.row}`}>

							<div className={cl`${styles.label} ${styles.col}`}>
								{SHIPMENT_INFO[item]}
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
