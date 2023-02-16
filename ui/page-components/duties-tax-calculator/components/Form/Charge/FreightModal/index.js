import Modal from '@cogoport/components';
import { IcAFinancial } from '@cogoport/icons-react';
import { useState } from 'react';

import Button from '../../../../common/Button';
import { Loading } from '../../../../configuration/icon-configuration';
import useCurrencyConversion from '../../../../hook/useCurrencyConversion';
import spotSearchPayload from '../../../../utils/spotSearchPayload';

import Info from './Info';
import ListRow from './List';
// import {
// 	StyledModal,
// 	TitleContainer,
// 	Container,
// 	Title,
// 	List,
// 	Footer,
// 	Row,
// 	Col,
// 	StyledLoading,
// } from './styles';

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
	isMobile = false,
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
	const spotSearchHandler = async () => {
		await createSpotSearch(payload);
	};
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
			const value = selectedData?.total_price * resp.toFixed(2);
			setSpotCharge(value);
		}
		setShowFreightModal(false);
	};
	const redirectDiscover = () => {
		const callBackUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/book`;
		window.open(callBackUrl, '_blank');
	};
	return (
		<Modal
			show={showFreightModal}
			className={styles.modal_container}
			onClose={() => setShowFreightModal(false)}
			afterOpen={spotSearchHandler}
			width={!isMobile ? '576' : '363'}
		>
			<div className={styles.container}>
				<div className={styles.title_container}>
					<div className={styles.title}>
						<IcAFinancial height={30} width={30} />
						<div className={styles.title_div}>Freight Rates</div>
					</div>
					<div className={styles.hyperLink} role="presentation" onClick={redirectDiscover}>
						Discover Rates
					</div>
				</div>
				<Info transportMode={transportMode} portDetails={portDetails} />
				{spotSearchLoading && <img src={Loading} alt="" width="60px" height="60px" />}
				{!spotSearchLoading && rates.length === 0 && (
					<div className={styles.emptyState}>No data Available</div>
				)}
				{!spotSearchLoading && rates.length > 0 && (
					<div className={styles.list}>
						<div className={`${styles.row} ${styles.cardheader}`}>
							<div>Shipping Line</div>
							<div>Rates</div>
						</div>
						<div className={styles.cardList}>
							<ListRow
								rates={rates}
								isMobile={isMobile}
								checked={checked}
								checkboxHandler={checkboxHandler}
							/>
						</div>
					</div>
				)}
			</div>
			<div className={styles.footer}>
				<Button
					size="md"
					disabled={checked.length === 0 || spotSearchLoading}
					onClick={submitHandler}
				>
					ADD
				</Button>
			</div>
		</Modal>
	);
}

export default FreightModal;
