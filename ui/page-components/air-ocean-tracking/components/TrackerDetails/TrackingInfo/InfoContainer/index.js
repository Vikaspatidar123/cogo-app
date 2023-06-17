import { Select, cl, Pill } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import Image from 'next/image';
import React, { useMemo } from 'react';

import styles from './styles.module.css';

import GET_MAPPING from '@/ui/page-components/air-ocean-tracking/constant/card';

const getOptions = ({ containerDetails = [] }) => containerDetails.map((item) => ({
	label : item?.container_no,
	value : item,
}));

// const INFO = {
// 	incoterm: 'Incoterm',
// };

const COLOR = {
	shipper   : 'blue',
	consignee : 'orange',
};

function InfoContainer({
	containerDetails = [], currContainerDetails = {}, setCurrContainerDetails,
	shipmentInfo = {}, trackingType, poc_details = [], airwayBillNo = '',
}) {
	const { container_no = '', container_length = '', container_description = '' } = currContainerDetails || {};

	const MAPPING = GET_MAPPING[trackingType];
	const { CARD_TITLE, SHIPMENT_TITLE, SHIPMENT_INFO } = MAPPING;

	const INFO_MAPPING = {
		...SHIPMENT_INFO,
		// ...INFO,
	};

	const { traderInfo, ...restInfo } = useMemo(() => {
		const { commodity = '', hs_code = '', weight = '', piece = '' } = shipmentInfo || {};
		const shipperDetails =	poc_details.filter((item) => item?.user_type === 'SHIPPER')[0] ?? {};
		const consigneeDetails = poc_details.filter((item) => item?.user_type === 'CONSIGNEE')[0] ?? {};
		const incoterm = shipmentInfo?.incoterm;

		return {
			incoterm,
			commodity: hs_code ? (
				<span>
					{commodity && <span>{`${commodity} - `}</span>}
					<span>
						(
						{hs_code}
						)
					</span>
				</span>
			) : '',
			traderInfo: { shipper: shipperDetails?.name, consignee: consigneeDetails?.name },
			weight,
			piece,
		};
	}, [poc_details, shipmentInfo]);

	return (
		<div className={styles.container}>

			<div className={styles.title_container}>
				<h3 className={styles.title}>{SHIPMENT_TITLE}</h3>
				<div className={styles.line} />
			</div>

			<div className={cl`${styles.info}
				${containerDetails.length > 1 ? styles.without_info_field : styles.info_field}`}
			>
				<p className={styles.info_text}>
					{trackingType === 'ocean' ? CARD_TITLE.CONTAINER_NO : CARD_TITLE}
				</p>

				{containerDetails.length > 1
					? (
						<Select
							size="sm"
							className={styles.select_field}
							value={currContainerDetails}
							onChange={setCurrContainerDetails}
							options={getOptions({ containerDetails })}
						/>
					) : <p className={styles.info_text}>{`${container_no || airwayBillNo}`}</p>}
			</div>

			<div className={styles.data_container}>
				{(container_length || container_description) && (
					<div className={styles.image_row}>
						<Image
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/container2.png"
							width={50}
							height={40}
						/>

						<div className={styles.data_text}>
							{container_length && <span>{`${container_length} FT, `}</span>}
							{container_description && <span>{container_description}</span>}
						</div>
					</div>
				)}

				{Object.keys(INFO_MAPPING).map((item) => {
					const data = restInfo?.[item] || '--';
					if (item === 'container_no') return <React.Fragment key={item} />;
					return (
						<div key={item} className={styles.row}>
							<span className={styles.data_title}>{INFO_MAPPING[item]}</span>
							<span className={styles.data_seperator}>:</span>
							<span>{data}</span>
						</div>
					);
				})}
			</div>

			{(traderInfo.shipper || traderInfo.consignee) && (
				<div className={styles.footer}>

					{Object.keys(traderInfo).map((trader) => {
						const name = traderInfo?.[trader] || '';
						if (isEmpty(name)) return <React.Fragment key={trader} />;

						return (
							<Pill
								key={trader}
								color={COLOR[trader]}
							>
								{`${startCase(trader)} : ${name}`}
							</Pill>
						);
					})}
				</div>
			)}

		</div>
	);
}

export default InfoContainer;
