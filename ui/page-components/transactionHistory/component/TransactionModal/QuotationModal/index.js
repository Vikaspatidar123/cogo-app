import { cl } from '@cogoport/components';
import { IcCFcrossInCircle, IcCFtick, IcMArrowDown, IcMPaste } from '@cogoport/icons-react';
import { useState } from 'react';

import Controls from '../Controls';
import Document from '../Documents';
import Duties from '../Duties';
import LandedCost from '../landedCost';

import styles from './styles.module.css';

const MAX_DESC_LENGTH = 100;
const MAX_DESC_LENGTH_MOBILE = 40;

const TRADER_CHECK_MAPPING = {
	true: {
		icon  : <IcCFtick height={20} width={20} />,
		title : 'Verfied',
	},
	false: {
		icon  : <IcCFcrossInCircle height={20} width={20} />,
		title : 'Not Verfied',
	},
};

const description = ({ sectionDescription = '', isMobile, showDrill }) => {
	if (showDrill) return sectionDescription;
	if (sectionDescription?.length > MAX_DESC_LENGTH_MOBILE && isMobile) {
		return `${sectionDescription?.substring(0, MAX_DESC_LENGTH_MOBILE)}....`;
	}
	if (sectionDescription?.length > MAX_DESC_LENGTH) {
		return `${sectionDescription?.substring(0, MAX_DESC_LENGTH)}....`;
	}
	return sectionDescription;
};

function Container({ item, resultCurrency }) {
	const [showDrill, setShowDrill] = useState(false);

	const {
		controls = [],
		documents = [],
		landedCost = [],
		hsNumber,
		productName,
	} = item || {};

	return (
		<>
			<div className={styles.card_line} role="presentation" onClick={() => setShowDrill(!showDrill)}>
				<div className={styles.title}>
					{description(productName)}
					/
					{hsNumber}
				</div>
				<div className={styles.arrow}>
					<IcMArrowDown
						width={15}
						height={15}
						className={cl`${showDrill && styles.rotate_icon} ${styles.hyperlink_icon}`}
					/>
				</div>
			</div>

			<div className={`${styles.card_body} ${showDrill && styles.display_drill}`}>
				<div className={styles.title}>
					<IcMPaste height={22} width={22} />
					Duties & Taxes
				</div>
				<div className={styles.footer}>
					<div className={styles.landedcost}>
						<div>
							<LandedCost landedCost={landedCost} resultCurrency={resultCurrency} />
						</div>
						<div>
							<Controls controls={controls} />
						</div>
					</div>
					<div className={styles.documents}>
						<Document documents={documents} hsNumber={hsNumber} />
					</div>
				</div>
			</div>
		</>
	);
}

function QuotationModal({ tradeEngineResponse = {} }) {
	const {
		lineItem = [],
		incoterm = '',
		consignmentValue = '',
		resultCurrency = '',
		totalDutiesAndTaxes = '',
		screeningPartyName = '',
		restrictedPartyScreening = false,
	} = tradeEngineResponse || {};

	const { icon: tecIcon, title: tecTitle } = TRADER_CHECK_MAPPING?.[restrictedPartyScreening] || {};

	return (
		<div>
			<div className={styles.main_card}>
				<div className={styles.card}>
					<div className={styles.trader}>Trader eligibility check:</div>
					{tecIcon}
					<div>
						<div className={styles.trader}>{screeningPartyName}</div>
						{tecTitle}
					</div>
				</div>
			</div>
			<Duties
				incoterm={incoterm}
				consignmentValue={consignmentValue}
				resultCurrency={resultCurrency}
				totalDutiesAndTaxes={totalDutiesAndTaxes}
				transactionData={tradeEngineResponse}
			/>
			{(lineItem || []).map((item) => (
				<Container
					key={item?.hsNumber}
					item={item}
					resultCurrency={resultCurrency}
				/>
			))}
		</div>
	);
}

export default QuotationModal;
