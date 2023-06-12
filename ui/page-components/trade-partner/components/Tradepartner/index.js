import { Input, Button, Tooltip } from '@cogoport/components';
import { IcMPaste, IcMPlusInCircle, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import TRADEPARTNERLIST from '../../configuration/tradePartnerList';
import useDeleteTradeParty from '../../hooks/useDeleteTradeParty';
import useList from '../../hooks/useList';

import List from './List';
import styles from './styles.module.css';
import TradePartnerAddress from './TradePartnerAddress';

import { useRouter } from '@/packages/next';

function TradePartner() {
	const { push } = useRouter();
	const [sort, setSort] = useState();
	const {
		getList, setGlobalFilters, filters, apiData, apiLoading,
	} = useList({
		sort,
	});
	const [deleteModal, setDeleteModal] = useState(false);
	const { deleteTradeParty, deleteLoading } = useDeleteTradeParty({ getList });
	const [isEdit, setIsEdit] = useState(false);
	const [showmodal, setShowModal] = useState(false);
	const [tradePartyDetails, setTradePartyDetails] = useState();

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.title_section}>
					<h1 className={styles.title}>Trade Partners</h1>
					<div className={styles.line_wrapper}>
						<hr className={styles.line} />
					</div>
				</div>
				<div className={styles.flex_div}>
					<div className={styles.input}>
						<Input
							placeholder="Type to search by name"
							onChange={(e) => {
								setGlobalFilters((prev) => ({
									...prev,
									searchTerm : e,
									query      : e,
									page       : 1,
								}));
							}}
							suffix={<IcMSearchlight height={30} style={{ marginRight: '10px' }} />}

						/>
					</div>

					<div className={styles.button_wrapper}>
						<Tooltip content={<div>Click to view archived trade partners</div>} placement="top">
							<div
								className={styles.archived}
								role="presentation"
								onClick={() => push('/saas/trade-partner/archived?archived=true')}
							>
								<IcMPaste height={30} width={30} />
							</div>
						</Tooltip>
						<Button
							className={styles.button_div}
							onClick={() => {
								setIsEdit(false);
								setTradePartyDetails({});
								setShowModal(true);
							}}
						>
							<IcMPlusInCircle height={20} width={20} />
							Add New
						</Button>
					</div>
				</div>
			</div>
			<div>
				<List
					config={TRADEPARTNERLIST}
					data={apiData || []}
					loading={apiLoading}
					setGlobalFilters={setGlobalFilters}
					filters={filters}
					deleteTradeParty={deleteTradeParty}
					deleteLoading={deleteLoading}
					setShowModal={setShowModal}
					setTradePartyDetails={setTradePartyDetails}
					setIsEdit={setIsEdit}
					deleteModal={deleteModal}
					setDeleteModal={setDeleteModal}
					getList={getList}
					showmodal={showmodal}
					sort={sort}
					setSort={setSort}
				/>
			</div>
			{showmodal && (
				<TradePartnerAddress
					showmodal={showmodal}
					setShowModal={setShowModal}
					tradePartyDetails={tradePartyDetails}
					isEdit={isEdit}
					getList={getList}
					setIsEdit={setIsEdit}
				/>
			)}
		</div>
	);
}
export default TradePartner;
