import React, { Component } from 'react';
import { VirtualKanban } from '../libs/react-virtual-kanban/src';
import { apiService } from '../services';

import logo from '../../public/img/discogs-logo.svg';
import 'react-virtual-kanban/lib/styles.css';

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
        <section id='container'>

          <div id='header'>
            <div className='flex-header'>
              <div className='logo-wrapper'>
                <a href="http://discogs.com" className='logo'>
                  <img src={logo} alt='discogs logo' />
                </a>
              </div>
              <div className='search-wrapper'>
                <input type='text' name='search' placeholder='Search user...' />
              </div>
            </div>
          </div>

          {/*{ list }*/}

          <div className='flex-container'>
            <div className="left-menu">
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

            <div className='main-container'>
              <VirtualKanban
                lists={lists}
                width={800}
                height={580}
                listWidth={300}
              />
              <br />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Application;
