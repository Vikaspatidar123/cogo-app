import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetContractEnhance from '../../hooks/useGetContractEnhance';
import useGetServiceDetails from '../../hooks/useGetServiceDetails';

import CardLoader from './CardLoader';
import Filters from './Filters';
import Header from './Header';
import PlanCard from './PlanCard';
import styles from './styles.module.css';
import TechopsHeader from './TechopsHeader';

import { useRouter } from '@/packages/next';

const MAX_COUNT = 10;

function ShipmentPlan() {
	const { query } = useRouter();
	const { contract_id = '', techOpsServiceId = '', through = '' } = query || {};
	const isTechops = through === 'techops';

	const { contractData, loading } = useGetContractEnhance({
		id: contract_id,
	});
	const { services = [] } = contractData || {};
	const [activeTab, setActiveTab] = useState(services[0] || '');

	const {
		serviceData = {},
		setPagination = () => { },
		serviceLoading = false,
		getServiceDetails = () => { },
	} = useGetServiceDetails({
		contractId  : contract_id,
		serviceType : activeTab || services[0],
		techOpsServiceId,
		activeTab,
		isTechops,
	});
	const { page, total_count, list = [] } = serviceData || {};

	return (
		<>
			{isTechops ? (
				<TechopsHeader loading={loading} />
			) : (
				<Header data={contractData} loading={loading} />
			)}

			{!isEmpty(services) && (
				<Filters
					services={services}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			)}

			{(serviceLoading || loading)
				? [...Array(isTechops ? 1 : 3).keys()].map((ele) => <CardLoader key={ele} />)
				: (
					<div className={styles.card_container}>
						{(list || []).map((item) => (
							<PlanCard
								key={item.id}
								itemData={item}
								getServiceDetails={getServiceDetails}
								contractData={contractData}
							/>
						))}
					</div>
				)}
			{total_count > MAX_COUNT ? (
				<div className={styles.pagination_wrapper}>
					<Pagination
						type="table"
						currentPage={page}
						pageSize={MAX_COUNT}
						totalItems={total_count}
						onPageChange={(e) => setPagination(e)}
					/>
				</div>
			) : null}
		</>
	);
}

export default ShipmentPlan;
