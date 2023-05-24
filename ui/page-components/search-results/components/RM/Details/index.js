import { cl } from '@cogoport/components';
import { IcCSendWhatsapp, IcMEmail } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function RM() {
	const { agent, kyc_status } = useSelector(({ profile }) => ({
		account_type : profile?.organization?.account_type,
		agent        : profile?.organization?.agent,
		user_name    : profile.name,
		kyc_status   : profile?.organization?.kyc_status,
	}));

	const goTo = (href) => {
		if (typeof window !== 'undefined') {
			window.open(href);
		}
	};

	if (!agent || kyc_status !== 'verified') {
		return null;
	}

	return (
		<div className={styles.container}>
			<div style={{ padding: '0px 12px' }}>
				<div className={cl`${styles.user_name} ${styles.assistance}`}>
					Do you need some personal assistance?
				</div>
			</div>

			<div className={styles.line} />

			<div style={{ padding: '0px 12px' }}>
				<div className={`${styles.user_name} ${styles.rm_name}`}>{agent?.name}</div>

				<div className={`${styles.user_name} ${styles.rm_designation}`}>Key Relationship Manager</div>

				{agent?.mobile_country_code ? (
					<div
						role="presentation"
						className={styles.space_between}
						onClick={() => goTo(`mailto:${agent?.email}`)}
					>
						<div className={cl`${styles.link} ${styles.description}`}>{agent?.email}</div>

						<div className={styles.icons_container}>
							<IcMEmail />
						</div>
					</div>
				) : null}

				{agent?.mobile_country_code ? (
					<div
						role="presentation"
						className={styles.space_between}
						onClick={() => goTo(`tel:${agent?.mobile_number}`)}
					>
						<div className={cl`${styles.link}  ${styles.description}`}>
							{agent?.mobile_country_code}
							{' '}
							{agent?.mobile_number}
						</div>

						<div className={styles.icons_container}>
							<IcCSendWhatsapp />
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default RM;
