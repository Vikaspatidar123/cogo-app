// import { replace } from '@cogo/i18n';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

// import CUSTOM_THEME from './custom-theme';

import styles from './styles.module.css';

import { AsyncSelectController } from '@/packages/forms';
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
	keywords = [],
	className = '',
	errors,
	search_type = '',
	index = 0,
	mobile = false,
	mode = '',
	extraParams,
	disabledFields = {},
	control,
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
			<div className={`${styles.label}${styles.margin_below}`}>
				{showArrow ? 'ORIGIN OF SHIPMENT' : origin?.label}
			</div>
		);
		const destinationLabel = (
			<div className={`${styles.label}${styles.margin_below}`}>
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
	return (
		<div className={styles.container} id="search_form_route_container">
			<div className={`${styles.section}${styles[className]}`}>
				{handleLabel('origin')}

				<AsyncSelectController
					id={`search_${origin.name}`}
					key={`search_${origin.name}`}
					{...origin}
					control={control}
					caret
					placeholder={origin.placeholder || ''}
					noOptionsMessage="Type to search..."
					asyncKey="locations2"
					value={location?.origin?.id}
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

			<div className={`${styles.section}${styles[className]}`}>
				{handleLabel('destination')}

				{singleLocationServices.includes(mode) ? (
					<AsyncSelectController
						id={`search_${destination.name}`}
						value={location?.destination?.id}
						{...destination}
						control={control}
						noOptionsMessage="Type to search..."
						placeholder={destination.placeholder || ''}
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
						id={`search_${destination.name}`}
						{...destination}
						control={control}
						caret
						asyncKey="locations2"
						noOptionsMessage="Type to search..."
						placeholder={destination.placeholder || ''}
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
						params={{
            	...(destination.params || {}),
            	filters     : destination?.params?.filters,
            	preferences : {
            		organization_id : extraParams?.id || org_id,
            		service_type    : mode,
            	},
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
