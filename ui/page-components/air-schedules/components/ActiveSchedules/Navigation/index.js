import { IcMCrossInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import AirlineFilter from './AirlineFilter';
import ArrivalFilter from './ArrivalFilter';
import DepartureFilter from './DepartureFilter';
import styles from './styles.module.css';
import TransitDurationFilter from './TransitDurationFilter';
// import TransShipmentsFilter from './TransShipmentsFilter';

function Navigation({
	departureDate,
	setDepartureDate,
	arrivalDate,
	setArrivalDate,
	carrierList,
	handleCheckList,
	durationValue,
	onChange,
	clearAllHandler,
}) {
	const [isOpen, setIsOpen] = useState([]);

	const arrayRemove = (arr, value) => arr.filter((ele) => ele !== value);

	const handleNav = (id) => {
		setIsOpen(
			(isOpen || []).includes(id) ? arrayRemove(isOpen, id) : [...isOpen, id],
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.filter}>
				<div className={styles.title} role="presentation" onClick={clearAllHandler}>
					Clear All
				</div>
				<IcMCrossInCircle onClick={clearAllHandler} />
			</div>
			{/* <TransShipmentsFilter
				isOpen={isOpen}
				handleNav={handleNav}
				fields={fields}
				control={control}
			/> */}
			<AirlineFilter
				handleCheckList={handleCheckList}
				handleNav={handleNav}
				isOpen={isOpen}
				carrierList={carrierList}
			/>
			<ArrivalFilter
				handleNav={handleNav}
				isOpen={isOpen}
				arrivalDate={arrivalDate}
				setArrivalDate={setArrivalDate}
			/>
			<DepartureFilter
				handleNav={handleNav}
				isOpen={isOpen}
				departureDate={departureDate}
				setDepartureDate={setDepartureDate}
			/>
			<TransitDurationFilter
				handleNav={handleNav}
				isOpen={isOpen}
				durationValue={durationValue}
				onChange={onChange}
			/>
		</div>
	);
}

export default Navigation;
