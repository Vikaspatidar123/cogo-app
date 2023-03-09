import { cl } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';

import { productFormControls } from '../../../../configuration/productControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useSelector } from '@/packages/store';

function FormItem({ editData = {} }) {
	const { id } = useSelector((state) => state.profile);

	const { control } = useForm();
	const checkEdit = Object.keys(editData).length > 0;

	const productFields = productFormControls({ id, checkEdit });
	return (
		<div className={styles.row}>
			{(productFields || []).map((field) => {
				// eslint-disable-next-line react/jsx-no-useless-fragment
				if (field?.type === 'hidden') return <></>;
				const Element = getField(field?.type);
				return (
					<div
						key={field?.name}
						className={cl`${styles.col} ${styles?.[field?.className]}`}
						style={{ width: field?.width }}
					>
						<p className={styles.label}>{field?.label}</p>
						<Element {...field} control={control} />
					</div>
				);
			})}
			<div className={styles.add_btn}>
				<IcMPlusInCircle width={20} height={20} fill="#356EFD" />
				<span>Add</span>
			</div>
		</div>
	);
}

export default FormItem;
