import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetEmojiList = () => {
	const [onClicked, setOnClicked] = useState(false);

	const [{ data: emojisList }, trigger] = useRequest(
		{
			method: 'get',
			url:
            'https://cogoport-testing.sgp1.digitaloceanspaces.com/b3949cf1f8cd3366d0272bd60c87c930/emoji-list.json',
		},
	);

	const emojiListFetch = async () => {
		try {
			await trigger();
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		emojiListFetch();
	});

	return {
		emojisList,
		setOnClicked,
		onClicked,
		emojiListFetch,
	};
};

export default useGetEmojiList;
