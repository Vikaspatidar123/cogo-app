import {
	Tabs, TabPanel,
} from '@cogoport/components';
import { useState } from 'react';

import HsCode from '../../hs-code-modal';
import useHSCodelist from '../hooks/useHsCodeList';
import useProductCatalogue from '../hooks/useProductCatalogue';

import Dashboard from './Dashboard';
import UploadDocument from './Dashboard/UploadDocument';
import ProductsList from './ProductsList';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ProductInventory() {
	const [activeTab, setActiveTab] = useState('allProducts');
	const [showProductView, setShowProductView] = useState(true);

	const [archiveList, setArciveList] = useState(false);
	const { hsList, loading: hsLoading, fetch } = useHSCodelist();

	const [subCategory, setSubCategory] = useState([]);
	const [selectedData, setSelectedData] = useState();
	const [hsCode, setHSCode] = useState(false);
	const [activeHeaderTab, setActiveHeaderTab] = useState('');
	const [showProduct, setShowProduct] = useState(false);
	const [prefiledValues, setPrefiledValues] = useState({});
	const [sectionTab, setSectionTab] = useState('products');
	const [uploadModal, setUploadModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const {
		addProductLoading,
		apiData = {},
		refetchProduct,
		loading = false,
		deleteProduct,
	} = useProductCatalogue({
		archive: false,
		fetch,
		setShowProductView,
	});

	const { push } = useRouter();
	const handelRouting = () => {
		push('/saas/product-inventory/archived');
		setArciveList(!archiveList);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.product_analytics_tab_ctn}>
					<Tabs
						activeTab={sectionTab}
						onChange={setSectionTab}
						className="horizontal two"
					>
						<TabPanel name="products" title="Products" className="horizontal one" />
						<TabPanel name="analytics" title="Analytics" className="horizontal one">
							<div className={styles.dashboard_data}>
								<Dashboard apiData={apiData} activeTab={activeTab} />
							</div>
						</TabPanel>
					</Tabs>
				</div>
				{(sectionTab === 'products') && (
					<ProductsList
						handelRouting={handelRouting}
						setUploadModal={setUploadModal}
						hsLoading={hsLoading}
						setHSCode={setHSCode}
						showProductView={showProductView}
						hsList={hsList}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						setShowProductView={setShowProductView}
						refetchProduct={refetchProduct}
						setSubCategory={setSubCategory}
						setActiveHeaderTab={setActiveHeaderTab}
						apiData={apiData}
						loading={loading}
						showProduct={showProduct}
						setShowProduct={setShowProduct}
						prefiledValues={prefiledValues}
						setPrefiledValues={setPrefiledValues}
						addProductLoading={addProductLoading}
						deleteProduct={deleteProduct}
						hsCode={hsCode}
						subCategory={subCategory}
						activeHeaderTab={activeHeaderTab}
						isEdit={isEdit}
						setIsEdit={setIsEdit}
						selectedData={selectedData}
					/>
				)}

				{/* <div className={styles.dashboard_container}>
					<Dashboard apiData={apiData} activeTab={activeTab} />
				</div> */}
			</div>

			{hsCode && (
				<HsCode
					showHsCodeModal={hsCode}
					setShowHsCodeModal={setHSCode}
					setSelectedData={setSelectedData}
					setShowProduct={setShowProduct}
					setPrefiledValues={setPrefiledValues}
				/>
			)}

			{uploadModal && (
				<UploadDocument
					uploadModal={uploadModal}
					setUploadModal={setUploadModal}
					refetchProduct={refetchProduct}
				/>
			)}
		</>
	);
}

export default ProductInventory;
