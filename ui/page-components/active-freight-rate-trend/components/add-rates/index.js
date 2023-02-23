import { Modal, Button } from '@cogoport/components';

import useFetchActiveTrend from '../../hooks/useActivetrendsDetails';
import useCreateFreightRate from '../../hooks/useCreateFreightRate';

import getFormattedValues from './common/utility';
import getRateControls from './controls/index';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import FormItem from '@/ui/commons/components/FormItem';

function RateTrend({
	handleModal, isOpen, heading, destinationPort, originPort, currency, activefilters, setActiveFilters,
}) {
	const { createTrendRate } = useCreateFreightRate();
	const { refetch, setActivePagination } = useFetchActiveTrend();
	const controls = getRateControls(currency, originPort, destinationPort);
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	const onSubmit = async (values) => {
		const formattedValues = getFormattedValues(values);
		const data = await createTrendRate(formattedValues);
		if (data == null) return;
		handleModal();
		setActiveFilters(formattedValues);
		refetch();
	};

	return (
		<Modal
			heading={heading}
			onClose={handleModal}
			isOpen={isOpen}
		>
			<form style={{ width: '100%', marginTop: 32 }}>
				<div>
					{
						controls.map((controlItem) => {
							const { type, name, label } = controlItem;
							const Element = getField(type);
							return (
								<div>
									<FormItem label={label}>
										<Element {...controlItem} control={control} />
										{errors[name]?.type
											? (
												<div className={styles.text}>
													{errors[name]?.message}
												</div>
											)
											: null}
									</FormItem>
								</div>
							);
						})
					}

				</div>
				<div
					className={styles.flex}
				>
					<Button
						size="lg"
						variant="ghost"
						style={{ marginRight: 8 }}
						onClick={handleModal}
					>
						CANCEL
					</Button>
					<Button
						size="lg"
						variant="secondary"
						normalCase
						// disabled={loading}
						onClick={handleSubmit(onSubmit)}
					>
						Save
					</Button>
				</div>
			</form>
		</Modal>

	);
}
export default RateTrend;
