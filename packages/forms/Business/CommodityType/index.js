import { cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import CONTAINER_TYPES from '../../constants/container-types.json';
import getCommodityList from '../../utils/getCommodityList';
import Chips from '../Chip/chip';

import styles from './styles.module.css';
import CommodityChip from './ValueChip';

function CommodityType({
	value = {},
	onChange = () => { },
	controlFields = {},
	showOptions = true,
	...rest
}) {
	const typeValue = value?.container_type;
	const [objs, setObjs] = useState({});
	const [view, setView] = useState(typeValue ? 'commodity' : 'type');
	const [commodityOptions, setCommodityOptions] = useState([]);
	const { id, disabled = false } = rest;

	let label = 'Container Type';

	const typeLabel = () => {
		let newLabel = typeValue;

		CONTAINER_TYPES.forEach((type) => {
			if (type.value === typeValue) {
				newLabel = type.label;
			}
		});

		return newLabel;
	};

	if (view === 'commodity') {
		label = (
			<>
				{!disabled ? (
					<div
						className={styles.back}
						role="presentation"
						type="button"
						id={`${id}_back`}
						onClick={() => {
							setView('type');
						}}
					>
						<IcMArrowBack size={1.4} />
					</div>
				) : null}
				<div className={styles.type_label}>{`${typeLabel()} `}</div>
				{value.commodity ? (
					<span style={{ maxWidth: '125px', marginLeft: 4 }}>
						<CommodityChip
							id={`${id}_clear`}
							onCancel={() => onChange({ ...(value || {}), commodity: '' })}
							value={commodityOptions.find((comm) => (
								comm.value === value.commodity))?.label || 'All Commodities'}
							disabled={disabled}
						/>
					</span>
				) : (
					<span className={styles.sub_label}>/ Select Commodity</span>
				)}
			</>
		);
	}

	const handleTypeChange = (val, obj) => {
		setView('commodity');
		const newObjs = { ...objs, container_type: obj || {} };
		setObjs(newObjs);
		onChange({ container_type: val, commodity: value?.commodity }, newObjs);
	};

	const handleCommodityChange = (val, obj) => {
		const newObjs = { ...objs, commodity: obj || {} };
		setObjs(newObjs);
		onChange(
			{
				container_type : value?.container_type,
				commodity      : val || 'all_commodity',
			},
			newObjs,
		);
	};

	useEffect(() => {
		if (typeValue) {
			setCommodityOptions(
				(getCommodityList(
					controlFields?.commodity?.commodity_type || 'freight',
					typeValue,
				) || []).map((item) => ({ ...item, key: item.value, children: item.label })),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [typeValue]);
	return (
		<div id={id}>
			<div className={styles.label}>{label}</div>
			{showOptions ? (
				<div className={styles.main}>
					<div
						className={styles.animated_container}
						type={view === 'type' ? 'enter' : 'exit'}
					>
						<div>
							<div
								className={cl`${styles.section} ${view === 'type' ? styles.active : ''}`}
							>
								<Chips
									{...controlFields.container_type}
									onChange={handleTypeChange}
									id={`${id}_container_type`}
								/>
							</div>
						</div>
					</div>
					<div
						className={view === 'commodity' && !value?.commodity ? styles.enter : styles.exit}
						type={view === 'commodity' && !value?.commodity ? 'enter' : 'exit'}
					>
						<div>
							<div
								className={cl`${styles.section} ${view === 'commodity' ? styles.active : ''}`}
							>
								<Chips
									key="commodity"
									{...controlFields.commodity}
									onChange={handleCommodityChange}
									options={commodityOptions}
									id={`${id}_commodity`}
								/>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default CommodityType;
