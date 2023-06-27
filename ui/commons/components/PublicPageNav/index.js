import { Button, cl } from '@cogoport/components';

import GLOBAL_CONSTANTS from '../../constants/globals';

import styles from './styles.module.css';

import { Image, Link } from '@/packages/next';

function PublicPageNav() {
	return (
		<div className={cl`${styles.flex_box} ${styles.nav_bar}`}>
			<Image src={GLOBAL_CONSTANTS.image_url.cogoport_logo} width={130} height={50} alt="loading" />

			<div className={styles.flex_box}>
				<p className={styles.text}>Already a User?</p>
				<Link href="/login" passHref prefetch={false} withPrefix={false}>
					<Button themeType="linkUi" type="button">LOGIN</Button>
				</Link>
			</div>
		</div>
	);
}

export default PublicPageNav;
