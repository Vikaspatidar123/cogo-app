/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Button } from '@cogoport/components';
import { IcAFinancial } from '@cogoport/icons-react';
import { useEffect, useState, useCallback } from 'react';

import { Loading } from '../../../../configuration/icon-configuration';
import useCurrencyConversion from '../../../../hook/useCurrencyConversion';
import spotSearchPayload from '../../../../utils/spotSearchPayload';

import Info from './Info';
import ListRow from './List';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function FreightModal({
	showFreightModal,
	setShowFreightModal,
	formData = {},
	createSpotSearch,
	spotSearchLoading = false,
	spotSearchData = {},
	transportMode,
	incoterm,
	portDetails = {},
	setSpotCharge,
	prevCurr,
}) {
	const [checked, setChecked] = useState('');
	const [selectedData, setSelectedData] = useState({});

	const { exchangeApi } = useCurrencyConversion();
	const { originPort, destinationPort } = formData || {};
	const { rates = [] } = spotSearchData || {};

	const { query } = useRouter();
	const { org_id = '', branch_id = '', account_type = '' } = query || {};

	const serviceType = transportMode === 'OCEAN' ? 'FCL' : 'AIR';
	const payload = spotSearchPayload({
		transportMode,
		serviceType,
		incoterm,
		originId      : originPort,
		destinationId : destinationPort,
	});
	const spotSearchHandler = useCallback(async () => {
		await createSpotSearch(payload);
	}, [createSpotSearch, payload]);

	const checkboxHandler = (item) => {
		if (checked !== item?.card) {
			setChecked(item?.card);
			setSelectedData(item);
		}
	};

	const submitHandler = async () => {
		if (prevCurr === selectedData?.total_price_currency) {
			setSpotCharge(selectedData?.total_price);
		} else {
			const resp = await exchangeApi(selectedData?.total_price_currency, prevCurr);
			const val = selectedData?.total_price;
			const value = val * resp.toFixed(2);
			setSpotCharge(value);
		}
		setShowFreightModal(false);
	};
	const redirectDiscover = () => {
		const callBackUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/book`;
		window.open(callBackUrl, '_blank');
	};

	useEffect(() => {
		spotSearchHandler();
	}, []);

	const titleRender = () => (
		<div className={styles.title_container}>
			<div className={styles.title}>
				<IcAFinancial height={30} width={30} />
				<div className={styles.title_div}>Freight Rates</div>
			</div>
			<div className={styles.hyperlink} role="presentation" onClick={redirectDiscover}>
				Discover Rates
			</div>
		</div>
	);
	return (
		<Modal
			show={showFreightModal}
			className={styles.modal_container}
			onClose={() => setShowFreightModal(false)}
			size="md"
		>
			<Modal.Header title={titleRender()} />
			<Modal.Body>
				<Info transportMode={transportMode} portDetails={portDetails} />
				{spotSearchLoading && (
					<img
						src={Loading}
						alt=""
						width="60px"
						height="60px"
						className={styles.loading_styles}
					/>
				)}
				{!spotSearchLoading && rates.length === 0 && (
					<div className={styles.empty_state}>No data Available</div>
				)}
				{!spotSearchLoading && rates.length > 0 && (
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
					disabled={checked.length === 0 || spotSearchLoading}
					onClick={submitHandler}
				>
					ADD
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default FreightModal;
