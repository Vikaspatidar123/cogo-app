import styles from './styles.module.css';

import { poc_options } from '@/ui/page-components/shipments/utils/addPocOptions';

const pocDetailsConfig = [
	{
		label : 'Name',
		value : 'name',
	},
	{
		label : 'Contact No',
		value : 'mobile_number',
	},
	{
		label : 'Alternate Mobile No',
		value : 'alternate_mobile_number',
	},
	{
		label : 'Email',
		value : 'email',
	},
];

function PocInfo({ item = {} }) {
	const workScopes = [];
	poc_options.forEach((options) => {
		if (item.work_scopes?.includes(options.value)) {
			workScopes.push(options.label);
		}
	});

	return (
		<div className={styles.poc_info_container}>
			<div>
				{pocDetailsConfig?.map((mappedItems) => (item[mappedItems.value] ? (
					<div>
						<span className={styles.gray}>
							{mappedItems.label}
							{' '}
							:
							{' '}
						</span>
						{['mobile_number', 'alternate_mobile_number'].includes(
							mappedItems.value,
						)
							? ` ${
								item[mappedItems?.value]
									? `${item.mobile_country_code} ${
										item[mappedItems?.value]
									}`
									: ''
							}`
							: item[mappedItems.value]}
					</div>
				) : null))}
				{workScopes?.length ? (
					<div className={styles.detail_container}>
						<span className={styles.gray}>Workscope: </span>
						<div className={styles.detail}>{workScopes.join(', ')}</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default PocInfo;
