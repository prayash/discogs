import React from 'react';

const LeftNav = () => {
  return (
    <div className="left-nav">
      <ul>
        <li>
          <a href="/app/main/board" className="active">
            <span className="icon-drawer"></span><span className="description">Board</span>
          </a>
        </li>
        <li>
          <a href="/app/main/todos">
            <span className="icon-pie-chart"></span><span className="description">To do</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default LeftNav;
