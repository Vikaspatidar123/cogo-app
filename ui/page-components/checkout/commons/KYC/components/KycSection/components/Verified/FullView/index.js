import { Button } from '@cogoport/components';
import React from 'react';

// import PreviewIcon from '../../../icons/preview-icon.svg';

import styles from './styles.module.css';

function FullView({ url, containerStyle = {} }) {
	const openDocument = () => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}

		window.open(modifiedUrl, '_blank');
	};

	return (
		<div className={styles.container} style={{ ...containerStyle }}>
			<Button
				onClick={() => openDocument()}
				size="sm"
				ghost
				style={{
					background   : '#ffffff',
					width        : '70%',
					borderRadius : 4,
				}}
			>
				<div className={styles.flex}>
					Preview
					{/* <PreviewIcon style={{ marginLeft: '4px' }} size={1.5} /> */}
				</div>
			</Button>
		</div>
	);
}

export default FullView;
