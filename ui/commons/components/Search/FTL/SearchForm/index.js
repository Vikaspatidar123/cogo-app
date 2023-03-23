import usei18n from '@cogo/i18n';
import { useSelector } from '@cogo/store';
import { Grid } from '@cogoport/front/components';
import useForm from '@cogoport/front/hooks/useFormCogo';
import React, {
	useEffect,
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';
import isEmpty from '@cogo/utils/isEmpty';
import Route from './Route';
import Load from './Load';
import Goods from './Goods';
import {
	Container,
	Main,
	Section,
	Options,
	Heading,
	Header,
	Icon,
} from './styles';
import getHandleSubmitDetails from '../utils/getHandleSubmitDetails';
import getControls from './form.controls';
import EditIcon from '../icons/edit-icon.svg';
import ReturnJourney from '../ReturnJourney';

const { Row } = Grid;

function SearchForm(
	{
		mode = '',
		isEdit = false,
		index = 0,
		searchData = {},
		error,
		typeOfJourney = '',
		setTypeOfJourney,
		touchPointsToggle = [],
		setTouchPointsToggle = () => {},
		extraParams,
	},
	ref,
) {
	const { detail = {} } = searchData || {};
	const { keywords } = usei18n();
	const { isMobile: mobile } = useSelector(({ general }) => ({
		isMobile: general.isMobile,
	}));

	let locationPrefilling = {};
	if (!isEmpty(detail)) {
		locationPrefilling = {
			destination: {
				id: detail.destination_location?.id,
				display_name:
					detail.destination_location?.display_name ||
					detail.destination_location?.name,
			},
			origin: {
				id: detail.origin_location?.id,
				display_name:
					detail.origin_location?.display_name || detail.origin_location?.name,
			},
		};
	}

	const [location, setLocation] = useState(locationPrefilling);

	const searchFormRef = useRef({});

	const controls = getControls();

	const useFormProps = useForm(controls);
	const { fields, reset } = useFormProps;

	const [originControl, destinationControl] = controls;

	useEffect(() => {
		if (!isEdit) {
			reset();
		}

		if (!isEmpty(locationPrefilling)) {
			setLocation({
				...locationPrefilling,
			});
		} else {
			setLocation({});
		}
	}, [mode]);

	useImperativeHandle(ref, () => {
		return {
			handleSubmit: () => {
				return getHandleSubmitDetails({ refObj: searchFormRef.current });
			},
		};
	});

	return (
		<>
			{typeOfJourney === 'round' ? (
				<Header>
					<Heading>Forward Journey Details</Heading>
					<Icon onClick={() => setTypeOfJourney('one_way')}>
						<EditIcon />
						Edit
					</Icon>
				</Header>
			) : null}

			<Container>
				<Main>
					<form>
						<Row>
							<Section xs={12} md={12} sm={12}>
								<Route
									ref={(r) => {
										searchFormRef.current.route = r;
									}}
									origin={fields[originControl?.name]}
									setLocation={setLocation}
									location={location}
									destination={fields[destinationControl?.name]}
									keywords={keywords}
									error={error?.route?.errorMsg}
									index={index}
									mobile={mobile}
									mode={mode}
									searchData={searchData}
									typeOfJourney={typeOfJourney}
									touchPointsToggle={touchPointsToggle}
									extraParams={extraParams}
								/>
							</Section>
						</Row>
					</form>
				</Main>

				<Options>
					<Goods
						ref={(r) => {
							searchFormRef.current.good = r;
						}}
						searchData={searchData}
						error={error?.good?.errorMsg}
						typeOfJourney={typeOfJourney}
					/>
					<Load
						ref={(r) => {
							searchFormRef.current.load = r;
						}}
						searchData={searchData}
						error={error?.load?.errorMsg}
						typeOfJourney={typeOfJourney}
						location={location}
					/>
				</Options>
			</Container>

			{typeOfJourney === 'round' ? (
				<ReturnJourney
					ref={(r) => {
						searchFormRef.current.haltTime = r;
					}}
					location={location}
					searchData={searchData}
					error={error?.haltTime?.errorMsg}
					touchPointsToggle={touchPointsToggle}
					setTouchPointsToggle={setTouchPointsToggle}
				/>
			) : null}
		</>
	);
}

export default forwardRef(SearchForm);
