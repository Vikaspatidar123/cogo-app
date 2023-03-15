import { Modal, Button } from '@cogoport/components';
import { IcAFinancial } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import useFreightCharges from '../../../../hooks/useFreightCharges';
import FreightChargesPayload from '../../../../utils/freightChargePayload';

import Info from './Info';
import ListRow from './List';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function FreightCharges({
	calculateCharge,
	setCalculateCharge,
	setValue,
	infoData,
	transportMode,
}) {
	const [checked, setChecked] = useState('');
	// const {} = watchValue||{};
	const { profile } = useSelector((item) => item);
	const [selectedData, setSelectedData] = useState({});
	const { id = '', branch = {} } = profile || {};
	const allData = Object.assign({}, ...infoData);
	const { createSpotSearch, loading, apiResponse, getSpotSearchloading } = useFreightCharges();
	const cargo_value = {};
	const data = FreightChargesPayload({
		id,
		branch,
		allData,
		activeTab: transportMode,
		cargo_value,
	});
	const { detail, rates = {} } = apiResponse || {};

	useEffect(() => {
		createSpotSearch(data);
	}, []);

	const checkboxHandler = (item) => {
		if (checked !== item?.card) {
			setChecked(item?.card);
			setSelectedData(item);
		}
	};

	const submitHandler = async () => {
		// if (prevCurr === selectedData?.total_price_currency) {
		// 	setSpotCharge(selectedData?.total_price);
		// } else {
		// 	const resp = await exchangeApi(selectedData?.total_price_currency, prevCurr);
		const val = selectedData?.total_price;

		setValue('basicFreightCharges', val);
		setCalculateCharge(false);
	};
	const titleRender = () => (
		<div className={styles.title_container}>
			<div className={styles.title}>
				<IcAFinancial height={30} width={30} />
				<div className={styles.title_div}>Freight Rates</div>
			</div>
			{/* <div
				className={styles.hyperlink}
				role="presentation"
				onClick={redirectDiscover}
			>
				Discover Rates
			</div> */}
		</div>
	);
	return (
		<Modal
			show={calculateCharge}
			onClose={() => setCalculateCharge(false)}
			className={styles.modal_container}
			size="md"
		>
			<Modal.Header title={titleRender()} />
			<Modal.Body>
				<Info transportMode={transportMode} portDetails={detail} />
				{loading && (
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
						alt=""
						width="60px"
						height="60px"
						className={styles.loading_styles}
					/>
				)}
				{!loading && rates?.length === 0 && (
					<div className={styles.empty_state}>No data Available</div>
				)}
				{!loading && rates?.length > 0 && (
					<div className={styles.list}>
						<div className={`${styles.row} ${styles.cardheader}`}>
							<div>Shipping Line</div>
							<div>Rates</div>
						</div>
						<div className={styles.card_list}>
							<ListRow
								rates={rates}
								checked={checked}
								checkboxHandler={checkboxHandler}
							/>
						</div>
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					disabled={checked.length === 0 || loading}
					onClick={submitHandler}
				>
					ADD
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default FreightCharges;
