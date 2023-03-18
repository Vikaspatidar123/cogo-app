/* eslint-disable react-hooks/exhaustive-deps */
import { cl } from '@cogoport/components';
import { IcMPort, IcMLocation } from '@cogoport/icons-react';
import { useState, useImperativeHandle, useEffect, forwardRef } from 'react';

import transportControls from '../../../configuration/transportControls';
import useListLocation from '../../../hooks/useListLocation';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Transportation(props, ref) {
	const {
		transportMode, editOriginId = '', editDestinationID = '',
		originCountry = '', destinationCountry = '', setMapPoints, getOceanRoute,
	} = props || {};

	const [destinationPortDetails, setDestinationPortDetails] = useState({});
	const [originPortDetails, setOriginPortDetails] = useState({});

	const { getPortDetails } = useListLocation();

	const transportFields = transportControls({ transportMode });
	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	const changeHandler = (name, data) => {
		if (name === 'destinationId') {
			setDestinationPortDetails(data);
		} else {
			setOriginPortDetails(data);
		}
	};

	const getTransportDetailsEdit = async () => {
		const filter = {
			status : 'active',
			id     : [editOriginId, editDestinationID],
		};
		const resp = await getPortDetails(filter);
		const originData = resp?.[0]?.id === editOriginId ? resp?.[0] : resp?.[1];
		const destinationData = resp?.[1]?.id === editDestinationID ? resp?.[1] : resp?.[0];
		setOriginPortDetails({ ...originData, country: { name: originCountry } });
		setDestinationPortDetails({ ...destinationData, country: { name: destinationCountry } });
	};

	useEffect(() => {
		if (editOriginId && editDestinationID) {
			setValue('originId', editOriginId);
			setValue('destinationId', editDestinationID);
			getTransportDetailsEdit();
		}
	}, [editOriginId, editDestinationID]);

	useEffect(() => {
		if (transportMode && !editOriginId) {
			reset({
				originId      : null,
				destinationId : null,
			});
			setMapPoints([]);
		}
	}, [transportMode]);

	useEffect(() => {
		if (originPortDetails?.id && destinationPortDetails?.id) {
			if (transportMode === 'OCEAN') {
				getOceanRoute(originPortDetails?.id, destinationPortDetails?.id);
			} else if (transportMode === 'AIR') {
				setMapPoints([
					{
						departureLatitude  : originPortDetails?.latitude,
						departureLongitude : originPortDetails?.longitude,
						arrivalLatitude    : destinationPortDetails?.latitude,
						arrivalLongitude   : destinationPortDetails?.longitude,
					},
				]);
			}
		}
	}, [originPortDetails?.id, destinationPortDetails?.id]);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => values;
			const onError = (err) => ({ check: true, err });
			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(error) => resolve(onError(error)),
				)();
			});
		},
		destinationPortDetails,
		originPortDetails,
	}));

	return (
		<div className={styles.transport_container}>
			<div className={styles.header}>
				<IcMLocation width={22} height={22} fill="#db4634" />
				<h3 className={styles.title}>Transportation Details</h3>
			</div>
			{(transportFields || []).map((field, index) => {
				const Element = getField(field?.type);
				return (
					<div key={field?.key}>
						<div className={styles.col}>
							<p className={styles.label}>{field?.label}</p>
							<Element
								{...field}
								control={control}
								className={cl`${errors?.[field?.name] && styles.error} ${field?.className}`}
								handleChange={(value) => changeHandler(field?.name, value)}
							/>
							{/* {errors?.[field?.name]?.type && <p className={styles.error_text}>required</p>} */}
						</div>
						{index === 0 && (
							<div>
								<IcMPort width={22} height={22} />
							</div>
						)}
					</div>

				);
			})}
		</div>
	);
}

export default forwardRef(Transportation);
