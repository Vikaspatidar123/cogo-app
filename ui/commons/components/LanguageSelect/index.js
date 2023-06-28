import { Popover } from '@cogoport/components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Languages from './Languages';
import styles from './styles.module.css';

import LANGUAGE_MAPPING from '@/ui/commons/constants/languageMapping';

function LanguageSelect() {
	const router = useRouter();

	const { locale } = router;

	const [showPopover, setShowPopover] = useState(false);

	const localeDetails = LANGUAGE_MAPPING[locale] || {};

	const { icon: Icon, label } = localeDetails || {};

	useEffect(() => {
		setShowPopover(false);
	}, [locale]);

	if (Object.keys(localeDetails).length === 0) {
		return null;
	}

	return (
		<div className={styles.language_pop}>
			<Popover
				placement="top"
				key="languageChange"
				content={<Languages />}
				visible={showPopover}
				onClickOutside={() => setShowPopover(false)}
			>
				<div
					role="presentation"
					onClick={() => setShowPopover((pv) => !pv)}
					className={styles.lang}
				>
					<div className={styles.globe_container}>
						<Icon width={20} height={20} />
						<div className={styles.selected_lang}>{label}</div>
					</div>
				</div>
			</Popover>
		</div>
	);
}
export default LanguageSelect;
