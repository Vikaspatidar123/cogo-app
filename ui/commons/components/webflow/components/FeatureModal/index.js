import { useDispatch, useSelector } from '@/packages/store';
import { setAboutState } from '@cogo/app-store';
import { rest } from '@cogo/deprecated_legacy/rest';
import { useEffect, useState } from 'react';

function FeatureModal() {
	const dispatch = useDispatch();
	const { query, pathname: _pathname } = useSelector(({ general }) => general);
	const { account_type } = query || {};

	const [pathname, setPathname] = useState(_pathname);
	const [timeoutValue, setTimeoutValue] = useState(null);

	const clearModalTimeout = (timeOut) => {
		if (timeOut) {
			clearTimeout(timeOut);
			setTimeoutValue(null);
		}
	};

	useEffect(() => {
		if (pathname !== _pathname) {
			clearModalTimeout(timeoutValue);
			setPathname(_pathname);
		}
		try {
			const slug =				account_type === 'importer-exporter'
				? 'shipper-feature'
				: 'seller-feature';
			const featureLocalData = localStorage.getItem(slug);
			const validity = localStorage.getItem(`${slug}_time`);

			if (!validity || (validity && new Date(validity) < new Date())) {
				rest
					.get(
						`${process.env.APP_URL}api/about/getAboutData?slug=${slug}`,
						true,
					)
					.then((res) => {
						if (!res.hasError && res.data.success) {
							const { status, feature, delay } = res.data.data || {};
							if (status === true && feature !== featureLocalData) {
								const date = new Date();
								date.setHours(date.getHours() + 6);
								setTimeoutValue(
									setTimeout(() => {
										dispatch(
											setAboutState({
												isOpen: true,
												slug,
											}),
										);
										localStorage.setItem(slug, feature);
										localStorage.setItem(`${slug}_time`, date);
									}, delay || 15000),
								);
							}
						}
					});
			}
		} catch (e) {
			console.log('localStorage not supported!');
		}
		return () => {
			clearModalTimeout(timeoutValue);
		};
	}, [_pathname]);

	return null;
}

export default FeatureModal;
