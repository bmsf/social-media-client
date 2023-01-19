import { login } from './login';
import { save } from '../../storage/index';

class LocalStorageMock {
	constructor() {
		this.store = {};
	}

	clear() {
		this.store = {};
	}

	getItem(key) {
		return this.store[key] || null;
	}

	setItem(key, value) {
		this.store[key] = String(value);
	}

	removeItem(key) {
		delete this.store[key];
	}
}

global.localStorage = new LocalStorageMock();

const TEST_USER_EMAIL = 'testuser@stud.noroff.no';
const TEST_USER_PASSWORD = 'testuser123';
const TEST_USER_NAME = 'testuser';
const TEST_USER = JSON.stringify({
	email: TEST_USER_EMAIL,
	name: TEST_USER_NAME,
});

function fetchSuccess() {
	return Promise.resolve({
		ok: true,
		status: 200,
		statusText: 'Authorized',
		json: () => Promise.resolve(TEST_USER),
	});
}

function fetchFailure(status = 400, statusText = 'Unauthorized') {
	return Promise.resolve({
		ok: false,
		status,
		statusText,
	});
}

describe('login', () => {
	it('Stores credentials if valid input is provided', async () => {
		global.fetch = jest.fn(() => fetchSuccess());
		const item = await login(TEST_USER_EMAIL, TEST_USER_PASSWORD);
		expect(item).toBe(TEST_USER);
	});
});
