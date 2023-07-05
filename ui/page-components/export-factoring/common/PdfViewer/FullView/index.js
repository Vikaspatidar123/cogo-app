import { Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import React from 'react';

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
				themeType="accent"
				// style={{
				// 	background   : '#ffffff',
				// 	width        : '70%',
				// 	borderRadius : 4,
				// }}
			>
				<div className={styles.flexDiv}>
					Preview
					<IcMEyeopen
						style={{ marginLeft: '4px', width: '20px', height: '20px' }}
					/>
				</div>
			</Button>
		</div>
	);
}

export default FullView;
