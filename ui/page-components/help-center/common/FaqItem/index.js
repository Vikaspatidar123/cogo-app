import { Placeholder, cl } from '@cogoport/components';
import { IcMOpenlink, IcMDocument } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function FaqItem({
	faqData = {},
	loading = false,
	fromTopics = false,
	recentQueries = false,
}) {
	const { push } = useRouter();
	const {
		id = '',
		question_abstract = '',
		faq_question_id = '',
	} = faqData || {};

	const faqId = recentQueries ? faq_question_id : id;

	const handleClick = () => {
		push('/help-center/faq/[faq_id]', `/help-center/faq/${faqId}`);
	};

	if (loading) {
		return (
			<div className={styles.container}>
				<Placeholder className={styles.placeholder} />
			</div>
		);
	}

	if (!question_abstract) {
		return null;
	}

	return (
		<div
			className={cl`${styles.container} ${fromTopics ? styles.faq_item : ''}`}
			role="presentation"
			onClick={handleClick}
		>
			<div className={styles.faq_container}>
				<IcMDocument className={styles.document_icon} />
				<div className={styles.question}>{question_abstract}</div>
			</div>
			<div className={styles.icon_container}>
				<IcMOpenlink className={styles.redirect_icon} />
			</div>
		</div>
	);
}

export default FaqItem;
