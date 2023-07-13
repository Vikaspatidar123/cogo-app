import { Popover, TabPanel, Button, cl } from '@cogoport/components';
import {
    IcALocation, IcMArrowRotateDown, IcMMinusInCircle, IcMPlusInCircle, IcMSearchlight,
    IcMArrowNext,
    IcMArrowBack,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './styles.module.css';

import {
    AsyncSelectController,
    InputController, InputNumberController,
    SelectController, TabsController,
    IncoTermSelectController,
} from '@/packages/forms';
import { useSelector } from '@/packages/store';

function SeaForm({
    defaultProps = {},
    fetchSearch = () => { },
    loading,
}) {
    const {
        importer_exporter_branch_id,
        user_id,
    } = useSelector(({ general, profile }) => ({
        importer_exporter_branch_id: general?.query?.branch_id,
        user_id: profile?.id,
    }));
    const isObjectValuesDefined = (obj) => Object.values(obj).every((value) => typeof value !== 'undefined');

    const formProps = isObjectValuesDefined(defaultProps) ? defaultProps : {};
    const methods = useForm({
        defaultValues: {
            input_number: 1,
            select: '20',
            sea_tabs: 'fcl',
            cargo_weight_per_container: 18,
            incoterm: 'fob',
            ...formProps,
        },
    });

    const { handleSubmit, formState: { errors } } = methods;

    const count = methods.watch('input_number');
    const size = methods.watch('select');
    const tabValue = methods.watch('sea_tabs');
    const originId = methods.watch('select_origin');
    const destinationId = methods.watch('select_destination');
    const incoterm = methods.watch('incoterm');
    const cargo_weight_per_container = methods.watch('cargo_weight_per_container');

    useEffect(() => {
        const valueKeys = {
            fcl: 'FCL',
            lcl: 'LCL',
            20: '20FT',
            40: '40FT',
            '40HC': '40FT HC',
            '45HC': '45FT HC',
        };

        methods.setValue(
            'input',
            `${valueKeys[tabValue]}, ${count} Containers, ${valueKeys[size]}`,
        );
    }, [count, methods, size, tabValue]);

    const popoverOptions = [
        { label: '20FT', value: '20' },
        { label: '40FT', value: '40' },
        { label: '40FT HC', value: '40HC' },
        { label: '45FT HC', value: '45HC' },
    ];

    const renderComp = () => (
        <div className={styles.popover}>
            <TabsController
                name="sea_tabs"
                className={styles.tab}
            >
                <TabPanel name="fcl" title="FCL" />

            </TabsController>

            <div className={styles.content}>
                <div className={styles.count_container}>
                    <p>
                        Container Count
                    </p>
                    <div className={styles.count}>
                        <IcMMinusInCircle
                            className={styles.minus}
                            onClick={() => {
                                if (count > 1) {
                                    methods.setValue('input_number', count - 1);
                                }
                            }}
                        />
                        <InputNumberController
                            name="input_number"
                            arrow={false}
                            min={1}
                            size="lg"
                            className={styles.input_number}
                        />
                        <IcMPlusInCircle
                            className={styles.plus}
                            onClick={() => {
                                methods.setValue('input_number', count + 1);
                            }}
                        />

                    </div>
                </div>

                <div className={styles.count_container}>
                    <p>
                        Container Size
                    </p>
                    <SelectController
                        name="select"
                        className={styles.select}
                        options={popoverOptions}
                        placeholder="Select Container Size"
                    />
                </div>
                <div className={styles.count_container}>
                    <p>
                        Cargo Weight
                    </p>
                    <InputNumberController
                        name="cargo_weight_per_container"
                        className={styles.select}
                        min={1}
                        // size="lg"
                        placeholder="Enter Weight"
                    />
                </div>
                <div className={styles.incoterm}>
                    <IncoTermSelectController
                        name="incoterm"
                    />
                </div>
            </div>
        </div>
    );

    const getPayload = () => {
        const res = {
            importer_exporter_branch_id,
            search_type: 'fcl_freight',
            source: 'platform',
            user_id,
            fcl_freight_services_attributes: [
                {
                    bls_count: 1,
                    commodity: 'general',
                    origin_port_id: originId,
                    destination_port_id: destinationId,
                    containers_count: count,
                    status: 'active',
                    container_size: size,
                    container_type: 'standard',
                    inco_term: incoterm,
                    cargo_weight_per_container,
                },
            ],

            schedules_required: false,
        };
        return res;
    };

    const onSubmit = async (values, event) => {
        event.preventDefault();
        const payload = await getPayload();
        fetchSearch({ payload });
    };

    return (
        <div className={styles.container}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={cl`
						${styles.search_container}
						${errors.select_destination ? styles.search_container_error : ''}
					`}
                    >
                        <div
                            role="presentation"
                            className={styles.selectcontainer}
                        >

                            <AsyncSelectController
                                name="select_origin"
                                asyncKey="locations"
                                prefix={isEmpty(originId)
                                    ? <IcALocation width={24} height={24} />
                                    : null}
                                placeholder="Origin Of Shipment"
                                className={styles.location_search}
                                params={{ filters: { type: ['seaport', 'country'] } }}
                                isClearable
                                rules={{ required: 'Please select origin' }}
                                style={{ width: '270px' }}
                            />

                            {errors.select_origin && (
                                <p
                                    className={styles.error}
                                >
                                    {errors.select_origin.message}
                                </p>
                            )}
                        </div>
                        <div
                            className={styles.arrows}
                            role="presentation"
                        >
                            <IcMArrowNext />
                            <IcMArrowBack style={{ marginTop: '-6px' }} />
                        </div>
                        <div
                            role="presentation"
                            className={styles.selectcontainer}
                        >

                            <AsyncSelectController
                                name="select_destination"
                                asyncKey="locations"
                                prefix={isEmpty(destinationId)
                                    ? <IcALocation width={24} height={24} />
                                    : null}
                                placeholder="Destination Of Shipment"
                                className={styles.location_search}
                                params={{ filters: { type: ['seaport', 'country'] } }}
                                isClearable
                                rules={{
                                    required: 'Please select destination',
                                }}
                                style={{ width: '270px' }}
                            />

                            {errors.select_destination && (
                                <p
                                    className={styles.error}
                                >
                                    {errors.select_destination.message}
                                </p>
                            )}
                        </div>

                    </div>

                    <div className={styles.divider} />
                    <div
                        className={cl`
								${styles.details_container}
								${cl.ns('popover_container')}
							`}
                    >
                        <Popover
                            offset={[0, 2]}
                            placement="bottom-start"
                            caret={false}
                            render={renderComp()}
                        >
                            <InputController
                                name="input"
                                placeholder="Tracking Details"
                                className={cl`
									${styles.input_content}
								`}
                                readonly
                                suffix={<IcMArrowRotateDown style={{ marginRight: 8 }} />}
                            />
                        </Popover>
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
                </form>

            </FormProvider>
        </div>
    );
}

export default SeaForm;
