import { Popover, Input, Badge } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import RangePopover from '../RangePopover';
import BrandPopover from '../BrandPopover';
import useFilters from '../../../hooks/useFilters';
import styles from '../styles.module.css';

function Filter({
	rangeFilter,
	setRangeFilter,
	brandFilter,
	setBrandFilter,
	searchValue,
	setSearchValue,
	categoryId,
}) {
	const { t } = useTranslation(['cogoStore']);
	const { rangeList = {} } = rangeFilter;
	const {
		cogopoint_greater_than_equal_to: min = 0,
		cogopoint_less_than_equal_to: max = 0,
	} = rangeList;

	const { brandList } = brandFilter;

	const { data: filterData = {}, loading = false } = useFilters({
		categoryId,
	});

	const handlePopover = (state, stateFn) => {
		stateFn((prev) => ({
			...prev,
			show: !state.show,
		}));
	};

	const renderPopoverLabel = (name, state, stateFn) => {
		if (
			(name === t('cogoStore:cogostore_components_range') && max && min >= 0) ||
			(name === t('cogoStore:cogostore_components_brand') &&
				brandList.length > 0)
		) {
			return (
				<Badge placement="right" color="orange" size="md" text="">
					<div
						role="presentation"
						className={styles.filter_btn}
						onClick={() => handlePopover(state, stateFn)}
					>
						{name}
					</div>
				</Badge>
			);
		}
		return (
			<div
				role="presentation"
				className={styles.filter_btn}
				onClick={() => handlePopover(state, stateFn)}
			>
				{name}
			</div>
		);
	};

	return (
		<div className={styles.filters_container}>
			<div className={styles.filter_brands_range}>
				<Popover
					placement="bottom"
					caret={false}
					visible={rangeFilter.show}
					onClickOutside={() => handlePopover(rangeFilter, setRangeFilter)}
					content={
						<RangePopover
							filterData={filterData}
							setRangeFilter={setRangeFilter}
							rangeList={rangeList}
							loading={loading}
						/>
					}
				>
					{renderPopoverLabel(
						t('cogoStore:cogostore_components_range'),
						rangeFilter,
						setRangeFilter,
					)}
				</Popover>
				<Popover
					placement="bottom"
					caret={false}
					visible={brandFilter.show}
					onClickOutside={() => handlePopover(brandFilter, setBrandFilter)}
					content={
						<BrandPopover
							setBrandFilter={setBrandFilter}
							brandList={brandList}
							filterData={filterData}
							loading={loading}
						/>
					}
				>
					{renderPopoverLabel(
						t('cogoStore:cogostore_components_brand'),
						brandFilter,
						setBrandFilter,
					)}
				</Popover>
			</div>
			<div className={styles.input_box}>
				<Input
					prefix={<IcMSearchlight />}
					value={searchValue}
					onChange={setSearchValue}
					placeholder={t('cogoStore:main_filter_input_placeholder')}
				/>
			</div>
		</div>
	);
}

export default Filter;
