import { cl, Button, Modal } from '@cogoport/components';
import { IcMEmail, IcMProfile, IcAMail } from '@cogoport/icons-react';
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
	const closeModalHandler = () => {
		setConfirmCreateQuotation(false);
		redirectViewQuote();
	};
	return (
		<>

			<Modal
				show={confirmCreateQuotation}
				onClose={closeModalHandler}
				closeOnOuterClick={closeModalHandler}
			>
				{!sendQuoteModal && (
					<>
						<div className={styles.flex_box}>
							{sendQuoteLoading
								? <img src={iconUrl.loading} alt="loading" className={styles.loading} />
								: (
									<div>
										<div className={styles.flex_box}>
											<img src={iconUrl.successGif} className={styles.success_img} alt="cogo" />
										</div>
										<h2 className={styles.title}>{renderTitle()}</h2>
									</div>
								)}
						</div>
						<div className={cl`${styles.flex_box} ${styles.footer}`}>
							<Button
								themeType="secondary"
								onClick={() => {
									redirectPreview(quotationId);
								}}
								disabled={sendQuoteLoading}
							>
								Preview Quotation
							</Button>

							<Button
								onClick={() => setSendQuoteModal(true)}
								className={styles.send_btn}
								disabled={sendQuoteLoading}
							>
								Send Quotation
							</Button>

						</div>
					</>
				)}
				{sendQuoteModal && (
					<>
						<div className={cl`${styles.container} ${styles.flex_box}`}>
							<div>
								<IcAMail width={100} height={100} />
							</div>
							<h3 className={styles.title}>
								This would send quotation pdf via mail to the recipient. Are you sure you want
								to proceed?
							</h3>
							<div className={styles.info}>
								<div className={styles.flex_box}>
									<IcMProfile fill="#838383" />
									<p>{pocName}</p>
								</div>
								<div className={styles.flex_box}>
									<IcMEmail fill="#838383" />
									<p>{email}</p>
								</div>
							</div>
						</div>
						<div className={cl`${styles.flex_box} ${styles.footer}`}>
							<Button
								themeType="secondary"
								onClick={() => setSendQuoteModal(false)}
								disabled={sendQuoteLoading}
							>
								No
							</Button>
							<Button
								onClick={() => sendQuotationHandler()}
								className={styles.send_btn}
								disabled={sendQuoteLoading}
							>

								Yes
							</Button>
						</div>
					</>
				)}
			</Modal>
			<Modal show={show} size="sm">
				<img src={iconUrl.sendQuote} alt="send" className={styles.send_img} />
			</Modal>
		</>

	);
}

export default forwardRef(ConfirmationModal);
