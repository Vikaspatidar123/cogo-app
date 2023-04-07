// import usei18n from '@cogo/i18n';
import { Checkbox, Toast, cl, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';

import useCreateSearch from '../../hooks/useCreateSearch';

import Options from './Options';
import Route from './Route';
import styles from './styles.module.css';
import getControls from './utils/getControls';
import getWidth from './utils/getWidth';

import { useForm } from '@/packages/forms';
import FTL from '@/ui/commons/components/Search//FTL';
// eslint-disable-next-line import/no-cycle
import Haulage from '@/ui/commons/components/Search//Haulage';
import LTL from '@/ui/commons/components/Search//LTL';
// import RailDomestic from '@/ui/commons/components/Search//RailDomestic';
import Air from '@/ui/commons/components/Search/Air';
import AirLocals from '@/ui/commons/components/Search/AirLocals';

const containerDetailsModes = [
	'fcl_freight',
	'trailer_freight',
	'haulage_freight',
	'fcl_customs',
];

const getRFQControls = (optControls, index) => optControls.form.map((item) => ({
	...item,
	name: `${index}-${item.name}`,
}));

function Form(
	{
		mode = '',
		extraParams = {},
		data = {},
		onPush = () => {},
		isEdit = false,
		className = '',
		search_type = '',
		index = 0,
		disabledFields = {},
		form_id = '',
		validityErr = '',
		scope,
		searchData = {},
		importer_exporter_details = {},
		serviceDetails = {},
		detail = {},
		contractType = '',
	},
	ref,
) {
	const { is_org_pass_through } = extraParams;

	// const { keywords } = usei18n();

	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [location, setLocation] = useState({});
	const [errors, setErrors] = useState({});
	const [checked, setChecked] = useState(false);
	const [services, setServices] = useState({ ...(data?.services || {}) });
	const [options, setOptions] = useState({
		getOptions : null,
		values     : null,
		error      : null,
		getValues  : null,
	});
	const [date, setDate] = useState({});
	const isChannelPartner = false;

	useEffect(() => {
		if (search_type === 'rfq') {
			setServices(data?.services || {});
		}
	}, [data?.services]);

	const {
		optionsControls,
		advancedControls,
		restControls,
		operatorName = {},
	} = getControls(
		mode,
		data,
		// mobile,
		location,
		isChannelPartner,
		index,
		is_org_pass_through,
	);

	if (search_type === 'rfq') {
		optionsControls.form = getRFQControls(optionsControls, index);
	}

	const allControls = [...restControls, ...advancedControls];
	const useFormProps = useForm();
	const {
		watch,
		setValue,
		reset,
		handleSubmit,
		unregister,
		getValues,
		control,
	} = useFormProps;

	const formValues = watch();

	const showElementsFuncProps = {
		formValues,
		setValue,
		unregister,
		reset,
		watch,
		errors,
	};

	const { submitRfq_Contract, submitData } = useCreateSearch({
		optionsControls,
		options,
		setOptions,
		extraParams,
		setLoading,
		mode,
		services,
		location,
		onPush,
		importer_exporter_details,
		checked,
	});

	const submit = async (values, e) => {
		if (e) {
			e.preventDefault();
		}
		const { formData } = await submitRfq_Contract(values);
		return formData;
	};

	const onError = (errs) => {
		setErrors(errs);
	};

	const applyServices = () => {
		if (
			formValues?.export_transportation_packages
      && formValues?.export_transportation_packages?.length === 0
		) {
			Toast.error('Packages cannot be empty');
			return;
		}
		setShow(false);
	};

	const [origin, destination] = allControls;

	const isSmall = className.includes('small');

	useEffect(() => {
		if (!isEdit) {
			reset();
		}
		if (data?.location) {
			setLocation(data?.location);
		} else {
			setLocation({
				origin      : { formName: origin?.name, value: origin?.value },
				destination : { formName: destination?.name, value: destination?.value },
			});
		}
	}, [mode]);

	useImperativeHandle(ref, () => ({
		handleSubmit,
		submit,
		onError,
		services,
		location,
		getValues,
		options,
		searchMode: mode,
		form_id,
		date,
	}));

	let cargoDetailsSpan = 3;
	if (
		(isSmall && !['rfq', 'contract'].includes(search_type))
    || scope === 'app'
	) {
		cargoDetailsSpan = 3.5;
	} else if (
		mode !== 'trailer_freight'
    && ['rfq', 'contract'].includes(search_type)
	) {
		cargoDetailsSpan = 6;
	} else if (mode === 'trailer_freight') {
		cargoDetailsSpan = 3.5;
	}

	let locationsSpan = 6;
	if (
		(isSmall && mode !== 'trailer_freight' && search_type !== 'rfq')
    || scope === 'app'
	) {
		locationsSpan = 7.5;
	} else if (mode === 'trailer_freight') {
		locationsSpan = 5;
	}
	if (mode === 'ftl_freight') {
		return (
			<FTL
				extraParams={extraParams}
				data={searchData}
				search_type="ftl_freight"
				onPush={onPush}
			/>
		);
	}

	if (mode === 'ltl_freight') {
		return (
			<LTL
				data={searchData}
				search_type={search_type}
				extraParams={extraParams}
				onPush={onPush}
			/>
		);
	}
	if (mode === 'air_freight') {
		return (
			<Air
				extraParams={extraParams}
				airFreightData={data}
				serviceDetails={serviceDetails}
				onPush={onPush}
				detail={detail}
			/>
		);
	}

	if (mode === 'haulage') {
		return (
			<Haulage
				mode={mode}
				extraParams={extraParams}
				search_type={search_type}
				data={searchData}
				airFreightData={data}
			/>
		);
	}
	if (mode === 'air_freight_local') {
		return (
			<AirLocals
				extraParams={extraParams}
				airFreightLocalsData={data}
				serviceDetails={serviceDetails}
				onPush={onPush}
			/>
		);
	}
	if (mode === 'rail_domestic_freight') {
		const {
			importer_exporter_id,
			importer_exporter_name,
			importer_exporter_branch_id,
			user_id,
		} = extraParams || {};

		const importerExporterDetails = {
			id       : importer_exporter_id,
			name     : importer_exporter_name,
			branchId : importer_exporter_branch_id,
			userId   : user_id,
		};

		return (
		// <RailDomestic
		// 	data={searchData}
		// 	importerExporterDetails={importerExporterDetails}
		// 	searchType={mode}
		// 	onPush={onPush}
		// />
			<div>RailDomestic</div>
		);
	}
	return (
		<div
			className={cl`${styles.search_form_container} ${styles.container} ${styles[className]
			} ${styles[search_type] || ''}`}
			style={{
				background: search_type === 'dashboard' ? '#f9f9f9' : '#ffffff',
			}}
		>
			<div className={cl`${styles.main} ${styles.search_type} ` || ''}>
				<div>
					<form onSubmit={handleSubmit(submitData, onError)}>
						<div className={styles.row}>
							<div
								className={styles.search_form_route_container_col}
								// style={{ width: getWidth(locationsSpan) }}
							>
								<Route
									origin={allControls.find((x) => x.name === origin?.name)}
									setLocation={setLocation}
									location={location}
									destination={allControls.find(
										(x) => x.name === destination?.name,
									)}
									// keywords={keywords}
									className={className}
									errors={errors}
									search_type={search_type}
									index={index}
									// mobile={mobile}
									mode={mode}
									extraParams={extraParams}
									disabledFields={disabledFields}
									control={control}
								/>
							</div>

							<div
								className={styles.search_form_options_container_col}
								// style={{ width: getWidth(cargoDetailsSpan) }}
							>
								{index === 0 && search_type !== 'rfq' ? (
									<div
										className={cl`${styles.label}
										${styles.search_form_options_container_col__label}`}
									>
										{containerDetailsModes.includes(mode)
											? 'Container Details'
											: 'Cargo Details'}
									</div>
								) : null}
								<Options
									location={location}
									optionsControls={optionsControls}
									fields={allControls}
									submit={handleSubmit(submitData, onError)}
									mode={mode}
									advancedControls={advancedControls}
									setOptions={setOptions}
									options={options}
									services={services}
									setServices={setServices}
									// mobile={mobile}
									setLocation={setLocation}
									className={className}
									formProps={showElementsFuncProps}
									loading={loading}
									search_type={search_type}
									index={index}
									disabledFields={disabledFields}
									setShowServices={setShow}
									showServices={show}
									applyServices={handleSubmit(applyServices, onError)}
									date={date}
									setDate={setDate}
									validityErr={validityErr}
									operatorName={operatorName}
									contractType={contractType}
								/>
							</div>

							{mode === 'trailer_freight' && (
								<div style={{ margin: 'auto' }}>
									<div
										className={styles.row}
										style={{
											marginTop      : '20px',
											alignItems     : 'center',
											justifyContent : 'center',
										}}
									>
										<Checkbox
											className="primary md"
											checked={checked}
											onChange={setChecked}
										/>
										<text
											style={{ marginLeft: '8px' }}
											size={12}
											color="#393F70"
										>
											Round Trip
										</text>
									</div>
								</div>
							)}

							{['rfq', 'contract', 'forecast'].includes(search_type) ? null : (
								<div
									className={cl`${styles.search_form_search_btn_container_col}
									${styles.search_form_section_search_btn}`}
									style={{
										display        : 'flex',
										justifyContent : 'center',
										paddingTop     : '22px',
										marginTop      : '2px',
									}}
								>
									<Button
										type="submit"
										id="search_form_sumbit_btn"
										isLoading={loading}
										disabled={loading}
										style={{
											background : '#2c3e50',
											padding    : '4px 8px',
											opacity    : loading ? 0.6 : 1,
										}}
									>
										<IcMSearchlight
											style={{
												margin : '2px 2px 0 0',
												width  : 24,
												height : 24,
											}}
										/>
									</Button>
								</div>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(Form);
