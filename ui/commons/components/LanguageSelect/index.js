import { Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import GLOBAL_CONSTANTS from '../../constants/globals';

import Languages from './Languages';
import styles from './styles.module.css';

import { useRouter, Image } from '@/packages/next';
import LANGUAGE_MAPPING from '@/ui/commons/constants/languageMapping';

function LanguageSelect() {
	const router = useRouter();

	const { locale } = router;

	const [showPopover, setShowPopover] = useState(false);

	const localeDetails = LANGUAGE_MAPPING[locale] || {};

	const { label } = localeDetails || {};

	useEffect(() => {
		setShowPopover(false);
	}, [locale]);

	if (isEmpty(localeDetails)) {
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
						<Image
							src={GLOBAL_CONSTANTS.image_url.globe}
							width={18}
							height={18}
							alt="globe"
						/>
						<div className={styles.selected_lang}>{label}</div>
					</div>
				</div>
			</Popover>
		</div>
	);
}
export default LanguageSelect;
