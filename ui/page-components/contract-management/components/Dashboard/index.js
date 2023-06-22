import React from 'react';

import useGetStats from '../../hooks/useGetStats';

import Contracts from './Contracts';
import Header from './Header';
import StatsCard from './StatsCard';

function Dashboard() {
	const { data, loading } = useGetStats();
	return (
		<>
			<Header />
			<StatsCard data={data} loading={loading} />
			<Contracts data={data} />
		</>
	);
}

export default Dashboard;
