import React, { useRef, useState } from 'react';

import styles from './styles.module.css';

const HEADER_HEIGHT = 64;

function LeftPanel({
	// activeComponentKey = '',
	panel = {},
	cogoportIcon,
	headerComponent = null,
}) {
	const { config = {}, component = null } = panel;
	const {
		layout = {},
		// components = {}
	} = config;

	const {
		header = {},
		background = '',
		backgroundImage = {},
		showGlobeIcon = false,
	} = layout;
	const { show: showHeader = true } = header;
	const { url: backgroundImageUrl = '' } = backgroundImage;

	const ref = useRef({});
	const [showBackgroundImage, setShowBackgroundImage] = useState(false);
	// const [backgroundImageHeight, setBackgroundImageHeight] = useState(0);

	const browserWindow = typeof window !== 'undefined' ? window : undefined;

	const useLayoutEffect = browserWindow
		? React.useLayoutEffect
		: React.useEffect;

	const onResize = () => {
		if (!backgroundImageUrl) {
			return;
		}

		const { container, main } = ref.current;

		const contentHeight = main.clientHeight + HEADER_HEIGHT;
		const remainingContainerHeight = container.clientHeight - contentHeight;

		// setBackgroundImageHeight(remainingContainerHeight);
		setShowBackgroundImage(remainingContainerHeight >= 200);
	};

	useLayoutEffect(() => {
		onResize();

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return (
		<div
			className={styles.left_panel}
			// paddingTop={headerComponent ? 0 : `${HEADER_HEIGHT}px`}
			// background={background}
			ref={(element) => {
				ref.current = {
					...ref.current,
					container: element,
				};
			}}
		>
			{(!headerComponent || showHeader) && (
				<div className={styles.left_panel__header}>
					<div className={styles.left_panel_icon}>
						{cogoportIcon}
					</div>
				</div>
			)}

			<div
				className="left_panel__main"
				ref={(element) => {
					ref.current = {
						...ref.current,
						main: element,
					};
				}}
			>
				{component}
			</div>

			{
				showBackgroundImage && (
					<img
						className={styles.background_img}
						src={backgroundImageUrl}
						alt="cogo"
					/>
				)
			}

			{showGlobeIcon && <div className={styles.globe_icon} />}
		</div>
	);
}

export default LeftPanel;
