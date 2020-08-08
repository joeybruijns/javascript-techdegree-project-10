import config from './config';

export default class Data {
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

    // GET user - get the user from the database
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

    // POST user - create a new user
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

    // GET courses -  all the courses from the database
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

    // GET course -  a single course from the database
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

    // POST course - create a new course
    async createCourse(course, emailAddress, password) { // TODO: add authentication
        const response = await this.api(`/courses`, 'POST', course, true, {emailAddress, password});
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(error => error.errors);
        } else {
            throw new Error();
        }
    }

    // PUT course - update an existing course
    async updateCourse(id, course, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 403) {
            return response.json().then(error => error.errors);
        } else {
            throw new Error();
        }
    }

    // DELETE course - delete a course by ID
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
