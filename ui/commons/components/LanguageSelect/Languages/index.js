import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

import { useRouter, Link } from '@/packages/next';
import LANGUAGE_MAPPING from '@/ui/commons/constants/languageMapping';

function Languages() {
	const router = useRouter();

	const { locale, pathname, query } = router;

	return (
		<div className={styles.main}>
			{Object.values(LANGUAGE_MAPPING).map((lang) => {
				const { language, key } = lang || {};
				return (
					<Link
						key={lang.key}
						href={{
							pathname,
							query: { ...(query || {}) },
						}}
						locale={key}
					>
						<div
							className={cl`${styles.item} ${locale === key ? styles.active : ''
							} ${locale === key ? styles.active_fixed : styles.item}`}
						>
							<div className={styles.country_content}>{language}</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
}

export default Languages;
