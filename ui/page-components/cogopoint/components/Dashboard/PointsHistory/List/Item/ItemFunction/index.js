const itemFuntion = (key, value = '') => {
	const colors = value === 'credit' ? 'rgb(103, 198, 118)' : 'rgb(203, 100, 100)';
	const MAPPING = {
		event_type       : value?.replace('_', ' '),
		points           : <div style={{ color: 'rgb(224, 186, 74)' }}>{value}</div>,
		point_status     : <div>{value?.toUpperCase()}</div>,
		transaction_type : (
			<div
				style={{ colors }}
			>
				{value}
			</div>
		),
		created_at: value,
	};

	return MAPPING[key];
};
export default itemFuntion;
