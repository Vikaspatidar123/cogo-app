/* eslint-disable react-hooks/exhaustive-deps */
import { Popover, Modal, cl } from '@cogoport/components';
import React, { useState, useEffect, useMemo } from 'react';

import { getControls } from '../utils/handleOptionsChange';
import mutateMainFields from '../utils/mutate-fields';
import showElementsFunc from '../utils/show-elements';

import AdditionalServices from './AdditionalServices';
import MainControls from './MainControls';
import PillInput from './PillsInput';
import DateRangeBox from './PillsInput/DateRangeBox';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryDetails from '@/ui/commons/utils/getCountryDetails';

const mainServices = ['fcl_freight', 'lcl_freight', 'air_freight'];

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const INDIA_COUNTRY_DETAILS = getCountryDetails({
	country_id: INDIA_COUNTRY_ID,
});

const INDIA_COUNTRY_CODE = INDIA_COUNTRY_DETAILS?.country_code;

function Options({
	mode = '',
	fields: mainFieldsProp = {},
	location = {},
	optionsControls = {},
	advancedControls = [],
	submit = () => {},
	setOptions = () => {},
	options = {},
	services = {},
	setServices = () => {},
	mobile = false,
	setLocation = () => {},
	className = '',
	formProps = {},
	loading = false,
	search_type = '',
	index = 0,
	disabledFields = {},
	date = {},
	setDate = () => {},
	validityErr = '',
	operatorName = {},
	contractType = '',
	...rest
}) {
	const [show, setShow] = useState(false);
	const [errors, setErrors] = useState({});
	const [showAdvance, setShowAdvance] = useState(false);
	const [packageInformation, setPackageInformation] = useState({});
	const optionFormControls = getControls(
		optionsControls.form,
		{},
		mode,
		location,
	);
	const {
		setValue,
		watch,
		handleSubmit,
		clearErrors,
		reset,
		control,
		register,
	} = useForm();
	const formValues1 = options.values || {};
	const formValues = { ...(formProps.formValues || {}), ...formValues1 };
	const allErrors = { ...(errors || {}), ...(formProps?.errors || {}) };
	const showElements = useMemo(
		() => showElementsFunc({
			...formProps,
			advancedControls,
			formValues,
			mode,
			location,
			services,
		}),
		[formValues, services],
	);

	const mainFields = mutateMainFields({
		fields : mainFieldsProp,
		mode,
		location,
		services,
		data   : {},
	});
	const handleToggle = (e, flag) => {
		if (e) {
			e.preventDefault();
		}
		setShow(flag || !show);
	};

	const onError = (err) => {
		setErrors(err);
	};

	const handleApply = (values) => {
		// submit(values);
		if (values) {
			const {
				container_type_commodity,
				weight_and_volume = {},
				...restProps
			} = values;
			let restValues = {
				...(weight_and_volume || {}),
				...(container_type_commodity || {}),
			};
			optionFormControls.forEach((item) => {
				if (restProps[item.name]) {
					restValues = {
						...restValues,
						[item.name]: restProps[item.name],
					};
				}
			});
			setOptions({
				values : { ...restValues, packages: packageInformation },
				error  : null,
				handleSubmit,
				onError,
				date   : options?.date || {},
			});

			setShow(!show);
		}
	};
	const handleIncotermChange = () => {
		const incoKey = (optionFormControls || []).find(
			(key) => key.name === 'inco_term',
		)?.name;
		if (incoKey && mode === 'fcl_freight') {
			if (location?.origin?.country_code === INDIA_COUNTRY_CODE) {
				setValue(incoKey, 'cif');
			} else {
				setValue(incoKey, 'fob');
			}
		} else if (incoKey) {
			setValue(incoKey, '');
		}
	};
	const handleModeChangeReset = () => {
		reset();
		handleIncotermChange();

		let valuesToRefresh = {};
		optionFormControls.forEach((item) => {
			if (formValues1?.value && !item.value) {
				valuesToRefresh = { ...valuesToRefresh, [item.name]: '' };
			}
			if (item.value) {
				valuesToRefresh = {
					...valuesToRefresh,
					[item.name]: item.value,
				};
			}
		});
		Object.keys(valuesToRefresh).forEach((key) => {
			setValue(key, valuesToRefresh[key]);
		});
	};

	const clearFromPrevious = () => {
		let valuesToRefresh = {};
		optionFormControls.forEach((item) => {
			if (item.type === 'fieldArray') {
				const childEmptyValues = {};
				(item.controls || []).forEach((controlItem) => {
					childEmptyValues[controlItem.name] = controlItem.value || '';
				});
				valuesToRefresh[item.name] = [childEmptyValues];
			} else {
				valuesToRefresh = { ...valuesToRefresh, [item.name]: '' };
			}
		});
		Object.keys(valuesToRefresh).forEach((key) => {
			setValue(key, valuesToRefresh[key]);
		});
	};

	const pillsValues = {
		...formValues1,
		...(formValues1?.weight_and_volume || {}),
		...formValues1?.container_type_commodity,
	};
	const renderMainControls = () => (
		<MainControls
			mode={mode}
			errors={allErrors}
			controls={optionFormControls}
			fields={optionFormControls}
			control={control}
			onShowAdvanced={() => {
				setShow(false);
				setShowAdvance(true);
			}}
			onClose={() => setShow(false)}
			onSubmit={handleSubmit(handleApply, onError)}
			mobile={mobile}
			showElements={{}}
			setValue={setValue}
			formValues={formValues}
			search_type={search_type}
			index={index}
			clearPreviousValues={clearFromPrevious}
			contractType={contractType}
		/>
	);

	const renderPillsInput = (action) => (
		<PillInput
			onFocus={handleToggle}
			onClick={handleToggle}
			name="options"
			value={pillsValues}
			show={show}
			showCaret
			error={options?.error}
			className={search_type === 'rfq' ? className : 'small'}
			action={action}
			operatorName={operatorName}
		/>
	);

	const handleSetValues = (value) => {
		const valuesToSet = {};
		optionFormControls.forEach((item) => {
			if (value[item.name]) {
				valuesToSet[item.name] = value[item.name];
			}
		});
		setOptions({
			values: {
				...valuesToSet,
				packages: Object.keys(packageInformation).length
					? packageInformation
					: undefined,
			},
			error : null,
			handleSubmit,
			onError,
			date  : options?.date || {},
		});
	};

	useEffect(() => {
		const subscription = watch((value) => {
			if (errors) {
				clearErrors();
				handleSetValues(value);
			} else {
				handleSetValues(value);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, mode]);

	useEffect(() => {
		if (search_type !== 'rfq' || index === 0) {
			handleIncotermChange();
		}
	}, [location?.origin?.country_code]);

	useEffect(() => {
		handleModeChangeReset();
	}, [mode]);

	const handleReset = (name, value) => {
		setValue(name, value);
	};

	const handlePackageDetails = (value) => {
		let total_packages_count = 0;
		(value?.packages || []).map((item) => {
			total_packages_count += parseInt(item?.packages_count, 10);
			return total_packages_count;
		});

		setValue('weight', value?.weight);
		setValue('volume', value?.volume);
		setValue('packages_count', total_packages_count || 1);
		setPackageInformation(value?.packages);
	};
	const fields = {};
	const fieldKey = optionFormControls.map((controlItem) => {
		const registerValues = register(controlItem.name, {
			...(controlItem.rules || {}),
		});
		const field = { ...controlItem, ...registerValues };
		fields[controlItem.name] = field;
		return controlItem.name;
	});
	if (fieldKey.includes('commodity')) {
		fields.commodity.onChange = handleReset;
	}
	if (fieldKey.includes('cbm_calculator')) {
		fields.cbm_calculator.onChange = handlePackageDetails;
	}
	const handlePopover = () => {
		if (!disabledFields?.container_details) {
			if (!mobile) {
				return (
					<Popover
						placement="bottom-start"
						interactive
						render={renderMainControls()}
						visible={show}
						onClickOutside={() => setShow(false)}
					>
						{renderPillsInput()}
					</Popover>
				);
			}
			return renderPillsInput();
		}
		if (disabledFields?.container_details && index === 0) {
			return (
				<Popover
					placement="bottom-start"
					theme="light"
					interactive
					content={renderMainControls()}
					visible={show}
					onClickOutside={() => setShow(false)}
				>
					{renderPillsInput()}
				</Popover>
			);
		}
		return renderPillsInput('disable');
	};

	const additionalServices = () => showAdvance && (
		<AdditionalServices
			{...rest}
			show={showAdvance}
			location={location}
			mode={mode}
			controls={optionFormControls}
			optionsFields={optionFormControls}
			advancedControls={advancedControls}
			fields={mainFields}
			submit={submit}
			services={services}
			setServices={setServices}
			mobile={mobile}
			setLocation={setLocation}
			showElements={showElements}
			formValues={formValues}
			errors={allErrors}
			loading={loading}
			onClose={() => {
				setServices({});
				setShowAdvance(false);
			}}
			search_type={search_type}
			className={className}
			index={index}
			disabledFields={disabledFields}
			control={control}
			setValue={setValue}
		/>
	);

	const handleServices = () => {
		if (search_type === 'rfq') {
			if (mainServices.includes(mode)) {
				return (
					<div style={{ width: '100%', marginLeft: '16px' }}>
						{index === 0 ? (
							<div className={styles.label}>
								ADDITIONAL SERVICES
							</div>
						) : null}
						{additionalServices()}
					</div>
				);
			}
			return null;
		}
		return additionalServices();
	};
	return (
		<div className={cl`${styles.container} ${styles[search_type]}`}>
			{search_type === 'rfq' ? (
				<div
					style={{ width: mainServices.includes(mode) ? '100%' : '50%' }}
				>
					{index === 0 ? (
						<div
							className={cl`${styles.label} ${styles.search_form_options_container_col__label}`}
						>
							Container Details
						</div>
					) : null}
					{handlePopover()}
				</div>
			) : (
				<div style={{ width: '100%' }}>{handlePopover()}</div>
			)}

			<div className={`${styles.date_select_container}`}>
				<div className={styles.label}>VALIDITY DATE</div>
				<DateRangeBox date={date} setDate={setDate} mobile={mobile} />
				<div style={{ fontSize: '12px', color: '#CB6464' }}>
					{validityErr}
				</div>
			</div>

			<div className={styles.mobile_web}>
				<Modal
					show={show && mobile}
					onClose={() => setShow(false)}
					fullscreen
					closable={false}
				>
					{renderMainControls()}
				</Modal>
			</div>

			{handleServices()}
		</div>
	);
}

export default Options;
