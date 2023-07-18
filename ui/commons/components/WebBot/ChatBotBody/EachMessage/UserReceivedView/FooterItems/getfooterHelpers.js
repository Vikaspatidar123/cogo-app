import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

export const getElementMapping = ({
	sendFirebaseMessage,
	sendMessageLoading,
}) => ({
	buttons: (item) => (
		<div
			className={sendMessageLoading ? styles.button_text_loading : styles.button_text}
			onClick={() => sendFirebaseMessage({ message: item })}
			key={item}
			role="presentation"
		>
			{item}
		</div>
	),
	list: (item) => {
		const { id, title, description } = item;
		return (
			<div
				onClick={() => sendFirebaseMessage({ message: title, buttonId: id })}
				key={id}
				className={sendMessageLoading ? styles.list_item_loading : styles.list_item}
				role="presentation"
			>
				<div className={styles.list_item_title}>{title}</div>
				<div className={styles.list_item_desc}>{description}</div>
			</div>
		);
	},
});

export const getFooterItems = (response) => {
	const { btns = [], list = [] } = response || {};
	if (!isEmpty(btns)) {
		return { list: btns, type: 'buttons' };
	}
	if (!isEmpty(list)) {
		return { list, type: 'list' };
	}
	return {};
};
