import { Button, ButtonIcon } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import iconUrl from '../../utils/iconUrl.json';
import useViewQuote from '../hook/useViewQuote';

import BuyerDetails from './BuyerDetails';
import ChargeDetails from './ChargeDetails';
import Footer from './Footer';
import Header from './Header';
import ProductDetails from './ProductDetails';
import SendQuoteModal from './SendQuoteModal';
import styles from './styles.module.css';
import TransportDetails from './TransportDetails';
import Watermark from './Watermark';

function ViewQuote() {
	// const [showIcon, setShowIcon] = useState(false);
	const [sendQuoteModal, setSendQuoteModal] = useState(false);

	const { loading = false, viewQuoteData = {}, quoteId } = useViewQuote();

	const { buyerDetails = {}, sellerDetails = {}, documentStatus = '' } = viewQuoteData || {};

	return (
		<>
			{loading && (
				<div className={styles.loader}>
					<img src={iconUrl.loading} className={styles.cogoloader} alt="loading" />
					<div className={styles.modal} />
				</div>
			)}
			<div className={styles.main_container}>
				<ButtonIcon size="xl" icon={<IcMArrowBack />} themeType="primary" />

				<div className={styles.container}>
					<Header sellerDetails={sellerDetails} />
					<div className={styles.section2}>
						<BuyerDetails {...viewQuoteData} />
						<TransportDetails {...viewQuoteData} />
						<ProductDetails {...viewQuoteData} />
						<ChargeDetails {...viewQuoteData} />
						<Watermark />
					</div>
					<Footer sellerDetails={sellerDetails} />
				</div>

				<div className={styles.btn_container}>
					<div className={styles.flex_btn}>
						<Button
							className={styles.edit}
							themeType="tertiary"
							// onClick={() => redirectViewQuote()}
						>
							Back
						</Button>
						<Button
							themeType="accent"
							// onClick={() => downloadQuotation(id)}
						>
							Download
						</Button>
					</div>
					<div className={styles.flex_btn}>
						{documentStatus !== 'SENT' && (
							<Button
								themeType="tertiary"
								className="secondary md edit"
								// onClick={() => redirectEdit(id)}
							>
								Edit
							</Button>
						)}
						<Button
							themeType="accent"
							className={styles.edit}
							onClick={() => setSendQuoteModal(true)}
							// disabled={sendLoading}
						>
							{documentStatus === 'SENT' ? 'RESEND' : 'SEND'}
						</Button>
					</div>
				</div>
			</div>
			<SendQuoteModal
				quoteId={quoteId}
				sendQuoteModal={sendQuoteModal}
				setSendQuoteModal={setSendQuoteModal}
				// sendQuotation={sendQuotation}
				pocName={buyerDetails?.pocName}
				email={buyerDetails?.pocEmail}
			/>
		</>
	);
}

export default ViewQuote;
