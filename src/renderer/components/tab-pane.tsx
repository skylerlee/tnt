import type { Component, JSXElement } from 'solid-js';

interface ITab {
  title: string;
  closable?: boolean;
}

type IProps = { tabs: ITab[]; children: JSXElement };

const TabList = (props: { tabs: ITab[] }) => {
  const { tabs } = props;
  return (
    <div>
      {tabs.map((tab) => (
        <div>{tab.title}</div>
      ))}
    </div>
  );
};

const TabArea = (props: { children: JSXElement }) => {
  const { children } = props;
  return <div class="tab-area">{children}</div>;
};

const TabPane: Component<IProps> = (props) => {
  const { tabs = [], children } = props;
  return (
    <div>
      <TabList tabs={tabs} />
      <TabArea>{children}</TabArea>
    </div>
  );
};

export default TabPane;
