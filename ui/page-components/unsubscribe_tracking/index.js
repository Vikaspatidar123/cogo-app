import useContainerUpdateSubscription from './hooks/useContainerUpdateSubscription';
import RenderContent from './RenderContent';
import styles from './styles.module.css';

import PublicPageNav from '@/ui/commons/components/PublicPageNav';

function UnSubscribeFromTracking() {
	const { status, onConfirm } = useContainerUpdateSubscription();
	return (
		<div className={styles.container}>
			<PublicPageNav />
			<div className={styles.content}>
				<RenderContent status={status} onConfirm={onConfirm} />
			</div>
		</div>
	);
}
export default UnSubscribeFromTracking;
