import FaqList from './FaqList';
import styles from './styles.module.css';

function SuggestedFaq({ selectedQuery }) {
	return (
		<div>
			<div className={styles.heading}>
				Suggested FAQ&apos;s
			</div>
			<FaqList selectedQuery={selectedQuery} />
		</div>
	);
}

export default SuggestedFaq;
