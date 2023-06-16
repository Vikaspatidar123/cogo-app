import { Placeholder, Pagination, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Header from '../../common/Header';
import useGetOrderList from '../../hooks/useGetOrderList';

import Card from './Card';
import InfoModal from './InfoModal';
import styles from './styles.module.css';

function OrderHistory() {
	const { t } = useTranslation(['cogoStore']);
	const [modalInfo, setModalInfo] = useState({
		show: false,
		voucherData: [],
		isView: false,
		orderItemId: '',
	});
	const { show } = modalInfo;
	const { data, loading, handlePageHandler, handleSearch, searchValue } = useGetOrderList();

	const { list = [], page, total_count, page_limit } = data || {};
	const newList = loading ? [1, 2, 3, 4] : list;
	return (
		<div>
			<Header showOrderList={false} />
			<div className={styles.container}>
				<div className={styles.flex_box}>
					<div className={styles.total_order}>
						{t('cogoStore:total_order')}
						{' '}
						{newList.length}
					</div>
					<div>
						<Input
							prefix={<IcMSearchlight />}
							placeholder={t('cogoStore:orderHistory_input_placeholder')}
							value={searchValue}
							onChange={handleSearch}
						/>
					</div>
				</div>
				{loading
					&& newList?.map((key) => (
						<div key={key}>
							<Placeholder height="50px" margin="0px 0px 20px 0px" />
						</div>
					))}
				{!loading && newList.length > 0 && (
					<>
						<div className={styles.card_container}>
							{newList.map((item) => (
								<Card key={item?.id} data={item} setModalInfo={setModalInfo} />
							))}
						</div>
						<div className={styles.page_container}>
							<Pagination
								type="number"
								currentPage={page}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={handlePageHandler}
							/>
						</div>
					</>
				)}

				{newList.length === 0 && !loading && (
					<div className={styles.empty_state}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty-item.svg"
							alt={t('cogoStore:orderHistory_image_alt')}
						/>
						<p>{t('cogoStore:order_history_empty_container')}</p>
					</div>
				)}
			</div>
			{show && <InfoModal modalInfo={modalInfo} setModalInfo={setModalInfo} />}
		</div>
	);
}

export default OrderHistory;
