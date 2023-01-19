import { logout } from './index';
import { remove } from '../../storage';
import { save } from '../../storage';

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

const test_user_email = 'testuser@stud.noroff.no';
const test_user_pw = 'testuser123';
const test_user_name = 'testuser';
const test_user = JSON.stringify({
	email: test_user_email,
	name: test_user_name,
});

global.localStorage = new LocalStorageMock();

describe('logout', () => {
	it('Should clear the users token from localStorage', () => {
		const testKey = 'key';
		const testValue = 'value';
		save(testKey, testValue);
		expect(localStorage.getItem(testKey)).toBe(JSON.stringify(testValue));
		remove(testKey);
		expect(localStorage.getItem(testKey)).toEqual(undefined || null);
	});
});
