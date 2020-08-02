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
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
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

    // GET user - get the user from the database
    async getUser(email, password) {
        const response = await this.api(`/users`, 'GET', null, true, {email, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
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
        } else if (response.status === 400) {
            return response.json().then(error => error.errors);
        } else {
            throw new Error();
        }
    }

    // POST course - create a new course
    async createCourse(course) {
        const response = await this.api(`/courses/create`, 'POST', course);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(error => error.errors);
        } else {
            throw new Error();
        }
    }

    // POST course - update an existing course
    async updateCourse(course) {

    }

}
