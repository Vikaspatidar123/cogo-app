/* eslint-disable react-hooks/exhaustive-deps */
import {
	Pagination, Popover, Loader, Tooltip, cl,
} from '@cogoport/components';
import {
	IcMEdit, IcMPaste, IcMDelete, IcMOverflowDot, IcMPlus,
} from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';

import DeleteProductModal from '../../common/DeleteProductModal';
import useArchive from '../../hooks/useArchive';

import ArchiveModal from './ArchiveModal';
import styles from './styles.module.css';

import HsCodeIcon from '@/ui/commons/components/HsCodeIcon';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SUB_CATEGORY_STRING_MAX_LENGTH = 40;

const CATEGORY_STRING_MAX_LENGTH = 16;

function AllProducts({
	setShowProduct,
	apiData,
	refetchProduct = () => {},
	loading,
	setHSCode = () => {},
	deleteProduct = () => {},
	setIsEdit,
	setProductClassification = () => {},
	setProId = () => {},
	productClassification = '',
	proId = '',
}) {
	const { t } = useTranslation(['common', 'productCatalogue']);
	const { MAPPING } = HsCodeIcon();
	const [archive, setArchive] = useState(false);
	const [visible, setVisible] = useState({});
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { refetchArchive } = useArchive({
		proId,
		setArchive,
		refetchProduct,
		productClassificationId : productClassification,
		card                    : true,
	});
	const { list = [], pageNo = 1, totalRecords = 0, pageSize = 0 } = apiData || {};

	const [pagination, setPagination] = useState(pageNo);

	useEffect(() => {
		refetchProduct({ page: pagination });
	}, [pagination]);

	const content = (id, productClassificationId) => (
		<div className={styles.info} role="presentation" onClick={() => setProId(id)}>
			<div
				className={cl`${styles.text_1} ${styles.edit}`}
				role="presentation"
				onClick={() => {
					setProductClassification(productClassificationId);
					setIsEdit(true);
					setShowProduct(true);
					setVisible({ [id]: false });
				}}
			>
				<IcMEdit width={10} height={10} />
				<div>{t('productCatalogue:product_catalogue_all_products_edit_button_label_1')}</div>
			</div>

			<div
				className={cl`${styles.text_1} ${styles.edit}`}
				role="presentation"
				onClick={() => {
					setProId(id);
					setArchive(true);
					setVisible({ [id]: false });
				}}
			>
				<IcMPaste width={10} height={10} />
				<div>{t('productCatalogue:product_catalogue_all_products_edit_button_label_2')}</div>
			</div>

			<div
				className={cl`${styles.text_1} ${styles.edit}`}
				role="presentation"
				onClick={() => {
					setShowDeleteModal(true);
					setProId(id);
					setProductClassification(productClassificationId);
					setVisible({ [id]: false });
				}}
			>
				<IcMDelete width={10} height={10} />
				<div>{t('productCatalogue:product_catalogue_all_products_edit_button_label_3')}</div>
			</div>
		</div>
	);
	return (
		<div className={styles.container}>
			<div className={styles.card_div}>
				{(list || [1, 2, 3, 4, 5]).map(
					({
						name,
						id,
						subCategoryDisplayName,
						categoryDisplayName,
						categoryCode,
						productClassificationId,
					}) => (
						<div className={styles.card}>
							<div>
								<div className={styles.row}>
									{!loading && (
										<>
											<div>{MAPPING[categoryCode]}</div>
											<div className={styles.display_name}>
												{categoryDisplayName?.length > CATEGORY_STRING_MAX_LENGTH ? (
													<Tooltip
														theme="light"
														placement="top"
														content={categoryDisplayName}
													>
														<div>
															{`${categoryDisplayName
																.substring(
																	GLOBAL_CONSTANTS.zeroth_index,
																	CATEGORY_STRING_MAX_LENGTH,
																)}..`}
														</div>
													</Tooltip>
												) : (
													<div>{categoryDisplayName}</div>
												)}
											</div>

											<Popover
												placement="bottom"
												animation="shift-away"
												render={content(id, productClassificationId)}
												interactive
												visible={visible?.[id]}
												onClickOutside={() => {
													setVisible({ [id]: false });
												}}
											>
												<div>
													<IcMOverflowDot
														className={styles.icon}
														onClick={() => setVisible({ [id]: true })}
													/>
												</div>
											</Popover>
										</>
									)}
									{loading && <Loader width="169px" />}
								</div>
								<div className={cl`${styles.row}${styles.second}`}>
									{!loading && (
										<div className={styles.sub_category}>
											{subCategoryDisplayName?.length > SUB_CATEGORY_STRING_MAX_LENGTH ? (
												<Tooltip
													theme="light"
													placement="top"
													content={subCategoryDisplayName}
												>
													<div>
														{`${subCategoryDisplayName
															.substring(
																GLOBAL_CONSTANTS.zeroth_index,
																SUB_CATEGORY_STRING_MAX_LENGTH,
															)}..`}

													</div>
												</Tooltip>
											) : (
												<div>{subCategoryDisplayName}</div>
											)}
										</div>
									)}
									{loading && <Loader margin="10px 0px" width="169px" />}
								</div>
							</div>

							<div className={styles.row}>
								{!loading && <div className={styles.product}>{name}</div>}
								{loading && <Loader width="169px" />}
							</div>
						</div>
					),
				)}
			</div>
			<div className={styles.styled_filter_section}>
				<div className="btn" role="presentation" onClick={() => setHSCode(true)}>
					<IcMPlus className={styles.plus_icon} fill="#ffffff" height={50} width={50} />
				</div>
			</div>

			<div className={styles.page_container}>
				<div className="pagination">
					<Pagination
						type="number"
						currentPage={pageNo}
						totalItems={totalRecords}
						pageSize={pageSize}
						onPageChange={(val) => {
							setPagination((prev) => ({ ...prev, page: val }));
						}}
					/>
				</div>
			</div>
			{archive && (
				<ArchiveModal
					archive={archive}
					setArchive={setArchive}
					refetchArchive={refetchArchive}
					refetchProduct={refetchProduct}
				/>
			)}
			{showDeleteModal && (
				<DeleteProductModal
					showDeleteModal={showDeleteModal}
					setShowDeleteModal={setShowDeleteModal}
					deleteProduct={deleteProduct}
					productId={proId}
					productClassificationId={productClassification}
					card
				/>
			)}
		</div>
	);
}
export default AllProducts;
