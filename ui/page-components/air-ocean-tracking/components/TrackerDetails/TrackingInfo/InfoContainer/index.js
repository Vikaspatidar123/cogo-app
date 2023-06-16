import { Select, cl, Pill } from '@cogoport/components';
import { useMemo } from 'react';

import styles from './styles.module.css';

import GET_MAPPING from '@/ui/page-components/air-ocean-tracking/constant/card';

const getOptions = ({ containerDetails = [] }) => containerDetails.map((item) => ({
	label : item?.container_no,
	value : item,
}));

const INFO = {
	// shipper   : 'Shipper',
	// consignee : 'Consignee',
	incoterm: 'Incoterm',
};

function InfoContainer({
	containerDetails = [], currContainerDetails = {}, setCurrContainerDetails,
	shipmentInfo = {}, trackingType, poc_details = [],
}) {
	const { container_no = '', container_length, container_description } = currContainerDetails || {};

	const MAPPING = GET_MAPPING?.ocean;
	const { CARD_TITLE, SHIPMENT_TITLE, SHIPMENT_INFO } = MAPPING;

	const INFO_MAPPING = {
		...SHIPMENT_INFO,
		...INFO,
	};

	const tableData = useMemo(() => {
		const { commodity = '', hs_code = '' } = shipmentInfo || {};
		const shipperDetails =	poc_details.filter((item) => item?.user_type === 'SHIPPER')[0] ?? {};
		const consigneeDetails = poc_details.filter((item) => item?.user_type === 'CONSIGNEE')[0] ?? {};
		const incoterm = shipmentInfo?.incoterm;

		return {
			commodity : hs_code ? `${commodity} - (${hs_code})` : '',
			shipper   : shipperDetails?.name,
			consignee : consigneeDetails?.name,
			incoterm,
		};
	}, [poc_details, shipmentInfo]);

	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<h3 className={styles.title}>{SHIPMENT_TITLE}</h3>
				<div className={styles.line} />
				<div className={styles.tag}>
					<Pill color="blue" size="sm">
						Shipper:
						{' '}
						{tableData?.shipper}
					</Pill>
					<Pill color="orange" size="sm">
						Consignee:
						{' '}
						{(tableData?.consignee || '').split(' ')[0]}
					</Pill>
				</div>
			</div>

			<div className={styles.row}>
				<div className={cl`${styles.flex_box} ${styles.section}`}>
					<p>
						{trackingType === 'ocean' ? CARD_TITLE.CONTAINER_NO : CARD_TITLE}
						:
					</p>
					{containerDetails.length === 1
						? (
							<Select
								size="sm"
								value={currContainerDetails}
								onChange={setCurrContainerDetails}
								options={getOptions({ containerDetails })}

							/>
						) : <p>{` ${container_no}`}</p>}
				</div>

				<div className={cl`${styles.section} ${styles.info_section}`}>
					<p className={styles.info_title}>{`${container_length}FT ${container_description}`}</p>

					<div>
						{Object.keys(INFO_MAPPING).map((item) => {
							if (item === 'container_no' || !tableData?.[item]) return null;
							return (
								<div key={item} className={cl`${styles.flex_box} ${styles.row}`}>

									<div className={cl`${styles.label} ${styles.col}`}>
										{INFO_MAPPING[item]}
									</div>

									<div className={styles.col}>
										:
									</div>

									<div className={cl`${styles.value} ${styles.col}`}>
										{tableData?.[item]}
									</div>

								</div>
							);
						})}

					</div>
				</div>

			</div>

		</div>
	);
}

export default InfoContainer;
