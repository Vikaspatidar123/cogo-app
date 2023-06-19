import { cl, Button, Chips, Placeholder } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

const chipsOptions = (brand = []) => brand.map(({ id, name }) => ({
	key      : id,
	children : name,
}));

function PopoverContent({
	setBrandFilter,
	brandList = [],
	filterData = {},
	loading,
}) {
	const { t } = useTranslation(['cogoStore']);
	const [chipSelect, setChipSelect] = useState(brandList);
	const { brands } = filterData || {};

	const options = chipsOptions(brands);

	const cancelHandler = () => {
		setChipSelect([]);
		setBrandFilter({
			brandList : [],
			show      : false,
		});
	};

	const applyHandler = () => {
		setBrandFilter({
			show      : false,
			brandList : chipSelect,
		});
	};
	useEffect(() => {
		if (brands) {
			setChipSelect([]);
		}
	}, [brands]);

	if (loading) {
		return (
			<>
				<Placeholder height="50px" width="324px" margin="0px 0px 20px 0px" />
				<Placeholder height="50px" width="324px" margin="0px 0px 20px 0px" />
			</>
		);
	}
	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.header_container}`}>
				<div className={styles.header_title}>
					{t('cogoStore:cogostore_components_main_rangePopover_select_filter')}
				</div>
				<div className={cl`${styles.flex_box} ${styles.cta}`}>
					<Button
						size="sm"
						themeType="secondary"
						onClick={cancelHandler}
						disabled={brandList.length === 0}
					>
						{t('cogoStore:cogostore_components_clear')}
					</Button>
					<Button size="sm" themeType="accent" onClick={applyHandler}>
						{t('cogoStore:cogostore_components_apply')}
					</Button>
				</div>
			</div>

			<div className={styles.brands}>
				<div className={styles.title}>
					{t('cogoStore:cogostore_components_select_brands')}
				</div>
				<div className={styles.chips_container}>
					<Chips
						size="md"
						items={options}
						selectedItems={chipSelect}
						onItemChange={setChipSelect}
						enableMultiSelect
					/>
				</div>
			</div>
		</div>
	);
}

export default PopoverContent;
