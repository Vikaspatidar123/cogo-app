import { IcMSearchlight, IcMArrowNext } from '@cogoport/icons-react';

import SearchForm from './SearchForm';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Search({ data }) {
	const { push } = useRouter();
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Search</div>
			{/* <SearchForm data={data} /> */}
			<div className={styles.box}>
				<div className={styles.icon_box}>
					<div className={styles.search}>
						<IcMSearchlight />
					</div>
					<div className={styles.text}>
						<div>
							Discover Rates
						</div>
						<div>Don’t miss out on the competitive rates across FCL, LCL, Air and Haulage in one place.</div>
					</div>
				</div>
				<div
					className={styles.rates}
					role="presentation"
					onClick={() => push('/book')}
				>
					<span>Go to rates</span>
					<IcMArrowNext />
				</div>
			</div>
		</div>
	);
}
export default Search;
