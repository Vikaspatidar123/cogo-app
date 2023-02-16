import {
	Pagination, Popover, Skeleton, ToolTip,
} from '@cogoport/components';
// import Popover from '@cogoport/front/components/admin/Popover';
// import Skeleton from '@cogoport/front/components/admin/Skeleton';
// import ToolTip from '@cogoport/front/components/admin/ToolTip';
import { IcMEdit, IcMPaste, IcMDelete } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import AddProductModal from '../../common/AddProductModal';
import DeleteProductModal from '../../common/DeleteProductModal';
import HsCodeIconMaping from '../../common/hsCodeIcons';
import useArchive from '../../hooks/useArchive';
import { PlusIcon, StyledFilterSection } from '../style';

import ArchiveModal from './ArchiveModal';
import {
	CardDiv,
	PageContainer,
	Card,
	Row,
	Text,
	Icon,
	DisplayName,
	Info,
} from './style';

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
		<Info role="presentation" onClick={() => setProId(id)}>
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
		</Info>
	);
	return (
		<>
			<CardDiv justify={isMobile ? 'center' : ''}>
				{(list || [1, 2, 3, 4, 5]).map(
					({
						name,
						id,
						subCategoryDisplayName,
						categoryDisplayName,
						categoryCode,
						productClassificationId,
					}) => (
						<Card>
							<div>
								<Row>
									{!loading && (
										<>
											<div>{Mapping[categoryCode]}</div>
											<DisplayName>
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
											</DisplayName>

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
													<Icon onClick={() => setVisible({ [id]: true })} />
												</div>
											</Popover>
										</>
									)}
									{loading && <Skeleton width="169px" />}
								</Row>
								<Row className="second">
									{!loading && (
										<Text className="subCategory">
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
										</Text>
									)}
									{loading && <Skeleton margin="10px 0px" width="169px" />}
								</Row>
							</div>

							<Row>
								{!loading && <Text className="product">{name}</Text>}
								{loading && <Skeleton width="169px" />}
							</Row>
						</Card>
					),
				)}
			</CardDiv>
			{isMobile && (
				<StyledFilterSection className="pulse">
					<div className="btn" role="presentation" onClick={() => setHSCode(true)}>
						<PlusIcon fill="#ffffff" height={50} width={50} />
					</div>
				</StyledFilterSection>
			)}

			<PageContainer>
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
			</PageContainer>
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
