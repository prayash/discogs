import React, { Component } from 'react';
import { apiService } from '../services';
import Release from './Release';

class App extends Component {

  state = {
    pagination: null,
    releases: null
  }

  componentWillMount() {
    // Only hit the API if the data isn't already stored in localStorage!
    if (!localStorage.getItem('releases')) {
      let fetch = apiService.fetchCollection();
      fetch.then((data) => {
        this.setState({
          pagination: data.pagination,
          releases: data.releases
        });
      });
    } else {
      const pagination = JSON.parse(localStorage.getItem('pagination'));
      const releases = JSON.parse(localStorage.getItem('releases'));
      this.setState({
        pagination: pagination,
        releases: releases
      });
    }
  }

  render() {
    let list;
    if (this.state.releases) {
      const { releases } = this.state;
      list = (
        <ul className='releases'>
          {releases.map(release =>
            <Release release={release} key={release.id} />
          )}
        </ul>
      )
    }

    return (
      <div id='app'>
        <section id='container'>
          <header>Discogs API</header>
          { list }
        </section>
      </div>
    );
  }
}

export default App;
