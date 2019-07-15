import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';
import { fixFloatMoney } from 'src/utils/commonUtil';

const RateColumn = (props) => {
  const { data = [] } = props;

  const cols = {
    sales: {
      tickInterval: 20,
    },
  };

  return (
    <div>
      <Chart
        height={280}
        data={data}
        scale={cols}
        forceFit
      >
        <Axis name="product" />
        <Axis
          name="interest"
          label={{
            formatter(text) {
              if (text > 1000000) {
                return `${text / 10000}万元`;
              }
              return text;
            },
          }}
        />
        <Tooltip />
        <Geom
          type="interval"
          color="#3177fd"
          size={20}
          tooltip={['interest*product', (interest) => {
            return {
              name: `息费:${fixFloatMoney(interest, 2)}`,
            };
          }]}
          style={{
            borderRadius: '10px 10px 0 0 ',
          }}
          position="product*interest"
        />
      </Chart>
    </div>
  );
};
export default RateColumn;
