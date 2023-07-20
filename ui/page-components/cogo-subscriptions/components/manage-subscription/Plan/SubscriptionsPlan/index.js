import RenderCard from './RenderCard';
import styles from './styles.module.css';

function SubscriptionsPlan({ userplan, activeTab, subscribeTab, loading }) {
	return (
		<div className={styles.container}>
			<div className={styles.contain}>
				<div className={styles.card_container}>
					<RenderCard
						loading={loading}
						userplan={userplan}
						activeTab={activeTab}
						subscribeTab={subscribeTab}
					/>
				</div>
			</div>
		</div>
	);
}
export default SubscriptionsPlan;
