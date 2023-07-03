import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import getVerifyAutoSignUpEmail from '../../hooks/useVerifyAutoSignUpEmail';
import HeaderLayout from '../HeaderLayout';

import styles from './styles.module.css';

import { Link } from '@/packages/next';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const PAGE_MAPPINGS = {
	app_discover_rates : 'book',
	search_results     : 'book-deep-link',
	app_dashboard      : 'dashboard',
};

function VerifyAutoSignUpEmail() {
	const { t } = useTranslation(['verifyAutoLogin']);

	const content = {
		heading           : `${t('verifyAutoLogin:verify_auto_login_content_heading')}`,
		subheading        : `${t('verifyAutoLogin:verify_auto_login_content_sub_heading')}`,
		forgotPasswordCTA : {
			text : `${t('verifyAutoLogin:verify_auto_login_content_forgot_password_text')}`,
			link : '/forgot-password',
		},
		submitText: `${t('verifyAutoLogin:verify_auto_login_content_submit_text')}`,
	};

	return (
		<HeaderLayout
			rightParams={{
				label : `${t('verifyAutoLogin:verify_auto_login_header_layout_right_params_cta')}`,
				href  : '/login',
				cta   : `${t('verifyAutoLogin:verify_auto_login_header_layout_right_params_cta')}`,
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

VerifyAutoSignUpEmail.getInitialProps = async (ctx) => {
	const { query } = ctx;
	const {
		token: email_token,
		lead_user_id,
		lead_organization_id,
		lead_action_id,
	} = query;

	try {
		const response = await getVerifyAutoSignUpEmail({
			email_token,
			lead_user_id,
			lead_organization_id,
			lead_action_id,
		});

		const { hasError } = response || {};

		if (!hasError) {
			const {
				token,
				lead_action = {},
				organization_id,
				organization_branch_id,
				user_id,
			} = (response || {}).data || {};

			const redirect_page = lead_action?.action_config?.redirect_page || '';
			// redirect_page = 'search_results';

			let uri = `/${organization_id}/${organization_branch_id}/${PAGE_MAPPINGS?.[redirect_page]}`;
			if (redirect_page === 'search_results') {
				const queryObj = {
					importer_exporter_id        : organization_id,
					importer_exporter_branch_id : organization_branch_id,
					user_id,
					lead_action_id,
				};

				uri = `${uri}?query=${JSON.stringify(queryObj)}`;
			}

			if (
				['app_dashboard', 'app_discover_rates'].includes(redirect_page)
        && lead_action?.action_config?.search_mode === 'generic_search'
			) {
				uri = `${uri}?service_type=${lead_action?.action_config?.service_type}`;
			}

			setCookieAndRedirect(token, ctx, uri);
		}
	} catch (e) {
		// toast.error('Something went wrong, we are working on it!');
		console.log(e.toString());
	}

	return { layout: 'none' };
};

export default VerifyAutoSignUpEmail;
