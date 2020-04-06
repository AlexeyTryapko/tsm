import React from 'react';
import { Dialog } from 'evergreen-ui';
import { ResponsiveLine } from '@nivo/line';
import { withTranslation } from 'react-i18next';

const SpectralDensity = ({ closeModal, data = [], deleteNode, t }) => (
    <Dialog
        isShown={true}
        onCloseComplete={closeModal}
        cancelLabel={t('cancel')}
        title={t('SPECTRAL DENSITY')}
        intent="danger"
        onConfirm={deleteNode}
        confirmLabel={t('remove')}
        width={1000}
        minHeightContent={400}
    >
        <div className="chart">
            <ResponsiveLine
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    reverse: false,
                }}
                width={980}
                height={400}
                data={data}
                margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: t('amplitude'),
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                colors={{ scheme: 'nivo' }}
                pointSize={1}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 20,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 100,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    </Dialog>
);

export default withTranslation()(SpectralDensity);
