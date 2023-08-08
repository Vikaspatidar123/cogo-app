import { cl, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import getwidth from '../../../utils/getWidth';
import AdditionalServices from '../../AdditionalServices';

import Item from './Item';
import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const LAST_ELEMENT = -1;

function PortContent({ classType, item, locationType, portType }) {
	const {
		name = '',
		port_code = '',
		display_name = '',
	} = item[`${locationType}_${portType}`] || {};
	return (
		<>
			<div className={cl`${styles.port_header} ${styles?.[classType]}`}>
				<div className={styles.port_name}>{name}</div>
				<div className={styles.portcode}>
					(
					{port_code}
					)
				</div>
			</div>
			<div className={styles.port_header}>{display_name.split(',').at(LAST_ELEMENT).trim()}</div>
		</>
	);
}
function PortDetails({ item = {}, locationType = '', portType = '' }) {
	return (
		<Tooltip
			content={(
				<PortContent
					classType="tooltip"
					item={item}
					locationType={locationType}
					portType={portType}
				/>
			)}
			interactive
		>
			<div>
				<PortContent
					classType="content"
					item={item}
					locationType={locationType}
					portType={portType}
				/>
			</div>
		</Tooltip>
	);
}

function PortPairChild({
	portType,
	item,
	controls,
	index,
	name,
	error,
	control = {},
	field,
	serviceType,
	portIndex,
}) {
	const filterControls = (ctrlName) => {
		if (
			['max_containers_count', 'max_volume', 'max_weight'].includes(ctrlName)
		) {
			if (ctrlName === 'max_containers_count' && serviceType === 'fcl_freight') return true;
			if (ctrlName === 'max_volume' && serviceType === 'lcl_freight') return true;
			if (ctrlName === 'max_weight' && serviceType === 'air_freight') return true;
			return false;
		}
		return true;
	};

	return (
		<div className={styles.styled_col} style={{ width: getwidth(12) }}>

			<div className={styles.row}>
				<div className={styles.port_col} style={{ width: getwidth(0.3) }}>
					<div className={styles.number}>{portIndex + 1}</div>
				</div>

				<div
					className={cl` ${styles.port_col} ${styles.padding_req}`}
					style={{ width: getwidth(2.1) }}
				>
					<PortDetails item={item} locationType="origin" portType={portType} />
				</div>

				<div className={styles.port_col} style={{ width: getwidth(0.3) }}>
					<IcMPortArrow fill="#393f70" width={20} height={20} />
				</div>

				<div
					className={cl`${styles.col} ${styles.port_col} ${styles.padding_req}`}
					style={{ width: getwidth(2.1) }}
				>
					<PortDetails item={item} locationType="destination" portType={portType} />
				</div>

				<div className={styles.port_col} style={{ width: getwidth(2.3) }}>
					<div className={styles.commodities_tags}>
						{(item.commodities[0] || []).map((itm) => (
							!itm.includes('Container') && (
								<div className={styles.commodity_tag} key={itm}>{itm}</div>
							)
						))}
					</div>

					<div className={styles.service_tag}>
						<AdditionalServices
							serviceDetails={item.service_details}
							type="createcontract"
						/>
					</div>
				</div>

				<div className={styles.port_col} style={{ width: getwidth(3.3) }}>
					<div className={styles.price}>

						<div className={cl`${styles.col} ${styles.freight_price}`} style={{ width: getwidth(6) }}>
							<div className={styles.title_price}>Basic Freight</div>
							<div className={styles.freight_price_value}>
								{formatAmount({
									amount   : item?.rate?.freight_price_discounted,
									currency : item?.rate?.freight_price_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})}
							</div>
						</div>

						<div className={cl`${styles.col} ${styles.freight_price}`} style={{ width: getwidth(6) }}>
							<div className={styles.title_price}>Total</div>
							<div className={styles.total_price_value}>
								{formatAmount({
									amount   : item?.rate?.total_price_discounted,
									currency : item?.rate?.total_price_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})}
							</div>
						</div>
					</div>
				</div>

				{controls.map((controlItem) => {
					if (controlItem.name && filterControls(controlItem.name)) {
						return (
							<div className={styles.port_col} style={{ width: getwidth(1.6) }}>
								<Item
									{...controlItem}
									key={`${name}.${index}.${controlItem.name}`}
									itemKey={
										controlItem?.itemKey
										|| `${name}.${index}.${controlItem.name}`
									}
									control={control}
									name={`${name}.${index}.${controlItem.name}`}
									value={field[controlItem.name]}
									childError={error?.[controlItem.name]}
									disabled={controlItem?.disabled}
									label={controlItem.label}
									index={index}
								/>
							</div>
						);
					}
					return <div />;
				})}
			</div>
		</div>
	);
}

export default PortPairChild;
