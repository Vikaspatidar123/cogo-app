import { startCase, upperCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function ContainerInfo({ detail }) {
	const { packages = [] } = detail || {};
	const { t } = useTranslation(['dashboard']);

	const labels = [
		'container_size',
		'containers_count',
		'container_type',
		'commodity',
		'inco_term',
		'trucks_count',
		'trade_type',
		'packages',
		'volume',
		'weight',
		'rates_count',
	];

	const valueForInput = Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;

	const inputValue = valueForInput
		? `${valueForInput.packages_count}
		 ${t('dashboard:common_containerInfo_inputValue')},
		  ${valueForInput?.length} X ${valueForInput?.width} X ${valueForInput?.height}, ${valueForInput?.packing_type}`
		: '';
	const packageDetails = `${t('dashboard:common_containerInfo_packageDetails_1')}:
	 ${inputValue} ${packages?.length > 1
			? `+ ${(packages?.length || 0) - 1} ${t('dashboard:common_containerInfo_packageDetails_2')}`
			: ''
		}`;

	const renderValue = (label) => {
		switch (label) {
			case 'container_size':
				return `${detail.container_size || '--'} ${t('dashboard:common_containerInfo_renderValue_1')}`;
			case 'containers_count':
				if (!detail.containers_count) {
					return null;
				}

				if (detail.containers_count === 1) {
					return t('dashboard:common_containerInfo_renderValue_2');
				}

				return `${detail.containers_count} ${t('dashboard:common_containerInfo_renderValue_3')}`;
			case 'packages_count':
				if (!detail.packages_count) {
					return null;
				}

				if (detail.packages_count === 1) {
					return t('dashboard:common_containerInfo_renderValue_4');
				}

				return `${detail.packages_count} "${t('dashboard:common_containerInfo_renderValue_5')}"`;
			case 'trucks_count':
				if (!detail.trucks_count) {
					return null;
				}

				if (detail.trucks_count === 1) {
					return t('dashboard:common_containerInfo_renderValue_6');
				}

				return `${detail.trucks_count} t('dashboard:common_containerInfo_renderValue_7')`;
			case 'container_type':
				return startCase(detail.container_type || '');
			case 'trade_type':
				return startCase(detail.trade_type || '');
			case 'commodity':
				return startCase(detail.commodity || '');
			case 'inco_term':
				return `${t('dashboard:common_containerInfo_renderValue_8')} - ${upperCase(detail.inco_term || '')}`;
			case 'packages':
				if (packages?.length === 0) {
					return null;
				}
				return packageDetails;
			case 'volume':
				return `${t('dashboard:common_containerInfo_renderValue_9')}. - ${detail.volume
					} ${t('dashboard:common_containerInfo_renderValue_10')}`;
			case 'weight':
				return `${t('dashboard:common_containerInfo_renderValue_11')}. - ${detail.weight
					} ${t('dashboard:common_containerInfo_renderValue_12')}`;
			case 'rates_count':
				return `${t('dashboard:common_containerInfo_renderValue_13')}: ${detail.rates_count
					}`;
			default:
				return null;
		}
	};

	return (
		<>
			{labels.map((label) => {
				const color = label === 'inco_term' ? '#FBE6E6' : '#f2f2f2';
				if (detail[label]) {
					return (
						<div
							className={styles.container_details_text}
							style={{ background: color }}
							key={label}
						>
							{renderValue(label)}
						</div>
					);
				}
				return null;
			})}
		</>
	);
}

export default ContainerInfo;
