import { Popover, TabPanel, Button, cl } from '@cogoport/components';
import {
	IcALocation, IcMArrowRotateDown, IcMMinusInCircle, IcMPlusInCircle, IcMSearchlight, IcMArrowNext, IcMArrowBack,
} from '@cogoport/icons-react';
import { format, isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.css';

import {
	SelectController, InputNumberController,
	InputController, AsyncSelectController,
	TabsController,
} from '@/packages/forms';

export const MAX_LIMIT = 3;
function AirForm({
	markers = {},
	setMarkers = () => { },
	defaultProps = {},
	recaptchaRef,
	executeCaptcha,
	renderComponent: RecentSearches,
	recentSearches = () => { },
}) {
	const isObjectValuesDefined = (obj) => Object.values(obj).every((value) => typeof value !== 'undefined');

	const [originPopOver, setOriginPopOver] = useState(false);
	const [destPopOver, setDestPopOver] = useState(false);

	const [originDetails, setOriginDetails] = useState({});
	const [destDetails, setDestDetails] = useState({});

	const formProps = isObjectValuesDefined(defaultProps) ? defaultProps : {};
	const router = useRouter();
	const { locale } = router;
	const { origin, destination } = router.query;
	const methods = useForm({
		defaultValues: {
			input_number: 1,
			input_count: 1,
			select: 'box',
			air_tabs: 'cubic_metre',
			...formProps,
		},
	});

	const { handleSubmit, formState: { errors }, setValue } = methods;

	const [amountLabel, setAmountLabel] = useState('Volume');

	const count = methods.watch('input_number');
	const amount = methods.watch('input_count');
	const type = methods.watch('select');
	const tabValue = methods.watch('air_tabs');
	const originId = methods.watch('select_origin');
	const destinationId = methods.watch('select_destination');

	const amountLabelHandler = (value) => {
		if (['CBM', 'CC', 'CFT'].includes(value)) {
			setAmountLabel('Volume');
		} else {
			setAmountLabel('Weight');
		}
	};

	useEffect(() => {
		setMarkers({});
	}, [setMarkers]);

	useEffect(() => {
		if (origin && destination) {
			setOriginDetails((prev) => ({
				...prev,
				port_code: origin,
			}));
			setDestDetails((prev) => ({
				...prev,
				port_code: destination,
			}));
		}
	}, [origin, destination]);

	useEffect(() => {
		const valueKeys = {
			cubic_metre: 'CBM',
			cubic_centi: 'CC',
			cubic_feet: 'CFT',
			kilogram: 'KG',
			pounds: 'LB',
			pallet: 'Pallet',
			box: 'Box',
			crate: 'Crate',
			loose: 'Loose',
		};

		amountLabelHandler(valueKeys[tabValue]);
		methods.setValue(
			'input',
			`${count} Shipments, ${amount} ${amountLabel}, ${valueKeys[tabValue]}, ${valueKeys[type]}`,
		);
	}, [count, methods, type, tabValue, amount, amountLabel]);

	const popoverOptions = [
		{ label: 'Pallet', value: 'pallet' },
		{ label: 'Box', value: 'box' },
		{ label: 'Crate', value: 'crate' },
		{ label: 'Loose', value: 'loose' },
	];

	const renderComp = () => (
		<div className={styles.popover}>
			<TabsController
				name="air_tabs"
				className={styles.tab}
			>
				<TabPanel name="cubic_metre" title="CBM" />
				<TabPanel name="cubic_centi" title="CC" />
				<TabPanel name="cubic_feet" title="CFT" />
				<TabPanel name="kilogram" title="KG" />
				<TabPanel name="pounds" title="LB" />
			</TabsController>

			<div className={styles.content}>
				<div className={styles.count_container}>
					<p>
						{amountLabel}
					</p>
					<InputNumberController
						name="input_count"
						min={1}
						className={styles.input_count}
					/>
				</div>
				<div className={styles.count_container}>
					<p>
						By Shipment Total
					</p>
					<div className={styles.count}>
						<IcMMinusInCircle
							className={styles.minus}
							onClick={() => {
								if (count > 1) {
									methods.setValue('input_number', count - 1);
								}
							}}
						/>
						<InputNumberController
							name="input_number"
							arrow={false}
							min={1}
							size="lg"
							className={styles.input_number}
						/>
						<IcMPlusInCircle
							className={styles.plus}
							onClick={() => {
								methods.setValue('input_number', count + 1);
							}}
						/>
					</div>
				</div>

				<div className={styles.count_container}>
					<p>
						Package Type
					</p>
					<SelectController
						name="select"
						className={styles.select}
						options={popoverOptions}
						placeholder="Select Package Type"
					/>
				</div>
			</div>
		</div>
	);

	const exists = () => !!recentSearches?.air?.find(
		(rSearch) => rSearch.originPortCode === originDetails.port_code
			&& rSearch.destinationPortCode === destDetails.port_code
			&& rSearch.amount === amount
			&& rSearch.count === count
			&& rSearch.tabValue === tabValue
			&& rSearch.type === type,
	);

	const getPayload = () => {
		const {
			display_name: originDisplayName,
			name: originName,
			id: origin_id,
			port_code: originPortCode,
			display_pos: originDisplayPos,
			is_icd: originIsicd,
		} = originDetails;

		const {
			display_name: destinationDisplayName,
			name: destinationName,
			id: destination_id,
			port_code: destinationPortCode,
			display_pos: destinationDisplayPos,
			is_icd: destinatoinIsicd,
		} = destDetails;

		const res = {
			originDisplayName,
			originName,
			originId: origin_id,
			originPortCode,
			originDisplayPos,
			originIsicd,

			destinationDisplayName,
			destinationName,
			destinationId: destination_id,
			destinationPortCode,
			destinationDisplayPos,
			destinatoinIsicd,

			amount,
			tabValue,
			type,
			count,
			time: format(new Date(), 'dd MMMM yyyy'),
		};

		return res;
	};

	const saveSearch = () => {
		const airRecentSearches = recentSearches?.air || [];
		if (!exists()) {
			if (airRecentSearches?.length >= MAX_LIMIT) {
				// remove the first element from the air recent searches array
				// to add new element
				airRecentSearches.shift();
			}

			const payload = getPayload();
			airRecentSearches.push(payload);
		}
		localStorage.setItem('recent_searches', JSON.stringify({
			...recentSearches,
			air: airRecentSearches,
		}));
	};

	const onSubmit = async (values, event) => {
		event.preventDefault();
		const reCaptchaToken = await executeCaptcha();

		// const res = await trigger({
		// 	params: {
		// 		google_recaptcha_response: reCaptchaToken,
		// 	},
		// });

		recaptchaRef?.current?.reset();

		// if (res.data) {
		saveSearch();
		router.push({
			pathname: '/discovery-rates/[id]/[origin]/[destination]',
			query: {
				id: 'air',
				origin: originDetails.port_code,
				destination: destDetails.port_code,
				unit: tabValue,
				amount,
				volume: amountLabel === 'Volume' ? amount : 1,
				weight: amountLabel === 'Weight' ? amount : 1,
				shipments: count,
				package_type: type,
			},
			locale,
		});
		// }
	};

	const handleRecentSearchClick = (idx) => {
		const {
			originDisplayName,
			originName,
			originId: origin_id,
			originPortCode,
			originDisplayPos,
			originIsicd,

			destinationDisplayName,
			destinationName,
			destinationId: destination_id,
			destinationPortCode,
			destinationDisplayPos,
			destinatoinIsicd,

			count: newCount,
			amount: newAmount,
			type: newType,
			tabValue: newTabValue,
		} = recentSearches.air[idx];
		setOriginDetails({
			display_name: originDisplayName,
			name: originName,
			id: origin_id,
			port_code: originPortCode,
			display_pos: originDisplayPos,
			is_icd: originIsicd,
		});
		setDestDetails({
			display_name: destinationDisplayName,
			name: destinationName,
			id: destination_id,
			port_code: destinationPortCode,
			display_pos: destinationDisplayPos,
			is_icd: destinatoinIsicd,
		});
		setMarkers({
			origin: {
				latitude: originDisplayPos?.[0],
				longitude: originDisplayPos?.[1],
			},
			destination: {
				latitude: destinationDisplayPos?.[0],
				longitude: destinationDisplayPos?.[1],
			},
		});
		setValue('select_origin', origin_id);
		setValue('select_destination', destination_id);
		setValue('input_number', newCount);
		setValue('input_count', newAmount);
		setValue('select', newType);
		setValue('air_tabs', newTabValue);
	};

	const handleSelectClick = (isOrigin = true) => {
		(originId === '' && destinationId === ''
			&& recentSearches?.air);
		{
			if (isOrigin) {
				setOriginPopOver(true);
			} else {
				setDestPopOver(true);
			}
		}
	};

	const handleOriginChange = (val, options) => {
		if (options) {
			const {
				display_name,
				name,
				id,
				port_code,
				display_pos,
				is_icd,
			} = options;
			setOriginDetails({
				display_name,
				name,
				id,
				port_code,
				display_pos,
				is_icd,
			});
			localStorage.setItem('isOriginIcd', options.is_icd);
		}
		setMarkers({
			...markers,
			origin: {
				latitude: options?.latitude,
				longitude: options?.longitude,
			},
		});
	};

	const handleDestinationChange = (val, options) => {
		if (options) {
			const {
				display_name,
				name,
				id,
				port_code,
				display_pos,
				is_icd,
			} = options;
			setDestDetails({
				display_name,
				name,
				id,
				port_code,
				display_pos,
				is_icd,
			});
			localStorage.setItem('isDestinationIcd', options.is_icd);
		}
		setMarkers({
			...markers,
			destination: {
				latitude: options?.latitude,
				longitude: options?.longitude,
			},
		});
	};

	return (
		<div className={styles.container}>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={cl`
						${styles.search_container}
						${errors.select_destination ? styles.search_container_error : ''}
					`}
					>
						<div
							role="presentation"
							className={styles.selectcontainer}
							onClick={() => handleSelectClick(true)}
						>
							<Popover
								offset={[0, 2]}
								placement="bottom-start"
								caret={false}
								render={(
									<RecentSearches
										type="air"
										handleRecentSearchClick={handleRecentSearchClick}
										recentSearches={recentSearches}
									/>
								)}
								visible={originPopOver}
								onClickOutside={() => setOriginPopOver(false)}
							>
								<AsyncSelectController
									name="select_origin"
									asyncKey="locations"
									prefix={isEmpty(originId)
										? <IcALocation width={24} height={24} />
										: null}
									// placeholder={t('origin_placeholder')}
									toggleSearch={setOriginPopOver}
									className={styles.location_search}
									isClearable
									animateLoading
									rules={{ required: 'Please select origin' }}
									handleChange={handleOriginChange}
									style={{ width: '270px' }}
									params={{ filters: { type: ['airport', 'country'] } }}

								/>
							</Popover>
							{errors.select_origin && (
								<p
									className={styles.error}
								>
									{errors.select_origin.message}
								</p>
							)}
						</div>
						<div
							className={styles.arrows}
							role="presentation"
							onClick={() => {
								methods.setValue('select_origin', destinationId || null);
								methods.setValue('select_destination', originId || null);
								setOriginDetails({ ...destDetails });
								setDestDetails({ ...originDetails });
								setMarkers({
									origin: markers.destination,
									destination: markers.origin,
								});
							}}
						>
							<IcMArrowNext />
							<IcMArrowBack style={{ marginTop: '-6px' }} />
						</div>
						<div
							role="presentation"
							className={styles.selectcontainer}
							onClick={() => handleSelectClick(false)}
						>
							<Popover
								offset={[0, 2]}
								placement="bottom-start"
								caret={false}
								render={(
									<RecentSearches
										type="air"
										handleRecentSearchClick={handleRecentSearchClick}
										recentSearches={recentSearches}
									/>
								)}
								visible={destPopOver}
								onClickOutside={() => setDestPopOver(false)}
							>
								<AsyncSelectController
									name="select_destination"
									asyncKey="locations"
									prefix={isEmpty(destinationId)
										? <IcALocation width={24} height={24} />
										: null}
									// placeholder={t('destination_placeholder')}
									className={styles.location_search}
									toggleSearch={setDestPopOver}
									isClearable
									animateLoading
									rules={{ required: 'Please select destination' }}
									handleChange={handleDestinationChange}
									style={{ width: '270px' }}
									params={{ filters: { type: ['airport', 'country'] } }}

								/>

							</Popover>
							{errors.select_destination && (
								<p
									className={styles.error}
								>
									{errors.select_destination.message}
								</p>
							)}
						</div>

					</div>

					<div className={styles.divider} />
					<div
						className={cl`
								${styles.details_container}
								${cl.ns('popover_container')}
							`}
					>
						<Popover
							offset={[0, 2]}
							placement="bottom-start"
							caret={false}
							render={renderComp()}
						>
							<InputController
								name="input"
								placeholder="Tracking Details"
								className={styles.input_content}
								readonly
								suffix={<IcMArrowRotateDown style={{ marginRight: 8 }} />}
							/>
						</Popover>
						<Button
							size="lg"
							className={cl`
								${styles.gtm_track_buttonicon}
								${cl.ns('gtm_track_search')}
							`}
							type="submit"
						>
							<IcMSearchlight className={styles.gtm_track_search} />
						</Button>
					</div>
				</form>

			</FormProvider>
		</div>
	);
}

export default AirForm;
