import { Button, Popover } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ApplicableStageOptions from './ApplicableStageOptions';
import useHandleUpdateStage from './hooks/useHandleUpdateStage';
import styles from './styles.module.css';

import Spinner from '@/ui/commons/components/Spinner';
import getGeoConstants from '@/ui/commons/constants/geo';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const geo = getGeoConstants();

function ExchangeRate({ detail = {}, conversions = {}, rate = {}, refetch }) {
	const { handleUpdateStage, value, showPopover, setShowPopover, loading } = useHandleUpdateStage({
		detail,
		refetch,
	});

	const { primary_service = '', trade_type = '' } = detail || {};

	const { services = {} } = rate;

	const {
		base_currency = '',
		currencies = {},
		cogofx_currencies = {},
		cogofx_supporting_doc = '',
		source_supporting_doc = '',
	} = conversions;

	const main_service = Object.values(services).find(
		(item) => item.service_type === primary_service,
	);

	const { line_items = [] } = main_service || {};

	const currency =		(
		(line_items || []).find((item) => item.code === 'BAS')
			|| (line_items || []).find((item) => item.currency !== base_currency)
			|| line_items[0]
	)?.currency || GLOBAL_CONSTANTS.currency_code.USD;

	let currency_conversion = '';

	let supporting_document = '';

	if (currencies?.[currency]) {
		currency_conversion = currencies[currency];
		supporting_document = source_supporting_doc;
	} else {
		currency_conversion = cogofx_currencies?.[currency] || 'N/A';
		supporting_document = cogofx_supporting_doc;
	}

	if (currency === base_currency) {
		currency_conversion = currencies?.USD || cogofx_currencies?.USD || '';
	}

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div className={styles.content}>
					FX Rate: 1
					{' '}
					{currency !== base_currency
						? currency
						: GLOBAL_CONSTANTS.currency_code.USD}
					{' '}
					=
					{' '}
					{Number(currency_conversion).toFixed(4)}
					{' '}
					{currency !== base_currency
						? base_currency
						: geo.country.currency.code}
				</div>

				{value !== 'liners_exchange_rate' ? (
					<Button
						className="primary text sm"
						style={{ fontSize: '10px' }}
						onClick={() => window.open(supporting_document, '_blank')}
					>
						Supporting Document
					</Button>
				) : null}
			</div>

			<div style={{ display: 'flex', marginTop: '8px', alignItems: 'center' }}>
				<div className={styles.content}>FX will be locked at</div>

				<Popover
					visible={showPopover}
					theme="light-border"
					content={(
						<ApplicableStageOptions
							handleUpdateStage={handleUpdateStage}
							primary_service={primary_service}
							trade_type={trade_type}
							value={value}
						/>
					)}
					onClickOutside={() => setShowPopover(false)}
					interactive
				>
					<div
						style={{ display: 'flex', marginLeft: '4px' }}
						role="presentation"
						onClick={() => {
							if (value !== 'liners_exchange_rate') { setShowPopover(!showPopover); }
						}}
					>
						<div className={styles.styled_text}>{startCase(value)}</div>

						{value !== 'liners_exchange_rate' ? (
							<IcMArrowDown
								style={{ margin: '2px 0px 0px 4px', cursor: 'pointer' }}
							/>
						) : null}
					</div>
				</Popover>

				{loading && (
					<Spinner
						size={10}
						borderWidth={1}
						outerBorderColor="#ffffff"
						spinBorderColor="#393f70"
					/>
				)}
			</div>
		</div>
	);
}

export default ExchangeRate;
