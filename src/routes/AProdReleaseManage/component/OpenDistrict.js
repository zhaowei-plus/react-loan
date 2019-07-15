import React, { Component, Fragment } from 'react';
import { Radio } from 'doraemon';
import { connect } from 'dva';
import DistrictTreeSelect from './DistrictTreeSelect';


const RadioGroup = Radio.Group;

/**
 * RadioGroup和 TreeSelect的组合
 */
@connect(({ prodReleaseConfig }) => ({
  distTree: prodReleaseConfig.distTree,
}))
export default class OpenDistrict extends Component {
  constructor(props) {
    super(props);

    const { value = {} } = props;

    this.state = {
      isAll: value.isAll,
      projectDistrict: value.projectDistrict || [],
    };
  }

  componentDidMount() {
    const { distTree } = this.props;
    /**
     * 如果已有区划数据缓存，不重新请求区划数据
     */
    if (distTree && distTree.length) {
      return;
    }

    this.props.dispatch({
      type: 'prodReleaseConfig/getDistTree',
      payload: {
        queryWithCode: true,
        includeSelf: false,
        includeAllNode: true,
        districtTypes: '',
        filterCorrespondingLevel: false,
        code: '000000',
      },
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isAll, projectDistrict } = this.state;
    const { distTree } = this.props;
    if (
      isAll === nextState.isAll &&
      projectDistrict === nextState.projectDistrict &&
      distTree === nextProps.distTree) {
      return false;
    }

    return true;
  }


  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value = {} } = nextProps;
      this.setState({
        ...value,
      });
    }
  }

  trigger = (changedValue) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue,
      });
    }
  }


  onRadioChange=(e) => {
    const { value } = e.target;

    this.setState({
      isAll: value,
      projectDistrict: undefined,
    });

    this.trigger({
      isAll: value,
      projectDistrict: undefined,
    });
  }

  onTreeCheck=(projectDistrict) => {
    this.setState({
      projectDistrict,
    });

    this.trigger({
      projectDistrict,
    });
  }


   showOpenDistrict = () => {
     const { isAll, projectDistrict } = this.state;
     const { distTree } = this.props;
     return (
       <div>
         {
           isAll ? '全部区划' : (
             <Fragment>
               指定区划&#12288;
               <DistrictTreeSelect
                 onChange={this.onTreeCheck}
                 treeData={distTree}
                 value={projectDistrict}
               />
             </Fragment>
           )
         }

       </div>
     );
   }


  renderExtra=(currentRadio) => {
    const { isAll, projectDistrict } = this.state;

    const { distTree } = this.props;

    if (!currentRadio.withSelect) {
      return null;
    }

    if (isAll === currentRadio.value) {
      return (
        <DistrictTreeSelect
          onChange={this.onTreeCheck}
          treeData={distTree}
          value={projectDistrict}
          allowClear
        />
      );
    }
    return null;
  }


  render() {
    const { radioConfig, showOnly } = this.props;
    const { isAll } = this.state;

    if (showOnly) {
      return this.showOpenDistrict();
    }
    return (
      <Fragment>
        <RadioGroup onChange={this.onRadioChange} value={isAll}>
          {
            radioConfig.map((radio) => {
              return (
                <Fragment key={radio.value}>
                  <Radio value={radio.value} withSelect={radio.withSelect}>{radio.label}</Radio>
                  {
                    this.renderExtra(radio)
                  }
                </Fragment>
              );
            })
          }
        </RadioGroup>

      </Fragment>
    );
  }
}

OpenDistrict.defaultProps = {
  radioConfig: [],
};
