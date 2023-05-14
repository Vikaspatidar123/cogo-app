import { Button, cl, Modal } from '@cogoport/components';
import { IcAMail, IcMEmail, IcMProfile } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SendQuoteModal({ quoteId, sendQuoteModal, setSendQuoteModal, sendQuotation, pocName, email }) {
	return (
		<Modal show={sendQuoteModal} onClose={() => setSendQuoteModal(false)}>
			<div className={cl`${styles.container} ${styles.send}`}>
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
						<IcMEmail fill="#838383" />
						<p>{email}</p>
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<Button
					className="secondary md cancel"
					onClick={() => setSendQuoteModal(false)}
				>
					No
				</Button>
				<Button className="primary md send" onClick={() => sendQuotationHandler()}>
					Yes
				</Button>
			</div>
		</Modal>
	);
}

export default SendQuoteModal;
