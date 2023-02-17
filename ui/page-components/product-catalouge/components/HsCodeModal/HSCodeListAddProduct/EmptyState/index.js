import EmptyIcon from '../../../../assets/ic-empty-non-funded.svg';

// import { Container } from './styles';
import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<div>
				<EmptyIcon width="150px" height="150px" />
				<div className="text">No Data Found</div>
			</div>
		</div>
	);
}

export default EmptyState;
