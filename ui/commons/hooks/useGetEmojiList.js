import { useState, useEffect, useCallback } from 'react';

import GLOBAL_CONSTANTS from '../constants/globals';

import { useRequest } from '@/packages/request';

const EMOJIS_URL = GLOBAL_CONSTANTS.fetch_emoji_list;

const useGetEmojiList = () => {
	const [onClicked, setOnClicked] = useState(false);

	const [{ data: emojisList }, trigger] = useRequest(
		{
			url: EMOJIS_URL,
		},
	);

	const emojiListFetch = useCallback(() => {
		try {
			trigger();
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => {
		emojiListFetch();
	}, [emojiListFetch]);

	return {
		emojisList,
		setOnClicked,
		onClicked,
		emojiListFetch,
	};
};

export default useGetEmojiList;
