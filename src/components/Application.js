import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import Header from './Header';
import LeftNav from './LeftNav';
import Shelves from './Shelves';

class Application extends Component {

  componentWillMount() {
    let user ='blacklight';
    let page = 1;
    this.props.actions.fetchReleasess(user, page);
  }

  addShelf = (e) => {
    this.props.actions.addShelf();
  }

  render() {
    let shelves;
    if (this.props.shelves.length > -1) {
      shelves = <Shelves data={this.props.shelves} onClick={this.addShelf} />;
    }

    console.info('State:', this.props.state);

    return (
      <div id='app' className='fade-in'>
        <div id='container'>

          <Header />
          <div className='flex-container'>
            <LeftNav />
            { shelves }
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    pagination: state.pagination,
    shelves: state.shelves
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
