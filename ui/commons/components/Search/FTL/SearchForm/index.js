// import usei18n from '@cogo/i18n';
import { isEmpty } from '@cogoport/utils';
import React, {
	useEffect,
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';

import EditIcon from '../icons/edit-icon.svg';
import ReturnJourney from '../ReturnJourney';
import getHandleSubmitDetails from '../utils/getHandleSubmitDetails';

import getControls from './form.controls';
import Goods from './Goods';
import Load from './Load';
import Route from './Route';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

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
	// const { keywords } = usei18n();
	const mobile = false;

	let locationPrefilling = {};
	if (!isEmpty(detail)) {
		locationPrefilling = {
			destination: {
				id: detail.destination_location?.id,
				display_name:
          detail.destination_location?.display_name
          || detail.destination_location?.name,
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

	const useFormProps = useForm();
	const { fields, reset, control } = useFormProps;

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

	useImperativeHandle(ref, () => ({
		handleSubmit: () => getHandleSubmitDetails({ refObj: searchFormRef.current }),
	}));

	return (
		<>
			{typeOfJourney === 'round' ? (
				<div className={styles.header}>
					<div className={styles.heading}>Forward Journey Details</div>
					<div
						role="presentation"
						className={styles.icon}
						onClick={() => setTypeOfJourney('one_way')}
					>
						<EditIcon />
						Edit
					</div>
				</div>
			) : null}
			<div className={styles.container}>
				<div className={styles.main}>
					<form>
						<div className={styles.row}>
							<div className={styles.section}>
								<Route
									ref={(r) => {
                  	searchFormRef.current.route = r;
									}}
									origin={controls.find((x) => x.name === originControl.name)}
									setLocation={setLocation}
									location={location}
									destination={controls.find(
                  	(x) => x.name === destinationControl.name,
									)}
                  // keywords={keywords}
									error={error?.route?.errorMsg}
									index={index}
									mobile={mobile}
									mode={mode}
									searchData={searchData}
									typeOfJourney={typeOfJourney}
									touchPointsToggle={touchPointsToggle}
									extraParams={extraParams}
									control={control}
								/>
							</div>
						</div>
					</form>
				</div>

				<div className={styles.options}>
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
				</div>
			</div>

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
