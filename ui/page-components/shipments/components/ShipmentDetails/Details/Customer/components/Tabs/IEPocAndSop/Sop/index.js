import { Placeholder } from '@cogoport/components';
import { useState } from 'react';

import Header from './Header';
import SopCard from './SopCard';
import styles from './styles.module.css';

import useGetSopList from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useGetSopList';
import useGetTradePartnersDetails
	from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useGetTradePartnersDetails';

function Sop({ quickAction, setSopTotal, setQuickAction = () => {} }) {
	const [filters, setFilters] = useState([]);
	const [reload, setReload] = useState(false);

	const { trade_partners_loading, trade_partners_details, tdata } = useGetTradePartnersDetails({ shipment_id: '' });

	const { data, loading } = useGetSopList({
		filters,
		reload,
		trade_partners_details,
		tdata,
	});

	const sops = !trade_partners_loading ? data?.list || [] : [];

	setSopTotal(sops.length);

	let content = sops?.map((sop) => (
		<SopCard
			details={sop}
			reload={reload}
			setReload={setReload}
			trade_partners_details={trade_partners_details}
		/>
	));

	if (loading || trade_partners_loading) {
		content = <Placeholder />;
	}

	if (!loading && !trade_partners_loading && sops.length === 0) {
		content = (
			<div className={styles.empty_state}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-state-file.svg"
					alt="no results"
					style={{ marginLeft: '20px', width: '40%', height: '40%' }}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!trade_partners_loading ? (
				<Header
					filters={filters}
					setFilters={setFilters}
					reload={reload}
					setReload={setReload}
					quickAction={quickAction}
					setQuickAction={setQuickAction}
					trade_partners_details={trade_partners_details}
					sops={sops}
				/>
			) : null}

			<div>{content}</div>
		</div>
	);
}

export default Sop;
