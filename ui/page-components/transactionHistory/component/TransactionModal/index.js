import { Placeholder, Modal } from '@cogoport/components';
import {
	IcCFtick,
	IcMArrowDown,
	IcMPaste,
	IcCFcrossInCircle,
} from '@cogoport/icons-react';
import { useState } from 'react';

import Controls from './Controls';
import Document from './Documents';
import Duties from './Duties';
import LandedCost from './landedCost/index';
import styles from './styles.module.css';

function ServiceDetailModal({
	setPaymentSuccess,
	paymentSuccess,
	transactionData = {},
	getTransactionLoading,
	postTransactionLoading,
}) {
	const {
		lineItem = [],
		incoterm = '',
		consignmentValue = '',
		resultCurrency,
		totalDutiesAndTaxes = '',
		screeningPartyName,
		restrictedPartyScreening = false,
	} = transactionData || {};

	const transactionDataLength = Object.keys(transactionData).length;

	function Container(item) {
		const [showDrill, setShowDrill] = useState(false);

		const {
			controls = [],
			documents = [],
			landedCost = [],
			hsNumber,
			productName,
		} = item || {};
		const description = (sectionDescription = '') => {
			if (showDrill) return sectionDescription;
			if (sectionDescription?.length > 40) {
				return `${sectionDescription?.substring(0, 40)}....`;
			}
			if (sectionDescription?.length > 96) {
				return `${sectionDescription?.substring(0, 135)}....`;
			}
			return sectionDescription;
		};

		return (
			<>
				<div className={styles.card_line} role="presentation" onClick={() => setShowDrill(!showDrill)}>
					<div className={`title2 ${showDrill && 'selected'}`}>
						{description(productName)}
						/
						{hsNumber}
					</div>
					<div className={styles.arrow}>
						<IcMArrowDown
							width={15}
							height={15}
							className={`${showDrill && 'rotateIcon'} hyperlinkIcon`}
						/>
					</div>
				</div>
				<div className={styles.card_body}>
					<div className="title">
						<IcMPaste height={22} width={22} />
						Duties & Taxes
					</div>
					<div className={styles.footer}>
						<div className="landedcost">
							<div>
								<LandedCost landedCost={landedCost} resultCurrency={resultCurrency} />
							</div>
							<div>
								<Controls controls={controls} />
							</div>
						</div>
						<div className="documents">
							<Document documents={documents} hsNumber={hsNumber} />
						</div>
					</div>
				</div>
			</>
		);
	}
	return (
		<Modal
			show={paymentSuccess}
			onClose={() => setPaymentSuccess(false)}
			className="primary xl"
		>
			<Modal.Header />
			{(getTransactionLoading || postTransactionLoading) && (
				<div className={styles.flex}>
					<Placeholder height="50px" />
				</div>
			)}
			{!getTransactionLoading && !postTransactionLoading && transactionDataLength === 0 && (
				<>
					<div className={styles.empty_div}>
						<img
							alt=""
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
						/>
					</div>
					<div className={styles.text}>
						Something Went Wrong
					</div>
				</>
			)}

			{!getTransactionLoading && !postTransactionLoading && consignmentValue && (
				<div>
					<div className={styles.heading}>Service details</div>
					<div className={styles.line_wrapper}>
						<div className={styles.line} />
					</div>
					<div className={styles.main_card}>
						<div className={styles.card}>
							<div className={styles.trader}>Trader eligibility check:</div>
							{restrictedPartyScreening === true && <IcCFtick height={20} width={20} />}
							{restrictedPartyScreening === false && (
								<IcCFcrossInCircle height={20} width={20} />
							)}
							<div>
								<div className={styles.trader}>{screeningPartyName}</div>
								{restrictedPartyScreening === true && (
									<div className={styles.trader}>Verfied</div>
								)}
								{restrictedPartyScreening === false && (
									<div className={styles.trader}> Not Verfied</div>
								)}
							</div>
						</div>
					</div>
					<Duties
						incoterm={incoterm}
						consignmentValue={consignmentValue}
						resultCurrency={resultCurrency}
						totalDutiesAndTaxes={totalDutiesAndTaxes}
						transactionData={transactionData}
					/>
					{(lineItem || []).map((item) => Container(item))}
				</div>
			)}
		</Modal>
	);
}
export default ServiceDetailModal;
