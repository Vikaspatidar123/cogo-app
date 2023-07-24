import { cl } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

import { AsyncSelectController, SelectController } from '@/packages/forms';
import { useSelector } from '@/packages/store';

const singleLocationServices = [
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'fcl_freight_local',
	'lcl_freight_local',
	'air_freight_local',
];

function Route({
	origin = {},
	destination = {},
	location = {},
	setLocation = () => {},
	// keywords = [],
	className = '',
	errors,
	search_type = '',
	index = 0,
	mobile = false,
	mode = '',
	extraParams,
	disabledFields = {},
	control,
	isEdit,
	setValue,
}) {
	const { showArrow = true } = destination || {};
	const { org_id } = useSelector(({ profile, general }) => ({
		org_id       : general?.query?.org_id,
		organization : profile?.organization,
	}));

	let marginTop = '36px';
	if (search_type === 'rfq' && index !== 0) {
		marginTop = '20px';
	}

	const handleLabel = (locationKey) => {
		const originLabel = (
			<div className={cl`${styles.label} ${styles.margin_below}`}>
				{showArrow ? 'ORIGIN OF SHIPMENT' : origin?.label}
			</div>
		);
		const destinationLabel = (
			<div className={`${styles.label} ${styles.margin_below}`}>
				{showArrow ? 'DESTINATION OF SHIPMENT' : destination?.label}
			</div>
		);

		if (mobile) {
			if (locationKey === 'origin') {
				return originLabel;
			}
			return destinationLabel;
		}
		if (!mobile && index === 0) {
			if (locationKey === 'origin') {
				return originLabel;
			}
			return destinationLabel;
		}
		return null;
	};
	useEffect(() => {
		if (isEdit) {
			setValue('origin_port_id', location?.origin?.id || location?.origin?.value);
			setValue('destination_port_id', location?.destination?.id || location?.destination?.value);
		}
	}, [isEdit, location, setValue]);
	return (
		<div className={styles.container} id="search_form_route_container">
			<div className={cl`${styles.section} ${styles[className]}`}>
				{handleLabel('origin')}

				<AsyncSelectController
					{...origin}
					id={`search_${origin.name}` || `${location?.origin?.id}`}
					key={`search_${origin.name}_${location?.origin?.id}`}
					control={control}
					initialCall
					caret
					placeholder={origin.placeholder || ''}
					noOptionsMessage="Type to search..."
					disabled={
							disabledFields?.origin
							&& index !== 0
							&& !singleLocationServices.includes(mode)
						}
					params={{
						...(origin.params || {}),
						filters     : origin?.params?.filters,
						preferences : {
							organization_id : extraParams?.id || org_id,
							service_type    : mode,
						},
					}}
					handleChange={(obj) => {
						setLocation({
							...location,
							origin: { ...(obj || {}), formName: origin.name },
						});
					}}
					searchParams={{
						intent          : 'rate_search',
						organization_id : extraParams?.id || org_id,
						service_type    : mode,
					}}

				/>
				{errors[origin.name] ? (
					<div className={styles.error}>{errors[origin.name]?.message}</div>
				) : null}
			</div>

			{showArrow && (
				<div className={styles.arrow} style={{ marginTop }}>
					<IcMPortArrow width={16} height={16} />
				</div>
			)}

			<div className={cl`${styles.section} ${styles[className]}`}>
				{handleLabel('destination')}

				{singleLocationServices.includes(mode) ? (
					<SelectController
						id={`search_${destination.name}`}
						{...destination}
						control={control}
						noOptionsMessage="Type to search..."
						placeholder={destination.placeholder || ''}
						value={location?.destination?.id}
						initialCall
						disabled={
              disabledFields?.destination
              && index !== 0
              && !singleLocationServices.includes(mode)
            }
						handleChange={(obj) => {
							setLocation({
								...location,
								destination: { ...(obj || {}), formName: destination.name },
							});
						}}
					/>
				) : (
					<AsyncSelectController
						id={`search_${destination.name}` || `${location?.destination?.id}`}
						key={`search_${destination.name}` || `${location?.destination?.id}`}
						{...destination}
						control={control}
						initialCall
						caret
						placeholder={destination.placeholder || ''}
						noOptionsMessage="Type to search..."
						disabled={
							disabledFields?.destination
							&& index !== 0
							&& !singleLocationServices.includes(mode)
							}
						params={{
							...(destination.params || {}),
							filters     : destination?.params?.filters,
							preferences : {
								organization_id : extraParams?.id || org_id,
								service_type    : mode,
							},
						}}
						handleChange={(obj) => {
							setLocation({
								...location,
								destination: { ...(obj || {}), formName: destination.name },
							});
						}}
						searchParams={{
							intent          : 'rate_search',
							organization_id : extraParams?.id || org_id,
							service_type    : mode,
						}}
					/>
				)}
				{errors[destination.name] ? (
					<div className={styles.error}>
						{errors[destination.name]?.message}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Route;
