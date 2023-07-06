import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { SHOW_ICONS } from '../../constants';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const translationKey = 'helpCenter:faq_home_page';

function TopicIcon({ item, homePage = false }) {
	const { t } = useTranslation(['helpCenter']);

	const { name = '' } = item || {};

	const includesKey = SHOW_ICONS.find((key) => name.includes(key)) || '';

	const displayIcon =	GLOBAL_CONSTANTS.image_url?.[includesKey]
		|| GLOBAL_CONSTANTS.image_url.general_icon;

	return (
		<Image
			src={displayIcon}
			height={homePage ? 30 : 20}
			width={homePage ? 30 : 20}
			alt={t(`${translationKey}_icon_text`)}
			className={cl`${homePage ? '' : styles.topic_icon_styles}`}
		/>
	);
}

export default TopicIcon;
