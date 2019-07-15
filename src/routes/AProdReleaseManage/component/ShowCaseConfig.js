import React, { Component, Fragment } from 'react';
import { Checkbox, InputNumber } from 'doraemon';
import { SHOW_MODULE } from '../constant';

const CheckboxGroup = Checkbox.Group;

/**
 * 橱窗位展示配置
 */
export default class ShowCaseConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedModule: [],
      sortInfo: {},
    };
  }


  shouldComponentUpdate(nextProps, nextState) {
    const { checkedModule, sortInfo } = this.state;

    if (checkedModule === nextState.checkedModule && sortInfo === nextState.sortInfo) {
      return false;
    }

    return true;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value = [] } = nextProps;

      const { checkedModule, sortInfo } = this.filterCheckedModuleAndSortInfo(value);
      this.setState({
        checkedModule,
        sortInfo,
      });
    }
  }


  filterCheckedModuleAndSortInfo = (checked = []) => {
    const checkedModule = [];
    const sortInfo = {};

    checked.forEach(({ show, sort }) => {
      checkedModule.push(show);
      sortInfo[show] = sort;
    });

    return {
      checkedModule,
      sortInfo,
    };
  }

  combineCheckedModuleAndSort = (checkedModule, sortInfo) => {
    return checkedModule.map((module) => {
      return {
        sort: sortInfo[module],
        show: module,
      };
    });
  }
  trigger = (changedValue) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(changedValue);
    }
  }

  handleShowModuleChange=(checkedModule) => {
    const { sortInfo } = this.state;

    const newSortInfo = {};
    checkedModule.forEach((module) => {
      newSortInfo[module] = sortInfo[module];
    });


    this.setState({
      checkedModule,
      sortInfo: newSortInfo,
    });

    const checkedModuleAndSort = this.combineCheckedModuleAndSort(checkedModule, newSortInfo);
    this.trigger(checkedModuleAndSort);
  }

  onModuleInputChange=(value, module) => {
    const { sortInfo, checkedModule } = this.state;

    const newSortInfo = {
      ...sortInfo,
      ...{
        [module.value]: value,
      },
    };

    this.setState({
      sortInfo: newSortInfo,
    });

    const checkedModuleAndSort = this.combineCheckedModuleAndSort(checkedModule, newSortInfo);

    this.trigger(checkedModuleAndSort);
  }
  render() {
    const { sortInfo, checkedModule } = this.state;
    return (
      <Fragment>
        <CheckboxGroup onChange={this.handleShowModuleChange} value={checkedModule}>
          {
            SHOW_MODULE.map((module) => {
              const getExtra = () => {
                if (!module.widthInput) {
                  return null;
                }

                if (checkedModule.includes(module.value)) {
                  return (
                    <Fragment>
                      <span style={{ padding: '0 10px' }}>
                  排序
                      </span>
                      <InputNumber
                        placeholder="请输入"
                        value={sortInfo[module.value]}
                        min={1}
                        step={1}
                        precision={0}
                        onChange={(value) => {
                          this.onModuleInputChange(value, module);
                        }}
                        style={{ marginRight: '20px' }}
                      />
                    </Fragment>
                  );
                }

                return null;
              };
              return (
                <div style={{ display: 'inline-block' }} key={module.value}>
                  <Checkbox value={module.value}>{module.label}</Checkbox>
                  {getExtra()}
                </div>
              );
            })
          }
        </CheckboxGroup>
      </Fragment>
    );
  }
}

