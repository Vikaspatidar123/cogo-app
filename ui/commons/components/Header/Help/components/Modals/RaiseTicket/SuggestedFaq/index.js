import { useTranslation } from 'react-i18next';

import FaqList from './FaqList';
import styles from './styles.module.css';

const translationKey = 'common:components_header_tickets_create';

function SuggestedFaq({ selectedQuery }) {
	const { t } = useTranslation(['common']);

	return (
		<div>
			<div className={styles.heading}>
				{t(`${translationKey}_suggested_faq_heading`)}
			</div>
			<FaqList selectedQuery={selectedQuery} />
		</div>
	);
}

export default SuggestedFaq;
