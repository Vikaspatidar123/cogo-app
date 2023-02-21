import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import MobileHeader from '../../../../MobileHeader';

import styles from './styles.module.css';
import TradePartner from './TradePartner';
import useTradeParty from './useTradeParty';
import getTradePartyType from './utils/get-trade-party-type';

// import EmptyState from '@/commons/components/EmptyState';
// import SlidingTabs from '@/commons/components/UI/SlidingTabs';

function TradeParty() {
	const [showModal, setShowModal] = useState(false);

	const {
		isMobile = false,
		onClickBackButton = () => {},
		organizationType = '',
		organizationData = {},
	} = useTradeParty();

	if (isEmpty(organizationData)) {
		return (
			<div className={styles.empty_state_container}>
				{/* <EmptyState /> */}
				empty
			</div>
		);
	}

	const buttonComponent = () => (
		<Button
			type="button"
			size="sm"
			themeType="accent"
			onClick={() => setShowModal(true)}
		>
			Add Party
		</Button>
	);

	return (
		<div className={styles.container}>
			{isMobile && (
				<MobileHeader
					heading="Trade Party"
					onClickBackButton={onClickBackButton}
					ChildComponent={buttonComponent}
				/>
			)}

			<div
				className={styles.header}
				style={{ marginLeft: 'auto' }}
			>
				{!isMobile && buttonComponent()}
			</div>

			<TradePartner
				key={organizationType}
				orgResponse={organizationData}
				activeTab="tradePartner"
				showModal={showModal}
				setShowModal={setShowModal}
				source="partner"
			/>
		</div>
	);
}

export default TradeParty;
