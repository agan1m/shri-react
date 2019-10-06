import React from 'react';

import TabsMenu from './Menu';

const Tabs = ({ children }) => (
  <div className="Tabs">
    <TabsMenu />
    <div className="Tabs-Content">{children}</div>
  </div>
);

export default Tabs;
