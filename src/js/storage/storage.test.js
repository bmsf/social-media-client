import * as storage from './index';

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

describe('storage', () => {
	it('Saves an array to storage', () => {
		const key = 'bag';
		const value = ['driver', 'putter'];
		const serializedValue = JSON.stringify(value);

		storage.save(key, value);

		expect(localStorage.getItem(key)).toEqual(serializedValue);
	});
	it('Gets array from the storage', () => {
		const key = 'bag';
		const value = ['driver', 'putter'];

		storage.save(key, value);

		expect(storage.load(key)).toEqual(value);
	});
	it('Deletes from storage', () => {
		const key = 'bag';
		const value = ['driver', 'putter'];

		storage.save(key, value);

		expect(storage.load(key)).toEqual(value);
		storage.remove(key);
		expect(storage.load(key)).toEqual(null);
	});
	it();
});
