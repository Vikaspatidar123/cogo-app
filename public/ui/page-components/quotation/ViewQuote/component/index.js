import { Button, ButtonIcon } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import useRedirectUrl from '../../utils/redirectUrl';
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

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ViewQuote() {
	const [sendQuoteModal, setSendQuoteModal] = useState(false);

	const { downloadQuotation, redirectEdit, redirectViewQuote } = useRedirectUrl();
	const { loading = false, viewQuoteData = {}, quoteId = '' } = useViewQuote();

	const { buyerDetails = {}, sellerDetails = {}, documentStatus = '' } = viewQuoteData || {};

	return (
		<>
			{loading && (
				<div className={styles.loader}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.loading}
						className={styles.cogoloader}
						alt="loading"
						width={100}
						height={100}
					/>
					<div className={styles.modal} />
				</div>
			)}

			<div className={styles.main_container}>
				<ButtonIcon size="xl" icon={<IcMArrowBack />} onClick={redirectViewQuote} themeType="primary" />

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
							type="button"
							onClick={() => redirectViewQuote()}
						>
							Back
						</Button>
						<Button
							themeType="accent"
							type="button"
							onClick={() => downloadQuotation(quoteId)}
						>
							Download
						</Button>
					</div>

					<div className={styles.flex_btn}>
						{documentStatus !== 'SENT' && (
							<Button
								themeType="tertiary"
								type="button"
								className={styles.edit}
								onClick={() => redirectEdit(quoteId)}
							>
								Edit
							</Button>
						)}
						<Button
							themeType="accent"
							type="button"
							onClick={() => setSendQuoteModal(true)}
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
				pocName={buyerDetails?.pocName}
				email={buyerDetails?.pocEmail}
			/>
		</>
	);
}

export default ViewQuote;
