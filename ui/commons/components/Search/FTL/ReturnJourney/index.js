// import Layout from '@cogo/business-modules/form/Layout';
import { IcMPortArrow } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';
import {
	useRef,
	forwardRef,
	useImperativeHandle,
	useCallback,
	useEffect,
} from 'react';

import TouchPoint from '../SearchForm/TouchPoint';

import controls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

function ReturnJourney(
	{
		location,
		touchPointsToggle,
		setTouchPointsToggle = () => {},
		error,
		searchData = {},
	},
	ref,
) {
	const ftlRef = useRef({});

	const haltData = getByKey(searchData, 'touch_points.primary_service.destination[0]') || {};

	const {
		formState: { errors },
		watch,
		setValue,
		control,
	} = useForm();

	const formValues = watch();

	useEffect(() => {
		if (Object.keys(haltData).length) {
			setValue('halt_time_value', haltData.halt_time_value);
			setValue('halt_time_unit', haltData.halt_time_unit);
		}
	}, [haltData]);

	const haltTime = {
		halt_time_value : formValues.halt_time_value || '',
		halt_time_unit  : formValues.halt_time_unit || '',
	};

	const validate = async () => {
		const validateData = await ftlRef.current.TouchPointsRef.handleSubmit();

		return validateData;
	};

	const imperativeHandle = useCallback(() => {
		const haltTimeData = Object.values(haltTime).filter((item) => item !== '');
		const isError = haltTimeData.length === 1;

		return {
			handleSubmit: () => ({
				hasError: isError,
				...(!isError && { values: { ...haltTime } }),
				...(isError && {
					errors: { errorMsg: 'Halt time/unit is required' },
				}),
			}),
		};
	}, [haltTime]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	controls.forEach((field, index) => {
		if (field === 'halt_time_unit' && haltTime.halt_time_value) {
			controls[index] = {
				...controls[index],
				rules: {
					required: true,
				},
			};
		}
	});

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.heading}>Return Journey</div>
			</div>

			<div className={styles.flex}>
				<div className={styles.route_touch_point_container}>
					<div className={styles.location_container}>
						<div className={styles.label}>Pickup Point</div>
						<div className={styles.location_text}>
							{location.destination?.display_name}
						</div>
					</div>

					<div className={styles.touch_point_container}>
						<div className={styles.arrow}>
							<IcMPortArrow />
						</div>

						<TouchPoint
							searchData={searchData}
							touchPointsToggle={touchPointsToggle}
							validate={validate}
							ref={(r) => {
              	ftlRef.current.TouchPointsRef = r;
							}}
							setTouchPointsToggle={setTouchPointsToggle}
							location={location}
						/>
					</div>

					<div className={styles.location_container}>
						<div className={styles.label}>Delivery Point</div>
						<div className={styles.location_text}>{location.origin?.display_name}</div>
					</div>
				</div>

				<div className={styles.halt_time_container}>
					<div className={styles.label}>Halt Time</div>

					<FormElement control={control} controls={controls} showButtons errors={errors} />
					{error ? <div className={styles.error_msg}>{error}</div> : null}
				</div>
			</div>
		</div>
	);
}

export default forwardRef(ReturnJourney);
