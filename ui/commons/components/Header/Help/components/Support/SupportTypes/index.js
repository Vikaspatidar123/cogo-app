import { cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import getSupportOptions from './getSupportOptions';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const translationKey = 'common:components_header_tickets_support';

function SupportTypes({
	setModalData = () => {},
	setShowPopover = () => {},
	unreadCount = GLOBAL_CONSTANTS.zeroth_index,
}) {
	const { push } = useRouter();

	const { t } = useTranslation(['common']);

	const supportTypeOptions = getSupportOptions({ t });

	const handleClick = ({ name, navigate = false }) => {
		if (!navigate) {
			setModalData({ type: name });
			setShowPopover(false);
		} else {
			push('/help-center');
		}
	};

	return (
		<>
			{supportTypeOptions.map((item) => {
				const { icon, label, name, navigate } = item;
				return (
					<div
						className={cl`${styles.type_container}`}
						key={name}
						role="presentation"
						onClick={() => handleClick({ name, navigate })}
					>
						<div className={styles.header_styles}>
							{icon}
							<div className={styles.label_styles}>{label}</div>
						</div>
					</div>
				);
			})}
			<div
				className={styles.footer}
				role="presentation"
				onClick={() => handleClick({ name: 'tickets_list' })}
			>
				<div className={styles.header_styles}>
					{t(`${translationKey}_all`)}
					{unreadCount ? (
						<div className={styles.unread_chats_count}>{unreadCount}</div>
					) : null}
				</div>
				<IcMArrowRight className={styles.arrow_right} />
			</div>
		</>
	);
}

export default SupportTypes;
