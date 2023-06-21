import styles from './styles.module.css';

function AddCpDetails({
	service_provider,
	setUtilities = () => {},
	utilities,
}) {
	const handleClick = () => {
		setUtilities({
			...utilities,
			addCompanyModal : true,
			roleCheck       : 'collection_party',
			servProvId      : service_provider?.service_provider?.id,
		});
	};

	const businessName = service_provider?.service_provider?.business_name;

	return (
		<div
			role="presentation"
			className={styles.detail_container}
			onClick={handleClick}
		>
			{`Collection Party (${businessName})`}

			<span style={{ fontSize: '32px' }}>+</span>
		</div>
	);
}

export default AddCpDetails;
