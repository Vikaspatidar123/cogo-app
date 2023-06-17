import { cl, Button, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Slider from '../../../../common/Slider';

import styles from './styles.module.css';

function PopoverContent({
	filterData,
	setRangeFilter,
	rangeList = {},
	loading,
}) {
	const { t } = useTranslation(['cogoStore']);
	const { cogopoints_range } = filterData || {};
	const { min_points: min = 0, max_points: max } = cogopoints_range || {};

	const [value, setValue] = useState(min);

	const cancelHandler = () => {
		setValue((prv) => ({
			...prv,
			durationValue: 0,
		}));
		setRangeFilter({
			show: false,
			rangeList: {
				cogopoint_greater_than_equal_to: undefined,
				cogopoint_less_than_equal_to: undefined,
			},
		});
	};

	const applyHandler = () => {
		setRangeFilter({
			show: false,
			rangeList: {
				cogopoint_greater_than_equal_to: min,
				cogopoint_less_than_equal_to: value?.durationValue,
			},
		});
	};
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
						disabled={isEmpty(rangeList)}
					>
						{t('cogoStore:cogostore_components_clear')}
					</Button>
					<Button size="sm" themeType="accent" onClick={applyHandler}>
						{t('cogoStore:cogostore_components_apply')}
					</Button>
				</div>
			</div>
			<div className={styles.range_container}>
				<Slider
					durationValue={value?.durationValue}
					setDurationValue={setValue}
					min={min}
					max={max}
					data={min}
				/>
			</div>
		</div>
	);
}

export default PopoverContent;
