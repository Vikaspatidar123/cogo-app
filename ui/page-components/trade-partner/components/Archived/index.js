import { Input, Tooltip } from '@cogoport/components';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';

import ARCHIVEDTRADEPARTNERLIST from '../../configuration/archivedTradePartnerList';
import useList from '../../hooks/useList';
import List from '../Tradepartner/List';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Archived() {
	const { query, push } = useRouter();
	const { archived } = query || {};
	const {
		getList, apiData, apiLoading, setGlobalFilters,
	} = useList({ archived });

	return (
		<div className={styles.container}>
			<div className={styles.flex_div}>
				<div className={styles.flex}>
					<Tooltip animation="shift-away" theme="light" content="Back">
						<div>
							<IcMArrowBack
								className={styles.icon}
								height={28}
								width={28}
								onClick={() => push('/saas/trade-partner')}
							/>
						</div>
					</Tooltip>
					<div className={styles.title_section}>
						<h1 className={styles.title}>Archived Trade Partners</h1>
						<div className={styles.line_wrapper}>
							<hr className={styles.line} />
						</div>
					</div>
				</div>
				<div className={styles.input}>
					<Input
						placeholder="Type to search by name"
						onChange={(item) => {
							setGlobalFilters((prev) => ({
								...prev,
								searchTerm : item,
								query      : item,
								page       : 1,
							}));
						}}
						suffix={<IcMSearchlight height={30} style={{ marginRight: '10px' }} />}

					/>
				</div>
			</div>
			<List
				config={ARCHIVEDTRADEPARTNERLIST}
				data={apiData || []}
				loading={apiLoading}
				archived={archived}
				getList={getList}
				setGlobalFilters={setGlobalFilters}
			/>
		</div>
	);
}
export default Archived;
