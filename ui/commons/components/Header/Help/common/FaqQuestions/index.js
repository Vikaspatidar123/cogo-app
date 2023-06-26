import { IcMDocument, IcMOpenlink } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function FaqQuestions({ data = [], fromChat = false }) {
	const { locale = '', query } = useRouter();

	const handleClick = (faqId) => {
		const baseUrl = window.location.origin;
		const urlToOpen = `${baseUrl}/${locale}/${query?.partner_id}/help-center/faq/${faqId}/`;
		window.open(urlToOpen, '_blank', 'noreferrer');
	};

	return (data || []).map((item) => (
		<div
			className={styles.faq_question}
			key={fromChat ? item?.ID : item?.id}
			onClick={() => handleClick(fromChat ? item?.ID : item?.id)}
			role="presentation"
		>
			<div className={styles.document_query_name}>
				<IcMDocument className={styles.icm_icons} fill="#828282" />
				<div className={styles.query_name}>{item?.question_abstract}</div>
			</div>
			<IcMOpenlink className={styles.icm_icons} fill="#034AFD" />
		</div>
	));
}

export default FaqQuestions;
