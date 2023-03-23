import React, { useRef, useState } from 'react';
import { Button, toast, Toggle } from '@cogoport/front/components/admin';
import { BtnContainer, Container, ToggleContainer } from './styles';
import SearchForm from './SearchForm';
import useCreateSpotSearch from './hooks/useCreateSpotSearch';
import getFormattedTouchPointDataPayload from './utils/getFormattedTouchPointDataPayload';
import getPayLoad from './utils/getPayLoad';
import { getTouchPoints } from './utils/getTouchPoints';
import getFormattedTouchPointDataprefill from './utils/getFormattedTouchPointDataprefill';

const FTL = ({
	search_type = '',
	data: searchData = {},
	onPush,
	extraParams = {},
}) => {
	const { createSpotSearch, loading } = useCreateSpotSearch({
		extraParams,
		search_type,
		onPush,
	});
	const { returnJourneyTouchPoints } =
		getFormattedTouchPointDataprefill(searchData);

	const [touchPointsToggle, setTouchPointsToggle] = useState(
		returnJourneyTouchPoints,
	);

	const [error, setErrors] = useState({});

	const [typeOfJourney, setTypeOfJourney] = useState(
		searchData.detail?.trip_type || 'one_way',
	);

	const ftlRef = useRef({});

	const handleClick = async () => {
		const data = await ftlRef.current.searchForm?.handleSubmit();

		if (data?.hasError) {
			setErrors({
				...data?.errors,
			});
			return;
		}

		const ftl_freight_service_touch_points_attribute =
			getFormattedTouchPointDataPayload(data, touchPointsToggle);

		const payload = getPayLoad(data, typeOfJourney);

		createSpotSearch(ftl_freight_service_touch_points_attribute, payload);
		setTouchPointsToggle('');
	};

	const handleToggle = async (event) => {
		const data = await ftlRef.current.searchForm?.handleSubmit();

		if (data?.hasError && typeOfJourney !== 'round') {
			toast.error('Please fill all required fields!');
			setErrors({
				...data?.errors,
			});

			return;
		}

		const touchPointsData = await getTouchPoints(data);

		setTouchPointsToggle(touchPointsData);

		setTypeOfJourney(event);

		if (event === 'one_way') {
			setTouchPointsToggle([]);
		}
	};

	return (
		<Container>
			<SearchForm
				mode="ftl_freight"
				ref={(r) => {
					ftlRef.current.searchForm = r;
				}}
				typeOfJourney={typeOfJourney}
				setTypeOfJourney={setTypeOfJourney}
				searchData={searchData}
				error={error}
				touchPointsToggle={touchPointsToggle}
				setTouchPointsToggle={setTouchPointsToggle}
				extraParams={extraParams}
			/>

			<BtnContainer>
				<ToggleContainer>
					<Toggle
						offLabel={{ label: 'One-way', value: 'one_way' }}
						onLabel={{ label: 'Round Trip', value: 'round' }}
						value={typeOfJourney}
						onChange={(event) => handleToggle(event)}
					/>
				</ToggleContainer>

				<Button type="button" onClick={handleClick} disabled={loading}>
					Search Rates
				</Button>
			</BtnContainer>
		</Container>
	);
};

export default FTL;
