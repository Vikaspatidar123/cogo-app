import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import formatDate from '@cogo/globalization/utils/formatDate';
import { SingleDatePicker } from '@cogoport/front/components/DateTimePicker';
import SegmentedControl from '@cogoport/front/components/SegmentedControl';
import React, { useState, forwardRef } from 'react';

import Calendar from '../../../icons/calender.svg';

import GeneralSpecialGoods from './GeneralSpecialGoods';
import styles from './styles.module.css';
// import {
// 	Container,
// 	HeaderContainer,
// 	DatePickerContainer,
// 	DateContainer,
// 	DateDiv,
// 	SelectDate,
// 	DateContent,
// } from './styles';

const OPTIONS = [
	{ label: 'GENERAL CARGO', value: 'general_cargo' },
	{ label: 'SPECIAL CONSIDERATION', value: 'special_consideration' },
];

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
					<div className="headerText">Cargo Ready Date:</div>

					<SingleDatePicker
						renderBody={renderBody}
						withTimePicker={false}
						onChange={setCargoDate}
						value={cargoDate}
						minDate={new Date()}
					/>
				</div>

				{errorMessge && (
					<div className="errMessage">Cargo Ready Date is required</div>
				)}
			</div>

			<div className="commodityType">Commodity Type</div>

			<div style={{ width: 'fit-content', marginBottom: 20 }}>
				<SegmentedControl
					options={OPTIONS}
					activeTab={cargoType}
					setActiveTab={setCargoType}
				/>
			</div>

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
	);
}

export default forwardRef(GoodsDetails);
