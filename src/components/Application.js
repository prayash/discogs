import React, { Component } from 'react';
import { apiService } from '../services';

import Header from './Header';
import LeftNav from './LeftNav';
import Shelves from './Shelves';

class Application extends Component {

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
    let lists = [
      {
        id: 'Discogs API',
        rows: []
      }, {
        id: 'SHELF 1',
        rows: [
          {id: 'item#5', content: "MOAR"},
          {id: 'item#6', content: "MOAR"},
          {id: 'item#7', content: "MOAR"},
          {id: 'item#8', content: "MOAR"}
        ]
      }
    ];

    if (this.state.releases) {
      const { releases } = this.state;
      const objects = releases.map(release =>
        ({
          id: release.id,
          content: (
            <div className="release">
              <div className='heavy'>{release.basic_information.title}</div>
              <div className='light'>{release.basic_information.artists[0].name}</div>
            </div>
          ),
          artist: release.basic_information.artists[0].name
        })
      )

      lists[0].rows = objects;
    }

    // console.log(lists);

    return (
      <div id='app' className='fade-in'>
        <div id='container'>

          <Header />
          <div className='flex-container'>
            <LeftNav />
            <Shelves lists={lists} />
          </div>

        </div>
      </div>
    );
  }
}

export default Application;
