/* eslint-disable react-hooks/exhaustive-deps */
import { cl, Button } from '@cogoport/components';
import { IcALocation, IcMArrowNext } from '@cogoport/icons-react';
import React, { useState, useEffect, useRef } from 'react';

import getField from '../../../../../../packages/forms/Controlled';
import { ShipGif, PlaneGif } from '../../../common/gif';
import { transportationControls } from '../../../configuration/controls';
import { InterChange, PlaneIcon, OceanIcon } from '../../../configuration/icon-configuration';
import transportFn from '../../../utils/transportFn';
import style from '../styles.module.css';

import styles from './styles.module.css';

function Transportation({
	transportMode,
	setTransportMode,
	setValue,
	setStepper,
	setFormStepper,
	setFormData,
	portDetails = {},
	setPortDetails,
	setPrevHs,
	setMapPoints,
	formHook,
}) {
	const [rotate, setRotate] = useState(false);
	const initialRef = useRef(true);

	const transportFields = transportationControls({ transportMode });
	const { control, formState: { errors }, handleSubmit, watch, reset } = formHook;

	const [origin, destination] = watch(['originPort', 'destinationPort']);

	const {
		interchangeValuesHandler,
		portDetailsHandler,
		checkPort,
		submitHandler,
		errorHandler,
	} = transportFn({
		setRotate,
		setPortDetails,
		setFormData,
		setStepper,
		setFormStepper,
		setValue,
		errors,
		transportMode,
		portDetails,
		origin,
		destination,
		setPrevHs,
	});

	useEffect(() => {
		if (initialRef.current) {
			initialRef.current = false;
		} else if (transportMode) {
			const obj = {
				originPort      : '',
				destinationPort : '',
			};
			reset({ ...obj });
			setPortDetails({});
			setMapPoints([]);
		}
	}, [transportMode]);

	useEffect(() => {
		if (origin && destination) {
			checkPort();
		}
	}, [origin, destination]);

	return (
		<div className={styles.container}>
			<div className={style.title}>
				<IcALocation />
				<div>Transportation Details</div>
			</div>
			<form>
				<div className={`${styles.tabs}`}>
					<div
						className={cl`${transportMode === 'OCEAN' && styles.selected} ${styles.card}`}
						role="presentation"
						onClick={() => setTransportMode('OCEAN')}
					>
						{transportMode === 'OCEAN' && <div className={styles.dot} />}

						{transportMode === 'OCEAN' ? (
							<img className={styles.image} src={ShipGif} alt="" />
						) : (
							<img src={OceanIcon} alt="" width={70} height={70} />
						)}
						<div className={styles.txt}>Ocean</div>
					</div>
					<div
						className={cl`${transportMode === 'AIR' && styles.selected} ${styles.card}`}
						role="presentation"
						onClick={() => setTransportMode('AIR')}
					>
						{transportMode === 'AIR' && <div className={styles.dot} />}
						{transportMode === 'AIR' ? (
							<img className={styles.image} src={PlaneGif} alt="" />
						) : (
							<img src={PlaneIcon} alt="" width={70} height={70} />
						)}
						<div className={styles.txt}>Air</div>
					</div>
				</div>

				<div className={styles.form_div}>
					{transportFields.map((config, index) => {
						const { name, type, label, keyName } = config;
						const Element = getField(type);

						return (
							<React.Fragment key={name}>
								<div className={style.col}>
									<p className={style.label}>{label}</p>
									<Element
										{...config}
										key={name}
										control={control}
										handleChange={(data) => portDetailsHandler(data, keyName)}
									/>
								</div>
								{index === 0 && (
									<div className={styles.inter_change_container}>
										<div
											className={cl`${rotate && styles.rotate_icn} ${styles.icn}`}
											role="presentation"
											onClick={interchangeValuesHandler}
										>
											<img src={InterChange} alt="" width="20px" height="20px" />
										</div>
									</div>
								)}
							</React.Fragment>
						);
					})}

				</div>
				<div className={style.btn_container}>
					<Button
						size="md"
						type="button"
						onClick={handleSubmit(submitHandler, errorHandler)}
					>
						Continue
						<IcMArrowNext />
					</Button>
				</div>
			</form>
		</div>
	);
}

export default Transportation;
