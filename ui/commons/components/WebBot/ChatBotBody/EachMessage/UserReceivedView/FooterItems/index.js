import { IcMCross, IcMListView } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useRef } from 'react';

import { getElementMapping, getFooterItems } from './getfooterHelpers';
import styles from './styles.module.css';

const EMPTY_FUNC = () => {};

const TIME_TO_SCROLL = 400;

const scrollIntoList = (listRef) => {
	if (listRef.current) {
		listRef.current?.scrollIntoView({
			behavior : 'smooth',
			top      : 50,
		});
	}
};

function FooterItems({ response, sendFirebaseMessage, sendMessageLoading }) {
	const [showFooter, setShowFooter] = useState(false);
	const listRef = useRef(null);

	const { list = [], type = '' } = getFooterItems(response);
	const elementMapping = getElementMapping({
		sendFirebaseMessage,
		sendMessageLoading,
	});

	const getItemFunc = elementMapping[type] || EMPTY_FUNC;

	if (isEmpty(list)) {
		return null;
	}

	const toggleList = () => {
		setShowFooter((p) => {
			if (p) {
				return false;
			}
			setTimeout(() => scrollIntoList(listRef), TIME_TO_SCROLL);
			return true;
		});
	};
	return (
		<>
			{type !== 'buttons' && (
				<div onClick={toggleList} className={styles.list_button} role="presentation">
					{showFooter ? (
						<div className={styles.button_container}>
							<IcMCross className={styles.right_space} />
							Hide
						</div>
					) : (
						<div className={styles.button_container}>
							<IcMListView className={styles.right_space} />
							{startCase(type)}
						</div>
					)}
				</div>
			)}
			{(showFooter || type === 'buttons') && (
				<div ref={listRef} className={styles.list_container}>
					{(list || []).map(getItemFunc)}
				</div>
			)}
		</>
	);
}
export default FooterItems;
