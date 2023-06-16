import { Button, cl } from '@cogoport/components';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

function RenderSelectedAddress({
	setShowMoreAddress = () => {},
	setSelectAddressId = () => {},
	selectAddressId,
	data,
}) {
	const { t } = useTranslation(['cogoStore']);
	const { id = '', address = '', name = '', pincode = '' } = data || {};
	return (
		<div
			className={cl` ${selectAddressId === id ? styles.active_card : ''} ${
				styles.content
			}`}
			key={id}
			role="presentation"
			onClick={() => setSelectAddressId(id)}
		>
			<div className={styles.left_div}>
				<div className={styles.name}>
					{t('cogoStore:deliver_to')}: {name}
				</div>
				<div className={styles.address}>
					{address}, <span>{pincode}</span>
				</div>
			</div>
			<div className={styles.right_div}>
				<Button
					themeType="secondary"
					size="sm"
					onClick={() => setShowMoreAddress(true)}
				>
					{t('cogoStore:change_address')}
				</Button>
			</div>
		</div>
	);
}

export default RenderSelectedAddress;
