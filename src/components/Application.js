import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import Header from './Header';
import LeftNav from './LeftNav';
import Shelves from './Shelves';

class Application extends Component {

  componentWillMount() {
    this.props.actions.fetchPage(1);
  }

  addShelfAndFetchPage = () => {
    this.props.actions.isLoading();
    this.props.actions.fetchPage(this.props.pagination.page + 1);
  }

  render() {
    let shelves;
    if (this.props.shelves.length > -1) {
      shelves = <Shelves data={this.props.shelves} onClick={this.addShelfAndFetchPage} {...this.props.state} />;
    }

    // console.info('State:', this.props.state);

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
    loading: state.loading,
    pagination: state.pagination,
    shelves: state.shelves
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
