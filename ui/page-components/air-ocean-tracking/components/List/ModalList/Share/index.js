import { ButtonIcon, Button, cl } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import shareListConfig from '../../../../configuration/shareListConfig';
import shareTrackerControls from '../../../../configuration/shareTrackerControls';
import useShareTracker from '../../../../hooks/useShareTracker';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import Table from '@/ui/page-components/air-ocean-tracking/common/Table';

function Share({ shipmentId = '' }) {
	const { control, handleSubmit, formState:{ errors } } = useForm();

	const {
		createLoading = false,
		shareTrackerHandler, data = [], getListLoading = false,
	} = useShareTracker({ id: shipmentId });

	const onSubmit = (info) => {
		shareTrackerHandler({ info });
	};

	return (
		<div className={styles.container}>
			<div className={styles.main_body}>
				<div className={styles.form_container}>
					<div className={styles.row}>

						{shareTrackerControls.map((config) => {
							const { name, type, label } = config;
							const Element = getField(type);
							return (
								<div key={name} className={styles.col}>
									<p className={styles.label}>{label}</p>
									<Element control={control} {...config} />
									<p className={styles.error}>{errors?.[name]?.message || errors?.[name]?.type}</p>
								</div>
							);
						})}
						<div className={cl`${styles.col} ${styles.submit_btn}`}>
							<Button
								type="button"
								themeType="accent"
								onClick={handleSubmit(onSubmit)}
								loading={createLoading}
							>
								Share Tracker
							</Button>
						</div>
					</div>
				</div>

				{!isEmpty(data) &&	(
					<div className={styles.list_container}>
						<Table
							title="Shared List"
							configs={shareListConfig}
							data={{ list: data }}
							loading={getListLoading}
							isClickable={false}
							isScroll
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Share;
