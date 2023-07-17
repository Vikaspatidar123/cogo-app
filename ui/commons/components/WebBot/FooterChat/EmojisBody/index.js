import React from 'react';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PopBody({ emojisList, updateMessage, setOnClicked = () => {} }) {
	return (
		<div className={styles.container}>
			{(Object.entries(emojisList) || []).map((group) => Object.entries(group[1])
				.map((subgroup) => subgroup[1].map((item, index) => {
					const result = item[0].trim().split(GLOBAL_CONSTANTS.patterns.WHITE_SPACE);
					let emoji = '';
					result.forEach((emojiUnicode) => {
						emoji += String.fromCodePoint(`0x${emojiUnicode}`);
					});

					return (
						<div
							role="presentation"
							onClick={() => {
								updateMessage(emoji);
								setOnClicked(false);
							}}
							className={styles.emoji_button}
							key={`${group[0]}_${subgroup[0]}_${index + 1}`}
						>
							{emoji}
						</div>
					);
				})))}
		</div>
	);
}

export default PopBody;
