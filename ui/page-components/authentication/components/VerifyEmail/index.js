import { Button } from '@cogoport/components';
import React from 'react';

import getVerifyEmail from '../../hooks/useVerifyEmail';
import HeaderLayout from '../HeaderLayout';

import styles from './styles.module.css';

import { Link } from '@/packages/next';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

function VerifyEmail() {
	const content = {
		heading           : 'Email Verification Failed',
		subheading        : 'We regret to inform you that we were unable to verify your email.',
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

VerifyEmail.getInitialProps = async (ctx) => {
	const { query } = ctx;
	const { id } = query;
	try {
		const res = await getVerifyEmail({ email_token: id });
		const { hasError } = res || {};
		if (!hasError) {
			const { token } = (res || {}).data || {};
			// setCookieAndRedirect(token, ctx, '/app?from_signup=true');
			const redirectPath = '/onboarding?from_signup=true&mail_verify=true';
			setCookieAndRedirect(token, ctx, redirectPath);
		}
	} catch (e) {
		console.log(e.toString());
	}
	return { layout: 'none' };
};

export default VerifyEmail;
