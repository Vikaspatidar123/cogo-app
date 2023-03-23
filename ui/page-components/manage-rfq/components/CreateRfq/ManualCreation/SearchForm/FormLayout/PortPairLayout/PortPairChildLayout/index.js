import { Toast } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { useState, useEffect, useMemo } from 'react';

import AdditionalServices from './AdditionalServices';
import BodyDetails from './BodyDetails';
import styles from './styles.module.css';

import Item from '@/ui/page-components/manage-rfq/common/Layout/Item';
import INCOTERM_OPTIONS from '@/ui/page-components/manage-rfq/configurations/SearchFormControls/inco-terms';
import getServiceslist from '@/ui/page-components/manage-rfq/helpers/getServiceslist';
import getCommoditySubType from '@/ui/page-components/manage-rfq/utils/getCommoditySubType';
import getwidth from '@/ui/page-components/manage-rfq/utils/getWidth';

function PortPairChildLayout(props) {
	const {
		controls,
		control,
		mode,
		field,
		index,
		name,
		setValue = () => {},
		error,
		showForm,
		resetField,
		editForm,
		watchSearchRates,
		originDetails,
		destinationDetails,
		setOriginDetails = () => {},
		setDestinationDetails = () => {},
		services,
		setServices = () => {},
		handleIndex,
		draftFormData,
	} = props;

	const [count, setCount] = useState(1);
	const [showServices, setShowServices] = useState(false);
	const formValues = watchSearchRates?.[index] || {};
	const calcBy = formValues?.calculate_by || 'total';
	const commodityType = formValues?.commodity_type || '';
	const incoTerm = formValues?.inco_term || '';

	const location = useMemo(
		() => ({
			origin      : originDetails?.[mode]?.[handleIndex] || {},
			destination : destinationDetails?.[mode]?.[handleIndex] || {},
		}),
		[originDetails, destinationDetails],
	);
	const handleOriginDetails = (val, key, idx, controlName) => {
		const destinationPort = destinationDetails?.[mode]?.[idx] || {};
		const originPort = originDetails?.[mode]?.[idx] || {};
		if (
			destinationPort.id
			&& val.country_code === destinationPort.country_code
		) {
			Toast.error('Origin and Destination can\'t be same country.');
			setValue(`search_rates.${index}.${controlName}`, originPort.id || '');
			setCount((prev) => prev + 1);
			setOriginDetails({
				...originDetails,
				[mode]: { ...originDetails?.[mode], [idx]: undefined },
			});
			return;
		}

		if (mode === 'air_freight') {
			setCount((prev) => prev + 1);
		}

		setOriginDetails({
			...originDetails,
			[mode]: { ...originDetails?.[mode], [idx]: val },
		});
	};

	const handleDestinationDetails = (val, key, idx, controlName) => {
		const originPort = originDetails?.[mode]?.[idx] || {};
		const destinationPort = destinationDetails?.[mode]?.[idx] || {};
		if (originPort.id && val.country_code === originPort.country_code) {
			Toast.error('Origin and Destination can\'t be same country.');
			setValue(
				`search_rates.${index}.${controlName}`,
				destinationPort.id || '',
			);
			setCount((prev) => prev + 1);
			setDestinationDetails({
				...destinationDetails,
				[mode]: { ...destinationDetails?.[mode], [idx]: val },
			});
			return;
		}

		if (mode === 'air_freight') {
			setCount((prev) => prev + 1);
		}

		setDestinationDetails({
			...destinationDetails,
			[mode]: { ...destinationDetails?.[mode], [idx]: val },
		});
	};

	const handleAdditionalServices = (val) => {
		setValue(`search_rates.${index}.additional_services`, val);
	};

	const checkCount =	(draftFormData?.formData?.fcl_freight?.data || []).length
		+ (draftFormData?.formData?.lcl_freight?.data || []).length
		+ (draftFormData?.formData?.air_freight?.data || []).length;

	const { handleServices } = getServiceslist({
		mode,
		incoTerm,
		originDetails,
		handleIndex,
		destinationDetails,
		formValues,
		services,
		setServices,
	});

	useEffect(() => {
		if ((editForm || showForm || checkCount === 0) && incoTerm) {
			handleServices();
		}
	}, [incoTerm]);

	const DEFAULT_OPTIONS = getCommoditySubType({
		originPort      : originDetails?.[mode]?.[handleIndex],
		destinationPort : destinationDetails?.[mode]?.[handleIndex],
		commodityType,
	});

	const handleCalculateBy = () => {
		if (mode === 'lcl_freight') {
			resetField(`search_rates.${index}.containers`);
			resetField(`search_rates.${index}.dimensions`);
		} else if (mode === 'air_freight') {
			resetField(`search_rates.${index}.containers`);
			resetField(`search_rates.${index}.dimensions`);
		}
	};

	let data = [];
	if (mode === 'air_freight') {
		data = [
			...controls.filter(
				(item) => item.name === 'origin_airport_id'
					|| item.name === 'destination_airport_id'
					|| item.name === 'cargo_ready_date'
					|| item.name === 'inco_term'
					|| item.name === 'commodity_type',
			),
		];

		if (commodityType !== '') {
			data = [
				...data,
				...controls.filter((item) => item.name === 'commodity_subtype'),
			];
		}
		data = [
			...data,
			...controls.filter(
				(item) => item.name === 'payment_type'
					|| item.name === 'additional_services'
					|| item.name === 'calculate_by',
			),
		];

		if (calcBy !== '') {
			const filtername = calcBy !== 'unit' ? 'containers' : 'dimensions';
			data = [...data, ...controls.filter((item) => item.name === filtername)];
		}
		data = [...data, ...controls.filter((item) => item.name === 'remarks')];
	} else if (mode === 'lcl_freight') {
		data = controls.filter(
			(item) => item.name !== 'dimensions' && item.name !== 'containers',
		);
		if (calcBy !== '') {
			const filtername = calcBy === 'unit' ? 'containers' : 'dimensions';
			data = controls.filter((item) => item.name !== filtername);
		}
	} else {
		data = controls;
	}

	return (
		<div className={styles.container}>
			<div className={styles.row} key={`${count}_render`}>

				{([...data] || []).map((controlItem) => {
					const schedules = `${name}.${index}.${controlItem.name}`;
					const { span = 6, type } = controlItem;
					let childErrors = [];
					if (controlItem.name === 'remarks') {
						childErrors = [...(error?.remarks || [])];
					} else {
						childErrors = [
							...((calcBy === 'unit' ? error?.dimensions : error?.containers)
								|| []),
						];
					}

					if (type === 'fieldArray') {
						return (
							<div className={styles.row_container} key={schedules}>
								<BodyDetails
									{...props}
									{...controlItem}
									index={index}
									key={index}
									container_name={name}
									container_index={index}
									control={control}
									error={childErrors}
									buttonText={controlItem?.addButton}
									watchSearchRates={watchSearchRates}
									handleIndex={handleIndex}
								/>
							</div>
						);
					}

					if (
						controlItem.name === 'origin_port_id'
						|| controlItem.name === 'origin_airport_id'
					) {
						return (
							<div
								className={styles.col}
								style={{ width: getwidth(span) }}
								key={schedules}
							>
								<div className={styles.row_container}>
									<div className={styles.section} type="origin">
										<Item
											{...controlItem}
											id={schedules}
											itemKey={schedules}
											control={control}
											name={schedules}
											value={field[controlItem.name]}
											error={error?.[controlItem.name]}
											handleChange={(val) => {
												handleOriginDetails(
													val,
													'origin',
													handleIndex,
													controlItem.name,
												);
											}}
										/>
									</div>
									<IcMPortArrow className={styles.icon_to_from} />
								</div>
							</div>
						);
					}

					if (
						controlItem.name === 'destination_port_id'
						|| controlItem.name === 'destination_airport_id'
					) {
						return (
							<div
								className={styles.col}
								style={{ width: getwidth(span) }}
								key={schedules}
							>
								<div className={styles.row_container}>
									<div className={styles.section}>
										<Item
											{...controlItem}
											id={schedules}
											itemKey={schedules}
											control={control}
											name={schedules}
											value={field[controlItem.name]}
											error={error?.[controlItem.name]}
											handleChange={(val) => {
												handleDestinationDetails(
													val,
													'destination',
													handleIndex,
													controlItem.name,
												);
											}}
										/>
									</div>
								</div>
							</div>
						);
					}
					if (controlItem.name === 'calculate_by') {
						return (
							<div
								className={styles.col}
								style={{ width: getwidth(span) }}
								key={schedules}
								// radioType={controlItem.type === 'radio'}
							>
								<Item
									{...controlItem}
									id={schedules}
									itemKey={schedules}
									control={control}
									name={schedules}
									value={field[controlItem.name] || 'total'}
									error={error?.[controlItem.name]}
									handleChange={(val) => {
										handleCalculateBy(val);
									}}
								/>
							</div>
						);
					}
					if (controlItem.name === 'commodity_type') {
						return (
							<div
								className={styles.col}
								style={{ width: getwidth(span) }}
								key={schedules}
							>
								<Item
									{...controlItem}
									id={schedules}
									itemKey={schedules}
									control={control}
									name={schedules}
									value={field[controlItem.name]}
									error={error?.[controlItem.name]}
									handleChange={() => {
										setCount((prev) => prev + 1);
									}}
								/>
							</div>
						);
					}
					if (controlItem.name === 'additional_services') {
						return (
							<div
								className={styles.col}
								style={{ width: getwidth(span) }}
								key={schedules}
							>
								<AdditionalServices
									location={location}
									mode={mode}
									services={services}
									setServices={setServices}
									setShowServices={setShowServices}
									showServices={showServices}
									mainValues={formValues}
									handleIndex={handleIndex}
									handleServices={handleServices}
									setAdditionalServices={handleAdditionalServices}
									additionalServiceValues={
										formValues?.additional_services || {}
									}
									index={index}
								/>
							</div>
						);
					}
					if (
						controlItem.name === 'commodity_subtype'
						|| controlItem.name === 'inco_term'
					) {
						return (
							<div
								className={styles.col}
								style={{ width: getwidth(span) }}
								key={schedules}
								// incoMenuSize={
								// 	mode === 'fcl_freight' && controlItem.name === 'inco_term'
								// }
							>
								<Item
									{...controlItem}
									id={schedules}
									itemKey={schedules}
									control={control}
									name={schedules}
									value={field[controlItem.name]}
									error={error?.[controlItem.name]}
									options={
										controlItem.name === 'inco_term'
											? INCOTERM_OPTIONS
											: DEFAULT_OPTIONS
									}
								/>
							</div>
						);
					}

					return (
						<div
							className={styles.col}
							style={{ width: getwidth(span) }}
							key={schedules}
						>
							<Item
								{...controlItem}
								{...(controlItem.rules || {})}
								id={schedules}
								itemKey={schedules}
								control={control}
								name={schedules}
								value={field[controlItem.name]}
								error={error?.[controlItem.name]}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PortPairChildLayout;
