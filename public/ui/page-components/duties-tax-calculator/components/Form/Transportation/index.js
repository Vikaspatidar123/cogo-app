/* eslint-disable react-hooks/exhaustive-deps */
import { cl, Button } from '@cogoport/components';
import { IcALocation, IcMArrowNext } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect, useRef } from 'react';

import getField from '../../../../../../packages/forms/Controlled';
import { transportationControls } from '../../../configuration/controls';
import transportFn from '../../../utils/transportFn';
import style from '../styles.module.css';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const TRANSPORT_MODE_MAPPING = [
	{
		mode   : 'OCEAN',
		imgUrl : GLOBAL_CONSTANTS.image_url.vessel_icon,
		gifUrl : GLOBAL_CONSTANTS.image_url.vessel_gif,
		text   : 'form_transport_ocean',
	},
	{
		mode   : 'AIR',
		imgUrl : GLOBAL_CONSTANTS.image_url.plane_icon,
		gifUrl : GLOBAL_CONSTANTS.image_url.plane_gif,
		text   : 'form_transport_air',
	},
];

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
	const { t } = useTranslation(['common', 'dutiesTaxesCalculator']);
	const [rotate, setRotate] = useState(false);
	const initialRef = useRef(true);

	const transportFields = transportationControls({ transportMode, t });
	const { control, handleSubmit, watch, reset } = formHook;

	const [origin, destination] = watch(['originPort', 'destinationPort']);
	const {
		interchangeValuesHandler,
		portDetailsHandler,
		checkPort,
		submitHandler,
		errorHandler,
	} = transportFn({
		t,
		setRotate,
		setPortDetails,
		setFormData,
		setStepper,
		setFormStepper,
		setValue,
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
			reset({});
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
				<div>{t('dutiesTaxesCalculator:form_transport_title')}</div>
			</div>
			<form>
				<div className={`${styles.tabs}`}>
					{TRANSPORT_MODE_MAPPING.map((info) => (
						<div
							key={info.text}
							className={cl`${transportMode === info.mode && styles.selected} ${styles.card}`}
							role="presentation"
							onClick={() => setTransportMode(info.mode)}
						>
							{transportMode === info.mode && <div className={styles.dot} />}
							<Image
								src={info.mode === transportMode ? info.gifUrl : info.imgUrl}
								alt={t('dutiesTaxesCalculator:transport')}
								width={88}
								height={60}
							/>
							<div className={styles.txt}>{t(`dutiesTaxesCalculator:${info.text}`)}</div>
						</div>
					))}
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
											<Image
												src={GLOBAL_CONSTANTS.image_url.interchange}
												alt={t('dutiesTaxesCalculator:interchange')}
												width={20}
												height={20}
											/>
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
						{t('common:continue')}
						<IcMArrowNext />
					</Button>
				</div>
			</form>
		</div>
	);
}

export default Transportation;
