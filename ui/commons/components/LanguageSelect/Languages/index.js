import { cl } from '@cogoport/components';
import Link from 'next/link';
import React from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import LANGUAGE_MAPPING from '@/ui/commons/constants/languageMapping';

function Languages() {
	const router = useRouter();

	const { locale, pathname, query } = router;

	return (
		<div className={`${styles.main}`}>
			{Object.values(LANGUAGE_MAPPING || []).map((lang) => {
				const { language, key, icon: Icon } = lang || {};
				return (
					<Link
						key={lang.key}
						href={{
							pathname,
							query: { ...(query || {}) },
						}}
						locale={key}
					>
						{language && (
							<div
								className={cl`${styles.item} ${
									locale === key ? styles.active : ''
								} ${locale === key ? styles.active_fixed : styles.item}`}
							>
								<Icon width={20} height={20} />
								<div className={styles.country_content}>{language}</div>
							</div>
						)}
					</Link>
				);
			})}
		</div>
	);
}

export default Languages;
