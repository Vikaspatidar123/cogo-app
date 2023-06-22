import styles from './styles.module.css';

const TITLE_MAPPING = {
	AIR   : 'Package Details: ',
	OCEAN : 'Container Details: ',
};

const TAG_MAPPING_TITlE = {
	packageHandling : { title: '', suffix: '' },
	quantity        : { title: '', suffix: '' },
	containerType   : { title: '', suffix: '' },
	packageType     : { title: '', suffix: '' },
	containerCount  : { title: 'Container Count', suffix: '' },
	containerSize   : { title: 'Container Size', suffix: '' },
	weight          : { title: '', suffix: 'Kgs' },
	volume          : { title: '', suffix: 'cbm' },
};

function TagContainer(props) {
	const {
		transportMode,
	} = props;
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{TITLE_MAPPING[transportMode]}</h2>

			<div className={styles.tag_row}>
				{Object.keys(TAG_MAPPING_TITlE).map((tag) => {
					const { title, suffix } = TAG_MAPPING_TITlE[tag];
					return (
						props?.[tag] && (
							<div className={styles.tags} key={tag}>
								{title}
								{' '}
								{props?.[tag]}
								{' '}
								{suffix}
							</div>
						)
					);
				})}

			</div>
		</div>
	);
}

export default TagContainer;
