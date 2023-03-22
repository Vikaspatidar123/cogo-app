import { useRouter } from '@cogo/next';
import Pagination from '@cogoport/front/components/admin/Pagination';
import { IcMTick } from '@cogoport/icons-react';
import { useState } from 'react';

import statusFilter from '../../../configurations/status-filter';
import useGetListContracts from '../../../hooks/useGetContractList';

import Filters from './Filters';
import Quotations from './QuotationList';
import { Container, Header, Title, PaginationWrap, Tags, Tag } from './styles';

function Contracts({ data }) {
	const { query } = useRouter();
	const { activeTab = '' } = query || {};
	const [filterValue, setFilterValue] = useState('');
	const [activeFilter, setActiveFilter] = useState(activeTab || 'all');

	const {
		contractList,
		loading,
		pageData,
		setPagination = () => {},
	} = useGetListContracts({ filterValue, activeFilter });

	const { total_count, page_limit, page } = pageData || {};

	const { active, expired, pending_approval } = data || {};
	const statCount = {
		active           : active?.count,
		expired          : expired?.count,
		pending_approval : pending_approval?.count,
		all              : active?.count + pending_approval?.count + expired?.count,
	};

	return (
		<Container>
			<Title>My Contracts</Title>
			<Header>
				<Tags>
					{statusFilter.map(({ label, key }) => (
						<Tag
							onClick={() => {
								setActiveFilter(key);
								setPagination(1);
							}}
							active={key === activeFilter}
						>
							{key === activeFilter && <IcMTick />}
							<div>
								{label}
								{' '}
								(
								{statCount[key] || 0}
								)
							</div>
						</Tag>
					))}
				</Tags>
				<Filters filterValue={filterValue} setFilterValue={setFilterValue} />
			</Header>

			<Quotations
				contractList={contractList}
				loading={loading}
				activeFilter={activeFilter}
			/>

			<PaginationWrap>
				<Pagination
					className="md"
					total={total_count}
					pagination={page}
					pageLimit={page_limit}
					setPagination={setPagination}
				/>
			</PaginationWrap>
		</Container>
	);
}

export default Contracts;
