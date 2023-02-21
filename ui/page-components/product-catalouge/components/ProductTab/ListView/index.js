import { Popover, Table, Tooltip } from '@cogoport/components';
// import Table from '@cogoport/front/components/admin/Table';
// import ToolTip from '@cogoport/front/components/admin/ToolTip';
import {
	IcMEdit, IcMPaste, IcMDelete, IcMOverflowDot,
} from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import AddProductModal from '../../../common/AddProductModal';
import DeleteProductModal from '../../../common/DeleteProductModal';
import { shortFormatNumber } from '../../../common/getShortFromatNumber';
import useArchive from '../../../hooks/useArchive';
import ArchiveModal from '../../AllProducts/ArchiveModal';

// import {
// 	TableWrapper, Icon, Info, TableHead,
// } from './style';
import styles from './styles.module.css';

function ListView({
	item,
	activeSubTab,
	refetchProduct,
	apiData,
	showProduct,
	setShowProduct,
	setHSCode,
	deleteProduct,
	setActiveTab,
	subCategory,
	loading,
	setIsEdit,
	isEdit,
	isMobile,
}) {
	const [archive, setArchive] = useState(false);
	const { productClassificationId = '', subCategoryCount = 0 } = item || {};
	const [productClassification, setProductClassification] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [proId, setProId] = useState('');
	const { refetchArchive } = useArchive({
		proId,
		setArchive,
		refetchProduct,
		productClassificationId,
		subCategoryCount,
		setActiveTab,
		card: false,
	});
	const [visible, setVisible] = useState();
	useEffect(() => {
		if (activeSubTab) refetchProduct({ productClassificationId, sub: false });
	}, [activeSubTab]);
	const renderDescription = (record) => {
		if (record?.length > 10) {
			return (
				<Tooltip placement="top" content={record}>
					<div>{`${record?.substring(0, 10)}...`}</div>
				</Tooltip>
			);
		}
		return record;
	};
	const check = !apiData?.list?.length > 0 && !subCategory?.length > 0;

	useEffect(() => {
		if (check) setActiveTab('allProducts');
	}, [check]);

	const content = (id) => (
		<div className={styles.info} role="presentation" onClick={() => setProId(id)}>
			<div
				className="text edit"
				role="presentation"
				onClick={() => {
					setProductClassification(productClassificationId);
					setProId(id);
					setIsEdit(true);
					setShowProduct(true);
					setVisible(false);
				}}
			>
				<IcMEdit width={10} height={10} />
				<p>Edit</p>
			</div>

			<div
				className="text edit"
				role="presentation"
				onClick={() => {
					setArchive(true);
					setProId(id);
					setVisible(false);
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
					setVisible(false);
				}}
			>
				<IcMDelete width={10} height={10} />
				<p>Delete</p>
			</div>
		</div>
	);

	const columns = [
		{
			Header   : 'Name',
			id       : 'name',
			key      : 'name',
			accessor : (record) => renderDescription(record?.name),
		},
		{
			Header   : 'Description',
			key      : 'description',
			id       : 'description',
			accessor : (record) => renderDescription(record?.description),
		},
		{
			Header   : () => 'HS Code',
			key      : 'hsCode',
			id       : 'hsCode',
			accessor : (record) => record?.hsCode,
		},
		{
			Header   : () => 'Cost Price',
			key      : 'price',
			id       : 'price',
			accessor : (record) => shortFormatNumber(record?.costPrice, record?.currency),
		},
		{
			Header   : () => 'Selling Price',
			id       : 'netAmount',
			key      : 'netAmount',
			accessor : (record) => shortFormatNumber(record?.sellingPrice, record?.currency),
		},
		{
			Header   : () => 'Action',
			id       : 'action',
			key      : 'action',
			accessor : (record) => (
				<Popover
					placement="bottom"
					animation="shift-away"
					theme="light-border"
					render={content(record.id)}
					interactive
					visible={visible?.[record.id]}
					onClickOutside={() => {
						setVisible(false);
					}}
				>
					<div>
						<IcMOverflowDot
							className={styles.icon}
							onClick={() => {
								setVisible(true);
							}}
						/>
					</div>
				</Popover>
			),
		},
	];

	return (
		<>
			<div className={styles.table_head}>
				<div className={styles.table_wrapper}>
					<Table
						className="tables"
						columns={columns}
						data={apiData?.list || []}
						fixedHeader
						theme="admin"
						loading={loading}
					/>
				</div>
			</div>

			<AddProductModal
				isEdit={isEdit}
				showProduct={showProduct}
				setShowProduct={setShowProduct}
				refetchProduct={refetchProduct}
				productId={proId}
				setHSCode={setHSCode}
				productClassificationId={productClassification}
				subCategoryCount={subCategoryCount}
				card={false}
				setActiveTab={setActiveTab}
				isMobile={isMobile}
			/>

			{archive && (
				<ArchiveModal
					archive={archive}
					setArchive={setArchive}
					refetchArchive={refetchArchive}
					refetchProduct={refetchProduct}
				/>
			)}

			<DeleteProductModal
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
				deleteProduct={deleteProduct}
				productId={proId}
				productClassificationId={productClassification}
				subCategoryCount={subCategoryCount}
				card={false}
			/>
		</>
	);
}

export default ListView;
