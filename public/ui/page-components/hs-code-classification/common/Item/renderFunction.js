import AddProductModal from '../../components/AddProductModal';

import Bookmark from './Bookmark';

const renderFunction = ({ t }) => {
	const newRenderFunction = {
		renderSection: (data, config) => (
			<div>
				{t('hsClassification:hs_code_classification_section_label')}
				{data[config.key]}
			</div>
		),
		renderIcon       : (data, config) => <Bookmark data={data} config={config} />,
		renderAddProduct : (data, config) => <AddProductModal data={data} config={config} />,
	};
	return { newRenderFunction };
};

export default renderFunction;
