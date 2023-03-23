import {
	useRef,
	forwardRef,
	useImperativeHandle,
	useCallback,
	useEffect,
} from 'react';
import { Flex } from '@cogoport/front/components';
import Layout from '@cogo/business-modules/form/Layout';
import { useFormCogo } from '@cogoport/front/hooks';
import { get } from '@cogoport/front/utils';
import Icon from '../icons/ic-arrow-right.svg';
import TouchPoint from '../SearchForm/TouchPoint';
import controls from './controls';
import {
	LocationContainer,
	LocationText,
	Container,
	TouchPointContainer,
	Label,
	Arrow,
	Heading,
	HaltTimeContainer,
	RouteTouchPointContainer,
	ErrorMsg,
} from './styles';

const ReturnJourney = (
	{
		location,
		touchPointsToggle,
		setTouchPointsToggle = () => {},
		error,
		searchData = {},
	},
	ref,
) => {
	const ftlRef = useRef({});

	const haltData =
		get(searchData, 'touch_points.primary_service.destination[0]') || {};

	const {
		fields,
		formState: { errors },
		watch,
		setValues,
	} = useFormCogo(controls);

	const formValues = watch();

	useEffect(() => {
		if (Object.keys(haltData).length) {
			setValues({
				halt_time_value: haltData.halt_time_value,
				halt_time_unit: haltData.halt_time_unit,
			});
		}
	}, [haltData]);

	const haltTime = {
		halt_time_value: formValues.halt_time_value || '',
		halt_time_unit: formValues.halt_time_unit || '',
	};

	const validate = async () => {
		const validateData = await ftlRef.current.TouchPointsRef.handleSubmit();

		return validateData;
	};

	const imperativeHandle = useCallback(() => {
		const haltTimeData = Object.values(haltTime).filter((item) => item !== '');
		const isError = haltTimeData.length === 1;

		return {
			handleSubmit: () => {
				return {
					hasError: isError,
					...(!isError && { values: { ...haltTime } }),
					...(isError && {
						errors: { errorMsg: 'Halt time/unit is required' },
					}),
				};
			},
		};
	}, [haltTime]);

	useImperativeHandle(ref, imperativeHandle, [imperativeHandle]);

	Object.keys(fields).forEach((field) => {
		if (field === 'halt_time_unit' && haltTime.halt_time_value) {
			fields[field] = {
				...fields[field],
				rules: {
					required: true,
				},
			};
		}
	});

	return (
		<Container>
			<Flex>
				<Heading>Return Journey</Heading>
			</Flex>

			<Flex width="100%">
				<RouteTouchPointContainer>
					<LocationContainer>
						<Label>Pickup Point</Label>
						<LocationText>{location.destination?.display_name}</LocationText>
					</LocationContainer>

					<TouchPointContainer>
						<Arrow>
							<Icon type="arrow-search" size={1.1} />
						</Arrow>

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
					</TouchPointContainer>

					<LocationContainer>
						<Label>Delivery Point</Label>
						<LocationText>{location.origin?.display_name}</LocationText>
					</LocationContainer>
				</RouteTouchPointContainer>

				<HaltTimeContainer>
					<Label>Halt Time</Label>

					<Layout controls={controls} fields={fields} errors={errors} />

					{error ? <ErrorMsg>{error}</ErrorMsg> : null}
				</HaltTimeContainer>
			</Flex>
		</Container>
	);
};

export default forwardRef(ReturnJourney);
