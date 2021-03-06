export default class NetworkController {
  BASE_URL = 'https://ewserver.di.unimi.it/mobicomp/treest/'

  async genericRequest(endpoint, parameters) {
    const URL = this.BASE_URL + endpoint + '.php'
    console.log(parameters)

    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(parameters),
      })

      // CHECK response.status
      if (response.status == 200) {
        console.log('OK')
      } else if (response.status == 400) {
        console.log('INVALID PARAMETERS')
      } else if (response.status == 401) {
        console.log('INVALID SID')
      } else if (response.status == 413) {
        console.log('LARGE PARAMETERS')
      }

      const jsonResponse = await response.json()
      return jsonResponse
    } catch (error) {
      console.error(error)
    }
  }

  async register() {
    const response = await this.genericRequest('register')
    return response.sid
  }

  async getProfile(sid) {
    const response = await this.genericRequest('getProfile', { sid: sid })
    return response
  }

  async setProfile(sid, name, picture) {
    await this.genericRequest('setProfile', {
      sid: sid,
      name: name,
      picture: picture,
    })
  }

  async getLines(sid) {
    const response = await this.genericRequest('getLines', { sid: sid })
    return response.lines
  }

  async getStations(sid, did) {
    const response = await this.genericRequest('getStations', {
      sid: sid,
      did: did,
    })
    return response.stations
  }

  async getPosts(sid, did) {
    const response = await this.genericRequest('getPosts', {
      sid: sid,
      did: did,
    })
    return response.posts
  }

  async getOfficialPosts(sid, did) {
    const response = await this.genericRequest('statolineatreest', {
      sid: sid,
      did: did,
    })
    return response.officialposts
  }

  async addPost(sid, did, delay, status, comment) {
    await this.genericRequest('addPost', {
      sid: sid,
      did: did,
      delay: delay,
      status: status,
      comment: comment,
    })
  }

  async getUserPicture(sid, uid) {
    const response = await this.genericRequest('getUserPicture', {
      sid: sid,
      uid: uid,
    })
    return response.picture
  }

  async follow(sid, uid) {
    await this.genericRequest('follow', { sid: sid, uid: uid })
  }

  async unfollow(sid, uid) {
    await this.genericRequest('unfollow', { sid: sid, uid: uid })
  }
}
