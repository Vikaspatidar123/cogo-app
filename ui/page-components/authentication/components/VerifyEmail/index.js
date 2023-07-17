import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import HeaderLayout from '../HeaderLayout';

import styles from './styles.module.css';

import { Link } from '@/packages/next';

function VerifyEmail() {
	const { t } = useTranslation(['verifyAutoLogin']);

	const translationKey = 'verifyAutoLogin:verify_auto_login';

	const content = {
		heading           : t(`${translationKey}_content_heading`),
		subheading        : t(`${translationKey}_content_sub_heading`),
		forgotPasswordCTA : {
			text : t(`${translationKey}_content_forgot_password_text`),
			link : '/forgot-password',
		},
		submitText: t(`${translationKey}_content_submit_text`),
	};

	return (
		<HeaderLayout
			rightParams={{
				label : t(`${translationKey}_header_layout_right_params_label`),
				href  : '/login',
				cta   : t(`${translationKey}_header_layout_right_params_cta`),
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

					<div className={styles.Row}>
						<Link
							href={content.forgotPasswordCTA.link}
							passHref
							prefetch={false}
							withPrefix={false}
						>
							<Button as="a" themeType="tertiary" className={styles.text_button}>
								{content.forgotPasswordCTA.text}
							</Button>
						</Link>
						<div />
					</div>
				</div>
			</div>
		</HeaderLayout>
	);
}

export default VerifyEmail;
