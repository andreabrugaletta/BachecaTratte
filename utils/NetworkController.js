export default class NetworkController {
  BASE_URL = 'https://ewserver.di.unimi.it/mobicomp/treest/'

  async genericRequest(endpoint, parameters) {
    const URL = this.BASE_URL + endpoint + '.php'

    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(parameters),
      })
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  async register(onSuccess) {
    const response = await this.genericRequest('register')
    onSuccess(response.sid)
  }

  /* not tested */
  async getProfile(sid, onSuccess) {
    const response = await this.genericRequest('getProfile', { sid: sid })
    onSuccess(response)
  }

  /* not tested */
  async setProfile(sid, name, picture, onSuccess) {
    await this.genericRequest('setProfile', {
      sid: sid,
      name: name,
      picture: picture,
    })
    onSuccess()
  }

  async getLines(sid, onSuccess) {
    const response = await this.genericRequest('getLines', { sid: sid })
    onSuccess(response.lines)
  }

  /* not tested */
  async getStations(sid, did, onSuccess) {
    const response = await this.genericRequest('getStations', {
      sid: sid,
      did: did,
    })
    onSuccess(response.stations)
  }

  async getPosts(sid, did, onSuccess) {
    const response = await this.genericRequest('getPosts', {
      sid: sid,
      did: did,
    })
    onSuccess(response.posts)
  }

  /* not tested */
  async addPost(sid, did, delay, status, comment, onSuccess) {
    await this.genericRequest('addPost', {
      sid: sid,
      did: did,
      delay: delay,
      status: status,
      comment: comment,
    })
    onSuccess()
  }

  /* not tested */
  async getUserPicture(sid, uid, onSuccess) {
    const response = await this.genericRequest('getUserPicture', {
      sid: sid,
      uid: uid,
    })
    onSuccess(response)
  }

  /* not tested */
  async follow(sid, uid, onSuccess) {
    await this.genericRequest('follow', { sid: sid, uid: uid })
    onSuccess()
  }

  /* not tested */
  async unfollow(sid, uid, onSuccess) {
    await this.genericRequest('unfollow', { sid: sid, uid: uid })
    onSuccess()
  }
}
