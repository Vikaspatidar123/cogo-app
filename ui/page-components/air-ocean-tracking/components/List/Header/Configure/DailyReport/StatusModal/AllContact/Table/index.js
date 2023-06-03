import { cl, Placeholder, Pagination } from '@cogoport/components';

import styles from './styles.module.css';

import contactListConfig from '@/ui/page-components/air-ocean-tracking/configuration/contactListConfig';

function Table({ list = [], data = {}, loading = false, setPage, selectedContact, setSelectedContact }) {
	const { page = 0, page_limit = 0, total_count = 0 } = data || {};
	const newList = loading ? [...Array(5).keys()] : list;

	return (
		<div className={styles.container}>
			<p className={styles.title}>Contacts</p>

			<div className={styles.table}>
				<div className={cl`${styles.flex_box} ${styles.card_header}`}>
					{contactListConfig.map((config) => (
						<div key={config.key} className={`${styles.col} ${styles?.[config.key]}`}>
							{config.title}
						</div>
					))}
				</div>
				{newList.map((item) => (
					<div
						key={item?.id || item}
						className={`${styles.flex_box} ${styles.item_row}
						${selectedContact === item?.id ? styles.selected : ''}`}
						onClick={() => setSelectedContact(item?.id)}
						role="presentation"
					>
						{contactListConfig.map((config) => (
							<div key={config.key} className={`${styles.col} ${styles?.[config.key]}`}>
								{loading ? <Placeholder margin="0px 0px 20px 0px" /> : item?.[config.key]}
							</div>
						))}
					</div>

				))}
				{!loading && total_count > page_limit && (
					<div className={styles.pagination_container}>
						<Pagination
							type="compact"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={setPage}
						/>
					</div>

				)}
			</div>
		</div>
	);
}

export default Table;
