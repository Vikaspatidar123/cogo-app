import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import Quotation from '../RateCard/Quotation';
import QuotationDetails from '../RateCard/QuotationDetails';

import styles from './styles.module.css';

function CargoInsuranceRateCard(props) {
	const [open, setOpen] = useState(false);
	const [viewSchedules, setViewSchedules] = useState(false);

	const {
		data = {},
		setState = () => {},
		state,
		details = {},
		refetch = () => {},
		enquiry_page = false,
		results_type = '',
		searchData = {},
		id,
	} = props;

	const {
		origin_country = '',
		destination_country = '',
		risk_coverage = '',
	} = details || {};

	return (
		<div className={styles.container} id={id}>
			<div className={styles.cogo_assured}>{startCase(risk_coverage)}</div>

			<div className={styles.card}>
				<div style={{display : 'flex', justifyContent : 'center', alignItems : 'center', flex : '1'}}>
					<div className={styles.route_container}>
						<div style={{ width: '100%', display: 'flex' }}>
							<div style={{ width: '100%', display: 'flex' }}>
								<div
									className={`${styles.circle} ${!isEmpty(origin_country) ? 'inactive' : null}`}
								/>

								<div
									className={`${styles.Line} ${!isEmpty(origin_country) ? 'inactive' : null}`}
									style={{ width: '100%' }}
								/>
							</div>
						</div>

						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<div style={{ display: 'flex' }}>
								<div
									className={`${styles.Line} ${!isEmpty(origin_country) ? 'inactive' : null}`}
									style={{ width: '30px' }}
								/>

								<div className={`${styles.circle} ${styles.main}`} />

								<div
									className={`${styles.Line} ${!isEmpty(origin_country) ? 'main' : null}`}
									style={{ width: '30px' }}
								/>
							</div>

							<div className={`${styles.location} ${styles.main}`}>
								{origin_country?.display_name || origin_country?.name || '-'}
							</div>
						</div>

						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<div style={{ display: 'flex' }}>
								<Line
									className={!isEmpty(origin_country) ? 'main' : null}
									style={{ width: '30px' }}
								/>
								<div className={`${styles.circle} ${styles.main}`} />

								<Line
									className={!isEmpty(origin_country) ? 'inactive' : null}
									style={{ width: '30px' }}
								/>
							</div>

							<div className={`${styles.location} ${styles.main}`}>
								{destination_country?.display_name
									|| destination_country?.name
									|| '-'}
							</div>
						</div>

						<div style={{ width: '100%', display: 'flex' }}>
								<div
									className={`${styles.line} ${!isEmpty(origin_country) ? 'inactive' : null}`}
									style={{ width: '100%' }}
								/>
								<div
									className={`${styles.circle} ${!isEmpty(origin_country) ? 'inactive' : null}`}
								/>
						</div>
					</div>
				</div>

				<div className={styles.line_vrt} />

				<Quotation
					data={data}
					state={state}
					setState={setState}
					setOpen={setOpen}
					open={open}
					refetch={refetch}
					enquiry_page={enquiry_page}
					details={details}
					results_type={results_type}
					spot_search_id={details?.id}
					id={id}
					viewSchedules={viewSchedules}
					setViewSchedules={setViewSchedules}
					isConfirmed={false}
				/>
			</div>

			{open && (
				<div className={styles.animated_container} type={open ? 'enter' : 'exit'}>
					<QuotationDetails
						searchData={searchData}
						details={details}
						data={data}
						id={id}
						isConfirmed={false}
					/>
				</div>
			)}
		</div>
	);
}

export default CargoInsuranceRateCard;
