import { Placeholder } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import Element from './Element';
import getValue from './getValue';
import renderFunction from './renderFunction';
import styles from './styles.module.css';

const Item = ({ configs, data, loading }) => {
	const { t } = useTranslation(['common', 'hsClassification']);
	const { newRenderFunction } = renderFunction({ t });

	const renderItem = () => (
		<div className={styles.row}>
			{(configs || []).map((config) => (
				<div
					key={config.key}
					style={config?.style}
					className={`${styles.ele} ${config.key === 'description' ? styles.hsdesc : ''} 
					${config.key === 'displayHsCode' && styles.hscode
					} ${config.key === 'addProduct' ? styles.add : ''}`}
				>
					{loading && <Placeholder height="15px" width="30px" />}
					{!loading && (
						<Element
							type={config.type}
							value={getValue(config, data, newRenderFunction)}
						/>
					)}
				</div>
			))}
		</div>
	);

	return renderItem();
};

export default Item;
