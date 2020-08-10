import config from './config';

export default class Data {
    /**
     * The method that builds the request to the API
     * @param {string} path - The path for the route
     * @param {string} method - The HTTP request method
     * @param {object} body - The body of the request
     * @param {boolean} requiresAuth - Set if authentication is required or not
     * @param {object} credentials - Object with user credentials
     * @returns {Promise<Response>}
     */
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

    /**
     * Get the user from the database
     * @param {string} emailAddress - User email
     * @param {string} password - User password
     * @returns {Promise<null|any>}
     */
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            console.log(response);
            return null;
        } else {
            throw new Error();
        }
    }

    /**
     * Create a new user
     * @param {object} user - A new user object
     * @returns {Promise<any|*[]>}
     */
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(error => error.errors);
        } else {
            throw new Error();
        }
    }

    /**
     * Get all the courses from the database
     * @returns {Promise<*>}
     */
    async getCourses() {
        const response = await this.api(`/courses`, 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 400) {
            return response.json().then(error => error.errors);
        } else {
            throw new Error();
        }
    }

    /**
     * Get a single course from the database that matches the specified ID
     * @param {string} id - The course ID
     * @returns {Promise<*>}
     */
    async getCourseDetails(id) {
        const response = await this.api(`/courses/${id}`, 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 404) {
            return response.json().then(error => error.errors);
        } else {
            throw new Error();
        }
    }

    /**
     * Create a new course
     * @param {object} course - The new course object
     * @param {string} emailAddress - User email
     * @param {string} password - User password
     * @returns {Promise<*[]|*>}
     */
    async createCourse(course, emailAddress, password) {
        const response = await this.api(`/courses`, 'POST', course, true, {emailAddress, password});
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(error => error.errors);
        } else {
            throw new Error();
        }
    }

    /**
     * Update an existing course
     * @param {string} id - The course ID
     * @param {object} course - The updated course object
     * @param {string} emailAddress - User email
     * @param {string} password - user password
     * @returns {Promise<*[]|*>}
     */
    async updateCourse(id, course, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(error => error.errors);
        } else {
            throw new Error();
        }
    }

    /**
     * Delete a course by ID
     * @param {string} id - The course ID
     * @param {string} emailAddress - User email
     * @param {string} password - user password
     * @returns {Promise<*[]|*>}
     */
    async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 403) {
            return response.json().then(error => error.errors);
        } else {
            throw new Error();
        }
    }
}
