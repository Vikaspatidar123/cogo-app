import { cl } from '@cogoport/components';
import { getCookie } from '@cogoport/utils';
import Link from 'next/link';
import React from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import LANGUAGE_MAPPING from '@/ui/commons/constants/languageMapping';

const LANGUAGE_FILTER_CONFIG = {
	IN      : (loc) => loc.key !== 'en-SG',
	VN      : (loc) => loc.key !== 'en-SG',
	SG      : (loc) => loc.key !== 'en-IN',
	ID      : (loc) => loc.key !== 'en-SG',
	TH      : (loc) => loc.key !== 'en-SG',
	CN      : (loc) => loc.key !== 'en-SG',
	default : (loc) => loc.key !== 'en-SG',
};

function Languages() {
	const router = useRouter();

	const { locale, pathname, query } = router;
	let countryCode = '';

	if (typeof document !== 'undefined') {
		countryCode = getCookie('location');
	}

	const filteredLocaleList = LANGUAGE_FILTER_CONFIG[countryCode] || LANGUAGE_FILTER_CONFIG.default;

	const filteredList = Object.values(LANGUAGE_MAPPING).filter(filteredLocaleList);

	return (
		<div className={`${styles.main}`}>
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
