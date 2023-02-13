import AddProductModal from '../../components/AddProductModal';

import Bookmark from './Bookmark';

const newRenderFunction = {
	renderSection: (data, config) => (
		<div>
			Section
			{' '}
			{data[config.key]}
		</div>
	),
	renderIcon: (data, config) => <Bookmark data={data} config={config} />,
	renderAddProduct: (data, config) => <AddProductModal data={data} config={config} />,
};
const renderFunction = () => ({ newRenderFunction });

export default renderFunction;
