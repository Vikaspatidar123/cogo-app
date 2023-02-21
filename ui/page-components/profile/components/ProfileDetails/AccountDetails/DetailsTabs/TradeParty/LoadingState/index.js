import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

const LoadingState = () => {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const arrayForPlaceholder = isMobile ? [1, 2] : [1, 2, 3, 4, 5];

	return Array(3)
		.fill('')
		.map((content) => (
			<div className={styles.container} key={content}>
				{arrayForPlaceholder.map(() => (
					<div className={styles.label_value_Placeholder}>
						<Placeholder margin="24px 0px 8px" height="12px" />
						<Placeholder margin="0px 0px 8px 0px" height="12px" />
					</div>
				))}

				<div className={styles.icon_container}>
					<Placeholder height="30px" width="30px" />
				</div>
			</div>
		));
};

export default LoadingState;
