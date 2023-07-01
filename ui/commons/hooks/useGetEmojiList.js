import { useState, useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const EMOJIS = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/b3949cf1f8cd3366d0272bd60c87c930/emoji-list.json';

const useGetEmojiList = () => {
	const [onClicked, setOnClicked] = useState(false);

	const [{ data: emojisList }, trigger] = useRequest(
		{
			url: EMOJIS,
		},
	);

	const emojiListFetch = useCallback(async () => {
		try {
			await trigger();
		} catch (error) {
			console.log(error);
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
