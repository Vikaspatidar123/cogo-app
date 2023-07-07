import { isEmpty } from '@cogoport/utils';

import EmptyState from '../EmptyState';

import ControlsResult from '@/ui/commons/components/ImportExportControls';

function IEControlsModal({ tradeEngineResponse = {} }) {
	const { lineItem = [] } = tradeEngineResponse || {};
	const { controls = [] } = lineItem[0] || {};

	return (
		<div>
			{!isEmpty(controls) ? (
				<ControlsResult
					controls={controls}
					EmptyState={EmptyState}
					listClassName="list"
				/>
			) : (
				<EmptyState />
			)}
		</div>
	);
}
export default IEControlsModal;
