import { login } from './login';
import { load, save } from '../../storage/index';

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

const test_user_email = 'testuser@stud.noroff.no';
const test_user_pw = 'testuser123';
const test_user_name = 'testuser';

const test_user = JSON.stringify({
	email: test_user_email,
	name: test_user_name,
});
const test_bad_id = 'bad@id.no';

function fetchSuccess() {
	return Promise.resolve({
		ok: true,
		status: 200,
		statusText: 'Authorized',
		json: () => Promise.resolve(test_user),
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

	it('returns user info from api if provided with valid credentials', async () => {
		global.fetch = jest.fn(() => fetchSuccess());
		const user = await login(test_user_email, test_user_pw);
		expect(user).toBe(test_user);
	});
	it('stores the token from api call to localStorage to give user access', async () => {
		const testKey = 'key';
		const testValue = 'value';
		save(testKey, testValue);

		expect(load(testKey)).toBe(testValue);
	});

	it('returns Unauthorized if provided with wrong credentials', async () => {
		global.fetch = jest.fn(() => fetchFailure());
		await expect(() =>
			login(test_bad_id, test_user_pw).toThrow('Unauthorized')
		);
	});
});
