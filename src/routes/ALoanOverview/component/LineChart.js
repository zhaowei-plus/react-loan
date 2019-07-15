import React from 'react';
import { twoDecimal } from 'commonUtils';

import { Chart, Axis, Tooltip, Geom } from 'bizcharts';


const INDEX_CH = ['一', '二', '三', '四', '五'];

export default class LineChart extends React.Component {
  render() {
    const {
      data = [],
      moneyNumber,
      forceFit = true,
      color = 'rgba(49,119,253,0.10)',
      borderColor = '#3177fd',
      scale = {},
      borderWidth = 2,
      line,
      animate = true,
      key,
    } = this.props;


    const padding = [36, 20, 30, 80];

    const scaleProps = {
      time: {
        ...scale.x,
        tickCount: data.length,
      },
      quantity: {
        min: 0,
        ...scale.y,
      },
    };

    const fixData = () => {
      if (moneyNumber) {
        return data.map((item) => {
          return {
            time: item.time,
            quantity: twoDecimal(item.quantity),
          };
        });
      }
      return data;
    };

    const fixedData = fixData();
    const tooltip = [
      'time*quantity',
      (x, y) => {
        return {
          name: x,
          value: y,
          title: `前第${INDEX_CH[x - 1]}周`,
        };
      },
    ];


    const formatterX = (val) => {
      return `第${INDEX_CH[val - 1]}周`;
    };

    return (
      <div>
        <Chart
          animate={animate}
          height={190}
          forceFit={forceFit}
          data={fixedData}
          scale={scaleProps}
          padding={padding}
          key={key}
        >
          <Axis
            name="time"
            tickLine={null}
            label={{
              offset: 15,
              formatter: formatterX,
              textStyle: {
                fontSize: 12,
                fill: '#5A5A5A',
                textAlign: 'center',
              },
            }}
            line={false}
            grid={null}
          />
          <Axis
            name="quantity"
            tickLine={null}
            label={{
              offset: 15,
              textStyle: {
                fontSize: 12,
              },
            }}
            line
            grid={{
              align: 'bottom', // 网格顶点从两个刻度中间开始
              type: 'line' || 'polygon', // 网格的类型
              lineStyle: {
                stroke: '#f5f7f8', // 网格线的颜色
                lineWidth: 2, // 网格线的宽度复制代码
              },
            }}
          />
          <Tooltip
            showTitle
            inPlot={false}
            g2-tooltip={{
              backgroundColor: '#000',
              opacity: 0.8,
              color: '#ddd',
            }}
            g2-tooltip-title={{
              display: 'none',
            }}
            itemTpl={`
            <div class="chart-tooltip"><div>
              <span class="dot">
              </span>{title}
            </div>
                <div style='font-size: 18px;font-weight: bold;margin-left: 10px'>{value}</div></div>`}
            g2-tooltip-marker={{
              stroke: 'red',
              color: 'red',
              backgroundColor: 'red',
              fill: 'white',
            }}
          />
          <Geom
            type="area"
            position="time*quantity"
            color={color}
            tooltip={tooltip}
            shape="smooth"
            style={{
              fillOpacity: 1,
            }}
          />
          {line ? (
            <Geom
              type="line"
              position="time*quantity"
              shape="smooth"
              color={borderColor}
              size={borderWidth}
              tooltip={false}
            />
          ) : (
            <span style={{ display: 'none' }} />
          )}
        </Chart>
      </div>
    );
  }
}
