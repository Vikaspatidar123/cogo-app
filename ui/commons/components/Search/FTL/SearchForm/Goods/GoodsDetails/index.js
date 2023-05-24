import { SingleDateRange, Tabs, TabPanel } from '@cogoport/components';
import React, { useState, forwardRef } from 'react';

import Calendar from '../../../icons/calender.svg';

import GeneralSpecialGoods from './GeneralSpecialGoods';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function GoodsDetails({ setGoodsDetail, goodsDetail, setShowPopover }, ref) {
	const [cargoDate, setCargoDate] = useState(
		goodsDetail?.cargoDate || new Date(),
	);

	const [cargoType, setCargoType] = useState(goodsDetail?.cargoType);
	const [errorMessge, setErrorMessage] = useState(false);

	const renderBody = () => (
		<div className={styles.date_container}>
			<Calendar size={1.5} />

			<div className={styles.date_div}>
				<div className={styles.select_date}>Select a day</div>

				<div className={styles.date_content}>
					{formatDate({
						date       : cargoDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>
			</div>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.date_picker_container}>
					<div className={styles.header_text}>Cargo Ready Date:</div>
					<SingleDateRange
						renderBody={renderBody}
						value={cargoDate}
						onChange={setCargoDate}
						dateFormat="dd MMM yyyy"
						minDate={new Date()}
					/>
				</div>

				{errorMessge && (
					<div className={styles.err_message}>Cargo Ready Date is required</div>
				)}
			</div>
			<div className={styles.commodity_type}>Commodity Type</div>

			<div style={{ width: 'fit-content', marginBottom: 20 }}>
				<Tabs themeType="tertiary" activeTab={cargoType} onChange={setCargoType}>
					<TabPanel name="general_cargo" title="GENERAL CARGO" />
					<TabPanel name="special_consideration" title="SPECIAL CONSIDERATION" />
				</Tabs>

				<GeneralSpecialGoods
					cargoDate={cargoDate}
					setErrorMessage={setErrorMessage}
					setGoodsDetail={setGoodsDetail}
					goodsDetail={goodsDetail}
					setShowPopover={setShowPopover}
					ref={ref}
					cargoType={cargoType}
				/>
			</div>

		</div>
	);
}

export default forwardRef(GoodsDetails);
