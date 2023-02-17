import {
	Pagination, Popover, Skeleton, ToolTip,
} from '@cogoport/components';
// import Popover from '@cogoport/front/components/admin/Popover';
// import Skeleton from '@cogoport/front/components/admin/Skeleton';
// import ToolTip from '@cogoport/front/components/admin/ToolTip';
import {
	IcMEdit, IcMPaste, IcMDelete, IcMOverflowDot, IcMPlus,
} from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import AddProductModal from '../../common/AddProductModal';
import DeleteProductModal from '../../common/DeleteProductModal';
import HsCodeIconMaping from '../../common/hsCodeIcons';
import useArchive from '../../hooks/useArchive';
// import { PlusIcon, StyledFilterSection } from '../style';

import ArchiveModal from './ArchiveModal';
// import {
// 	CardDiv,
// 	PageContainer,
// 	Card,
// 	Row,
// 	Text,
// 	Icon,
// 	DisplayName,
// 	Info,
// } from './style';
import styles from './styles.module.css';

function AllProducts({
	showProduct,
	setShowProduct,
	countryInfo,
	prefiledValues,
	setPrefiledValues,
	apiData,
	refetchProduct = () => {},
	loading,
	addProductLoading,
	setHSCode = () => {},
	deleteProduct = () => {},
	isMobile,
	setIsEdit,
	isEdit,
}) {
	const { Mapping } = HsCodeIconMaping(isMobile);
	const [archive, setArchive] = useState(false);
	const [visible, setVisible] = useState({});
	const [proId, setProId] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [productClassification, setProductClassification] = useState('');
	const { refetchArchive } = useArchive({
		proId,
		setArchive,
		refetchProduct,
		productClassificationId : productClassification,
		card                    : true,
	});
	const {
		list = [], pageNo = 1, totalRecords = 0, pageSize = 0,
	} = apiData || {};

	const [pagination, setPagination] = useState(pageNo);

	useEffect(() => {
		refetchProduct({ page: pagination });
	}, [pagination]);

	const content = (id, productClassificationId) => (
		<div className={styles.info} role="presentation" onClick={() => setProId(id)}>
			<div
				className="text edit"
				role="presentation"
				onClick={() => {
					setProductClassification(productClassificationId);
					setIsEdit(true);
					setShowProduct(true);
					setVisible({ [id]: false });
				}}
			>
				<IcMEdit width={10} height={10} />
				<p>Edit</p>
			</div>

			<div
				className="text edit"
				role="presentation"
				onClick={() => {
					setProId(id);
					setArchive(true);
					setVisible({ [id]: false });
				}}
			>
				<IcMPaste width={10} height={10} />
				<p>Archive</p>
			</div>

			<div
				className="text"
				role="presentation"
				onClick={() => {
					setShowDeleteModal(true);
					setProId(id);
					setProductClassification(productClassificationId);
					setVisible({ [id]: false });
				}}
			>
				<IcMDelete width={10} height={10} />
				<p>Delete</p>
			</div>
		</div>
	);
	return (
		<>
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
											<div>{Mapping[categoryCode]}</div>
											<div className={styles.display_name}>
												{categoryDisplayName?.length > 16 ? (
													<ToolTip
														theme="light"
														placement="top"
														content={categoryDisplayName}
													>
														<div>{`${categoryDisplayName.substring(0, 16)}..`}</div>
													</ToolTip>
												) : (
													<div>{categoryDisplayName}</div>
												)}
											</div>

											<Popover
												placement="bottom"
												animation="shift-away"
												theme="light-border"
												content={content(id, productClassificationId)}
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
									{loading && <Skeleton width="169px" />}
								</div>
								<div className={`${styles.row}${styles.second}`}>
									{!loading && (
										<div className={`${styles.text}${styles.sub_category}`}>
											{subCategoryDisplayName?.length > 40 ? (
												<ToolTip
													theme="light"
													placement="top"
													content={subCategoryDisplayName}
												>
													<div>{`${subCategoryDisplayName.substring(0, 40)}..`}</div>
												</ToolTip>
											) : (
												<div>{subCategoryDisplayName}</div>
											)}
										</div>
									)}
									{loading && <Skeleton margin="10px 0px" width="169px" />}
								</div>
							</div>

							<div className={styles.row}>
								{!loading && <div className={`${styles.text}${styles.product}`}>{name}</div>}
								{loading && <Skeleton width="169px" />}
							</div>
						</div>
					),
				)}
			</div>
			{isMobile && (
				<div className={`${styles.styled_filter_section}`}>
					<div className="btn" role="presentation" onClick={() => setHSCode(true)}>
						<IcMPlus className={styles.plus_icon} fill="#ffffff" height={50} width={50} />
					</div>
				</div>
			)}

			<div className={styles.page_container}>
				<div className="pagination">
					<Pagination
						className="xl"
						pageRange={5}
						pageLimit={pageSize}
						total={totalRecords}
						pagination={pageNo}
						isMobile={isMobile}
						setPagination={(val) => {
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
			<AddProductModal
				showProduct={showProduct}
				setShowProduct={setShowProduct}
				countryInfo={countryInfo}
				prefiledValues={prefiledValues}
				setPrefiledValues={setPrefiledValues}
				isEdit={isEdit}
				addProductLoading={addProductLoading}
				refetchProduct={refetchProduct}
				setHSCode={setHSCode}
				productClassificationId={productClassification}
				productId={proId}
				card
				isMobile={isMobile}
			/>
		</>
	);
}
export default AllProducts;
