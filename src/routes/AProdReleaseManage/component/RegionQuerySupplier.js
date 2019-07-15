import React, { Component, Fragment } from 'react';
import { Row, Col, Checkbox, Input, Spin, message, Icon } from 'doraemon';
import { connect } from 'dva';
import RegionTree from './RegionTree';

const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;


/**
 * 根据地区查询供应商
 */
@connect(({ loading }) => ({
  loading: loading.effects['prodReleaseManage/getSupplier'] || loading.effects['prodReleaseManage/getRegion'],
}))
export default class RegionQuerySupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierList: [],
      selectedSupplier: {},
      selectedTreeNodeProps: {},
      showSearchResult: false,
    };
  }

  /**
   * 选中全部下级供应商的市级地区
   * @type {Array}
   */
  allChildRegionCheckedCodes=[];
  trigger = (changedValue) => {
    const { onChange } = this.props;

    const { supplierList, selectedTreeNodeProps, ...resetState } = this.state;
    if (onChange) {
      onChange({
        ...resetState,
        ...changedValue,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value = {} } = nextProps;
      this.setState({
        ...value,
      });
    }
  }

  /**
   * 搜索对应地区下的供应商
   * @param supplierName
   */
  fetchSupplier = (supplierName) => {
    const { selectedTreeCode } = this;
    if (!selectedTreeCode) {
      message.warn('请选择所属区划');
      return;
    }
    this.props.dispatch({
      type: 'prodReleaseManage/getSupplier',
      payload: {
        supplierName,
        addressCode: selectedTreeCode,
      },
    })
      .then((res) => {
        if (res.success && res.result) {
          this.setState({
            supplierList: this.supplierListHandler(res.result),
            showSearchResult: true,
          });
        }
      });
  };


  /**
   * 使供应商列表数据符合checkbox Group 格式
   * @param list
   * @returns {{label: *, value: *}[]}
   */
  supplierListHandler = (list = []) => {
    return list.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  };

  /**
   * 树节点选中
   * @param code
   * @param event
   */
  onTreeNodeSelect = ([code], event) => {
    this.selectedTreeCode = code;
    const { selected } = event;


    if (selected) {
      const { selectedSupplier } = this.state;
      /**
       * 节点选中时 如果已有对应选择的供应商，显示已经选择的供应商
       * @type {Array}
       */
      const selectedSupplierList = selectedSupplier[code] ? selectedSupplier[code].code : [];
      const nodeProps = event.node.props;

      this.setState({
        supplierList: this.supplierListHandler(selectedSupplierList),
        selectedTreeNodeProps: nodeProps,
        showSearchResult: false,
      });
    } else {
      /**
       * 清空供应商列表和展示区划信息
       */
      this.setState({
        selectedTreeNodeProps: {},
        supplierList: [],
        showSearchResult: false,
      });
    }
  };

  /**
   * 供应商搜索结果列表选择
   * @param value
   */
  onCheckboxChange = (value) => {
    const checked = this.state.supplierList.filter(item => value.includes(item.value));


    /**
     * 记录当前区划选择的供应商
     */
    const normChecked = checked ? checked.map(item => ({
      id: item.value,
      name: item.label,
    })) : [];

    /**
     * 如果已选择确定的供应商，取消全选状态
     * @type {{}}
     */
    const selectedSupplier = {
      ...this.state.selectedSupplier,
      [this.selectedTreeCode]: {
        isAll: false,
        code: normChecked,
      },
    };

    const { selectedTreeNodeProps } = this.state;

    const { parentKey, level } = selectedTreeNodeProps;

    /**
     * 如果当前为3级地区节点，取消当前节点的全选状态，也要取消父节点2级节点的 下级区划供应商全选状态
     */
    if (level === 3) {
      this.updateAllChildRegionCheckedCodes(parentKey, false);
    }


    this.triggerSupplierChange(selectedSupplier);
  };

  searchSupplier = (value) => {
    this.fetchSupplier(value);
  };

  /**
   * 全部Checkbox
   * 选择当前区划所有供应商
   * 只保存全部标识，不拉取所有供应商数据
   * @param e
   */
  onAllSupplierCheckboxChange = (e) => {
    const { checked } = e.target;

    const selectedSupplier = {
      ...this.state.selectedSupplier,
      [this.selectedTreeCode]: {
        isAll: checked,
        code: [],
      },
    };


    const { selectedTreeNodeProps } = this.state;

    const { parentKey, level } = selectedTreeNodeProps;

    /**
     * 如果当前为3级地区节点，取消当前节点的全选状态，也要取消父节点2级节点的 下级区划供应商全选状态
     */
    if (level === 3) {
      this.updateAllChildRegionCheckedCodes(parentKey, false);
    }

    this.triggerSupplierChange(selectedSupplier);
  };

  /**
   * 下级全部供应商Checkbox
   * 因为供应商注册地址，数据上无联动关系
   * 为了便利配置橱窗位展示的地区
   * 市级节点增加一个 Checkbox，选中时自动添加所有子级区划选中
   * 选择当前地址下级所有地址对应的供应商
   * @param e
   */
  onAllChildrenSupplierCheckboxChange = (e) => {
    const { checked } = e.target;
    const { selectedTreeNodeProps } = this.state;

    const { children = [], eventKey } = selectedTreeNodeProps;

    const childRegionSupplier = {};

    children.forEach((child) => {
      childRegionSupplier[child.key] = {
        isAll: checked,
        code: [],
      };
    });

    const selectedSupplier = {
      ...this.state.selectedSupplier,
      ...childRegionSupplier,
    };

    this.updateAllChildRegionCheckedCodes(eventKey, checked);

    this.triggerSupplierChange(selectedSupplier);
  }

  /**
   * 记录 下级供应商全选的区划
   * @param key
   * @param isAdd
   */
  updateAllChildRegionCheckedCodes = (key, isAdd) => {
    const fixedKey = typeof key === 'string' ? key : `${key}`;
    if (isAdd) {
      this.allChildRegionCheckedCodes.push(key);
    } else if (this.allChildRegionCheckedCodes.includes(fixedKey)) {
      this.allChildRegionCheckedCodes =
          this.allChildRegionCheckedCodes.filter(code => code !== fixedKey);
    }
  }

  /**
   * 触发form更新
   * @param selectedSupplier
   */
  triggerSupplierChange=(selectedSupplier, other = {}) => {
    this.setState({
      selectedSupplier,
      ...other,
    });
    this.trigger({
      selectedSupplier,
    });
  }

  renderSupplierList = (checkboxValue = []) => {
    const { view } = this.props;
    const { supplierList } = this.state;
    if (view) {
      return (
        <div>
          {
            supplierList.map((item) => {
              return (
                <span className="tag-item" key={item.value} style={{ display: 'inline-block' }}>
                  {item.label}
                </span>
              );
            })
          }
        </div>
      );
    } else {
      return (
        <CheckboxGroup
          options={supplierList}
          value={checkboxValue}
          onChange={this.onCheckboxChange}
        />
      );
    }
  }

  getAllCheckbox = (currentSelectedSupplier = {}) => {
    const { isAll } = currentSelectedSupplier;
    const { view } = this.props;
    const { selectedTreeNodeProps } = this.state;


    const { level, expanded, eventKey } = selectedTreeNodeProps;
    if (view) {
      return null;
    }

    /**
     * level 市级地址
     * 因为接口限制 判断level === 2为市级区划
     * 当前选择节点为市级区划，且节点展开，展示 下级全部供应商配置CheckBox
     * @type {null}
     */
    const childrenAllChecked = (level === 2 && expanded) ? (
      <Checkbox
        onChange={this.onAllChildrenSupplierCheckboxChange}
        checked={this.allChildRegionCheckedCodes.includes(eventKey)}
        style={{ paddingLeft: '10px' }}
      > 下级全部供应商
      </Checkbox>
    ) : null;

    return (
      <Fragment>
        <Checkbox
          onChange={this.onAllSupplierCheckboxChange}
          checked={isAll || false}
        > 全部
        </Checkbox>
        {
          childrenAllChecked
        }

      </Fragment>
    );
  }


  /**
   * 树节点异步加载完成
   * @param nodeProps
   */
  onTreeLoadDone=(nodeProps) => {
    /**
     * 非2级地区节点不做处理
     */
    if (nodeProps.level !== 2) {
      return;
    }

    const { selectedTreeNodeProps } = this.state;
    const { eventKey } = selectedTreeNodeProps;

    /**
     * 当选择的地区节点展开时，触发一次更新，展示全部下级供应商CheckBox
     */
    if (eventKey === nodeProps.eventKey) {
      this.setState({
        selectedTreeNodeProps: {
          ...nodeProps,
          expanded: true,
        },
      });
    }
  }

  getSupplierList = (currentSelectedSupplier) => {
    const {
      supplierList,
      showSearchResult,
    } = this.state;

    const { view } = this.props;

    const { code, isAll } = currentSelectedSupplier;


    /**
     * 详情页展示
     */
    if (isAll && view) {
      return (
        <div className="all-supplier">
          <h3>
          全部供应商
          </h3>
        </div>
      );
    }


    const getNoneDATA = () => {
      let text = '';

      /**
       * 未选择区划无数据展示
       */
      if (!this.selectedTreeCode) {
        text = '请选择区划';
        /**
         * 选择区划，未进行搜索，无数据展示
         */
      } else if (!showSearchResult) {
        return null;
      } else {
        /**
         * 选择区划，搜索无数据
         * @type {string}
         */
        text = '无数据';
      }


      return (
        <div className="none-supplier-list none-data-content">
          <Icon zcy type="wushuju" />
          <h3>
            {text}
          </h3>
        </div>
      );
    };
    const noneDATA = getNoneDATA();

    const checkboxValue = code ? code.map(item => item.id) : [];

    return supplierList.length ? (
      this.renderSupplierList(checkboxValue)
    ) : noneDATA;
  }
  render() {
    const {
      selectedSupplier,
      selectedTreeNodeProps,
    } = this.state;
    const { loading, view } = this.props;

    /**
     * 当前选择的区划信息
     */
    const selectedTreeName = selectedTreeNodeProps.title;
    const selectedTreeCode = selectedTreeNodeProps.eventKey;


    /**
     * 当前区划选择的供应商信息
     * @type {*|{}}
     */
    const currentSelectedSupplier = selectedSupplier[selectedTreeCode] || {};

    return (
      <Spin spinning={loading}>
        <Row>

          <div className="ant-form-item-label">供应商开放区划：</div>
          <div className="region-and-supplier">
            <Col span={6}>
              <div className="region-container">
                <div className="region-wrapper">
                  <RegionTree
                    onSelect={this.onTreeNodeSelect}
                    dispatch={this.props.dispatch}
                    onTreeLoadDone={this.onTreeLoadDone}
                  />
                </div>
              </div>
            </Col>
            <Col span={18}>
              <div className="supplier-container">
                <span style={{ paddingRight: '20px' }}>
                  {selectedTreeName ? `${selectedTreeName}供应商` : ''}
                </span>
                {selectedTreeName && this.getAllCheckbox(currentSelectedSupplier)}
                {
                  !view && (
                    <div
                      style={{ float: 'right', width: '200px' }}
                    >
                      <Search
                        placeholder="请输入"
                        style={{ width: '100%' }}
                        onSearch={this.searchSupplier}
                      />
                    </div>
                  )
                }

                <div className="supplier-wrapper">
                  {
                    this.getSupplierList(currentSelectedSupplier)
                  }
                </div>

              </div>
            </Col>
          </div>
        </Row>
      </Spin>
    );
  }
}

