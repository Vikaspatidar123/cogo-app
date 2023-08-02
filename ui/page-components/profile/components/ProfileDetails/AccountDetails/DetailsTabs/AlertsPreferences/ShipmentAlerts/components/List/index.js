import { Button } from '@cogoport/components';

import useUpdate from '../../hooks/useUpdate';

import ReportList from './ReportList';
import Schedule from './Schedule';
import styles from './styles.module.css';

function List({ props }) {
	const { isEdit = false } = props || {};

	const { onSubmit, setColumns, columns, control, handleSubmit } = useUpdate();
	const updateProps = { ...props, setColumns, columns, control };
	return (
		<div className={styles.container}>
			<ReportList props={updateProps} />
			<Schedule props={updateProps} />
			{isEdit ? (
				<div className={styles.button}>
					<Button themeType="tertiary" type="button">
						Cancel
					</Button>
					<Button themeType="secondary" type="button">
						Reset to Previous
					</Button>
					<Button themeType="primary" type="button" onClick={handleSubmit(onSubmit)}>
						Create Schedule
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default List;
