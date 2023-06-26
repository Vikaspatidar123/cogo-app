import { cl } from '@cogoport/components';

import { SHOW_ICONS } from '../../constants';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function TopicIcon({ item, homePage = false }) {
	const { name = '' } = item || {};

	const includesKey = SHOW_ICONS.find((key) => name.includes(key)) || '';

	const displayIcon =	GLOBAL_CONSTANTS.image_url?.[includesKey]
		|| GLOBAL_CONSTANTS.image_url.general_icon;

	return (
		<Image
			src={displayIcon}
			height={homePage ? 30 : 20}
			width={homePage ? 30 : 20}
			alt="topic logo"
			className={cl`${homePage ? '' : styles.topic_icon_styles}`}
		/>
	);
}

export default TopicIcon;
