import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import HeaderLayout from '../HeaderLayout';

import styles from './styles.module.css';

import { Link, Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

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
				<Image
					src={GLOBAL_CONSTANTS.image_url.vault_lock_image}
					alt="lock"
					width={64}
					height={64}
				/>
				<h1>{content.heading}</h1>
				<h2>{content.subheading}</h2>

				<Link
					href={content.forgotPasswordCTA.link}
					passHref
					prefetch={false}
					withPrefix={false}
				>
					<Button themeType="link" size="md">
						{content.forgotPasswordCTA.text}
					</Button>
				</Link>

			</div>
		</HeaderLayout>
	);
}

export default VerifyEmail;
