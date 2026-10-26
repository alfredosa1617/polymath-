/**
 * Polymath VSN - API Client
 */
const API = {
  baseUrl: window.location.origin,

  getToken() {
    return localStorage.getItem('polymath_token');
  },

  setToken(token) {
    if (token) {
      localStorage.setItem('polymath_token', token);
    } else {
      localStorage.removeItem('polymath_token');
    }
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('polymath_user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem('polymath_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('polymath_user');
    }
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, { ...options, headers });
      const contentType = response.headers.get('content-type');
      let data = null;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error((data && data.error) || (data && data.message) || `HTTP error ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, error);
      throw error;
    }
  },

  // Auth Endpoints
  async signin(email, password) {
    const data = await this.request('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    this.setToken(data.token);
    this.setCurrentUser(data);
    return data;
  },

  async signup(email, username, password) {
    const data = await this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, username, password })
    });
    this.setToken(data.token);
    this.setCurrentUser(data);
    return data;
  },

  signout() {
    this.setToken(null);
    this.setCurrentUser(null);
    window.location.reload();
  },

  // User Endpoints
  async getProfile() {
    return await this.request('/api/user/profile');
  },

  async recordSolve(timeSeconds) {
    return await this.request('/api/user/solve-stat', {
      method: 'POST',
      body: JSON.stringify({ timeSeconds })
    });
  },

  // Cube Endpoints
  async solveCube(payload) {
    return await this.request('/api/cube/solve', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async getScramble(length = 20) {
    return await this.request(`/api/cube/scramble?length=${length}`);
  },

  async validateCube(faceletString) {
    return await this.request('/api/cube/validate', {
      method: 'POST',
      body: JSON.stringify({ faceletString })
    });
  },

  // DSA Code Execution Endpoints
  async runDsaCode(payload) {
    return await this.request('/api/dsa/run', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async submitDsaCode(payload) {
    return await this.request('/api/dsa/submit', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
};
