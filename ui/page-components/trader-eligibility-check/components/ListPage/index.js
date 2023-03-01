import { Placeholder } from '@cogoport/components';
import { IcMCfs } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import PaymentStatusModal from '../../common/PaymentStatusModal';
import { HeadingIcon, SecureIcon } from '../../configuration/icon-configuration';
import useCheckStatus from '../../hooks/useCheckStatus';
import usePostTradeEngine from '../../hooks/usePostTradeEngine';
import style1 from '../Content/styles.module.css';
import style2 from '../styles.module.css';

import styles from './styles.module.css';

import { useRouter, dynamic } from '@/packages/next';

const Map = dynamic(() => import('../Map'), { ssr: false });

function ListPage() {
	const { query, push } = useRouter();
	const { billId = '', draftIdFromAddon = '' } = query || {};
	const [paymentStatusModal, setPaymentStatusModal] = useState(false);
	const { createTradeEngine, tradeEngineResponse, getTradeEngineListLoading } =		usePostTradeEngine();
	const {
		checkPaymentStatus, checkLoading, stop, paymentStatus,
	} = useCheckStatus({
		query,
		setPaymentStatusModal,
		createTradeEngine,
	});
	const { screeningRequestResponse, screeningPartyName = '' } = tradeEngineResponse || {};
	useEffect(() => {
		if (billId) {
			checkPaymentStatus();
		} else if (draftIdFromAddon) {
			createTradeEngine({ draftIdFromAddon });
		}
	}, []);

	return (
		<div className={styles.wrapper2}>
			<div className={style1.map_column2}>
				<Map />
			</div>
			<div className={styles.container_style}>

				<div
					role="presentation"
					className={styles.column2}
					onClick={() => push('/saas/premium-services/trader-eligibility-check')}
				>
					<IcMCfs fill="#034afd" />
					<div className={styles.text}>Go to home page</div>
				</div>
				<div className={styles.title_style}>
					<div className={style2.heading}>
						<img className={style2.svg_style} src={HeadingIcon} alt="" />
						Trader Eligibilty Check
					</div>
				</div>

				<div
					role="presentation"
					className={styles.column3}
					onClick={() => push('/saas/premium-services/trader-eligibility-check')}
				>
					<IcMCfs fill="#034afd" />
				</div>
				<div className={style2.heading}>
					<img className={style2.svg_style} src={HeadingIcon} alt="" />
					Trader Eligibilty Check
				</div>

			</div>
			<div className={style2.content_wrapper}>
				<div className={style1.wrapper}>
					<div className={`${style1.list_column_mobile} ${style1.list_column}`}>
						{!getTradeEngineListLoading
								&& !screeningRequestResponse
								&& paymentStatus === 'PAID'
								&& new Array(3).fill(1).map(() => (
									<div>
										<Placeholder className={styles.placeholder_styles}>
											{Array(5).map(() => <div className={styles.line} />)}
										</Placeholder>

									</div>
								))}
						{!getTradeEngineListLoading
								&& new Array(3).fill(1).map(() => (
									<div>
										<Placeholder className={styles.placeholder_styles}>
											{Array(5).fill(1).map(() => <div className={styles.line} />)}
										</Placeholder>
									</div>
								))}
						{getTradeEngineListLoading && screeningRequestResponse?.length > 0 && (
							<>
								<div className={styles.title}>
									Total Results (
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
													<div
														className={styles.percentage}
													>
														{item?.screeningMatchWeight * 100}
														%
													</div>
													<div className={styles.score_text}>Matching score</div>
												</div>
											</div>
											<div className={styles.styled_row}>
												<div>
													<div className={styles.heading2}>Listing Name</div>
													<div className={styles.text2}>{item?.screeningListName}</div>
												</div>
											</div>
											<div className={styles.styled_row}>
												<div>
													<div className={styles.heading2}>Department Name</div>
													<div className={styles.text2}>{item?.screeningDept}</div>
												</div>
												<div>
													<div className={styles.heading2}>Registered Date</div>
													<div className={styles.text2}>{item?.screeningFedRegDate}</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</>
						)}
						{getTradeEngineListLoading && screeningRequestResponse?.length === 0 && (
							<div className={styles.list_wrapper}>
								<img src={SecureIcon} alt="" height={300} width={300} />
								<div className={styles.label}>
									<div className={styles.bold}>{screeningPartyName.toUpperCase()}</div>
									<div>is a verified user</div>
								</div>
							</div>
						)}
					</div>
					<div className={style1.map_column}>
						<Map />
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
