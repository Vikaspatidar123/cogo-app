import Card from './Card';
import useGetSupplier from './useGetSupplier';

import RadioController from '@/packages/forms/Controlled/RadioController';

function SupplierSelect(props) {
	const { data } = useGetSupplier();

	const options = (data?.list || []).map((item, i) => ({
		label : <Card item={item} priority={i} />,
		value : item.priority,
		type  : i % 2 === 0 ? 'suppllier' : 'carrier',
		...item,
	}));

	return (
		<div>
			<RadioController {...props} options={options} />
		</div>
	);
}

export default SupplierSelect;
