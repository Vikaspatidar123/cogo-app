import { IcMCrossInCircle } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import ArrivalFilter from './ArrivalFilter';
import CarrierFilter from './CarrierFilter';
import DepartureFilter from './DepartureFilter';
import styles from './styles.module.css';
import TransitDurationFilter from './TransitDurationFilter';

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
	const { t } = useTranslation(['oceanSchedule']);
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
					{t('oceanSchedule:clear_all_text')}
				</div>
				<IcMCrossInCircle onClick={clearAllHandler} />
			</div>

			<CarrierFilter
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
