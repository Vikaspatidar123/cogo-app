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
				type="button"
			>
				<div className={styles.flexDiv}>
					Preview
					<IcMEyeopen
						width={20}
						height={20}
						style={{ marginLeft: '4px' }}
					/>
				</div>
			</Button>
		</div>
	);
}

export default FullView;
