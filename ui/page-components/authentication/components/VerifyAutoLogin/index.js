import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import HeaderLayout from '../HeaderLayout';

import styles from './styles.module.css';

import { Link } from '@/packages/next';

function VerifyAutoLogin() {
	const { t } = useTranslation(['common', 'verifyAutoLogin']);
	const content = {
		heading           : t('common:text_1'),
		subheading        : t('verifyAutoLogin:verify_auto_login_content_sub_heading'),
		forgotPasswordCTA : {
			text : t('verifyAutoLogin:verify_auto_login_content_forgot_password_text'),
			link : '/forgot-password',
		},
		submitText: t('verifyAutoLogin:verify_auto_login_content_submit_text'),
	};

	return (
		<HeaderLayout
			rightParams={{
				label : t('verifyAutoLogin:verify_auto_login_header_layout_right_params_cta'),
				href  : '/login',
				cta   : t('verifyAutoLogin:verify_auto_login_header_layout_right_params_cta'),
			}}
		>
			<div className={styles.container}>
				<div className={styles.content}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/lock 2.svg"
						alt=""
					/>
					<h1 className={styles.h1}>{content.heading}</h1>
					<h2 className={styles.h2}>{content.subheading}</h2>

					<div className={styles.row}>
						<Link
							href={content.forgotPasswordCTA.link}
							passHref
							prefetch={false}
							withPrefix={false}
						>
							<Button themeType="tertiary" className={styles.text_button}>
								{content.forgotPasswordCTA.text}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</HeaderLayout>
	);
}

export default VerifyAutoLogin;
