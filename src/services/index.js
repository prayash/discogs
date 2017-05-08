import axios from 'axios';

const API_URL = '/users/blacklight/collection/folders/0/releases?page=';

const RELEASE_URL = '/releases/198657';

let api = axios.create({
  baseURL: 'https://api.discogs.com',
  headers: {'Authorization': 'Discogs token=hTWMDFirFkFMdjLKbDAFSzpwOQupBrVSIkvicmrl'}
})

export const apiService = {
  /**
   * fetchCollection: Fetch 1st page of releases from any given collection
   * @param {String} url - The API endpoint
   * @return {Promise} - an object that holds releases and pagination parameters
   */
  fetchCollection(page) {
    return api.get(API_URL + page + '&per_page=25')
      .then((res) => {
        const { pagination, releases } = res.data;

        // Store fetched data into localStorage to conserve API rate limits
        // localStorage.setItem('pagination', JSON.stringify(pagination));
        // localStorage.setItem('releases', JSON.stringify(releases));

        return {
          pagination: pagination,
          releases: releases
        };
      })
      .catch((err) => {
        console.log(err);
      });
  },

  /**
   * fetchImage: Fetch an image given a Discog release endpoint (eg: '/releases/198657')
   * @param {String} uri - The endpoint for any given release
   * @return {Promise} - a string to the resource uri to map to an img element's src
   */
  fetchImage() {
     return api.get(RELEASE_URL)
      .then((res) => {
        // console.log(res.data.images[0]);
        return res.data.images[0].uri
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
