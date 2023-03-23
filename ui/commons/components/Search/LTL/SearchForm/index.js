import React, {
	useEffect,
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';
import usei18n from '@cogo/i18n';
import { useSelector } from '@cogo/store';
import { Grid } from '@cogoport/front/components';
import useForm from '@cogoport/front/hooks/useFormCogo';
import isEmpty from '@cogo/utils/isEmpty';
import Route from './Route';
import Load from './Load';
import Goods from './Goods';
import { Container, Main, Section, Options } from './styles';
import getHandleSubmitDetails from '../utils/getHandleSubmitDetails';
import getControls from './form.controls';

const { Row } = Grid;

const SearchForm = (
	{ mode = '', isEdit = false, index = 0, searchData, error, extraParams },
	ref,
) => {
	const { detail = {} } = searchData || {};
	let locationPrefilling = {};
	if (!isEmpty(detail)) {
		locationPrefilling = {
			destination: {
				id: detail?.destination_location?.id,
				display_name:
					detail?.destination_location?.display_name ||
					detail?.destination_location?.name,
			},
			origin: {
				id: detail?.origin_location?.id,
				display_name:
					detail?.origin_location?.display_name ||
					detail?.origin_location?.name,
			},
		};
	}
	const { keywords } = usei18n();
	const [location, setLocation] = useState(locationPrefilling);
	const { isMobile: mobile } = useSelector(({ general }) => ({
		isMobile: general.isMobile,
	}));

	const searchFormRef = useRef({});
	const controls = getControls();
	const useFormProps = useForm(controls);

	const { fields, reset } = useFormProps;

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
	}, [mode]);

	useImperativeHandle(ref, () => {
		return {
			handleSubmit: () => {
				return getHandleSubmitDetails({ refObj: searchFormRef.current });
			},
		};
	});

	return (
		<Container>
			<Main>
				<form>
					<Row>
						<Section xs={12} md={12} sm={12}>
							<Route
								ref={(r) => {
									searchFormRef.current.route = r;
								}}
								origin={fields[origin?.name]}
								setLocation={setLocation}
								location={location}
								destination={fields[destination?.name]}
								keywords={keywords}
								error={error?.route?.errorMsg}
								index={index}
								mobile={mobile}
								mode={mode}
								searchData={searchData}
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
				/>
				<Load
					ref={(r) => {
						searchFormRef.current.load = r;
					}}
					searchData={searchData}
					error={error?.load?.errorMsg}
				/>
			</Options>
		</Container>
	);
};

export default forwardRef(SearchForm);
