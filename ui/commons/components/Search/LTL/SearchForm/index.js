import { isEmpty } from '@cogoport/utils';
import React, {
	useEffect,
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';

import getHandleSubmitDetails from '../utils/getHandleSubmitDetails';

import getControls from './form.controls';
import Goods from './Goods';
import Load from './Load';
// import { Container, Main, Section, Options } from './styles';
import Route from './Route';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import { useSelector } from '@/packages/store';

function SearchForm(
	{ mode = '', isEdit = false, index = 0, searchData, error, extraParams },
	ref,
) {
	const { detail = {} } = searchData || {};
	let locationPrefilling = {};
	if (!isEmpty(detail)) {
		locationPrefilling = {
			destination: {
				id: detail?.destination_location?.id,
				display_name:
					detail?.destination_location?.display_name
					|| detail?.destination_location?.name,
			},
			origin: {
				id: detail?.origin_location?.id,
				display_name:
					detail?.origin_location?.display_name
					|| detail?.origin_location?.name,
			},
		};
	}
	// const { keywords } = usei18n();
	const [location, setLocation] = useState(locationPrefilling);
	const { isMobile: mobile } = useSelector(({ general }) => ({
		isMobile: general.isMobile,
	}));

	const searchFormRef = useRef({});
	const controls = getControls();
	const useFormProps = useForm();

	const { reset, control } = useFormProps;

	const [origin, destination] = controls;
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => getHandleSubmitDetails({ refObj: searchFormRef.current }),
	}));

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<form>
					<div>
						<div className={styles.section}>
							<Route
								ref={(r) => {
									searchFormRef.current.route = r;
								}}
								origin={controls.find((x) => x.name === origin?.name)}
								setLocation={setLocation}
								location={location}
								destination={controls.find((x) => x.name === destination?.name)}
								// keywords={keywords}
								error={error?.route?.errorMsg}
								control={control}
								index={index}
								mobile={mobile}
								mode={mode}
								searchData={searchData}
								extraParams={extraParams}
								isEdit={isEdit}
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
				/>
				<Load
					ref={(r) => {
						searchFormRef.current.load = r;
					}}
					searchData={searchData}
					error={error?.load?.errorMsg}
				/>
			</div>
		</div>
	);
}

export default forwardRef(SearchForm);
