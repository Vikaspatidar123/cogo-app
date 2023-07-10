import { Placeholder } from '@cogoport/components';
import { IcMCfs } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import PaymentStatusModal from '../../common/PaymentStatusModal';
import {
	HeadingIcon,
	SecureIcon,
} from '../../configuration/icon-configuration';
import useCheckStatus from '../../hooks/useCheckStatus';
import usePostTradeEngine from '../../hooks/usePostTradeEngine';
import style1 from '../Content/styles.module.css';
import style2 from '../styles.module.css';

import styles from './styles.module.css';

import { useRouter, dynamic, Image } from '@/packages/next';

const Map = dynamic(() => import('../Map'), { ssr: false });

function ListPage() {
	const { query, push } = useRouter();
	const { t } = useTranslation(['traderEligibilityCheck']);

	const { billId = '', draftIdFromAddon = '' } = query || {};

	const [paymentStatusModal, setPaymentStatusModal] = useState(false);
	const [selected, setSelected] = useState({});

	const { createTradeEngine, tradeEngineResponse, getTradeEngineListLoading } = usePostTradeEngine();
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
						<Image className={style2.svg_style} src={HeadingIcon} alt="" width={40} height={40} />
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
					<div className={`${style1.list_column_mobile} ${style1.list_column}`}>
						{getTradeEngineListLoading && !screeningRequestResponse
						&& paymentStatus === 'PAID' && [...Array(3).keys()].map((itm) => (
							<div key={itm}>
								<Placeholder className={styles.placeholder_styles}>
									{[...Array(5).keys()].map((item) => (
										<div className={styles.line} key={item} />
									))}
								</Placeholder>
							</div>
						))}
						{getTradeEngineListLoading && [...Array(3).keys()].map((item) => (
							<div key={item}>
								<Placeholder className={styles.placeholder_styles}>
									{[...Array(5).keys()].map((itm) => (
										<div className={styles.line} key={itm} />
									))}
								</Placeholder>
							</div>
						))}
						{!getTradeEngineListLoading && screeningRequestResponse?.length > 0 && (
							<>
								<div className={styles.title}>
									{t('traderEligibilityCheck:tec_list_page_total_results')}
									{' '}
									(
									{screeningRequestResponse.length}
									)
								</div>
								<div className={styles.list_wrapper}>
									{(screeningRequestResponse || []).map((item) => (
										<div
											className={styles.card}
											key={`${item?.screeningName}_${item?.screeningAka}`}
										>
											<div className={styles.styled_row}>
												<div className={styles.new_column}>
													{item?.screeningName?.toUpperCase()}
												</div>
												<div>
													<div className={styles.percentage}>
														{Number(item?.screeningMatchWeight) * 100}
														%
													</div>
													<div className={styles.score_text}>
														{t('traderEligibilityCheck:tec_list_page_matching_score')}
													</div>
												</div>
											</div>
											<div className={styles.styled_row}>
												<div>
													<div className={styles.heading2}>
														{t('traderEligibilityCheck:tec_list_page_listing_name_heading')}
													</div>
													<div className={styles.text2}>
														{item?.screeningListName}
													</div>
												</div>
											</div>
											<div className={styles.styled_row}>
												<div>
													<div className={styles.heading2}>
														{t('traderEligibilityCheck:tec_list_page_department_name')}
													</div>
													<div className={styles.text2}>
														{item?.screeningDept}
													</div>
												</div>
												<div>
													<div className={styles.heading2}>
														{t('traderEligibilityCheck:tec_list_page_registered_date')}
													</div>
													<div className={styles.text2}>
														{item?.screeningFedRegDate}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</>
						)}
						{!getTradeEngineListLoading && screeningRequestResponse == null && (
							<div className={styles.list_wrapper}>
								<div className={styles.label}>
									<div className={styles.emptytext}>
										{t('traderEligibilityCheck:tec_list_page_couldnt_fetch_details')}
										<div>{t('traderEligibilityCheck:tec_list_page_try_later_text')}</div>
									</div>
								</div>
							</div>
						)}
						{!getTradeEngineListLoading && screeningRequestResponse?.length === 0 && (
							<div className={styles.list_wrapper}>
								<Image src={SecureIcon} alt="" height={300} width={300} />
								<div className={styles.label}>
									<div className={styles.bold}>
										{screeningPartyName.toUpperCase()}
									</div>
									<div>{t('traderEligibilityCheck:tec_list_page_is_verified_user')}</div>
								</div>
							</div>
						)}
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
