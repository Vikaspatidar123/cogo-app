import { Placeholder } from '@cogoport/components';
import { getByKey, startCase, isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

// import location_options from '@/ui/configurations/location_details';
import useGetCogoLocations from '@/ui/page-components/PageSpotSearchRates/hooks/useGetCogoLocations';

function Accordion({ id }) {
	const { results, loading, getLocations } = useGetCogoLocations();
	const data = results?.[0] || {};
	const router = useRouter();
	const { id: type } = router.query;
	// const options = location_options(type);

	useEffect(() => {
		// const includes = options.reduce((acc, { key }) => {
		// 	acc[key] = true;
		// 	return acc;
		// }, {});

		// getLocations({ filters: { id }, includes });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<>
			<div className={`${styles.container} ${(!isEmpty(data) || loading) ? styles.expanded : ''}`}>
				{loading
					? [...Array(5)].map(() => (
						<div className={styles.row}>
							<Placeholder width="50px" height="12px" margin="0 16px 10px 0" />
							<Placeholder width="100px" height="12px" margin="0 16px 10 24px " />
						</div>
					))
					: options.map(({ label, key, subKey }) => data?.[key] && (
						<div className={styles.row} key={label}>
							<p className={styles.label}>{label}</p>
							<p className={styles.value}>
								{!Number.isNaN(data[key])
									? data[key] : startCase(getByKey(data, key))}

								{subKey && data?.[subKey] && data[key] !== data[subKey]
									? `(${startCase(data[subKey])})` : null}
							</p>
						</div>
					))}

			</div>
			{!loading && isEmpty(data) && <div className={styles.no_data_found}>No Data Found</div>}
		</>
	);
}

export default Accordion;
