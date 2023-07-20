import { cl } from '@cogoport/components';
import { IcCFcrossInCircle, IcCFtick, IcMArrowDown, IcMPaste } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Controls from '../Controls';
import Document from '../Documents';
import Duties from '../Duties';
import LandedCost from '../landedCost';

import styles from './styles.module.css';

const MAX_DESC_LENGTH = 100;

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

const description = ({ name = '', showDrill }) => {
	if (showDrill) return name;
	if (name?.length > MAX_DESC_LENGTH) {
		return `${name?.substring(0, MAX_DESC_LENGTH)}....`;
	}
	return name;
};

function Container({ item, resultCurrency }) {
	const { t } = useTranslation(['transactionHistory']);

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
			<div className={styles.card_line} role="presentation" onClick={() => setShowDrill((prev) => !prev)}>
				<div className={styles.title}>
					{description({ name: productName, showDrill })}
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
					{t('transactionHistory:result_title_duties')}
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
	const { t } = useTranslation(['transactionHistory']);

	const {
		lineItem = [],
		resultCurrency = '',
		screeningPartyName = '',
		restrictedPartyScreening = false,
	} = tradeEngineResponse || {};

	const { icon: tecIcon, title: tecTitle } = TRADER_CHECK_MAPPING?.[restrictedPartyScreening] || {};

	return (
		<div>
			<div className={styles.main_card}>
				<div className={styles.card}>
					<div className={styles.trader}>{t('transactionHistory:result_title_screening')}</div>
					{tecIcon}
					<div>
						<div className={styles.trader}>{screeningPartyName}</div>
						{tecTitle}
					</div>
				</div>
			</div>
			<Duties transactionData={tradeEngineResponse} />

			<div className={styles.line_item_container}>
				{(lineItem || []).map((item) => (
					<Container
						key={item?.hsNumber}
						item={item}
						resultCurrency={resultCurrency}
					/>
				))}
			</div>

		</div>
	);
}

export default QuotationModal;
