import { Button } from '@cogoport/components';

import BackIcon from './icons/backIcon.svg';
import Item from './Item';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function SwitchPartner({ setShowChannelPartners }) {
	const {
		profile: { partners },
		general: { pathname },
	} = useSelector(({ profile, general }) => ({ profile, general }));

	const onBack = () => {
		setShowChannelPartners(false);
	};

	return (
		<div type="enter">
			<div className={styles.container}>
				<div className={styles.header}>
					<BackIcon
						width="24px"
						height="24px"
						style={{ cursor: 'pointer' }}
						onClick={onBack}
					/>

					{pathname === '/get-started' ? null : (
						<Button className={styles.styled_button} as="a" href="/get-started">
							+ Add New Account
						</Button>
					)}
				</div>

				<div className={styles.separator} />

				<div className={styles.list}>
					{partners.map((item) => (
						<Item key={item.id} item={item} />
					))}
				</div>
			</div>
		</div>
	);
}

export default SwitchPartner;
