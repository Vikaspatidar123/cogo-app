import { IcMTicket } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import FaqItem from '../../FaqItem';

import styles from './styles.module.css';

const translationKey = 'helpCenter:search_faq_list';

function FaqsList({
	setModalData = () => {},
	setShowPopover = () => {},
	faqListData = [],
	loading = false,
	isMobile = false,
}) {
	const { t } = useTranslation(['helpCenter']);

	const { list = [] } = faqListData;

	if (loading) {
		return (
			<div className={styles.container}>{t(`${translationKey}_loading`)}</div>
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
				<div className={styles.empty_list}>{t(`${translationKey}_no_results_found`)}</div>
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
							{t(`${translationKey}_suitable_answer`)}
							<span>{t(`${translationKey}_raise_ticket`)}</span>
							{t(`${translationKey}_back_to_you`)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default FaqsList;
