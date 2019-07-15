import React, { Component } from 'react';
import { Tree } from 'doraemon';

const TreeNode = Tree.TreeNode;


/**
 * 地区树
 */
export default class RegionTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
    };
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.treeData === nextState.treeData) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.fetchRegion('0').then((res) => {
      this.setState({
        treeData: this.treeDataHandle(res),
      });
    });
  }


  fetchRegion=(code) => {
    return this.props.dispatch({
      type: 'prodReleaseManage/getRegion',
      payload: code || '0',
    });
  }


  treeDataHandle=(data = []) => {
    /**
     * 供应商注册地最多到三级地区
     * 地区树只展示到三级地区
     */
    return data.map((item) => {
      return {
        title: item.name,
        originTitle: item.name,
        key: item.id,
        level: item.level,
        isLeaf: item.level === 3,
      };
    });
  }

  onLoadData=(treeNode = {}) => {
    const { onTreeLoadDone } = this.props;
    const { eventKey } = treeNode.props;
    return new Promise((resolve) => {
      this.fetchRegion(eventKey).then((res) => {
        treeNode.props.dataRef.children = this.treeDataHandle(res);
        this.setState({
          treeData: [...this.state.treeData],
        });

        onTreeLoadDone(treeNode.props);

        resolve();
      });
    });
  }

  renderTreeNodes=(data, parentKey) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode {...item} dataRef={item} parentKey={parentKey}>
            {this.renderTreeNodes(item.children, item.key)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} parentKey={parentKey} />;
    });
  }

  render() {
    const { onSelect } = this.props;
    return (
      <Tree
        loadData={this.onLoadData}
        onSelect={onSelect}
      >
        {this.renderTreeNodes(this.state.treeData)}
      </Tree>
    );
  }
}

