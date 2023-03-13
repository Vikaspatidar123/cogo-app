import { cl, Radio } from '@cogoport/components';

import styles from '../../styles.module.css';

import { shortFormatNumber } from '@/ui/commons/utils/getShortFormatNumber';

function HsCodeList({
	list = [], addProductId = [], checkId = [], addRemoveCheckBox,
}) {
	return (
		<>
			<div className={cl`${styles.title} ${styles.hsCode_title}`}>Select HS Code</div>
			<div className={styles.scroll_content}>
				{list.map(({
					id, name, description, hsCode, costPrice, sellingPrice, currency,
				}) => (
					<div className={styles.hs_container} key={id}>
						<Radio
							checked={addProductId.includes(id)}
							disabled={checkId.includes(id)}
							onChange={() => addRemoveCheckBox(id)}
						/>
						<div className={styles.hs_details}>
							<div className={cl`${styles.row} ${styles.first_row}`}>
								<div className={styles.name}>
									<div className={styles.label}>Name</div>
									<div className={styles.value}>{name}</div>
								</div>
								<div className={styles.desc}>
									<div className={styles.label}>Description</div>
									<div className={styles.value}>{description !== '' ? description : '--'}</div>
								</div>
							</div>

							<div className={styles.row}>
								<div>
									<div className={styles.label}>HS Code</div>
									<div className={styles.value}>{hsCode}</div>
								</div>
								<div>
									<div className={styles.label}>Cost Price</div>
									<div className={styles.value}>{shortFormatNumber(costPrice, currency, true)}</div>
								</div>
								<div>
									<div className={styles.label}>Selling Price</div>
									<div className={styles.value}>
										{shortFormatNumber(sellingPrice, currency, true)}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>

	);
}
export default HsCodeList;
