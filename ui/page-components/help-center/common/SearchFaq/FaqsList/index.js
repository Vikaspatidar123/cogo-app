import { IcMTicket } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import FaqItem from '../../FaqItem';

import styles from './styles.module.css';

function FaqsList({
	setModalData = () => {},
	setShowPopover = () => {},
	faqListData = [],
	loading = false,
	isMobile = false,
}) {
	const { list = [] } = faqListData;

	if (loading) {
		return (
			<div className={styles.container}>Loading...</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.list_container}>
				{(list || []).map((itm) => (
					<FaqItem key={itm?.id} faqData={itm} searchItem />
				))}
			</div>
			{isEmpty(list) && (
				<div className={styles.empty_list}>No results found.</div>
			)}
			{!isMobile && (
				<div
					className={styles.empty_container}
					role="presentation"
					onClick={() => {
						setModalData({ type: 'raise_a_ticket' });
						setShowPopover(false);
					}}
				>
					<div className={styles.faq_container}>
						<IcMTicket className={styles.ticket_icon} />
						<div className={styles.question}>
							Didn&apos;t find a suitable answer?
							<span>Raise a ticket</span>
							and we&apos;ll get back to you.
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default FaqsList;
