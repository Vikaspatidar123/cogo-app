import { Button } from '@cogoport/components';
import { IcMLock } from '@cogoport/icons-react';

import styles from './styles.module.css';
import draftAirwayBill from './useDraftAirwayBill';

import { Link } from '@/packages/next';
import PublicPageNav from '@/ui/commons/components/PublicPageNav';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const content = {
	heading           : 'Email Verification Failed!',
	forgotPasswordCTA : {
		text : 'Try Setting your Password Again?',
		link : '/forgot-password',
	},
	submitText: 'Send Verification Email',
};

function DraftAirwayBill({ res }) {
	const subheading = res?.messages?.token === 'Token is invalid!' ? 'Token is invalid' : 'Token has expired';
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
					<Button themeType="tertiary" className={styles.forgot_pass_btn}>
						{content.forgotPasswordCTA.text}
					</Button>
				</Link>
			</div>
		</div>
	);
}

DraftAirwayBill.getInitialProps = async (ctx) => {
	const { query } = ctx;
	const { id } = query;

	try {
		const res = await draftAirwayBill({
			email_token : id,
			platform    : 'app',
			auth_scope  : 'organization',
		});
		const { hasError } = res || {};

		if (!hasError) {
			const {
				token,
				organization_id = '',
				organization_branch_id = '',
				shipment_id = '',
			} = (res || {}).data || {};

			setCookieAndRedirect(
				token,
				ctx,
				`${organization_id}/${organization_branch_id}/shipments/${shipment_id}`,
			);
		} else {
			return { layout: 'none', res };
		}
	} catch (e) {
		console.log(e.toString());
	}
	return { layout: 'none' };
};

export default DraftAirwayBill;
