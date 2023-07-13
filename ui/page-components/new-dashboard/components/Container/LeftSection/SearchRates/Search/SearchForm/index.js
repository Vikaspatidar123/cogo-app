import { Tabs, TabPanel, cl, Button } from '@cogoport/components';
import {
    IcAInternational, IcAShipAmber, IcALocation, IcMArrowNext,
    IcMArrowBack, IcMArrowRotateDown,
    IcMSearchlight,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

import { AsyncSelectController, useForm, InputController } from '@/packages/forms';

function SearchForm() {
    const [active, setActive] = useState('sea');
    const { control, watch } = useForm();
    const originId = watch('air_port');

    return (
        <div>
            <div className={styles.tab_container}>
                <Tabs
                    name="tabs"
                    className={styles.tab}
                    themeType="tertiary"
                    active={active}
                    onChange={setActive}
                >
                    <TabPanel
                        icon={<IcAShipAmber width={15} height={15} />}
                        name="sea"
                        title="sea"
                    />

                    <TabPanel
                        icon={<IcAInternational width={15} height={15} />}
                        name="air"
                        title="air"
                    />
                </Tabs>
            </div>
            <form className={styles.form}>
                <div className={styles.search_container}>
                    <div className={styles.selectcontainer}>
                        <AsyncSelectController
                            control={control}
                            asyncKey="locations"
                            name="air_port"
                            placeholder="Origin Of Shipment"
                            prefix={isEmpty(originId)
                                ? <IcALocation width={24} height={24} />
                                : null}
                            className={styles.location_search}
                            rules={{ required: 'Please select origin' }}
                            isClearable
                            style={{ width: '270px' }}
                        />
                    </div>
                    <div
                        className={styles.arrows}
                    >
                        <IcMArrowNext />
                        <IcMArrowBack style={{ marginTop: '-6px' }} />
                    </div>
                    <div className={styles.selectcontainer}>
                        <AsyncSelectController
                            control={control}
                            asyncKey="locations"
                            name="sea_port"
                            prefix={isEmpty(originId)
                                ? <IcALocation width={24} height={24} />
                                : null}
                            className={styles.location_search}
                            rules={{ required: 'Please select origin' }}
                            isClearable
                            placeholder="Destination Of Shipment"
                            style={{ width: '270px' }}
                        />
                    </div>
                    <div className={cl`
								${styles.details_container}
								${cl.ns('popover_container')}
							`}
                    >

                        <InputController
                            name="input"
                            placeholder="Tracking Details"
                            className={cl`
									${styles.input_content}
								`}
                            readonly
                            suffix={<IcMArrowRotateDown style={{ marginRight: 8 }} />}
                            control={control}
                        />
                        <Button
                            size="lg"
                            className={cl`
								${styles.gtm_track_buttonicon}
								${cl.ns('gtm_track_search')}
							`}
                            type="submit"
                        >
                            <IcMSearchlight className={styles.gtm_track_search} />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default SearchForm;
