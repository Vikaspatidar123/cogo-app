import useListOrganisation from '../../../../hooks/useListOrganigations';

import EditDetails from './EditDetails';
import styles from './styles.module.css';

function Details({ props }) {
	const { isEdit } = props || {};
	const { data, isLoading, hookSetter } = useListOrganisation({ isEdit });
	if (isEdit) {
		return (
			<EditDetails
				data={data}
				hookSetter={hookSetter}
				isLoading={isLoading}
				props={props}
			/>
		);
	}

	return (
		<div className={styles.conatiner}>
			<div className={styles.line_item}>
				<div className={styles.title}>When:</div>
				<div className={styles.values}>Daily (frequency) at 08:30am (Time) IST (Time Zone)</div>
			</div>
			<div className={styles.line_item}>
				<div className={styles.title}>To:</div>
				<div className={styles.values}>
					<div>All Users linked with Profile`</div>
					{(data?.list || []).map((item) => (
						<div className={styles.item} key={item?.id}>
							{item.name}
							;
							<span className={styles.text}>
								{item.email}
								;
							</span>

							{item.mobile_number}
							;
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Details;
