/* eslint-disable no-undef */
import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

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
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					width="24px"
					height="24px"
					style={{ cursor: 'pointer' }}
					onClick={() => onBack()}
				/>

				{pathname === '/get-started' ? null : (
					<Button size="md" themeType="secondary" onClick={() => getStarted()}>
						+ Add New Account
					</Button>
				)}
			</div>

			<div className={styles.separator} />

			<div className={styles.list}>
				{(organizations || []).map((item) => (
					<Item key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}

export default SwitchUser;
