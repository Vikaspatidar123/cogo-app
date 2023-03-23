import React, { useState, forwardRef } from 'react';
import { SingleDatePicker } from '@cogoport/front/components/DateTimePicker';
import SegmentedControl from '@cogoport/front/components/SegmentedControl';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import {
	Container,
	HeaderContainer,
	DatePickerContainer,
	DateContainer,
	DateDiv,
	SelectDate,
	DateContent,
} from './styles';
import Calendar from '../../../icons/calender.svg';
import GeneralSpecialGoods from './GeneralSpecialGoods';

const OPTIONS = [
	{ label: 'GENERAL CARGO', value: 'general_cargo' },
	{ label: 'SPECIAL CONSIDERATION', value: 'special_consideration' },
];

const GoodsDetails = ({ setGoodsDetail, goodsDetail, setShowPopover }, ref) => {
	const [cargoDate, setCargoDate] = useState(
		goodsDetail?.cargoDate || new Date(),
	);

	const [cargoType, setCargoType] = useState(goodsDetail?.cargoType);
	const [errorMessge, setErrorMessage] = useState(false);

	const renderBody = () => (
		<DateContainer>
			<Calendar size={1.5} />

			<DateDiv>
				<SelectDate>Select a day</SelectDate>

				<DateContent>
					{formatDate({
						date: cargoDate,
						dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType: 'date',
					})}
				</DateContent>
			</DateDiv>
		</DateContainer>
	);

	return (
		<Container>
			<HeaderContainer>
				<DatePickerContainer>
					<div className="headerText">Cargo Ready Date:</div>
					<SingleDatePicker
						renderBody={renderBody}
						withTimePicker={false}
						onChange={setCargoDate}
						value={cargoDate}
						minDate={new Date()}
					/>
				</DatePickerContainer>

				{errorMessge && (
					<div className="errMessage">Cargo Ready Date is required</div>
				)}
			</HeaderContainer>
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
		</Container>
	);
};

export default forwardRef(GoodsDetails);
