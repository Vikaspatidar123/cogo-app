import { setAboutState } from '@cogo/app-store';
import { rest } from '@cogo/deprecated_legacy/rest';
import { Modal, UICustomTheme, Loader } from '@cogo/deprecated_legacy/ui';
import { useSelector, useDispatch } from '@cogo/store';
import isEmpty from '@cogo/utils/isEmpty';
import React, { useEffect, useState } from 'react';

import { AboutContent } from '../AboutContent';

import { modalTheme } from './styles';

function AboutModal() {
	const [state, setState] = useState({
		loading : true,
		data    : {},
	});
	const { isMobile } = useSelector(({ general }) => general);
	const webflowData = useSelector(({ webflow }) => webflow);
	const dispatch = useDispatch();
	const scope = useSelector(({ general }) => general?.scope);
	const initialaUrl =		scope === 'partner' ? process.env.PARTNER_URL : process.env.APP_URL;

	const onClose = () => {
		dispatch(
			setAboutState({
				isOpen : false,
				slug   : null,
			}),
		);
	};

	useEffect(() => {
		if (webflowData.about.isOpen) {
			rest
				.get(
					`${initialaUrl}api/about/getAboutData?slug=${webflowData.about.slug}`,
					true,
				)
				.then((res) => {
					if (!res.hasError && res.data.success) {
						setState({
							...state,
							loading : false,
							data    : res.data.data,
						});
					} else {
						setState({
							...state,
							loading : false,
							data    : {},
						});
						if (isEmpty(webflowData.about.defaultData || {})) onClose();
					}
				});
		}
	}, [webflowData.about.isOpen]);

	if (
		!state.loading
		&& isEmpty(state.data)
		&& isEmpty(webflowData.about.defaultData || {})
	) {
		return null;
	}

	return (
		<UICustomTheme theme={modalTheme}>
			<Modal
				show={webflowData.about.isOpen}
				onClose={onClose}
				onOuterClick={onClose}
				closable
				themeType="mid"
				fullscreen={isMobile}
			>
				{state.loading ? (
					<Loader size={2} caption="Please wait we are fetching data" />
				) : (
					<AboutContent
						data={
							!isEmpty(state.data) ? state.data : webflowData.about.defaultData
						}
					/>
				)}
			</Modal>
		</UICustomTheme>
	);
}

export default AboutModal;
