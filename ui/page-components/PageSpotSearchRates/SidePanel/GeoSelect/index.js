// import { Button } from '@cogoport/components';
import { IcALocation, IcMArrowBack, IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import VerticalLine from '../VerticalLine';

import styles from './styles.module.css';

import { AsyncSelectController } from '@/packages/forms';

function GeoSelect({ showRoutes, tab, loading }) {
	const router = useRouter();
	const { locale } = router;
	const { origin, destination } = router.query;

	const methods = useForm({
		defaultValues: {
			origin_port_code      : '',
			destination_port_code : '',
		},
	});

	const { watch, setValue, handleSubmit, formState: { errors } } = methods;

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

	const handleOriginChange = (options) => {
		setValue('origin_port_code', options?.port_code || '');
	};

	const handleDestinationChange = (options) => {
		setValue('destination_port_code', options?.port_code || '');
	};

	const handleSwap = () => {
		setValue('origin_port_code', destinationPortCode || null);
		setValue('destination_port_code', originPortCode || null);
	};

	useEffect(() => {
		if (showRoutes) {
			setValue('origin_port_code', origin);
			setValue('destination_port_code', destination);
		}
	}, [origin, destination, setValue, showRoutes]);

	return (
		<div className={styles.location_select}>
			<VerticalLine count={2} />
			<div className={styles.select_port}>
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<AsyncSelectController
							name="origin_port_code"
							asyncKey="locations"
							prefix={isEmpty(originPortCode)
								? <IcALocation width={24} height={24} />
								: null}
							placeholder=""
							className={styles.location_search}
							isClearable
							valueKey="port_code"
							// animateLoading
							rules={{ required: 'Please select origin' }}
							handleChange={handleOriginChange}
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
								? <IcALocation width={24} height={24} />
								: null}
							placeholder=""
							className={styles.location_search}
							isClearable
							valueKey="port_code"
							// animateLoading
							rules={{ required: 'Please select destination' }}
							handleChange={handleDestinationChange}
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
						<button
							type="submit"
							className={styles.submit_btn}
							disabled={loading}
						>
							Search
						</button>
					</form>
				</FormProvider>
			</div>
			<div className={styles.arrow_container}>
				<div
					className={styles.arrows}
					role="presentation"
					onClick={handleSwap}
				>
					<IcMArrowNext />
					<IcMArrowBack style={{ marginTop: '-6px' }} />
				</div>
			</div>
		</div>
	);
}

export default GeoSelect;
