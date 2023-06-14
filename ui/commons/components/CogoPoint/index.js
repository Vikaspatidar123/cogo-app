import { IcCCogoCoin } from '@cogoport/icons-react';

import useGetCogopoints from '../../hooks/useGetCogoPoints';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function CogoPoint() {
	const { stats = {} } = useGetCogopoints();
	const { earned = 0 } = stats || {};
	const { push } = useRouter();
	const onClick = () => {
		push('/saas/cogopoint');
	};
	return (
		<div
			className={styles.container}
			role="presentation"
			onClick={() => onClick()}
		>
			<IcCCogoCoin width={26} height={20} className={styles.coin} />
			<div>
				Cogopoints :
				<span className={styles.earn}>
					{earned ? earned.toLocaleString('en-IN') : '0'}
				</span>
			</div>
		</div>
	);
}
export default CogoPoint;
