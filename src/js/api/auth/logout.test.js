import { logout } from './index';
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

describe('logout', () => {
	it('should clear the users token from localStorage', () => {
		const testKey = 'token';
		const testValue = 'profile';
		save(testKey, testValue);
		expect(load(testKey)).toBe(testValue);
		logout();
		expect(load(testKey)).toEqual(undefined || null);
	});
});
