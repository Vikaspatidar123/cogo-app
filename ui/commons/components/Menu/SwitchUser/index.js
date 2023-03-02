/* eslint-disable no-undef */
import { Button } from '@cogoport/components';
import Item from './Item';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function SwitchUser({ setShow }) {
	const {
		profile: { organizations },
		general: { pathname },
	} = useSelector(({ profile, general }) => ({ profile, general }));

	const onBack = () => {
		setShow(false);
	};
	const getStarted = () => {
		window.location.href = '/v2/get-started';
	};
	return (
		<div type="enter">
			<div className={styles.container}>
				<div className={styles.header}>
					<img src='https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/backIcon.svg' alt='cogo'
						width="24px"
						height="24px"
						style={{ cursor: 'pointer' }}
						onClick={onBack}
					/>

					{pathname === '/get-started' ? null : (
						<Button className={styles.styled_button} onClick={() => getStarted()}>
							+ Add New Account
						</Button>
					)}
				</div>

				<div className={styles.separator} />

				<div className={styles.list}>
					{organizations.map((item) => (
						<Item key={item.id} item={item} />
					))}
				</div>
			</div>
		</div>
	);
}

export default SwitchUser;
