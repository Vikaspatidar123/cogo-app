import { Button } from '@cogoport/components';
import { IcMLock } from '@cogoport/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';
import acceptPassword from './useAcceptPassword';

import PublicPageNav from '@/ui/commons/components/PublicPageNav';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const content = {
	heading           : 'User Invitation',
	subheading        : 'The link you received in email is already used or expired',
	forgotPasswordCTA : { text: 'Try Setting your Password Again?', link: '/forgot-password' },
};

function AcceptUser({ errorMessage }) {
	if (!errorMessage) {
		return <p>Loading...</p>;
	}
	return (
		<div className={styles.container}>
			<PublicPageNav />
			<div className={styles.main_container}>
				<IcMLock width={35} height={35} style={{ marginBottom: 6 }} />
				<h1 className={styles.heading}>{content.heading}</h1>
				<h2 className={styles.sub_heading}>{content.subheading}</h2>

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

AcceptUser.getInitialProps = async (ctx) => {
	const { query } = ctx;
	const { id } = query;
	let errorMessage = false;
	try {
		const res = await acceptPassword({ token: id });
		const { hasError } = res || {};

		if (!hasError) {
			const { token } = (res || {}).data || {};
			setCookieAndRedirect(token, ctx, '/onboarding?from_signup=true');
		} else {
			errorMessage = true;
		}
	} catch (e) {
		errorMessage = true;
		console.log(e.toString());
	}
	return { layout: 'none', errorMessage };
};

export default AcceptUser;
