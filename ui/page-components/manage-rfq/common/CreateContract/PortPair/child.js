import { cl, Tooltip } from '@cogoport/components';

import AdditionalServices from '../../AdditionalServices';

import Item from './Item';
import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

const perPriceMapping = {
	fcl_freight : '/Ctr',
	lcl_freight : '/Wm',
	air_freight : '/Kg',
};

const portDetails = ({ item, locationType, portType }) => {
	function PortContent(classType) {
		return (
			<>
				<div className={cl`${styles.port_header} ${styles?.[classType]}`}>
					<div className="port-name">
						{item?.[`${locationType}_${portType}`]?.name}
					</div>
					<div className="portcode">
						(
						{item?.[`${locationType}_${portType}`]?.port_code}
						)
					</div>
				</div>
				<div className={styles.port_header}>
					{(item?.[`${locationType}_${portType}`]?.display_name || '')
						.split(',')
						.at(-1)
						.trim()}
				</div>
			</>
		);
	}
	return (
		<Tooltip
			animateFill
			content={<PortContent classType="tooltip" />}
			interactive
		>
			<div>
				<PortContent classType="content" />
			</div>
		</Tooltip>
	);
};

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
		<div className={cl`${styles.col} ${styles.styled_col}`} sm={12}>

			<div className={styles.row}>
				<div className={cl`${styles.col} ${styles.port_col}`} sm={0.3}>
					<div className={styles.number}>{portIndex + 1}</div>
				</div>

				<div className={cl`${styles.col} ${styles.port_col} ${styles.padding_req}`} sm={2.1}>
					{portDetails({ item, locationType: 'origin', portType })}
				</div>

				<div className={cl`${styles.col} ${styles.port_col}`} sm={0.3}>
					<PortIcon />
				</div>

				<div className={cl`${styles.col} ${styles.port_col} ${styles.padding_req}`} sm={2.1}>
					{portDetails({ item, locationType: 'destination', portType })}
				</div>

				<div className={cl`${styles.col} ${styles.port_col}`} sm={2.3}>
					<CommodityTags>
						{(item.commodities[0] || []).map((itm) => (
							!itm.includes('Container') && (
								<CommodityTag>{itm}</CommodityTag>
							)
						))}
					</CommodityTags>
					<ServicesTag>
						<AdditionalServices
							serviceDetails={item.service_details}
							type="createcontract"
						/>
					</ServicesTag>
				</div>

				<div className={cl`${styles.col} ${styles.port_col}`} sm={3.3}>
					<Prices>
						<FreightPrice sm={6}>
							<div className="title-price">Basic Freight</div>
							<div className="freight-price-value">
								{formatAmount({
									amount   : item?.rate?.freight_price_discounted,
									currency : item?.rate?.freight_price_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})}
								<span className="per-price-mapping">
									{perPriceMapping[serviceType]}
								</span>
							</div>
						</FreightPrice>
						<FreightPrice sm={6}>
							<div className="title-price">Total</div>
							<div className="total-price-value">
								{formatAmount({
									amount   : item?.rate?.total_price_discounted,
									currency : item?.rate?.total_price_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})}
								<span className="per-price-mapping">
									{perPriceMapping[serviceType]}
								</span>
							</div>
						</FreightPrice>
					</Prices>
				</div>

				{controls.map((controlItem) => {
					if (controlItem.name && filterControls(controlItem.name)) {
						return (
							<div className={cl`${styles.col} ${styles.port_col}`} sm={1.6}>
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
					return <></>;
				})}
			</div>
		</div>
	);
}

export default PortPairChild;
