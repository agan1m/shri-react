import React from 'react';

import TabsMenu from './Menu';

interface IProps {
  children: React.ReactNode;
}

const Tabs = ({ children }: IProps) => (
  <div className="Tabs">
    <TabsMenu />
    <div className="Tabs-Content">{children}</div>
  </div>
);

export default Tabs;
