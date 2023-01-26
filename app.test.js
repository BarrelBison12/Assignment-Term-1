/* eslint-disable no-undef */
const request = require('supertest');
const app = require('./app');

//----------------------------------------------------------------------------
//PLAYER
//----------------------------------------------------------------------------

describe('Tests the players page', () => {
	test('GET /players succeeds', () => {
		return request(app)
			.get('/players')
			.expect(200);
	});

	test('GET /players returns JSON', () => {
		return request(app)
			.get('/players')
			.expect('Content-type', /json/);
	});

	test('GET /players includes Henry S', () => {
		return request(app)
			.get('/players')
			.expect(/Henry S/);
	});

	test('GET /player/Henry Slade succeeds', () => {
		return request(app)
			.get('/player/Henry S')
			.expect(200);
	});

	test('POST /player/new', () => {
		const params = { fname: 'Adam J', pos: '14' };
		return request(app)
			.post('/player/new')
			.send(params)
			.expect(200);
	});
});

//----------------------------------------------------------------------------
//Team
//----------------------------------------------------------------------------

describe('Tests the teams page', () => {
	test('GET /teams succeeds', () => {
		return request(app)
			.get('/teams')
			.expect(200);
	});

	test('GET /teams returns JSON', () => {
		return request(app)
			.get('/teams')
			.expect('Content-type', /json/);
	});

	test('GET /teams includes England', () => {
		return request(app)
			.get('/teams')
			.expect(/England/);
	});

	test('GET /team/England succeeds', () => {
		return request(app)
			.get('/team/England')
			.expect(200);
	});

	test('POST /Team/new', () => {
		const params = { tname: 'New Zealand', hometown: 'Auckland' };
		return request(app)
			.post('/team/new')
			.send(params)
			.expect(200);
	});
});

//----------------------------------------------------------------------------
//ASSIGN PLAYER
//----------------------------------------------------------------------------

describe('Tests the assignment of players on the team page', () => {
	test('POST /assignPlayer/new', () => {
		const params = { playerName: 'Adam J', teamSearch: 'Le Mound Joue RFC' };
		return request(app)
			.post('/assignPlayer/new')
			.send(params)
			.expect(200);
	});
});

//----------------------------------------------------------------------------
//TEAM SHEET PLAYER
//----------------------------------------------------------------------------

describe('Tests the "players on team" functionality on the Team Sheet page', () => {
	test('GET /psandts succeeds', () => {
		return request(app)
			.get('/psandts')
			.expect(200);
	});

	test('GET /psandts returns JSON', () => {
		return request(app)
			.get('/psandts')
			.expect('Content-type', /json/);
	});

	test('GET /psandts includes Henry S', () => {
		return request(app)
			.get('/psandts')
			.expect(/Henry S/);
	});

	test('GET /psandts2 succeeds', () => {
		return request(app)
			.get('/psandts2')
			.expect(200);
	});

	test('GET /psandts2 returns JSON', () => {
		return request(app)
			.get('/psandts2')
			.expect('Content-type', /json/);
	});

	test('GET /psandts2 includes England', () => {
		return request(app)
			.get('/psandts2')
			.expect(/England/);
	});

});
