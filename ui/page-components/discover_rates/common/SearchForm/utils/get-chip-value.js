import { startCase } from '@cogoport/utils';

import getFormattedValues from '@/ui/commons/utils/getFormattedValues';

const getChipValue = (value, operatorName = {}) => {
	const modifiedValues = [];
	Object.keys(value || {}).forEach((key) => {
		const keyValue = value[key];

		if (Array.isArray(keyValue)) {
			(keyValue || []).forEach((item) => {
				const { container_type, commodity } =					item?.container_type_commodity || {};

				if (container_type) {
					let container_details = '';

					if (item?.containers_count) {
						container_details = container_details
							? `${container_details}, ${item?.containers_count} ${
								item?.containers_count === 1 ? 'Container' : 'Containers'
							  }`
							: `${item?.containers_count} ${
								item?.containers_count === 1 ? 'Container' : 'Containers'
							  }`;
					}
					if (item?.container_size) {
						container_details = container_details
							? `${container_details}, ${item?.container_size}ft`
							: `${item.container_size}ft`;
					}
					if (item?.container_type_commodity) {
						if (container_type && commodity) {
							container_details = container_details
								? `${container_details}, ${
									container_type && startCase(container_type)
								  }, ${commodity && startCase(commodity)}`
								: `${container_type && startCase(container_type)}, ${
									commodity && startCase(commodity)
								  }`;
						}
					}
					if (item?.cargo_weight_per_container) {
						container_details = container_details
							? `${container_details}, ${item?.cargo_weight_per_container} MT`
							: `${item?.cargo_weight_per_container} MT`;
					}
					modifiedValues.push(container_details);
				}

				if (item?.shipping_line_id || item?.airline_id) {
					modifiedValues.push(startCase(operatorName?.short_name));
				}
			});
		}

		if (
			key.includes('packages')
			&& keyValue?.length > 0
			&& Array.isArray(keyValue)
		) {
			const valueForInput = getFormattedValues(keyValue[0] || {});

			const inputValue = valueForInput
				? `${valueForInput?.packages_count} Pkg, ${valueForInput?.length} X ${valueForInput?.width} X ${valueForInput?.height}, ${valueForInput?.packing_type}`
				: '';
			const packageDetails = `Package: ${inputValue} ${
				keyValue?.length > 1 ? `+ ${keyValue?.length - 1} more` : ''
			}`;
			modifiedValues.push(packageDetails);
		}

		if (typeof keyValue !== 'object') {
			if (key.includes('container_size') && keyValue) {
				modifiedValues.push(`${keyValue} ft`);
			} else if (key.includes('inco_term') && keyValue) {
				modifiedValues.push(keyValue.toUpperCase());
			} else if (key.includes('cargo_weight_per_container') && keyValue) {
				modifiedValues.push(`${keyValue} MT`);
			} else if (key.includes('containers_count') && keyValue) {
				modifiedValues.push(
					`${keyValue} ${keyValue === 1 ? 'Container' : 'Containers'}`,
				);
			} else if (key.includes('weight') && keyValue) {
				modifiedValues.push(`Wt. - ${keyValue} Kgs`);
			} else if (key.includes('volume') && keyValue) {
				modifiedValues.push(`Vol. - ${keyValue} cbm`);
			} else if (key.includes('packages_count') && keyValue) {
				modifiedValues.push(
					`${keyValue} ${keyValue === 1 ? 'Packages' : 'Packages'}`,
				);
			} else if (key.includes('trucks_count') && keyValue) {
				modifiedValues.push(
					`${keyValue} ${keyValue === 1 ? 'Truck' : 'Trucks'}`,
				);
			} else if (key === 'shipping_line_id' || key === 'airline_id') {
				modifiedValues.push(startCase(operatorName?.short_name));
			} else if (keyValue) {
				modifiedValues.push(startCase(keyValue));
			}
		}
	});
	return modifiedValues;
};

export default getChipValue;
