const axios = require('axios')

class Account {
  constructor(accountTokens) {
    this.accountTokens = this.init(accountTokens)
    this.errorAccountTokens = []
    this.currentIndex = 0
    this.requestNumber = 0
    this.checkAllAccountTokens()
  }

  init(accountTokens) {
    return accountTokens.split(',')
  }

  getAccountToken() {
    if (this.currentIndex >= this.accountTokens.length) {
      this.currentIndex = 0
    }
    const token = this.accountTokens[this.currentIndex]
    this.currentIndex++
    this.requestNumber++
    return token
  }

  async checkAccountToken(token) {
    try {
      await axios.get('https://chat.qwenlm.ai/api/models',
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          }
        })
      return true
    } catch (error) {
      return false
    }
  }

  async checkAllAccountTokens() {
    for (const token of this.accountTokens) {
      const isTokenValid = await this.checkAccountToken(token)
      if (!isTokenValid) {
        this.errorAccountTokens.push(token.slice(0, Math.floor(token.length / 2)) + '...')
        this.accountTokens.splice(this.accountTokens.indexOf(token), 1)
      }
    }
  }

  getAccountTokensNumber() {
    return this.accountTokens.length
  }

  getRequestNumber() {
    return this.requestNumber
  }

  getErrorAccountTokens() {
    return this.errorAccountTokens
  }

  getErrorAccountTokensNumber() {
    return this.errorAccountTokens.length
  }
}

module.exports = Account
