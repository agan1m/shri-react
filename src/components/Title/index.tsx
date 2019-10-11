import React from 'react';

import './index.scss';

const Title = () => (
  <div className="Title">
    <div className="Title-Main Text_h1">
      arcania
      <div className="Dropdown">
        <div className="Dropdown-Header Dropdown-Header_color_mute Text Text_h4 Text_color_mute">
          <span>trunk</span>
        </div>
      </div>
    </div>
    <div className="Title-Sub Text_p">
      Last commit <span className="Text Text-Link">c4d248</span> on
      <span className="Text Text-Link">20 Oct 2017, 12:24</span> by
      <span className="Text Text_color_accent">r</span>obot-srch-releaser
    </div>
  </div>
);

export default Title;
