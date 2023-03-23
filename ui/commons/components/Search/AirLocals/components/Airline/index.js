import { Select } from '@cogoport/components';
import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useCallback,
} from 'react';

import styles from './styles.module.css';

function AirlineType(props, ref) {
	const { airFreightLocalsData = {}, formError = {} } = props;
	const { airline_id = '' } = airFreightLocalsData || {};
	const [selectedAirline, setSelectedAirline] = useState(airline_id || '');

	const imperativeHandle = useCallback(() => ({
		handleSubmit: () => ({
			hasError: !selectedAirline,
			...(selectedAirline && { values: { selectedAirline } }),
			...(!selectedAirline && { errors: {} }),
		}),
	}), [selectedAirline]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	return (
		<div className={styles.container}>
			<div className={styles.title}> PREFERRED AIRLINE</div>

			<Select
				type="select"
				placeholder="Select"
				optionsListKey="air-lines"
				value={selectedAirline}
				onChange={setSelectedAirline}
				multiple={false}
				style={{
					menu: {
						right        : 0,
						background   : 'white',
						boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
						borderRadius : 10,
						zIndex       : 99999,
						width        : 244,
					},
				}}
			/>
			{formError?.airline ? (
				<div className={styles.error_message_container}>Airline is required</div>
			) : null}
		</div>
	);
}

export default forwardRef(AirlineType);
