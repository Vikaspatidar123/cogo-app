import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import Item from './Item';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function SwitchUser({ setShow }) {
	const {
		profile: { organizations },
		general: { pathname },
	} = useSelector(({ profile, general }) => ({ profile, general }));
	const { t } = useTranslation(['common']);
	const onBack = () => {
		setShow(false);
	};
	const getStarted = () => {
		window.location.href = '/get-started';
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
						{t('common:add_new_account_button')}
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
