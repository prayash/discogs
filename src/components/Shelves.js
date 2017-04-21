import React from 'react';
import { VirtualKanban } from '../libs/react-virtual-kanban/src';
import 'react-virtual-kanban/lib/styles.css';

const Shelves = ({lists}) => {
  return (
    <div className='main-container'>
      <VirtualKanban
        lists={lists}
        width={800}
        height={580}
        listWidth={300}
      />

      <br />
    </div>
  )
}

export default Shelves;
