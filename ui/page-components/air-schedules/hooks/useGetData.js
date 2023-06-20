import { useState, useEffect } from 'react';

import { useForm } from '@/packages/forms';
import formatDate from '@/ui/commons/utils/formatDate';

const FORMAT = "UTC:yyyy-MM-dd'T'HH:mm:ssZZ";
const useGetData = ({ setCurrentPage, setCarrierList, setFilters, carrierList }) => {
	const [durationValue, onChange] = useState(0);
	const [departureDate, setDepartureDate] = useState({});
	const [arrivalDate, setArrivalDate] = useState({});
	const [filterCarrier, setFilterCarrier] = useState([]);
	const [visible, setVisible] = useState(false);

	const { reset, control } = useForm();

	const transitFilter = durationValue !== 0 ? durationValue : '';

	useEffect(() => {
		if (
			filterCarrier.length > 0
            || Object.keys(departureDate).length
            || Object.keys(arrivalDate).length
            || durationValue
		) {
			const airFilter = {
				airline_id      : filterCarrier,
				departure_start : departureDate.startDate !== undefined
					? formatDate({
						date       : departureDate?.startDate,
						dateFormat : FORMAT,
						formatType : 'date',
					}) : null,
				departure_end: departureDate?.endDate !== undefined
					? formatDate({
						date       : departureDate?.endDate,
						dateFormat : FORMAT,
						formatType : 'date',
					}) : null,
				arrival_start: arrivalDate?.startDate !== undefined
					? formatDate({
						date       : arrivalDate?.startDate,
						dateFormat : FORMAT,
						formatType : 'date',
					}) : null,
				arrival_end: arrivalDate?.endDate !== undefined
					? formatDate({
						date       : arrivalDate?.endDate,
						dateFormat : FORMAT,
						formatType : 'date',
					}) : null,
				transit_time: transitFilter,
			};
			setCurrentPage(1);
			setFilters(airFilter);
		}
	}, [filterCarrier.length, departureDate,
		arrivalDate, durationValue, filterCarrier, transitFilter, setFilters, setCurrentPage]);
	useEffect(() => {
		if (carrierList) {
			const carriers = carrierList.filter((x) => x.status);
			setFilterCarrier(
				carriers.length
					? carriers.map((x) => x.airLineId)
					: carrierList.map((x) => x.airLineId),
			);
		}
	}, [carrierList]);

	const handleCheckList = (item, value) => {
		if (value === 'carrier') {
			setCarrierList((prevCarrier) => prevCarrier.map((valueLocal) => (valueLocal.id === item.id
				? { ...valueLocal, status: !valueLocal.status }
				: valueLocal)));
		}
	};

	const clearAllHandler = () => {
		setCarrierList((prevCarrier) => prevCarrier.map((value) => (value.status === true
			? { ...value, status: !value.status } : value)));
		setDepartureDate({});
		setArrivalDate({});
		setFilterCarrier({});
		onChange(0);
		setFilters({});
		setVisible(false);
		reset();
	};

	return {
		handleCheckList,
		clearAllHandler,
		control,
		departureDate,
		onChange,
		durationValue,
		arrivalDate,
		setArrivalDate,
		setDepartureDate,
		setVisible,
		visible,
	};
};
export default useGetData;
