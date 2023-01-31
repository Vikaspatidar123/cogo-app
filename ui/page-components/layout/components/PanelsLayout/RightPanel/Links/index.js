import styles from './styles.module.css';

// import RedirectLink from '@/commons/components/RedirectLink';

function Links({ links = [] }) {
	return (
		<div className={styles.container}>
			{links.map((link) => {
				const {
					key = '',
					show = false,
					label = '',
					linkLabel = '',
					href = '',
					withPrefix = false,
				} = link;

				if (!show) {
					return null;
				}

				{ /* return (
					<RedirectLink
						key={key}
						label={label}
						href={href}
						withPrefix={withPrefix}
						linkLabel={linkLabel}
					/>
				); */ }
				return <>Hello</>;
			})}
		</div>
	);
}

export default Links;
