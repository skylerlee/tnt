import type { Component } from 'solid-js';

interface ITab {
  title: string;
  closable?: boolean;
}

const TabList: Component = (props: { tabs: ITab[] }) => {
  const { tabs = [] } = props;
  return (
    <div>
      {tabs.map((tab) => (
        <div>{tab.title}</div>
      ))}
    </div>
  );
};

const TabArea: Component = (props: { children: Element }) => {
  const { children } = props;
  return <div class="tab-area">{children}</div>;
};

const TabPane: Component = (props: { tabs: ITab[] }) => {
  return (
    <div>
      <TabList />
      <TabArea />
    </div>
  );
};

export default TabPane;
