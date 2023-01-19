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
	afterEach(async () => {
		await global.fetch.mockReset();
	});

	it('Returns Unauthorized if provided with wrong credentials', async () => {
		global.fetch = jest.fn(() => fetchFailure());

		await expect(login('wronginfo', 'pw')).rejects.toThrow('Unauthorized');
	});

	it('Returns profile from api if provided with valid credentials', async () => {
		global.fetch = jest.fn(() => fetchSuccess());
		const user = await login(TEST_USER_EMAIL, TEST_USER_PASSWORD);
		expect(user).toBe(TEST_USER);
	});
	it('Stores the token from api call to localStorage to give user access', () => {
		const testToken = 'token';
		const testValue = 'profile';
		save(testToken, testValue);

		expect(localStorage.getItem(testToken)).toBe(JSON.stringify(testValue));
	});
});
