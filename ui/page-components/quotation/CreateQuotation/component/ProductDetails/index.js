import { Button } from '@cogoport/components';
import { IcMBreakBulkCargoType } from '@cogoport/icons-react';
import { forwardRef, useState } from 'react';

import List from './List';
import styles from './styles.module.css';

import ProductCatalogue from '@/ui/page-components/product-catalogue-modal/components';

function ProductDetails(props, ref) {
	const [showCatalogue, setShowCatalogue] = useState(false);
	const [selectedData, setSelectedData] = useState([]);
	const [selectedId, setSelectedId] = useState([]);
	return (
		<div className={styles.container}>
			<div className={styles.header_row}>
				<div className={styles.header}>
					<div className={styles.icon_container}>
						<IcMBreakBulkCargoType width={17} height={17} fill="#fff" />
					</div>
					<h3 className={styles.title}>Product Details</h3>
				</div>
				<Button themeType="secondary" onClick={() => setShowCatalogue(true)}>
					Product Catalogue
				</Button>
			</div>
			<div>
				<List
					ref={ref}
					selectedData={selectedData}
					setSelectedId={setSelectedId}
				/>
			</div>
			<ProductCatalogue
				setShowCatalogue={setShowCatalogue}
				showCatalogue={showCatalogue}
				setSelectedData={setSelectedData}
				multiSelect
				selectedId={selectedId}
			/>
		</div>
	);
}

export default forwardRef(ProductDetails);
