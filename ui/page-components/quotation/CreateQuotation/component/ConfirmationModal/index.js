import { Button, Modal } from '@cogoport/components';
import { IcMProfile, IcAMail } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { forwardRef, useState, useEffect } from 'react';

import iconUrl from '../../../utils/iconUrl.json';
import useRedirectUrl from '../../../utils/redirectUrl';

import styles from './styles.module.css';

function ConfirmationModal(props, ref) {
	const {
		confirmCreateQuotation,
		setConfirmCreateQuotation,
		sendQuotation,
		sendQuoteLoading = false,
		createQuoteData = {},
		sendQuotedata = {},
	} = props;

	const { query } = useRouter();
	const [sendQuoteModal, setSendQuoteModal] = useState(false);
	const [show, setShow] = useState(false);

	const { redirectPreview, redirectViewQuote } = useRedirectUrl();
	const { current } = ref;
	const { buyerDetails = {} } = current;
	const { email = '', pocName = '' } = buyerDetails;
	const { id: quotationId } = createQuoteData;

	useEffect(() => {
		if (!sendQuoteLoading && sendQuotedata?.id) {
			setShow(true);
			setTimeout(() => {
				redirectViewQuote();
				setShow(false);
			}, 4000);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sendQuoteLoading, sendQuotedata]);

	const renderTitle = () => {
		if (query.id) {
			return 'Quotation Saved Successfully';
		}
		return 'Quotation Created Successfully';
	};
	const sendQuotationHandler = () => {
		sendQuotation(quotationId);

		setSendQuoteModal(false);
	};
	return (
		<>

			<Modal
				show={confirmCreateQuotation}
				onClose={() => {
					setConfirmCreateQuotation(false);
					redirectViewQuote();
				}}
				closeOnOuterClick={() => setConfirmCreateQuotation(false)}
			>
				{!sendQuoteModal && (
					<>
						<div className={styles.flex_box}>
							{sendQuoteLoading
								? <img src={iconUrl.loading} alt="loading" />
								: (
									<div>
										<div className={styles.flex_box}>
											<img src={iconUrl.successGif} alt="cogo" />
										</div>
										<h2 className={styles.title}>{renderTitle()}</h2>
									</div>
								)}
						</div>
						<div className={styles.footer}>
							<Button
								themeType="secondary"
								onClick={() => {
									redirectPreview(quotationId);
								}}
							>
								Preview Quotation
							</Button>

							<Button onClick={() => setSendQuoteModal(true)}>
								Send Quotation
							</Button>

						</div>
					</>
				)}
				{sendQuoteModal && (
					<>
						<div className={styles.container}>
							<div>
								<IcAMail width={100} height={100} />
							</div>
							<h3 className="sendTitle">
								This would send quotation pdf via mail to the recipient. Are you sure you want
								to proceed?
							</h3>
							<div className="info">
								<div>
									<IcMProfile fill="#838383" />
									<p>{pocName}</p>
								</div>
								<div>
									<IcMProfile fill="#838383" />
									<p>{email}</p>
								</div>
							</div>
						</div>
						<div className={styles.footer}>
							<Button themeType="secondary" onClick={() => setSendQuoteModal(false)}>
								No
							</Button>
							<Button onClick={() => sendQuotationHandler()}>
								Yes
							</Button>
						</div>
					</>
				)}
			</Modal>
			<Modal show={show} size="sm">
				<img src={iconUrl.sendQuote} alt="send" />
			</Modal>
		</>

	);
}

export default forwardRef(ConfirmationModal);
