import { cl, Modal, TabPanel, Tabs } from '@cogoport/components';
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import iconUrl from '../../../utils/iconUrl.json';

import Container from './Container';
import Duties from './Duties';
import styles from './styles.module.css';
import TraderCheck from './TraderCheck';

import CustomerSatisfaction from '@/ui/commons/components/CustomerSatisfaction';

function TransactionModal({
	transactionModal, setTransactionModal, setValue,
	transactionData = {}, tradeEngineLoading, setShowSuccessModal,
}) {
	const [activeTab, setActiveTab] = useState('trader_eligibility');

	const {
		lineItem = [],
		consignmentValue = '',
		resultCurrency,
		screeningPartyName,
		restrictedPartyScreening = '',
		screeningRequestResponse = [],
	} = transactionData;

	const transactionDataLength = Object.keys(transactionData).length;

	return (
		<Modal show={transactionModal} onClose={() => setTransactionModal(false)} size="xl">
			{tradeEngineLoading && (
				<div className={cl`${styles.flex_box}`}>
					<img src={iconUrl?.loading} alt="loading..." className={styles.loading} />
				</div>
			)}
			{!tradeEngineLoading
				&& transactionDataLength === 0 && (
					<div className={cl`${styles.flex_box} ${styles.empty_state}`}>
						<img src={iconUrl?.transactionEmptyState} alt="No Data" />
						<div className={styles.empty_text}>Something Went Wrong</div>
					</div>
			)}

			{!tradeEngineLoading && consignmentValue && (
				<div className={styles.modal_container}>
					<div className={styles.container}>
						<h2 className={styles.heading}>Service Details</h2>

						{restrictedPartyScreening !== null && (
							<div className={styles.flex_box}>

								<div className={cl`${styles.flex_box} ${styles.verify_container}`}>
									<div className={styles.trader_title}>Trader eligibility check:</div>
									{restrictedPartyScreening && <IcCFtick height={20} width={20} />}
									{!restrictedPartyScreening && (
										<IcCFcrossInCircle height={20} width={20} />
									)}
									<div className={styles.info_container}>
										<div className={styles.company}>{screeningPartyName}</div>
										{restrictedPartyScreening === true && (
											<div className={styles.verified}>Verfied</div>
										)}
										{restrictedPartyScreening === false && (
											<div className={styles.verified}> Not Verfied</div>
										)}
									</div>
								</div>
							</div>
						)}

					</div>

					<Duties
						quotationSetValue={setValue}
						setTransactionModal={setTransactionModal}
						transactionData={transactionData}
						setShowSuccessModal={setShowSuccessModal}
					/>
					{restrictedPartyScreening == null ? (
						<div>
							{(lineItem || []).map((item, index) => (
								<Container
									key={item?.hsNumber}
									item={item}
									resultCurrency={resultCurrency}
									index={index}
								/>
							))}
						</div>
					) : (
						<div>
							<Tabs
								activeTab={activeTab}
								fullWidth
								themeType="primary"
								onChange={setActiveTab}
							>
								<TabPanel
									name="trader_eligibility"
									title="Trader Eligibility Check"
									badge={screeningRequestResponse?.length > 0
                                    && screeningRequestResponse?.length}
								>
									<TraderCheck tradeEngineResponse={transactionData} />
								</TabPanel>

								<TabPanel
									name="products"
									title="Products"
									badge={lineItem?.length}
								>
									{(lineItem || []).map((item, index) => (
										<Container
											key={item?.hsNumber}
											item={item}
											resultCurrency={resultCurrency}
											index={index}
										/>
									))}
								</TabPanel>
							</Tabs>
						</div>
					)}
					<CustomerSatisfaction serviceName="quotations" position="center" />
				</div>
			)}

		</Modal>
	);
}

export default TransactionModal;
