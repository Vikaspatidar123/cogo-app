import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { forwardRef, useImperativeHandle } from 'react';

import styles from './styles.module.css';

import { AsyncSelectController } from '@/packages/forms';
import { useSelector } from '@/packages/store';

function Route(
	{
		origin = {},
		destination = {},
		location = {},
		setLocation = () => {},
		// keywords = [],
		index = 0,
		mobile = false,
		mode = '',
		error: errorMsg,
		extraParams,
		control,
		isEdit,
	},
	ref,
) {
	const { showArrow = true } = destination || {};
	const { org_id: app_org_id } = useSelector(({ general }) => ({
		org_id: general.query.org_id,
	}));

	const org_id = extraParams?.id || app_org_id;

	const handleLabel = (locationKey) => {
		const originLabel = (
			<div className={styles.label}>
				{showArrow ? 'Pickup Point ' : origin?.label}
			</div>
		);
		const destinationLabel = (
			<div className={styles.label}>
				{showArrow ? 'Delivery Point' : destination?.label}
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

	const imperativeHandle = () => ({
		handleSubmit: async () => {
			const isError = Object.keys(location).length !== 2;

			return {
				hasError: isError,
				...(!isError && { values: { location } }),
				...(isError && {
					errors: {
						errorMsg: {
							origin      : isEmpty(location.origin),
							destination : isEmpty(location.destination),
						},
					},
				}),
			};
		},
	});

	useImperativeHandle(ref, imperativeHandle);
	return (
		<div className={styles.container} id="search_form_route_container">
			<div className={styles.Section}>
				{handleLabel('origin')}

				<AsyncSelectController
					id={`search_${origin.name}`}
					{...origin}
					caret={false}
					placeholder={origin.placeholder || ''}
					noOptionsMessage="Type to search..."
					disabled={index !== 0}
					value={location?.origin?.id}
					control={control}
					params={{
						...(origin.params || {}),
						filters     : origin?.params?.filters,
						preferences : {
							organization_id : org_id,
							service_type    : mode,
						},
					}}
					handleChange={(obj) => {
						setLocation({
							...location,
							origin: { ...(obj || {}), formName: origin.display_name },
						});
					}}
					searchParams={{
						intent          : 'rate_search',
						organization_id : org_id,
						service_type    : mode,
					}}
					className={`${isEdit && styles.edit}`}
				/>
				{errorMsg?.origin ? (
					<div className={styles.error_msg}>Origin Port is required</div>
				) : null}
			</div>

			<div className={styles.arrow_section}>
				{showArrow && (
					<div className={styles.arrow}>
						<IcMPortArrow type="arrow-search" size={1.1} />
					</div>
				)}
			</div>

			<div className={styles.section}>
				{handleLabel('destination')}

				<AsyncSelectController
					id={`search_${destination.name}`}
					{...destination}
					caret={false}
					control={control}
					asyncKey="locations"
					noOptionsMessage="Type to search..."
					value={location?.destination?.id}
					placeholder={destination.placeholder || ''}
					handleChange={(obj) => {
						setLocation({
							...location,
							destination: {
								...(obj || {}),
								formName: destination.display_name,
							},
						});
					}}
					params={{
						...(destination.params || {}),
						filters     : destination?.params?.filters,
						preferences : {
							organization_id : org_id,
							service_type    : mode,
						},
					}}
					searchParams={{
						intent          : 'rate_search',
						organization_id : org_id,
						service_type    : mode,
					}}
					className={`${isEdit && styles.edit}`}
				/>
				{errorMsg?.destination ? (
					<div className={styles.error_msg}>Destination Port is required</div>
				) : null}
			</div>
		</div>
	);
}

export default forwardRef(Route);
