import { cl, Button, Toast } from '@cogoport/components';
import { useState, useEffect, forwardRef } from 'react';

import List from './List';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import { getCountryIds } from '@/ui/commons/utils/getCountryDetails';

const Location = getField('async_select');

const SUPPORTED_COUNTRY_CODE =	GLOBAL_CONSTANTS.service_supported_countries.ftl_freight.countries;

const location_control = [
	{
		name           : 'touch_point_location_id',
		type           : 'async_select',
		placeholder    : 'Enter Location',
		asyncKey       : 'locations',
		defaultOptions : true,
		caret          : false,
		params         : {
			apply_sorting : false,
			filters       : {
				type : ['pincode', 'seaport', 'airport', 'city'],
				id   : getCountryIds({ countryCodes: SUPPORTED_COUNTRY_CODE }),
			},
		},
		size  : 'md',
		rules : { required: 'Required' },
	},
];

function AddTouchPointModal({
	onClick,
	touchPointItems,
	setTouchPointItems = () => {},
	validate,
	typeOfJourney,
	location = {},
}) {
	const [value, setValue] = useState({
		id           : '',
		display_name : '',
		name         : '',
		trip_type    : typeOfJourney,
		error        : false,
	});

	const [touchPoints, setTouchPoints] = useState(touchPointItems);

	const handleObj = (obj = {}) => {
		const { display_name = '', name = '', id } = obj;

		if (id === location.origin?.id || id === location.destination?.id) {
			setValue((prev) => ({
				...prev,
				error: true,
			}));
			return;
		}

		setValue({
			id,
			display_name,
			name,
			trip_type : typeOfJourney,
			error     : false,
		});
	};

	const {
		setValue: setLocationValue = () => {},
		formState,
		handleSubmit,
		control,
		reset,
	} = useForm();

	const onSubmit = () => {
		if (value?.error) {
			return;
		}
		const currId = value.id;

		for (let i = 0; i < touchPoints.length; i += 1) {
			if (touchPoints[i].id === currId) {
				Toast.error('Selected touch point already exists in route');
				return;
			}
		}

		setTouchPoints((previousState) => [...previousState, value]);
		reset({});
	};

	const onDeleteTouchPoint = (index) => {
		setTouchPoints([
			...touchPoints.slice(0, index),
			...touchPoints.slice(index + 1, touchPoints.length),
		]);
	};

	const { errors } = formState;

	useEffect(() => {
		setLocationValue('touch_point_location_id', '');
		setValue('');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [touchPoints]);

	const handleSave = () => {
		setTouchPointItems(touchPoints);
		validate();
		onClick();
	};

	const onCancel = () => {
		setTouchPoints(touchPointItems);
		onClick();
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Add Touch points</div>

			<div className={styles.content}>
				<div className={styles.input_field}>
					<div className={styles.input_container}>

						<div className={styles.wrapper}>
							<Location
								{...location_control[0]}
								handleChange={(obj) => handleObj(obj)}
								control={control}
							/>
							{value?.error ? (
								<div
									className={cl`${styles.touchpoint_error} ${styles.error_message}`}
								>
									Touchpoint must be diffrent from origin and destination!!
								</div>
							) : null}
						</div>

						<div className={styles.add_icon_container}>
							<Button size="md" themeType="tertiary" onClick={handleSubmit(onSubmit)}>Add</Button>
						</div>
					</div>

					{Object.keys(errors?.touch_point_location_id || {}).length ? (
						<div className={styles.error_message}>Location is required</div>
					) : null}
				</div>

				<List
					touchPoints={touchPoints}
					onDeleteTouchPoint={onDeleteTouchPoint}
					setTouchPoints={setTouchPoints}
				/>

				<div className={styles.btn_wrapper}>
					<Button
						className={styles.button}
						themeType="secondary"
						onClick={() => {
							onCancel();
						}}
					>
						Cancel
					</Button>

					<Button size="md" themeType="accent" onClick={handleSave}>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(AddTouchPointModal);
