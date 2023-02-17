import { IcALocation, IcMArrowNext } from '@cogoport/icons-react';
import { useState, useEffect, useRef } from 'react';

// import { useSaasState } from '../../../../../common/context';
import getField from '../../../../../../packages/forms/Controlled';
// import Interchange from '../../../../../common/icons/interchange.svg';
import Ocean from '../../../assets/ocean.svg';
import Plane from '../../../assets/plane.svg';
import Button from '../../../common/Button';
import { ShipGif, PlaneGif } from '../../../common/gif';
import { InterChange } from '../../../configuration/icon-configuration';
import transportFn from '../../../utils/transportFn';

// import {
// 	Label, Col, Title, ErrorTxt, BtnContainer,
// } from '../styles.module.css';

import style from '../styles.module.css';

// import {
// 	Container, Tabs, Image, Txt, Dot, FormDiv, InterChangeContainer,
// } from './style';
import styles from './styles.module.css';

function Transportation({
	transportMode,
	setTransportMode,
	fields,
	error,
	setValue,
	watch,
	reset,
	handleSubmit,
	setStepper,
	setFormStepper,
	setFormData,
	portDetails = {},
	setPortDetails,
	setPrevHs,
	isMobile = false,
	transportControl,
}) {
	console.log(fields[0], portDetails, error, 'fields');
	const [rotate, setRotate] = useState(false);
	const OriginPort = getField(fields[0]?.type);
	const DestinationPort = getField(fields[1]?.type);
	const [origin, destination] = watch(['originPort', 'destinationPort']);
	// const { setMapPoints } = useSaasState();
	const [mapPoints, setMapPoints] = useState();

	const initialRef = useRef(true);

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
		error,
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
				<div className={`${isMobile ? 'with-mobile' : 'without-mobile'} ${styles.tabs}`}>
					<div
						className={`${transportMode === 'OCEAN' && 'selected'} ${styles.card}`}
						role="presentation"
						onClick={() => setTransportMode('OCEAN')}
					>
						{transportMode === 'OCEAN' && <div className={styles.dot} />}

						{transportMode === 'OCEAN' ? (
							<img className={styles.image} src={ShipGif} alt="" />
						) : (
							<Ocean width={70} height={70} />
						)}
						<div className={styles.txt}>Ocean</div>
					</div>
					<div
						className={`${transportMode === 'AIR' && 'selected'} ${styles.card}`}
						role="presentation"
						onClick={() => setTransportMode('AIR')}
					>
						{transportMode === 'AIR' && <div className={styles.dot} />}
						{transportMode === 'AIR' ? (
							<img className={styles.image} src={PlaneGif} alt="" />
						) : (
							<Plane width={70} height={70} />
						)}
						<div className={styles.txt}>Air</div>
					</div>
				</div>
				<div className={styles.formDiv}>
					<div className={style.col}>
						<div className={style.label}>{fields[0]?.label}</div>
						<OriginPort
							key={origin || portDetails?.origin?.id}
							{...fields[0]}
							handleChange={(data) => portDetailsHandler(data, 'origin')}
							control={transportControl}
						/>
						{error?.originPort && (
							<div className={style.error_txt}>
								*
								{error?.originPort?.type}
							</div>
						)}
					</div>
					<div className={styles.interChangeContainer}>
						<div
							className={`${rotate && 'rotateIcn'} icn`}
							role="presentation"
							onClick={interchangeValuesHandler}
						>
							<img src={InterChange} alt="" width="20px" height="20px" />
						</div>
					</div>
					<div className={style.col}>
						<div className={style.label}>{fields[1].label}</div>
						<DestinationPort
							key={destination || portDetails?.destination?.id}
							{...fields[1]}
							handleChange={(data) => portDetailsHandler(data, 'destination')}
							control={transportControl}
						/>
						{error?.destinationPort && (
							<div className={style.error_txt}>
								*
								{error?.destinationPort?.type}
							</div>
						)}
					</div>
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
