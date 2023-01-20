import { createPost } from './index';

const test_title = 'title';
const test_body = 'body';
const test_tags = 'tags';
const test_media =
	'https://cdn.britannica.com/19/233519-050-F0604A51/LeBron-James-Los-Angeles-Lakers-Staples-Center-2019.jpg';
const test_post = {
	title: test_title,
	body: test_body,
	tags: test_tags,
	media: test_media,
};

function fetchSuccess() {
	return Promise.resolve({
		ok: true,
		status: 200,
		statusText: 'Approved',
		json: () => Promise.resolve(test_post),
	});
}

describe('create', () => {
	it('returns a valid item with a valid inpuit', async () => {
		global.fetch = jest.fn(() => fetchSuccess());
		const { title, body, media, tags } = await createPost(
			test_title,
			test_body,
			test_media,
			test_tags
		);
		expect(title).toEqual(test_title);
		expect(body).toEqual(test_body);
		expect(media).toEqual(test_media);
		expect(tags).toEqual(test_tags);
	});
});
