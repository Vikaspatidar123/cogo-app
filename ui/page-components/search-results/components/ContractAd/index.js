import React from 'react';
import { Skeleton } from '@cogoport/front/components/admin';
import { useRouter } from '@cogo/next';
import { useScope } from '@cogo/commons/hooks';
import {
	Advertise,
	Container,
	ContractTag,
	Label,
	ContractBtn,
	Content,
} from './styles';

const ContractAd = ({ contractDetail, loading, importerExporterId }) => {
	const { push } = useRouter();
	const { scope } = useScope();
	const { count = 0 } = contractDetail || {};

	const redirectToContract = () => {
		if (scope === 'app') {
			push(
				`/contract-management?activeTab=active`,
				`/contract-management?activeTab=active`,
			);
		} else {
			push(
				`/contract-rates/dashboard/[active_tab]?importerExporterId=${importerExporterId}`,
				`/contract-rates/dashboard/active?importerExporterId=${importerExporterId}`,
			);
		}
	};

	return (
		<>
			{count <= 0 && scope === 'app' && (
				<Container className="advertise">
					{!loading ? <Advertise /> : <Skeleton height="100px" width="100%" />}
				</Container>
			)}

			{count > 0 && (
				<Container>
					{!loading ? (
						<>
							<ContractTag />
							<Content>
								<Label>
									{scope === 'app'
										? 'You already have'
										: 'This organization has already'}{' '}
									{count} active contracts in this port pair.
								</Label>
								<ContractBtn onClick={redirectToContract}>
									View Contracts
								</ContractBtn>
							</Content>
						</>
					) : (
						<Skeleton height="100px" width="100%" />
					)}
				</Container>
			)}
		</>
	);
};

export default ContractAd;
