import SelectControler from '@cogo/business-modules/form/components/Controlled/ControlledLocation';
import Icon from '@cogo/deprecated_legacy/icons/Icon';
import { replace } from '@cogo/i18n';
import { useSelector } from '@cogo/store';
import { isEmpty } from '@cogoport/front/utils';
import React, { forwardRef, useImperativeHandle } from 'react';

import styles from './styles.module.css';

function Route(
	{
		origin = {},
		destination = {},
		location = {},
		setLocation = () => {},
		keywords = [],
		index = 0,
		mobile = false,
		mode = '',
		error: errorMsg,
		extraParams,
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
			<div className={styles.label}>{showArrow ? 'Pickup Point ' : origin?.label}</div>
		);
		const destinationLabel = (
			<div className={styles.label}>{showArrow ? 'Delivery Point' : destination?.label}</div>
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

				<SelectControler
					id={`search_${origin.name}`}
					{...origin}
					caret={false}
					placeholder={replace(origin.placeholder || '', keywords)}
					noOptionsMessage="Type to search..."
					disabled={index !== 0}
					value={location?.origin?.id}
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
				/>
				{errorMsg?.origin ? <ErrorMsg>Origin Port is required</ErrorMsg> : null}
			</div>

			<div className={styles.arrow_section}>
				{showArrow && (
					<Arrow>
						<Icon type="arrow-search" size={1.1} />
					</Arrow>
				)}
			</div>

			<div className={styles.section}>
				{handleLabel('destination')}

				<SelectControler
					id={`search_${destination.name}`}
					{...destination}
					caret={false}
					optionsListKey="locations_v2"
					noOptionsMessage="Type to search..."
					value={location?.destination?.id}
					placeholder={replace(destination.placeholder || '', keywords)}
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
				/>
				{errorMsg?.destination ? (
					<div className={styles.error_msg}>Destination Port is required</div>
				) : null}
			</div>
		</div>
	);
}

export default forwardRef(Route);
