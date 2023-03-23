import { Button } from '@cogoport/components';
import React from 'react';

import Airline from './components/Airline';
import Goods from './components/Goods';
import Route from './components/Route';
import TerminalHandling from './components/TerminalHandling';
import TradeType from './components/TradeType';
import styles from './styles.module.css';
import useAirLocal from './useAirLocal';

function AirLocals({
	extraParams = {},
	airFreightLocalsData = {},
	serviceDetails = {},
	onPush = () => {},
}) {
	const {
		location,
		setLocation,
		airFormRef,
		onClickSearchRates,
		loading,
		formError,
		selectedTradeType,
		setSelectedTradeType,
	} = useAirLocal({
		extraParams,
		airFreightLocalsData,
		serviceDetails,
		onPush,
	});

	return (
		<div className={styles.container}>
			<div className={styles.search_form_components}>
				<div className={styles.row}>
					<div>
						<Route
							setLocation={setLocation}
							location={location}
							formError={formError}
							onClickSearchRates={onClickSearchRates}
						/>
					</div>

					<div>
						<TradeType
							formError={formError}
							airFreightLocalsData={airFreightLocalsData}
							ref={(r) => {
								airFormRef.current.TradeType = r;
							}}
							selectedTradeType={selectedTradeType}
							setSelected={setSelectedTradeType}
							location={location}
						/>
					</div>

					<div>
						<TerminalHandling
							formError={formError}
							airFreightLocalsData={airFreightLocalsData}
							ref={(r) => {
								airFormRef.current.terminalHandlingType = r;
							}}
							selectedTradeType={selectedTradeType}
							setSelectedTradeType={setSelectedTradeType}
						/>
					</div>

					<div>
						<Goods
							airFreightLocalsData={airFreightLocalsData}
							airFormRef={airFormRef}
							ref={(r) => {
								airFormRef.current.goods = r;
							}}
							formError={formError}
							selectedTradeType={selectedTradeType}
							serviceDetails={serviceDetails}
						/>
					</div>

					<div style={{ paddingRight: 0 }}>
						<Airline
							airFreightLocalsData={airFreightLocalsData}
							formError={formError}
							ref={(r) => {
								airFormRef.current.airline = r;
							}}
							serviceDetails={serviceDetails}
						/>
					</div>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					className="primary md"
					onClick={onClickSearchRates}
					disabled={loading}
				>
					Search Rates
				</Button>
			</div>
		</div>
	);
}

export default AirLocals;
