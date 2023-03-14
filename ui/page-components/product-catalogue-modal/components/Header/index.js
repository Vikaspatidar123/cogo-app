import { Tabs, TabPanel, Input } from '@cogoport/components';
import {
	IcMSearchlight, IcMListView, IcMGrid,
} from '@cogoport/icons-react';

import iconUrl from '../../configuration/icon-config.json';

import styles from './styles.module.css';

function header({
	labeledValue, setLabeledValue, globalFilter, setGlobalFilter,
}) {
	return (
		<div className={styles.header_container}>
			<div className={styles.title_container}>
				<img src={iconUrl.CatalogueIcon} alt="catalogue_icon" className={styles.logo} />
				<div className={styles.title}>Product Catalogue</div>
			</div>
			<div className={styles.cta}>
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
						<TabPanel name="list" title={<IcMListView width={20} height={20} fill="#333" />} />
						<TabPanel name="category" title={<IcMGrid width={20} height={20} fill="#333" />} />

					</Tabs>
				</div>

			</div>

		</div>
	);
}
export default header;
