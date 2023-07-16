import { Button } from '@cogoport/components';
import { IcMLock } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Link } from '@/packages/next';
import PublicPageNav from '@/ui/commons/components/PublicPageNav';

const CONTENT = ({ t }) => ({
	heading           : t('common:email_verification'),
	forgotPasswordCTA : {
		text : t('common:accept_user_message'),
		link : '/forgot-password',
	},
	submitText: t('common:send_email_text'),
});

function DraftAirwayBill({ res }) {
	const { t } = useTranslation(['common']);
	const content = CONTENT({ t });
	const subheading = res?.messages?.token === 'Token is invalid!' ? t('common:token_invalid_text')
		: t('common:token_expired_text');
	return (
		<div className={styles.container}>
			<PublicPageNav />
			<div className={styles.main_container}>
				<IcMLock width={35} height={35} style={{ marginBottom: 6 }} />
				<h1 className={styles.heading}>{content.heading}</h1>
				<h2 className={styles.sub_heading}>{subheading}</h2>
				<Link
					href={content.forgotPasswordCTA.link}
					passHref
					prefetch={false}
					withPrefix={false}
				>
					<Button themeType="tertiary" type="button" className={styles.forgot_pass_btn}>
						{content.forgotPasswordCTA.text}
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default DraftAirwayBill;
