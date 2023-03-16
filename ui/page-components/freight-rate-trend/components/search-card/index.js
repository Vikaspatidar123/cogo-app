import { Button } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';

import useCreateTrends from '../../hooks/useCreateTrends';

import styles from './styles.module.css';

import { useForm, useGetAsyncOptions, asyncFieldsLocations } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRouter } from '@/packages/next';
import FormItem from '@/ui/commons/components/FormItem';

function SearchCard({ refechTrends }) {
	const { push } = useRouter();
	const { submitLoading, createTrend } = useCreateTrends();
	const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['seaport'], is_icd: false } },
	}));

	const controls = [
		{
			name        : 'origin',
			label       : 'origin',
			type        : 'select',
			placeholder : 'Search origin port',
			value       : '',
			rules       : { required: 'Please enter value' },
		},
		{ type: 'anchor' },
		{
			name        : 'destination',
			label       : 'destination',
			type        : 'select',
			placeholder : 'Search destination port',
			value       : '',
			rules       : { required: 'Please enter value' },
		},
	];
	const filed = controls.map((control) => {
		const { name } = control;
		let newControl = { ...control };

		if (name === 'origin') {
			newControl = { ...newControl, ...cityOptions };
		}
		if (name === 'destination') {
			newControl = { ...newControl, ...cityOptions };
		}
		return { ...newControl };
	});

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	const submitForm = async (values) => {
		const { origin, destination } = values;
		const data = await createTrend(origin, destination);
		if (data == null) return;
		await refechTrends();
		push(
			'/saas/freight-rate-trend/[trend_id]?isFirstVisit=true',
			`/saas/freight-rate-trend/${data.id}?isFirstVisit=true`,
		);
	};

	return (
		<div className={styles.card}>
			<div className={styles.flex}>
				<div className={styles.heading}>
					Get Access to Past Freight Rate Trends.
				</div>
			</div>
			<form
				className={styles.form}
			>
				{filed.map((controlItem) => {
					const { type, name } = controlItem;
					if (type === 'anchor') {
						return <div className={styles.anchor}><IcMPortArrow height={30} width={30} /></div>;
					}
					const Element = getField(type);
					return (
						<div className={styles.styled_form_item}>
							<FormItem>
								<Element {...controlItem} control={control} />
								{errors[name]?.type === 'required' || 'pattern' ? (
									<div className={styles.text}>
										{errors[name]?.message}
									</div>
								) : null}
							</FormItem>
						</div>
					);
				})}

				<div className={styles.styled_form_item}>
					<Button
						size="lg"
						onClick={handleSubmit(submitForm)}
						disabled={submitLoading}
					>
						Search Rate Trends
					</Button>
				</div>
			</form>
		</div>
	);
}

export default SearchCard;
