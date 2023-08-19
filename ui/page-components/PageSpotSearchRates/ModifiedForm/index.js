import { Button } from '@cogoport/components';
import {
	IcAInternational, IcALocation, IcAShipAmber, IcMArrowBack, IcMArrowNext, IcMEdit,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './styles.module.css';

import { useMobileView } from '@/ui/hooks/useMobileView';

function ModifiedForm({
	data = [],
	toggleDisabled,
}) {
	const router = useRouter();
	const { unit, id: type } = router.query;
	const titleKeys = {
		20     : '20 FT',
		40     : '40 FT',
		'40HC' : '40 FT HC',
		'45HC' : '45 FT HC',
	};
	const { isMobile } = useMobileView();

	return (
		<div className={styles.container}>
			<div className={styles.icon_container}>
				{
					type === 'sea' ? (
						<IcAShipAmber width={30} height={30} />
					) : (
						<IcAInternational width={30} height={30} />
					)
				}
				<p>{type === 'sea' ? 'Sea' : 'Air'}</p>
			</div>
			<div className={styles.divider} />
			<div className={styles.search_container}>
				<div className={styles.port_container}>
					<div className={styles.origin}>
						<IcALocation width={28} height={28} />
						<div className={styles.detail}>
							<p className={styles.heading}>
								{ type === 'sea' ? data?.detail?.origin_port?.name : data?.detail?.origin_airport?.name}
							</p>
							<p className={styles.subheading}>
								{ type === 'sea'
									? data?.detail?.origin_port?.display_name
									: data?.detail?.origin_airport?.display_name}
							</p>
						</div>
					</div>
					{!isMobile ? (
						<div className={styles.arrows}>
							<IcMArrowNext />
							<IcMArrowBack style={{ marginTop: '-6px' }} />
						</div>
					) : null}
					<div className={styles.destination}>
						<IcALocation width={28} height={28} />
						<div className={styles.detail}>
							<p className={styles.heading}>
								{ type === 'sea'
									? data?.detail?.destination_port?.name
									: data?.detail?.destination_airport?.name}
							</p>
							<p className={styles.subheading}>
								{ type === 'sea'
									? data?.detail?.destination_port?.display_name
									: data?.detail?.destination_airport?.display_name}
							</p>
						</div>
					</div>
				</div>
				{isMobile ? (
					<div className={styles.mobile_arrows}>
						<IcMArrowNext />
						<IcMArrowBack style={{ marginTop: '-6px' }} />
					</div>
				) : null}
			</div>
			<div className={styles.divider} />
			<div className={styles.container_inner}>

				<div className={styles.standard_container}>
					<p className={styles.subheading}>
						{type === 'sea' ? 'COUNT' : 'UNITS'}
					</p>
					<p className={styles.heading}>
						{type === 'sea'
							? (
								<>
									{startCase(data?.detail.containers_count)}
									{' '}
									{data?.detail.containers_count > 1 ? 'Containers' : 'Container'}
								</>
							)
							: startCase(unit) || 'Cubic Metre'}
					</p>
				</div>
				<div className={styles.divider} />
				<div className={styles.value_container}>
					<p className={styles.subheading}>
						{type === 'sea' ? 'CONTAINER' : 'PACKAGE TYPE'}
					</p>
					<p className={styles.heading}>
						{type === 'sea'
							? titleKeys[data?.detail.container_size]
							: startCase(data?.detail.packages[0].packing_type)}
					</p>
				</div>

				<Button
					className={styles.button}
					onClick={() => toggleDisabled(false)}
				>
					<IcMEdit />
				</Button>
			</div>
		</div>
	);
}

export default ModifiedForm;
