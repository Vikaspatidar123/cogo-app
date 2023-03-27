import { Tabs, TabPanel } from '@cogoport/components';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// import Negotiations from '../../../common/Negotiation/List';
// import Quotations from '../../../common/Quotations';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

const PastSearches = dynamic(() => import('./PastSearches'), { ssr: false });

function PastResults() {
	const { isMobile, query } = useSelector(({ general }) => ({
		query    : general.query,
		isMobile : general?.isMobile,
	}));
	const [activeTab, setActiveTab] = useState(
		query?.quotation ? 'quotations' : 'past_searches',
	);
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.title}>Book a shipment</div>
				<div className={styles.content}>
					<Tabs activeTab={activeTab} onChange={setActiveTab}>
						<TabPanel name="past_searches" title="Past searches">
							<PastSearches mobile={isMobile} />
						</TabPanel>

						<TabPanel name="quotations" title="Quotations">
							{/* <Quotations mobile={isMobile} /> */}
							Quotations
						</TabPanel>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

export default PastResults;
