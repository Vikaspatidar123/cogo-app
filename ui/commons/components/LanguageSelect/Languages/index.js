import { cl } from '@cogoport/components';
import { getCookie } from '@cogoport/utils';
import Link from 'next/link';
import React from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import LANGUAGE_MAPPING from '@/ui/commons/constants/languageMapping';

function Languages() {
	const router = useRouter();

	const { locale, pathname, query } = router;
	let countryCode = '';

	if (typeof document !== 'undefined') {
		countryCode = getCookie('location');
	}

	let localesToHide = GLOBAL_CONSTANTS.default_hidden_locales;

	if (countryCode in GLOBAL_CONSTANTS.country_specific_data) {
		localesToHide =	GLOBAL_CONSTANTS.country_specific_data[countryCode]?.hidden_locales;
	}

	const filteredList = Object.values(LANGUAGE_MAPPING).filter(
		(lang) => !(localesToHide || []).includes(lang.key),
	);

	return (
		<div className={styles.main}>
			{Object.values(filteredList).map((lang) => {
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
