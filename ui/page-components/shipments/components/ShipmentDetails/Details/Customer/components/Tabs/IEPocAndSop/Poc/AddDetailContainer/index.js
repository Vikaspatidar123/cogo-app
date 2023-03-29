import styles from './styles.module.css';

function AddDetailContainer({
	stakeholder,
	setUtilities = () => {},
	utilities,
}) {
	const collection_party_check = !(stakeholder?.value === 'collection_party');

	const handleClick = () => {
		setUtilities({
			...utilities,
			roleCheck       : stakeholder?.value,
			addCompanyModal : true,
		});
	};

	return (
		<div>
			{collection_party_check ? (
				<div
					role="presentation"
					className={styles.detail_container}
					onClick={handleClick}
				>
					{stakeholder?.label}
					<span style={{ fontSize: '32px' }}>+</span>
				</div>
			) : null}
		</div>
	);
}

export default AddDetailContainer;
