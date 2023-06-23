import { cl, Button, Pagination, ButtonIcon } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import Image from 'next/image';
import { useState } from 'react';

import dailyStatusConfig from '../../../../configuration/dailyStatusConfig';

import Item from './Item';
import StatusModal from './StatusModal';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getLoadingArr from '@/ui/page-components/air-ocean-tracking/utils/getLoadingArr';

const LOADING_ARR = getLoadingArr(5);

function DailyReport({ dsrListValue = {}, setShowConfigure, activeTab = 'ocean' }) {
	const [statusModal, setStatusModal] = useState({ isOpen: false });

	const { data = {}, loading, setPage, getDsrList } = dsrListValue || {};

	const { list = [], page = 0, total_count = 0, page_limit = 0 } = data || {};
	const newList = loading ? LOADING_ARR : list || [];

	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.header}`}>
				<h3>Schedule Status Reports to Contacts</h3>

				<div className={styles.cta_container}>
					<Button
						type="button"
						themeType="accent"
						onClick={() => setStatusModal({ isOpen: true })}
					>
						Create New

					</Button>
					<ButtonIcon
						icon={<IcMCross />}
						className={styles.cross_icon}
						onClick={() => setShowConfigure(false)}
					/>
				</div>
			</div>

			<div className={styles.table}>
				<div className={cl`${styles.flex_box} ${styles.card_header}`}>
					{dailyStatusConfig.map((config) => (
						<div key={config.key} className={styles.col} style={{ width: config.width }}>
							{config.title}
						</div>
					))}
				</div>

				{newList.length > 0 ? newList.map((item) => (
					<div key={item?.id || item} className={styles.flex_box}>
						<Item data={item} loading={loading} setStatusModal={setStatusModal} />
					</div>
				))
					: (
						<div className={styles.empty_state}>
							<Image
								src={GLOBAL_CONSTANTS.image_url.empty_state_finder}
								width={200}
								height={200}
								alt="empty"
							/>
							<h3>No Daily Status Report Found</h3>
						</div>
					)}
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>
			</div>

			{statusModal.isOpen
			&& (
				<StatusModal
					statusModal={statusModal}
					setStatusModal={setStatusModal}
					dsrList={list}
					activeTab={activeTab}
					getDsrList={getDsrList}
				/>
			)}
		</div>
	);
}

export default DailyReport;
