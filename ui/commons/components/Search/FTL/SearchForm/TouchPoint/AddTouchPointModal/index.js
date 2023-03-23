import { Button, toast } from '@cogoport/front/components/admin';
import useFormCogo from '@cogoport/front/hooks/useFormCogo';
import { React, useState, useEffect, forwardRef } from 'react';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import getField from '../../../../../../form/components';
import {
	Container,
	Title,
	BtnWrapper,
	InputField,
	ErrorMessage,
	InputContainer,
	Content,
	AddIconContainer,
	Wrapper,
} from './styles';
import List from './List';

const Location = getField('location-select');

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const location_control = [
	{
		name: 'touch_point_location_id',
		type: 'location-select',
		placeholder: 'Enter Location',
		optionsListKey: 'locations',
		defaultOptions: true,
		caret: false,
		params: {
			apply_sorting: false,
			filters: {
				type: ['pincode', 'seaport', 'airport', 'city'],
				country_id: [INDIA_COUNTRY_ID],
			},
		},
		theme: 'admin',
		size: 'lg',
		rules: { required: 'Required' },
	},
];

const AddTouchPointModal = ({
	onClick,
	touchPointItems,
	setTouchPointItems = () => {},
	validate,
	typeOfJourney,
	location = {},
}) => {
	const [value, setValue] = useState({
		id: '',
		display_name: '',
		name: '',
		trip_type: typeOfJourney,
		error: false,
	});

	const [touchPoints, setTouchPoints] = useState(touchPointItems);

	const handleObj = (obj = {}) => {
		const { display_name = '', name = '', id } = obj;

		if (id === location.origin?.id || id === location.destination?.id) {
			setValue((prev) => {
				return {
					...prev,
					error: true,
				};
			});
			return;
		}

		setValue({
			id,
			display_name,
			name,
			trip_type: typeOfJourney,
			error: false,
		});
	};

	const onSubmit = () => {
		if (value?.error) {
			return;
		}
		const currId = value.id;

		for (let i = 0; i < touchPoints.length; i += 1) {
			if (touchPoints[i].id === currId) {
				toast.error('Selected touch point already exists in route');
				return;
			}
		}

		setTouchPoints((previousState) => {
			return [...previousState, value];
		});
	};

	const onDeleteTouchPoint = (index) => {
		setTouchPoints([
			...touchPoints.slice(0, index),
			...touchPoints.slice(index + 1, touchPoints.length),
		]);
	};

	const {
		fields,
		setValue: setLocationValue = () => {},
		formState,
		handleSubmit,
	} = useFormCogo(location_control);

	const { errors } = formState;

	useEffect(() => {
		setLocationValue('touch_point_location_id', '');
		setValue('');
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
		<Container>
			<Title>Add Touch points</Title>

			<Content>
				<InputField>
					<InputContainer>
						<Wrapper>
							<Location
								{...fields.touch_point_location_id}
								handleChange={(obj) => handleObj(obj)}
							/>
							{value?.error ? (
								<ErrorMessage className="touchpoint_error">
									Touchpoint must be diffrent from origin and destination!!
								</ErrorMessage>
							) : null}
						</Wrapper>

						<AddIconContainer>
							<Button onClick={handleSubmit(onSubmit)}>Add</Button>
						</AddIconContainer>
					</InputContainer>

					{Object.keys(errors?.touch_point_location_id || {}).length ? (
						<ErrorMessage>Location is required</ErrorMessage>
					) : null}
				</InputField>

				<List
					touchPoints={touchPoints}
					onDeleteTouchPoint={onDeleteTouchPoint}
					setTouchPoints={setTouchPoints}
				/>

				<BtnWrapper>
					<Button
						className="secondary md"
						onClick={() => {
							onCancel();
						}}
					>
						Cancel
					</Button>

					<Button className="primary md" onClick={handleSave}>
						Save
					</Button>
				</BtnWrapper>
			</Content>
		</Container>
	);
};

export default forwardRef(AddTouchPointModal);
