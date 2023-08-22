import { Button } from '@cogoport/components';
import { IcMAppSearch, IcMPort } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.css';

import { AsyncSelectController } from '@/packages/forms';

function GeoSelect({ tab }) {
	const router = useRouter();
	const { locale } = router;

	const methods = useForm({
		defaultValues: {
			origin_port_code      : '',
			destination_port_code : '',
		},
	});

	const { watch, handleSubmit, formState: { errors } } = methods;

	const originPortCode = watch('origin_port_code');
	const destinationPortCode = watch('destination_port_code');

	const MAPING = {
		sea : 'seaport',
		air : 'airport',
	};
	const params = { filters: { type: [MAPING[tab]] } };

	const onSubmit = async () => {
		router.push({
			pathname : '/discovery-rates/[id]/[origin]/[destination]',
			query    : {
				id          : tab,
				origin      : originPortCode,
				destination : destinationPortCode,
			},
			locale,
		});
	};

	return (
		<div className={styles.location_select}>
			<div className={styles.select_port}>
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<AsyncSelectController
							name="origin_port_code"
							asyncKey="locations"
							prefix={isEmpty(originPortCode)
								? <IcMPort width={24} height={24} />
								: null}
							placeholder="Origin Of Shipment"
							className={styles.location_search}
							isClearable
							valueKey="port_code"
							rules={{ required: 'Please select origin' }}
							status="all"
							params={params}
						/>
						{errors.origin_port_code && (
							<p
								className={styles.error}
							>
								{errors.origin_port_code.message}
							</p>
						)}
						<AsyncSelectController
							name="destination_port_code"
							asyncKey="locations"
							prefix={isEmpty(destinationPortCode)
								? <IcMPort width={24} height={24} />
								: null}
							placeholder="Destination Of Shipment"
							className={styles.location_search}
							isClearable
							valueKey="port_code"
							rules={{ required: 'Please select destination' }}
							status="all"
							params={params}
						/>
						{errors.destination_port_code && (
							<p
								className={styles.error}
							>
								{errors.destination_port_code.message}
							</p>
						)}
						<Button
							themeType="secondary"
							type="submit"
						>
							<IcMAppSearch width={15} height={15} />
							{' '}
							Search Rates
						</Button>
					</form>
				</FormProvider>
			</div>

		</div>
	);
}

export default GeoSelect;
