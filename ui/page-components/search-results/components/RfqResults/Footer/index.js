import { Button } from '@cogoport/components';
import React from 'react';

import useSaveRfq from '../../../hooks/useSaveRfq';

import styles from './styles.module.css';

function Footer({
	total = 1,
	hookSetters = () => {},
	bookedRates = [],
	id = '',
	data = {},
	filters = {},
	setBookedRates = () => {},
	rates = [],
	serial_id = 1,
	intLoading = false,
}) {
	const { loading, handlePrevious, handleOverview, handleSave } = useSaveRfq({
		total,
		hookSetters,
		bookedRates,
		id,
		data,
		filters,
		setBookedRates,
		serial_id,
	});

	const divLoading = intLoading || loading;

	return (
		<div className={styles.container}>
			<Button
				style={{
					marginLeft : '40px',
					color      : divLoading ? '#ffffff' : '#333333',
					background : divLoading ? '#c2c2c2' : '#ffffff',
					border     : divLoading ? '1px solid #c2c2c2' : '1px solid #333333',
				}}
				disabled={divLoading}
				onClick={handleOverview}
			>
				Skip to overview
			</Button>

			<div className={styles.button_wrap}>
				{serial_id !== 1
					? (
						<Button
							style={{
								background  : divLoading ? '#c2c2c2' : '#ffffff',
								border      : divLoading ? '1px solid #c2c2c2' : 'none',
								color       : divLoading ? '#ffffff' : '#333333',
								marginRight : '10px',
							}}
							disabled={divLoading}
							onClick={() => handlePrevious()}
						>
							Previous
						</Button>
					) : null}

				<Button
					style={{ marginLeft: 'auto', marginRight: '20px' }}
					onClick={handleSave}
					disabled={divLoading}
				>
					{rates.length ? 'Proceed & Save' : 'Proceed'}
				</Button>
			</div>
		</div>
	);
}

export default Footer;
