import { Button } from '@cogoport/components';
import { IcMLock } from '@cogoport/icons-react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import PublicPageNav from '@/ui/commons/components/PublicPageNav';

function AcceptUser({ errorMessage }) {
	const { t } = useTranslation(['common']);

	if (!errorMessage) {
		return <p>{t('common:loading_text')}</p>;
	}
	return (
		<div className={styles.container}>
			<PublicPageNav />
			<div className={styles.main_container}>
				<IcMLock width={35} height={35} style={{ marginBottom: 6 }} />
				<h1 className={styles.heading}>
					{t('common:user_invitation_text')}
				</h1>
				<h2 className={styles.sub_heading}>{t('common:accept_user_text')}</h2>

				<Link
					href="/forgot-password"
					passHref
					prefetch={false}
					withPrefix={false}
				>
					<Button themeType="tertiary" type="button" className={styles.forgot_pass_btn}>
						{t('common:accept_user_message')}
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default AcceptUser;
