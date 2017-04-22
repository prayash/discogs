import React from 'react';

const LeftNav = () => {
  return (
    <div className="left-nav">
      <ul>
        <li>
          <a href="/" className="active">
            <span className="icon-drawer icon active"></span><span className="description">Board</span>
          </a>
        </li>
        <li>
          <a href="http://effulgence.io" target='_blank'>
            <span className="icon-info icon"></span><span className="description">To do</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default LeftNav;
