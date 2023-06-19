import { Button } from '@cogoport/components';

const actions = ({ status, setAddRate, item, addRate }) => {
	const isSameItem = item.id === addRate?.item?.id;
	const onClick = () => {
		if (addRate) {
			setAddRate(null);
		} else {
			setAddRate({ item, status });
		}
	};
	if (status.status === 'customer_confirmation_pending') {
		return (
			<Button
				className="secondary sm"
				style={{ marginLeft: 10 }}
				onClick={onClick}
			>
				{addRate && isSameItem ? 'CLOSE' : 'REVIEW'}
			</Button>
		);
	}

	return null;
};

export default actions;
