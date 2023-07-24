import { Popover, Modal } from '@cogoport/components';
import { IcMFship, IcMLcl, IcMAir, IcCRedCircle, LclCircle, IcMDocument } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { Service } from '../../../constants/service-mapping';
import Loader from '../Loading';

import styles from './styles.module.css';
import TaxInvoiceModal from './TaxInvoiceModal';

import getGeoConstants from '@/ui/commons/constants/geo';
import formatDate from '@/ui/commons/utils/formatDate';

const geo = getGeoConstants();

function InvoiceCard({ loading, invoiceDetails }) {
	const [show, setShow] = useState(false);

	function RenderIcons({ item }) {
		if (item.service_type === 'fcl_freight') {
			return <IcMFship fill="#356EFD" />;
		}
		if (item.service_type === 'lcl_freight') {
			return (
				<LclCircle>
					<IcMLcl fill="white" size={16.8} />
				</LclCircle>
			);
		}
		if (item.service_type === 'air_freight') {
			return (
				<LclCircle className={styles.air_circle}>
					<IcMAir size={14} fill="white" />
				</LclCircle>
			);
		}
		return <IcMFship fill="#356EFD" />;
	}

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				invoiceDetails?.map((item) => (
					<div
						className={styles.flex}
						style={{
							padding: '10px',
							width: '100%',
							backgroundColor: '#FFFFFF',
							borderRadius: '4px',
							margin: '8px 2px',
							boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15',
						}}
					>
						<div className={styles.flex} style={{ flex: '2', justifyContent: 'space-between' }}>
							<div className={styles.flex} style={{ alignItems: 'center' }}>
								<RenderIcons item={item} />
								<text style={{ color: '#333333', marginLeft: '4px' }}>
									{Service?.[item?.job?.shipmentType]?.name}
								</text>
							</div>
							<div className={styles.flex} style={{ alignItems: 'center' }}>
								<IcCRedCircle size={7} />
								<text style={{ color: '#4F4F4F', marginLeft: '2px' }}>
									Due
									{' '}
									<span style={{ fontWeight: 'bold' }}>
										{formatDate({
											date: item?.dueDate,
											dateFormat: geo.formats.date.default,
											formatType: 'date',
										})}
									</span>
								</text>
							</div>
						</div>
						<div
							className={styles.flex}
							style={{
								marginTop: '10px',
								justifyContent: 'space-around',
								alignItems: 'flex-start',
							}}

						>
							<div className={styles.flex} style={{ alignItems: 'left' }}>
								<div className={styles.head}>Invoice Date</div>
								<text>
									{formatDate({
										date: item?.invoiceDate,
										dateFormat: geo.formats.date.default,
										formatType: 'date',
									})}
								</text>
							</div>
							<div className={styles.flex} style={{ alignItems: 'left' }}>
								<div className={styles.head}>Invoice ID</div>
								<text size={12}>
									{item?.invoiceNumber
										? `${item?.invoiceNumber?.slice(0, 10)}...`
										: '-'}
								</text>
							</div>
							<div
								className={styles.flex}
								style={{
									justifyContent: 'space-around',
									alignItems: 'left',
								}}

							>
								<div className={styles.head}>Shipment ID</div>
								<text style={{
									color: '#333333',
									alignItems: 'center',
								}}
								>
									{!item?.job?.id ? 'NA' : item?.job?.id}
								</text>
							</div>
							<div className={styles.flex} style={{ alignItems: 'left', borderBottom: '2px' }}>
								<Popover
									placement="bottom"
									className={styles.popover_wrapper}
									content={
										item?.invoicePdfUrl?.length > 0
											? (
												<div className={styles.flex} style={{ width: '100%' }}>
													<div className={styles.flex} style={{ width: '158px' }}>
														<div
															className={styles.flex}
															style={{
																width: '100%',
																border: '1px solid rgba(0, 0, 0, 0.1)',
															}}
														/>

														<div
															className={styles.flex}
															role="presentation"
															style={{ alignItems: 'center' }}
															onClick={() => window.open(item?.invoicePdfUrl, '_blank')}
														>
															<IcMDocument width={28} height={28} />
															<text
																style={{ marginLeft: '15px' }}
															>
																View and Download
																{' '}
																<br />
																{' '}
																Invoice
															</text>
														</div>
													</div>
												</div>
											)

											: (
												<div className={styles.flex} style={{ width: '100%' }}>
													<div className={styles.flex} style={{ alignItems: 'center' }}>
														<IcMDocument width={28} height={28} />
														<text
															style={{ marginLeft: '15px', color: '#fff' }}
														>
															INVOICE NOT AVAILABLE
														</text>
													</div>
												</div>
											)

									}
									interactive
								>
									<div className={styles.flex} direction="column">
										<div className={styles.head}>Amount</div>
										<text
											style={{
												border: '0.5px solid #E0E0E0',
												borderBottom: '2px solid #67C676',
												borderRadius: '2px',
												padding: '1px 6px',
												marginBottom: '2px',
												textAlign: 'center',
											}}
										>
											{item?.grandTotal
												? `${item?.currency} ${item?.grandTotal}`
												: '-'}
										</text>
									</div>
								</Popover>
							</div>
						</div>
					</div>
				))
			)}
			{show && (
				<Modal
					show={show}
					closeOnEscape
					position="full-screen"
					onClose={() => setShow(false)}
					className={styles.filtermodal_wrapper}
				>
					<TaxInvoiceModal />
				</Modal>
			)}
		</>
	);
}

export default InvoiceCard;
