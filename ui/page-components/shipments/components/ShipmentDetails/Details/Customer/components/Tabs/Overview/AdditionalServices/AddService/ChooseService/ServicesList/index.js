import EmptyState from '../../../../../../EmptyState';

import CardItem from './CardItem';
import CardHeader from './Header';
import styles from './styles.module.css';

function ServicesList({ fields, data, loading }) {
	return (
		<div className={styles.container}>
			<CardHeader fields={fields} />

			{data.length ? (
				<div style={{ height: '400px', overflow: 'scroll' }}>
					{(data || []).map((item) => (
						<CardItem item={item} loading={loading} fields={fields} />
					))}
				</div>
			) : (
				<EmptyState />
			)}
		</div>
	);
}

export default ServicesList;
