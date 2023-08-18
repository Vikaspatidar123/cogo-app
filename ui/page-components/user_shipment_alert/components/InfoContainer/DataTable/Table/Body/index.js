import styles from './styles.module.css';

function Body({ item = {} }) {
	const { data = [], header = [] } = item || {};
	return (
		<div>
			{
        data.map((info) => (
	<div className={styles.box}>
		{header.map((head) => (
			<div>
				{' '}
				{info[head]
					? <div className={styles.head}>{info?.[head]}</div>
					:				<div className={styles.head}>---</div>}

			</div>
		))}
		{' '}
		<div className={styles.view}>View Tracking</div>
	</div>
        ))
            }
		</div>
	);
}

export default Body;
