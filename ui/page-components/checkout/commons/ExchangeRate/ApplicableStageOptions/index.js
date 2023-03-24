import styles from './styles.module.css';

import applicableStageOptions from '@/ui/commons/constants/APPLICABLE_STAGE_OPTIONS';

const MAPPING = {
	etd : ['fcl_freight_export'],
	eta : ['fcl_freight_import'],
};

const ApplicableStageOptions = ({
	handleUpdateStage = () => {},
	primary_service = '',
	trade_type = '',
	value = '',
}) => {
	let options = [];

	if (value === 'liners_exchange_rate') {
		options = [
			{
				label : 'Liner\'s Exchange Rate',
				value : 'liners_exchange_rate',
			},
		];
	} else options = applicableStageOptions;

	return options.map((item) => {
		const { value: selectedValue, label } = item;

		if (
			['eta', 'etd'].includes(selectedValue)
			&& !MAPPING?.[selectedValue].includes(`${primary_service}_${trade_type}`)
		) {
			return null;
		}

		return (
			<div
				style={{
					display       : 'flex',
					flexDirection : 'column',
					width         : '200px',
					borderRadius  : '4px',
				}}
				key={selectedValue}
			>
				<div
					className={syles.options_container}
					role="presentation"
					onClick={() => handleUpdateStage(selectedValue)}
				>
					<div className={styles.text}>
						{label}
					</div>
				</div>
			</div>
		);
	});
};

export default ApplicableStageOptions;
