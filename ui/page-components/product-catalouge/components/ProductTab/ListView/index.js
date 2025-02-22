/* eslint-disable react-hooks/exhaustive-deps */
import { Popover, Table, Tooltip } from '@cogoport/components';
import {
	IcMEdit, IcMPaste, IcMDelete, IcMOverflowDot,
} from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import formatAmount from '../../../../../commons/utils/formatAmount';
import AddProductModal from '../../../common/AddProductModal';
import DeleteProductModal from '../../../common/DeleteProductModal';
import useArchive from '../../../hooks/useArchive';
import ArchiveModal from '../../AllProducts/ArchiveModal';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const DESCRIPTION_MAX_LENGTH = 10;

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
}) {
	const { productClassificationId = '', subCategoryCount = 0 } = item || {};

	const { t } = useTranslation(['common', 'productCatalogue']);
	const [archive, setArchive] = useState(false);
	const [productClassification, setProductClassification] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [proId, setProId] = useState('');
	const [visible, setVisible] = useState({});

	const { refetchArchive } = useArchive({
		proId,
		setArchive,
		refetchProduct,
		productClassificationId,
		subCategoryCount,
		setActiveTab,
		card: false,
	});

	const renderDescription = (record) => {
		if (record?.length > DESCRIPTION_MAX_LENGTH) {
			return (
				<Tooltip placement="top" content={record}>
					<div>{`${record?.substring(GLOBAL_CONSTANTS.zeroth_index, DESCRIPTION_MAX_LENGTH)}...`}</div>
				</Tooltip>
			);
		}
		return record;
	};
	const check = !apiData?.list?.length > 0 && !subCategory?.length > 0;

	useEffect(() => {
		if (activeSubTab) refetchProduct({ productClassificationId, sub: false });
	}, [activeSubTab]);

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
					setVisible({ [id]: false });
				}}
			>
				<IcMEdit width={10} height={10} />
				<p>{t('productCatalogue:product_catalogue_all_products_edit_button_label_1')}</p>
			</div>

			<div
				className="text edit"
				role="presentation"
				onClick={() => {
					setArchive(true);
					setProId(id);
					setVisible({ [id]: false });
				}}
			>
				<IcMPaste width={10} height={10} />
				<p>{t('productCatalogue:product_catalogue_all_products_edit_button_label_2')}</p>
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
				<p>{t('productCatalogue:product_catalogue_all_products_edit_button_label_3')}</p>
			</div>
		</div>
	);

	const columns = [
		{
			Header   : t('productCatalogue:product_catalogue_list_column_title_1'),
			id       : 'name',
			key      : 'name',
			accessor : (record) => renderDescription(record?.name),
		},
		{
			Header   : t('productCatalogue:product_catalogue_list_column_title_2'),
			key      : 'description',
			id       : 'description',
			accessor : (record) => renderDescription(record?.description),
		},
		{
			Header   : t('productCatalogue:product_catalogue_list_column_title_3'),
			key      : 'hsCode',
			id       : 'hsCode',
			accessor : (record) => record?.hsCode,
		},
		{
			Header   : t('productCatalogue:product_catalogue_list_column_title_4'),
			key      : 'price',
			id       : 'price',
			accessor : (record) => formatAmount({
				amount   : record?.costPrice,
				currency : record?.currency,
				options  : {
					currency        : record?.currency,
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
		},
		{
			Header   : t('productCatalogue:product_catalogue_list_column_title_5'),
			id       : 'netAmount',
			key      : 'netAmount',
			accessor : (record) => formatAmount({
				amount   : record?.sellingPrice,
				currency : record?.currency,
				options  : {
					currency        : record?.currency,
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
		},
		{
			Header   : t('productCatalogue:product_catalogue_list_column_title_6'),
			id       : 'action',
			key      : 'action',
			accessor : (record) => (
				<Popover
					placement="bottom"
					animation="shift-away"
					render={content(record.id)}
					interactive
					visible={visible?.[record.id]}
					onClickOutside={() => {
						setVisible({ [record.id]: false });
					}}
				>
					<div>
						<IcMOverflowDot
							className={styles.icon}
							onClick={() => {
								setVisible({ [record.id]: true });
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
