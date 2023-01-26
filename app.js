/* eslint-disable no-undef */
const express = require('express');
const app = express();

const fs = require('fs');

const fileNameForPlayer = './players.json';
const fileNameForTeam = './teams.json';
const fileNameForAssign = './assignPlayers.json';
const players = require(fileNameForPlayer);
const teams = require(fileNameForTeam);
const pAndTs = require(fileNameForAssign);

app.use(express.json());
app.use(express.static('client'));

/* -------------------------------------------------------------------
PLAYER
--------------------------------------------------------------------*/

app.get('/player/:player', async function (req, resp) {
	const player = req.params.player;
	const pos = players[player];

	resp.send(pos);
});

app.get('/players', async function (req, resp) {
	const playerNames = Object.keys(players);
	resp.send(playerNames);
});


app.post('/player/new', async function (req, resp) {

	const fname = req.body.fname;
	const pos = req.body.pos;
	players[fname] = pos;
    

	fs.writeFileSync(fileNameForPlayer, JSON.stringify(players), (error) => {if (error) throw error;});
	resp.send(players);
});

/* -------------------------------------------------------------------
TEAM
--------------------------------------------------------------------*/

app.get('/team/:team', async function (req, resp) {
	const team = req.params.team;
	const hometown = teams[team];

	resp.send(hometown);
});

app.get('/teams', async function (req, resp) {
	const teamNames = Object.keys(teams);
	resp.send(teamNames);
});


app.post('/team/new', async function (req, resp) {

	const tname = req.body.tname;
	const hometown = req.body.hometown;
	teams[tname] = hometown;
    

	fs.writeFileSync(fileNameForTeam, JSON.stringify(teams), (error) => {if (error) throw error;});
	resp.send(teams);
});

/* -------------------------------------------------------------------
ASSIGN PLAYER
--------------------------------------------------------------------*/

app.post('/assignPlayer/new', async function (req, resp) {

	const playerName = req.body.playerName;
	const teamName = req.body.teamSearch;
	pAndTs[playerName] = teamName;

	fs.writeFileSync(fileNameForAssign, JSON.stringify(pAndTs), (error) => {if (error) throw error;});
	resp.send(pAndTs);
});

/* -------------------------------------------------------------------
FIND PLAYER ON TEAM
--------------------------------------------------------------------*/

app.get('/psandts', async function (req, resp) {
	const playerNamesTS = Object.keys(pAndTs);
	resp.send(playerNamesTS);
});

app.get('/psandts2', async function (req, resp) {
	const playerTeamsTS = Object.values(pAndTs);
	resp.send(playerTeamsTS);
});

module.exports = app;