import { IcMCfs } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import PaymentStatusModal from '../../common/PaymentStatusModal';
import useCheckStatus from '../../hooks/useCheckStatus';
import usePostTradeEngine from '../../hooks/usePostTradeEngine';
import style1 from '../Content/styles.module.css';
import style2 from '../styles.module.css';

import Results from './Results';
import styles from './styles.module.css';

import { useRouter, dynamic, Image } from '@/packages/next';
import CustomerSatisfaction from '@/ui/commons/components/CustomerSatisfaction';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const Map = dynamic(() => import('../Map'), { ssr: false });

function ListPage() {
	const { query, push } = useRouter();
	const { t } = useTranslation(['traderEligibilityCheck']);

	const { billId = '', draftIdFromAddon = '' } = query || {};

	const [paymentStatusModal, setPaymentStatusModal] = useState(false);
	const [selected, setSelected] = useState({});

	const {
		createTradeEngine, tradeEngineResponse, getTradeEngineListLoading,
		tradeEngineInputId,
	} = usePostTradeEngine();

	const { checkPaymentStatus, checkLoading, stop, paymentStatus } = useCheckStatus({
		query,
		setPaymentStatusModal,
		createTradeEngine,
	});

	const { screeningRequestResponse = [], screeningPartyName = '' } = tradeEngineResponse || {};

	useEffect(() => {
		if (billId) {
			checkPaymentStatus();
		} else if (draftIdFromAddon) {
			createTradeEngine({ draftIdFromAddon });
		}
	}, [billId, checkPaymentStatus, createTradeEngine, draftIdFromAddon]);

	return (
		<div className={styles.wrapper2}>
			<div className={style1.map_column2}>
				<Map
					screeningRequestResponse={screeningRequestResponse}
					setSelected={setSelected}
					selected={selected}
				/>
			</div>
			<div className={styles.container_style}>
				<div
					role="presentation"
					className={styles.column2}
					onClick={() => push('/saas/premium-services/trader-eligibility-check')}
				>
					<IcMCfs fill="#034afd" />
					<div className={styles.text}>{t('traderEligibilityCheck:tec_go_to_home_page_link')}</div>
				</div>
				<div className={styles.title_style}>
					<div className={style2.heading}>
						<Image
							className={style2.svg_style}
							src={GLOBAL_CONSTANTS.image_url.heading_icon}
							alt="heading_icon"
							width={40}
							height={40}
						/>
						{t('traderEligibilityCheck:trader_eligibility_check_title')}
					</div>
				</div>

				<div
					role="presentation"
					className={styles.column3}
					onClick={() => push('/saas/premium-services/trader-eligibility-check')}
				>
					<IcMCfs fill="#034afd" />
				</div>
			</div>
			<div className={style2.content_wrapper}>
				<div className={style1.wrapper}>
					<div style={{ width: '32%' }}>
						<div className={`${style1.list_column_mobile} ${style1.list_column}`}>
							<Results
								loading={getTradeEngineListLoading}
								screeningRequestResponse={screeningRequestResponse}
								screeningPartyName={screeningPartyName}
							/>
						</div>

						<div className={styles.csat}>
							<CustomerSatisfaction
								serviceName="trader_eligibility_check"
								position="center"
								details={{ id: tradeEngineInputId.current }}
							/>
						</div>
					</div>

					<div className={style1.map_column}>
						<Map
							screeningRequestResponse={screeningRequestResponse}
							setSelected={setSelected}
							selected={selected}
						/>
					</div>
				</div>
			</div>
			{paymentStatusModal && (
				<PaymentStatusModal
					checkLoading={checkLoading}
					stop={stop}
					paymentStatus={paymentStatus}
					paymentStatusModal={paymentStatusModal}
					setPaymentStatusModal={setPaymentStatusModal}
				/>
			)}
		</div>
	);
}
export default ListPage;
