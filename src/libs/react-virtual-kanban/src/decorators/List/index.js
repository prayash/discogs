import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import classnames from 'classnames';

import { PropTypes as CustomPropTypes } from '../../propTypes';

export default class List extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    listId: CustomPropTypes.id.isRequired,
    listIndex: PropTypes.number.isRequired,
    rows: PropTypes.array,
    isDragging: PropTypes.bool.isRequired,
    listStyle: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      list,
      listId,
      listStyle,
      connectDragSource,
      connectDropTarget,
      isDragging,
      children,
      editShelf,
      doneEditingShelf,
      removeShelf
    } = this.props;

    let listContainerClass = classnames({
      'ListContainer': true,
      'ListPlaceholder': isDragging
    });

    return (
      <div className='ListWrapper fade-in-quick' style={listStyle}>
        <div className={listContainerClass}>
          {connectDragSource(
            <div className='ListHeader'>
              <span style={{display: 'none'}} className='ListTitle'>{listId} ({list.rows.length})</span>
              <textarea
                className='ListTitle'
                onKeyDown={doneEditingShelf}
                onFocus={editShelf}
                defaultValue={listId}>
              </textarea>
              <span className='icon-close' onClick={removeShelf.bind(this, listId)}></span>
            </div>
          )}
          {connectDropTarget(
            <div className='ListContent'>
              {/*<div className="release">*/}
                {/*<div className='heavy'>{list.rows.content.artist}</div>*/}
                {/*<div className='light'>{release.basic_information.artists[0].name}</div>*/}
              {/*</div>*/}
              {/*{list.rows.content}*/}
              {children}
            </div>
          )}
          <div className='ListFooter'>
            <div className='ListActions'>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
