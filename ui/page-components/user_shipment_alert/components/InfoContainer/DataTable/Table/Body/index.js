import { useRouter } from 'next/router';

import styles from './styles.module.css';

function Body({ item = {} }) {
	const { data = [], header = [] } = item || {};
	const router = useRouter();
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
		<div
			className={styles.view}
			role="presentation"
			onClick={() => router.push('/traking/ocean/1ebd8c8e-faee-44ff-ad62-d8b35ee4e79b?public=true')}
		>
			View Tracking

		</div>
	</div>
        ))
            }
		</div>
	);
}

export default Body;
