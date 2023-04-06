// import Layout from '@cogo/business-modules/form/Layout';
// import { useFormCogo } from '@cogoport/front/hooks';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';

import getControls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import getWidth from '@/ui/page-components/discover_rates/common/SearchForm/utils/getWidth';

function Route({
	isOriginPincodeChecked = false,
	isDestinationPincodeChecked = false,
	location = {},
	setLocation = () => {},
	onServiceTypeClick = false,
	setOnServiceTypeClick = () => {},
	formError = {},
	extraParams,
	setToggleState = () => {},
}, ref) {
	const { route = {} } = formError || {};

	const controls = getControls({
		setLocation,
		location,
		org_id: extraParams?.id,
		setToggleState,
	});
	const {
		formState = () => {},
		watch = () => {},
		setValue,
		setError,
		control,
		handleSubmit,
	} = useForm();
	const { errors = {} } = formState || {};
	const watchPickupLocation = watch('pickup_location');
	const watchDeliveryLocation = watch('delivery_location');

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (v) => v;
			const onError = (v) => v;

			return new Promise((resolve) => {
				handleSubmit(
					(data) => resolve(onSubmit(data)),
					(error) => resolve(onError(error)),
				)();
			});
		},
	}));
	useEffect(() => {
		if (isOriginPincodeChecked) {
			setValue('pickup_location', isOriginPincodeChecked);
		}
		if (isDestinationPincodeChecked) {
			setValue('delivery_location', isDestinationPincodeChecked);
		}
	}, []);

	useEffect(() => {
		let object = location;
		if (!watchPickupLocation) {
			setValue('origin_address', null);
			object = {
				...object,
				origin_pincode_checkbox: false,
			};
		} else {
			object = {
				...object,
				origin_pincode_checkbox: true,
			};
		}

		if (!watchDeliveryLocation) {
			setValue('destination_address', null);
			object = {
				...object,
				destination_pincode_checkbox: false,
			};
		} else {
			object = {
				...object,
				destination_pincode_checkbox: true,
			};
		}

		setLocation({ ...object });
	}, [watchPickupLocation, watchDeliveryLocation]);

	useEffect(() => {
		if (route.origin) {
			if (isEmpty(location?.origin)) {
				setError('origin', {
					type    : 'custom',
					message : 'Origin is required',
				});
			} else {
				setError('origin', {
					type    : 'custom',
					message : '',
				});
			}
		}

		if (location.origin_pincode_checkbox && route.origin_pincode) {
			if (isEmpty(location?.origin_pincode)) {
				setError('origin_address', {
					type    : 'custom',
					message : 'Origin pincode is required',
				});
			} else {
				setError('origin_address', {
					type    : 'custom',
					message : '',
				});
			}
		}

		if (route.destination) {
			if (isEmpty(location?.destination)) {
				setError('destination', {
					type    : 'custom',
					message : 'Destination is required',
				});
			} else {
				setError('destination', {
					type    : 'custom',
					message : '',
				});
			}
		}

		if (location.destination_pincode_checkbox && route.destination_pincode) {
			if (isEmpty(location?.destination_pincode)) {
				setError('destination_address', {
					type    : 'custom',
					message : 'destination pincode is required',
				});
			} else {
				setError('destination_address', {
					type    : 'custom',
					message : '',
				});
			}
		}
	}, [formError, JSON.stringify(location)]);

	useEffect(() => {
		if (!onServiceTypeClick) {
			return;
		}

		if (!isEmpty(location?.origin) && !isEmpty(location?.destination)) {
			setValue('origin', null);
			setValue('destination', null);
			setLocation((pv) => ({
				...pv,
				origin      : {},
				destination : {},
			}));
		}

		setOnServiceTypeClick(false);
	}, [onServiceTypeClick]);

	const showElements = useMemo(
		() => controls.reduce((pv, cv) => {
			const { name = '' } = cv;

			let showElement = true;
			if (name === 'origin_address' && !watchPickupLocation) {
				showElement = false;
			}
			if (name === 'destination_address' && !watchDeliveryLocation) {
				showElement = false;
			}

			if (name === 'origin_empty' && watchPickupLocation) {
				showElement = false;
			}

			if (name === 'destination_empty' && watchDeliveryLocation) {
				showElement = false;
			}

			return { ...pv, [name]: showElement };
		}, {}),
		[watchPickupLocation, watchDeliveryLocation],
	);
	return (
		<div className={styles.container}>
			{controls.map((item) => {
				const Element = getField(item.type);
				const show = showElements[item.name];
				return (
					show && (
						<div className={styles.field} style={{ width: getWidth(item?.span) }}>
							<div className={styles.lable}>{item.labelShow}</div>
							<Element {...item} control={control} />
							{errors && (
								<div className={styles.errors}>
									{errors[item?.name]?.message}
								</div>
							)}
						</div>
					)
				);
			})}

		</div>
	);
}

export default forwardRef(Route);
