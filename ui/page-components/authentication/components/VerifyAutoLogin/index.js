import { Toast, Button } from '@cogoport/components';
import React from 'react';

import getVerifyAutoLogin from '../../hooks/useVerifyAutoLogin';
import HeaderLayout from '../HeaderLayout';

import styles from './styles.module.css';

import { Link } from '@/packages/next';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const PAGE_MAPPINGS = {
	app_discover_rates  : 'book',
	search_results      : 'book-deep-link',
	app_dashboard       : 'dashboard',
	manage_subscription : 'saas/cogo-subscriptions/manage-subscription',
	payment_dashboard   : 'payment-dashboard',
	shipments           : 'shipments',
};

function VerifyAutoLogin() {
	const content = {
		heading           : 'Email Verification Failed!',
		subheading        : 'We could not verify your email.',
		forgotPasswordCTA : {
			text : 'Try Setting your Password Again?',
			link : '/forgot-password',
		},
		submitText: 'Send Verification Email',
	};

	return (
		<HeaderLayout
			rightParams={{
				label : 'Already a User?',
				href  : '/login',
				cta   : 'LOGIN',
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

VerifyAutoLogin.getInitialProps = async (ctx) => {
	const { query } = ctx;
	const {
		token: auth_token,
		lead_user_id,
		lead_organization_id,
		lead_action_id,
	} = query;

	try {
		const response = await getVerifyAutoLogin({
			token: auth_token,
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

			let uri = `/v2/${organization_id}/${organization_branch_id}/${PAGE_MAPPINGS?.[redirect_page]}`;
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
		Toast.error('Something went wrong, we are working on it!');

		// Toast(e.toString());
	}

	return { layout: 'none' };
};

export default VerifyAutoLogin;
