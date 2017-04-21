import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import { VirtualKanban } from '../libs/react-virtual-kanban/src';
import 'react-virtual-kanban/lib/styles.css';

class Shelves extends Component {

  _addShelfHandler = (e) => {
    this.props.onClick(e);
  }

  _editingShelfHandler = (e) => {
    e.target.select();
  }

  _doneEditingShelfHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();

      const oldId = e.target.defaultValue;
      const newId = e.target.value;
      this.props.actions.editShelf(oldId, newId);
    }
  }

  update = (params) => {
    console.log(params);
  }

  render() {
    const listWidth = 300;
    return (
      <div className='main-container'>
        <VirtualKanban
          lists={this.props.data}
          width={(this.props.data.length) * listWidth}
          height={580}
          listWidth={listWidth}
          onDropRow={this.update}
          onEditShelf={this._editingShelfHandler}
          onDoneEditingShelf={this._doneEditingShelfHandler}
        />

        <div className="release AddShelfButton" onClick={this._addShelfHandler}>
          <span className='icon-plus'></span><span className='description'>Add Shelf</span>
        </div>

        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Shelves);
