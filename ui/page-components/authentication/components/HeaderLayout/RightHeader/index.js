import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

import { Link } from '@/packages/next';

function RightHeader({ label, href, cta }) {
	return (
		<div className={styles.container}>
			<div className={styles.label}>{label}</div>
			<Link href={href} passHref prefetch={false} withPrefix={false}>
				<Button className={styles.text_button} themeType="tertiary" as="a">{cta}</Button>
			</Link>
		</div>
	);
}

export default RightHeader;
