import { useState, useEffect, useCallback } from 'react';

import GLOBAL_CONSTANTS from '../constants/globals';

const axios = require('axios');

const EMOJIS_URL = GLOBAL_CONSTANTS.fetch_emoji_list;

const useGetEmojiList = () => {
	const [onClicked, setOnClicked] = useState(false);
	const [emojisList, setEmojiList] = useState({});

	const emojiListFetch = useCallback(async () => {
		try {
			const response = await axios.get(EMOJIS_URL);
			setEmojiList(response?.data);
		} catch (error) {
			console.error(error);
		}
	}, []);

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
