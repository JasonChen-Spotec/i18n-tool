import React from 'react';
import { Badge, Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import useUrlState from '@ahooksjs/use-url-state';

const { TabPane } = Tabs;

const KeepTab = ({ className, children, defaultActiveKey, activeKey, onChange, ...restProps }) => {
  const defaultUrlParams = useParams();
  const [urlParams, setUrlParams] = useUrlState({
    [activeKey]: (defaultUrlParams[activeKey] || defaultActiveKey)
  });
  const handleTabChange = nextActiveKey => {
    setUrlParams({ [activeKey]: nextActiveKey });
    onChange && onChange(nextActiveKey);
  };
  const tabsClassNames = classNames(className);

  const resultChildren = React.Children.map(children, childItem => {
    const { count } = childItem.props;
    if (count) {
      return React.cloneElement(childItem, {
        tab: (
          <Badge
            className="tab-badge"
            count={count}
            offset={[16, -9]}
          >
            <span>{childItem.props.tab}</span>
          </Badge>)
      });
    }
    return childItem;
  });

  return (
    <Tabs
      onChange={handleTabChange}
      className={tabsClassNames}
      tabBarGutter={0}
      destroyInactiveTabPane
      defaultActiveKey={urlParams[activeKey]}
      {...restProps}
    >
      {resultChildren}
    </Tabs>
  );
};

KeepTab.defaultProps = {
  activeKey: 'activeKey'
};
KeepTab.displayName = 'KeepTab';
KeepTab.TabPane = TabPane;


export default KeepTab;
