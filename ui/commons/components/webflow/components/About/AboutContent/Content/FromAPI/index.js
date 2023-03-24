import { useSelector } from '@/packages/store';
import { rest } from '@cogo/deprecated_legacy/rest';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import Main from '../Main';

function FromAPI({ slug }) {
	const [data, setData] = useState({});

	const scope = useSelector(({ general }) => general?.scope);
	const initialaUrl = scope === 'partner' ? process.env.PARTNER_URL : process.env.APP_URL;

	useEffect(() => {
		if (!isEmpty(slug)) {
			rest.get(`${initialaUrl}api/about/getAboutData?slug=${slug}`, true).then((res) => {
				if (!res.hasError && res.data.success) {
					setData(res.data.data);
				}
			});
		}
	}, [initialaUrl, slug]);

	return <Main data={data} />;
}

export default FromAPI;
