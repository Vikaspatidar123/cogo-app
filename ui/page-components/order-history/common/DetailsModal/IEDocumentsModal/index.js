import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../EmptyState';

import styles from './styles.module.css';

import DocumentResult from '@/ui/commons/components/ImportExportDoc';

function IEDocumentsModal({ tradeEngineResponse = {} }) {
	const { lineItem = [] } = tradeEngineResponse;
	const { documents = [] } = lineItem?.[0] || {};

	return (
		<div className={styles.container}>
			{!isEmpty(documents) ? (
				<div>
					<DocumentResult
						tradeEngineResponse={tradeEngineResponse}
						EmptyState={EmptyState}
						isModal
					/>
				</div>
			) : (
				<EmptyState />
			)}
		</div>
	);
}

export default IEDocumentsModal;
