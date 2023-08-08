import useGetAddresses from '../../hooks/useGetAddresses';

import styles from './styles.module.css';

const AddressOptions = () => {
	const { addressList = [] } = useGetAddresses();
	const options = (addressList || []).map((itm) => {
		const { name = '', id = '' } = itm || {};
		return {
			label: (
				<div className={styles.card} key={id}>
					<div>{name}</div>
				</div>
			),
			name,
			value: itm,
		};
	});

	return { options };
};

export default AddressOptions;
