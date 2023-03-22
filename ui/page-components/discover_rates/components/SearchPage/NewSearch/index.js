import React, { useState, useCallback, forwardRef } from 'react';

function NewSearch(
	{
		extraParams = {},
		onPush = () => {},
		style = {},
		className = '',
		blockSearch = false,
		defaultSearchMode = '',
		loading = false,
		search_type = '',
		showHeader = true,
		listStoreQuotaAPI = {},
	},
	ref,
) {
	const modes = getConfiguration('modes', undefined, isChannelPartner);

	return <div>NewSearch</div>;
}
export default forwardRef(NewSearch);
