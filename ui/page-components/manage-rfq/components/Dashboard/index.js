// import WhyRfq from '@cogo/product/rfq/common/WhyRfq';
import React, { useState } from 'react';

import useGetRfqStats from '../../hooks/useGetRfqStats';
// import useIsInViewport from '../../hooks/useIntersection';

import Header from './Header';
// import Quotations from './Quotations';
import Stats from './Stats';

function Dashboard() {
	const [showDashboard, setShowDashboard] = useState(true);
	const {
		data,
		// getRfqStats
	} = useGetRfqStats();
	// const [isInViewport, setisInViewport] = useState(false);
	// const scrollRef = useRef(null);
	// const inViewport = useIsInViewport(scrollRef, '-30px');

	// useEffect(() => {
	// 	if (!isInViewport) {
	// 		setisInViewport(inViewport);
	// 	}
	// }, [inViewport, isInViewport]);

	return (
		<>
			{showDashboard && (
				<>
					<Header setShowDashboard={setShowDashboard} />
					<Stats data={data} />
					{/* <Quotations
						scrollRef={scrollRef}
						getRfqStats={getRfqStats}
						inViewport={inViewport}
						setShowDashboard={setShowDashboard}
					/> */}
				</>
			)}
			{/* {!showDashboard && <WhyRfq setShowDashboard={setShowDashboard} />} */}
		</>
	);
}

export default Dashboard;
