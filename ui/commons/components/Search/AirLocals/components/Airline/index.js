import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useCallback,
} from 'react';

import styles from './styles.module.css';

import AsyncSelect from '@/packages/forms/Business/AsyncSelect';

function AirlineType(props, ref) {
	const { airFreightLocalsData = {}, formError = {} } = props;
	const { airline_id = '' } = airFreightLocalsData || {};
	const [selectedAirline, setSelectedAirline] = useState(airline_id || '');

	const imperativeHandle = useCallback(
		() => ({
			handleSubmit: () => ({
				hasError: !selectedAirline,
				...(selectedAirline && { values: { selectedAirline } }),
				...(!selectedAirline && { errors: {} }),
			}),
		}),
		[selectedAirline],
	);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	return (
		<div className={styles.container}>
			<div className={styles.title}> PREFERRED AIRLINE</div>

			<AsyncSelect
				type="select"
				placeholder="Select"
				asyncKey="air-lines"
				value={selectedAirline}
				onChange={setSelectedAirline}
				multiple={false}
			/>
			{formError?.airline ? (
				<div className={styles.error_message_container}>
					Airline is required
				</div>
			) : null}
		</div>
	);
}

export default forwardRef(AirlineType);
