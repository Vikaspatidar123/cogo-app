import { Tabs, TabPanel, Input, Button } from '@cogoport/components';
import { IcMSearchlight, IcMListView, IcMGrid, IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import iconUrl from '../../configuration/icon-config.json';
import AddProductModal from '../AddProductModal';

import styles from './styles.module.css';

import HsCode from '@/ui/page-components/hs-code-modal/component';

function Header({
	labeledValue,
	setLabeledValue,
	globalFilter,
	setGlobalFilter,
	addCheck,
	refetchProduct,
}) {
	const [showHsCodeModal, setShowHsCodeModal] = useState(false);
	const [showProduct, setShowProduct] = useState(false);
	const [selectedData, setSelectedData] = useState();
	return (
		<div className={styles.header_container}>
			<div className={styles.title_container}>
				<img
					src={iconUrl.CatalogueIcon}
					alt="catalogue_icon"
					className={styles.logo}
				/>
				<div className={styles.title}>Product Catalogue</div>
			</div>
			<div className={styles.cta}>
				{addCheck && (
					<div className={styles.button}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => {
								setShowHsCodeModal(true);
							}}
						>
							<IcMPlus />
							Add New
						</Button>
					</div>
				)}
				{labeledValue === 'list' && (
					<Input
						size="md"
						className={styles.inputbox}
						value={globalFilter}
						onChange={(v) => setGlobalFilter(v)}
						placeholder="Product Name...."
						suffix={<IcMSearchlight style={{ marginRight: 8 }} />}
					/>
				)}
				<div className={styles.tab_section}>
					<Tabs
						activeTab={labeledValue}
						themeType="primary"
						onChange={setLabeledValue}
					>
						<TabPanel
							name="list"
							title={<IcMListView width={20} height={20} fill="#333" />}
						/>
						<TabPanel
							name="category"
							title={<IcMGrid width={20} height={20} fill="#333" />}
						/>
					</Tabs>
				</div>
			</div>
			{showHsCodeModal && (
				<HsCode
					showHsCodeModal={showHsCodeModal}
					setShowHsCodeModal={setShowHsCodeModal}
					setSelectedData={setSelectedData}
					setShowProduct={setShowProduct}
				/>
			)}
			<AddProductModal
				showProduct={showProduct}
				setShowProduct={setShowProduct}
				prefiledValues={selectedData}
				refetchProduct={refetchProduct}
			/>
		</div>
	);
}
export default Header;
