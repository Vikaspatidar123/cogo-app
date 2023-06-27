import { Button, cl, Modal } from '@cogoport/components';
import { IcAMail, IcMEmail, IcMProfile } from '@cogoport/icons-react';

import useSendQuotation from '../../hook/useSendQuotation';

import styles from './styles.module.css';

function SendQuoteModal({ quoteId = '', sendQuoteModal, setSendQuoteModal, pocName = '', email = '' }) {
	const { sendQuotation, sendQuoteLoading } = useSendQuotation();

	return (
		<Modal show={sendQuoteModal} onClose={() => setSendQuoteModal(false)}>
			<Modal.Body>
				<div className={cl`${styles.container} ${styles.send}`}>
					<div>
						<IcAMail width={100} height={100} />
					</div>
					<h3 className={styles.send_title}>
						This would send quotation pdf via mail to the recipient. Are you sure you want
						to proceed?
					</h3>
					<div className={styles.info}>
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
			</Modal.Body>

			<Modal.Footer align="center">
				<Button
					className={styles.cancel}
					themeType="secondary"
					onClick={() => setSendQuoteModal(false)}
					disabled={sendQuoteLoading}
				>
					No
				</Button>
				<Button
					themeType="accent"
					loading={sendQuoteLoading}
					onClick={() => sendQuotation({ quoteId })}
				>
					Yes
				</Button>

			</Modal.Footer>

		</Modal>
	);
}

export default SendQuoteModal;
