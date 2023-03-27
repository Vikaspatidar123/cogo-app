import React from 'react';

import { useSelector } from '@cogo/store';
import { Btn, cogoToast, Tooltip } from '@cogo/deprecated_legacy/ui';
import copyToClipboard from '@cogo/utils/copyToClipboard';
import { IcMCopy } from '@cogoport/icons-react';

const CopyUrl = ({ detail }) => {
	const { search_id, importer_exporter_id, org_id, user_profile } = useSelector(
		({ general, profile }) => ({
			user_profile: profile,
			importer_exporter_id: general?.query?.importer_exporter_id,
			search_id: general?.query?.search_id,
		}),
	);

	const renderBody = () => (
		<p style={{ width: 124, margin: 0 }}>Copy results link</p>
	);

	const handleCopy = () => {
		copyToClipboard(
			`https://app.cogoport.com/app/${importer_exporter_id || org_id}/${
				detail?.importer_exporter_branch_id
			}/importer-exporter/book/${search_id}`,
		);
		cogoToast.success('Copied');
	};

	if (
		(user_profile?.partner?.entity_types || [])?.includes('channel_partner')
	) {
		return null;
	}

	return (
		<Tooltip placement="top" renderBody={renderBody}>
			<Btn
				className="small"
				style={{
					marginLeft: 8,
					background: 'black',
					border: 'none',
					padding: 0,
				}}
				onClick={handleCopy}
			>
				<IcMCopy
					style={{
						width: 20,
						height: 20,
						padding: 2,
					}}
					themeType="#0848f5"
				/>
			</Btn>
		</Tooltip>
	);
};

export default CopyUrl;
