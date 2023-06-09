import { Button } from '@cogoport/components';
import React, { useRef, forwardRef } from 'react';

import Goods from './components/Goods';
import Header from './components/Header';
import Loads from './components/Loads';
import Route from './components/Route';
import useAir from './hooks/useAir';
import styles from './styles.module.css';

function Air({
	extraParams = {},
	showHeader = false,
	airFreightData = {},
	serviceDetails = {},
	onPush = () => {},
	detail = {},
	isEdit = false,
}) {
	const spotRef = useRef({});
	const {
		toggleState,
		setToggleState,
		serviceType,
		setServiceType,
		location,
		setLocation,
		airFormRef,
		onClickSearchRates,
		loading,
		onServiceTypeClick,
		setOnServiceTypeClick,
		formError,
		isOriginPincodeChecked,
		isDestinationPincodeChecked,
	} = useAir({
		extraParams,
		airFreightData,
		serviceDetails,
		detail,
		onPush,
	});
	const onSubmit = () => {
		const ref = spotRef?.current;

		const promise = ref?.route.handleSubmit();

		const value = Promise.all([promise]);
		console.log(value, 'val');
	};
	return (
		<div className={styles.container}>
			{showHeader ? (
				<Header
					serviceType={serviceType}
					setServiceType={setServiceType}
					setOnServiceTypeClick={setOnServiceTypeClick}
				/>
			) : null}

			<div className={styles.search_form_components}>
				<div className={styles.row}>
					<div className={styles.route}>
						<Route
							isOriginPincodeChecked={isOriginPincodeChecked}
							isDestinationPincodeChecked={isDestinationPincodeChecked}
							setLocation={setLocation}
							location={location}
							onServiceTypeClick={onServiceTypeClick}
							setOnServiceTypeClick={setOnServiceTypeClick}
							formError={formError}
							onClickSearchRates={onClickSearchRates}
							extraParams={extraParams}
							setToggleState={setToggleState}
							ref={(r) => {
								spotRef.current.route = r;
							}}
							isEdit={isEdit}
						/>
					</div>
					<div className={styles.goods_loads}>
						<Goods
							toggleState={toggleState}
							setToggleState={setToggleState}
							serviceType={serviceType}
							airFreightData={airFreightData}
							ref={(r) => {
								airFormRef.current.goods = r;
							}}
							formError={formError}
							location={location}
							detail={detail}
							isEdit={isEdit}
						/>

						<Loads
							airFreightData={airFreightData}
							formError={formError}
							ref={(r) => {
								airFormRef.current.load = r;
							}}
							serviceDetails={serviceDetails}
							isEdit={isEdit}
						/>
					</div>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					className="primary md"
					onClick={() => {
						onClickSearchRates();
						onSubmit();
					}}
					disabled={loading}
				>
					Search Rates
				</Button>
			</div>
		</div>
	);
}

export default forwardRef(Air);
