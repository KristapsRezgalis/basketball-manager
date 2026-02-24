let currentYear = 2025;
let seasonsPlayed = 0;
let ppgLeaderList = Array ();
for (let i=0; i<5; i++){
	ppgLeaderList[i] = Array (0,0,0,0,0);
}
let nba1GameRecords = [ [[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']] ]; //pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA, RebTot,fgMade,fgAt,2ptsFgM,2ptsFgAt  + currentYear + Player Name
let nba1GameRecordsTotal = [ [[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']],[[0,0,'']] ]; //pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA, RebTot,fgMade,fgAt,2ptsFgM,2ptsFgAt, doubles, triples, quadruples  + currentYear + Player Name

for (let i = 0; i < nba1GameRecords.length; i++){ //Fills out nba1GameRecord array with 10 records in each player stat category + fgMade,fgAt2ptsFgM,2ptsFgAt
	for (let y = 1; y < 10; y++){
		nba1GameRecords[i].push([0, 0, '']);
	}
}
for (let i = 0; i < nba1GameRecordsTotal.length; i++){ //Fills out nba1GameRecord array with 10 best Total stats in each  stat category + fgMade,fgAt2ptsFgM,2ptsFgAt,double,triple,quadruple
	for (let y = 1; y < 10; y++){
		nba1GameRecordsTotal[i].push([0, 0, '']);
	}
}

let currentTeamRoster = 0;
let userTeam;
let savePossesionCount = [];
let areAllSeasonGamesPlayed = false;
let nbaDraftAvailable = false;
let selectedPlayoffModalYear;
let westPlayInTeams = [];  // [[year, team7, team8, team9, team10],[]] - will hold west play-in teams for each year
let eastPlayInTeams = [];
let westPlayInFinals = [];
let eastPlayInFinals = [];
let westPlayoffTeams = [];
let eastPlayoffTeams = [];
let westSemiFinalTeams = [];
let eastSemiFinalTeams = [];
let westFinalTeams = [];
let eastFinalTeams = [];
let nbaFinalTeams = [];

let ifPlayInGamesPlayed = [];
let ifQuerterFinalsPlayed = [];
let ifConfSemiFinalsPlayed = [];
let ifConfFinalsPlayed = [];
let ifFinalsPlayed = [];
let nbaChampionsList = [];

let nbaRetiredPlayers = [];

let allPlayerTrades = [];

//COUNTRY CLASS
class Country {
	countryName;
	population;
	popularity;
	playerQuality;;
	firstNames = [];
	lastNames = [];
	
	constructor (countryName, population, popularity, playerQuality, firstNames, lastNames){
		this.countryName = countryName;
		this.population = population; // 1 - 10
		this.popularity = popularity; // 1 - 2000
		this.playerQuality = playerQuality; // 1 - 100
		this.firstNames = firstNames;
		this.lastNames = lastNames;
	}
	
	printCountryInfo () {
		console.log(`${this.countryName} \nPopulation = ${this.population} \nPopularity = ${this.popularity}`);
	}
}

// TEAM CLASS
class Team {
	teamName;
	conference;
	teamRating;
	roster = [];
	lineup = [];
	minutes = [32, 32, 32, 32, 32, 20, 15, 10, 10, 10, 8, 7];
	statsTotal = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0]; //games,pts,oreb,dreb,ast, stl,blk,to,fouls,insM, insA,2ptM,2ptA,3ptM,3ptA, ftM,ftA,pointAllowed
	winLose = [0,0,0]; //win, lose, percentage
	teamShort;
	seasonResults = [];
	championships = [];
	numberInTeamList;
	teamUpgrades = [0,0,0,0, 0, 0,0, 0, 0]; // offense skills +3/ defense sk. +3/ shooting sk. +3/ physical sk. +3/ rookies all sk. +1/ offense boost/ defense boost/ trade bonus +1 overal got / country popularuty&quality increase
	playerNameList = [];
	playerOveralList = [];
	playerAgeList = [];
	youthProgram = [0,0]; // will hold a number of a country in country array - in the selected country it's basketball populariity and player quality is increased each year
	
  constructor(teamName, teamShort,conference,numberInTeamList) {
    this.teamName = teamName;
	this.teamShort = teamShort;
	this.conference = conference;
	this.numberInTeamList = numberInTeamList;
  }

  printRoster() {
    console.log("\nROSTER " + this.teamName);
    for (let i = 0; i < this.roster.length; i++) {
      console.log(
        `${i + 1}. ${this.roster[i].name} - ${
          this.roster[i].position
        } - ${Math.round(this.roster[i].overal)}`
      );
    }
  }

  setLineup() {
    let resCounter = 0;
    for (let i = 0; i < this.roster.length; i++) {
      for (let j = 0; j < this.roster.length - 1; j++) {
			if (this.roster[j].overal < this.roster[j + 1].overal) {
			  // If the condition is true then swap them
			  let temp = this.roster[j];
			  this.roster[j] = this.roster[j + 1];
			  this.roster[j + 1] = temp;
			}
      }
    }
	// clears lineup to null so players don't double
	for (let x = 0; x < this.lineup.length; x++){
		this.lineup[x] = null;
	}
	// puts players in lineup
    console.log("\n");
    for (let i = 0; i < this.roster.length; i++) {
      if (this.roster[i].position == "C" && this.lineup[0] == null) {
        this.lineup[0] = this.roster[i];
        console.log("C position applied - " + this.lineup[0].name);
      } else if (this.roster[i].position == "PF" && this.lineup[1] == null) {
        this.lineup[1] = this.roster[i];
        console.log("PF position applied - " + this.lineup[1].name);
      } else if (this.roster[i].position == "SF" && this.lineup[2] == null) {
        this.lineup[2] = this.roster[i];
        console.log("SF position applied - " + this.lineup[2].name);
      } else if (this.roster[i].position == "SG" && this.lineup[3] == null) {
        this.lineup[3] = this.roster[i];
        console.log("SG position applied - " + this.lineup[3].name);
      } else if (this.roster[i].position == "PG" && this.lineup[4] == null) {
        this.lineup[4] = this.roster[i];
        console.log("PG position applied - " + this.lineup[4].name);
      } else {
        this.lineup[5 + resCounter] = this.roster[i];
        console.log(`${6 + resCounter}th position applied ${this.lineup[5 + resCounter].name}`);
        resCounter++;
      }
    }
	

	
		// Checks if reserves Second Position Overal is not better than any starter and swaps them if true
	for (let j = 5; j < this.lineup.length; j++) {
		console.log(`NAME === ${this.lineup[j].name} IS BEING CHECKED NOW!!!` );
		if (this.lineup[0] == null && this.lineup[j].secPosition == "C"  ||  this.lineup[j].secPosition == "C" && this.lineup[j].overal > this.lineup[0].overal) {
			let temp = this.lineup[0];
			this.lineup[0] = this.lineup[j];
			this.lineup[j] = temp;
			this.sortReservesLineup ();
			console.log(this.lineup);
			console.log("C position updated - " + this.lineup[0].name);
		} else if (this.lineup[1] == null && this.lineup[j].secPosition == "PF"  ||  this.lineup[j].secPosition == "PF" && this.lineup[j].overal > this.lineup[1].overal) {
			let temp = this.lineup[1];
			this.lineup[1] = this.lineup[j];
			this.lineup[j] = temp;
			this.sortReservesLineup ();
			console.log("PF position updated - " + this.lineup[1].name);
		} else if (this.lineup[2] == null && this.lineup[j].secPosition == "SF"  ||  this.lineup[j].secPosition == "SF" && this.lineup[j].overal > this.lineup[2].overal) {
			let temp = this.lineup[2];
			this.lineup[2] = this.lineup[j];
			this.lineup[j] = temp;
			this.sortReservesLineup ();
			console.log("SF position updated - " + this.lineup[2].name);
		} else if (this.lineup[3] == null && this.lineup[j].secPosition == "SG"  ||  this.lineup[j].secPosition == "SG" && this.lineup[j].overal > this.lineup[3].overal) {
			let temp = this.lineup[3];
			this.lineup[3] = this.lineup[j];
			this.lineup[j] = temp;
			this.sortReservesLineup ();
			console.log("SG position updated - " + this.lineup[3].name);
		} else if (this.lineup[4] == null && this.lineup[j].secPosition == "PG"  ||  this.lineup[j].secPosition == "PG" && this.lineup[j].overal > this.lineup[4].overal) {
			let temp = this.lineup[4];
			this.lineup[4] = this.lineup[j];
			this.lineup[j] = temp;
			this.sortReservesLineup ();
			console.log("PG position updated - " + this.lineup[4].name);
		}
	}
	
	this.sortReservesLineup ();
	
	this.playerNameList = [];
	this.playerOveralList = [];
	this.playerAgeList = [];
	
	for (let j = 0; j < this.roster.length; j++){
		this.playerNameList.push(this.roster[j].name);
		this.playerOveralList.push(this.roster[j].overal);
		this.playerAgeList.push(this.roster[j].age);
	}
	console.log(this.playerNameList, this.playerOveralList, this.playerAgeList);
	
	
  }
	
	sortReservesLineup () {
		// sorts reserves by overal
		
		for (let x = 5; x < this.lineup.length-1; x++) {
			
			if ( this.lineup[x]  ==  undefined || this.lineup[x]  ==  null) {
				console.log(`UNDEFINED FOUND - ${this.lineup[x]}`);
				console.log(`BEFORE SPLICE -> ${this.lineup}`);
				this.lineup.splice(x,1);
				console.log(`AFTER SPLICE -> ${this.lineup}`);
			}
			
		}
		
		for (let x = 5; x < this.lineup.length-1; x++) {
			console.log(`SORT PLAYER - ${this.lineup[x].name }`);
			if (this.lineup[x+1] != null) {
				if (this.lineup[x] == null || this.lineup[x].overal < this.lineup[x+1].overal){
					let temp = this.lineup[x];
					this.lineup[x] = this.lineup[x+1];
					this.lineup[x+1] = temp;
				}
			}
		}
		
	}
	
  printLineup() {
    console.log(
      `
		C: ${this.lineup[0].name} - ${Math.round(this.lineup[0].overal)}
		PF: ${this.lineup[1].name} - ${Math.round(this.lineup[1].overal)}
		SF: ${this.lineup[2].name} - ${Math.round(this.lineup[2].overal)}
		SG: ${this.lineup[3].name} - ${Math.round(this.lineup[3].overal)}
		PG: ${this.lineup[4].name} - ${Math.round(this.lineup[4].overal)}
		---------------------
		6. ${this.lineup[5].name} - ${Math.round(this.lineup[5].overal)}
		7. ${this.lineup[6].name} - ${Math.round(this.lineup[6].overal)}
		8. ${this.lineup[7].name} - ${Math.round(this.lineup[7].overal)}
		9. ${this.lineup[8].name} - ${Math.round(this.lineup[8].overal)}
		10. ${this.lineup[9].name} - ${Math.round(this.lineup[9].overal)}
		11. ${this.lineup[10].name} - ${Math.round(this.lineup[10].overal)}
		12. ${this.lineup[11].name} - ${Math.round(this.lineup[11].overal)}
		----------------------
		`
    );
  }
  
  getTeamOveral (){
	  let teamOveral = 0;
	  let teamOffOveral = 0;
	  let teamDefOveral = 0;
	  
	  
	for (let i = 0; i < this.minutes.length; i++) {
		teamOveral = teamOveral + (this.minutes[i] * this.lineup[i].overal);
		teamOffOveral = teamOffOveral + (this.minutes[i] * this.lineup[i].oaw);
		teamDefOveral = teamDefOveral + (this.minutes[i] * this.lineup[i].daw);
	}
		teamOveral = Math.round(teamOveral / 240);
		teamOffOveral = Math.round(teamOffOveral / 240 * 1.2);
		teamDefOveral = Math.round(teamDefOveral / 240 * 1.2);
		
  console.log(`${this.teamName} OVERAL: ${teamOveral}
		TEAM OFFENSE: ${teamOffOveral}
		TEAM DEFENSE: ${teamDefOveral}`);
	}
	//return [teamOveral, teamOffOveral, teamDefOveral];
}

// PLAYER CLASS
class Player {
	id;
  name;
  position;
  age;
  ins;
  pt2;
  pt3;
  ft;
  jum;
  str;
  spe;
  qui;
  dri;
  pas;
  ore;
  dre;
  oaw;
  daw;
  blk;
  stl;
  end;
  inj;
  pot;
  potLetter;
  overal;
  statRowNumber = -1;
  statsTotal = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0]; // games,pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA, RebTot,fgMade,fgAt, 2ptsFgM,2ptsFgAt,double,triple,quadriple, gamesStarted
  statsTotalByYear = []; // YEAR, GM Pl, GM St, PTS,OREB,REB,AST,STL,BLK,TO,FGM,FGA,2PM,2PA,3PM,3PA,FTM,FTA,FLS,DD,TD,QD
  perGameStats = [0,0,0,0,0,0,0,0,0]; // pts/reb/ast/stl/blk/fg%/pt3%/ft%/PER
  perGameStatsByYear = []; // YEAR, GM Pl, GM St, PTS,OREB,REB,AST,STL,BLK,TO,FGM,FGA,2PM,2PA,3PM,3PA,FTM,FTA,FLS
  PER = 0; // Player Efficiency Rating
  playerDevelopmentBySeason = []; // stores player stats from each season to see development/regression
  playerAwards = [];
	experience;
	secPosition;
	country;
	draftYear;
	draftPosition;
	height;
	weight;
	extraDevPoints = 0; // extra development points that can be received when winning Rookie of the Year, SIX man of the Year, Most Improved players award
  playerRecords = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA, RebTot,fgMade,fgAt, 2ptsFgM,2ptsFgAt,double,triple,quadriple
	
  // ins/pt2/pt3/ft/jum/str/spe/qui/dri/pas/ore/dre/oaw/daw/blk/stl/end/inj/pot
  constructor(
	id,
    name,
    position,
    age,
    ins,
    pt2,
    pt3,
    ft,
    jum,
    str,
    spe,
    qui,
    dri,
    pas,
    ore,
    dre,
    oaw,
    daw,
    blk,
    stl,
    end,
    inj,
    pot,
	experience,
	secPosition,
	country,
	height,
	weight,
	draftYear,
	draftPosition
  ) {
		this.id = id;
		this.name = name;
		this.position = position;
		this.age = age;
		this.ins = ins;
		this.pt2 = pt2;
		this.pt3 = pt3;
		this.ft = ft;
		this.jum = jum;
		this.str = str;
		this.spe = spe;
		this.qui = qui;
		this.dri = dri;
		this.pas = pas;
		this.ore = ore;
		this.dre = dre;
		this.oaw = oaw;
		this.daw = daw;
		this.blk = blk;
		this.stl = stl;
		this.end = end;
		this.inj = inj;
		this.pot = pot;
		this.experience = experience;
		this.secPosition = secPosition;
		this.country = country,
		this.height = height;
		this.weight = weight;
		this.draftYear = draftYear,
		this.draftPosition = draftPosition,
		this.overal =
		  Math.round((ins +
			pt2 +
			pt3 +
			ft +
			jum +
			str +
			spe +
			qui +
			dri +
			pas +
			ore +
			dre +
			oaw * 4 +
			daw * 3 +
			blk +
			stl +
			end +
			inj) /
		  18),
			this.potLetter = this.getPotLetter();
		 this.playerDevelopmentBySeason.push([currentYear, this.overal,this.ins,this.pt2,this.pt3,this.ft,this.jum,this.str,this.spe,this.qui,this.dri,this.pas,this.ore,this.dre,this.oaw,this.daw,this.blk,this.stl,this.end,this.inj,this.pot]);
  }

	getPotLetter = function() {
		if (this.pot == 0) { return "A"; }
		else if (this.pot == 1) { return "B"; }
		else if (this.pot == 2) { return "C"; }
		else if (this.pot == 3) { return "D"; }
		else if (this.pot == 4) { return "E"; }
  	}
  
  calcPlayerOveral () {
	this.overal =
		  (this.ins +
			this.pt2 +
			this.pt3 +
			this.ft +
			this.jum +
			this.str +
			this.spe +
			this.qui +
			this.dri +
			this.pas +
			this.ore +
			this.dre +
			this.oaw * 4 +
			this.daw * 3 +
			this.blk +
			this.stl +
			this.end +
			this.inj) /
		  18;
		if (this.overal > 99) { this.overal = 99; };
  }

  getPlayerInfo() {
    console.log("\nPLAYER INFO:");
    console.log(this.name);
    console.log("Position = " + this.position);
    console.log("Age = " + this.age);
    console.log("Overal = " + Math.round(this.overal));
  }
}

// GAME CLASS
class Game {
  min;
  ot;
  constructor(min, ot) {
    this.min = min;
    this.ot = ot;
  }
/*
*
!-------- Method to simulate a game ---------!
*
*/
  playGame(home, away) {
    // Method to simulate game
    let posH = (this.min / 4) * 9;
    let posA = (this.min / 4) * 9;
    let plPosH = 0;
    let plPosA = 0;
    for (let i = 0; i < 12; i++) {
      //	console.log('Minutes inside class function = ' + home.minutes[i]+' '+home.minutes[i] / this.min * home.lineup[i].oaw /100);
      plPosH +=
        ((home.minutes[i] / this.min) * home.lineup[i].oaw) / 100 -
        ((away.minutes[i] / this.min) * away.lineup[i].daw) / 100;
    }
    for (let i = 0; i < 12; i++) {
      //	console.log('Minutes inside class function = ' + away.minutes[i]+' '+away.minutes[i] / this.min * away.lineup[i].oaw /100);
      plPosA +=
        ((away.minutes[i] / this.min) * away.lineup[i].oaw) / 100 -
        ((home.minutes[i] / this.min) * home.lineup[i].daw) / 100;
    }
    posH += Math.round(plPosH * 2);
    posA += Math.round(plPosA * 2);
    console.log(posH + " " + plPosH);
    console.log(posA + " " + plPosA);
	
	posH = 28;
	posA = 28;
	savePossesionCount.push(posH, posA);

    let attackers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // counts number of possesions for each player
    let shots = [0, 0, 0, 0]; // ins, 2pt, 3pt, ft shot count in total for a team
	let gameStats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // team pts, !empty!, team stl, team blk, 2ptm, 2pt, 3pt made, 3pt total, off reb home, def reb away, assistHome, assistsAway
    
	let homeTeamStats = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0]; //gm,pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA + RebTot,FgM,FgA,2ptM, 2ptA
	let awayTeamStats = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0]; //gm,pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA
	let homePlayerStats = Array(); // pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA + RebTot,FgM,FgA,2ptM, 2ptA + double,triple,quadruple
	let awayPlayerStats = Array(); // pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA + RebTot,FgM,FgA,2ptM, 2ptA + double,triple,quadruple
	for (let i=0; i<16; i++){
		homePlayerStats[i] = Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); // 24 elements
		awayPlayerStats[i] = Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		console.log(`homePlayerStats[${i}] values: ${homePlayerStats[i]}`);
		console.log(`awayPlayerStats[${i}] values: ${awayPlayerStats[i]}`);
	}
	
	// do HOME team attacks
	for (let i = 0; i < (posH*4) + home.teamUpgrades[5]; i++) {  // adds teamUpgrades[5] - opponent's teamUpgrades[6] 
		let counter = 0;
		let [attackersTemp, shotsTemp, gameStatsTemp, attackingTeamStatsTemp, defendingTeamStatsTemp, attackingPlayerStatsTemp, defendingPlayerStatsTemp] = this.doAttack(home, away);
		for(let i=0; i < 12; i++){
			attackers[i] += attackersTemp[i];
		}
		for(let i=0; i < 4; i++){
			shots[i] += shotsTemp[i];
		}
		for(let i=0; i < 12; i++){
			gameStats[i] += gameStatsTemp[i];
		}
		for(let i=0; i < 16; i++){
			homeTeamStats[i] += attackingTeamStatsTemp[i];
			awayTeamStats[i] += defendingTeamStatsTemp[i];
			//console.log(`homeTeamStats[i] values = ${homeTeamStats[i]}`);
			//console.log(`awayTeamStats[i] values = ${awayTeamStats[i]}`);
		}

		for(let i=0; i < home.minutes.length; i++){
      			for(let j = 0; j < 16; j++){
					homePlayerStats[i][j]+= attackingPlayerStatsTemp[i][j];
        			awayPlayerStats[i][j]+= defendingPlayerStatsTemp[i][j];
      			}
		}
	}
	
	// do AWAY team attacks
	for (let i = 0; i < (posA*4) + away.teamUpgrades[5]; i++) {// adds teamUpgrades[5] - opponent's teamUpgrades[6] 
		let [attackersTemp2, shotsTemp2, gameStatsTemp2, attackingTeamStatsTemp2, defendingTeamStatsTemp2, attackingPlayerStatsTemp2, defendingPlayerStatsTemp2] = this.doAttack(away, home);

		for(let i=0; i < 16; i++){
			homeTeamStats[i] += defendingTeamStatsTemp2[i];
			awayTeamStats[i] += attackingTeamStatsTemp2[i];
		}
	  
		for(let i=0; i < home.minutes.length; i++){
			for(let j = 0; j < 16; j++){
				homePlayerStats[i][j]+= defendingPlayerStatsTemp2[i][j];
				awayPlayerStats[i][j]+= attackingPlayerStatsTemp2[i][j];
			}
		}
	}
	
	
	// IF game is tied, OT is played
	while (homeTeamStats[0] == awayTeamStats[0]) {
		console.log(`OT IS PLAYED - ${homeTeamStats[0]} - ${awayTeamStats[0]}`);
		//document.querySelector(".btn-simGame").style.color = "red";
		for (let i = 0; i < 2 * this.ot; i++) { // each team will have 2* OT minutes possessions (NBA game = 10 possessions)
		
			let [attackersTemp, shotsTemp, gameStatsTemp, attackingTeamStatsTemp, defendingTeamStatsTemp, attackingPlayerStatsTemp, defendingPlayerStatsTemp] = this.doAttack(home, away);

			for(let i=0; i < 16; i++){
				homeTeamStats[i] += attackingTeamStatsTemp[i];
				awayTeamStats[i] += defendingTeamStatsTemp[i];
			}
			for(let i=0; i < home.minutes.length; i++){
				for(let j = 0; j < 16; j++){
					homePlayerStats[i][j]+= attackingPlayerStatsTemp[i][j];
        			awayPlayerStats[i][j]+= defendingPlayerStatsTemp[i][j];
				}
			}
	
			let [attackersTemp2, shotsTemp2, gameStatsTemp2, attackingTeamStatsTemp2, defendingTeamStatsTemp2, attackingPlayerStatsTemp2, defendingPlayerStatsTemp2] = this.doAttack(away, home);

			for(let i=0; i < 16; i++){
				homeTeamStats[i] += defendingTeamStatsTemp2[i];
				awayTeamStats[i] += attackingTeamStatsTemp2[i];
			}
			for(let i=0; i < home.minutes.length; i++){
				for(let j = 0; j < 16; j++){
					homePlayerStats[i][j]+= defendingPlayerStatsTemp2[i][j];
					awayPlayerStats[i][j]+= attackingPlayerStatsTemp2[i][j];
				}
			}
		}
	}
	
    console.log('PTS / REB / AST / STL / BLK');
    for(let i = 0; i < home.minutes.length; i++){
      console.log(`STATS ${home.lineup[i].name}:  ${homePlayerStats[i][0]} / ${homePlayerStats[i][1] + homePlayerStats[i][2]} / ${homePlayerStats[i][3]} / ${homePlayerStats[i][4]} / ${homePlayerStats[i][5]}`);
    }
    console.log('\n');
    for(let i = 0; i < home.minutes.length; i++){
      console.log(`STATS ${away.lineup[i].name}:  ${awayPlayerStats[i][0]} / ${awayPlayerStats[i][1] + awayPlayerStats[i][2]} / ${awayPlayerStats[i][3]} / ${awayPlayerStats[i][4]} / ${awayPlayerStats[i][5]}`);
    }

    console.log(`\n
    ${home.teamName}  ${homeTeamStats[0]} / ${homeTeamStats[1] + homeTeamStats[2]} / ${homeTeamStats[3]} / ${homeTeamStats[4]} / ${homeTeamStats[5]}
    ${away.teamName}  ${awayTeamStats[0]} / ${awayTeamStats[1] + awayTeamStats[2]} / ${awayTeamStats[3]} / ${awayTeamStats[4]} / ${awayTeamStats[5]}`);
    //  }
    let countPoints = 0;
    let countPointsAway = 0;
    for(let i = 0; i < home.minutes.length; i++){
      countPoints += homePlayerStats[i][0];
      countPointsAway += awayPlayerStats[i][0];
    }
    console.log(`\n
    countPoints = ${countPoints}
    countPointsAway = ${countPointsAway}`);
	
	// atting "RebTot,FgM,FgA,2ptM, 2ptA" to array  -> pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA + RebTot,FgM,FgA,2ptM, 2ptA
	for(let i=0; i < home.minutes.length; i++){
		//for(let j = 0; j < 5; j++){
			homePlayerStats[i][16] = homePlayerStats[i][1] + homePlayerStats[i][2]; //adds total rebounds to all plater stats
			awayPlayerStats[i][16] = awayPlayerStats[i][1] + awayPlayerStats[i][2];
			
			homePlayerStats[i][17] = homePlayerStats[i][8] + homePlayerStats[i][10] + homePlayerStats[i][12]; //adds total FG made to all plater stats
			awayPlayerStats[i][17] = awayPlayerStats[i][8] + awayPlayerStats[i][10] + awayPlayerStats[i][12];
			
			homePlayerStats[i][18] = homePlayerStats[i][9] + homePlayerStats[i][11] + homePlayerStats[i][13]; //adds total FG atempts to all plater stats
			awayPlayerStats[i][18] = awayPlayerStats[i][9] + awayPlayerStats[i][11] + awayPlayerStats[i][13];
			
			homePlayerStats[i][19] = homePlayerStats[i][8] + homePlayerStats[i][10]; //adds total 2PT made to all plater stats
			awayPlayerStats[i][19] = awayPlayerStats[i][8] + awayPlayerStats[i][10];
			
			homePlayerStats[i][20] = homePlayerStats[i][9] + homePlayerStats[i][11]; //adds total 2PT atempts to all plater stats
			awayPlayerStats[i][20] = awayPlayerStats[i][9] + awayPlayerStats[i][11];
			
			//homePlayerStats[i][21] = this.checkDoubleDouble(homePlayerStats[i]); 
			//awayPlayerStats[i][21] = this.checkDoubleDouble(awayPlayerStats[i]);
			let homeDoubleCheck = this.checkDoubleDouble(homePlayerStats[i]); 
			let awayDoubleCheck = this.checkDoubleDouble(awayPlayerStats[i]);
			console.log(`homeDoubleCheck = ${homeDoubleCheck}`);
			console.log(`awayDoubleCheck = ${awayDoubleCheck}`);
			
			if (homeDoubleCheck == 2) {
				homePlayerStats[i][21] = 1;
			} else if (homeDoubleCheck == 3) {
				homePlayerStats[i][21] = 1;
				homePlayerStats[i][22] = 1;
			} else if (homeDoubleCheck == 4) {
				homePlayerStats[i][21] = 1;
				homePlayerStats[i][22] = 1;
				homePlayerStats[i][23] = 1;
			}
		
			if(awayDoubleCheck == 2) { 
				awayPlayerStats[i][21] = 1; 
			} else if (awayDoubleCheck == 3) { 
				awayPlayerStats[i][21] = 1; 
				awayPlayerStats[i][22] = 1; 
			} else if (awayDoubleCheck == 4) { 
				awayPlayerStats[i][21] = 1; 
				awayPlayerStats[i][22] = 1; 
				awayPlayerStats[i][23] = 1; 
			}
			console.log(`homePlayerStats[i][21] = ${homePlayerStats[i][21]}`);
			//console.log(`${home.lineup[i].name} got ${homePlayerStats[i][21]}-double <> ${away.lineup[i].name} got ${awayPlayerStats[i][21]}-double`);
		//}
	}
	
	console.log(savePossesionCount);
	return [homeTeamStats, awayTeamStats, homePlayerStats, awayPlayerStats];
  }
  
  // method to check how many double digit stats a player got
	checkDoubleDouble (playerStats) {
		let points = playerStats[0];
		let rebounds = playerStats[16];
		let assists = playerStats[3];
		let steals = playerStats[4];
		let blocks = playerStats[5];
		// Initialize a count for categories where the player has 10 or more
		let doubleCount = 0;
		// Check if the player has 10 or more in any of the main categories
		if (points >= 10) doubleCount++;
		if (rebounds >= 10) doubleCount++;
		if (assists >= 10) doubleCount++;
		if (steals >= 10) doubleCount++;
		if (blocks >= 10) doubleCount++;
		
		return doubleCount;
	}
  
	/*
	*
	!-------- Method to simulate attack ---------!
	*
	*/
	doAttack(home, away){
      let counter = 0;
		let attackers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // counts number of possesions for each player
		let shots = [0, 0, 0, 0]; // ins, 2pt, 3pt, ft shot count in total for a team
		let gameStats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // team pts, !empty!, team stl, team blk, 2ptm, 2pta, 3pt made, 3pt total, off reb home, def reb away, assistHome, assistAway
		let attackingTeamStats = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0]; //pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA
		let defendingTeamStats = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0]; //pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA
		let attackingPlayerStats = Array ();
		let defendingPlayerStats = Array ();
		for (let i=0; i<16; i++){
			attackingPlayerStats[i] = Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			defendingPlayerStats[i] = Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		}

      do {
        let z = Math.floor(Math.random() * 48);
        let x = Math.floor(Math.random() * home.lineup.length);
        if (z <= home.minutes[x]) {
          if (home.minutes[x] > 0) {
            let y = Math.floor(Math.random() * 99);
            if (y <= home.lineup[x].oaw) {
              let shotSelected = 0;

              let [value1, value2, value3, value4] = this.checkSteal(x, home, away); // Checks if stolen ball

              if (value3 == 1) {
				//gameStats[2]++;
				defendingTeamStats[4]++; // steal added
				attackingTeamStats[6]++; // turnover added
				defendingPlayerStats[value2][4]++; // adds steal to a player
				attackingPlayerStats[value1][6]++; // turnover for a player added
				console.log(`defendingPlayerStats[value2][4] value = ${defendingPlayerStats[value2][4]}`);
                shotSelected = 1;
              } else {
                // Checks if shot is blocked
                do {
                  let [value1, value2, value3, value4] = this.checkBlock(x, home, away);

                  if (value3 == 1) {
					//gameStats[3]++;
					defendingTeamStats[5]++; // block added
					defendingPlayerStats[value2][5]++; // adds block to a player
					shotSelected = 1; // skips selecting/taking shot because it was blocked
                  } else {
					  
					  let [shotTaken, selectedShotType, pointsScored] = this.takeShot(x, home, away); // simulates a shot
					  if(shotTaken !== 0){
						shots[selectedShotType-1]++;
						//gameStats[0] += pointsScored;
						attackingTeamStats[0] += pointsScored; //points to attacking team added
						attackingPlayerStats[x][0] += pointsScored; //inside shot attempted
						
						if(selectedShotType == 1){ // !!! INSIDE SHOT
							//gameStats[5]++;
							attackingTeamStats[9]++; //inside shot attempted
							attackingPlayerStats[x][9]++; //inside shot attempted
							if(pointsScored == 2){
								//gameStats[4]++;
								attackingTeamStats[8]++; // Inside shot made for team
								attackingPlayerStats[x][8]++; // Inside shot made for player
								let [isAssist, assisterPlayer] = this.makeAssist (x, home, away);
								if(isAssist == 1){
									//gameStats[10]++;
									attackingTeamStats[3]++; // add assist to team
									attackingPlayerStats[assisterPlayer][3]++; // add assist to player
								}
							} else if(pointsScored == 0){
								console.log(`SHOT MISSED by ${home.lineup[x].name}`);
								let [teamNr, playerNr] = this.getRebound(home, away);
								if (teamNr == 1){ // attacing team gets offensive rebound
									//gameStats[8]++;
									attackingTeamStats[1]++; // offensive rebound for team
									attackingPlayerStats[playerNr][1]++; // offensive rebound for player
									let [attackersTemp, shotsTemp, gameStatsTemp] = this.doAttack(home, away);
									for(let i=0; i < 12; i++){
										attackers[i] += attackersTemp[i];
									}
									for(let i=0; i < 4; i++){
										shots[i] += shotsTemp[i];
									}
									for(let i=0; i < 10; i++){
										gameStats[i] += gameStatsTemp[i];
									}
								} else if (teamNr == 2){ // defending team gets defensive rebound
									//gameStats[9]++;
									defendingTeamStats[2]++; //defensive rebound for team
									defendingPlayerStats[playerNr][2]++; // defensive rebound for player
								}
							}
						} else if (selectedShotType == 2){  // !!! 2 POINTER
							//gameStats[5]++;
							attackingTeamStats[11]++; //2 PT shot attempted for team
							attackingPlayerStats[x][11]++; //2 PT shot attempted for player
							if(pointsScored == 2){
								//gameStats[4]++;
								attackingTeamStats[10]++; // Inside shot made for team
								attackingPlayerStats[x][10]++; // Inside shot made for player
								let [isAssist, assisterPlayer] = this.makeAssist (x, home, away);
								if(isAssist == 1){
									//gameStats[10]++;
									attackingTeamStats[3]++; // add assist to team
									attackingPlayerStats[assisterPlayer][3]++; // add assist to player
								}
							} else if(pointsScored == 0){
								console.log(`SHOT MISSED by ${home.lineup[x].name}`);
								let [teamNr, playerNr] = this.getRebound(home, away);
								if (teamNr == 1){ // attacing team gets offensive rebound
									//gameStats[8]++;
									attackingTeamStats[1]++; // offensive rebound for team
									attackingPlayerStats[playerNr][1]++; // offensive rebound for player
									let [attackersTemp, shotsTemp, gameStatsTemp] = this.doAttack(home, away);
									for(let i=0; i < 12; i++){
										attackers[i] += attackersTemp[i];
									}
									for(let i=0; i < 4; i++){
										shots[i] += shotsTemp[i];
									}
									for(let i=0; i < 10; i++){
										gameStats[i] += gameStatsTemp[i];
									}
								} else if (teamNr == 2){ // defending team gets defensive rebound
									//gameStats[9]++;
									defendingTeamStats[2]++; //defensive rebound for team
									defendingPlayerStats[playerNr][2]++; // defensive rebound for player
								}
							}
						} else if(selectedShotType == 3){  // !!! 3 POINTER
							//gameStats[7]++;
							attackingTeamStats[13]++; //3 PT shot attempted for team
							attackingPlayerStats[x][13]++; //3 PT shot attempted for player
							if(pointsScored == 3){
								//gameStats[6]++;
								attackingTeamStats[12]++; // Inside shot made for team
								attackingPlayerStats[x][12]++; // Inside shot made for player
								let [isAssist, assisterPlayer] = this.makeAssist (x, home, away);
								if(isAssist == 1){
									//gameStats[10]++;
									attackingTeamStats[3]++; // add assist to team
									attackingPlayerStats[assisterPlayer][3]++; // add assist to player
								}
							} else if(pointsScored == 0){
								console.log(`SHOT MISSED by ${home.lineup[x].name}`);
								let [teamNr, playerNr] = this.getRebound(home, away);
								if (teamNr == 1){ // attacing team gets offensive rebound
									//gameStats[8]++;
									attackingTeamStats[1]++; // offensive rebound for team
									attackingPlayerStats[playerNr][1]++; // offensive rebound for player
									let [attackersTemp, shotsTemp, gameStatsTemp] = this.doAttack(home, away);
									for(let i=0; i < 12; i++){
										attackers[i] += attackersTemp[i];
									}
									for(let i=0; i < 4; i++){
										shots[i] += shotsTemp[i];
									}
									for(let i=0; i < 10; i++){
										gameStats[i] += gameStatsTemp[i];
									}
								} else if (teamNr == 2){ // defending team gets defensive rebound
									//gameStats[9]++;
									defendingTeamStats[2]++; //defensive rebound for team
									defendingPlayerStats[playerNr][2]++; // defensive rebound for player
								}
							}
						} else if(selectedShotType == 4){ // !!! FREE THROW
							attackingTeamStats[15] += 2; //Free Throw shot attempted
							attackingPlayerStats[x][15] += 2; //Free Throw shot attempted
							if(pointsScored == 0 || shotTaken == 2){
								attackingTeamStats[14] += pointsScored; //Free Throw shot made
								attackingPlayerStats[x][14] += pointsScored; //Free Throw shot made
								let [teamNr, playerNr] = this.getRebound(home, away);
								if (teamNr == 1){ // attacing team gets offensive rebound
									//gameStats[8]++;
									attackingTeamStats[1]++; // offensive rebound for team
									attackingPlayerStats[playerNr][1]++; // offensive rebound for player
									let [attackersTemp, shotsTemp, gameStatsTemp] = this.doAttack(home, away);
									for(let i=0; i < 12; i++){
										attackers[i] += attackersTemp[i];
									}
									for(let i=0; i < 4; i++){
										shots[i] += shotsTemp[i];
									}
									for(let i=0; i < 10; i++){
										gameStats[i] += gameStatsTemp[i];
									}
								} else if (teamNr == 2){ // defending team gets defensive rebound
									//gameStats[9]++;
									defendingTeamStats[2]++; //defensive rebound for team
									defendingPlayerStats[playerNr][2]++; // defensive rebound for player
								}
							} else { // both free throws made
								attackingTeamStats[14] += pointsScored; //Free Throw shot made
								attackingPlayerStats[x][14] += pointsScored; //Free Throw shot made
							}
						}
						shotSelected = 1;
					  }

                  }
                } while (shotSelected == 0);
              }
			  console.log('------------------------------');
              counter++;
              attackers[x]++;
            }
          }
        }
      } while (counter < 1);
	  return [attackers, shots, gameStats, attackingTeamStats, defendingTeamStats, attackingPlayerStats, defendingPlayerStats];
	}
	
	/*
	*
	!-------- Method to simulate an assist ---------!
	*
	*/
	makeAssist (x, attackTeam, defenceTeam){
		let attAssistChanceTotal = 0;
		let defChanceTotal = 0;;
		let assist = 0;;
		let randAssist = Math.floor(Math.random() * 99)+1;
		let assistFound = 0;
		
		for (let i = 0; i < attackTeam.minutes.length; i++) {
			attAssistChanceTotal = attAssistChanceTotal + (attackTeam.minutes[i] * (attackTeam.lineup[i].pas*2 + attackTeam.lineup[i].spe*0.2 + attackTeam.lineup[i].dri*0.3));
		}
		attAssistChanceTotal = (attAssistChanceTotal / 35640) * 150;
		
		for (let i = 0; i < defenceTeam.minutes.length; i++) {
			defChanceTotal = defChanceTotal + (defenceTeam.minutes[i] * (defenceTeam.lineup[i].spe + defenceTeam.lineup[i].qui*0.2 + defenceTeam.lineup[i].daw*0.3));
		}
		defChanceTotal = (defChanceTotal / 35640) * 40;
		assist = Math.floor(attAssistChanceTotal - defChanceTotal);
		//console.log(`ASSIST CHANCE for the attacking team: ${attAssistChanceTotal} / ${defChanceTotal} = ${assist}`);
		if(assist >= randAssist){
			do {
				let rand1 = Math.floor(Math.random() * 107396) + 1; // 107396
				let findAssister = Math.floor(Math.random() * attackTeam.minutes.length);
				let assistSkills =
				(attackTeam.lineup[findAssister].pas * 20 +
				attackTeam.lineup[findAssister].spe * 1.1 +
				attackTeam.lineup[findAssister].dri * 1.5) *
				attackTeam.minutes[findAssister];
				console.log(`Find assister -> ${assistSkills} / ${rand1}`);
				if (assistSkills >= rand1 && findAssister != x) {
					assistFound++;
					console.log(`%cASSIST BY ${attackTeam.lineup[findAssister].name} !!!`, "color:red"); //"%cThis is a green text", "color:green"
					return [1, findAssister];
				}
			} while (assistFound == 0);
		} else 
			return [0, 0];
	}
	/*
	*
	!-------- Method to simulate a rebound ---------!
	*
	*/
	getRebound(attackTeam, defenceTeam){
		// ore / dre + jum*0.2 str*0.3
		let attOffRebChanceTotal = 0;
		let defDefRebChanceTotal = 0;;
		let attOffReb = 0;;
		let randRebound = Math.floor(Math.random() * 99)+1;
		let rebounderFound = 0;
		
		for (let i = 0; i < attackTeam.minutes.length; i++) {
			attOffRebChanceTotal = attOffRebChanceTotal + (attackTeam.minutes[i] * (attackTeam.lineup[i].ore + attackTeam.lineup[i].jum*0.2 + attackTeam.lineup[i].str*0.3));
		}
		attOffRebChanceTotal = (attOffRebChanceTotal / 35640) * 100;
		
		for (let i = 0; i < defenceTeam.minutes.length; i++) {
			defDefRebChanceTotal = defDefRebChanceTotal + (defenceTeam.minutes[i] * (defenceTeam.lineup[i].dre + defenceTeam.lineup[i].jum*0.2 + defenceTeam.lineup[i].str*0.3));
		}
		defDefRebChanceTotal = (defDefRebChanceTotal / 35640) * 40;
		attOffReb = Math.floor(attOffRebChanceTotal - defDefRebChanceTotal);
		//console.log(`Off reb chance = ${attOffRebChanceTotal} / ${defDefRebChanceTotal}  -  ${attOffReb}\nrandRebound = ${randRebound}`);
		if(attOffReb >= randRebound){
			//console.log(`Offensive rebound!!!`);
			
			do {
				let rand1 = Math.floor(Math.random() * 31392) + 1;
				let findOffRebounder = Math.floor(Math.random() * attackTeam.minutes.length);
				let offRebounderSkills =
				(attackTeam.lineup[findOffRebounder].ore * 4 +
				attackTeam.lineup[findOffRebounder].jum * 1.1 +
				attackTeam.lineup[findOffRebounder].str * 1.5) *
				attackTeam.minutes[findOffRebounder];

				if (offRebounderSkills >= rand1) {
					rebounderFound++;
					console.log(`%cOFFENSIVE REBOUND BY ${attackTeam.lineup[findOffRebounder].name} !!!`, "color:green"); //"%cThis is a green text", "color:green"
					return [1, findOffRebounder];
				}
			} while (rebounderFound == 0);
			
		} else if (attOffReb < randRebound){
			do {
				let rand1 = Math.floor(Math.random() * 31392) + 1;
				let findDefRebounder = Math.floor(Math.random() * defenceTeam.minutes.length);
				let defRebounderSkills =
				(defenceTeam.lineup[findDefRebounder].ore * 4 +
				defenceTeam.lineup[findDefRebounder].jum * 1.1 +
				defenceTeam.lineup[findDefRebounder].str * 1.5) *
				defenceTeam.minutes[findDefRebounder];

				if (defRebounderSkills >= rand1) {
					rebounderFound++;
					console.log(`DEFENSIVE REBOUND BY ${defenceTeam.lineup[findDefRebounder].name} !!!`);
					return [2, findDefRebounder];
				}
			} while (rebounderFound == 0);
			return [0, 0];
		}
	}
	
	/*
	*
	!-------- Method to simulate a shot ---------!
	*
	*/
	takeShot (x, attackTeam, defenceTeam){
		let shots = [0, 0, 0, 0];
		let shotSelected;
		let randShot = Math.floor(Math.random()*99) +1;
	if (
		  attackTeam.lineup[x].position == "C" ||
		  attackTeam.lineup[x].position == "PF"
		) {
		  let shotType = Math.floor(Math.random() * 4) + 1; // which shot type
		  let shotRatingNeeded = Math.floor(Math.random() * 99) + 1; // check if that shot type has enough skill to be done
		  if (shotType == 1 && attackTeam.lineup[x].ins * 1.3 >= shotRatingNeeded) {
			console.log(attackTeam.lineup[x].name + " Inside shot!");
			shots[0]++;
			shotSelected = 1;
			if (attackTeam.lineup[x].ins >= randShot){
				console.log('  -->  Inside shot is made!!!');
				return [1, 1, 2];
			}
			else {
				console.log('  -->  Inside shot missed...');
				return [1, 1, 0];
			}
		  } else if (
			shotType == 2 &&
			attackTeam.lineup[x].pt2 * 0.5 >= shotRatingNeeded
		  ) {
			console.log(attackTeam.lineup[x].name + " 2 Pointer shot!");
			shots[1]++;
			shotSelected = 1;
			if (attackTeam.lineup[x].pt2/1.8 >= randShot){
				console.log('  -->  2 point shot shot is made!!!');
				return [1, 2, 2];
			}
			else {
				console.log('  -->  2 point shot shot missed...');
				return [1, 2, 0];
			}
		  } else if (
			shotType == 3 &&
			attackTeam.lineup[x].pt3 * 1.5 >= shotRatingNeeded
		  ) {
			console.log(attackTeam.lineup[x].name + " 3 Pointer shot!");
			shots[2]++;
			shotSelected = 1;
			if (attackTeam.lineup[x].pt3/1.8 >= randShot){
				console.log('  -->  3 point shot shot is made!!!');
				return [1, 3, 3];
			}
			else {
				console.log('  -->  3 point shot shot missed...');
				return [1, 3, 0];
			}
		  } else if (shotType == 4 && attackTeam.lineup[x].ft * 0.5 >= shotRatingNeeded) {
			console.log(attackTeam.lineup[x].name + " Free throw shot!");
			shots[3]++;
			shotSelected = 1;
			let freeThrows = [0, 0];
			for(let i = 0; i<2;i++){
				randShot = Math.floor(Math.random()*100) +1;
				if (attackTeam.lineup[x].ft >= randShot){
					console.log(`  -->  ${freeThrows[0]+1}. Free throw shot shot is made!!!`);
					freeThrows[0]++;
				} else {
					console.log(`  -->  ${freeThrows[0]+1}. Free throw shot missed...`);
					if(i == 1){
						freeThrows[1] = 1;;
					}
				}
			}
			if (freeThrows[0] == 1 && freeThrows[1] == 0){
				return [1, 4, 1];
			} else if (freeThrows[0] == 2 && freeThrows[1] == 0){
				return [1, 4, 2];
			}
			else if (freeThrows[0] == 0){
				return [1, 4, 0];
			} else if (freeThrows[0] == 1 && freeThrows[1] == 1){
				console.log(`SECOND FREE THROW MISSED`);
				return [2, 4, 1];
			}
			
		  } else {
				console.log('No shot selected');
				return [0, 0, 0];
		  }
		  
		} else {
		  let shotType = Math.floor(Math.random() * 4) + 1; // which shot type
		  let shotRatingNeeded = Math.floor(Math.random() * 99) + 1; // check if that shot type has enough skill to be done

		  if (
			shotType == 1 &&
			attackTeam.lineup[x].ins * 0.8 >= shotRatingNeeded
		  ) {
			console.log(attackTeam.lineup[x].name + " Inside shot!");
			shots[0]++;
			shotSelected = 1;
			if (attackTeam.lineup[x].ins >= randShot){
				console.log('  -->  Inside shot is made!!!');
				return [1, 1, 2];
			}
			else {
				console.log('  -->  Inside shot missed...');
				return [1, 1, 0];
			}
		  } else if (
			shotType == 2 &&
			attackTeam.lineup[x].pt2 * 0.5 >= shotRatingNeeded
		  ) {
			console.log(attackTeam.lineup[x].name + " 2 Pointer shot!");
			shots[1]++;
			shotSelected = 1;
			if (attackTeam.lineup[x].pt2/1.8  >= randShot){
				console.log('  -->  2 point shot shot is made!!!');
				return [1, 2, 2];
			}
			else {
				console.log('  -->  2 point shot shot missed...');
				return [1, 2, 0];
			}
		  } else if (
			shotType == 3 &&
			attackTeam.lineup[x].pt3 * 1.8 >= shotRatingNeeded
		  ) {
			console.log(attackTeam.lineup[x].name + " 3 Pointer shot!");
			shots[2]++;
			shotSelected = 1;
			if (attackTeam.lineup[x].pt3/1.8 >= randShot){
				console.log('  -->  3 point shot shot is made!!!');
				return [1, 3, 3];
			}
			else {
				console.log('  -->  3 point shot shot missed...');
				return [1, 3, 0];
			}
		  } else if (
			shotType == 4 &&
			attackTeam.lineup[x].ft * 0.5 >= shotRatingNeeded
		  ) {
			console.log(attackTeam.lineup[x].name + " Free throw shot!");
			shots[3]++;
			shotSelected = 1;
			let freeThrows = [0, 0];
			for(let i = 0; i<2;i++){
				randShot = Math.floor(Math.random()*100) +1;
				if (attackTeam.lineup[x].ft >= randShot){
					console.log(`  -->  ${freeThrows[0]+1}. Free throw shot shot is made!!!`);
					freeThrows[0]++;
				} else {
					console.log(`  -->  ${freeThrows[0]+1}. Free throw shot missed...`);
					if(i == 1){
						freeThrows[1] = 1;;
					}
				}
			}
			if (freeThrows[0] == 1 && freeThrows[1] == 0){
				return [1, 4, 1];
			} else if (freeThrows[0] == 2 && freeThrows[1] == 0){
				return [1, 4, 2];
			}
			else if (freeThrows[0] == 0){
				return [1, 4, 0];
			} else if (freeThrows[0] == 1 && freeThrows[1] == 1){
				console.log(`SECOND FREE THROW MISSED`);
				return [2, 4, 1];
			}
			
		  } else {
			  console.log('No shot selected');
			  return [0, 0, 0];
		  }
		}
	}

	/*
	*
	!-------- Method to simulate if ball is stolen ---------!
	*
	*/
  checkSteal(attacker, homeTeam, awayTeam) {
	  
    let ballSecuring = (homeTeam.lineup[attacker].dri + (homeTeam.lineup[attacker].pas * 0.2) + (homeTeam.lineup[attacker].qui * 0.3)) * 500;
		let awayTeamDefenceUpgrade = (awayTeam.teamUpgrades[6] == 0) ? 0 : (awayTeam.teamUpgrades[6]/10); // adds extra steal chance if the defending deam has DEFENCE boost in Team Upgrades
        let rand1 = Math.floor(Math.random() * ballSecuring) + 1; // max = 15111,36
        let findStealer = Math.floor(Math.random() * awayTeam.minutes.length);
        let stealersSkills =
          (awayTeam.lineup[findStealer].stl * (awayTeam.lineup[findStealer].stl / 30) +
            awayTeam.lineup[findStealer].daw * (0.7 + awayTeamDefenceUpgrade) +
            awayTeam.lineup[findStealer].qui * 0.2) *
          awayTeam.minutes[findStealer];

        if (stealersSkills >= rand1) {
        //  stealerFound++;
             console.log(
               `Ball STOLEN from ${homeTeam.lineup[attacker].name} by ${awayTeam.lineup[findStealer].name} !!!`
             );
          return [attacker, findStealer, 1, 1];
        }
		else {
			return [0, 0, 0, 0]; // RETURNS attacking player, defending player, 1/0 lost ball, 1/0 stolen ball
		}
  }
	/*
	*
	!-------- Method to simulate if shot is blocked ---------!
	*
	*/
  checkBlock (attacker, homeTeam, awayTeam) {
		let awayTeamDefenceUpgrade = (awayTeam.teamUpgrades[6] == 0) ? 0 : (awayTeam.teamUpgrades[6]/5); // adds extra BLOCK chance if the defending deam has DEFENCE boost in Team Upgrades
        let rand1 = Math.floor(Math.random() * 60000) + 1; // 52747 is times 3
        let findBlocker = Math.floor(Math.random() * awayTeam.minutes.length);
		let blockerHeightIndex = (awayTeam.lineup[findBlocker].height <= 180) ? 1 : awayTeam.lineup[findBlocker].height % 180;
        let blockersSkills =
          (awayTeam.lineup[findBlocker].blk * (awayTeam.lineup[findBlocker].blk / 30) + 
            awayTeam.lineup[findBlocker].daw * (0.1 + awayTeamDefenceUpgrade) +
            awayTeam.lineup[findBlocker].jum * 0.3 +
			blockerHeightIndex ) *
          awayTeam.minutes[findBlocker];

        if (blockersSkills >= rand1) {
          console.log(
            `${homeTeam.lineup[attacker].name}'s shot BLOCKED by ${awayTeam.lineup[findBlocker].name} !!!`
          );
          return [attacker, findBlocker, 1, 1];
        } else {
			return [0, 0, 0, 0]; // RETURNS attacking player, defending player, 1/0 lost shot, 1/0 blocked shot
		}
    }
}
 // \r\n - put in one line
// countryName / population 1-10 / basketball popularity 1-2000 / playerQuality 1-100
let country1 = new Country('USA', 9, 2000, 80,
['Alan','Arnold','Liam','Noah','Oliver','James','Elijah','Mateo','Theodore','Henry','Lucas','William','Benjamin','Levi','Sebastian','Ezra','Michael','Daniel','Leo','Owen','Samuel','Hudson','Asher','Luca','Ethan','John','David','Jackson','Joseph','Mason','Luke','Matthew','Julian','Dylan','Elias','Jacob','Maverick','Gabriel','Logan','Aiden','Thomas','Isaac','Miles','Grayson','Santiago','Anthony','Wyatt','Carter','Jayden','Ezekiel','Caleb','Cooper','Josiah','Charles','Christopher','Isaiah','Nolan','Cameron','Nathan','Joshua','Kai','Waylon','Angel','Lincoln','Andrew','Roman','Adrian','Aaron','Wesley','Ian','Thiago','Axel','Brooks','Bennett','Weston','Rowan','Christian','Theo','Beau','Eli','Silas','Jonathan','Ryan','Leonardo','Walker','Jaxon','Micah','Everett','Robert','Enzo','Parker','Jeremiah','Jose','Colton','Luka','Easton','Landon','Jordan','Amir','Gael','Austin','Adam','Jameson','August','Xavier','Myles','Dominic','Damian','Nicholas','Jace','Carson','Atlas','Adriel','Kayden','Hunter','River','Greyson','Emmett','Harrison','Vincent','Milo','Jasper','Giovanni','Jonah','Zion','Connor','Sawyer','Arthur','Ryder','Archer','Lorenzo','Declan','Emiliano','Luis','Diego','George','Evan','Jaxson','Carlos','Graham','Juan','Kingston','Nathaniel','Matteo','Legend','Malachi','Jason','Leon','Dawson','Bryson','Amari','Calvin','Ivan','Chase','Cole','Ashton','Ace','Arlo','Dean','Brayden','Jude','Hayden','Max','Matias','Rhett','Jayce','Elliott','Alan','Braxton','Kaiden','Zachary','Jesus','Emmanuel','Adonis','Charlie','Judah','Tyler','Elliot','Antonio','Emilio','Camden','Stetson','Maxwell','Ryker','Justin','Kevin','Messiah','Finn','Bentley','Ayden','Zayden','Felix','Nicolas','Miguel','Maddox','Beckett','Tate','Caden','Beckham','Andres','Alejandro','Alex','Jesse','Brody','Tucker','Jett','Barrett','Knox','Hayes','Peter','Timothy','Joel','Edward','Griffin','Xander','Oscar','Victor','Abraham','Brandon','Abel','Richard','Callum','Riley','Patrick','Karter','Malakai','Eric','Grant','Israel','Milan','Gavin','Rafael','Tatum','Kairo','Elian','Kyrie','Louis','Lukas','Javier','Nico','Avery','Rory','Aziel','Ismael','Jeremy','Zayn','Cohen','Simon','Marcus','Steven','Mark','Dallas','Tristan','Lane','Blake','Paul','Paxton','Bryce','Nash','Crew','Kash','Kenneth','Omar','Colt','Lennox','King','Walter','Emerson','Phoenix','Jaylen','Derek','Muhammad','Ellis','Kaleb','Preston','Jorge','Zane','Kayson','Cade','Tobias','Otto','Kaden','Remington','Atticus','Finley','Holden','Jax','Cash','Martin','Ronan','Maximiliano','Malcolm','Romeo','Josue','Francisco','Bodhi','Cyrus','Koa','Angelo','Aidan','Jensen','Erick','Hendrix','Warren','Bryan','Cody','Leonel','Onyx','Ali','Andre','Jaziel','Clayton','Saint','Dante','Reid','Casey','Brian','Gideon','Niko','Maximus','Colter','Kyler','Brady','Zyaire','Cristian','Cayden','Harvey','Cruz','Dakota','Damien','Manuel','Anderson','Cairo','Colin','Joaquin','Ezequiel','Karson','Callan','Briggs','Khalil','Wade','Jared','Fernando','Ari','Colson','Kylian','Archie','Banks','Bowen','Kade','Daxton','Jaden','Rhys','Sonny','Zander','Eduardo','Iker','Sullivan','Bradley','Raymond','Odin','Spencer','Stephen','Prince','Brantley','Killian','Kamari','Cesar','Dariel','Eithan','Mathias','Ricardo','Orion','Titus','Luciano','Rylan','Pablo','Chance','Travis','Kohen','Marco','Jay','Malik','Hector','Edwin','Armani','Bodie','Shiloh','Marshall','Remy','Russell','Baylor','Kameron','Tyson','Grady','Oakley','Baker','Winston','Kane','Julius','Desmond','Royal','Sterling','Mario','Kylo','Sergio','Jake','Kashton','Shepherd','Franklin','Ibrahim','Ares','Koda','Lawson','Hugo','Kyle','Kyson','Kobe','Pedro','Santino','Wilder','Sage','Raiden','Damon','Nasir','Sean','Forrest','Kian','Reed','Tanner','Jalen','Apollo','Zayne','Nehemiah','Edgar','Johnny','Clark','Eden','Gunner','Isaias','Esteban','Hank','Alijah','Solomon','Wells','Sutton','Royce','Callen','Reece','Gianni','Noel','Quinn','Raphael','Corbin','Erik','Tripp','Atreus','Francis','Kayce','Callahan','Devin','Troy','Sylas','Fabian','Zaire','Donovan','Johnathan','Frank','Lewis','Moshe','Adan','Alexis','Tadeo','Ronin','Marcos','Kieran','Leonidas','Bo','Kendrick','Ruben','Camilo','Garrett','Matthias','Emanuel','Jeffrey','Collin','Lucian','Augustus','Memphis','Rowen','Yusuf','Finnegan','Makai','Lionel','Caiden','Rodrigo','Uriel','Lucca','Philip','Andy','Kaison','Jaiden','Porter','Jasiah','Ridge','Frederick','Amiri','Rocco','Asa','Ayaan','Kason','Denver','Dalton','Major','Valentino','Allen','Kolton','Zaiden','Ariel','Rome','Ford','Leland','Marcelo',
'Seth','Jamir','Leandro','Miller','Roberto','Alessandro','Gregory','Hezekiah','Jonas','Cassian','Deacon','Jaxton','Keanu','Alonzo','Moises','Conrad','Drew','Bruce','Mohamed','Anakin','Soren','Mack','Pierce','Kylan','Princeton','Zain','Trevor','Morgan','Ozzy','Roy','Dominick','Shane','Hamza','Moses','Dax','Lawrence','Ander','Ledger','Enrique','Rayan','Johan','Saul','Jamari','Armando','Kaysen','Samson','Azariah','Maximilian','Rio','Braylen','Julio','Mohammad','Cassius','Kasen','Maximo','Omari','Clay','Izaiah','Lian','Emir','Jaime','Samir','Gerardo','Kaizen','Zachariah','Jayson','Albert','Taylor','Sincere','Cillian','Gunnar','Boone','Raul','Jamie','Jayceon','Scott','Westin','Danny','Arjun','Kamden','Colby','Peyton','Koen','Nikolai','Dorian','Ocean','Louie','Layton','Ronald','Jase','Kyro','Benson','Davis','Huxley','Kenzo','Conor','Mohammed','Arturo','Phillip','Augustine','Reign','Yosef','Kareem','Keegan','Vicente','Salem','Reese','Fletcher','Shawn','Braylon','Alden','Julien','Cannon','Chaim','Gustavo','Boston','Zeke','Eliam','Corey','Dennis','Madden','Marvin','Elio','Krew','Ahmed','Layne','Nikolas','Mac','Otis','Harlan','Azriel','Emmitt','Brixton','Donald','Musa','Amos','Jamison','Dario','Roland','Zakai','Aarav','Caspian','Finnley','Raylan','Mauricio','Briar','Wilson','Chosen','Sam','Tru','Trace','Waylen','Quincy','Santana','Creed','Jakari','Westley','Amias','Azrael','Drake','Duke','Ahmad','Axton','Chandler','Hassan','Houston','Tommy','Eliseo','Dustin','Leonard','Kyree','Truett','Abdiel','Azael','Ezrah','Zamir','Dexter','Salvador','Uriah','Ryland','Zyair','Karim','Lee','Rhodes','Bruno','Case','Mylo','Valentin','Abram','Avyaan','Cal','Keith','Alvaro','Enoch','Trey','Clyde','Nathanael','Khai','Rex','Zaid','Dutton','Skyler','Tomas','Wylder','Darius','Crue','Jakai','Zayd','Gage','Riggs','Wayne','Jiraiya','Junior','Aryan','Carmelo','Conner','Alberto','Alfredo','Loyal','Douglas','Vincenzo','Aron','Casen','Forest','Avi','Bellamy','Emery','Bridger','Brock','Misael','Lennon','Zahir','Boden','Derrick','Dilan','Roger','Marcel','Rayden','Jefferson','Alvin','Kaiser','Blaze','Dillon','Magnus','Quentin','Ray','Dakari','Lachlan','Ty','Abdullah','Chris','Orlando','Yael','Gian','Benicio','Franco','Evander','Flynn','Harry','Robin','Sevyn','Hugh','Aries','Cason','Idris','Ambrose','Issac','Yehuda','Brycen','Cayson','Rey','Santos','Ben','Nelson','Wes','Westyn','Khaza','Bjorn','Kiaan','Seven','Watson','Gatlin','Izael','Stanley','Allan','Jahmir','Landen','Neil','Quinton','Chozen','Noe','Reuben','Damir','Bear','Jimmy','Kannon','Lance','Melvin','Remi','Yousef','Lochlan','Arian','Kenji','Khari','Rohan','Legacy','Edison','Emory','Rudy','Eliel','Aden','Byron','Dereck','Everest','Yahir','Guillermo','Alec','Brodie','Massimo','Mitchell','Anders','Alonso','Jaxxon','Tony','Jireh','Kingsley','Jerry','Ayan','Brayan','Ramon','Jagger','Elisha','Vihaan','Teo','Eddie','Judson','Leif','Trenton','Grey','Joziah','Felipe','Jesiah','Zyon','Kyaire','Ernesto','Ishaan','Matheo','Ricky','Fisher','Keaton','Kylen','Marcellus','Izan','Leroy','Jedidiah','Ignacio','Ira','Zev','Mustafa','Yahya','Aurelio','Brendan','Calum','Jericho','Nixon','Demetrius','Eiden','Rocky','Langston','Jovanni','Mathew','Landyn','Murphy','Axl','Dane','Jrue','Justice','Kellan','Semaj','Thaddeus','Curtis','Dash','Zavier','Devon','Joe','Joey','Jon','Harlem','Jairo','Ryatt','Salvatore','Van','Zechariah','Coleson','Eugene','Kellen','Alistair','Colten','Jabari','Lucien','Castiel','Cain','Harold','Alfred','Benedict','Shmuel','Duncan','Ermias','Yadiel','Imran','Kaisen','Zen','Eren','Kolson','Kye','Jasiel','Kyren','Marlon','Palmer','Adler','Aldo','Meir','Osiris','Ameer','Kartier','Wesson','Ahmir','Mordechai','Nova','Randy','Shepard','Talon','Vance','Asaiah','Boaz','Kenai','Jones','Carl','Stefan','Deandre','Kelvin','Leighton','Yaakov','Foster','Rishi','Yisroel','Darwin','Neo','Titan','Maurice','Mccoy','Alfonso','Henrik','Jeremias','Kole','Mael','True','Veer','Jadiel','Karsyn','Mekhi','Atharv','Darren','Eliezer','Gordon','Mikael','Stone','Wren','Ephraim','Osman','Ulises','Kody','Thatcher','Abner','Cullen','Damari','Hollis'], 
['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts','Gomez','Phillips','Evans','Turner','Diaz','Parker','Cruz','Edwards','Collins','Reyes','Stewart','Morris','Morales','Murphy','Cook','Rogers','Gutierrez','Ortiz','Morgan','Cooper','Peterson','Bailey','Reed','Kelly','Howard','Ramos','Kim','Cox','Ward','Richardson','Watson','Brooks','Chavez','Wood','James','Bennett','Gray','Mendoza','Ruiz','Hughes','Price','Alvarez','Castillo','Sanders','Patel','Myers','Long','Ross','Foster','Jimenez','Powell','Jenkins','Perry','Russell','Sullivan','Bell','Coleman','Butler','Henderson','Barnes','Gonzales','Fisher','Vasquez','Simmons','Romero','Jordan','Patterson','Alexander','Hamilton','Graham','Reynolds','Griffin','Wallace','Moreno','West','Cole','Hayes','Bryant','Herrera','Gibson','Ellis','Tran','Medina','Aguilar','Stevens','Murray','Ford','Castro','Marshall','Owens','Harrison','Fernandez','Mcdonald','Woods','Washington','Kennedy','Wells','Vargas','Henry','Chen','Freeman','Webb','Tucker','Guzman','Burns','Crawford','Olson','Simpson','Porter','Hunter','Gordon','Mendez','Silva','Shaw','Snyder','Mason','Dixon','Munoz','Hunt','Hicks','Holmes','Palmer','Wagner','Black','Robertson','Boyd','Rose','Stone','Salazar','Fox','Warren','Mills','Meyer','Rice','Schmidt','Garza','Daniels','Ferguson','Nichols','Stephens','Soto','Weaver','Ryan','Gardner','Payne','Grant','Dunn','Kelley','Spencer','Hawkins','Arnold','Pierce','Vazquez','Hansen','Peters','Santos','Hart','Bradley','Knight','Elliott','Cunningham','Duncan','Armstrong','Hudson','Carroll','Lane','Riley','Andrews','Alvarado','Ray','Delgado','Berry','Perkins','Hoffman','Johnston','Matthews','Pena','Richards','Contreras','Willis','Carpenter','Lawrence','Sandoval','Guerrero','George','Chapman','Rios','Estrada','Ortega','Watkins','Greene','Nunez','Wheeler','Valdez','Harper','Burke','Larson','Santiago','Maldonado','Morrison','Franklin','Carlson','Austin','Dominguez','Carr','Lawson','Jacobs','Obrien','Lynch','Singh','Vega','Bishop','Montgomery','Oliver','Jensen','Harvey','Williamson','Gilbert','Dean','Sims','Espinoza','Howell','Li','Wong','Reid','Hanson','Le','Mccoy','Garrett','Burton','Fuller','Wang','Weber','Welch','Rojas','Lucas','Marquez','Fields','Park','Yang','Little','Banks','Padilla','Day','Walsh','Bowman','Schultz','Luna','Fowler','Mejia','Davidson','Acosta','Brewer','May','Holland','Juarez','Newman','Pearson','Curtis','Cortez','Douglas','Schneider','Joseph','Barrett','Navarro','Figueroa','Keller','Avila','Wade','Molina','Stanley','Hopkins','Campos','Barnett','Bates','Chambers','Caldwell','Beck','Lambert','Miranda','Byrd','Craig','Ayala','Lowe','Frazier','Powers','Neal','Leonard','Gregory','Carrillo','Sutton','Fleming','Rhodes','Shelton','Schwartz','Norris','Jennings','Watts','Duran','Walters','Cohen','Mcdaniel','Moran','Parks','Steele','Vaughn','Becker','Holt','Deleon','Barker','Terry','Hale','Leon','Hail','Benson','Haynes','Horton','Miles','Lyons','Pham','Graves','Bush','Thornton','Wolfe','Warner','Cabrera','Mckinney','Mann','Zimmerman','Dawson','Lara','Fletcher','Page','Mccarthy','Love','Robles','Cervantes','Solis','Erickson','Reeves','Chang','Klein','Salinas','Fuentes','Baldwin','Daniel','Simon','Velasquez','Hardy','Higgins','Aguirre','Lin','Cummings','Chandler','Sharp','Barber','Bowen','Ochoa','Dennis','Robbins','Liu','Ramsey','Francis','Griffith','Paul','Blair','Oconnor','Cardenas','Pacheco','Cross','Calderon','Quinn','Moss','Swanson','Chan','Rivas','Khan','Rodgers','Serrano','Fitzgerald','Rosales','Stevenson','Christensen','Manning','Gill','Curry','Mclaughlin','Harmon','Mcgee','Gross','Doyle','Garner','Newton','Burgess','Reese','Walton','Blake','Trujillo','Adkins','Brady','Goodman','Roman','Webster','Goodwin','Fischer','Huang','Potter','Delacruz','Montoya','Todd','Wu','Hines','Mullins','Castaneda','Malone','Cannon','Tate','Mack','Sherman','Hubbard','Hodges','Zhang','Guerra','Wolf','Valencia','Saunders','Franco','Rowe','Gallagher','Farmer','Hammond','Hampton','Townsend','Ingram','Wise','Gallegos','Clarke','Barton','Schroeder','Maxwell','Waters','Logan','Camacho','Strickland','Norman','Person','Colon','Parsons','Frank',
'Harrington','Glover','Osborne','Buchanan','Casey','Floyd','Patton','Ibarra','Ball','Tyler','Suarez','Bowers','Orozco','Salas','Cobb','Gibbs','Andrade','Bauer','Conner','Moody','Escobar','Mcguire','Lloyd','Mueller','Hartman','French','Kramer','Mcbride','Pope','Lindsey','Velazquez','Norton','Mccormick','Sparks','Flynn','Yates','Hogan','Marsh','Macias','Villanueva','Zamora','Pratt','Stokes','Owen','Ballard','Lang','Brock','Villarreal','Charles','Drake','Barrera','Cain','Patrick','Pineda','Burnett','Mercado','Santana','Shepherd','Bautista','Ali','Shaffer','Lamb','Trevino','Mckenzie','Hess','Beil','Olsen','Cochran','Morton','Nash','Wilkins','Petersen','Briggs','Shah','Roth','Nicholson','Holloway','Lozano','Rangel','Flowers','Hoover','Short','Arias','Mora','Valenzuela','Bryan','Meyers','Weiss','Underwood','Bass','Greer','Summers','Houston','Carson','Morrow','Clayton','Whitaker','Decker','Yoder','Collier','Zuniga','Carey','Wilcox','Melendez','Poole','Roberson','Larsen','Conley','Davenport','Copeland','Massey','Lam','Huff','Rocha','Cameron','Jefferson','Hood','Monroe','Anthony','Pittman','Huynh','Randall','Singleton','Kirk','Combs','Mathis','Christian','Skinner','Bradford','Richard','Galvan','Wall','Boone','Kirby','Wilkinson','Bridges','Bruce','Atkinson','Velez','Meza','Roy','Vincent','York','Hodge','Villa','Abbott','Allison','Tapia','Gates','Chase','Sosa','Sweeney','Farrell','Wyatt','Dalton','Horn','Barron','Phelps','Yu','Dickerson','Heath','Foley','Atkins','Mathews','Bonilla','Acevedo','Benitez','Zavala','Hensley','Glenn','Cisneros','Harrell','Shields','Rubio','Huffman','Choi','Boyer','Garrison','Arroyo','Bond','Kane','Hancock','Callahan','Dillon','Cline','Wiggins','Grimes','Arellano','Melton','Oneill','Savage','Ho','Beltran','Pitts','Parrish','Ponce','Rich','Booth','Koch','Golden','Ware','Brennan','Mcdowell','Marks','Cantu','Humphrey','Baxter','Sawyer','Clay','Tanner','Hutchinson','Kaur','Berg','Wiley','Gilmore','Russo','Villegas','Hobbs','Keith','Wilkerson','Ahmed','Beard','Mcclain','Montes','Mata','Rosario','Vang','Walter','Henson','Oneal','Mosley','Mcclure','Beasley','Stephenson','Snow','Huerta','Preston','Vance','Barry','Johns','Eaton','Blackwell','Dyer','Prince','Macdonald','Solomon','Guevara','Stafford','English','Hurst','Woodard','Cortes','Shannon','Kemp','Nolan','Mccullough','Merritt','Murillo','Moon','Salgado','Strong','Kline','Cordova','Barajas','Roach','Rosas','Winters','Jacobson','Lester','Knox','Bullock','Kerr','Leach','Meadows','Orr','Davila','Whitehead','Pruitt','Kent','Conway','Mckee','Barr','David','Dejesus','Marin','Berger','Mcintyre','Blankenship','Gaines','Palacios','Cuevas','Bartlett','Durham','Dorsey','Mccall','Odonnell','Stein','Browning','Stout','Lowery','Sloan','Mclean','Hendricks','Calhoun','Sexton','Chung','Gentry','Hull','Duarte','Ellison','Nielsen','Gillespie','Buck','Middleton','Sellers','Leblanc','Esparza','Hardin','Bradshaw','Mcintosh','Howe','Livingston','Frost','Glass','Morse','Knapp','Herman','Stark','Bravo','Noble','Spears','Weeks','Corona','Frederick','Buckley','Mcfarland','Hebert','Enriquez','Hickman','Quintero','Randolph','Schaefer','Walls','Trejo','House','Reilly','Pennington','Michael','Conrad','Giles','Benjamin','Crosby','Fitzpatrick','Donovan','Mays','Mahoney','Valentine','Raymond','Medrano','Hahn','Mcmillan','Small','Bentley','Felix','Peck','Lucero','Boyle','Hanna','Pace','Rush','Hurley','Harding','Mcconnell','Bernal','Nava','Ayers','Everett','Ventura','Avery','Pugh','Mayer','Bender','Shepard','Mcmahon','Landry','Case','Sampson','Moses','Magana','Blackburn','Dunlap','Gould','Duffy','Vaughan','Herring','Mckay','Espinosa','Rivers','Farley','Bernard','Ashley','Friedman','Potts','Truong','Costa','Correa','Blevins','Nixon','Clements','Fry','Delarosa','Best','Benton','Lugo','Portillo','Dougherty','Crane','Haley','Phan','Villalobos','Blanchard','Horne','Finley','Quintana','Lynn','Esquivel','Bean','Dodson','Mullen','Xiong','Hayden','Cano','Levy','Huber','Richmond','Moyer','Lim','Frye','Sheppard','Mccarty','Avalos','Booker','Waller','Parra','Woodward','Jaramillo','Krueger','Rasmussen','Brandt','Peralta','Donaldson','Stuart','Faulkner','Maynard','Galindo','Coffey','Estes','Sanford','Burch','Maddox','Vo','Oconnell','Vu','Andersen','Spence','Mcpherson','Church','Schmitt','Stanton','Leal','Cherry','Compton','Dudley','Sierra','Pollard','Alfaro','Hester','Proctor','Lu','Hinton','Novak','Good','Madden','Mccann','Terrell','Jarvis','Dickson','Reyna','Cantrell','Mayo','Branch','Hendrix','Rollins','Rowland','Whitney','Duke','Odom','Daugherty','Travis','Tang','Archer'
]); //346 569 084

let country2 = new Country('Canada', 4, 30, 70,
['Alan','Arnold','Liam','Noah','Oliver','James','Elijah','Mateo','Theodore','Henry','Lucas','William','Benjamin','Levi','Sebastian','Ezra','Michael','Daniel','Leo','Owen','Samuel','Hudson','Asher','Luca','Ethan','John','David','Jackson','Joseph','Mason','Luke','Matthew','Julian','Dylan','Elias','Jacob','Maverick','Gabriel','Logan','Aiden','Thomas','Isaac','Miles','Grayson','Santiago','Anthony','Wyatt','Carter','Jayden','Ezekiel','Caleb','Cooper','Josiah','Charles','Christopher','Isaiah','Nolan','Cameron','Nathan','Joshua','Kai','Waylon','Angel','Lincoln','Andrew','Roman','Adrian','Aaron','Wesley','Ian','Thiago','Axel','Brooks','Bennett','Weston','Rowan','Christian','Theo','Beau','Eli','Silas','Jonathan','Ryan','Leonardo','Walker','Jaxon','Micah','Everett','Robert','Enzo','Parker','Jeremiah','Jose','Colton','Luka','Easton','Landon','Jordan','Amir','Gael','Austin','Adam','Jameson','August','Xavier','Myles','Dominic','Damian','Nicholas','Jace','Carson','Atlas','Adriel','Kayden','Hunter','River','Greyson','Emmett','Harrison','Vincent','Milo','Jasper','Giovanni','Jonah','Zion','Connor','Sawyer','Arthur','Ryder','Archer','Lorenzo','Declan','Emiliano','Luis','Diego','George','Evan','Jaxson','Carlos','Graham','Juan','Kingston','Nathaniel','Matteo','Legend','Malachi','Jason','Leon','Dawson','Bryson','Amari','Calvin','Ivan','Chase','Cole','Ashton','Ace','Arlo','Dean','Brayden','Jude','Hayden','Max','Matias','Rhett','Jayce','Elliott','Alan','Braxton','Kaiden','Zachary','Jesus','Emmanuel','Adonis','Charlie','Judah','Tyler','Elliot','Antonio','Emilio','Camden','Stetson','Maxwell','Ryker','Justin','Kevin','Messiah','Finn','Bentley','Ayden','Zayden','Felix','Nicolas','Miguel','Maddox','Beckett','Tate','Caden','Beckham','Andres','Alejandro','Alex','Jesse','Brody','Tucker','Jett','Barrett','Knox','Hayes','Peter','Timothy','Joel','Edward','Griffin','Xander','Oscar','Victor','Abraham','Brandon','Abel','Richard','Callum','Riley','Patrick','Karter','Malakai','Eric','Grant','Israel','Milan','Gavin','Rafael','Tatum','Kairo','Elian','Kyrie','Louis','Lukas','Javier','Nico','Avery','Rory','Aziel','Ismael','Jeremy','Zayn','Cohen','Simon','Marcus','Steven','Mark','Dallas','Tristan','Lane','Blake','Paul','Paxton','Bryce','Nash','Crew','Kash','Kenneth','Omar','Colt','Lennox','King','Walter','Emerson','Phoenix','Jaylen','Derek','Muhammad','Ellis','Kaleb','Preston','Jorge','Zane','Kayson','Cade','Tobias','Otto','Kaden','Remington','Atticus','Finley','Holden','Jax','Cash','Martin','Ronan','Maximiliano','Malcolm','Romeo','Josue','Francisco','Bodhi','Cyrus','Koa','Angelo','Aidan','Jensen','Erick','Hendrix','Warren','Bryan','Cody','Leonel','Onyx','Ali','Andre','Jaziel','Clayton','Saint','Dante','Reid','Casey','Brian','Gideon','Niko','Maximus','Colter','Kyler','Brady','Zyaire','Cristian','Cayden','Harvey','Cruz','Dakota','Damien','Manuel','Anderson','Cairo','Colin','Joaquin','Ezequiel','Karson','Callan','Briggs','Khalil','Wade','Jared','Fernando','Ari','Colson','Kylian','Archie','Banks','Bowen','Kade','Daxton','Jaden','Rhys','Sonny','Zander','Eduardo','Iker','Sullivan','Bradley','Raymond','Odin','Spencer','Stephen','Prince','Brantley','Killian','Kamari','Cesar','Dariel','Eithan','Mathias','Ricardo','Orion','Titus','Luciano','Rylan','Pablo','Chance','Travis','Kohen','Marco','Jay','Malik','Hector','Edwin','Armani','Bodie','Shiloh','Marshall','Remy','Russell','Baylor','Kameron','Tyson','Grady','Oakley','Baker','Winston','Kane','Julius','Desmond','Royal','Sterling','Mario','Kylo','Sergio','Jake','Kashton','Shepherd','Franklin','Ibrahim','Ares','Koda','Lawson','Hugo','Kyle','Kyson','Kobe','Pedro','Santino','Wilder','Sage','Raiden','Damon','Nasir','Sean','Forrest','Kian','Reed','Tanner','Jalen','Apollo','Zayne','Nehemiah','Edgar','Johnny','Clark','Eden','Gunner','Isaias','Esteban','Hank','Alijah','Solomon','Wells','Sutton','Royce','Callen','Reece','Gianni','Noel','Quinn','Raphael','Corbin','Erik','Tripp','Atreus','Francis','Kayce','Callahan','Devin','Troy','Sylas','Fabian','Zaire','Donovan','Johnathan','Frank','Lewis','Moshe','Adan','Alexis','Tadeo','Ronin','Marcos','Kieran','Leonidas','Bo','Kendrick','Ruben','Camilo','Garrett','Matthias','Emanuel','Jeffrey','Collin','Lucian','Augustus','Memphis','Rowen','Yusuf','Finnegan','Makai','Lionel','Caiden','Rodrigo','Uriel','Lucca','Philip','Andy','Kaison','Jaiden','Porter','Jasiah','Ridge','Frederick','Amiri','Rocco','Asa','Ayaan','Kason','Denver','Dalton','Major','Valentino','Allen','Kolton','Zaiden','Ariel','Rome','Ford','Leland','Marcelo',
'Seth','Jamir','Leandro','Miller','Roberto','Alessandro','Gregory','Hezekiah','Jonas','Cassian','Deacon','Jaxton','Keanu','Alonzo','Moises','Conrad','Drew','Bruce','Mohamed','Anakin','Soren','Mack','Pierce','Kylan','Princeton','Zain','Trevor','Morgan','Ozzy','Roy','Dominick','Shane','Hamza','Moses','Dax','Lawrence','Ander','Ledger','Enrique','Rayan','Johan','Saul','Jamari','Armando','Kaysen','Samson','Azariah','Maximilian','Rio','Braylen','Julio','Mohammad','Cassius','Kasen','Maximo','Omari','Clay','Izaiah','Lian','Emir','Jaime','Samir','Gerardo','Kaizen','Zachariah','Jayson','Albert','Taylor','Sincere','Cillian','Gunnar','Boone','Raul','Jamie','Jayceon','Scott','Westin','Danny','Arjun','Kamden','Colby','Peyton','Koen','Nikolai','Dorian','Ocean','Louie','Layton','Ronald','Jase','Kyro','Benson','Davis','Huxley','Kenzo','Conor','Mohammed','Arturo','Phillip','Augustine','Reign','Yosef','Kareem','Keegan','Vicente','Salem','Reese','Fletcher','Shawn','Braylon','Alden','Julien','Cannon','Chaim','Gustavo','Boston','Zeke','Eliam','Corey','Dennis','Madden','Marvin','Elio','Krew','Ahmed','Layne','Nikolas','Mac','Otis','Harlan','Azriel','Emmitt','Brixton','Donald','Musa','Amos','Jamison','Dario','Roland','Zakai','Aarav','Caspian','Finnley','Raylan','Mauricio','Briar','Wilson','Chosen','Sam','Tru','Trace','Waylen','Quincy','Santana','Creed','Jakari','Westley','Amias','Azrael','Drake','Duke','Ahmad','Axton','Chandler','Hassan','Houston','Tommy','Eliseo','Dustin','Leonard','Kyree','Truett','Abdiel','Azael','Ezrah','Zamir','Dexter','Salvador','Uriah','Ryland','Zyair','Karim','Lee','Rhodes','Bruno','Case','Mylo','Valentin','Abram','Avyaan','Cal','Keith','Alvaro','Enoch','Trey','Clyde','Nathanael','Khai','Rex','Zaid','Dutton','Skyler','Tomas','Wylder','Darius','Crue','Jakai','Zayd','Gage','Riggs','Wayne','Jiraiya','Junior','Aryan','Carmelo','Conner','Alberto','Alfredo','Loyal','Douglas','Vincenzo','Aron','Casen','Forest','Avi','Bellamy','Emery','Bridger','Brock','Misael','Lennon','Zahir','Boden','Derrick','Dilan','Roger','Marcel','Rayden','Jefferson','Alvin','Kaiser','Blaze','Dillon','Magnus','Quentin','Ray','Dakari','Lachlan','Ty','Abdullah','Chris','Orlando','Yael','Gian','Benicio','Franco','Evander','Flynn','Harry','Robin','Sevyn','Hugh','Aries','Cason','Idris','Ambrose','Issac','Yehuda','Brycen','Cayson','Rey','Santos','Ben','Nelson','Wes','Westyn','Khaza','Bjorn','Kiaan','Seven','Watson','Gatlin','Izael','Stanley','Allan','Jahmir','Landen','Neil','Quinton','Chozen','Noe','Reuben','Damir','Bear','Jimmy','Kannon','Lance','Melvin','Remi','Yousef','Lochlan','Arian','Kenji','Khari','Rohan','Legacy','Edison','Emory','Rudy','Eliel','Aden','Byron','Dereck','Everest','Yahir','Guillermo','Alec','Brodie','Massimo','Mitchell','Anders','Alonso','Jaxxon','Tony','Jireh','Kingsley','Jerry','Ayan','Brayan','Ramon','Jagger','Elisha','Vihaan','Teo','Eddie','Judson','Leif','Trenton','Grey','Joziah','Felipe','Jesiah','Zyon','Kyaire','Ernesto','Ishaan','Matheo','Ricky','Fisher','Keaton','Kylen','Marcellus','Izan','Leroy','Jedidiah','Ignacio','Ira','Zev','Mustafa','Yahya','Aurelio','Brendan','Calum','Jericho','Nixon','Demetrius','Eiden','Rocky','Langston','Jovanni','Mathew','Landyn','Murphy','Axl','Dane','Jrue','Justice','Kellan','Semaj','Thaddeus','Curtis','Dash','Zavier','Devon','Joe','Joey','Jon','Harlem','Jairo','Ryatt','Salvatore','Van','Zechariah','Coleson','Eugene','Kellen','Alistair','Colten','Jabari','Lucien','Castiel','Cain','Harold','Alfred','Benedict','Shmuel','Duncan','Ermias','Yadiel','Imran','Kaisen','Zen','Eren','Kolson','Kye','Jasiel','Kyren','Marlon','Palmer','Adler','Aldo','Meir','Osiris','Ameer','Kartier','Wesson','Ahmir','Mordechai','Nova','Randy','Shepard','Talon','Vance','Asaiah','Boaz','Kenai','Jones','Carl','Stefan','Deandre','Kelvin','Leighton','Yaakov','Foster','Rishi','Yisroel','Darwin','Neo','Titan','Maurice','Mccoy','Alfonso','Henrik','Jeremias','Kole','Mael','True','Veer','Jadiel','Karsyn','Mekhi','Atharv','Darren','Eliezer','Gordon','Mikael','Stone','Wren','Ephraim','Osman','Ulises','Kody','Thatcher','Abner','Cullen','Damari','Hollis'], 
['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts','Gomez','Phillips','Evans','Turner','Diaz','Parker','Cruz','Edwards','Collins','Reyes','Stewart','Morris','Morales','Murphy','Cook','Rogers','Gutierrez','Ortiz','Morgan','Cooper','Peterson','Bailey','Reed','Kelly','Howard','Ramos','Kim','Cox','Ward','Richardson','Watson','Brooks','Chavez','Wood','James','Bennett','Gray','Mendoza','Ruiz','Hughes','Price','Alvarez','Castillo','Sanders','Patel','Myers','Long','Ross','Foster','Jimenez','Powell','Jenkins','Perry','Russell','Sullivan','Bell','Coleman','Butler','Henderson','Barnes','Gonzales','Fisher','Vasquez','Simmons','Romero','Jordan','Patterson','Alexander','Hamilton','Graham','Reynolds','Griffin','Wallace','Moreno','West','Cole','Hayes','Bryant','Herrera','Gibson','Ellis','Tran','Medina','Aguilar','Stevens','Murray','Ford','Castro','Marshall','Owens','Harrison','Fernandez','Mcdonald','Woods','Washington','Kennedy','Wells','Vargas','Henry','Chen','Freeman','Webb','Tucker','Guzman','Burns','Crawford','Olson','Simpson','Porter','Hunter','Gordon','Mendez','Silva','Shaw','Snyder','Mason','Dixon','Munoz','Hunt','Hicks','Holmes','Palmer','Wagner','Black','Robertson','Boyd','Rose','Stone','Salazar','Fox','Warren','Mills','Meyer','Rice','Schmidt','Garza','Daniels','Ferguson','Nichols','Stephens','Soto','Weaver','Ryan','Gardner','Payne','Grant','Dunn','Kelley','Spencer','Hawkins','Arnold','Pierce','Vazquez','Hansen','Peters','Santos','Hart','Bradley','Knight','Elliott','Cunningham','Duncan','Armstrong','Hudson','Carroll','Lane','Riley','Andrews','Alvarado','Ray','Delgado','Berry','Perkins','Hoffman','Johnston','Matthews','Pena','Richards','Contreras','Willis','Carpenter','Lawrence','Sandoval','Guerrero','George','Chapman','Rios','Estrada','Ortega','Watkins','Greene','Nunez','Wheeler','Valdez','Harper','Burke','Larson','Santiago','Maldonado','Morrison','Franklin','Carlson','Austin','Dominguez','Carr','Lawson','Jacobs','Obrien','Lynch','Singh','Vega','Bishop','Montgomery','Oliver','Jensen','Harvey','Williamson','Gilbert','Dean','Sims','Espinoza','Howell','Li','Wong','Reid','Hanson','Le','Mccoy','Garrett','Burton','Fuller','Wang','Weber','Welch','Rojas','Lucas','Marquez','Fields','Park','Yang','Little','Banks','Padilla','Day','Walsh','Bowman','Schultz','Luna','Fowler','Mejia','Davidson','Acosta','Brewer','May','Holland','Juarez','Newman','Pearson','Curtis','Cortez','Douglas','Schneider','Joseph','Barrett','Navarro','Figueroa','Keller','Avila','Wade','Molina','Stanley','Hopkins','Campos','Barnett','Bates','Chambers','Caldwell','Beck','Lambert','Miranda','Byrd','Craig','Ayala','Lowe','Frazier','Powers','Neal','Leonard','Gregory','Carrillo','Sutton','Fleming','Rhodes','Shelton','Schwartz','Norris','Jennings','Watts','Duran','Walters','Cohen','Mcdaniel','Moran','Parks','Steele','Vaughn','Becker','Holt','Deleon','Barker','Terry','Hale','Leon','Hail','Benson','Haynes','Horton','Miles','Lyons','Pham','Graves','Bush','Thornton','Wolfe','Warner','Cabrera','Mckinney','Mann','Zimmerman','Dawson','Lara','Fletcher','Page','Mccarthy','Love','Robles','Cervantes','Solis','Erickson','Reeves','Chang','Klein','Salinas','Fuentes','Baldwin','Daniel','Simon','Velasquez','Hardy','Higgins','Aguirre','Lin','Cummings','Chandler','Sharp','Barber','Bowen','Ochoa','Dennis','Robbins','Liu','Ramsey','Francis','Griffith','Paul','Blair','Oconnor','Cardenas','Pacheco','Cross','Calderon','Quinn','Moss','Swanson','Chan','Rivas','Khan','Rodgers','Serrano','Fitzgerald','Rosales','Stevenson','Christensen','Manning','Gill','Curry','Mclaughlin','Harmon','Mcgee','Gross','Doyle','Garner','Newton','Burgess','Reese','Walton','Blake','Trujillo','Adkins','Brady','Goodman','Roman','Webster','Goodwin','Fischer','Huang','Potter','Delacruz','Montoya','Todd','Wu','Hines','Mullins','Castaneda','Malone','Cannon','Tate','Mack','Sherman','Hubbard','Hodges','Zhang','Guerra','Wolf','Valencia','Saunders','Franco','Rowe','Gallagher','Farmer','Hammond','Hampton','Townsend','Ingram','Wise','Gallegos','Clarke','Barton','Schroeder','Maxwell','Waters','Logan','Camacho','Strickland','Norman','Person','Colon','Parsons','Frank',
'Harrington','Glover','Osborne','Buchanan','Casey','Floyd','Patton','Ibarra','Ball','Tyler','Suarez','Bowers','Orozco','Salas','Cobb','Gibbs','Andrade','Bauer','Conner','Moody','Escobar','Mcguire','Lloyd','Mueller','Hartman','French','Kramer','Mcbride','Pope','Lindsey','Velazquez','Norton','Mccormick','Sparks','Flynn','Yates','Hogan','Marsh','Macias','Villanueva','Zamora','Pratt','Stokes','Owen','Ballard','Lang','Brock','Villarreal','Charles','Drake','Barrera','Cain','Patrick','Pineda','Burnett','Mercado','Santana','Shepherd','Bautista','Ali','Shaffer','Lamb','Trevino','Mckenzie','Hess','Beil','Olsen','Cochran','Morton','Nash','Wilkins','Petersen','Briggs','Shah','Roth','Nicholson','Holloway','Lozano','Rangel','Flowers','Hoover','Short','Arias','Mora','Valenzuela','Bryan','Meyers','Weiss','Underwood','Bass','Greer','Summers','Houston','Carson','Morrow','Clayton','Whitaker','Decker','Yoder','Collier','Zuniga','Carey','Wilcox','Melendez','Poole','Roberson','Larsen','Conley','Davenport','Copeland','Massey','Lam','Huff','Rocha','Cameron','Jefferson','Hood','Monroe','Anthony','Pittman','Huynh','Randall','Singleton','Kirk','Combs','Mathis','Christian','Skinner','Bradford','Richard','Galvan','Wall','Boone','Kirby','Wilkinson','Bridges','Bruce','Atkinson','Velez','Meza','Roy','Vincent','York','Hodge','Villa','Abbott','Allison','Tapia','Gates','Chase','Sosa','Sweeney','Farrell','Wyatt','Dalton','Horn','Barron','Phelps','Yu','Dickerson','Heath','Foley','Atkins','Mathews','Bonilla','Acevedo','Benitez','Zavala','Hensley','Glenn','Cisneros','Harrell','Shields','Rubio','Huffman','Choi','Boyer','Garrison','Arroyo','Bond','Kane','Hancock','Callahan','Dillon','Cline','Wiggins','Grimes','Arellano','Melton','Oneill','Savage','Ho','Beltran','Pitts','Parrish','Ponce','Rich','Booth','Koch','Golden','Ware','Brennan','Mcdowell','Marks','Cantu','Humphrey','Baxter','Sawyer','Clay','Tanner','Hutchinson','Kaur','Berg','Wiley','Gilmore','Russo','Villegas','Hobbs','Keith','Wilkerson','Ahmed','Beard','Mcclain','Montes','Mata','Rosario','Vang','Walter','Henson','Oneal','Mosley','Mcclure','Beasley','Stephenson','Snow','Huerta','Preston','Vance','Barry','Johns','Eaton','Blackwell','Dyer','Prince','Macdonald','Solomon','Guevara','Stafford','English','Hurst','Woodard','Cortes','Shannon','Kemp','Nolan','Mccullough','Merritt','Murillo','Moon','Salgado','Strong','Kline','Cordova','Barajas','Roach','Rosas','Winters','Jacobson','Lester','Knox','Bullock','Kerr','Leach','Meadows','Orr','Davila','Whitehead','Pruitt','Kent','Conway','Mckee','Barr','David','Dejesus','Marin','Berger','Mcintyre','Blankenship','Gaines','Palacios','Cuevas','Bartlett','Durham','Dorsey','Mccall','Odonnell','Stein','Browning','Stout','Lowery','Sloan','Mclean','Hendricks','Calhoun','Sexton','Chung','Gentry','Hull','Duarte','Ellison','Nielsen','Gillespie','Buck','Middleton','Sellers','Leblanc','Esparza','Hardin','Bradshaw','Mcintosh','Howe','Livingston','Frost','Glass','Morse','Knapp','Herman','Stark','Bravo','Noble','Spears','Weeks','Corona','Frederick','Buckley','Mcfarland','Hebert','Enriquez','Hickman','Quintero','Randolph','Schaefer','Walls','Trejo','House','Reilly','Pennington','Michael','Conrad','Giles','Benjamin','Crosby','Fitzpatrick','Donovan','Mays','Mahoney','Valentine','Raymond','Medrano','Hahn','Mcmillan','Small','Bentley','Felix','Peck','Lucero','Boyle','Hanna','Pace','Rush','Hurley','Harding','Mcconnell','Bernal','Nava','Ayers','Everett','Ventura','Avery','Pugh','Mayer','Bender','Shepard','Mcmahon','Landry','Case','Sampson','Moses','Magana','Blackburn','Dunlap','Gould','Duffy','Vaughan','Herring','Mckay','Espinosa','Rivers','Farley','Bernard','Ashley','Friedman','Potts','Truong','Costa','Correa','Blevins','Nixon','Clements','Fry','Delarosa','Best','Benton','Lugo','Portillo','Dougherty','Crane','Haley','Phan','Villalobos','Blanchard','Horne','Finley','Quintana','Lynn','Esquivel','Bean','Dodson','Mullen','Xiong','Hayden','Cano','Levy','Huber','Richmond','Moyer','Lim','Frye','Sheppard','Mccarty','Avalos','Booker','Waller','Parra','Woodward','Jaramillo','Krueger','Rasmussen','Brandt','Peralta','Donaldson','Stuart','Faulkner','Maynard','Galindo','Coffey','Estes','Sanford','Burch','Maddox','Vo','Oconnell','Vu','Andersen','Spence','Mcpherson','Church','Schmitt','Stanton','Leal','Cherry','Compton','Dudley','Sierra','Pollard','Alfaro','Hester','Proctor','Lu','Hinton','Novak','Good','Madden','Mccann','Terrell','Jarvis','Dickson','Reyna','Cantrell','Mayo','Branch','Hendrix','Rollins','Rowland','Whitney','Duke','Odom','Daugherty','Travis','Tang','Archer'
]); // 39 742 430

let country3 = new Country('France', 6, 40, 70, 
['Albert','Abel','Andre','Alexandre','Antoine','Armand','Alphonse','Adrien','Allain','Aubrey','Blaise','Beau','Brett','Bleu','Brice','Bastien','Baptiste','Boniface','Breton','Benoit','Beaumont','Berne','Charles','Claude','Constantin','Chevalier','Corbin','Chapin','Cavalier','Cedric','Christophe','Curtis','Danon','Darcy','Durant','Dior','Didier','Devereaux','Denis','Delmore','Etienne','Emmanuel','Edouard','Florian','Fabrice','Faustin','Francois','Fabien','Frances','Frederic','Florent','Ferdinand','Felix','Gustave','Gaston','Ghislain','Gerard','Gervais','Gaspard','Gael','Gabriel','Georges','Jean-Paul','Jean','Jacques','Jean-Baptiste','Javier','Janvier','Lucien','Leon','Louis','Lionel','Leo','Luis','Laurent','Lucas','Marcel','Marceau','Marc','Mathieu','Nicolas','Noel','Odilon','Olivier','Patrice','Philippe','Pascal','Picard','Proust','Paul','Remy','Roussel','Rene','Romain','Raymond','Sebastien','Toussaint','Victor','Vitus','Xavier'], 
['Martin','Bernard','Robert','Richard','Durand','Dubois','Moreau','Simon','Laurent','Michel','Garcia','Thomas','Leroy','David','Morel','Roux','Girard','Fournier','Lambert','Lefebvre','Mercier','Blanc','Dupont','Faure','Bertrand','Morin','Garnier','Nicolas','Marie','Rousseau','Bonnet','Vincent','Henry','Masson','Robin','Martinez','Boyer','Muller','Chevalier','Denis','Meyer','Blanchard','Lemaire','Dufour','Gauthier','Vidal','Perez','Perrin','Fontaine','Joly','Jean','da Silva','Gautier','Roche','Roy','Pereira','Mathieu','Roussel','Duval','Guerin','Lopez','Rodriguez','Colin','Aubert','Lefevre','Marchand','Schmitt','Picard','Caron','Sanchez','Meunier','Gaillard','Louis','Nguyen','Lucas','Dumont','dos Santos','Brunet','Clement','Brun','Arnaud','Giraud','Barbier','Rolland','Charles','Hubert','Fernandes','Fabre','Moulin','Leroux','Dupuis','Guillaume','Roger','Paris','Guillot','Dupuy','Fernandez','Carpentier','Payet','Ferreira','Olivier','Philippe','Deschamps','Lacroix','Jacquet','Rey','Klein','Renaud','Baron','Leclerc','Royer','Berger','Bourgeois','Bertin','Petit','Adam','Daniel','Lemoine','Pierre','Francois','Goncalves','Benoit','Lecomte','Vasseur','Lebrun','Leblanc','Leclercq','Besson','Charpentier','Etienne','Jacob','Michaud','Maillard','Dumas','Monnier','Fleury','Aubry','Hamon','Renard','Chevallier','Guyot','Marty','Gomez','Gillet','Andre','Le Roux','Boucher','Bailly','Pons','Renault','Julien','Huet','Riviere','Gonzalez','Reynaud','Collet','Bouvier','Millet','Rodrigues','Gerard','Bouchet','Schneider','Germain','Marchal','Martins','Breton','Cousin','Langlois','Perrot','Perrier','Le Gall','Noel','Pelletier','Mallet','Weber','Hoarau','Chauvin','Le Goff','Grondin','Antoine','Boulanger','Gilbert','Humbert','Guichard','Poulain','Collin','Tessier','Pasquier','Jacques','Lamy','da Costa','Alexandre','Perret','Poirier','Pascal','Gros','Buisson','Albert','Lopes','Ruiz','Lejeune','Cordier','Hernandez','Georges','Maillot','Delaunay','Laporte','Pichon','Voisin','Lemaitre','Launay','Lesage','Carlier','Ollivier','Gomes','Besnard','Camus','Coulon','Cohen','Charrier','Paul','Didier','Guillet','Guillou','Remy','Joubert','Bousquet','Verdier','Hoareau','Briand','Raynaud','Delmas','Coste','Blanchet','Marin','Lebreton','Leduc','Sauvage','Martel','Gaudin','Lebon','Rossi','Diallo','Delattre','Maury','Ribeiro','Bigot','Menard','Guillon','Thibault','Colas','Raymond','Delorme','Pineau','Joseph','Hardy','Berthelot','Allard','Lagarde','Ferrand','Valentin','Lenoir','Tran','Bonneau','Clerc','Godard','Tanguy','Brunel','Gilles','Imbert','Seguin','Jourdan','Alves','Bruneau','Bodin','Morvan','Vaillant','Marion','Devaux','Maurice','Courtois','Baudry','Chauvet','Prevost','Couturier','Turpin','Lefort','Lacombe','Favre','Maire','Barre','Riou','Allain','Lombard','Mary','Lacoste','Blin','Costa','Evrard','Thierry','Leveque','Loiseau','Navarro','Laroche','Bourdon','Texier','Carre','Levy','Toussaint','Grenier','Guilbert','Guibert','Chartier','Bonnin','Maillet','Benard','Jacquot','Auger','Vallet','Leconte','Bazin','Rousset','Fischer','Rocher','Normand','Descamps','Potier','Valette','Peltier','Duhamel','Wagner','Merle','Faivre','Barbe','Blondel','Pottier','Pinto','Maurin','Guyon','Vial','Martineau','Blot','Gallet','Foucher','Delage','Guy','Chauveau','Barthelemy','Fouquet','Boutin','Bouvet','Salmon','Rossignol','Neveu','Lemonnier','Marechal','Herve','Delahaye','Poncet','Bernier','Lafon','Teixeira','Chapuis','Pujol','Lecoq','Charbonnier','de Sousa','Laborde','Cros','Serre','Andrieu','Girault','Pruvost','Berthier','Grand','Sabatier','Boulay','Le Roy','Duclos','Martinet','Hebert','Maurel','Gervais','Dias','de Oliveira','Parent','Jourdain','Ali','Regnier','Marc','Diaz','Billard','Favier','Bellanger','Delannoy','Torres','Dubreuil','Becker','Doucet','Gras','Prigent','Rigaud','Samson','Masse','Cornu','Chambon','Mas','Fortin','Besse','Castel','Letellier','Ricard','Benoist','Poisson','Parmentier','Lepage','Boulet','Grandjean','Claude','Mendes','Bonhomme','Roques','Huguet','Comte','Pommier','Le Corre','Forestier','Drouet','Constant','Leblond','Jolly','Brault','Gosselin','Lacour','Rose','Prat','Geoffroy','Hamel','Tournier','Rault','Mounier','Ledoux','Marquet','Blondeau','Grange','Morand','Picot','Millot','Brossard','Laval','Merlin','Bocquet','Granger','Jung','Leleu','Levasseur','Guillemin','Armand','Barret','Mouton','Champion','Moreno','Bouquet','Keller','Bourdin','Cartier','Gimenez','Jamet','Lavigne','Combes','Said','Lelievre','Guillard','Berthet','Guillemot','Gibert','Leray','Gicquel','Ferry','Fort','Dumoulin','Provost','Basset','Papin','Terrier','Walter','Andrieux','Tellier','Jeanne','Bataille','Munoz','Jullien','Ramos','Prieur','Bouchard','Saunier','Bon','Chatelain','Foulon'
]); // 66 548 530

let country4 = new Country('Spain', 5, 30, 70, 
['Aarón','Abel','Abelardo','Abraham','Abundio','Adalberto','Adan','Ademar','Adrian','Adriano','Afonso','Agapito','Agripino','Agustín','Alberto','Alejandro','Alfredo','Alonso','Alphons','Álvaro','Amado','Amador','Amancio','Americo','Amílcar','Anacleto','Andres','Andreu','Angel','José Ángel','Aníbal','Antero','Antonin','Antonio','Apolinar','Apolinario','Arcadio','Armando','Arnaldo','Arnulfo','Arsenio','Arturo','Atanasio','Augusto','Aurelio','Aznar','Baldomero','Balthazar','Bartolo','Bartolomé','Benito','Benjamin','Bernabé','Bernardo','Beto','Bonifacio','Borja','Braulio','Brigido','Bruno','Calixto','Camilo','Carlito','Carlo','Carlos','Carlos Alberto','Carlos Eduardo','Carmelo','Casimiro','Cayetano','Cecilio','Ceferino','Celedonio','César','Cesario','Charli','Cipriano','Claudio','Clemente','Climaco','Cornelio','Corsino','Crisologo','Cristhian','Cristian','Cristóbal','Cuauhtémoc','Danilo','Dalmacio','Dámaso','Damián','Daniel','Dante','Dario','David','Delfino','Diego','Diosdado','Domingo','Donaldo','Edgardo','Edmundo','Eduardo','Efraín','Eladio','Elbio','Elias','Eligio','Eliseo','Eloy','Elpidio','Emanuel','Emiliano','Emilio','Enrique','Enzo','Ernesto','Estanislau','Esteban','Esterio','Eugenio','Eusebio','Ezequiel','Fabio','Fabricio','Faustino','Fausto','Federico','Feliciano','Felipe','Felix','Fermin','Fernando','Fernando José','Fidel','Filemón','Filomeno','Flavio','Florencio','Florentin','Floriano','Francisco','Fulgencio','Gabriel','Gamaliel','Gaspar','Gavino','Genaro','Genovevo','Gerardo','Germán','Geronimo','Gilberto','Ginés','Gonzalo','Graciano','Gregorio','Guido','Guillermo','Gustavo','Gutierre','Hector','Heriberto','Herminio','Hermogenes','Hernán','Hernándo','Higinio','Hilario','Hipólito','Hiro','Homero','Horacio','Huáscar','Hugo','Humberto','Ignacio','Inigo','Isaac','Isaias','Isidoro','Isidro','Jacinto','Jaime','Jairo','Javier','Jerónimo','Jesus','Jhon','Jimeno','Joan','Joaquín','Joel','Jorge','José','José Carlos','José Enrique','José María','José Ramón','Juan José','Josu','Juan','Juanfran','Juanma','Julián','Julio','Julio Cesar','Jusepe','Justino','Justo','Kike','Laureano','Lauro','Lautaro','Lázaro','Leandro','Leon','Leonardo','Leopoldo','Liberato','Liberto','Licerio','Lorenzo','Lotario','Luca','Lucas','Lucero','Luciano','Lucio','Ludovico','Luis','Luis Felipe','Macario','Maikel','Manolito','Manolo','Manrique','Manu','Manuel','José Manuel','Marcelino','Marcelo','Marcial','Marco','Marcos','Mariano','Mario','Mateo','Matías','Mauricio','Mauro','Maximiliano','Melquíades','Miguel','Miguel Ángel','Milo','Nacho','Nahuel','Napoleon','Narciso','Nazario','Nehuén','Nemesio','Nestor','Nicolas','Niño','Noe','Norberto','Nuño','Obdulio','Octavio','Omar','Oscar','Osorio','Osvaldo','Oswaldo','Pablo','Panfilo','Pascual','Pasqual','Patricio','Paulino','Pedro','Perez','Primitivo','Profiat','Prudencio','Quique','Raimon','Ramiro','Ramón','Raphael','Raul','Reinaldo','Reno','Ricardo','Rodolfo','Rodrigo','Rodulfo','Rogelio','Rolando','Rolo','Roman','Ronaldo','Rosendo','Rudecindo','Rufino','Salome','Salvador','Samuel','Santiago','Saul','Sebastian','Secundino','Servando','Severino','Severo','Silvestre','Sixto','Suero','Tato','Teodoro','Teófilo','Tiburcio','Timoteo','Tito','Tomás','Toni','Tonin','Tonino','Tonio','Tono','Ulises','Valero','Venancio','Vicente','Víctor','Victorino','Vinicio','Vladimiro','Wenceslao','Wilfredo','Zeferino'], 
['Garcia','Rodriguez','Gonzalez','Fernandez','Lopez','Martinez','Sanchez','Perez','Gomez','Martin','Jimenez','Ruiz','Hernandez','Diaz','Moreno','Muñoz','Alvarez','Romero','Alonso','Gutierrez','Navarro','Torres','Dominguez','Ramos','Vazquez','Gil','Ramirez','Serrano','Blanco','Molina','Morales','Suarez','Ortega','Delgado','Castro','Ortiz','Rubio','Marin','Sanz','Iglesias','Medina','Nuñez','Garrido','Castillo','Cortes','Lozano','Guerrero','Santos','Cano','Prieto','Cruz','Mendez','Calvo','Vidal','Gallego','Herrera','Cabrera','Flores','Peña','Leon','Marquez','Campos','Vega','Fuentes','Carrasco','Diez','Reyes','Caballero','Nieto','Pascual','Aguilar','Santana','Herrero','Ferrer','Lorenzo','Gimenez','Hidalgo','Montero','Ibañez','Santiago','Mora','Vicente','Vargas','Arias','Duran','Benitez','Carmona','Crespo','Pastor','Soto','Soler','Roman','Velasco','Saez','Moya','Parra','Esteban','Bravo','Rojas','Gallardo','Pardo','Merino','Franco','Lara','Espinosa','Rivera','Rivas','Izquierdo','Casado','Camacho','Silva','Arroyo','Vera','Redondo','Segura','Rey','Luque','Sierra','Montes','Otero','Carrillo','Rios','Marcos','Galan','Mendoza','Soriano','Marti','Valero','Bernal','Robles','Vila','Palacios','Heredia','Guerra','Varela','Benito','Mateo','Contreras','Bueno','Exposito','Macias','Andres','Villar','Miranda','Pereira','Roldan','Mateos','Escudero','Guillen','Aguilera','Casas','Rivero','Rico','Padilla','Beltran','Gracia','Abad','Salas','Acosta','Conde','Quintana','Menendez','Galvez','Estevez','Jurado','Roca','Plaza','Calderon','Aranda','Salazar','Serra','Aparicio','Costa','Guzman','Bermudez','Miguel','Villanueva','Santamaria','Manzano','Trujillo','Hurtado','Cuesta','Blazquez','Rueda','Pons','de La Fuente','Tomas','Pacheco','Avila','Sancho','Mesa','Escobar','Blasco','Simon','Luna','Lazaro','Zamora','Salvador','del Rio','Alarcon','Millan','Castaño','Maldonado','Bermejo','De-La-Fuente','Ballesteros','García','Del-Rio','Paredes','Valverde','Mas','Anton','Bautista','Juan','de La Cruz','Ponce','Oliva','Lorente','Montoya','Valle','Rodrigo','Cordero','Collado','Marco','Cuenca','Murillo','Martos','Cuevas','Ros','de La Torre','Quesada','Pozo','Chen','de-La-Cruz','Puig','Barrera','Gimeno','Barroso','Amador','Alba','Ordoñez','Navas','Pulido','Soria','Corral','Rojo','Arenas','Cabello','Domingo','Galindo','Saiz','Valencia','Escribano','Aguado','Asensio','Mena','Vallejo','Lucas','de-La Torre','De-La-Torre','Ramon','Caro','Mata','Polo','Linares','Villalba','Aguirre','Paz','Naranjo','Reina','Ojeda','Leal','Oliver','Burgos','Mohamed','Moran','Carretero','Sosa','Bonilla','Roig','Andreu','Castellano','Clemente','Villa','Cordoba','Rosa','Aragon','Hernando','Carrera','Carrion','Riera','Calero','Caceres','Alcaraz','Toledo','Saavedra','Cobo','Domenech','Cardenas','Zapata','Carbonell','Juarez','Llorente','Chacon','Sola','Moral','Velazquez','Vela','Sevilla','Singh','López','Salgado','Alfonso','Font','Villegas','Requena','Barrios','Esteve','Arribas','Ayala','Correa','Quintero','Pineda','Olivares','Bosch','Grau','Prado','Fernández','Carballo','Salinas','Pelaez','de La Rosa','Ballester','Miralles','Marrero','González','Ferreira','Perea','Piñeiro','Luis','Solis','Cid','Sala','Sanchis','Pinto','Castilla','Cantero','Casanova','Cardona','Pérez','Camara','Palomo','Belmonte','Porras','Ventura','Baena','Madrid','Coll','Palma','Pino','de-La-Rosa','Arranz','Recio','Sánchez','Herranz','Rincon','Barba','Arevalo','Lago','Marques','Cobos','Nicolas','Cuadrado','Cervera','Angulo','Valls','Muñiz','Ochoa','Cabezas','Pujol','Alfaro','Vaquero','Barreiro','Martínez','Puente','Navarrete','Bello','Granados','Peralta','Latorre','Becerra','Velez','Castellanos','Rovira','Ocaña','Tapia','Vergara','da Silva','Rodríguez','Sastre','Losada','Estrada','Campo','Corrales','Egea','Gamez','Godoy','Garca','Da-Silva','Aznar','Huertas','Segovia','Fraile','Gonzales','Ruano','Cerezo','Duarte','Fajardo','Mejias','Guijarro','Valenzuela','Falcon','Morcillo','Cebrian','Catalan','Alcantara','Arjona','Borrego','del Valle','Carvajal','Barbero','Toro','Ariza','Wang','Romera','Ferreiro','Barragan','Sainz','Peinado','Royo','Lin','Rosales','Morillo','Melero','Jorge','Sole','Pavon','Llamas','Alcaide','Portillo','Real','Agudo','Barrio','Duque','Espejo','Lobato','de Miguel','Valdes','Tirado','Tejero','Gonzalo','Canovas','Gordillo','Figueroa','Criado','Galvan','Grande','Chamorro','Solano','Pla','Llorens','Davila','Dorado','Freire','Moyano','Saenz','Tena','Vives','Rosado','Calleja','Frias','Pizarro','Amaya','Mosquera','Ferrero','Zambrano','Olmedo','Huerta','Bonet','Serna','Alcalde','del Pozo','Noguera','Lafuente','Paniagua','Ahmed','Poveda','Mateu','Mira'
]); // 47 910 526

let country5 = new Country('Serbia', 2, 50, 70, ['Aćim','Aleksa','Aleksej','Aleksije','Aljoša','Anastasije','Andreja','Andrija','Anton','Antonije','Arsenije','Atanasije','Avram','Berislav','Blagoje','Boban','Bogdan','Bogoljub','Bojan','Borimir','Boris','Borislav','Borivoje','Boško','Božidar','Božo','Brajan','Brajko','Branimir','Branislav','Branko','Bratislav','Budimir','Časlav','Čedomir','Cvijan','Danilo','Dabiživ','Dalibor','Damir','Damjan','Danijel','Danko','Darko','David','Davor','Dejan','Desimir','Dimitrije','Đoka','Djoko','Đuraš','Dobrivoje','Dobroslav','Đorđe','Dragan','Dragiša','Drago','Dragoje','Dragojlo','Dragoljub','Dragomir','Dragoslav','Dragutin','Draško','Dražeta','Dren','Dubravko','Đura','Đurađ','Đuro','Dušan','Duško','Filip','Filotije','Gavrilo','Georgije','Gerasim','Gligorije','Gojko','Goran','Gordan','Grgur','Grigorije','Hvalimir','Ignjat','Ignjatije','Ilarion','Ilija','Ivan','Ivica','Jadranko','Jakov','Janko','Jasmina','Jezdimir','Joanikije','Josif','Jovan','Jovica','Junije','Kalinik','Kirilo','Kosta','Kristijan','Krsto','Kuzman','Lazar','Ljuba','Ljubiša','Ljubisav','Ljubo','Lubomir','Mardarije','Marinko','Marjan','Marko','Mateja','Matija','Mihailo','Mihajlo','Mijailo','Mijat','Miladin','Milan','Mile','Milenko','Mileta','Milić','Milisav','Milivoj','Milivoje','Miljan','Miljko','Milko','Miloje','Milojko','Milomir','Milorad','Miloš','Milosav','Milovan','Milutin','Miodrag','Miomir','Mirko','Miroljub','Miroslav','Miško','Mita','Mitar','Mladen','Mojsije','Momčilo','Momir','Nebojša','Nectarios','Nedeljko','Nemanja','Nenad','Neno','Neven','Nikola','Nikša','Novica','Obrad','Obren','Ognjen','Oliver','Ostoja','Paja','Pavle','Perica','Pero','Petar','Petko','Predislav','Predrag','Pribislav','Prodan','Prvoslav','Radenko','Radič','Radiša','Radivoj','Radivoje','Radmilo','Radoje','Radojko','Radomir','Radonja','Radoš','Radosav','Radoslav','Radovan','Radul','Rajko','Ranko','Ratimir','Ratko','Ratomir','Repoš','Risto','Rodoljub','Ruvim','Saša','Sava','Savatije','Savo','Simeon','Simo','Siniša','Slaven','Slaviša','Slavko','Slavoljub','Slavomir','Slobodan','Smiljan','Spasoje','Srđan','Srećko','Sreten','Stanimir','Staniša','Stanislav','Stanko','Stanoje','Stefan','Stevo','Stjepan','Stojan','Stracimir','Strahinja','Svetislav','Svetozar','Tadija','Tanasko','Teodor','Teodosije','Tihomir','Todor','Toma','Tomislav','Tomo','Trifun','Uglješa','Uroš','Vanja','Vasa','Vasilije','Velibor','Velichko','Velimir','Velizar','Veljko','Veselin','Vidak','Vidoje','Vikentije','Višeslav','Vitomir','Vlada','Vladan','Vlade','Vladeta','Vladislav','Vlado','Vladoje','Vlastimir','Vlatko','Vojin','Vojislav','Vojkan','Vujadin','Vuk','Vukajlo','Vukan','Vukašin','Vukmir','Vukota','Vuksan','Zaharija','Žarko','Zdravko','Želimir','Željko','Živan','Živko','Živojin','Živorad','Zlatan','Zlatko','Zoran','Zvezdan','Zvonimir','Zvonko'],
['Andrich','Antonich','Babic','Babin','Bakula','Basara','Belich','Belin','Bolich','Borich','Bosko','Boskovich','Bukovac','Busic','Crnkovich','Cusic','Darin','Dedic','Despot','Devich','Djordjevic','Dragan','Dragich','Dragovich','Dulin','Filipovich','Grahovac','Ilic','Ilich','Jankovich','Jovanovic','Jovanovich','Katich','Knezevich','Kolesar','Korach','Kosanovich','Kosich','Kostic','Kovacevic','Kovacevich','Kovacich','Lalich','Lazich','Lukin','Lulich','Malin','Mamula','Marich','Marin','Marinkovich','Markovic','Markovich','Marovich','Maslar','Matovich','Medich','Mesaros','Milanovich','Milich','Milkovich','Milosevich','Milovich','Mitrovich','Music','Musich','Nikolic','Nikolich','Novakovich','Novich','Obradovich','Palkovic','Panich','Pesa','Popovic','Primer','Radakovich','Radich','Radin','Rados','Radovich','Rakich','Ratkovich','Rebich','Rodich','Salopek','Sankovich','Sarich','Sarich','Savic','Savich','Segan','Simic','Simich','Skorich','Stanich','Stankovic','Stankovich','Stanovich','Starcevich','Stefanovich','Stepanovich','Sulentic','Todorovich','Trbovich','Uzelac','Vlasic','Vukelich','Vukich'
]); // 6 736 216

let country6 = new Country('Australia', 4, 40, 60,
['Alan','Arnold','Liam','Noah','Oliver','James','Elijah','Mateo','Theodore','Henry','Lucas','William','Benjamin','Levi','Sebastian','Ezra','Michael','Daniel','Leo','Owen','Samuel','Hudson','Asher','Luca','Ethan','John','David','Jackson','Joseph','Mason','Luke','Matthew','Julian','Dylan','Elias','Jacob','Maverick','Gabriel','Logan','Aiden','Thomas','Isaac','Miles','Grayson','Santiago','Anthony','Wyatt','Carter','Jayden','Ezekiel','Caleb','Cooper','Josiah','Charles','Christopher','Isaiah','Nolan','Cameron','Nathan','Joshua','Kai','Waylon','Angel','Lincoln','Andrew','Roman','Adrian','Aaron','Wesley','Ian','Thiago','Axel','Brooks','Bennett','Weston','Rowan','Christian','Theo','Beau','Eli','Silas','Jonathan','Ryan','Leonardo','Walker','Jaxon','Micah','Everett','Robert','Enzo','Parker','Jeremiah','Jose','Colton','Luka','Easton','Landon','Jordan','Amir','Gael','Austin','Adam','Jameson','August','Xavier','Myles','Dominic','Damian','Nicholas','Jace','Carson','Atlas','Adriel','Kayden','Hunter','River','Greyson','Emmett','Harrison','Vincent','Milo','Jasper','Giovanni','Jonah','Zion','Connor','Sawyer','Arthur','Ryder','Archer','Lorenzo','Declan','Emiliano','Luis','Diego','George','Evan','Jaxson','Carlos','Graham','Juan','Kingston','Nathaniel','Matteo','Legend','Malachi','Jason','Leon','Dawson','Bryson','Amari','Calvin','Ivan','Chase','Cole','Ashton','Ace','Arlo','Dean','Brayden','Jude','Hayden','Max','Matias','Rhett','Jayce','Elliott','Alan','Braxton','Kaiden','Zachary','Jesus','Emmanuel','Adonis','Charlie','Judah','Tyler','Elliot','Antonio','Emilio','Camden','Stetson','Maxwell','Ryker','Justin','Kevin','Messiah','Finn','Bentley','Ayden','Zayden','Felix','Nicolas','Miguel','Maddox','Beckett','Tate','Caden','Beckham','Andres','Alejandro','Alex','Jesse','Brody','Tucker','Jett','Barrett','Knox','Hayes','Peter','Timothy','Joel','Edward','Griffin','Xander','Oscar','Victor','Abraham','Brandon','Abel','Richard','Callum','Riley','Patrick','Karter','Malakai','Eric','Grant','Israel','Milan','Gavin','Rafael','Tatum','Kairo','Elian','Kyrie','Louis','Lukas','Javier','Nico','Avery','Rory','Aziel','Ismael','Jeremy','Zayn','Cohen','Simon','Marcus','Steven','Mark','Dallas','Tristan','Lane','Blake','Paul','Paxton','Bryce','Nash','Crew','Kash','Kenneth','Omar','Colt','Lennox','King','Walter','Emerson','Phoenix','Jaylen','Derek','Muhammad','Ellis','Kaleb','Preston','Jorge','Zane','Kayson','Cade','Tobias','Otto','Kaden','Remington','Atticus','Finley','Holden','Jax','Cash','Martin','Ronan','Maximiliano','Malcolm','Romeo','Josue','Francisco','Bodhi','Cyrus','Koa','Angelo','Aidan','Jensen','Erick','Hendrix','Warren','Bryan','Cody','Leonel','Onyx','Ali','Andre','Jaziel','Clayton','Saint','Dante','Reid','Casey','Brian','Gideon','Niko','Maximus','Colter','Kyler','Brady','Zyaire','Cristian','Cayden','Harvey','Cruz','Dakota','Damien','Manuel','Anderson','Cairo','Colin','Joaquin','Ezequiel','Karson','Callan','Briggs','Khalil','Wade','Jared','Fernando','Ari','Colson','Kylian','Archie','Banks','Bowen','Kade','Daxton','Jaden','Rhys','Sonny','Zander','Eduardo','Iker','Sullivan','Bradley','Raymond','Odin','Spencer','Stephen','Prince','Brantley','Killian','Kamari','Cesar','Dariel','Eithan','Mathias','Ricardo','Orion','Titus','Luciano','Rylan','Pablo','Chance','Travis','Kohen','Marco','Jay','Malik','Hector','Edwin','Armani','Bodie','Shiloh','Marshall','Remy','Russell','Baylor','Kameron','Tyson','Grady','Oakley','Baker','Winston','Kane','Julius','Desmond','Royal','Sterling','Mario','Kylo','Sergio','Jake','Kashton','Shepherd','Franklin','Ibrahim','Ares','Koda','Lawson','Hugo','Kyle','Kyson','Kobe','Pedro','Santino','Wilder','Sage','Raiden','Damon','Nasir','Sean','Forrest','Kian','Reed','Tanner','Jalen','Apollo','Zayne','Nehemiah','Edgar','Johnny','Clark','Eden','Gunner','Isaias','Esteban','Hank','Alijah','Solomon','Wells','Sutton','Royce','Callen','Reece','Gianni','Noel','Quinn','Raphael','Corbin','Erik','Tripp','Atreus','Francis','Kayce','Callahan','Devin','Troy','Sylas','Fabian','Zaire','Donovan','Johnathan','Frank','Lewis','Moshe','Adan','Alexis','Tadeo','Ronin','Marcos','Kieran','Leonidas','Bo','Kendrick','Ruben','Camilo','Garrett','Matthias','Emanuel','Jeffrey','Collin','Lucian','Augustus','Memphis','Rowen','Yusuf','Finnegan','Makai','Lionel','Caiden','Rodrigo','Uriel','Lucca','Philip','Andy','Kaison','Jaiden','Porter','Jasiah','Ridge','Frederick','Amiri','Rocco','Asa','Ayaan','Kason','Denver','Dalton','Major','Valentino','Allen','Kolton','Zaiden','Ariel','Rome','Ford','Leland','Marcelo',
'Seth','Jamir','Leandro','Miller','Roberto','Alessandro','Gregory','Hezekiah','Jonas','Cassian','Deacon','Jaxton','Keanu','Alonzo','Moises','Conrad','Drew','Bruce','Mohamed','Anakin','Soren','Mack','Pierce','Kylan','Princeton','Zain','Trevor','Morgan','Ozzy','Roy','Dominick','Shane','Hamza','Moses','Dax','Lawrence','Ander','Ledger','Enrique','Rayan','Johan','Saul','Jamari','Armando','Kaysen','Samson','Azariah','Maximilian','Rio','Braylen','Julio','Mohammad','Cassius','Kasen','Maximo','Omari','Clay','Izaiah','Lian','Emir','Jaime','Samir','Gerardo','Kaizen','Zachariah','Jayson','Albert','Taylor','Sincere','Cillian','Gunnar','Boone','Raul','Jamie','Jayceon','Scott','Westin','Danny','Arjun','Kamden','Colby','Peyton','Koen','Nikolai','Dorian','Ocean','Louie','Layton','Ronald','Jase','Kyro','Benson','Davis','Huxley','Kenzo','Conor','Mohammed','Arturo','Phillip','Augustine','Reign','Yosef','Kareem','Keegan','Vicente','Salem','Reese','Fletcher','Shawn','Braylon','Alden','Julien','Cannon','Chaim','Gustavo','Boston','Zeke','Eliam','Corey','Dennis','Madden','Marvin','Elio','Krew','Ahmed','Layne','Nikolas','Mac','Otis','Harlan','Azriel','Emmitt','Brixton','Donald','Musa','Amos','Jamison','Dario','Roland','Zakai','Aarav','Caspian','Finnley','Raylan','Mauricio','Briar','Wilson','Chosen','Sam','Tru','Trace','Waylen','Quincy','Santana','Creed','Jakari','Westley','Amias','Azrael','Drake','Duke','Ahmad','Axton','Chandler','Hassan','Houston','Tommy','Eliseo','Dustin','Leonard','Kyree','Truett','Abdiel','Azael','Ezrah','Zamir','Dexter','Salvador','Uriah','Ryland','Zyair','Karim','Lee','Rhodes','Bruno','Case','Mylo','Valentin','Abram','Avyaan','Cal','Keith','Alvaro','Enoch','Trey','Clyde','Nathanael','Khai','Rex','Zaid','Dutton','Skyler','Tomas','Wylder','Darius','Crue','Jakai','Zayd','Gage','Riggs','Wayne','Jiraiya','Junior','Aryan','Carmelo','Conner','Alberto','Alfredo','Loyal','Douglas','Vincenzo','Aron','Casen','Forest','Avi','Bellamy','Emery','Bridger','Brock','Misael','Lennon','Zahir','Boden','Derrick','Dilan','Roger','Marcel','Rayden','Jefferson','Alvin','Kaiser','Blaze','Dillon','Magnus','Quentin','Ray','Dakari','Lachlan','Ty','Abdullah','Chris','Orlando','Yael','Gian','Benicio','Franco','Evander','Flynn','Harry','Robin','Sevyn','Hugh','Aries','Cason','Idris','Ambrose','Issac','Yehuda','Brycen','Cayson','Rey','Santos','Ben','Nelson','Wes','Westyn','Khaza','Bjorn','Kiaan','Seven','Watson','Gatlin','Izael','Stanley','Allan','Jahmir','Landen','Neil','Quinton','Chozen','Noe','Reuben','Damir','Bear','Jimmy','Kannon','Lance','Melvin','Remi','Yousef','Lochlan','Arian','Kenji','Khari','Rohan','Legacy','Edison','Emory','Rudy','Eliel','Aden','Byron','Dereck','Everest','Yahir','Guillermo','Alec','Brodie','Massimo','Mitchell','Anders','Alonso','Jaxxon','Tony','Jireh','Kingsley','Jerry','Ayan','Brayan','Ramon','Jagger','Elisha','Vihaan','Teo','Eddie','Judson','Leif','Trenton','Grey','Joziah','Felipe','Jesiah','Zyon','Kyaire','Ernesto','Ishaan','Matheo','Ricky','Fisher','Keaton','Kylen','Marcellus','Izan','Leroy','Jedidiah','Ignacio','Ira','Zev','Mustafa','Yahya','Aurelio','Brendan','Calum','Jericho','Nixon','Demetrius','Eiden','Rocky','Langston','Jovanni','Mathew','Landyn','Murphy','Axl','Dane','Jrue','Justice','Kellan','Semaj','Thaddeus','Curtis','Dash','Zavier','Devon','Joe','Joey','Jon','Harlem','Jairo','Ryatt','Salvatore','Van','Zechariah','Coleson','Eugene','Kellen','Alistair','Colten','Jabari','Lucien','Castiel','Cain','Harold','Alfred','Benedict','Shmuel','Duncan','Ermias','Yadiel','Imran','Kaisen','Zen','Eren','Kolson','Kye','Jasiel','Kyren','Marlon','Palmer','Adler','Aldo','Meir','Osiris','Ameer','Kartier','Wesson','Ahmir','Mordechai','Nova','Randy','Shepard','Talon','Vance','Asaiah','Boaz','Kenai','Jones','Carl','Stefan','Deandre','Kelvin','Leighton','Yaakov','Foster','Rishi','Yisroel','Darwin','Neo','Titan','Maurice','Mccoy','Alfonso','Henrik','Jeremias','Kole','Mael','True','Veer','Jadiel','Karsyn','Mekhi','Atharv','Darren','Eliezer','Gordon','Mikael','Stone','Wren','Ephraim','Osman','Ulises','Kody','Thatcher','Abner','Cullen','Damari','Hollis'], 
['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts','Gomez','Phillips','Evans','Turner','Diaz','Parker','Cruz','Edwards','Collins','Reyes','Stewart','Morris','Morales','Murphy','Cook','Rogers','Gutierrez','Ortiz','Morgan','Cooper','Peterson','Bailey','Reed','Kelly','Howard','Ramos','Kim','Cox','Ward','Richardson','Watson','Brooks','Chavez','Wood','James','Bennett','Gray','Mendoza','Ruiz','Hughes','Price','Alvarez','Castillo','Sanders','Patel','Myers','Long','Ross','Foster','Jimenez','Powell','Jenkins','Perry','Russell','Sullivan','Bell','Coleman','Butler','Henderson','Barnes','Gonzales','Fisher','Vasquez','Simmons','Romero','Jordan','Patterson','Alexander','Hamilton','Graham','Reynolds','Griffin','Wallace','Moreno','West','Cole','Hayes','Bryant','Herrera','Gibson','Ellis','Tran','Medina','Aguilar','Stevens','Murray','Ford','Castro','Marshall','Owens','Harrison','Fernandez','Mcdonald','Woods','Washington','Kennedy','Wells','Vargas','Henry','Chen','Freeman','Webb','Tucker','Guzman','Burns','Crawford','Olson','Simpson','Porter','Hunter','Gordon','Mendez','Silva','Shaw','Snyder','Mason','Dixon','Munoz','Hunt','Hicks','Holmes','Palmer','Wagner','Black','Robertson','Boyd','Rose','Stone','Salazar','Fox','Warren','Mills','Meyer','Rice','Schmidt','Garza','Daniels','Ferguson','Nichols','Stephens','Soto','Weaver','Ryan','Gardner','Payne','Grant','Dunn','Kelley','Spencer','Hawkins','Arnold','Pierce','Vazquez','Hansen','Peters','Santos','Hart','Bradley','Knight','Elliott','Cunningham','Duncan','Armstrong','Hudson','Carroll','Lane','Riley','Andrews','Alvarado','Ray','Delgado','Berry','Perkins','Hoffman','Johnston','Matthews','Pena','Richards','Contreras','Willis','Carpenter','Lawrence','Sandoval','Guerrero','George','Chapman','Rios','Estrada','Ortega','Watkins','Greene','Nunez','Wheeler','Valdez','Harper','Burke','Larson','Santiago','Maldonado','Morrison','Franklin','Carlson','Austin','Dominguez','Carr','Lawson','Jacobs','Obrien','Lynch','Singh','Vega','Bishop','Montgomery','Oliver','Jensen','Harvey','Williamson','Gilbert','Dean','Sims','Espinoza','Howell','Li','Wong','Reid','Hanson','Le','Mccoy','Garrett','Burton','Fuller','Wang','Weber','Welch','Rojas','Lucas','Marquez','Fields','Park','Yang','Little','Banks','Padilla','Day','Walsh','Bowman','Schultz','Luna','Fowler','Mejia','Davidson','Acosta','Brewer','May','Holland','Juarez','Newman','Pearson','Curtis','Cortez','Douglas','Schneider','Joseph','Barrett','Navarro','Figueroa','Keller','Avila','Wade','Molina','Stanley','Hopkins','Campos','Barnett','Bates','Chambers','Caldwell','Beck','Lambert','Miranda','Byrd','Craig','Ayala','Lowe','Frazier','Powers','Neal','Leonard','Gregory','Carrillo','Sutton','Fleming','Rhodes','Shelton','Schwartz','Norris','Jennings','Watts','Duran','Walters','Cohen','Mcdaniel','Moran','Parks','Steele','Vaughn','Becker','Holt','Deleon','Barker','Terry','Hale','Leon','Hail','Benson','Haynes','Horton','Miles','Lyons','Pham','Graves','Bush','Thornton','Wolfe','Warner','Cabrera','Mckinney','Mann','Zimmerman','Dawson','Lara','Fletcher','Page','Mccarthy','Love','Robles','Cervantes','Solis','Erickson','Reeves','Chang','Klein','Salinas','Fuentes','Baldwin','Daniel','Simon','Velasquez','Hardy','Higgins','Aguirre','Lin','Cummings','Chandler','Sharp','Barber','Bowen','Ochoa','Dennis','Robbins','Liu','Ramsey','Francis','Griffith','Paul','Blair','Oconnor','Cardenas','Pacheco','Cross','Calderon','Quinn','Moss','Swanson','Chan','Rivas','Khan','Rodgers','Serrano','Fitzgerald','Rosales','Stevenson','Christensen','Manning','Gill','Curry','Mclaughlin','Harmon','Mcgee','Gross','Doyle','Garner','Newton','Burgess','Reese','Walton','Blake','Trujillo','Adkins','Brady','Goodman','Roman','Webster','Goodwin','Fischer','Huang','Potter','Delacruz','Montoya','Todd','Wu','Hines','Mullins','Castaneda','Malone','Cannon','Tate','Mack','Sherman','Hubbard','Hodges','Zhang','Guerra','Wolf','Valencia','Saunders','Franco','Rowe','Gallagher','Farmer','Hammond','Hampton','Townsend','Ingram','Wise','Gallegos','Clarke','Barton','Schroeder','Maxwell','Waters','Logan','Camacho','Strickland','Norman','Person','Colon','Parsons','Frank',
'Harrington','Glover','Osborne','Buchanan','Casey','Floyd','Patton','Ibarra','Ball','Tyler','Suarez','Bowers','Orozco','Salas','Cobb','Gibbs','Andrade','Bauer','Conner','Moody','Escobar','Mcguire','Lloyd','Mueller','Hartman','French','Kramer','Mcbride','Pope','Lindsey','Velazquez','Norton','Mccormick','Sparks','Flynn','Yates','Hogan','Marsh','Macias','Villanueva','Zamora','Pratt','Stokes','Owen','Ballard','Lang','Brock','Villarreal','Charles','Drake','Barrera','Cain','Patrick','Pineda','Burnett','Mercado','Santana','Shepherd','Bautista','Ali','Shaffer','Lamb','Trevino','Mckenzie','Hess','Beil','Olsen','Cochran','Morton','Nash','Wilkins','Petersen','Briggs','Shah','Roth','Nicholson','Holloway','Lozano','Rangel','Flowers','Hoover','Short','Arias','Mora','Valenzuela','Bryan','Meyers','Weiss','Underwood','Bass','Greer','Summers','Houston','Carson','Morrow','Clayton','Whitaker','Decker','Yoder','Collier','Zuniga','Carey','Wilcox','Melendez','Poole','Roberson','Larsen','Conley','Davenport','Copeland','Massey','Lam','Huff','Rocha','Cameron','Jefferson','Hood','Monroe','Anthony','Pittman','Huynh','Randall','Singleton','Kirk','Combs','Mathis','Christian','Skinner','Bradford','Richard','Galvan','Wall','Boone','Kirby','Wilkinson','Bridges','Bruce','Atkinson','Velez','Meza','Roy','Vincent','York','Hodge','Villa','Abbott','Allison','Tapia','Gates','Chase','Sosa','Sweeney','Farrell','Wyatt','Dalton','Horn','Barron','Phelps','Yu','Dickerson','Heath','Foley','Atkins','Mathews','Bonilla','Acevedo','Benitez','Zavala','Hensley','Glenn','Cisneros','Harrell','Shields','Rubio','Huffman','Choi','Boyer','Garrison','Arroyo','Bond','Kane','Hancock','Callahan','Dillon','Cline','Wiggins','Grimes','Arellano','Melton','Oneill','Savage','Ho','Beltran','Pitts','Parrish','Ponce','Rich','Booth','Koch','Golden','Ware','Brennan','Mcdowell','Marks','Cantu','Humphrey','Baxter','Sawyer','Clay','Tanner','Hutchinson','Kaur','Berg','Wiley','Gilmore','Russo','Villegas','Hobbs','Keith','Wilkerson','Ahmed','Beard','Mcclain','Montes','Mata','Rosario','Vang','Walter','Henson','Oneal','Mosley','Mcclure','Beasley','Stephenson','Snow','Huerta','Preston','Vance','Barry','Johns','Eaton','Blackwell','Dyer','Prince','Macdonald','Solomon','Guevara','Stafford','English','Hurst','Woodard','Cortes','Shannon','Kemp','Nolan','Mccullough','Merritt','Murillo','Moon','Salgado','Strong','Kline','Cordova','Barajas','Roach','Rosas','Winters','Jacobson','Lester','Knox','Bullock','Kerr','Leach','Meadows','Orr','Davila','Whitehead','Pruitt','Kent','Conway','Mckee','Barr','David','Dejesus','Marin','Berger','Mcintyre','Blankenship','Gaines','Palacios','Cuevas','Bartlett','Durham','Dorsey','Mccall','Odonnell','Stein','Browning','Stout','Lowery','Sloan','Mclean','Hendricks','Calhoun','Sexton','Chung','Gentry','Hull','Duarte','Ellison','Nielsen','Gillespie','Buck','Middleton','Sellers','Leblanc','Esparza','Hardin','Bradshaw','Mcintosh','Howe','Livingston','Frost','Glass','Morse','Knapp','Herman','Stark','Bravo','Noble','Spears','Weeks','Corona','Frederick','Buckley','Mcfarland','Hebert','Enriquez','Hickman','Quintero','Randolph','Schaefer','Walls','Trejo','House','Reilly','Pennington','Michael','Conrad','Giles','Benjamin','Crosby','Fitzpatrick','Donovan','Mays','Mahoney','Valentine','Raymond','Medrano','Hahn','Mcmillan','Small','Bentley','Felix','Peck','Lucero','Boyle','Hanna','Pace','Rush','Hurley','Harding','Mcconnell','Bernal','Nava','Ayers','Everett','Ventura','Avery','Pugh','Mayer','Bender','Shepard','Mcmahon','Landry','Case','Sampson','Moses','Magana','Blackburn','Dunlap','Gould','Duffy','Vaughan','Herring','Mckay','Espinosa','Rivers','Farley','Bernard','Ashley','Friedman','Potts','Truong','Costa','Correa','Blevins','Nixon','Clements','Fry','Delarosa','Best','Benton','Lugo','Portillo','Dougherty','Crane','Haley','Phan','Villalobos','Blanchard','Horne','Finley','Quintana','Lynn','Esquivel','Bean','Dodson','Mullen','Xiong','Hayden','Cano','Levy','Huber','Richmond','Moyer','Lim','Frye','Sheppard','Mccarty','Avalos','Booker','Waller','Parra','Woodward','Jaramillo','Krueger','Rasmussen','Brandt','Peralta','Donaldson','Stuart','Faulkner','Maynard','Galindo','Coffey','Estes','Sanford','Burch','Maddox','Vo','Oconnell','Vu','Andersen','Spence','Mcpherson','Church','Schmitt','Stanton','Leal','Cherry','Compton','Dudley','Sierra','Pollard','Alfaro','Hester','Proctor','Lu','Hinton','Novak','Good','Madden','Mccann','Terrell','Jarvis','Dickson','Reyna','Cantrell','Mayo','Branch','Hendrix','Rollins','Rowland','Whitney','Duke','Odom','Daugherty','Travis','Tang','Archer'
]); // 26 713 205

let country7 = new Country('Lithuania', 1, 50, 50, ['Adolfas','Adomas','Aidas','Aistis','Aivaras','Albinas','Aleksandras','Alfonsas','Alfredas','Algimantas','Algirdas','Algis','Aloyzas','Alvydas','Andrius','Antanas','Arnas','Arnoldas','Artūras','Arūnas','Arvydas','Audrius','Aurelijus','Aurimas','Balys','Benas','Benediktas','Benjaminas','Bernardas','Bronislovas','Bronius','Česlovas','Dainius','Danas','Darius','Daumantas','Deimantas','Deividas','Domantas','Dominykas','Donatas','Džiugas','Edgaras','Edmundas','Eduardas','Edvardas','Edvinas','Egidijus','Eimantas','Eligijus','Ernestas','Eugenijus','Evaldas','Feliksas','Gediminas','Giedrius','Gimbutas','Gintaras','Gintautas','Gražvydas','Gvidas','Gytis','Henrikas','Ignas','Isakas','Jeronimas','Jokūbas','Jonas','Julius','Juozapas','Juozas','Jurgis','Jurijus','Justas','Justinas','Karolis','Kazimieras','Kazys','Kęstas','Kęstutis','Laurynas','Leonardas','Leonas','Linas','Lionginas','Liudas','Liudvikas','Lukas','Mantas','Marijonas','Markas','Martynas','Matas','Mikalojus','Mindaugas','Modestas','Mykolas','Nerijus','Norbertas','Osvaldas','Ovidijus','Paulius','Petras','Povilas','Pranas','Raimondas','Raimundas','Ramūnas','Rapolas','Regimantas','Remigijus','Ričardas','Rimantas','Rimas','Rimvydas','Robertas','Rokas','Rolandas','Romanas','Romas','Romualdas','Rytis','Šarūnas','Saulius','Sigitas','Silvestras','Simas','Simonas','Stasys','Steponas','Svajūnas','Tadas','Tauras','Tautvilas','Tautvydas','Teodoras','Tomas','Urbonas','Vaidas','Vaidotas','Valdas','Valdemaras','Vidas','Vidmantas','Viktoras','Vilmantas','Vincas','Virgilijus','Virginijus','Vitalijus','Vladas','Vygantas','Vytautas','Vytenis','Zenonas','Zigmas','Žydrūnas','Žygimantas'], 
['Adamkus','Aistis','Alekna','Aleksa','Aleliūnas','Alijevas','Alseika','Andrijauskas','Andrulis','Arlauskas','Armonas','Ašoklis','Astikas','Astrauskas','Avižonis','Babickas','Babkauskas','Babrauskas','Bačiulis','Bačkis','Bagdonas','Bagdžius','Baginskas','Bajoras','Balaišis','Balčiūnas','Balčytis','Balinskis','Balsys','Baltakis','Baltrūnas','Baltušis','Baltuška','Banys','Baranauskas','Barauskas','Baravykas','Bardzilauskas','Bareikis','Barkauskas','Bartkus','Bartulis','Bartuska','Bastys','Benetis','Berankis','Bernatonis','Bernotas','Bertašius','Beržanskis','Bielinis','Birutis','Biržiška','Bitė','Brazauskas','Brazdauskis','Briedis','Bučas','Budrys','Bujwid','Burba','Butkus','Butnorius','Butvilas','Čepulis','Čėsna','Česnauskis','Cicėnas','Čigriejus','Čiurlionis','Dagys','Dailidė','Dainys','Dambrauskas','Danys','Dauguvietis','Daukantas','Daukša','Daumantas','Dautartas','Degutis','Didžiokas','Dilys','Dirgėla','Dluskis','Domarkas','Draugelis','Drazdauskas','Dūda','Dumčius','Dvarionas','Eidintas','Ežerskis','Garšva','Gedgaudas','Gimbutas','Gintautas','Girdenis','Glossary','Gražulis','Grinius','Grybauskas','Gylys','Ilgauskas','Ivanauskas','Jablonskis','Jakubauskas','Jakubėnas','Jankauskas','Jankūnas','Janonis','Janušauskas','Javtokas','Jonynas','Jovaiša','Kačanauskas','Kačinskas','Kairelis','Kairys','Kalinauskas','Kaminskas','Karalius','Karbauskis','Karčemarskas','Karnišovas','Karosas','Karvelis','Katelynas','Katkus','Kaukėnas','Kavaliauskas','Kazickas','Kazlauskas','Kiedis','Kleiza','Klimas','Kojałowicz','Kondrotas','Korsakas','Kreivys','Krikščiūnas','Kubilius','Kudirka','Kulvietis','Kundrotas','Kūris','Kymantas','Landsbergis','Leonas','Liepa','Lupeikis','Macijauskas','Mačiulis','Maldeikis','Malinauskas','Mališauskas','Mamontovas','Marcinkus','Marčiulionis','Martinkėnas','Mašiotas','Masiulis','Matonis','Matulionis','Mažeika','Mekas','Mikalauskas','Mikėnas','Misiūnas','Miškinis','Mockus','Montvila','Motiejūnas','Nagevičius','Narbutas','Narbutt','Nausėda','Navickas','Nekrošius','Norbutas','Noreika','Norkus','Novickis','Pakalniškis','Paleckis','Palubinskas','Paulauskas','Pavilionis','Pavilonis','Petrauskas','Petrovas','Petrulis','Pocius','Poska','Poškus','Povilionis','Poviliūnas','Povilonis','Požela','Prapiestis','Putwiński','Račkauskas','Radžvilas','Ramanauskas','Rapšys','Raudonikis','Rimas','Rimgaila','Rimkus','Rimša','Rolnikas','Romaška','Sabeckis','Sabonis','Sabutis','Sakalauskas','Šaltenis','Šapoka','Šaulys','Savickas','Savickis','Savukynas','Semaška','Šėmeta','Šepetys','Šernas','Šeškus','Šidlauskas','Šimkus','Škėma','Skvernelis','Šlekys','Sluckis','Smetona','Smoriginas','Songaila','Sruoga','Stašinskas','Stauskas','Stonkus','Stonys','Strolia','Šulskis','Šurna','Survilla','Sutkus','Švedas','Tamulis','Tarvydas','Tūbelis','Urbonas','Uscila','Vailokaitis','Vaina','Vaišvila','Vaitkūnas','Vaitkus','Valantinas','Valinskas','Vanagas','Varnas','Varnelis','Vasiliauskas','Velička','Venckus','Venclova','Vengris','Venskus','Vilčinskas','Vileišis','Vilkas','Vilkelis','Višinskis','Vitkauskas','Vizgirda','Vyšniauskas','Wirkus','Yčas','Zabiela','Žagunis','Žemaitis','Žiemelis','Zikaras','Žilinskas','Žilys','Žukauskas','Zuokas','Žvirgždas'
]); // 2 859 110

let country8 = new Country('Latvia', 1, 50, 45, 
['Janis','Martins','Arturs','Roberts','Kristaps','Matiss','Andris','Reinis','Edgars','Rihards','Ernests','Gustavs','Niks','Armands','Ansis','Juris','Janeks','Kaspars','Edvards','Raimonds','Daniels','Emils','Aleksis','Dainis','Maris','Vilnis','Kristofers','Aigars','Toms','Haralds','Imants','Aldis','Guntis','Uldis','Valters','Harijs','Didzis','Krišjānis','Valdis','Lauris','Rolands','Dāvis','Egils','Oskars','Raivis','Ivars','Mārtiņš','Voldemārs','Kārlis','Jānis','Atis','Einārs','Rūdolfs','Miks','Jēkabs','Uvis','Dzintars','Renārs','Aivars','Ainars','Ingars','Gvido','Zigurds','Ludis','Alvis','Varis','Valērijs','Alens','Rainers','Almants','Raitis','Gunārs','Aivis','Edvarts','Aldaris','Eižens','Andulis','Ingus','Viesturs','Verners','Uģis','Ojārs','Rostislavs','Indulis','Valtis','Atvars','Krists','Mārcis','Eriks','Zigmunds','Andis','Reinholds','Raivo','Āris','Zigfrīds','Ēriks','Arvīds','Maigonis'], 
['Aberkass','Adamovičs','Akermanis','Akermans','Aks','Aķis','Alsups','Andernovics','Andreika','Andreiko','Andreiks','Apaļais','Apšenieks','Apšinieks','Apšnieks','Arājs','Arens','Arents','Arēns','Ariņš','Atāls','Augstkalns','Augškalns','Aumanis','Auniņš','Auza','Auziņš84','Auželis','Avinskis','Āks','Āķis','Ārans','Ārends','Ārens','Ārents','Āriņš','Āriņš','Ārnis','Āzis','Āzis','Bajars','Bajārs','Bajors','Balbardis','Balbārdis','Balbārzda','Balčiunas','Balčons','Balčunas','Balčuns','Balčūns','Baliņš','Balodis','Balodīts','Baltadonis','Baltadons','Baltalksnis','Baltbārds','Baltbārzdis','Baltbārzds','Baļčunas','Baļčuns','Baļčūns','Baļuks','Bambulis','Bangovskis','Bankovskis','Baņkovskis','Barans','Barāns','Barenis','Baris','Bariss','Barīss','Barovskis','Barzdelis','Batars','Baters','Bauskenieks','Baušenieks','Bāliņš','Bārenis','Bārens','Bārēns','Bārzdēlis','Bečs','Bečus','Beihmanis','Beika','Beike','Beikmanis','Beiķis','Beinarts','Beinerts','Beitelis','Beitels','Beitiņš','Belkovskis','Bemanis','Bemberis','Bembers','Berkevics','Berkevics','Berķis','Bermans','Bertulis','Bezdelīga','Bēmans','Bērmanis','Bērtulis','Bērzepans','Bērziņš','Bērzmartiņš','Bērzmārtiņš','Bialkovskis','Bicens','Biezais','Bilis','Bilkens','Bilkins','Bille','Billis','Biļķens','Biļķins','Bindžulens','Bindžulis','Birzulis','Biržulis','Biskaps','Biskaps','Bīdermanis','Bīskaps','Bīskaps','Bjalkovskis','Bļodnieks','Bodnieks','Boģis','Bohāns','Bohons','Borkovskis','Borovskis','Bračkus','Brasla','Brazauckis','Brazauskas','Braznovskis','Bražus','Briedis','Briņķis','Brunkevics','Brunovs','Bruņķevics','Brusa','Brusis','Bruss','Bruvers','Brūnavs','Brūveris','Brūvers','Buča','Bučas','Bučis','Bučs','Bugovics','Bugovičs','Buholcs','Buholds','Buholts','Buka','Bullis','Bundurs','Bundzenieks','Bundzinieks','Bundzinskis','Bundziņš','Bundže','Bune','Buners','Buners','Bunēris','Bunēris','Bunga','Bunne','Burbulis','Buša','Bušis','Bušs','Butka','Būka','Cauna','Caurums','Cālītis','Celmiņš','Ceplis','Cers','Ciekurs','Cielava','Cielavs','Cimermanis','Cinis','Cirainis','Cīrainis','Cīrulis','Cīruls','Cunkušs','Čapans','Čapuļs','Čekste','Čipēns','Čuze','Čuža','Čužinskis','Daboliņš','Daģis','Dalbe','Dale','Dankbars','Dankbārs','Darbinieks','Datovs','Dauga','Daugavietis','Daugulis','Dāboliņš','Dālis','Dārziņš','Deičmanis','Deičmans','Desa','Dilēvičs','Diļevičs','Dobelnieks','Dombrovskis','Dreieris','Dreņģeris','Dreņģers','Drevinskis','Druģis','Drukis','Druķis','Drulis','Drulle','Drullis','Dubinskis','Dubovičs','Dude','Duklavs','Duklavs','Dukurs','Dumpis','Duntavs','Duntovs','Dūdars','Dūdelnieks','Dūklavs','Dūklavs','Dūmiņš','Dzeguze','Dzegūze','Dzelzkalējs','Dzilniņš','Ekerts','Elmanis','Ezernieks','Ezers','Ezītis','Ezīts','Ērglis','Feldbergs','Feldmanis','Folkenbergs','Folkmanis','Franke','Franks','Franks','Freija','Fridenbergs','Fridmanis','Friedemanis','Friedenbergs','Frīdemanis','Frīdmanis','Galenieks','Ganiņš','Gaņģis','Garais','Garjānis','Garstiņš','Gasjunis','Gārstiņš','Gerts','Gevelis','Gēgers','Gērķis','Gidrevics','Gilberts','Gildovičs','Gipslis','Glinckis','Glīzdiņš','Glīzds','Glome','Gludiņš','Gļinskis','Gobiņš','Grabovskis','Graube','Grauze','Grenctals','Grendziņš','Grenstals','Grēfis','Grigaļuns','Grigaļūns','Grigans','Grotēns','Grozbergs','Grūba','Gudēls','Gudēvics','Gudža','Gudže','Gulbis','Ģerķis','Ģerts','Ģēģeris','Ģērķis','Ģēvele','Ģēvelis','Ģierts','Ģilberts','Hans','Hāns','Hercogs','Hermanis','Ihle','Ijabs','Ile','Ilgavizs','Irbe','Irbītis','Irbīts','Izaks','Īle','Īlis','Īzaks','Jakabsobs','Jakobsons','Jakovlevs','Jaunzems','Jākabsons','Jākobsons','Jātnieks','Jirgens','Jordēns','Jostiņš','Jukēvics','Juksis','Jukums','Jumiķis','Jurevičs','Kaderis','Kakars','Kaktabulis','Kaktabuls','Kaktiņš','Kampe','Kampiņš','Kampis','Kanbergs','Kancers','Kancītis','Kanniņš','Karpis','Karša','Karše','Karšs','Kasparovics','Kākars','Kānbergs','Kānberģis','Kāpkalns','Kāpostiņš','Kārkliņš','Kārše','Keidāns','Keniņš','Kepala','Kepals','Kēniņš','Kigelis','Kipars','Kipe','Kipis','Kirilka','Kirilko','Kirilks','Kirsis','Klanovskis','Klaudziņš','Klaviņš','Klāviņš','Klebergs','Klidziņš','Klipsons','Kļanovskis','Kļava','Kļavinskis','Kļaviņš','Kociņš','Kociņš','Koknesis','Kondrāts','Koppe','Kopps','Kops','Koškins','Kovals','Kovaļs','Kozlovskis','Kraķītis','Kramiņš','Krastiņš','Kreics','Kreičis','Kreičs','Kreitenbergs','Krēsliņš','Krieviņš','Kristals','Kristiņš','Krišjānis','Krivads','Krivats','Krivāts','Krivinskis','Krūmiņš','Kublinskis','Kugrens','Kugrēns','Kuiva','Kuiva','Kuive','Kukainis','Kulainis','Kulmanis','Kunce','Kundrāts','Kundziņš','Kuntrāts','Kupča',
'Kutra','Kūla','Kviesis','Kvitans','Ķeidāns','Ķeniņš','Ķepals','Ķerus','Ķēniņš','Ķiģelis','Ķipars','Ķipis','Ķirsis','Ķirvels','Ķirvils','Ķiselis','Ķīselis','Labanovičs','Labanovskis','Lacitis','Laiks','Lamberts','Lasmanis','Latons','Latūns','Lauciņš','Laugalis','Laugals','Laukgalis','Laure','Lauriņš','Lauris','Laurs','Lauzējs','Lavenieks','Lācis','Lediņš','Leinieks','Leitlands','Leitlants','Leitlants','Lejnieks','Lepsis','Levenšteins','Lidaks','Lielkoks','Lielramans','Lielturks','Liepa','Lindermanis','Lindešs','Lindišs','Lindmanis','Linga','Liskops','Lībeks','Lībeķis','Līcis','Līdaka','Līrums','Līskops','Lode','Lodens','Lodēns','Lude','Ludiņš','Ludriks','Ludriķis','Lukša','Macpanis','Macpans','Macpāns','Mačens','Mačēns','Magone','Magonis','Magons','Maizitis','Maizits','Maizītis','Majevskis','Majoris','Majors','Maļinovskis','Mangins','Maņģins','Marcinķevičs','Marģis','Markevičs','Markevits','Markēvičs','Markuns','Markūns','Marķevics','Martinsons','Martunelis','Mašulis','Matiss','Matīss','Matspanis','Matulens','Matulevics','Matulevičs','Matulēns','Matulēvičs','Matuļevicš','Matus','Matuss','Matušēvičs','Mauers','Mazais','Mazajs','Mazajs','Mazurs','Mazūrs','Mažeiks','Mālenieks','Mālers','Mārtinsons','Mārtiņkrists','Mārtiņsons','Medinskis','Mediņš','Mednis','Meija','Meijs','Meiris','Meirs','Melacis','Mellacis','Mellupis','Mellups','Melnacis','Melnačs','Memmēns','Memmēns','Mencendorfs','Mengots','Mežāzis','Mežiņš','Mežus','Miezis','Migla','Mihelsons','Miheļsons','Mikšens','Mikšēns','Milgravis','Miliunas','Milliņš','Miļuns','Miļūns','Misa','Misevičs','Misēvičs','Misjuns','Misjūns','Missa','Misse','Misters','Misūns','Mīlgrāvis','Molis','Molla','Mollis','Montvids','Montvīds','Mucenieks','Mucinieks','Mucnieks','Muižzemnieks','Muldars','Mulders','Mustermanis','Mustermans','Mūrnieks','Naglis','Navickis','Navicks','Nerets','Nevedomskis','Niedre','Novickis','Nudiena','Nudiens','Ņevedomskis','Odiņš','Oga','Orliņš','Osis','Osītis','Ozoliņš','Ozols','Padēlis','Padēls','Paegle','Paģis','Pakalns','Pakulis','Paškevics','Paulēns','Pauliņš','Paulīns','Paulovičs','Pauše','Paušis','Paušs','Paušus','Pavasaris','Pavārs','Pārups','Pāve','Pāvs-','Peciņš','Pecolds','Pečulis','Peholds','Peholts','Peizums','Pekalis','Pekals','Pelēns','Petruševits','Petrušēvics','Pēcolts','Pēkalis','Pērkons','Pētersons','Piekus','Piekusis','Piekuss','Pinis','Pinks','Pinne','Pints','Pīrāgs','Platais','Plostiņš','Plucis','Plūcis','Podnieks','Podžuns','Popis','Prātnieks','Priede','Princis','Princs','Puķītis','Pumpurs','Purmals','Purmāls','Purnis','Purvišķis','Putniņš','Putnis','Putns','Puziņš','Pūcens','Pūcēns','Pūpols','Radziņš','Ramanovskis','Ramāns','Rasa','Raviņš','Rāviņš','Reinfelds','Reinsons','Reiss','Reneslācis','Repša','Repše','Repšs','Resnais','Resnis','Rešnis','Rezgalis','Riba','Riebējs','Rigaste','Rigastis','Rigasts','Rigerts','Rijkuris','Rikmanis','Rimavs','Rimkus','Rimkuss','Rimkūns','Rimovs','Ritenbergs','Rīgerts','Rīkuris','Rozenbahs','Rozenbaks','Rozenbergs','Rozens','Rube','Rubenis','Ruciņš','Ručiņš','Rudlapa','Rudzīts','Rukers','Ruķeris','Rumpis','Ruševics','Rušķeris','Rušķers','Rutkevičs','Rutkevičs','Rutkovskis','Rūbe','Rūdlaps','Sala','Saldenais','Salenieks','Salgrāvis','Salinieks','Salmiņš','Saltājs','Sarkanais','Sarkanais','Sarkis','Sarķis','Sauka','Sauke','Saulkalns','Sārķis','Secis','Segliņš','Sējējs','Sietiņš','Silavs','Siliņš','Simbruks','Simenovskis','Simonovičs','Sīlavs','Sīlis','Sīmans','Sīpols','Skalders','Skudriņš','Skujnieks','Skulme','Skulmis','Skultēns','Skūrmanis','Slakters','Slavinskis','Sloka','Slosbergs','Smalkais','Smaļķis','Smidrovskis','Smilga','Smiltenieks','Smudzis','Smūdzis','Spangers','Spanģeris','Spariņš','Spāriņš','Speķis','Spēlmans','Stabuls','Stalģevics','Staļģevics','Stankēvičs','Stasaitis','Stāds','Steinarts','Steinbahs','Steinfelts','Steingolts','Straujais','Straujis','Straume','Straupe','Straups','Strautiņš','Strazdiņš','Strēlis','Striguns','Stružs','Stuburs','Stumbris','Stūburs','Stūre','Stūris','Sujetas','Sujets','Suķis','Sunīts','Šabels','Šablis','Šaltis','Šalts','Šarķis','Šābelis','Šāblis','Šers','Ševics','Šērs','Šidlo','Šimiņš','Širmelis','Širmels','Šitka','Šitke','Šitkus','Šķiliņš','Šlēkste','Šlosbergs','Šlossbergs','Šlozbergs','Šluka','Šļuburs','Šļūka','Šmids','Šmitkens','Šmits','Šnore','Šteinalts','Šteinards','Šteinarts','Šteinfelds','Šteingolds','Štružus','Šturme','Šturms','Štūls','Šuķevics','Šulcs','Šunelis','Šusteris','Šūnelis','Šūnels','Švagars','Švageris','Švītiņš','Tabaka','Tabaks','Tabāks','Tamašauskas','Tamaševskis','Tamašs','Tauriņš','Tārs','Teivens','Terauds','Tikums','Timmermanis','Timms','Timpars','Tims','Tirelis','Tīms','Tīrels','Tītars','Tomass','Tomašauskas','Tomaševskis','Tomašs','Tomoševskis','Tomševskis','Traniņš','Traumanis','Treida','Treide','Treidis','Treids','Treigis','Treiģis','Tumbilis','Tumbils','Tupikevičs','Tupiņš','Tupuls','Turba','Turks','Ubarsts','Ubarts','Udris','Uldriķis','Ulmanis','Ulmans','Undzēns','Untinovskis','Upelnieks','Urbēns','Urbiņš','Urlovskis','Ušerauskis','Uzaitis','Uželis','Ūders','Ūdris','Vadapols','Vadepals','Vadzis','Vaicis','Vainauskis','Vainovskis','Vaitaicis','Vaitaitis','Vaitekuns','Vaiveris','Vaivers','Vajeks','Valenburgs','Valters','Vaļunas','Vaļūns','Vanags','Vangals','Vangols','Varakāja','Varakājs','Varbūts','Varekojs','Varenais','Varna','Varnavičs','Vājeiks','Vārens','Vārna','Vāvere','Vecvagars','Večens','Veģis','Veicāns','Veikmanis','Veršūns','Vējiņš','Vērmele','Vērmelis','Vēršūns','Vēzis','Vieglais','Vilands','Vilciņš','Vilks','Vilķens','Ville','Villers','Vills','Viļums','Vinkleris','Vins','Vinsbergs','Vinšteins','Viņķelis','Visockis','Višķers','Vitarts','Vitārts','Vitkovskis','Vīksna','Vīksne','Vīndedzis','Vīnsbergs','Vīnšteins','Vītels','Vītoliņš','Vorms','Vulfsons','Zaborskis','Zadovskis','Zaķis','Zankovičs','Zariņš','Zaumanis','Zauriņš','Zāle','Zemītis','Zibergs','Ziemelis','Zile','Zilgalvis','Zirnis','Zīle','Zīlis','Znotiņš','Zuika','Zupiņš','Zustars','Zuza','Zuze','Zvaigzne','Zviedris','Zviņģelis','Zvirblis','Zvirbulis','Žanis','Žanno','Žano','Žeberis','Žebers','Žemaitis','Žemeitis','Žibus','Žilinskis','Žirbe','Žīdelis','Žubovskis','Žukovskis','Žuks','Žūka','Žvirblis','Žvirbļa','Žvirbulis'
]); // 1 871 871

let country9 = new Country('Italy', 6, 30, 50, ['Adriano','Alberto','Aldo','Alessandro','Alessio','Alfredo','Andrea','Angelo','Antonio','Antonello','Augusto','Bernardo','Biagio','Bruno','Camillo','Carlo','Claudio','Corrado','Cosimo','Cristian','Daniele','Dario','Davide','Diego','Domenico','Elia','Elio','Edoardo','Emanuele','Emilio','Emiliano','Ernesto','Ezio','Fabio','Fabrizio','Fausto','Federico','Felice','Ferdinando','Filippo','Francesco','Fulvio','Gabriele','Giacomo','Gianluca','Gioele','Giovanni','Giuliano','Giulio','Guido','Lapo','Leonardo','Lorenzo','Luca','Lucio','Ludovico','Luigi','Marcello','Marco','Mario','Massimo','Massimiliano','Matteo','Mattia','Maurizio','Mauro','Michele','Mirco','Neri','Nicola','Niccolo','Paolo','Pasquale','Patrizio','Pietro','Raffaele','Raffaello','Renato','Raul','Riccardo','Roberto','Rocco','Rosario','Ruggero','Salvatore','Salvo','Samuele','Saverio','Sebastiano','Sergio','Silvio','Simone','Stefano','Tiziano','Tommaso','Tullio','Ugo','Umberto','Valentino','Valerio','Vincenzo','Vito','Vittorio','Walter','Zeno'],
['Abate','Abbandando','Abbate','Abbatiello','Abenante','Accettola','Adria','Agri','Agostini','Agostinelli','Agresta','Aiello','Albano','Albertini','Alcamo','Aldighieri','Alessi','Alighieri','Altera','Amato','Ancelotti','Ancellotti','Andolini','Andresano','Anello','Annunziata','Antonaccio','Antonaci','Antonelli','Antonioli','Angelico','Angelini','Angelo','Alfera','Alfieri','Alfonso','Arco','Arcuri','Ardizzone','Argentino','Astrella','Auriemma','Arcangelo','Arosio','Avallone','Avolio','Avvocata','Azzaro','Babolin','Baglioni','Bagnetto','Balboa','Baldan','Ballarin','Balotelli','Bandini','Banetti','Baratta','Barbarigo','Barbaro','Barbato','Baresi','Bargnani','Baroffio','Barrichello','Bartholdi','Barzaghi','Barzini','Basilone','Basilotta','Battitori','Bauco','Bedacholli','Bellenzier','Bellini','Bellucci','Beltrami','Beltramolli','Benatti','Benedetti','Benedetto','Beneventi','Benevento','Bergoglio','Berlusconi','Bernardo','Bertocchi','Bianchi','Bianco','Boccelli','Bonacina','Bonanno','Bonfiglio','Boni','Bonocchi','Bongiovanni','Bonucci','Borrelli','Borriello','Borroni','Botticelli','Brambilla','Brancatella','Brichese','Brioschi','Briffa','Bruschi','Brusco','Bucci','Buccio','Buffon','Buonanno','Buoncuore','Buonaparte','Buono','Buonocore','Buratti','Busi','Butera','Cadorna','Cafaro','Calderone','Calo','Calì','Caliari','Campagna','Campano','Canali','Candreva','Cangemi','Caparelli','Capello','Capotorto','Capone','Caporali','Caprio','Caprioli','Capuano','Caputo','Carangi','Caruso','Casadei','Cascella','Casoli','Cassotto','Castelli','Castelluccio','Castiello','Castiglione','Catalano','Cataldi','Cattapan','Cedrone','Centracchio','Cereghini','Cesareo','Cesari','Cesarin','Cesaroni','Chiecco','Chiellini','Ciccone','Cicci','Cilibrasi','Cimarolli','Cimorelli','Ciocci','Cipriani','Clemente','Clemenza','Cociarelli','Cocci','Cocco','Colangelo','Colombo','Colosimo','Colella','Colletti','Coletti','Como','Consoli','Consonni','Contarini','Conte','Conti','Coppola','Corsetti','Costa','Costanzo','Cresci','Crippa','Crocetti','Cuneo','Cuoco','Cuomo','Cuore','Cupello','Cusano','Cusin','Cutillo','Dal Bon','DalOcchio','Davide','De Agostini','De Angelis','De Bartoli','De Bellis','De Bortoli','De Carlo','De Cristofaro','De Falco','De Filippis','De Flavis','De Jesus','De Luca','De Lucia','De Luigi','De Maio','De Marchi','De Marco','De Maria','De Medici','De Pinto','De Rose','De Rossi','De Russo','De Sanctis','De Santis','De Santo','De Simone','De Stefano','De Vincenzo','Deiana','Del Gatto','Del Giudice','Del Piero','Delapia','Dellucci','Dellabarca','Detti','Di Angelo','Di Adamo','Di Bonito','Di Caprio','Di Francesco','Di Lorenzo','Di Luigi','Di Maggio','Di Maio','Di Meo','Di Moze','Di Norcia','Di Donato','Di Paola','Di Pasquale','Di Piazza','Di Traglia','Di Vincenzo','Di Vittorio','Diodato','Dionigi','Dimucci','DiTullio','Donati','Donato','Donini','Donnatiello','Doria','Durante','Duraturo','Elica','Endrigo','Endrizzi','Eneide','Ercolano','Ercollli','Errani','Esposito','Evangelista','Fabbri','Fabbrini','Fabrizi','Fabris','Falasca','Fallaci','Falco','Falcone','Fantoni','Fantano','Farace','Faraci','Farnese','Farina','Faulmino','Fazio','Fanucci','Fedele','Femia','Ferrari','Ferraro','Ferreri','Ferrero','Ferri','Ferro','Fiaschetti','Finotti','Fiore','Fiorentino','Florentino','Foglietta','Folliero','Fontana','Forni','Forte','Franchitti','Franconero','Franzese','Fragnito','Frinzi','Funghini','Funicello','Fusco','Galbiati','Gallinari','Gallo','Gallucci','Galtieri','Gambetta','Gastaldelli','Gastani','Gatti','Gatto','Gattuso','Garza','Gaudio','Gaultieri','Gelli','Gemelli','Generazzo','Genovese','Genovesi','Gentilcore','Gentile','Gentileschi','Gentili','Gentilini','Geraci','Ghio','Giardello','Giambalvo','Giannelli','Gigante','Gioia','Giordano','Giorgi','Giovinco','Girardi','Girone','Giuliani','Giuliano','Gnecco','Golino','Gorgazzi','Gotti','Gozzi','Graci','Grande','Grasso','Gravina','Gravano','Greco','Grieco','Gualtieri','Guaragna','Gucci','Guercio','Gurino','Guzzo','Iacocca','Iadanza','Iammarino','Incardona','Iannace','Iannelli','Ianni','Iannuzzi','Ientile','Insigne','Intravartolo','Invernizzi','Inzaghi','Ioele','Izzi','Izzo','Jaconelli','Jadanza','Jilani','Jossa','La Guardia','La Malfa','La Marca','La Paglia','La Rocca','La Rosa','Lacertosa','Lalama','Lastra','Lauría','Leone','Leoni','Lepore','Lettiere','Li Donni','Li Fonti','Leonetti','Linotti','Lionetti','Liotta','Liscio','Lisia','Lo Bianco','Lo Cascio','Lo Conte','Lo Duca','Lo Russo','Loggia','Lollo','Lorenzin','Lorenzo','Loretto','Lombardi','Lombardo','Lonardo','Longo','Lori','Lubrano','Lucania','Lucciano','Luciani','Luoni','Lupertazzi','Luppino','Macheca','Maenza','Maffia','Magaddino','Maggi','Maggio','Maggioli','Magosso','Maiolo','Malfatona','Mandelli','Manca','Mancinelli','Mancini','Mancino','Mancuso','Mandarinni','Manetti','Manfredi','Manna','Mantranga','Manzo','Marcello','Marchesi','Marconi','Marinelli','Marin','Marini','Marino','Marotta','Marrone','Marsico','Marsella','Martin','Martinelli','Martini','Martino','Masè','Massera','Masseria','Massi','Mastrangelo','Mauri','Mazza','Mazzanti','Mazzarelli','Mazzeo','Mazzello','Mazzi','Mazzini','Mele','Mignogna','Milan','Milani','Milano','Miniati','Minelli','Mineo','Minunni','Mirena','Moltisanti','Monaldo','Montalti','Molinari','Molinaro','Monasterio','Montalto','Monte','Monti','MontiVerde','Montuori','Morandi','Morelli','Morello','Moretti','Mura','Napoli','Napolitano','Nardone','Natale','Natali','Natalini','Necci','Negrello','Negri','Nepi','Neri','Nerin','Nicini','Nicoletti','Ninotti','Nucci','Nuzzo','Nuzzolo','Occhipinti','Oddo','Offredi','Oldani','Onio','Opizzi','Origlio','Orlando','Oscuro','Ossani','Ottaviano','Paccioretti','Paci','Pagnotto','Pagnozzi','Palazzo','Palermo','Palmeri','Palminteri','Palmiotto','Palmisano','Palumbo','Panicucci','Panettiere','Papa','Papalardo','Papalia','Papasergio','Pappalardo','Pappaianni','Parisotto','Parlatore','Pasi','Passero','Pasqua','Patorno','Patuya','Pavan','Pavanetto','Pazzi','Pazzini','Pecoraro','Pellegrini','Pellegrino','Pepe','Peppone','Peralta','Peretti','Perotta','Petralia','Petrosino','Petto','Piazza','Perego','Pesomosca','Piccio','Piccirilli','Pietza','Pioggi','Pinto','Pippa','Piras','Pirlo','Pirovano','Pirozzi','Pisani','Pisano','Pizzuto','Planta','Polizzi','Pompilii','Porcelli','Porello','Porta','Pugliesi','Presutti','Provenzano','Pollastri','Pozzoli','Prima','Quaglia','Quaranta','Quarantani','Quarantiello','Quartuccio','Quattrini','Quintiliano','Quinto','Ragusa','Raiolla','Rappa','Ranellone','Rattazzi','Redaelli','Regio','Reina','Reviello','Riboldi','Ricci','Riccio','Ricciolino','Ridarelli','Riina','Rinaldi','Rinelli','Ripamonti','Rivelli','Rivera','Rizzi','Rizzo','Rollini','Romani','Romano','Romeo','Romero','Rosa','Rosato','Rositano','Rossetti','Rossi','Ruggiero','Rumore','Russo','Rosiello','Rua','Ruggiero','Russo','Sabbatini','Sabino','Sagese','Sal','Sala','Salafia','Salerno','Salieri','Sanfelice','Sanfilippo','Sangalli','Sanità','Sanna','Santucci','Santoro','Santarossa','Santorelli','Sasso','Sbarbaro','Scaletta','Scalise','Scaffidi','Schiavon','Schiavone','Scutari','Sebastianelli','Sebastiani','Senatore','Seneca','Sepulcri','Setteducato','Siciliano','Silvestri','Simeoni','Simone','Simoni','Sinatra','Sinceri','Solinas','Soprano','Sorisi','Spada','Spatafore','Spataro','Sperduto','Spina','Stefanelli','Stelluto','Strinati','Surace','Svizzi','Talete','Taliaferro','Tallerico','Tambornini','Tamburelli','Tanoli','Tataglia','Tazza','Terranova','Teruzzi','Testa','Timbano','Tinari','Tirabassi','Tirelli','Tocci','Todaro','Tomasi','Tommasini','Tommasino','Toro','Torio','Torricelli','Toscani','Toscanini','Toscano','Tozzi','Traina','Tremolada','Trevisan','Trevisani','Tricca','Trimboli','Tripodi','Tripoli','Tropea','Tropeani','Tulimiero','Turina','Turro','Ubriaco','Udinese','Udinesi','Urraro','Urso','Vaccarelli','Vaia','Valachi','Valle','Vallelonga','Valentini','Valentino','Valtolina','Vanetti','Vangone','Varriale','Varricchio','Vecchio','Vecellio','Vecoli','Ventura','Venturi','Venuti','Vercellino','Verratti','Verrelli','Verrilli','Vespasiano','Vinci','Viola','Violante','Viva','Vivaldi','Volero','Volpe','Volta','Visentin','Visintin','Vitruvio','Vosa','Zanella','Zanetti','Zanin','Zaninelli','Zanon','Zampa','Zappa','Zetticci','Zibordi','Zito','Zollo','Zuliani','Zullo'
]); // 59 342 867

let country10 = new Country('Brazil', 8, 20, 35, ['João','Gabriel','Lucas','Pedro','Matheus','Miguel','Rafael','Guilherme','Gustavo','Felipe','Enzo','Davi','Leonardo','Samuel','Daniel','Henrique','Thiago','Vinícius','Eduardo','Vitor','Bruno','Caio','Arthur','Diego','Alexandre','Antônio','Fernando','Igor','Ricardo','Marcelo','André','Nicolas','Rodrigo','Francisco','José','Augusto','Otávio','Emanuel','Bernardo','Murilo','Carlos','Leandro','Álvaro','Sebastião','Maurício','Frederico','Raul','Heitor','Wesley','Ruan','Isaque','Márcio','Yuri','Renan','Roberto','Fabrício','Luan','Cássio','Adriano','Sérgio','Luciano','Edson','Giovanni','Ezequiel','Paulo','Moisés','Anderson','Fábio','Jefferson','Erick','Iago','Marcos','Wellington','Cristian','Ivan','Wallace','Marlon','Diogo','Mateus','Luiz','Nathan','Santiago','Vicente','Everton','Orlando','Israel','Washington','Jorge','Rômulo','Danilo','Levi','Joaquim','Olavo','Caetano','Elias','Jeferson','Josué','Flávio','Derick','Nelson','Bento','Rian','Wilson','Cláudio','Ramon','Edmilson','Douglas','Tiago','Tadeu','Cristiano','Mauro','Eliel','Reginaldo','Josias','Luís','Denis','Romário','Elizeu','Hermes','Matias','Baltazar','William','Humberto'],
['da Silva','dos Santos','Pereira','Alves','Ferreira','Rodrigues','Silva','de Oliveira','de Souza','Gomes','Santos','Oliveira','Ribeiro','de Jesus','Soares','Martins','Barbosa','Vieira','Souza','Lopes','Lima','Batista','Fernandes','Costa','de Sousa','Dias','da Conceiçao','de Lima','Nascimento','Moreira','Nunes','da Costa','Araujo','Marques','Cardoso','de Almeida','Mendes','Nascimento','Teixeira','Ramos','Carvalho','Rosa','Almeida','Sousa','Machado','Rocha','Santana','de Araujo','Borges','Bezerra','Henrique','Pinheiro','de Carvalho','Monteiro','Correa','Aparecido','Andrade','Pinto','da Cruz','de Paula','de Freitas','Nogueira','Leite','Tavares','Miranda','Pires','Garcia','dos Reis','Xavier','do Carmo','Duarte','de Andrade','Freitas','Correia','de Fatima','Barros','Coelho','Gonçalves','de Melo','Reis','Viana','Campos','Moraes','Felix','Brito','Cordeiro','Neves','Moura','Guimaraes','Farias','da Rocha','de Castro','Carneiro','Silveira','Candido','Melo','Medeiros','de Assis','Bispo','de Lourdes','Cruz','Dantas','Maciel','Morais','Braga','Cavalcante','Antunes','Siqueira','de Moura','Domingos','Macedo','de Santana','Fonseca','Caetano','Castro','Menezes','da Cunha','de Moraes','dos Anjos','Inacio','Matos','Sales','Cunha','Chaves','de Brito','Barreto','Queiroz','Magalhaes','Azevedo','Mota','Evangelista','Bento','Maia','Amorim','Cabral','Bueno','Mariano','Torres','Franca','Marinho','Amaral','Guedes','Freire','Leal','da Rosa','Matias','Paulino','Sampaio','Das Gracas','Mendonca','Camargo','Franco','Pacheco','Sántos','Aguiar','de Barros','de Morais','Diniz','Santiago','Figueiredo','Lemos','Muniz','Dutra','Bastos','da Silveira','Vasconcelos','de Azevedo','da Luz','Faria','Trindade','Gonzaga','Domingues','Paiva','Feitosa','de Abreu','Teles','de Matos','Braz','Coutinho','Nonato','Messias','Chagas','Simoes','Fagundes','Brandao','Das Dores','Teodoro','Firmino','Vaz','de Campos','Barboza','Das Chagas','Galdino','Custodio','Abreu','Das Neves','Peixoto','Ferraz','Rezende','Furtado','Neto','de Franca','Sena','de Medeiros','Lacerda','Pimentel','Assis','Damasceno','da Fonseca','Rodriguês','Mesquita','Albuquerque','Pessoa','Arruda','do Amaral','Amaro','Pontes','Afonso','Sabino','de Sa','Saraiva','Candida','Camilo','Peres','Pedroso','Cerqueira','Lira','Galvao','de Aguiar','do Socorro','Venancio','Faustino','Lisboa','Vargas','Passos','Lemes','Gama','Roque','de Faria','Cezar','de Queiroz','de Mello','Prado','Bernardes','Tomaz','de Paiva','Justino','Barroso','Porto','Pereira da Silva','Padilha','Sanches','do Espirito Santo','de Farias','Serafim','Cavalcanti','do Rosario','Rufino','Vidal','de Miranda','Baptista','Bandeira','Paes','Flores','Silvestre','de Amorim','de Cassia','Rabelo','de Macedo','Alencar','Henrique da Silva','Rangel','Florencio','Ventura','do Prado','Mateus','Simao','Lins','Francisco','Paixao','Neres','Ramalho','de Menezes','de Camargo','Veloso','Couto','de Arruda','Celestino','de Albuquerque','Alcantara','Silverio','Muller','Feliciano','Honorio','Assuncao','de Aquino','Resende','Pimenta','Amancio','Moreno','Mello','Tenorio','Clemente','Goulart','da Paixao','Leao','Aquino','de Sena','Vilela','de Siqueira','Honorato','Balbino','Esteves','Paz','Januario','de Deus','Ferreira da Silva','Alves da Silva','Quirino','Botelho','da Penha','Sobrinho','Lourenço','Gregorio','Valentim','dos Passos','Pantoja','Araújo','Fontes','Meireles','Nobre','Brasil','Vitorino','da Paz','Guerra','Calixto','Cardozo','de Sales','Aires','Novais','Modesto','Claudino','Rossi','Bonfim','Cassiano','Severo','Vicente','Valerio','Gouveia','Romao','Motta','Caldeira','Barcelos','Ferrari','de Vasconcelos','Fraga','Veiga','Dourado','Novaes','Patricio','Nery','Meira','Jardim','Mattos','Basilio','Linhares','Gomes da Silva','Toledo','Borba','Rodrigues da Silva','Bomfim','Schneider','Caldas','Delfino','Rios','Vital','Gaspar','Laurindo','de Alencar','Henrique Silva','da Mota','de Mattos','Bittencourt','Serra','da Gloria','Souto','Goes','de Paulo','Arcanjo','de Lira','Marcondes','Fidelis','Lobato','Aragao','Avila','Henrique dos Santos','de Figueiredo','Ribas','Arantes','Belo','Carmo','Florentino','Portela','Holanda','Estevam','de Alcantara','Pereira dos Santos','Pedrosa','Prestes','Alvarenga','Fortunato','Saldanha','Camara','Felicio','Estevao','Cipriano','Lucena','Neri','Bonifacio','Apolinario','Schmidt','Castilho','Clementino','Marquês','Marcolino','Porfirio','Tome','de Mendonca','Verissimo','Valente','Pinho','do Vale','Aleixo','Nicolau','Figueira','Floriano','Coimbra','Veras','Marcal','Leme','Loureiro','Prates','Meneses','Becker','Belarmino','Luiz','Constantino','Bitencourt','Trajano','Alves dos Santos','Alexandre','Maximo','Martinez','Simplicio','Salles','Figueredo','Cavalheiro','Bernardo','Falcao','Conceição','Beserra','Augusto','Godoy','Henrique Pereira','Perez','Sobral','Crispim','Ortiz','Henrique Santos','Carlos','Henrique Ferreira','Campelo','Henrique Alves','Adao','Lessa','Lara','Sodre','Anastacio','Malaquias','Magno','Cassimiro','Henriques','Antonio','Cesario','Vianna','Ambrosio','Marcelino','Ferreira dos Santos','Pedro','Thomaz','Weber','da Mata','Penha','Marins','Mascarenhas','Madeira','Miguel','Branco','Sarmento'
]); // 211 998 573

let country11 = new Country('Greece', 3, 40, 60, ['Alexander','Nicholas','Theodore','Andreas','Dimitrios','Georgios','Constantin','Spiros','Ioannis','Panagiotis','Antonios','Christos','Athanasios','Vasilios','Nikolaos','Evangelos','Alexandros','Stefanos','Konstantinos','Petros','Leonidas','Pavlos','Apostolos','Dionysios','Stavros','Sotiris','Efstathios','Kyriakos','Anestis','Ioannou','Michail','Spyridon','Themistoklis','Theodoros','Kostas','Lampros','Marios','Orestis','Prokopis','Stelios','Theofilos','Timoleon','Xanthos','Yannis','Zacharias','Zenon','Zisis','Aristotelis','Agamemnon','Ares','Apollo','Hermes','Odysseus','Achilles','Perseus','Heracles','Dionysus','Orpheus','Adonis','Aristides','Callisthenes','Dorian','Jason','Lysander','Menelaus','Nestor','Theseus','Triton','Aristarchus','Calix','Damon','Eros','Hector','Icarus','Lycurgus','Miltiades','Nicostratus','Pericles','Pythagoras','Socrates','Telemachus','Theron','Zephyrus','Dion','Evander','Leander','Xenophon','Aristophanes','Chariton','Demetrius','Euripides','Galen','Hippocrates','Isidoros','Maximus','Niketas','Pankratios','Philemon','Timotheos','Zeno','Aeschylus','Cleon','Demetrios','Eudoxus','Gerasimos','Iason','Kleitos','Melanthios','Neoptolemus','Orestes','Pausanias','Philo','Sosthenes','Tiberius','Xenon','Zenobios','Alcibiades'], 
['Papadopoulos','Papadopoulou','Papageorgiou','Oikonomou','Papadimitriou','Georgiou','Papaioannou','Pappas','Vasileiou','Nikolaou','Karagiannis','Vlachos','Antoniou','Makris','Papanikolaou','Dimitriou','Ioannidis','Georgiadis','Triantafyllou','Papadakis','Athanasiou','Konstantinidis','Ioannou','Alexiou','Christodoulou','Theodorou','Giannopoulos','Nikolaidis','Konstantinou','Panagiotopoulos','Michailidis','Papakonstantinou','Papathanasiou','Antonopoulos','Dimopoulos','Karagianni','Anastasiou','Dimitriadis','Pappa','Vlachou','Vasileiadis','Giannakopoulos','Angelopoulos','Dimou','Ioannidou','Nikolopoulos','Mylonas','Stergiou','Apostolou','Petropoulos','Lamprou','Papadaki','Christou','Panagiotou','Anagnostou','Makri','Konstantinidou','Samaras','Raptis','Athanasopoulos','Alexopoulos','Christopoulos','Stavropoulos','Anagnostopoulos','Markou','Georgiadou','Spanos','Sidiropoulos','Antoniadis','Panagopoulos','Efthymiou','Spyropoulos','Theodoropoulos','Pavlidis','Athanasiadis','Apostolopoulos','Petrou','Michalopoulos','Arvanitis','Lazaridis','Kontos','Georgopoulos','Panagiotidis','Theodoridis','Chatzis','Anastasiadis','Papavasileiou','Papazoglou','Vasilopoulos','Iliopoulos','Kostopoulos','Politis','Galanis','Stavrou','Apostolidis','Paraskevopoulos','Giannopoulou','Diamantis','Pantazis','Andreou','Petridis','Stathopoulos','Nikolaidou','Michailidou','Dimopoulou','Mavridis','Kyriakou','Grigoriadis','Efstathiou','Sideris','Kyriakidis','Diamantopoulos','Panagiotopoulou','Anastasopoulos','Savvidis','Georgakopoulos','Dimitropoulos','Vasilakis','Rizos','Argyropoulos','Moraitis','Sotiropoulos','Charalampidis','Iliadis','Antonopoulou','Sotiriou','Lampropoulos','Chatzigeorgiou','Angelis','Nikolopoulou','Giannakopoulou','Kollias','Margaritis','Vasileiadou','Katsaros','Chatzi','Sarris','Roussos','Evangelou','Fotiadis','Stefanidis','Mylona','Gkikas','Angelopoulou','Eleftheriadis','Kontogiannis','Dimitriadou','Samara','Spyrou','Stavropoulou','Petropoulou','Symeonidis','Konstantopoulos','Kalogeropoulos','Kyriakopoulos','Filippou','Vogiatzis','Athanasopoulou','Eleftheriou','Fotopoulos','Voulgaris','Christopoulou','Chatzopoulos','Spyropoulou','Argyriou','Georgopoulou','Triantafyllidis','Sakellariou','Kanellopoulos','Avramidis','Athanasiadou','Spanou','Sidiropoulou','Kyriazis','Papachristou','Petrakis','Daskalakis','Stefanou','Anagnostopoulou','Kritikos','Kechagias','Pavlou','Rigas','Arampatzis','Kostopoulou','Lazaridou','Zervas','Alexopoulou','Theodoridou','Stamatiou','Asimakopoulos','Tsakiris','Apostolopoulou','Theodosiou','Mitropoulos','Paraskevopoulou','Panagopoulou','Panou','Karalis','Karras','Pavlidou','Ali','Dimitrakopoulos','Papanastasiou','Michail','Adamopoulos','Michalopoulou','Rapti','Papatheodorou','Deligiannis','Vasilopoulou','Iliopoulou','Panagiotidou','Markopoulos','Antoniadou','Singh','Kefalas','Papagiannis','Kontou','Zisis','Stamatopoulos','Grigoriou','Theocharis','Stamou','Nikou','Kolovos','Xanthopoulos','Theodoropoulou','Giannoulis','Angelidis','Kyritsis','Diamanti','Doukas','Apostolidou','Paschalidis','Floros','Fragkos','Mavridou','Paraskevas','Sideri','Roussou','Roumeliotis','Tsoukalas','Galani','Drosos','Lampropoulou','Kosmidis','Loukas','Alexandris','Pantazi','Charalampidou','Kalyvas','Sarri','Argyropoulou','Papakostas','Kyriakidou','Anastasiadou','Kokkinos','Stathopoulou','Anastasopoulou','Stamoulis','Arvaniti','Sotiropoulou','Ziogas','Stamatis','Mouratidis','Lazarou','Moustakas','Diamantopoulou','Vasilaki','Dimos','Papoutsis','Fragkou','Chalkias','Zafeiropoulos','Manolis','Kyriakopoulou','Georgakopoulou','Lekkas','Andreadis','Chronopoulos','Papantoniou','Polyzos','Savvidou','Petridou','Liapis','Papandreou','Emmanouil','Marinos','Bouras','Emmanouilidis','Goulas','Angeli','Tzimas','Zacharopoulos','Nikolakopoulos','Kalantzis','Kollia','Nikas'
]); // 10 047 817

let country12 = new Country('Germany', 6, 30, 60, ['Dirk','Liam','Noah','Elijah','Lucas','Oliver','Alexander','Milo','Benjamin','Henry','Max','Finn','Theo','Felix','Oscar','Emil','Sebastian','Samuel','Julian','Leo','Paul','Elias','Jacob','David','Anton','Hugo','Carl','Gustav','Richard','Emmanuel','Victor','Gabriel','Matthias','Niklas','Vincent','Jonathan','Moritz','Emilio','Leon','Julius','Raphael','Johann','Xavier','Dominic','Adrian','Silas','Luca','Eduard','Markus','Isaiah','Nathan','Emmett','Casper','Maximilian','Hendrik','Tristan','Kai','Nico','Armin','Bruno','Lennard','Samson','Albert','Rasmus','Leopold','Cedric','Enzo','Fabian','Ignatius','Quentin','Ricardo','Valentin','Yannick','Zachary','Darian','Ferdinand','Gilbert','Heinz','Ivan','Jerome','Kilian','Lorenz','Marcel','Nolan','Orlando','Pascal','Quirin','Roland','Santino','Tobias','Ulrich','Viktor','Waldemar','Xander','Yorick','Zephyr','Axel','Benedict','Casimir','Dietrich','Ephraim','Florian','Gideon','Hannes','Ismail','Jovan','Kurt','Leander','Magnus','Nikolai','Osiris'], 
['Müller','Schmidt','Schneider','Fischer','Weber','Meyer','Wagner','Becker','Schulz','Hoffmann','Koch','Richter','Bauer','Schäfer','Klein','Wolf','Schröder','Neumann','Schwarz','Braun','Zimmermann','Hofmann','Lange','Hartmann','Krüger','Krause','Lehmann','Schmitz','Meier','Schmitt','Werner','Schmid','Schulze','Maier','Herrmann','Mayer','Köhler','Walter','König','Huber','Kaiser','Peters','Fuchs','Möller','Lang','Scholz','Jung','Weiß','Hahn','Keller','Berger','Vogel','Schubert','Friedrich','Frank','Roth','Winkler','Beck','Günther','Lorenz','Baumann','Franke','Albrecht','Ludwig','Winter','Simon','Schuster','Schumacher','Kraus','Böhm','Vogt','Martin','Stein','Jäger','Sommer','Krämer','Brandt','Otto','Heinrich','Schulte','Graf','Haas','Seidel','Schreiber','Groß','Dietrich','Engel','Ziegler','Horn','Bergmann','Pohl','Kuhn','Jansen','Voigt','Kühn','Beyer','Busch','Thomas','Hansen','Lindner','Arnold','Sauer','Kramer','Wolff','Seifert','Hübner','Ernst','Pfeiffer','Wenzel','Franz','Nagel','Kern','Barth','Peter','Götz','Paul','Hermann','Kruse','Riedel','Ott','Haase','Petersen','Langer','Lenz','Grimm','Hoppe','Bock','Arndt','Jahn','Wilhelm','Mohr','Ritter','Schumann','Fiedler','Kaufmann','Kraft','Förster','Berg','Thiel','Miller','Michel','Marx','Walther','Lutz','Sander','Fritz','Eckert','Thiele','Böttcher','Reuter','Reinhardt','Beckmann','Schilling','Schindler','Frey','Hein','Ebert','Hesse','Behrens','Schütz','Kunz','Schramm','Herzog','Rudolph','Gruber','Bayer','Kunze','Witt','Fröhlich','Nowak','Geiger','Stephan','Maurer','Bender','Seitz','Schultz','Bachmann','Adam','Brinkmann','Fink','Kirchner','Stahl','Ullrich','Gerlach','Breuer','Steiner','Gärtner','Büttner','Dietz','Scherer','Bruns','Kurz','Naumann','Moser','Brand','Böhme','Reichert','Schlüter','Ulrich','Löffler','Binder','Janssen','Heinz','Wendt','Blum','Körner','Brunner','Schenk','Wolter','Wegner','Schwab','Menzel','Urban','Schröter','Krebs','Göbel','Heller','Stark','Buchholz','Wirth','Döring','Weiss','Kopp','Rieger','Link','Hinz','John','Bartsch','Meißner','Reimann','Wilke','Hildebrandt','Unger','Hirsch','Bischoff','Jakob','Rose','Pfeifer','Ackermann','Rohde','Schiller','Sturm','Westphal','Köster','Hennig','Bach','Freitag','Witte','Engelhardt','Kröger','Marquardt','Fricke','Ahrens','Lemke','Wittmann','Linke','Siebert','Vetter','Kohl','Kolb','Henning','Heinze','Noack','Gebhardt','Renner','Reich','Baier','Nickel','Funk','Keil','Erdmann','Kremer','Mertens','Pieper','Martens','Berndt','Hanke','Baum','Held','Will','Münch','Conrad','Kiefer','Bartels','Hammer','Esser','Harms','Henke','Mann','Fuhrmann','Schlegel','Stoll','Kirsch','Wiese','Jacob','Herbst','Decker','Klose','Hamann'
]); // 84 552 242

let country13 = new Country('Turkey', 6, 30, 50, ['Mehmet','Mustafa','Ali','Ahmet','İbrahim','Yusuf','Muhammed','Emir','Kerem','Burak','Serkan','Barış','Onur','Cem','Eren','Deniz','Can','Tolga','Orhan','Erdem','İsmail','Tarık','Emre','Yasin','Hakan','İlhan','Umut','Selim','Serdar','Murat','Kadir','Alper','Ferhat','Selçuk','Fatih','Ömer','Arda','Ege','Berk','Kaan','Mahir','Tuncay','Sinan','Adem','Ayhan','Ertuğrul','Özgür','Zafer','İlyas','Aydın','Arif','Halil','İlker','Kenan','Mert','Necati','Orkun','Rıza','Sercan','Taylan','Ümit','Volkan','Yavuz','Zeki','Atilla','Cihan','Doruk','Fırat','Gökhan','Hasan','İsmet','Kamil','Levent','Metin','Nihat','Orçun','Ramazan','Şahin','Taner','Uğur','Veli','Yaşar','Ziya','Atila','Caner','Derya','Enes','Ferit','Görkem','Harun','İshak','Kaya','Lütfü','Mazlum','Nuri','Osman','Pelin','Rüzgar','Sadık','Şükrü','Hüseyin','Timur','Çağlar','İlter','Ferdi','Emrah','Erkan','Cengiz','Doğan','Ercan','Haluk','Murathan','Özkan','Aykut','Bora'], 
['Yılmaz','Kaya','Demir','Çelik','Şahin','Yıldız','Yıldırım','Öztürk','Aydın','Özdemir','Arslan','Doğan','Kılıç','Aslan','Çetin','Kara','Koç','Kurt','Özkan','Acar','Polat','Şimşek','Korkmaz','Özcan','Erdoğan','Çakir','Yavuz','Can','Şen','Yalçın','Güler','Aktaş','Güneş','Bozkurt','Bulut','Işık','Turan','Keskin','Avci','Ünal','Gül','Coşkun','Özer','Kaplan','Sari','Tekin','Taş','Yüksel','Köse','Ateş','Aksoy','Yiğit','Karataş','Uzun','Ceylan','Karaca','Çiftçi','Çiçek','Çoban','Çalişkan','Yaşar','Demirci','Bayram','Deniz','Çakmak','Güngör','Uçar','Erdem','Kahraman','Uysal','Genç','Çinar','Duman','Akın','Sönmez','Demirel','Ay','Kilinç','Koçak','Mutlu','Küçük','Çetinkaya','Yaman','Altun','Gündüz','Gümüş','Öz','Eren','Aydemir','Çolak','Tunç','Karakaya','Güven','Kartal','Gök','Karaman','Dönmez','Erol','Aksu','Alkan','Tosun','Özen','Türk','Balci','Sağlam','Karakuş','Cengiz','Çevik','Güzel','Karabulut','Akbaş','Keleş','Duran','Durmuş','Ince','Baş','Eroğlu','Akkaya','Akbulut','Demirtaş','Durmaz','Akgün','Yücel','Uslu','Dursun','Aydoğan','Yazici','Özçelik','Er','Çelebi','Koca','Karagöz','Ünlü','Ekinci','Karakaş','Gürbüz','Toprak','Akgül','Türkmen','Topal','Dinç','Gültekin','Dağ','Topçu','Sarıkaya','Şentürk','Vural','Zengin','Özmen','Ergün','Şeker','Gündoğdu','Bilgin','Ilhan','Bal','Gökçe','Fidan','Sezer','Güney','Albayrak','Güner','Bektaş','Akyol','Oğuz','Inan','Karadağ','Bayrak','Turgut','Orhan','Akar','Aydoğdu','Taşkın','Kalkan','Özel','Ak','Ercan','Akyüz','Ipek','Uğur','Esen','Akkuş','Günay','Bayraktar','Taşdemir','Budak','Akpınar','Açıkgöz','Aygün','Özbek','Öner','Temel','Ersoy','Ayhan','Efe','Çam','Ari','Şener','Sevinç','Çağlar','Ergin','Tuncer','Ertürk','Baran','Sert','Akdemir','Ayaz','Gür','Koyuncu','Akçay','Kaçar','Aras','Altıntaş','Akça','Başaran','Karakoç','Tan','Şengül','Gezer','Akdağ','Karadeniz','Atalay','Bakir','Altin','Çimen','Biçer','Karahan','Akman','Akdeniz','Turhan','Dündar','Gün','Oruç','Sezgin','Mert','Kandemir','Kuş','Bingöl','Usta','Bolat','Bülbül','Taşçi','Yüce','Pehlivan','Fırat','Tuna','Önal','Çakar','Metin','Dinçer','Yeşil','Savaş','Uyar','Altuntaş','Ekici','Arıkan','Atmaca','Akdoğan','Altay','Sevim','Erkan','Kutlu','Doğru','Yalçınkaya','Özkaya','Önder','Demirbaş','Öksüz','Ataş','Boz','Durak','Eser','Eker','Kuru','Oral','Varol','Demircan','Parlak','Ölmez','Gedik','Güçlü','Köksal','Akay','Adıgüzel','Türkoğlu','Göktaş','Soylu','Ertaş','Özden','Şenol','Şanli','Güleç','Ünsal','Uğurlu','Torun','Gürsoy','Bilgiç','Akinci','Ergül','Şahan'
]); // 87 473 805

let country14 = new Country('Slovenia', 1, 50, 50, ['Luka','Jakob','Nejc','Marko','Filip','Matej','Jan','Tim','Nik','Miha','Aljaž','Tilen','Žan','Anže','Vid','David','Matic','Gašper','Rok','Gregor','Blaž','Žiga','Jaka','Simon','Urban','Alen','Lovro','Andraž','Nace','Erik','Denis','Matija','Jure','Samo','Jurij','Boštjan','Martin','Sebastjan','Tadej','Anej','Boris','Niko','Matevž','Peter','Gal','Lan','Anđelko','Patrik','Aleks','Teo','Domen','Janko','Stanko','Marjan','Bor','Edi','Cene','Zoran','Rudi','Fran','Alojz','Matko','Drago','Anton','Franjo','Damjan','Igor','Zvonko','Davor','Bojan','Bogdan','Darko','Emil','Ivo','Ivan','Nino','Oskar','Sandi','Uroš','Vinko','Zdravko','Zlatko','Bruno','Dario','Dare','Davorin','Elvis','Eugen','Fedja','Goran','Jernej','Klemen','Leon','Loris','Mate','Nikolas','Ožbej','Radovan','Renato','Srečko','Štefan','Teodor','Valentin','Vanja','Vekoslav','Viktor','Vladimir','Vojko','Zlatan','Željko','Črt','Dominik','Feliks','Herman','Izak','Krištof','Lenart','Ljubo','Marinko','Nikita','Rado','Roland','Sergij','Slavko','Stane','Tadevž','Tine','Tomaž','Tomi','Tone'], 
['Novak','Horvat','Krajnc','Kovačič','Zupančič','Potočnik','Kovač','Mlakar','Kos','Golob','Vidmar','Turk','Božič','Kralj','Korošec','Bizjak','Zupan','Kotnik','Hribar','Kavčič','Rozman','Oblak','Petek','Kolar','Kastelic','Žagar','Hočevar','Košir','Koren','Klemenčič','Zajc','Knez','Medved','Zupanc','Petrič','Pirc','Hrovat','Lah','Pavlič','Kuhar','Zorko','Tomažič','Uršič','Babič','Erjavec','Jerman','Sever','Jereb','Kranjc','Majcen','Furlan','Pušnik','Rupnik','Breznik','Lesjak','Perko','Kovačević','Dolenc','Logar','Jenko','Močnik','Pečnik','Pavlin','Ribič','Žnidaršič','Vidic','Jelen','Tomšič','Petrović','Janežič','Marolt','Pintar','Gregorič','Maček','Zadravec','Dolinar','Černe','Fras','Hren','Leban','Kocjančič','Mihelič','Lešnik','Blatnik','Bezjak','Čeh','Kokalj','Cerar','Jug','Kobal','Rus','Vidovič','Bogataj','Primožič','Kolenc','Lazar','Nemec','Jovanović','Kolarič','Kosi','Hodžić','Mrak','Ivančič','Tavčar','Lavrič','Kodrič','Žižek','Marković','Debeljak','Krivec','Vodopivec','Zver','Likar','Miklavčič','Jarc','Kramberger','Toplak','Vovk','Skok','Ilić','Hribernik','Jazbec','Žibert','Leskovar','Sitar','Stopar','Meglič','Eržen','Petrovič','Gorenc','Nikolić','Simonič','Železnik','Demšar','Blažič','Popović','Šinkovec','Ramšak','Hozjan','Kočevar','Javornik','Čuk','Filipič','Jamnik','Gorjup','Volk','Rutar','Kramar','Podgoršek','Savić','Bukovec','Bregar','Kokol','Rajh','Pintarič','Koželj','Hafner','Gajšek','Mohorič','Godec','Lebar','Gashi','Sušnik','Gomboc','Mavrič','Kumer','Rožič','Šmid','Rožman','Pogačnik','Bergant','Cvetko','Pavlović','Zemljič','Mlinar','Krasniqi','Bajc','Kristan','Ambrožič','Resnik','Babić','Bevc','Povše','Tratnik','Zakrajšek','Kalan','Begić','Markovič','Humar','Zorman','Mlinarič','Hadžić','Kaučič','Zalar','Jerič','Rojc','Gruden','Stojanović','Založnik','Trček','Pogačar','Zalokar','Gorišek','Štrukelj','Pirnat','Šuligoj','Kranjec','Fekonja','Strnad','Smrekar','Škof','Zorec','Romih','Šuštar','Vesel','Muhič','Pahor','Bračko','Marinič','Miklič','Pevec','Šturm','Kukovec','Brglez','Simčič','Kocjan','Dolinšek','Kogovšek','Rudolf','Jančič','Križman','Podobnik','Arh','Krašovec','Bučar','Murko','Petrovčič','Papež','Mohar','Turnšek','Kosmač','Tomažin','Kosec','Juvan','Sluga','Mesarič','Starc','Vuković','Verbič','Jager','Vogrin','Vrhovnik','Planinc','Dizdarević','Kotar','Žnidarič','Ferk','Ravnikar','Vončina','Hrvatin','Robič','Lipovšek','Brajdič','Tomić','Vuk','Jančar','Peternel','Lončar','Praprotnik','Hojnik','Zidar','Kenda','Veber','Halilović','Grošelj','Šušteršič','Simončič','Skubic','Urh','Plut','Stanković','Habjan','Nagode','Klemenc','Balažic','Cimerman','Stare','Kern','Cafuta','Urbančič','Virant','Jeraj','Naglič','Mali','Oman','Bračič','Primc','Zajec','Grašič'
]); // 2 118 697

let country15 = new Country('China', 10, 20, 35, ['Wei','Li','Jun','Tao','Chen','Zhao','Xiang','Xin','Yu','Feng','Ming','Hao','Jing','Kai','Lei','Sheng','Tian','Zhi','Yong','Qiang','Jian','Guo','Xing','Rui','Jia','Bin','Zhen','Chang','De','Dong','En','Hong','Hu','Jin','Kang','Lin','Mao','Nan','Peng','Qiu','Ren','Sen','Tai','Wen','Xun','Yang','Zhan','You','Zong','Bo','Cai','Dao','Fan','Gan','Han','Jie','Lian','Ning','Ping','Quan','Shuai','Xian','Yan','An','Bai','Cun','Da','Fang','Gen','Hai','Kuan','Long','Min','Qing','Rong','Shuang','Wu','Yao','Cong','Duan','Fu','Gao','Heng','Ji','Kun','Lao','Qu','Shou','Tang','Yuan','Zhihao','Juncheng','Weijun','Xinyu','Haoran','Ziyang','Zhixiang','Yifan','Ruochen','Zheng','Hanwei','Chao','Zhijie','Yufeng','Haohao','Yuchen','Xudong','Yiming','Ziyu','Zhiming','Chenglei','Zhilong','Xingyu','Zeyu','Yiqiang','Xiangyang','Zexi','Zijian','Yuanpeng','Xiaolong','Zhixuan','Zhiyuan','Yisheng','Yuankai','Zhimin','Xuanzhe','Yixuan','Zihao','Zihang','Yifeng','Zhiwei','Yuxuan','Zhixing','Yitong','Ziyi'], 
['Wang','Li','Zhang','Liu','Chen','Yang','Huang','Wu','Xu','Zhao','Zhou','Lu','Zhu','Sun','He','Ma','Yu','Hu','Lin','Jiang','Guo','Luo','Gao','Zheng','Liang','Tang','Wei','Shi','Xie','Song','Feng','Yan','Deng','Han','Cao','Tan','Ceng','Peng','Xiao','Yuan','Pan','Cai','Cheng','Fan','Tian','Dong','Fu','Ye','Su','Du','Zhong','Jin','Ding','Yao','Ren','Yin','Cui','Liao','Fang','Meng','Dai','Wen','Gu','Qiu','Jia','Xia','Bai','Hou','Zou','Xiong','Qin','Ji','Gong','Xue','Qi','Lei','Duan','Xiang','Long','Mao','Tao','Shao','Hao','Lai','Guan','Wan','Qian','Hong','Qu','Mo','Kong','Lan','Kang','Chang','Bao','Ge','Yi','Niu','Xing','Zhan','An','Di','Qiao','You','Tong','Pang','Ni','Zhuang','Nie','Shen','Ou','Yue','Shang','Geng','Gan','Jiao','Zuo','Mou','Chu','Pu','Tu','Shu','Bi','Dan','Ruan','Ning','Ke','Mei','Ling','Hua','Huo','Xin','Jing','Miao','Pei','Sheng','Weng','Ran','Lian','Mu','Ou yang','Dou','Chai','Bian','Jie','Kuang','Lou','Teng','Rao','Xi','Si','Ai','Chi','Rong','Quan','Nong','Mai','Jian','Zhuo','Che','Cen','Gou','Dang','Fei','Bo','Leng','Mi','Xian','Zong','Gui','Ying','Min','Zang','Chou','Ju','Sui','Luan','Sha','Diao','Kou','Lang','Sang','Zhen','Cong','Zhi','Ao','She','Ming','Cha','Hui','Le','Lao','Nan','Ban','Pi','Man','Hai','Qiang','Shuai','Gai','Ba','Zu','Qing','Xuan','Ping','Suo','Yun','Men','Chao','Yong','Rui','Que','Xiu','Tai','Hang','Na','Ru','Ha','Bin','Zan','Heng','Zeng','Lee','Nu','Ouyang','Chan','Wong','Zhai','Da','Bu','Zi','Lau','Lun','Shan','Jun','Ho','Cheung','Guang','Ya','Bei','Shui','Huajing','San','Huan','Shou','Leung','Shenzhen','Young','Chow','Ting','Bing','Chun','King','Xun','Lam','Lie','Hsu','Gang','Kai','Jiu','Woo','Tuo','Chong','Kan','Dian','Kim','De','Tie','Ce','Abu','Ng','Cang','Situ','Hei','Nian','Kuai','Biao','Law','Fa','Zha','Smith','Duo','Lo','Chung','Juan','Lim','Shuang','Zhe','Shun','Tsai','Tse','Huai','Ci','Kui','Green','Yeung'
]); // 1 419 321 278

let country16 = new Country('Sweden', 3, 20, 35, ['Erik','Lars','Karl','Anders','Johan','Gustav','Henrik','Björn','Magnus','Niklas','Oskar','Fredrik','Sebastian','Tobias','Daniel','Axel','Marcus','Emil','David','Lucas','Simon','Jonathan','Viktor','Philip','Anton','Martin','Johannes','Mattias','Christian','Alexander','Peter','Arvid','Benjamin','Max','William','Isak','Oliver','Victor','Samuel','Joakim','Hugo','Gustaf','Joel','Robin','Linus','Albin','Leo','Pontus','Rasmus','Adam'],
['Johansson','Andersson','Karlsson','Nilsson','Eriksson','Larsson','Olsson','Persson','Svensson','Gustafsson','Pettersson','Jonsson','Jansson','Hansson','Bengtsson','Carlsson','Jönsson','Petersson','Lindberg','Magnusson','Gustavsson','Olofsson','Lindgren','Lindström','Axelsson','Lundberg','Lundgren','Berg','Jakobsson','Bergström','Berglund','Fredriksson','Sandberg','Mattsson','Henriksson','Forsberg','Lindqvist','Danielsson','Eklund','Lundin','Lind','Sjöberg','Gunnarsson','Holm','Engström','Håkansson','Bergman','Samuelsson','Fransson','Johnsson','Holmberg','Lundqvist','Arvidsson','Wallin','Nyberg','Isaksson','Nyström','Söderberg','Björk','Eliasson','Mårtensson','Berggren','Nordström','Lundström','Nordin','Hermansson','Holmgren','Björklund','Sundberg','Hedlund','Sandström','Ström','Martinsson','Åberg','Ekström','Dahlberg','Abrahamsson','Sjögren','Blom','Lindholm','Blomqvist','Norberg','Ek','Jonasson','Månsson','Ivarsson','Andreasson','Hellström','Öberg','Falk','Nyman','Strömberg','Åkesson','Ali','Dahl','Sundström','Bergqvist','Lund','Åström','Hallberg','Josefsson','Palm','Löfgren','Göransson','Söderström','Englund','Borg','Davidsson','Ottosson','Jensen','Ekman','Lindblom','Adolfsson','Lindahl','Hansen','Nygren','Stenberg','Skoglund','Hedberg','Strand','Friberg','Möller','Boström','Börjesson','Söderlund','Strandberg','Sjöström','Erlandsson','Ericsson','Holmström','Bäckström','Höglund','Rosén','Claesson','Johannesson','Edlund','Malm','Aronsson','Haglund','Björkman','Nielsen','Dahlgren','Knutsson','Moberg','Melin','Viklund','Roos','Sundqvist','Wikström','Lilja','Holmqvist','Blomberg','Ohlsson','Ahmed','Lindén','Vikström','Östlund','Alm','Norén','Olausson','Sundin','Franzén','Hedman','Lindell','Lundmark','Oskarsson','Pålsson','Dahlström','Jacobsson','Högberg','Wiklund','Öhman','Paulsson','Nord','Lindblad','Ljungberg','Boman','Molin','Sjödin','Linder','Ljung','Hedström','Malmberg','Ekberg','Sköld','Hellberg','Norman','Hagström','Pedersen','Ståhl','Lindh','Svärd','Berntsson','Hjalmarsson','Näslund','Ågren','Augustsson','Forslund','Lindkvist','Asplund','Brandt','Lundkvist','Mohamed','Dahlin','Hedin','Westerlund','Wiberg','Fors','Hassan','Kristiansson','Marklund','Wahlström','Torstensson','Backman','Grahn','Törnqvist','Bertilsson','Ibrahim','Frisk','Westerberg','Niklasson','Alfredsson','Andersen','Edström','Nordqvist','Westman','Österberg','Hägglund','Nordlund','Hagberg','Alexandersson','Hall','Forsman','Ahlström','Lindvall','Ericson','Hjelm','Dahlqvist','Lennartsson','Simonsson','Ljunggren','Byström','Ahlberg','Edvardsson','Hagman','Backlund','Hellman','Bäckman','Lövgren','Granberg','Kjellberg','Levin','Emanuelsson','Klasson','Bergkvist','Larsen','Rydberg','Ahlgren','Skog','Malmström','Almqvist','Östman','Hallgren','Karlström','Rosengren','Holgersson','Nguyen','Westin','Antonsson','Sjöblom','Palmqvist','Sjöstrand','Ekholm','Svedberg','Hellgren','Krantz','Salomonsson','Sandin','Sahlin','Lindmark','Hammar','Engman','Westberg','Lantz','Lundell','Nordgren','Sjöholm','Wahlberg','Broberg','Svanberg','Hult','Wall','Hultman','Malmqvist','Bäck','Gabrielsson','Malmgren','Nylander','Hultgren'
]); // 10 638 476

let country17 = new Country('Finland', 2, 25, 35, ['Aapo','Aatu','Akseli','Aleksi','Antero','Eetu','Eino','Elias','Emil','Esa','Henri','Ilari','Ilmari','Janne','Jasper','Joona','Joonas','Juho','Jukka','Jussi','Kalle','Lauri','Lenni','Leo','Luukas','Markus','Matias','Mikael','Niklas','Nuutti','Olli','Onni','Otto','Paavo','Peetu','Pietari','Rasmus','Roope','Sakari','Samuel','Santeri','Sauli','Taavi','Taneli','Tapio','Teemu','Topi','Tuomas','Valtteri','Veeti','Aarne','Eemeli','Eero','Eki','Eljas','Erkki','Eevi','Esko','Evartti','Feliks','Henrikki','Ilkka','Isto','Jalmari','Jaakko','Jaani','Jari','Jarkko','Joakim','Joni','Jorma','Juha','Kaarlo','Kari','Kasperi','Kauko','Kimi','Konsta','Lari','Lassi','Mauno','Mikko','Miska','Niko','Oskari','Ossi','Pasi','Pekka','Pentti','Pertti','Petri','Raimo','Risto','Rolf','Sami','Santtu','Seppo','Simo','Tarmo','Tero','Timo','Tino','Toivo','Tommi','Urho','Veikko','Veli','Vesa','Vili','Ville','Voitto','Yrjö','Aki','Anssi','Jere','Jooseppi','Jukka-Pekka','Jussi-Pekka','Kai','Kari-Pekka','Kasper','Kimmo','Kristian','Olli-Pekka','Reijo','Tapani'],
['Korhonen','Virtanen','Nieminen','Mäkinen','Hämäläinen','Mäkelä','Laine','Heikkinen','Koskinen','Lehtonen','Järvinen','Lehtinen','Saarinen','Salminen','Heinonen','Heikkilä','Niemi','Salonen','Laitinen','Turunen','Kinnunen','Tuominen','Savolainen','Salo','Rantanen','Jokinen','Miettinen','Mattila','Karjalainen','Räsänen','Ahonen','Lahtinen','Pitkänen','Hiltunen','Ojala','Leppänen','Aaltonen','Leinonen','Kallio','Väisänen','Anttila','Mustonen','Hakala','Laaksonen','Manninen','Koivisto','Lehto','Laakso','Hirvonen','Toivonen','Kettunen','Hartikainen','Nurmi','Niskanen','Aalto','Partanen','Peltonen','Rantala','Lappalainen','Pulkkinen','Niemelä','Rissanen','Seppälä','Saari','Kauppinen','Hakkarainen','Hänninen','Huttunen','Seppänen','Moilanen','Salmi','Suominen','Koskela','Halonen','Kemppainen','Lahti','Mikkonen','Peltola','Parviainen','Kärkkäinen','Ikonen','Leskinen','Aho','Ahola','Koponen','Pesonen','Oksanen','Vainio','Lindholm','Heiskanen','Vuorinen','Johansson','Rautiainen','Mikkola','Toivanen','Karppinen','Nurminen','Koski','Immonen','Honkanen','Nyman','Kokkonen','Vartiainen','Harju','Heino','Hyvärinen','Leino','Mäki','Martikainen','Juntunen','Rajala','Jääskeläinen','Määttä','Holopainen','Laukkanen','Kangas','Karlsson','Ruotsalainen','Nykänen','Hyvönen','Uusitalo','Mäenpää','Laurila','Keränen','Viitanen','Paananen','Makkonen','Lindström','Tikkanen','Kukkonen','Kokko','Nevalainen','Tamminen','Väänänen','Salmela','Häkkinen','Ranta','Jaakkola','Tiainen','Hietala','Pasanen','Korpela','Kosonen','Kujala','Karvonen','Härkönen','Jokela','Eriksson','Lindroos','Valtonen','Kuusisto','Timonen','Andersson','Virta','Asikainen','Karhu','Tolonen','Sillanpää','Saarela','Kolehmainen','Koistinen','Tirkkonen','Rinne','Rautio','Lindqvist','Malinen','Jussila','Autio','Lampinen','Hokkanen','Kivelä','Eskelinen','Puustinen','Huhtala','Voutilainen','Nissinen','Räisänen','Nousiainen','Laakkonen','Pietilä','Kainulainen','Kuusela','Tolvanen','Koivula','Pirinen','Lepistö','Tuovinen','Taskinen','Pennanen','Suhonen','Penttinen','Luoma','Pelkonen','Helenius','Marttila','Pakarinen','Liimatainen','Riikonen','Karttunen','Hietanen','Lindberg','Kulmala','Viljanen','Nuutinen','Kumpulainen','Hyttinen','Koivunen','Luukkonen','Eronen','Ketola','Haavisto','Juvonen','Takala','Penttilä','Hautala','Järvenpää','Huovinen','Vuori','Eskola','Saastamoinen','Lehtimäki','Auvinen','Liukkonen','Myllymäki','Kuosmanen','Kyllönen','Huotari','Eklund','Ollikainen','Gustafsson','Komulainen','Haapala','Ronkainen','Paavola','Repo','Keskinen','Markkanen','Sipilä','Välimäki','Helin','Keinänen','Suomalainen','Lähteenmäki','Viitala','Soininen','Antikainen','Ollila','Perälä','Kortelainen','Lindfors','Tuomi','Kivimäki','Halme','Rintala','Lipponen','Karhunen','Blomqvist','Matikainen','Hautamäki','Nylund','Hannula','Venäläinen','Silvennoinen','Kähkönen','Hytönen','Lehtola','Meriläinen','Matilainen','Varis','Tanskanen','Jalonen','Kanerva','Helminen','Kivistö','Laiho','Kantola','Holm','Taipale','Rytkönen','Henriksson','Puhakka','Ojanen','Nyberg','Väyrynen','Pajunen','Ylitalo','Jauhiainen','Jansson','Jämsä','Kankaanpää','Karvinen','Kurki','Lindgren','Rauhala','Erkkilä','Lassila','Alatalo','Backman','Pääkkönen'
]); // 5 621 131

let country18 = new Country('Poland', 5, 25, 35, ['Jakub','Kacper','Wojciech','Adam','Michał','Mateusz','Bartosz','Szymon','Kamil','Paweł','Krzysztof','Łukasz','Piotr','Filip','Adrian','Damian','Marcin','Dawid','Patryk','Tomasz','Sebastian','Rafał','Artur','Dominik','Daniel','Ryszard','Marek','Grzegorz','Jan','Jacek','Igor','Andrzej','Maciej','Miłosz','Tadeusz','Krystian','Julian','Zenon','Emil','Zygmunt','Oskar','Henryk','Mikołaj','Ernest','Kazimierz','Robert','Jerzy','Wiktor','Aleksander','Arkadiusz','Cezary','Dariusz','Eugeniusz','Fabian','Gabriel','Ignacy','Janusz','Leszek','Maksymilian','Narcyz','Olgierd','Przemysław','Stanisław','Tymoteusz','Urszula','Walenty','Władysław','Xawery','Yaroslav','Zbigniew','Zygfryd','Bartłomiej','Czesław','Dobromir','Eligiusz','Feliks','Gustaw','Hieronim','Ireneusz','Kazimir','Lech','Mirosław','Norbert','Radosław','Teodor','Urban','Wawrzyniec','Zdzisław','Ziemowit','Wojtek','Aleksy','Borys','Cyprian','Dorian','Franciszek','Gerard','Hubert','Janek','Karol','Leon','Mieczysław','Nikodem','Orest','Seweryn','Tadek','Wacław','Zbyszek','Aleksiej','Benedykt','Emiljan','Felicjan','Gracjan','Józef','Leopold','Napoleon','Patrycjusz','Sławomir','Tymon','Urszul'],
['Nowak','Kowalski','Lewandowski','Kowalczyk','Kamiński','Zieliński','Szymański','Kozłowski','Jankowski','Wojciechowski','Kwiatkowski','Kaczmarek','Mazur','Krawczyk','Piotrowski','Grabowski','Nowakowski','Pawłowski','Michalski','Adamczyk','Nowicki','Dudek','Zając','Wieczorek','Majewski','Jabłoński','Olszewski','Jaworski','Pawlak','Malinowski','Walczak','Witkowski','Rutkowski','Michalak','Sikora','Ostrowski','Baran','Szewczyk','Duda','Tomaszewski','Pietrzak','Marciniak','Zalewski','Jakubowski','Zawadzki','Jasiński','Sadowski','Chmielewski','Borkowski','Czarnecki','Sawicki','Kubiak','Sokołowski','Maciejewski','Urbański','Kucharski','Szczepański','Wilk','Lis','Mazurek','Kalinowski','Wysocki','Adamski','Wasilewski','Sobczak','Andrzejewski','Czerwiński','Cieślak','Zakrzewski','Sikorski','Krajewski','Szymczak','Szulc','Gajewski','Baranowski','Laskowski','Makowski','Brzeziński','Przybylski','Borowski','Nowacki','Chojnacki','Domański','Ciesielski','Krupa','Szczepaniak','Kaczmarczyk','Wesołowski','Kowalewski','Leszczyński','Lipiński','Kozak','Kania','Urbaniak','Mucha','Kowalik','Tomczak','Czajkowski','Mikołajczyk','Markowski','Kozioł','Nawrocki','Janik','Brzozowski','Markiewicz','Wawrzyniak','Musiał','Jarosz','Tomczyk','Kurek','Wolski','Kot','Stankiewicz','Dziedzic','Tkaczyk','Kopeć','Stasiak','Urban','Pawlik','Polak','Dobrowolski','Piasecki','Wierzbicki','Domagała','Krük','Karpiński','Jastrzębski','Janicki','Bednarek','Sosnowski','Stefański','Majchrzak','Bielecki','Maj','Sowa','Gajda','Milewski','Klimek','Olejniczak','Ratajczak','Madej','Romanowski','Kasprzak','Matuszewski','Marek','Kowal','Socha','Grzelak','Wilczyński','Czajka','Bednarczyk','Wrona','Skiba','Owczarek','Matusiak','Marcinkowski','Sobolewski','Orzechowski','Olejnik','Kurowski','Mazurkiewicz','Rogowski','Czech','Janiszewski','Bednarski','Barański','Skowroński','Pająk','Chrzanowski','Bukowski','Cieślik','Kosiński','Lisowski','Muszyński','Czaja','Okoń','Kozieł','Grzybowski','Pluta','Osiński','Morawski','Kuczyński','Sobczyk','Konieczny','Kwiecień','Marzec','Rybak','Augustyniak','Michalik','Marczak','Zych','Czyż','Kaczor','Krzemiński','Kubicki','Michałowski','Paluch','Sroka','Stefaniak','Niemiec','Kasprzyk','Kacprzak','Cybulski','Białek','Kujawa','Przybysz','Marszałek','Lewicki','Stachowiak','Witek','Szydłowski','Smoliński','Matysiak','Lech','Piekarski','Janowski','Kulesza','Cichocki','Murawski','Bednarz','Popławski','Niewiadomski','Rudnicki','Staniszewski','Turek','Chmiel','Biernacki','Skrzypczak','Sowiński','Podgórski','Karczewski','Drozd','Cichoń','Rosiński','Pietrzyk','Komorowski','Banach','Antczak','Filipiak','Grochowski','Graczyk','Klimczak','Serafin','Gruszka','Krzyżanowski','Bieniek','Siwek','Rak','Konieczna','Przybyła','Zawada','Godlewski','Kulik','Banaś','Ptak','Mikołajczak','Zarzycki','Strzelecki','Cieśla','Mielczarek','Bartkowiak','Krawiec','Konopka','Bartczak','Gil','Panek','Janiak','Winiarski','Tokarski','Banasiak','Grzyb','Zaremba','Kaczyński','Frankowski','Rakowski','Skowron','Dobosz','Sienkiewicz','Witczak','Dudziński','Nawrot','Fijałkowski','Kostrzewa','Kucharczyk','Tkacz','Biernat','Bogusz','Rybicki','Szymczyk','Czyżewski','Janus','Szczepanik','Rogalski','Buczek','Gawroński','Szostak','Kaleta','Jurek','Grzegorczyk'
]); // 38 285 857

let country19 = new Country('Argentina', 5, 20, 35, ['Santiago','Mateo','Benjamín','Thiago','Joaquín','Lucas','Francisco','Martín','Bautista','Nicolás','Valentino','Lautaro','Simón','Agustín','Felipe','Lorenzo','Juan','Matías','Valentín','Ignacio','Emiliano','Facundo','Manuel','Sebastián','Franco','Tomás','Axel','Julián','Máximo','Pedro','Aaron','Dylan','Ramiro','Gonzalo','Bruno','Rodrigo','Rafael','Iker','Andrés','Pablo','Gabriel','Federico','Alan','Jerónimo','Cristian','Diego','Marcelo','Ángel','Ricardo','Hugo','Adrián','Alejandro','Iván','César','Leonardo','Javier','Maximiliano','Elías','Luis','Esteban','Guillermo','Horacio','Sergio','Omar','Salvador','Alfonso','Emilio','Claudio','Félix','Víctor','Dante','Alfredo','Mario','Ezequiel','Fernando','Eloy','Hernán','Germán','Jonás','Raúl','Isaac','León','Renato','Ariel','Luciano','Mauricio','Aníbal','Marcos','Abel','Ernesto','Darío','Osvaldo'],
['Gonzalez','Rodriguez','Gomez','Fernandez','Lopez','Diaz','Martinez','Perez','Garcia','Sanchez','Romero','Sosa','Torres','Alvarez','Ruiz','Ramirez','Flores','Benitez','Acosta','Medina','Herrera','Suarez','Aguirre','Gimenez','Gutierrez','Pereyra','Rojas','Molina','Castro','Ortiz','Silva','Nuñez','Luna','Juarez','Cabrera','Rios','Morales','Godoy','Moreno','Ferreyra','Dominguez','Carrizo','Peralta','Castillo','Ledesma','Quiroga','Vega','Vera','Muñoz','Ojeda','Ponce','Villalba','Cardozo','Navarro','Coronel','Vazquez','Ramos','Vargas','Caceres','Arias','Figueroa','Cordoba','Correa','Maldonado','Paz','Rivero','Miranda','Mansilla','Farias','Roldan','Mendez','Guzman','Aguero','Hernandez','Lucero','Cruz','Paez','Escobar','Mendoza','Barrios','Bustos','Avila','Ayala','Blanco','Soria','Maidana','Acuña','Leiva','Duarte','Moyano','Campos','Soto','Martin','Valdez','Bravo','Chavez','Velazquez','Olivera','Toledo','Franco','Ibañez','Leguizamon','Montenegro','Delgado','Arce','Ibarra','Gallardo','Santillan','Acevedo','Aguilar','Vallejos','Contreras','Alegre','Galvan','Oviedo','Aranda','Albornoz','Baez','Sandoval','Barrionuevo','Veron','Gauna','Zarate','Heredia','Mercado','Monzon','Marquez','Zalazar','Mamani','Coria','Segovia','Romano','Jimenez','Salinas','Quinteros','Barrera','Ortega','Cabral','Palacios','Cejas','Quintana','Zapata','Rosales','Altamirano','Nieva','Bazan','Alonso','Burgos','Bustamante','Varela','Lescano','Aguilera','Paredes','Avalos','Cuello','Aquino','Orellana','Caballero','Reynoso','Reyes','Villarreal','Alarcon','Pacheco','Tapia','Galarza','Ocampo','Meza','Guerrero','Salas','Frias','Videla','Miño','Jara','Garay','Rossi','Lezcano','Valenzuela','Oliva','Fuentes','Robledo','Espindola','Nieto','Pereira','Brizuela','Andrada','Maciel','Funes','Robles','Sotelo','Cortez','Almiron','Rivas','Gil','Villegas','Calderon','Vergara','Carabajal','Ceballos','Gallo','Palavecino','Barreto','Alderete','Escudero','Saavedra','Serrano','Almada','Galeano','Espinosa','Villagra','Gerez','Solis','Ochoa','Escalante','Luque','Amaya','Arguello','Salazar','Lazarte','Barrientos','Vidal','Machado','Ferreira','Argañaraz','Iglesias','Guevara','Centurion','Esquivel','Lencina','Jaime','Cano','Lujan','Espinoza','Palacio','Villanueva','Salvatierra','Guerra','Barraza','Bordon','Saucedo','Ferrari','Costa','Rolon','Zabala','Albarracin','Duran','Peña','Tello','Quiroz','Montes','Alfonso','Brito','Marin','Moreira','Olmos','Montiel','Pintos','Olmedo','Bruno','Villafañe','Arroyo','Reinoso','Araujo','Gorosito','Cisneros','Quevedo','Montero','Barros','Moya','Basualdo','Carballo','Insaurralde','Prieto','Alcaraz','Santos','Corvalan','Chamorro','Casas','Carranza','Moreyra','Chaves','Riquelme','Arevalo','Bogado','Sequeira','Amarilla','Parra','Corbalan','Veliz','Falcon','Moran','Cantero','Otero','Rocha','Lobo','Cuevas','Roman','Caro','Jofre','Nievas'
]); // 45 798 417

let country20 = new Country('India',10, 10, 30, ['Aarav','Aryan','Arjun','Vihaan','Krish','Kabir','Aditya','Aadi','Ayaan','Arnav','Vedant','Advik','Dhruv','Shaan','Rehaan','Rishabh','Aarush','Yuvraj','Virat','Rohan','Siddharth','Dev','Rahul','Vivaan','Neil','Parth','Pranav','Pratham','Ayush','Shiv','Ranveer','Samar','Abhay','Ishan','Nihal','Raj','Akshay','Advaith','Jay','Dhairya','Sahil','Karthik','Rishi','Ansh','Varun','Rohit','Harsh','Kunal','Aniket','Lakshya','Mayank','Advait','Hrishikesh','Akash','Abhinav','Jai','Soham','Eshan','Pranay','Aaryan','Ved','Advay','Pratyush','Krishiv','Vihan','Tanish','Utkarsh','Reyansh','Yash','Aariz','Arya','Viyan','Daksh','Aayan','Reyan','Atharv','Ahaan','Shaurya','Aarnav','Devansh','Ayaansh','Krishang','Rian','Darsh','Neel','Om','Hridaan','Advit','Vihaas','Aarik','Adhir','Ahan','Anay','Arth','Devang','Divit','Harshil','Ishaan','Kian','Nakul'],
['Devi','Singh','Kumar','Das','Kaur','Ram','Yadav','Kumari','Lal','Bai','Khatun','Mandal','Ali','Sharma','Ray','Mondal','Khan','Sah','Patel','Prasad','Patil','Ghosh','Pal','Sahu','Gupta','Shaikh','Bibi','Sekh','Begam','Biswas','Sarkar','Paramar','Khatoon','Mahto','Ansari','Nayak','Ma','Rathod','Jadhav','Mahato','Rani','Barman','Behera','Mishra','Chand','Roy','Begum','Saha','Paswan','Thakur','Thakor','Ahamad','Chauhan','Pawar','Majhi','Bano','Naik','Pradhan','Alam','Shinde','Malik','Sardar','Nath','Raut','Bauri','Shaik','Chandra','Patra','Jha','Murmu','Solanki','Cauhan','Shah','Prakash','Sinh','Pandey','Patal','Munda','Dutta','Chaudhari','Raj','Pandit','Jain','Kamble','Manjhi','Rana','Molla','Chaudhary','Makavan','Jena','Chakraborty','Hussain','Pathan','Gayakwad','Nisha','Vasav','Debnath','Rai','More','Varma','Uddin','Karmakar','Bag','Jana','Sih','Mohammed','Oraon','Kadam','Giri','Barik','Reddy','Tudu','Mi','Husain','Bhagat','Islam','Sinha','Kanwar','Ahmed','De','Sekha','Sing','Tiwari','Mallik','Swain','Dey','Verma','Ti','Jahan','Basumatary','Bera','Saw','Mali','Paul','Shankar','Bhoi','Sheik','Dei','Ahmad','Mal','Sangma','Gogoi','Vaghel','Joshi','Mohammad','Panda','Sahoo','Rathav','Bagdi','Mukherjee','Ta','Banerjee','Marak','Vati','Pramanik','Sahani','Soren','Narayan','Mistri','Rao','Manna','Boro','Laskar','Kale','Rabha','Mohanty','Bala','Rahman','Shukla','Soni','Koli','Halder','Miya','Deshmukh','Naskar','Tivari','Pathak','Debbarma','Mane','Deka','Rajak','Nair','Sawant','Sen','Babu','Shek','Tanti','Cavad','Mallick','Maity','Sonvane','Shaw','Raval','Maiti','Shrivastav','Maji','Ya','Choudhary','Mahanta'
]); // 1,474,000,000

let country21 = new Country('Nigeria',10,20,30, ['Zayaan','Ovie','Kelechi','Adedayo','Abdulhamid','Chukwuma','Chidiebere','Munachimso','Ikechukwu','Uzoma','Chimaobi','Chibuike','Chikezie','Akachukwu','Abdulhameed','Adeniyi','Arinzechukwu','Chidiebube','Chiemeka','Chidozie','Ebubechukwu','Ifeanyichukwu','Saro','Kachiside','Oba','Chuk','Obasi','Ochuko','Onochie','Abaeze','Abayomrunkoje','Abegunde','Abidugun','Adebamgbe','Adebiyi','Bako','Banjoko','Chetachukwu','Chimezie','Debare','Durojaiye','Ebhaleleme','Egharevba','Ekong','Elochukwu','Enofe','Ezesinachi','Ganiru','Idogbe','Ifechi','Ilozumba','Inegbedion','Isamotu-Olalekan','Jideofor','Kaodinakachi','Kentoroabasi','Kristibueze','Mfoniso','Mobo','Mongo','Ndulue','Nwabueze','Obiefune','Afamefuna','Akunna','Amobi','Anozie','Azubuike','Bunkechukwu','Chetachi','Chibundu','Chibunna','Chibuzor','Chidiadi','Chiekezie','Chiemelie','Chiemezie','Chikanma','Chimankpa','Chinaka','Chinecherem','Chukwudumaga','Chukwuemerie','Chuwudubem','Diarachukwundu','Echezonanna','Ejikeme','Ekenedilichukwu','Emenike','Enyinnaya','Esomchi','Ewelike','Ezeudo','Golibe','Gosifechukwu','Hanyechukwu','Ifechukwude','Ifemyolunna','Igwebuike'],
['Ibrahim','Musa','Abubakar','Abdullahi','Mohammed','Sani','Adamu','Usman','Umar','Muhammad','Muhammed','Aliyu','Yusuf','Ali','Garba','Bello','Haruna','Hassan','Lawal','Aminu','Yakubu','Isah','John','Idris','Eze','Yahaya','Salisu','Ahmed','Sunday','Akpan','Isa','Shehu','Amadi','Bala','Umaru','Ahmad','Okafor','Emmanuel','Saidu','Rabiu','Joseph','James','Okeke','Audu','Samuel','Dauda','Ojo','Mustapha','Adebayo','Okoro','Suleiman','Sulaiman','Baba','Okon','Abba','Muhammadu','Peter','Chukwu','Igwe','Udo','Ajayi','Jimoh','Daniel','David','Nwachukwu','Obi','Kabiru','Ugwu','Nwankwo','Sule','Salihu','Sale','Adam','Lawan','Dahiru','Okoye','Njoku','Nuhu','Shuaibu','Bassey','Okonkwo','Ado','Yau','Alhaji','Nura','Nasiru','Hamza','Moses','Ogbonna','Ayuba','Ismail','Suleman','Nweke','Adeyemi','Yunusa','Bukar','Balogun','Nwafor','Azeez','Afolabi'
]); // 237 000 000

let country22 = new Country('Puerto Rico',1,20,35, ['Sebastián','Dylan','Ian','Mateo','Adrián','Liam','Lucas','Matías','Thiago','Jayden','Ángel','Luis','José','Diego','Carlos','Noah','Fabian','Juan','Gabriel','Alejandro','Michael','Angél','Derek','Christian','Ryan','Yadiel','José Luis','Manuel','Rafael','Javier','Santiago','Victor','David','Luis Miguel','Miguel Ángel','Marcos','Ángel David','Christian José','Josué','Ricardo','Ismael','Emilio','Felipe','Andrés','Antonio','Ramón','Roberto','Enrique','Orlando','Esteban','Fernando','Alberto','Francisco','Arturo','Gustavo','Nelson','Omar','Jaime','Sergio','Héctor','José Antonio','Adriel','Gael','Elian','Elias','Damián','Joel','Julian','Evan','Martin','Pablo','José Miguel','Juan Carlos','César','Jorge','Marco','Adriano','Emiliano','Moisés','Abel','Isaac','Gonzalo','Joaquín','Mauro','Isaiah','Emmanuel','Benjamín','Edison','Bruno','Byron','Alexis','Tomas','Esteban','Francisco','Javier','Manuel','Luis','José','Juan','Miguel'],
['Sanchez','Rivera','Diaz','Rodriguez','Narvaez','Burgos','Colon','Vazquez','Ramos','Ortiz','Morales','Betancourt','Cruz','Santiago','Reyes','Perez','Agosto','Carrasquillo','Garcia','Ortega','Torres','Canales','Vega','Ayala','Gonzalez','Menendez','Martinez','Lopez','Hernandez','Rosa','Merced','Pagan','Valentin','Delgado','Velez','Quiñones','Malave','Rosado','Ogando','Pastrana','Sierra','Acevedo','Sanabria','Soler','Velazquez','Caballero','Panet','Ruiz','Marrero','Bordelies','Potter','Nieves','Soto','Miranda','Arroyo','Roman','Ramirez','Melendez','Cintron','Lugo','Robles','Mojica','Santos','Avila','Jimenez','Figueroa','Solis','Berrios','Negron','Aponte','Vargas','Serrano','Bruno','Medina','Guzman','Ferrer','Muñiz','Abreu','Montes','Castillo','Mercado','Maldonado','de Jesus','Espinosa','Montañez','Bibiloni','Lebron','Matos','Echevarria','del Valle','Mendez','Baez','Quinones','Gutierrez','Mendin','Ocasio','Alicea','Collazo','Bobe'
]); // 3 233 000

let country23 = new Country('Montenegro',1,40,45, ['Nikola','Luka','Marko','Stefan','Ivan','Aleksandar','Milos','Danilo','Petar','Filip','Vuk','Andrija','Jovan','Matej','Nemanja','Bojan','Mihailo','Dusan','Vasilije','Ognjen','Lazar','Aleksa','Dejan','Djordje','Boris','Branko','Dragan','Goran','Sava','Veljko','Zoran','Vladimir','Miroslav','Radovan','Radoslav','Uros','Vojislav','Zdravko','Milovan','Nenad','Predrag','Ratko','Slobodan','Strahinja','Tihomir','Tomislav','Vlado','Zeljko','Zlatko','Dalibor','Davor','Duro','Emir','Gojko','Jakov','Mladen','Rastko','Roko','Slavko','Stjepan','Tibor','Vedran','Vinko','Zvonko','Aco','Borko','Darko','Dimitrije','Edin','Eldar','Faruk','Hrvoje','Ismet','Kenan','Merdan','Nermin','Ranko','Sanjin','Selim','Senad','Senko','Tarik','Veselin','Vitomir','Vlastimir','Zlatan','Mato','Antun','Juraj','Božidar','Žarko','Stanko','Zdenko','Stevan','Blagoje','Vujadin','Momir','Ratimir','Duško','Borislav','Budimir','Radoje','Milutin','Dobrivoje','Dragiša','Dragutin','Branimir','Božo','Vidoslav','Radivoje','Slaviša'],
['Popović','Marković','Ivanović','Radulović','Vukčević','Radović','Jovanović','Vuković','Knežević','Kovačević','Vujović','Božović','Pejović','Djurović','Raičević','Nikolić','Perović','Bulatović','Bošković','Maraš','Radonjić','Janković','Kalač','Petrović','Nikčević','Mugoša','Milošević','Martinović','Ćetković','Pavićević','Radunović','Milić','Šćekić','Šćepanović','Mitrović','Boljević','Krivokapić','Stojanović','Vujačić','Klikovac','Živković','Todorović','Vučinić','Vujošević','Rašović','Murić','Djukanović','Jovović','Karadžić','Stanišić','Vuksanović','Bojović','Damjanović','Rakočević','Kaludjerović','Novaković','Drašković','Miranović','Radević','Vukićević','Agović','Milović','Zečević','Lazarević','Djurišić','Vukotić','Adrović','Mijović','Rajković','Filipović','Obradović','Lekić','Pavlović','Pajović','Hodžić','Leković','Dacić','Djukić','Korać','Vojinović','Ilić','Bubanja','Milačić','Vlahović','Drobnjak','Tomić','Terzić','Dragović','Stanković','Djuretić','Jokić','Sekulić','Joksimović','Mijušković','Tomašević','Škrijelj','Babović','Samardžić','Pepić'
]); // 632 531

let country24 = new Country('Czechia',3,25,35, ['Adam','Jakub','Matěj','Tomáš','Lukáš','Filip','Jan','David','Ondřej','Martin','Petr','Michal','Marek','Jiří','Daniel','Vojtěch','Josef','Dominik','Karel','Aleš','Pavel','Honza','Radek','Jiřík','Richard','Robert','Antonín','Jaroslav','Erik','Václav','František','Vít','Patrik','Janek','Štěpán','Viktor','Lukášek','Eduard','Adamko','Samuel','Miroslav','Milan','Stanislav','Jakoubek','Rudolf','Jano','Radim','Tom','Janoš','Kryštof','Emil','Arnošt','Libor','Jaromír','Viktorin','Bohumil','Vladimír','Slavomír','Otakar','Bohdan','Leopold','Vlastimil','Radovan','Dalibor','Oldřich','Šimon','Ctirad','Bedřich','Vladislav','Hynek','Zdeněk','Ctibor','Bohumír','Zbyněk','Bronislav','Drahomír','Ctislav','Dobroslav','Jindřich','Bořek','Blahoslav','Dobromil','Kvido','Radimír','Bohuslav','Boleslav','Kamil','Klement','Norbert','Stěpán','Svatopluk','Miloslav','Prokop','Vendelín','Vlastislav','Zikmund','Radomír','Slavibor','Vítek','Zdislav','Liboslav','Soběslav','Višeslav','Rostislav','Jaromil','Božetěch'],
['Novák','Svoboda','Novotný','Dvořák','Černý','Procházka','Kučera','Veselý','Horák','Němec','Pokorný','Marek','Pospíšil','Hájek','Jelínek','Král','Růžička','Beneš','Fiala','Sedláček','Doležal','Zeman','Kolář','Navrátil','Čermák','Vaněk','Urban','Blažek','Kříž','Kovář','Kopecký','Kadlec','Holub','Bartoš','Malý','Štěpánek','Musil','Kratochvíl','Šimek','Tomek','Sedlák','Pavelka','Urbanek','Straka','Soukup','Fuchs','Čech','Bláha','Králík','Tichý','Pešek','Říha','Kaplan','Zelenka','Krupa','Brož','Skála','Váňa','Máslák','Sýkora','Matoušek','Dostál','Mareš','Bureš','Krejčí','Kouba','Vacek','Řehoř','Hampl','Bednář','Konečný','Macháček','Švec','Holý','Adler','Ledvina','Chládek','Vaníček','Bartek','Chovanec','Zima','Červenka','Sládek','Janda','Ptáček','Hruška','Vávra','Mareček','Žák','Mach','Richter','Čechák','Kolman','Barták','Havlíček','Tomášek','Havel','Polák','Hejda','Ševčík'
]); // 10 583 582

let countries = [];
countries.push(country1,country2,country3,country4,country5,country6,country7,country8,country9,country10,country11,country12,country13,country14,country15,country16,country17,country18,country19,country20,country21,country22,country23,country24);

let rookieClass = [];
rookieClass.push([currentYear+1]);
let draftOrder = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0]; // will safe NBA teams abbrevations from draft pick Nr 1 to 30
let draftPicksAndTeams = [];


let potIncrCount = 0;
///////////////////////////////// function to create a new basketball player that's put in a NBA draft
let createRookie = function (){
	let randCountry; // will store random country
	let randPPcheck; // will store random number that will be compared with countries coefficient made of population and popularity
	let countryFound = 0; // if 1 = country will be found and function will end
	let primPos; // will store player's rimary position in getNewPosition() function
	
	do {
		randCountry = Math.floor(Math.random() * countries.length);
		randPPcheck = Math.floor(Math.random() * 3110) + 1;
		//console.log(`Random country ${countries[randCountry].countryName} = ${randCountry}`);
		//console.log(`Countries PP = ${ countries[randCountry].population + countries[randCountry].popularity + countries[randCountry].playerQuality }`)
		if ( (countries[randCountry].population + countries[randCountry].popularity + countries[randCountry].playerQuality) >= randPPcheck) {
			countryFound = 1;
		}
	} while (countryFound !== 1);

	//console.log(`randCountry = ${randCountry} - ${countries[randCountry].countryName}`);

	let findPlayerName = function (){
		let fn, ln; 
		while (fn === ln) {
			fn = countries[randCountry].firstNames[ Math.floor(Math.random() * countries[randCountry].firstNames.length) ];
			ln = countries[randCountry].lastNames[ Math.floor(Math.random() * countries[randCountry].lastNames.length) ];
		}
		return fn + " " + ln; // returns first + last names as one string
	}
	let getNewPosition = function (){
		if (!primPos) { // if primary position hasn't been selected yet
			let position = Math.floor(Math.random() * 5);
			if (position == 0) { primPos = "C"; return "C" }
			else if (position == 1) { primPos = "PF"; return "PF"; }
			else if (position == 2) { primPos = "SF"; return "SF"; }
			else if (position == 3) { primPos = "SG"; return "SG"; }
			else if (position == 4) { primPos = "PG"; return "PG"; }
		} else { // if primary position has been already selected, look for secondary position
			let secPosition = Math.floor(Math.random() * 2);
			console.log(`secPosition = ${secPosition}`);
			if (primPos === "C") { return "PF"; } 
			else if (primPos === "PF") { if (secPosition == 1) { return "C"; } else { return "SF"; } }
			else if (primPos === "SF") { if (secPosition == 1) { return "PF"; } else { return "SG"; } }
			else if (primPos === "SG") { if (secPosition == 1) { return "SF"; } else { return "PG"; } }
			else if (primPos === "PG") { return "SG"; }
		}
	}
	let getPlayerAge = function (){
		return Math.floor(Math.random() * (25-19) ) + 19;  // max - min) + min
	}
	
	let getSkillRating = function (min, max, skill) {
		if (skill == 1) { // inside scoring
			if (primPos == "C" || primPos == "PF") { min = 45; }
		} else if (skill == 9) { // dribble
			if (primPos == "PG") { min = 50; max = 65; }
			else if (primPos == "SG" || primPos == "SF") { min = 40; max = 60; }
			else if (primPos == "PF" || primPos == "C") { min = 20; max = 60; }
		} else if (skill == 10) { // assis
			if (primPos == "PG") { min = 40; max = 65; }
			else if (primPos == "SG" || primPos == "SF") { min = 30; max = 55; }
			else if (primPos == "PF" || primPos == "C") { min = 20; max = 45; }
		} else if (skill == 11) { // offensive rebound
			if (primPos == "PG") { min = 10; max = 40; }
			else if (primPos == "SG") { min = 15; max = 45; }
			else if (primPos == "SF") { min = 20; max = 55; }
			else if (primPos == "PF" || primPos == "C") { min = 20; max = 60; }
		} else if (skill == 12) { // defensive rebound
			if (primPos == "PG") { min = 30; max = 50; }
			else if (primPos == "SG") { min = 30; max = 55; }
			else if (primPos == "SF") { min = 30; max = 60; }
			else if (primPos == "PF" || primPos == "C") { min = 40; max = 65; }
		} else if (skill == 15) { // block
			if (primPos == "PG") { min = 10; max = 40; }
			else if (primPos == "SG") { min = 10; max = 50; }
			else if (primPos == "SF") { min = 10; max = 60; }
			else if (primPos == "PF" || primPos == "C") { min = 20; max = 65; }
		} else if (skill == 16) { // steal
			if (primPos == "PG" || primPos == "SG") { min = 30; max = 65; }
			else if (primPos == "SF" || primPos == "PF" || primPos == "C") { min = 30; max = 60; }
		}
		// generates a 100 to 1 chance to get +20 in Offensive Awareness
		if (skill == 13) {
			let randNum = Math.floor(Math.random() * 50 ) + 1;
			if (randNum == 1) {
				min = 60;
				max = 80;
			}
		}
		
		if (min > 0 && max == null) {
			return Math.floor(Math.random() * ( (60 + (countries[randCountry].playerQuality / 10) ) - min) ) + min;  // (max - min) + min
		} else if (min > 0 && max > 0) {
			return Math.floor(Math.random() * ( (max + (countries[randCountry].playerQuality / 10) ) - min) ) + min;  // (max - min) + min
		} else {
			return Math.floor(Math.random() * (60 + (countries[randCountry].playerQuality / 10) ) )+1;
		}
		
	}
	
	let getRookieHeight = function () {
		if (primPos === "C") { return Math.floor(Math.random() * (230-205) ) + 205; }
		else if (primPos === "PF") { return Math.floor(Math.random() * (215-199) ) + 199; }
		else if (primPos === "SF") { return Math.floor(Math.random() * (210-198) ) + 198; }
		else if (primPos === "SG") { return Math.floor(Math.random() * (205-190) ) + 190; }
		else if (primPos === "PG") { return Math.floor(Math.random() * (200-180) ) + 180; }
	}
	let getRookieWeight = function () {
		if (primPos === "C") { return Math.floor(Math.random() * (130-90) ) + 90; }
		else if (primPos === "PF") { return Math.floor(Math.random() * (120-90) ) + 90; }
		else if (primPos === "SF") { return Math.floor(Math.random() * (110-80) ) + 80; }
		else if (primPos === "SG") { return Math.floor(Math.random() * (105-80) ) + 80; }
		else if (primPos === "PG") { return Math.floor(Math.random() * (95-70) ) + 70; }
	}

	/* Generates random Potential
	0 - A (the best)
	1 - B
	2 - C
	3 - D
	4 - E (the worst)
	! Each coutries Player Quality rating gives a +1 chance increase in potential when a rookie is created
	*/
	let getRookiePotential = function(){
		let potentialLevel = Math.floor(Math.random() * 5);
		let potentialIncreaseChance = Math.floor(Math.random() * 100)+1;
		if (potentialIncreaseChance <= countries[randCountry].playerQuality){
			console.log(`potentialLevel before - ${potentialLevel}`);
			potentialLevel > 0 ? potentialLevel-- : potentialLevel = 0; 
			console.log(`potentialLevel after - ${potentialLevel}`);
			potIncrCount++;
			console.log(`potIncrCount = ${potIncrCount}`);
		}
		return potentialLevel;
	}

	let rookie1 = new Player (502, findPlayerName(randCountry), getNewPosition(), getPlayerAge(), getSkillRating(35,60,1),getSkillRating(30),getSkillRating(20),getSkillRating(40, 80), getSkillRating(30,75),getSkillRating(30),getSkillRating(40,70),getSkillRating(40,70),getSkillRating(30,60,9),getSkillRating(20,60,10),   getSkillRating(10,60,11),getSkillRating(30,60,12),getSkillRating(40,null,13),getSkillRating(40),getSkillRating(10,60,15),getSkillRating(30,60,16), getSkillRating(40),getSkillRating(70,90),getRookiePotential(),  0, getNewPosition(),countries[randCountry].countryName,getRookieHeight(),getRookieWeight(),0,0);
	//console.log(rookie1);
	
	rookieClass[seasonsPlayed].push(rookie1);
}

// Function to generate random player potential
let randomPotential = function(){
	return Math.floor(Math.random() * 5);
}

// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick

let pl1 = new Player(1, "Trae Young", "PG",27,  51,74,75,87, 68,40,74,74,86,95, 25,26,88,46,10,56, 85,86,randomPotential(),  7, "SG",'USA',185,74,2018,5); // UPDATED ATL
let pl2 = new Player(2, 'Asa Newell',"PF",20, 65,60,38,74,  70,50,60,60,40,19, 60,60,55,55,50,50, 80,90,randomPotential(), 0, "C",'USA',208,99,2025,23); // UPDATED ATL
let pl3 = new Player(3, 'Nickeil Alexander-Walker','SG',27, 60,75,73,77, 60,50,62,74,71,39, 18,37,65,72,30,45, 80,80,randomPotential(), 6,'SF','Canada',196,92,2019,17); // UPDATED ATL
let pl4 = new Player(4, 'Jacob Toppin','SF',25, 55,59,59,67, 72,52,58,58,58,37, 38,67,53,58,40,45, 75,80,randomPotential(), 2,'PF','USA',206,92,0,0); // UPDATED ATL
let pl5 = new Player(5, 'Luke Kennard','SG',29, 47,79,77,89, 50,30,59,58,68,63, 18,36,64,44,10,56, 82,80,randomPotential(), 8,'PG','USA',196,93,2017,12); // UPDATED ATL
let pl6 = new Player(6, "De'Andre Hunter", "SF",28, 64,70,74,84, 65,55,66,73,60,19, 14,41,76,60,15,45, 80,80,randomPotential(), 6,'SG','USA',203,102,2019,4); // --> cle
let pl7 = new Player(7, "Onyeka Okongwu", "C", 25, 66,78,64,75, 65,60,64,64,44,29, 76,77,70,67,56,54, 78,83,randomPotential(), 5,'PF','USA',203,106,2020,6); //  UPDATED ATL
let pl8 = new Player(8, "Garrison Mathews", "SG",29, 53,71,78,81, 55,34,40,50,66,13, 12,30,55,44,15,59, 67,79,randomPotential(), 6,'SF','USA',196,97,0,0); //  --> fa
let pl9 = new Player(9, "Vit Krejci", "SG",25, 50,54,77,71, 66,30,65,65,60,56, 14,42,56,53,40,53, 70,80,randomPotential(), 4,'SF','Czechia',203,88, 2020,37); //   UPDATED ATL
let pl10 = new Player(10, "Kevon Harris", "SG",28, 53,62,61,76, 64,48,61,61,59,13, 44,34,53,50,20,56, 62,80,randomPotential(), 3,'SF','USA',196,97,0,0); //  --> hou
let pl11 = new Player(11, "Jalen Johnson", "SF",24, 72,68,64,75, 72,58,66,66,48,51, 34,83,79,61,50,66, 75,80,randomPotential(), 4,'PF','USA',206,99,2021,20); // UPDATED ATL
let pl12 = new Player(12, "Zaccharie Risacher", "SF",20, 60,64,71,71, 57,46,60,72,69,18, 34,36,74,67,35,50, 81,80,randomPotential(),  1,'SG','France',206,90,2024,1); //  UPDATED ATL
let pl13 = new Player(13, "Dyson Daniels", "PG", 22, 55,58,70,59, 65,42,69,79,76,47, 34,46,65,84,40,96, 79,80,randomPotential(), 3,'SG','Australia',203,90,2022,8); // UPDATED ATL
let pl14 = new Player(14, "Keaton Wallace", "PG",26, 41,58,72,83, 62,39,70,69,62,68, 10,41,56,66,30,80, 78,84,randomPotential(),  1,'SG','USA',190,88,0,0); // UPDATED ATL
let pl15 = new Player(15, "Kobe Bufkin", "SG",22, 51,69,60,72, 70,30,76,76,77,59, 30,56,60,50,30,45, 85,80,randomPotential(), 2,'PG','USA',193,88,2023,15); // UPDATED ATL
let pl16 = new Player(16, 'Caleb Houstan','SG',22, 38,66,73,84, 62,30,68,72,60,26, 18,36,53,62,15,50, 76,80,randomPotential(), 3,'SF','Canada',203,92,2022,32);// UPDATED ATL
let pl17 = new Player(17, "Mouhamed Gueye", "PF",23, 61,57,53,73, 65,53,57,57,50,28, 60,64,59,60,84,79, 78,80,randomPotential(), 2,'C','Senegal',211,95,2023,39); // UPDATED ATL
let pl19 = new Player(19, "Kristaps Porzingis", "C",30, 80,60,77,81, 68,64,56,55,58,26, 40,64,88,67,78,45, 84,77,randomPotential(), 9,'PF','Latvia',218,108,2015,4); // UPDATED ATL

// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick

let pl18 = new Player(18, "Jrue Holiday", "PG", 35, 55,61,78,83, 58,39,69,86,76,53, 26,46,70,80,40,60, 83,80,randomPotential(), 16,'SG','USA',193,92,2009,17); // --> por
let pl20 = new Player(20, "Al Horford", "C", 39, 67,73,80,76, 59,81,43,57,40,35, 34,68,55,70,60,40, 77,78,randomPotential(), 18,'PF','Dominican Republic',206,108,2007,3); // --> gsw
let pl21 = new Player(21, "Jaylen Brown", "SF", 29, 73,74,68,76, 74,59,69,78,76,41, 24,51,86,73,25,56, 80,82,randomPotential(),9,'SG','USA',198,101,216,3); // UPDATED Boston
let pl22 = new Player(22, "Payton Pritchard", "PG",27, 45,70,75,85, 56,31,65,65,72,55, 26,45,70,46,10,50, 70,81,randomPotential(), 5,'SG','USA',185,88,2020,26); // UPDATED Boston
let pl23 = new Player(23, "Jayson Tatum", "PF", 27, 79,75,75,81, 73,61,72,78,86,55, 18,77,92,74,35,55, 84,80,randomPotential(),8,'SF','USA',203,95,2017,3); // UPDATED Boston
let pl24 = new Player(24, "Derrick White", "SG",31, 56,74,76,89, 65,36,78,83,76,57, 16,39,69,76,59,54, 77,81,randomPotential(), 8,'PG','USA',193,86,2017,29); // Boston
let pl25 = new Player(25, "Lonnie Walker IV","SG",27, 56,62,72,76, 73,54,79,79,68,26, 10,41,75,51,35,53, 70,82,randomPotential(), 7,'SF','USA',193,92,2018,18); // Boston
let pl26 = new Player(26, "Xavier Tillman Sr.", "C",26, 66,53,46,57, 59,62,36,57,51,26, 60,55,54,74,66,75, 67,80,randomPotential(), 5,'PF','USA',203,111,2020,35); // Boston
let pl27 = new Player(27, "Jordan Walsh", "SF",21, 55,55,58,71, 76,44,67,67,58,37, 44,47,53,63,40,62, 60,80,randomPotential(), 2,'PF','USA',201,92,2023,38); // Boston
let pl28 = new Player(28, "JD Davison", "PG", 23, 45,63,61,73, 74,44,75,75,76,72, 26,45,58,47,50,50, 55,80,randomPotential(), 3,'SG','USA',185,88,2022,53); // Boston
let pl29 = new Player(29, "Luke Kornet", "C", 30, 64,46,32,82, 52,56,28,27,33,25, 86,52,55,57,84,40, 64,77,randomPotential(), 8,'PF','USA',218,113,0,0); // Boston
let pl30 = new Player(30, "Sam Hauser","SF",28, 51,74,82,89, 52,56,51,52,33,17, 20,48,64,44,35,40, 67,80,randomPotential(), 4,'PF','USA',203,97,0,0); // Boston
let pl31 = new Player(31, "Neemias Queta","C",26, 58,47,0,71, 55,66,49,49,28,22, 90,70,60,54,80,60, 60,80,randomPotential(), 4,'C','Portugal',213,111,2021,39); // Boston
let pl32 = new Player(32, "Jaden Springer","SG",23, 45,63,40,82, 62,39,72,72,71,31, 48,33,53,65,55,90, 59,80,randomPotential(), 4,'PG','USA',193,92,2021,28); // Boston
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl33 = new Player(33, "Shake Milton","SG",29 , 50,82,60,82, 67,28,67,69,74,46, 18,46,65,43,20,50, 69,83,randomPotential(), 7,'PG','USA',196,92,2018,54); // Brooklyn
let pl34 = new Player(34, "Bojan Bogdanovic", "SF",36, 56,80,79,80, 55,50,57,62,64,24, 14,38,81,51,5,37, 79,84,randomPotential(), 11,'PF','Bosnia and Herzegovina',201,102,2011,31); // Brooklyn
let pl35 = new Player(35, "Dorian Finney-Smith", "PF",32, 56,61,58,72, 70,52,57,72,50,20, 40,40,50,63,35,51, 77,81,randomPotential(), 9,'SF','USA',201,99,0,0); // Brooklyn
let pl36 = new Player(36, "Killian Hayes", "PG",24, 50,69,37,75, 60,46,69,69,73,73, 8,39,53,58,35,66, 76,83,randomPotential(), 5,'SG','France',196,88,2020,7); // Brooklyn
let pl37 = new Player(37, "Keon Johnson", "SG",23, 48,58,60,76, 88,30,83,74,62,42, 24,29,59,56,30,62, 64,80,randomPotential(), 4,'SF','USA',196,84,2021,21); // Brooklyn
let pl38 = new Player(38, "Trendon Watford", "PF",25, 68,58,60,76, 70,69,53,53,40,34, 44,60,64,45,35,50, 66,80,randomPotential(), 4,'C','USA',206,108,0,0); // Brooklyn
let pl39 = new Player(39, "Nic Claxton", "C",26, 67,64,25,55, 69,61,59,67,39,25, 66,87,64,73,85,45, 75,80,randomPotential(), 6,'PF','USA',211,97,2019,31); // Brooklyn
let pl40 = new Player(40, "Ziaire Williams","SF",24, 57,56,50,80, 72,30,77,77,69,26, 24,50,58,57,15,54, 69,80,randomPotential(),  4,'SG','USA',206,97,2021,10); // Brooklyn
let pl41 = new Player(41, "Jalen Wilson", "SF",25, 47,62,58,79, 65,20,72,69,58,24, 50,46,53,39,10,30, 65,80,randomPotential(),  2,'PF','USA',203,102,2023,51); // Brooklyn
let pl42 = new Player(42, "Cameron Johnson", "PF",29, 62,71,75,82, 69,50,60,60,49,31, 24,44,77,55,20,55, 77,78,randomPotential(), 6,'SF','USA',203,95,2019,11 ); // Brooklyn
let pl43 = new Player(43, "De'Anthony Melton", "SG",27, 53,50,69,77, 65,40,66,66,73,44, 24,46,66,71,40,85, 72,83,randomPotential(), 7,'PG','USA',188,90,2018,46); // Brooklyn
let pl44 = new Player(44, "Ben Simmons", "SF",29, 70,36,30,44, 70,60,77,77,76,86, 40,67,55,68,45,54, 73,80,randomPotential(), 7,'PG','Australia',208,108,2016,1); // Brooklyn
let pl45 = new Player(45, "Amari Bailey", "PG",21, 50,69,58,70, 61,36,74,74,69,39, 24,37,52,44,10,46, 56,90,randomPotential(), 2,'SG','USA',196,83,2023,41); // Brooklyn
let pl46 = new Player(46, "Dariq Whitehead", "SF",21, 52,66,59,79, 72,42,69,69,68,34, 17,38,50,52,32,54, 60,77,randomPotential(), 2,'SG','USA',201,99,2023,22); // Brooklyn
let pl47 = new Player(47, "Cam Thomas", "SG",24, 67,72,70,85, 69,44,67,67,72,33, 10,36,85,43,15,40, 72,80,randomPotential(), 4,'SF','USA',193,95,2021,27); // Brooklyn
let pl48 = new Player(48, "Day'Ron Sharpe", "C",24, 54,39,36,61, 63,69,51,51,48,33, 93,89,60,57,74,45, 63,80,randomPotential(), 4,'PF','USA',211,120,2021,29); // Brooklyn
let pl49 = new Player(49, "Noah Clowney", "PF",21, 65,59,56,70, 65,54,54,54,49,18, 50,67,54,56,68,40, 66,80,randomPotential(), 2,'C','USA',208,95,2023,21); // Brooklyn
let pl50 = new Player(50, "Jaylen Martin", "SG",21, 51,46,40,60, 73,30,73,66,55,51, 53,44,50,50,53,36, 55,82,randomPotential(), 1,'SF','USA',198,97,0,0); // Brooklyn

// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl52 = new Player(52, "LaMelo Ball", "PG",24, 63,68,70,83, 69,40,74,74,78,86, 30,56,90,63,20,75, 81,82,randomPotential(), 5,'SG','USA',201,81,2020,3); // Charlotte
let pl53 = new Player(53, "Tre Mann", "PG",24, 53,70,62,77, 58,43,64,64,73,60, 14,47,59,50,15,65, 71,80,randomPotential(), 4,'SG','USA',190,80,2021,18); // Charlotte
let pl54 = new Player(54, "Nick Richards","PF",28, 59,49,33,73, 65,55,62,60,25,11, 76,76,60,55,70,25, 67,84,randomPotential(),  5,'C','Jamaica',213,111,2020,42); // Charlotte
let pl55 = new Player(55, "Grant Williams","PF",27, 60,63,67,76, 56,63,48,60,56,29, 30,42,60,55,38,38, 72,80,randomPotential(),  5,'C','USA',198,107,2019,22 ); // Charlotte
let pl56 = new Player(56, "Seth Curry", "SG",35, 38,63,70,90, 58,31,68,68,68,31, 22,29,59,42,20,53, 73,80,randomPotential(), 11,'PG','USA',185,83,0,0); // Charlotte Hornets
let pl57 = new Player(57, "Tidjane Salaun", "PF",20, 58,62,52,73, 70,50,61,72,56,32, 42,47,55,54,40,49, 68,80,randomPotential(), 1,'SF','France',208,91,2024,6); // Charlotte
let pl58 = new Player(58, "Miles Bridges", "SF",27, 71,63,60,82, 72,63,65,66,66,32, 20,61,80,50,40,45, 80,85,randomPotential(), 6,'PF','USA',201,102,2018,12); // Charlotte
let pl59 = new Player(59, "Taj Gibson","PF",40, 67,72,26,71, 48,73,39,47,25,20, 48,46,54,57,51,40, 65,83,randomPotential(),  16,'C','USA',206,105,2009,26); // Charlotte
let pl60 = new Player(60, "Vasilije Micic", "PG",31, 47,77,47,81, 52,34,65,65,76,80, 8,23,56,42,10,45, 69,82,randomPotential(),  2,'SG','Serbia',196,90,2014,52); // Charlotte
let pl61 = new Player(61, "Josh Green", "SG",25, 51,67,67,68, 70,50,76,76,60,31, 20,34,53,56,10,53, 70,83,randomPotential(),  5,'PF','Australia',196,90,2020,18); // Charlotte
let pl62 = new Player(62, "Cody Martin", "SF",30, 59,32,51,65, 65,48,58,62,63,40, 32,43,50,57,35,66, 71,80,randomPotential(), 6,'SG','USA',196,92,2019,36); // Charlotte
let pl63 = new Player(63, "Nick Smith Jr.","SG",21, 52,47,74,86, 76,38,74,74,69,29, 18,27,65,41,15,25, 64,80,randomPotential(),   2,'PG','USA',200,100,0,0); // Charlotte
let pl64 = new Player(64, "Moussa Diabate", "C",23, 53,58,40,64, 68,50,63,63,30,23, 87,51,55,53,60,60, 57,80,randomPotential(),  3,'PF','France',211,95,2022,43); // Charlotte
let pl65 = new Player(65, "Keyontae Johnson", "SG",25, 53,58,60,71, 71,50,71,68,54,32, 40,43,45,49,30,48, 60,80,randomPotential(), 2,'SF','USA',200,100,0,0); // Charlotte
let pl66 = new Player(66, "Brandon Miller", "SG",23, 58,81,67,82, 75,41,68,72,76,26, 18,39,79,55,30,50, 82,80,randomPotential(), 2,'SF','USA',206,91,2023,2); // Charlotte
let pl67 = new Player(67, "Mark Williams", "C",24, 67,50,0,71, 65,70,55,54,25,16, 92,86,65,59,70,53, 71,80,randomPotential(), 3,'PF','USA',213,109,2022,15); // Charlotte
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl68 = new Player(68, "Torrey Craig", "SF",35, 53,44,64,71, 63,39,53,70,59,19, 46,51,51,64,50,47, 69,80,randomPotential(), 8,'PF','USA',201,100,0,0); // Chicago Bulls
let pl69 = new Player(69, "Lonzo Ball", "PG",28, 52,55,66,75, 65,42,75,76,76,62, 20,47,56,70,40,72, 82,75,randomPotential(), 6,'SG','USA',198,86,2017,2); // Chicago Bulls
let pl70 = new Player(70, "Jevon Carter", "PG",30, 39,79,68,79, 61,50,66,73,69,37, 14,32,55,58,30,60, 65,81,randomPotential(), 7,'SG','USA',185,90,2018,32); // Chicago Bulls
let pl71 = new Player(71, "Talen Horton-Tucker", "SG",25, 62,32,49,77, 63,59,60,68,72,63, 18,40,66,56,35,69, 70,80,randomPotential(), 6,'PG','USA',193,106,2019,46); // Chicago Bulls
let pl72 = new Player(72, "Josh Giddey", "SF",23, 63,75,59,80, 64,50,69,69,79,71, 42,72,73,56,40,45, 78,80,randomPotential(), 4,'PG','Australia',203,95,2021,6); // Chicago Bulls
let pl73 = new Player(73, "Ayo Dosunmu", "SG",25, 52,81,69,81, 65,42,66,68,69,40, 18,30,60,53,30,53, 77,80,randomPotential(), 4,'PG','USA',196,90,2021,38); // Chicago Bulls
let pl74 = new Player(74, "Jalen Smith", "PF",25, 65,62,69,74, 76,55,59,58,28,17, 74,76,64,51,65,30, 66,80,randomPotential(),  5,'C','USA',208,97,2020,10); // Chicago Bulls
let pl75 = new Player(75, "Matas Buzelis", "SF",21, 63,63,63,68, 74,50,76,60,59,40, 38,57,60,54,59,48, 60,80,randomPotential(), 1,'PF','Lithuania',208,94,2024,11); // Chicago Bulls
let pl76 = new Player(76, "Chris Duarte", "SG",28, 56,43,58,81, 53,49,55,58,65,25, 20,41,60,56,15,55, 69,80,randomPotential(), 4,'SF','Dominican Republic',198,86,2021,13); // Chicago Bulls
let pl77 = new Player(77, "E.J. Liddell", "PF",25, 60,69,56,76, 79,55,63,63,50,28, 39,66,50,53,69,44, 52,80,randomPotential(), 2,'SF','USA',201,108,2022,41); // Chicago Bulls
let pl78 = new Player(78, "Julian Phillips", "SF",22, 49,58,51,70, 70,30,63,68,56,14, 26,26,51,52,35,50, 58,80,randomPotential(), 2,'PF','USA',203,89,2023,35); // Chicago Bulls
let pl79 = new Player(79, "Zach LaVine", "SG",30, 70,80,67,84, 87,39,74,74,78,44, 10,50,80,54,15,45, 82,83,randomPotential(), 11,'SF','USA',196,90,2014,13); // Chicago Bulls
let pl80 = new Player(80, "Adama Sanogo", "C",23, 57,60,49,72, 52,61,60,58,40,18, 70,74,50,46,56,46, 57,80,randomPotential() , 2,'PF','Mali',206,111,0,0); // Chicago Bulls
let pl81 = new Player(81, "Dalen Terry", "SG",23, 51,62,43,61, 59,48,66,66,70,41, 34,44,50,58,45,65, 59,80,randomPotential(), 3,'SF','USA',201,88,2022,18); // Chicago Bulls
let pl82 = new Player(82, "Nikola Vucevic", "C",35, 73,71,54,82, 35,79,52,39,25,35, 58,82,80,51,40,40, 81,77,randomPotential(), 14,'PF','Montenegro',208,117,2011,16); // Chicago Bulls
let pl83 = new Player(83, "Coby White", "PG",25, 56,62,70,83, 71,46,75,75,76,51, 10,40,80,48,10,40, 79,80,randomPotential(), 6,'SG','USA',196,88,2019,7); // Chicago Bulls
let pl84 = new Player(84, "Patrick Williams", "PF",24, 51,69,75,77, 67,54,60,65,60,17, 26,54,55,62,50,53, 77,81,randomPotential(), 5,'SF','USA',201,97,2020,4); // Chicago Bulls
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl85 = new Player(85, "Donovan Mitchell", "SG",29, 65,84,70,86, 87,50,85,80,80,62, 18,43,91,68,30,70, 84,80,randomPotential(), 8,'PG','USA',190,97,2017,13); //Cleveland
let pl86 = new Player(86, "Ty Jerome", "SG",28, 48,77,60,83, 52,46,59,63,76,55, 12,33,60,47,10,55, 67,80,randomPotential(), 6,'PG','USA',196,88,2019,24); //Cleveland
let pl87 = new Player(87, "Evan Mobley", "PF",24, 73,59,47,71, 71,64,62,69,50,38, 52,84,77,77,71,53, 83,80,randomPotential(), 4,'C','USA',211,97,2021,3); //Cleveland
let pl88 = new Player(88, "Jarrett Allen", "C",27, 75,72,27,74, 69,74,65,62,25,31, 74,80,66,68,73,40, 78,82,randomPotential(), 8,'PF','USA',211,110,2017,22); //Cleveland
let pl89 = new Player(89, "Caris LeVert", "SG",31, 64,61,54,74, 70,44,65,67,76,53, 18,40,70,56,25,60, 78,78,randomPotential(), 9,'SF','USA',198,92,2016,20); //Cleveland
let pl90 = new Player(90, "Sam Merrill", "SG",29, 45,71,80,89, 50,34,52,54,66,34, 14,33,65,42,5,40, 64,79,randomPotential(), 5,'PG','USA',193,92,2020,60); //Cleveland
let pl91 = new Player(91, "Dean Wade", "PF",29, 59,60,70,69, 73,50,52,58,50,18, 22,53,50,56,30,55, 69,79,randomPotential(), 6,'SF','USA',206,103,0,0); //Cleveland
let pl92 = new Player(92, "Darius Garland", "PG",25, 49,76,74,86, 74,30,78,78,79,71, 10,23,80,48,5,56, 83,80,randomPotential(), 6,'SG','USA',185,87,2019,5); //Cleveland
let pl93 = new Player(93, "Isaac Okoro", "SF",24, 57,50,66,70, 70,57,67,75,62,22, 24,25,53,66,25,53, 77,82,randomPotential(), 5,'SG','USA',196,102,2020,5); //Cleveland
let pl94 = new Player(94, "Max Strus", "SF",29, 55,75,70,81, 64,30,66,66,59,31, 16,38,64,42,15,40, 75,85,randomPotential(), 6,'SG','USA',196,97,0,0); //Cleveland
let pl95 = new Player(95, "Georges Niang", "PF",32, 55,74,79,86, 62,50,34,45,57,20, 12,44,65,46,15,35, 66,84,randomPotential(), 9,'SF','USA',201,104,2016,50); //Cleveland
let pl96 = new Player(96, "Craig Porter Jr.","PG",25, 51,76,43,73, 62,38,69,69,63,66, 22,49,60,52,45,53, 62,80,randomPotential(), 2,'SG','USA',188,84,0,0); //Cleveland
let pl97 = new Player(97, "Jaylon Tyson", "SG",23, 54,68,56,79, 65,53,70,66,65,37, 21,47,51,47,40,46, 60,80,randomPotential(), 1,'SF','USA',198,97,2024,20); //Cleveland
let pl98 = new Player(98, "JT Thor", "PF",23, 59,62,52,64, 72,40,74,74,50,15, 32,45,49,53,55,35, 62,80,randomPotential(), 4,'C','USA',208,92,2021,37); //Cleveland
let pl99 = new Player(99, "Luke Travers", "SG",24, 46,62,54,68, 65,38,58,56,61,21, 27,33,50,45,46,36, 60,80,randomPotential(), 1,'SF','Australia',203,90,2022,56); //Cleveland
let pl100 = new Player(100, "Tristan Thompson", "C",34, 57,57,25,59, 64,64,53,54,29,14, 88,68,52,53,45,35, 61,90,randomPotential(), 14,'PF','Canada',206,115,2011,4); //Cleveland
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl101 = new Player(101, "Luka Doncic", "PG",26, 80,78,78,78, 69,62,74,74,85,90, 16,81,98,62,25,59, 87,85,randomPotential(), 7,'SG','Slovenia',201,104,2018,3); // LA Lakers
let pl102 = new Player(102, "Kyrie Irving", "SG",33, 58,88,81,90, 70,27,75,75,89,53, 40,44,90,56,25,60, 84,80,randomPotential(), 14,'PG','USA',188,88,2011,1); // Dallas
let pl103 = new Player(103, "Spencer Dinwiddie", "PG",32, 58,42,60,79, 65,35,72,72,78,60, 10,29,59,52,20,45, 77,77,randomPotential(),  11,'SG','USA',196,97,2014,38); // Dallas
let pl104 = new Player(104, "Quentin Grimes", "SG",25, 52,58,67,76, 65,53,76,76,64,23, 16,31,60,59,20,50, 72,80,randomPotential(), 4,'SF','USA',196,92,2021,25); // Dallas
let pl105 = new Player(105, "Klay Thompson", "SF",35, 52,80,81,85, 57,52,61,70,57,26, 12,35,77,64,30,45, 82,94,randomPotential(), 12,'SG','USA',198,97,2011,11); // Dallas
let pl106 = new Player(106, "Dereck Lively II", "C",21, 66,50,0,51, 57,60,40,47,42,19, 78,68,59,60,83,50, 73,80,randomPotential(), 2,'PF','USA',2016,104,2023,12);  // Dallas
let pl107 = new Player(107, "Dante Exum", "PG",30, 49,63,76,76, 67,38,69,72,65,52, 16,41,60,52,15,40, 68,83,randomPotential(), 8,'SG','Australia',196,97,2014,5); // Dallas
let pl108 = new Player(108, "Maxi Kleber", "PF",33, 63,60,58,77, 46,69,45,67,54,28, 36,54,50,66,60,35, 72,80,randomPotential(), 8,'C','Germany',208,108,0,0); // Dallas
let pl109 = new Player(109, "P.J. Washington", "PF",27, 70,69,58,70, 59,58,65,65,60,26, 28,52,65,51,54,53, 80,79,randomPotential(), 6,'SF','USA',201,104,2019,12); // Dallas
let pl110 = new Player(110, "Daniel Gafford", "C",27, 69,55,0,67, 70,63,65,60,25,18, 76,62,66,66,90,51, 69,80,randomPotential(), 6,'PF','USA',208,106,2019,38); // Dallas
let pl111 = new Player(111, "Naji Marshall", "SF",27, 61,70,55,78, 65,50,52,55,64,38, 30,54,60,49,20,60, 69,80,randomPotential(), 5,'PF','USA',201,99,0,0); // Dallas
let pl112 = new Player(112, "Olivier-Maxence Prosper", "PF",23, 54,58,40,66, 78,50,69,71,50,25, 62,57,59,55,20,55, 60,80,randomPotential(), 2,'SF','Canada',203,104,2023,24); // Dallas
let pl113 = new Player(113, "Jaden Hardy", "SG",23, 57,53,69,78, 75,39,73,73,73,40, 14,40,69,43,15,45, 64,80,randomPotential(), 3,'PG','USA',193,89,2022,37); // Dallas
let pl114 = new Player(114, "Dwight Powell", "C",34, 72,55,39,73, 57,70,61,48,50,36, 66,55,53,63,45,56, 68,83,randomPotential(), 11,'PF','Canada',208,108,2014,45); // Dallas
let pl115 = new Player(115, "Brandon Williams", "PG",26, 50,67,47,69, 58,52,69,69,69,51, 22,31,60,46,25,55, 66,81,randomPotential(), 3,'SG','USA',185,86,0,0); // Dallas
let pl116 = new Player(116, "Kessler Edwards", "SF",25, 54,62,62,74, 60,67,62,64,54,20, 32,43,56,59,40,55, 61,80,randomPotential(), 4,'PF','USA',203,97,2021,44); // Dallas
let pl117 = new Player(117, "Cooper Flagg", "SF",19, 64,60,60,84, 80,60,65,65,60,52, 30,65,70,75,65,65, 80,80,randomPotential(), 0,'PF','USA',206,92,2025,1); // updated DAL
// ins/2p/3p/ft/jum/str/spe/qui/dri/pas/ore/dre/oaw/daw/blk/stl/end/inj/pot - experience
let pl118 = new Player(118, "Nikola Jokic", "C",30, 85,84,65,81, 53,86,53,52,66,93, 58,96,97,68,45,58, 81,83,randomPotential(),  10,'PF','Serbia',211,128,2014,41); // Denver
let pl119 = new Player(119, "Aaron Gordon", "PF",30, 75,60,62,68, 82,62,61,76,52,41, 54,56,73,64,40,45, 79,84,randomPotential(), 11,'SF','USA',203,106,2014,4); // Denver
let pl120 = new Player(120, "Michael Porter Jr.", "SF",27, 63,80,75,78, 78,58,70,71,68,17, 32,63,80,49,35,40, 78,66,randomPotential(), 6,'PF','USA',208,98,2018,14); // Denver
let pl121 = new Player(121, "Julian Strawther", "SG",23, 51,57,65,80, 54,43,53,60,64,30, 8,37,69,55,25,55, 65,80,randomPotential(), 2,'SF','USA',201,92,2023,29); // Denver
let pl122 = new Player(122, "Russell Westbrook","PG",37, 58,60,47,68, 80,65,79,79,76,72, 44,59,70,57,25,67, 83,92,randomPotential(), 17,'SG','USA',193,90,2008,4); // Denver
let pl123 = new Player(123, "Dario Saric", "PF",31, 67,61,69,83, 50,55,53,59,59,40, 44,63,69,58,15,50, 72,81,randomPotential(), 8,'C','Croatia',208,102,2014,12); // Denver
let pl124 = new Player(124, "Christian Braun", "SG",24, 51,67,67,71, 73,46,73,73,59,29, 34,49,65,61,40,56, 70,80,randomPotential(), 3,'SF','USA',198,98,2022,21); // Denver
let pl125 = new Player(125, "DaRon Holmes", "PF",23, 64,66,55,70, 54,50,65,59,50,21, 60,68,50,61,70,50, 60,80,randomPotential(), 1,'C','USA',208,102,2024,22); // Denver
let pl126 = new Player(126, "Jamal Murray", "PG",28, 60,83,80,85, 70,44,70,70,79,74, 18,39,84,55,40,53, 81,78,randomPotential(),  8,'SG','Canada',193,97,2016,7); // Denver
let pl127 = new Player(127, "DeAndre Jordan", "C",37, 51,25,0,47, 73,75,55,52,20,13, 74,92,54,55,65,35, 75,94,randomPotential(), 17,'C','USA',211,120,2008,35); // Denver
let pl128 = new Player(128, "Zeke Nnaji", "PF",24, 67,66,49,65, 72,60,67,67,27,20, 76,41,56,51,84,45, 61,83,randomPotential(), 5,'C','USA',206,108,2020,22); // Denver
let pl129 = new Player(129, "Hunter Tyson", "PF",25, 54,66,54,80, 67,42,58,58,58,18, 30,53,53,47,35,35, 60,80,randomPotential(), 2,'SF','USA',203,97,2023,37); // Denver
let pl130 = new Player(130, "Jalen Pickett", "SG",26, 53,58,70,76, 57,49,62,62,65,69, 8,41,63,49,20,40, 60,79,randomPotential(), 2,'PG','USA',193,94,2023,32); // Denver
let pl131 = new Player(131, "Peyton Watson", "SF",23, 53,70,55,69, 72,45,67,70,60,22, 28,49,60,69,80,55, 68,80,randomPotential(), 3,'SG','USA',203,90,2022,30); // Denver
let pl132 = new Player(132, "Vlatko Cancar", "PF",28, 50,60,62,84, 60,53,50,64,54,32, 26,44,56,54,30,45, 60,80,randomPotential(), 5,'SF','Slovenia',203,107,2017,49); // Denver
let pl133 = new Player(133, "PJ Hall", "C",23, 60,62,51,78, 72,60,63,42,50,17, 42,50,50,47,50,40, 60,80,randomPotential(), 1,'PF','USA',203,111,0,0); // Denver
let pl134 = new Player(134, "Trey Alexander", "SG",22, 40,68,54,82, 57,34,68,65,63,44, 24,36,50,41,30,41, 60,80,randomPotential(), 1,'PG','USA',193,83,0,0); // Denver
// ins/2p/3p/ft/jum/str/spe/qui/dri/pas/ore/dre/oaw/daw/blk/stl/end/inj/pot
let pl135 = new Player(135, "Malik Beasley", "SG",29, 57,87,74,78, 69,45,65,65,69,21, 12,37,77,44,10,50, 73,84,randomPotential(), 9,'SF','USA',193,84,2016,19); //Detroit
let pl136 = new Player(136, "Cade Cunningham", "PG",24, 67,84,53,85, 70,52,73,73,76,81, 16,48,84,59,30,55, 83,80,randomPotential(), 4,'SG','USA',198,98,2021,1); //Detroit
let pl137 = new Player(137, "Ausar Thompson", "SF",22, 54,53,39,60, 88,40,84,80,73,41, 60,60,65,74,56,85, 73,80,randomPotential(), 2,'PF','USA',200,100,0,0); //Detroit
let pl138 = new Player(138, "Jaden Ivey", "SG",23, 58,73,66,74, 75,44,81,81,76,54, 26,31,77,56,35,45, 80,80,randomPotential(), 3,'PG','USA',193,88,2022,5);//Detroit
let pl139 = new Player(139, "Isaiah Stewart", "PF",24, 69,66,64,73, 60,76,53,61,24,18, 68,71,56,51,60,30, 75,77,randomPotential(), 5,'C','USA',203,113,2020,16);//Detroit
let pl140 = new Player(140, "Jalen Duren", "C",22, 72,45,0,69, 74,71,63,63,49,30, 88,93,65,56,56,40, 76,80,randomPotential(), 3,'PF','USA',208,113,2022,13);//Detroit
let pl141 = new Player(141, "Cory Joseph", "PG",32, 60,69,58,78,48,40,70,70,72,59,16,34,53,50,20,55,70,90,randomPotential(), 3,'PF','USA',200,100,0,0);
let pl142 = new Player(142, "Tim Hardaway Jr.", "SG",33, 53,72,66,81, 68,45,58,65,68,24, 8,39,74,44,10,40, 77,83,randomPotential(), 12,'SF','USA',196,92,2013,24);//Detroit
let pl143 = new Player(143, "Hamidou Diallo", "SG",25, 62,59,45,62,85,48,78,78,64,31,38,55,65,51,25,66,65,86,randomPotential(), 3,'PF','USA',200,100,0,0);
let pl144 = new Player(144, "Kevin Knox", "SF",24, 50,49,56,70,60,59,72,72,60,25,20,46,59,47,25,35,65,88,randomPotential(), 3,'PF','USA',200,100,0,0);
let pl145 = new Player(145, "Isaiah Livers", "PF",25, 48,56,62,82,55,48,69,69,58,38,35,46,53,47,30,54,68,85,randomPotential(), 3,'PF','USA',200,100,0,0);
let pl146 = new Player(146, "Rodney McGruder", "SG",32, 63,57,60,65,55,45,68,65,60,33,30,37,49,55,15,45,67,84,randomPotential(), 3,'PF','USA',200,100,0,0);
let pl147 = new Player(147, "Buddy Boeheim", "PG",24, 54,63,64,80,53,44,55,55,54,51,25,37,50,40,46,32,60,90,randomPotential(), 3,'PF','USA',200,100,0,0);
let pl148 = new Player(148, "Tobias Harris", "PF",33, 71,75,63,87, 69,63,65,57,69,33, 22,59,65,53,30,53, 81,82,randomPotential(), 14,'SF','USA',203,102,2011,19);//Detroit
let pl149 = new Player(149, "Alec Burks", "SG",32, 54,61,66,79, 53,45,73,73,65,42, 18,46,66,52,72,88, 79,85,randomPotential(), 3,'PF','USA',200,100,0,0);
let pl150 = new Player(150, "Marvin Bagley III", "PF",24, 68,66,49,66,65,68,70,71,52,23,70,71,77,47,50,35,75,83,randomPotential(), 3,'PF','USA',200,100,0,0);
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot
let pl151 = new Player(151, "Stephen Curry", "PG",37, 53,80,90,92, 63,38,74,74,87,60, 12,44,97,55,20,40, 84,86,randomPotential(),  16,'SG','USA',188,83,2009,7); // Golden State
let pl152 = new Player(152, "Andrew Wiggins", "SF",30, 65,66,69,77, 87,47,72,72,69,24, 40,40,77,58,40,50, 83,83,randomPotential(), 11,'PF','USA',201,89,2014,1); // Golden State
let pl153 = new Player(153, "Trayce Jackson-Davis", "PF",25, 65,60,10,58, 78,53,69,69,56,31, 82,68,67,51,83,45, 67,80,randomPotential(), 2,'C','USA',206,111,2023,57); // Golden State
let pl154 = new Player(154, "Brandin Podziemski", "SG",22, 56,59,60,73, 68,44,72,72,70,50, 44,57,58,49,15,56, 75,80,randomPotential(), 2,'PG','USA',196,92,2023,19); // Golden State
let pl155 = new Player(155, "Kyle Anderson", "PF",32, 49,60,56,71, 56,52,56,70,71,67, 26,59,55,69,50,60, 71,83,randomPotential(), 11,'SF','USA',206,104,2014,30); // Golden State
let pl156 = new Player(156, "Draymond Green", "PF",35, 57,51,52,71, 56,75,63,72,68,71, 28,74,51,76,53,59, 78,88,randomPotential(), 13,'SF','USA',198,104,2012,35); // Golden State
let pl157 = new Player(157, "Kevon Looney", "C",29, 59,58,46,60, 53,64,48,59,51,40, 86,83,55,59,50,53, 67,84,randomPotential(), 10,'PF','USA',206,100,2015,30); // Golden State
let pl158 = new Player(158, "Gary Payton II", "SG",33, 54,55,56,60, 75,40,71,73,68,30, 48,46,58,78,50,85, 64,83,randomPotential(), 9,'PG','USA',188,86,0,0); // Golden State
let pl159 = new Player(159, "Buddy Hield", "SG",33, 50,60,78,86, 68,40,65,68,69,39, 20,43,77,50,35,56, 78,82,randomPotential(), 9,'SF','Bahamas',193,99,2016,6); // Golden State
let pl160 = new Player(160, "Moses Moody", "SG",23, 56,64,69,75, 60,58,63,67,64,18, 40,41,66,56,35,60, 64,80,randomPotential(), 4,'SF','USA',196,92,2021,14); // Golden State
let pl161 = new Player(161, "Jonathan Kuminga", "PF",23, 65,70,54,70, 80,63,74,74,57,28, 34,48,75,57,35,50, 71,80,randomPotential(), 4,'SF','Democratic Republic of the Congo ',203,95,2021,7); // Golden State
let pl162 = new Player(162, "Lindy Waters III", "SG",28, 46,73,70,80, 57,33,50,59,59,31, 18,44,64,51,40,50, 63,80,randomPotential(), 4,'SF','USA',198,97,0,0); // Golden State
let pl163 = new Player(163, "Gui Santos", "PF",23, 53,59,71,82, 64,40,63,62,52,35, 46,53,60,55,25,55, 60,86,randomPotential(), 2,'SF','Brazil',203,94,2022,55); // Golden State
let pl164 = new Player(164, "Quinten Post", "C",25, 56,64,62,81, 40,56,47,43,33,20, 60,63,50,45,60,40, 60,80,randomPotential(), 1,'PF','Netherlands',213,107,2024,52); // Golden State
let pl165 = new Player(165, "Pat Spencer", "PG",29, 53,68,69,80, 73,44,65,65,63,64, 25,40,55,40,45,42, 60,84,randomPotential(),  2,'SG','USA',200,100,0,0); // Golden State
let pl166 = new Player(166, "Dennis Schroder", "PG",32, 44,76,67,83, 64,36,74,78,76,71, 12,29,66,50,10,45, 77,80,randomPotential(), 12,'SG','Germany',185,78,2013,17); // Golden State
// ins/2p/3p/ft/jum/str/spe/qui/dri/pas/ore/dre/oaw/daw/blk/stl/end/inj/pot
//new Player(3, "Clint Capela", "C",31, 70,40,0,63, 60,75,50,48,38,17, 96,84,64,71,80,45, 76,83,0,  11, "PF",'Switzerland',208,108,2014,25); // Houston
let pl167 = new Player(167, "Jalen Green","SG",23, 66,73,63,80, 82,45,78,78,76,40, 12,53,82,52,20,45, 82,80,randomPotential(), 4,'PG','USA',193,80,2021,2); // Houston
let pl168 = new Player(168, "Fred VanVleet","PG",31, 44,66,67,86, 65,42,73,73,76,80, 10,35,70,62,25,53, 81,82,randomPotential(), 9,'SG','USA',183,89,0,0); // Houston
let pl169 = new Player(169, "Jabari Smith","PF",22, 70,70,60,80, 65,50,66,66,65,16, 42,71,65,56,50,40, 81,80,randomPotential(), 3,'C','USA',211,99,2022,3); // Houston
let pl170 = new Player(170, "Tari Eason","PF",24, 57,79,56,73, 70,60,70,70,60,24, 76,65,69,73,60,86, 71,80,randomPotential(), 3,'SF','USA',203,97,2022,17); // Houston
let pl171 = new Player(171, "Amen Thompson","SF",22, 60,61,30,69, 89,40,85,80,76,42, 76,68,66,66,55,80, 73,80,randomPotential(), 2,'SG','USA',201,94,2023,4); // Houston
let pl172 = new Player(172, "Dillon Brooks","SF",29, 61,69,64,80, 65,55,65,81,64,25, 18,31,68,68,15,53, 79,85,randomPotential(), 8,'PF','Canada',198,102,2017,45); // Houston
let pl173 = new Player(173, "Cam Whitmore","SG",21, 58,73,63,67, 74,58,74,74,76,14, 36,54,81,51,35,56, 67,80,randomPotential(), 2,'PF','USA',201,105,2023,20); // Houston
let pl174 = new Player(174, "Jock Landale","C",30, 65,65,38,76, 65,54,44,44,42,31, 82,50,60,51,62,45, 62,80,randomPotential(), 4,'PF','Australia',211,116,0,0); // Houston
let pl175 = new Player(175, "Alperen Sengun","C",23, 75,70,38,69, 59,76,42,54,52,55, 62,71,83,60,54,59, 77,80,randomPotential(),  4,'PF','Turkey',211,106,2021,16); // Houston
let pl176 = new Player(176, "Steven Adams","C",32, 65,55,10,53, 58,79,48,53,25,21, 88,71,53,59,59,55, 76,82,randomPotential(), 11,'PF','USA',211,120,2013,12); // Houston
let pl177 = new Player(177, "Aaron Holiday","PG",29, 43,64,74,85, 46,40,66,67,76,45, 30,29,64,49,20,59, 66,84,randomPotential(), 7,'SG','USA',183,83,2018,23); // Houston
let pl178 = new Player(178, "Reed Sheppard","SG",21, 48,69,74,83, 77,46,80,79,66,55, 15,32,62,61,27,68, 73,80,randomPotential(), 1,'PG','USA',188,83,2024,3); // Houston
// ins/2p/3p/ft/jum/str/spe/qui/dri/pas/ore/dre/oaw/daw/blk/stl/end/inj/pot
let pl179 = new Player(179, "Tyrese Haliburton","PG",25, 59,87,72,85, 60,49,73,73,82,96, 12,38,85,63,40,65, 82,80,randomPotential(), 5,'SG','USA',196,83,2020,12); // Indiana
let pl180 = new Player(180, "Bennedict Mathurin","SG",23, 61,74,63,82, 72,44,74,74,69,25, 28,41,78,47,10,40, 77,80,randomPotential(), 3,'SF','USA',198,85,2022,6); // Indiana
let pl181 = new Player(181, "Pascal Siakam","PF",31, 78,75,56,76, 69,60,66,68,69,46, 38,59,85,66,35,50, 81,82,randomPotential(), 9,'SF','Cameroon',203,104,2016,27); // Indiana
let pl182 = new Player(182, "T.J. McConnell","PG",33, 43,82,64,77, 55,40,66,72,69,85, 20,43,70,67,10,80, 71,83,randomPotential(), 10,'SG','USA',185,86,0,0); // Indiana
let pl183 = new Player(183, "Jarace Walker","PF",22, 62,70,70,67, 80,70,71,71,52,42, 26,57,63,63,56,80, 64,80,randomPotential(), 2,'SF','USA',203,108,2023,8); // Indiana
let pl184 = new Player(184, "Isaiah Jackson","PF",23, 63,59,20,67, 71,55,63,63,49,17, 82,62,67,59,89,62, 65,80,randomPotential(), 4,'C','USA',208,93,2021,22); // Indiana
let pl185 = new Player(185, "Andrew Nembhard","SG",25, 51,56,60,80, 61,40,66,71,69,60, 16,27,63,60,10,60, 76,80,randomPotential(), 3,'PG','Canada',196,87,2022,31); // Indiana
let pl186 = new Player(186, "James Wiseman","C",24, 66,57,26,68, 58,60,60,60,56,14, 72,75,67,55,60,20, 68,87,randomPotential(), 4,'PF','USA',213,108,2020,2); // Indiana
let pl187 = new Player(187, "Ben Sheppard","SG",24, 51,68,67,90, 65,44,74,74,63,23, 18,34,55,60,25,58, 66,80,randomPotential(), 2,'SF','USA',198,86,2023,26); // Indiana
let pl188 = new Player(188, "Aaron Nesmith","SF",26, 57,76,75,80, 69,42,68,66,60,18, 24,43,69,59,45,56, 70,81,randomPotential(), 5,'SG','USA',196,97,2020,14); // Indiana
let pl189 = new Player(189, "Quenton Jackson","PG",27, 48,58,55,75, 78,40,75,75,61,43, 22,24,64,58,25,60, 63,79,randomPotential(), 3,'SG','USA',196,79,0,0); // Indiana
let pl190 = new Player(190, "Thomas Bryant","C",28, 67,59,60,77, 42,70,52,47,43,20, 66,82,65,52,65,40, 68,82,randomPotential(), 8,'PF','USA',208,112,2017,42); // Indiana
let pl191 = new Player(191, "Myles Turner","C",29, 72,83,59,77, 59,70,46,56,25,17, 40,73,75,70,85,45, 78,83,randomPotential(), 10,'PF','USA',211,113,2015,11); // Indiana
let pl192 = new Player(192, "James Johnson","PF",38, 63,50,48,67, 62,70,57,64,64,39, 28,49,56,67,50,45, 69,83,randomPotential(), 16,'SF','USA',201,108,2009,16); // Indiana
let pl193 = new Player(193, "Obi Toppin","PF",27, 72,66,65,77, 80,64,60,59,50,27, 36,53,73,47,45,50, 66,88,randomPotential(), 5,'SF','USA',206,99,2020,8); // Indiana
let pl194 = new Player(194, "Johnny Furphy","SG",21, 55,67,64,77, 67,44,69,53,49,15, 42,36,50,50,57,56, 60,80,randomPotential(), 1,'SF','Australia',203,90,2024,35); // Indiana
let pl195 = new Player(195, "Enrique Freeman","PF",25, 60,56,46,67, 71,50,64,64,52,19, 26,45,50,53,45,35, 60,80,randomPotential(), 1,'SF','USA',201,93,2024,50); // Indiana
// FINISHED UPDATING AGES + EXPERIENCE HERE
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl196 = new Player(196, "Norman Powell","SG",32, 52,75,80,82, 70,36,69,73,69,23, 10,35,82,58,20,50, 73,82,randomPotential(), 10,'SF','USA',190,97,2015,46); // Clippers
let pl197 = new Player(197, "Bones Hyland", "SG",25, 54,55,60,78, 58,32,77,77,69,62, 10,42,75,46,25,64, 68,80,randomPotential(), 4,'SG','USA',188,78,2021,26); // Clippers
let pl198 = new Player(198, "Ivica Zubac","C",28, 72,64,10,72, 65,70,26,35,25,19, 78,86,67,50,72,25, 71,80,randomPotential(), 9,'PF','Bosnia and Herzegovina',213,108,2016,32); // Clippers
let pl199 = new Player(199, "Amir Coffey","SG",28, 51,72,66,81, 65,42,65,65,65,24, 14,32,58,50,15,45, 67,79,randomPotential(), 6,'SF','USA',201,95,0,0); // Clippers
let pl200 = new Player(200, "Terance Mann","SG",29, 57,53,63,79, 69,40,61,63,69,31, 34,43,59,48,20,40, 72,80,randomPotential(), 6,'SF','USA',196,97,2019,48); // Clippers
let pl201 = new Player(201, "Nicolas Batum","PF",37, 54,69,74,71, 70,55,58,65,61,40, 32,42,50,56,45,55, 75,83,randomPotential(), 17,'SF','France',203,104,2008,25); // Clippers
let pl202 = new Player(202, "Kris Dunn","SG",31, 49,69,63,72, 73,46,73,73,76,65, 16,44,55,68,35,84, 73,84,randomPotential(), 9,'SF','USA',190,92,2016,5); // Clippers
let pl203 = new Player(203, "Kevin Porter Jr.","SG",25, 59,75,65,72, 65,42,75,65,72,60, 20,42,78,49,20,60, 79,80,randomPotential(), 5,'PG','USA',193,92,2019,30); // Clippers
let pl204 = new Player(204, "Derrick Jones Jr.","SF",28, 66,58,52,70, 83,49,67,69,58,15, 44,38,59,63,56,56, 69,78,randomPotential(), 9,'PF','USA',196,95,0,0); // Clippers
let pl205 = new Player(205, "Mo Bamba","C",27, 62,55,64,68, 65,58,65,54,36,20, 74,83,59,61,89,40, 67,81,randomPotential(), 7,'PF','USA',213,104,2018,6); // Clippers
let pl206 = new Player(206, "Kai Jones","C",24, 48,59,21,67, 59,55,56,56,25,13, 48,55,53,65,80,55, 60,80,randomPotential(), 3,'PF','USA',211,98,2021,19); // Clippers
let pl207 = new Player(207, "James Harden","PG",36, 70,71,74,87, 70,61,75,75,85,90, 12,50,80,58,40,55, 84,95,randomPotential(),  16,'SG','USA',196,99,2009,3); // Clippers
let pl208 = new Player(208, "Jordan Miller","SF",25, 52,60,52,86, 71,42,74,68,59,12, 54,25,60,50,40,50, 60,80,randomPotential(), 2,'SG','USA',201,88,2023,48); // Clippers
let pl209 = new Player(209, "Kawhi Leonard","SF",34, 75,80,79,87, 69,69,74,80,76,36, 26,52,90,78,45,70, 81,80,randomPotential(),  13,'PF','USA',201,102,2011,15); // Clippers
let pl210 = new Player(210, "Cam Christie","SG",20, 49,69,60,79, 67,42,77,72,60,31, 22,38,55,43,30,39, 60,80,randomPotential(), 1,'PG','USA',196,86,2024,46); // Clippers
let pl211 = new Player(211, "Trentyn Flowers","SF",20, 56,61,55,64, 82,42,73,65,59,24, 28,44,50,46,37,57, 60,80,randomPotential(), 1,'PF','USA',201,83,0,0); // Clippers
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl212 = new Player(212, "LeBron James", "SF", 41, 80,68,75,73,79,79,82,82,82,85,18,56,98,70,30,59,90,87,randomPotential(), 22, "PF",'USA',206,113,2003,1); //Lakers
let pl213 = new Player(213, "Anthony Davis","C", 32, 80,69,29,82,76,82,74,73,65,35,64,90,95,84,87,58,85,80,randomPotential(), 13, "PF",'USA',208,114,2012,1); //Dallas
let pl214 = new Player(214, "D'Angelo Russell","PG", 29, 60,71,83,80,61,44,76,76,80,70,8,30,79,50,25,50,80,83,randomPotential(), 10, "SG",'USA',190,87,2015,2); //Lakers
let pl215 = new Player(215, "Christian Wood", "PF",30, 75,61,50,70,56,64,52,46,50,20,36,87,70,54,59,40,73,81,randomPotential(), 9, "C",'USA',203,97,0,0); //Lakers
let pl216 = new Player(216, "Jarred Vanderbilt", "PF", 26, 55,59,29,66,70,60,65,73,55,22,60,73,50,78,40,82,70,78,randomPotential(), 7, "C",'USA',203,97,2018,41); //Lakers
let pl217 = new Player(217, "Gabe Vincent", "PG", 29, 45,83,69,84, 56,30,68,68,70,35, 30,23,54,49,5,59, 70,82,randomPotential(), 6, "SG",'USA',190,88,0,0); //Lakers
let pl218 = new Player(218, "Jaxson Hayes", "C", 25, 68,58,26,62, 65,62,50,58,30,24, 56,58,56,62,54,58, 66,80,randomPotential(), 6, "PF",'USA',213,99,2019,8); //Lakers
let pl219 = new Player(219, "Rui Hachimura", "PF", 27, 70,75,72,74, 70,69,62,64,62,26, 22,47,74,50,25,40, 76,80,randomPotential(), 6, "SF",'Japan',203,104,2019,9); //Lakers
let pl220 = new Player(220, "Cam Reddish", "SF", 26, 58,50,66,83, 74,42,75,75,71,28, 20,33,57,65,25,67, 73,80,randomPotential(), 6, "SG",'USA',203,98,2019,10); //Lakers
let pl221 = new Player(221, "Jordan Goodwin", "PG", 26, 46,61,50,75, 45,40,65,66,68,56, 48,64,54,60,35,64, 67,80,randomPotential(), 4, "SG",'USA',190,90,0,0); //Lakers
let pl222 = new Player(222, "Austin Reaves", "SG", 27, 57,73,69,85, 70,40,73,73,63,62, 16,40,73,53,15,45, 78,80,randomPotential(), 4, "PG",'USA',196,93,0,0); //Lakers
let pl223 = new Player(223, "Max Christie", "SG", 22, 55,70,67,78, 72,45,77,77,60,23, 12,48,52,52,30,40, 64,80,randomPotential(), 3, "SF",'USA',198,86,2022,35); //Lakers
let pl224 = new Player(224, "Bronny James", "SG", 20, 51,53,59,68, 80,50,77,77,60,40, 22,40,55,60,40,55, 70,90,randomPotential(), 1, "PG",'USA',188,95,2024,55); //Lakers
let pl225 = new Player(225, "Jalen Hood-Schifino", "SG", 22, 55,69,53,70, 62,38,69,69,72,46, 14,36,55,50,35,50, 55,80,randomPotential(), 2, "PG",'USA',198,97,2023,17); //Lakers
let pl226 = new Player(226, "Maxwell Lewis", "SF", 23, 46,60,57,67, 65,34,57,65,60,21, 20,30,46,46,31,33, 53,80,randomPotential(), 2, "SG",'USA',201,88,2023,40); //Lakers
let pl227 = new Player(227, "Dalton Knecht", "SF", 24, 58,69,70,77, 67,40,76,49,58,30, 20,40,75,45,30,35, 60,80,randomPotential(), 1, "SG",'USA',196,98,2024,17); //Lakers
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl228 = new Player(228, 'Ja Morant','PG',26, 67,80,51,76, 87,42,85,85,86,83, 22,50,90,62,30,53, 82,80,randomPotential(), 6,'SG','USA',188,78,2019,2); //Memphis
let pl229 = new Player(229, 'Jaren Jackson Jr.','C',26, 75,58,58,80, 65,72,53,70,50,26, 34,53,84,76,80,55, 78,94,randomPotential(), 7,'PF','USA',208,109,2018,4); //Memphis
let pl230 = new Player(230, 'Desmond Bane','SG',27, 60,75,81,87, 68,46,64,70,72,57, 18,44,85,62,25,53, 79,78,randomPotential(), 5,'SF','USA',196,97,2020,30); //Memphis
let pl231 = new Player(231, 'GG Jackson II','SF',21, 65,60,65,75, 72,52,72,69,52,17, 30,42,70,50,35,40, 75,80,randomPotential(), 2,'PF','USA',206,97,2023,45); //Memphis
let pl232 = new Player(232, 'Brandon Clarke','PF',29, 66,76,28,69, 70,54,74,73,59,24, 70,64,68,68,66,59, 71,80,randomPotential(), 6,'C','Canada',203,97,2019,21); //Memphis
let pl233 = new Player(233, "Marcus Smart", "PG",31, 45,80,51,76, 70,63,65,83,64,56, 16,30,59,77,20,80, 80,83,randomPotential(), 11,'SG','USA',190,99,2014,6); //Memphis
let pl234 = new Player(234, 'Luke Kennard','SG',29, 47,70,90,88, 50,30,59,58,68,59, 16,40,65,38,5,40, 73,80,randomPotential(), 8,'PG','USA',196,93,2017,12); //Memphis
let pl235 = new Player(235, 'Santi Aldama','PF',24, 64,66,64,69, 49,60,49,50,32,31, 38,62,60,56,56,50, 71,79,randomPotential(), 4,'SF','Spain',211,101,2021,30); //Memphis
let pl236 = new Player(236, 'Zach Edey','C',23, 70,50,30,70, 56,65,36,21,29,20, 69,75,60,52,72,33, 68,80,randomPotential(), 1,'PF','Canada',224,137,2024,9); //Memphis
let pl237 = new Player(237, 'Jaylen Wells','SF',22, 48,62,69,81, 57,50,76,65,65,24, 24,40,52,39,30,33, 65,80,randomPotential(), 1,'SG','USA',203,92,2024,39); //Memphis
let pl238 = new Player(238, 'Vince Williams Jr.','SG',25, 51,50,65,80, 60,42,58,72,60,44, 30,58,59,64,45,56, 73,80,randomPotential(), 3,'SF','USA',193,92,2022,47); //Memphis
let pl239 = new Player(239, 'Jake LaRavia','PF',24, 61,66,54,82, 62,52,49,59,58,26, 46,34,60,50,25,59, 67,80,randomPotential(), 3,'SF','USA',203,106,2022,19); //Memphis
let pl240 = new Player(240, 'Scotty Pippen Jr.','PG',25, 45,68,70,74, 69,29,72,72,69,67, 30,31,64,52,35,85, 70,80,randomPotential(), 3,'SG','USA',185,83,0,0); //Memphis
let pl241 = new Player(241, 'John Konchar','SF',29, 49,66,66,80, 60,30,52,59,66,34, 44,57,45,54,60,66, 68,84,randomPotential(), 6,'SG','USA',196,95,0,0); //Memphis
let pl242 = new Player(242, 'Jay Huff','C',27, 57,62,64,75, 52,52,38,37,33,15, 40,66,56,47,66,53, 55,77,randomPotential(), 4,'PF','USA',216,108,0,0); //Memphis
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl243 = new Player(243,'Jimmy Butler','PF',36, 76,71,65,85, 72,66,74,82,76,53, 38,38,82,76,20,70, 83,81,randomPotential(), 14,'SF','USA',201,104,2011,30); // Miami Heat
let pl244 = new Player(244,'Bam Adebayo','C',28, 76,60,35,75, 76,75,64,74,59,41, 48,86,78,83,53,55, 80,90,randomPotential(),  8,'PF','USA',206,115,2017,14); // Miami Heat
let pl245 = new Player(245,'Tyler Herro','SG',25, 58,70,73,87, 62,49,69,68,73,48, 10,52,82,46,5,40, 81,80,randomPotential(),  6,'PG','USA',196,88,2019,13); // Miami Heat
let pl246 = new Player(246,'Terry Rozier', "PG",31, 61,80,65,86, 74,52,72,72,78,60, 16,37,79,52,20,53, 83,82,randomPotential(), 10,'SG','USA',185,86,2015,16); // Miami Heat
let pl247 = new Player(247,'Jaime Jaquez Jr.','SF',24, 61,74,52,81, 72,58,57,65,63,33, 28,35,65,61,15,59, 78,80,randomPotential(), 2,'SG','USA',198,102,2023,18); // Miami Heat
let pl248 = new Player(248,'Duncan Robinson','SF',31, 51,75,76,88, 62,25,49,55,62,36, 6,30,70,40,15,45, 76,83,randomPotential(), 7,'SG','USA',201,97,0,0); // Miami Heat
let pl249 = new Player(249,'Kevin Love','PF',37, 68,63,60,82, 60,72,56,44,42,40, 46,90,68,51,20,35, 79,77,randomPotential(), 17,'C','USA',203,113,2008,5); // Miami Heat
let pl250 = new Player(250,'Nikola Jovic','PF',22, 56,60,66,77, 62,34,58,58,60,36, 22,67,60,49,30,50, 68,80,randomPotential(), 3,'C','Serbia',208,94,2022,27); // Miami Heat
let pl251 = new Player(251,'Alec Burks','SG',34, 60,65,68,86, 59,38,68,68,69,32, 14,40,70,52,15,50, 72,85,randomPotential(), 14,'SF','USA',198,97,2011,12); // Miami Heat
let pl252 = new Player(252,'Josh Richardson','SG',32, 50,72,58,90, 62,47,70,71,68,34, 18,34,59,63,25,56, 78,83,randomPotential(), 10,'PG','USA',196,90,2015,40); // Miami Heat
let pl253 = new Player(253,'Haywood Highsmith','SF',29, 51,60,74,63, 69,40,60,71,60,17, 36,41,51,69,55,40, 68,86,randomPotential(), 5,'PF','USA',201,99,0,0); // Miami Heat
let pl254 = new Player(254,'Pelle Larsson','SG',24, 51,68,71,76, 69,45,77,70,52,33, 16,32,51,48,25,59, 60,80,randomPotential(), 1,'SF','Sweden',196,97,2024,44); // Miami Heat
let pl255 = new Player(255,'Keshad Johnson','SF',24, 56,60,55,70, 79,55,82,70,55,17, 38,37,55,46,46,50, 60,80,randomPotential(), 1,'PF','USA',198,102,0,0); // Miami Heat
let pl256 = new Player(256,'Dru Smith','SG',28, 45,64,56,84, 52,33,60,60,66,43, 22,43,51,57,56,86, 61,80,randomPotential(), 3,'PG','USA',190,92,0,0); // Miami Heat
let pl257 = new Player(257,"Kel'el Ware",'C',21, 65,61,53,63, 80,49,56,58,42,19, 49,65,56,45,68,40, 60,80,randomPotential(), 1,'PF','USA',213,104,2024,15); // Miami Heat
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl258 = new Player(258,'Giannis Antetokounmpo','PF',31, 83,62,48,67, 75,84,79,76,77,67, 54,90,97,82,55,60, 82,91,randomPotential(), 12,'SF','Greece',211,109,2013,15); // Milwaukee
let pl259 = new Player(259,'Damian Lillard','PG',35, 58,78,70,92, 79,53,77,77,85,70, 10,40,94,51,15,50, 86,98,randomPotential(),  13,'SG','USA',188,88,2012,6); // Milwaukee
let pl260 = new Player(260,'Khris Middleton','SF',34, 67,87,69,83, 56,63,61,74,67,71, 20,53,80,65,20,54, 81,90,randomPotential(),  13,'SG','USA',201,100,2012,39); // Milwaukee
let pl261 = new Player(261,'Brook Lopez','C',37, 70,84,63,81, 50,79,25,50,25,19, 48,50,64,70,88,35, 80,79,randomPotential(), 17,'PF','USA',216,127,2008,10); // Milwaukee
let pl262 = new Player(262,'Gary Trent Jr.','SG',26, 58,66,72,77, 80,48,75,75,69,21, 10,29,70,47,10,59, 78,82,randomPotential(), 7,'SF','USA',196,94,2018,37); // Milwaukee
let pl263 = new Player(263,'Anzejs Pasecniks','C',30, 60,57,40,58, 37,58,35,42,22,15, 70,53,59,50,66,36, 65,80,randomPotential(), 3,'PF','Latvia',216,103,2017,25); // Milwaukee
let pl264 = new Player(264,'Bobby Portis','PF',30, 73,75,68,79, 54,70,55,54,42,20, 60,83,80,55,30,50, 72,84,randomPotential(), 10,'C','USA',208,113,2015,22); // Milwaukee
let pl265 = new Player(265,'Taurean Prince','SF',31, 58,59,67,81, 74,50,70,68,60,25, 10,36,65,58,30,54, 74,81,randomPotential(), 9,'PF','USA',198,98,2016,12); // Milwaukee
let pl266 = new Player(266,'Delon Wright','PG',33, 46,58,55,80, 59,48,63,74,76,58, 28,40,51,70,30,91, 70,84,randomPotential(), 10,'SG','USA',196,83,2015,20); // Milwaukee
let pl267 = new Player(267,'Pat Connaughton','SG',32, 52,59,55,75, 80,35,67,68,68,35, 26,51,53,55,25,45, 69,83,randomPotential(), 10,'SF','USA',196,94,2015,41); // Milwaukee
let pl268 = new Player(268,'MarJon Beauchamp','SF',25, 50,71,60,70, 72,42,66,66,60,18, 34,46,63,50,20,45, 63,80,randomPotential(), 3,'SG','USA',198,90,2022,24); // Milwaukee
let pl269 = new Player(269,'Andre Jackson Jr.','SG',24, 51,58,60,72, 74,40,77,77,59,31, 54,44,47,58,20,50, 60,80,randomPotential(), 2,'SF','USA',198,95,2023,36); // Milwaukee
let pl270 = new Player(270,'A.J. Green','SG',26, 44,70,82,88, 65,32,59,59,60,19, 10,34,69,42,5,35, 61,80,randomPotential(), 3,'SF','USA',193,90,0,0); // Milwaukee
let pl271 = new Player(271,'Ryan Rollins','PG',23, 53,66,63,79, 70,29,76,76,68,50, 26,37,55,47,41,56, 60,80,randomPotential(), 3,'SG','USA',193,81,2022,44); // Milwaukee
let pl272 = new Player(272,'Tyler Smith','PF',21, 61,65,56,73, 74,48,62,59,47,12, 37,50,50,43,59,45, 60,80,randomPotential(), 1,'C','USA',211,101,2024,33); // Milwaukee
let pl273 = new Player(273,'Stanley Umude','SG',26, 46,60,59,91, 60,42,57,58,58,19, 19,55,55,52,40,45, 60,82,randomPotential(), 3,'SF','USA',198,95,0,0); // Milwaukee
let pl274 = new Player(274,'AJ Johnson','SG',21, 44,64,59,75, 66,29,73,69,76,45, 27,41,55,41,24,46, 60,80,randomPotential(), 1,'PG','USA',193,72,2024,23); // Milwaukee
let pl275 = new Player(275,'Chris Livingston','SF',22, 51,58,50,72, 73,44,70,70,59,20, 24,51,50,47,35,47, 60,80,randomPotential(), 2,'PF','USA',198,99,2023,58); // Milwaukee
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl276 = new Player(276,'Anthony Edwards','SG',24, 73,77,65,83, 87,52,81,80,76,53, 16,49,90,67,30,60, 84,83,randomPotential(), 5,'SF','USA',193,102,2020,1); // Minnesota
let pl277 = new Player(277,'Rudy Gobert','C',33, 66,44,0,63, 47,77,38,55,25,14, 80,97,64,73,84,40, 80,81,randomPotential(), 12,'PF','USA',216,117,2013,27); // Minnesota
let pl278 = new Player(278,'Julius Randle','PF',31, 77,75,49,74, 59,77,63,66,70,51, 44,83,88,56,20,35, 82,84,randomPotential(), 11,'C','USA',203,113,2014,7); // Minnesota
let pl279 = new Player(279,'Mike Conley','PG',38, 41,57,80,91, 72,30,73,74,79,74, 12,30,60,60,15,64, 81,82,randomPotential(), 18,'SG','USA',183,79,2007,4); // Minnesota
let pl280 = new Player(280,'Naz Reid','C',26, 77,66,71,71, 65,77,40,44,48,21, 42,65,75,63,71,54, 69,80,randomPotential(), 6,'PF','USA',206,119,0,0); // Minnesota
let pl281 = new Player(281,'Donte DiVincenzo','SG',28, 48,71,75,77, 75,50,77,77,69,39, 28,48,73,69,20,73, 75,81,randomPotential(), 7,'SF','USA',193,92,2018,17); // Minnesota
let pl282 = new Player(282,'Jaden McDaniels','SF',25, 57,62,61,72, 70,50,69,83,68,18, 26,36,55,78,53,51, 77,90,randomPotential(), 5,'PF','USA',206,83,2020,28); // Minnesota
let pl283 = new Player(283,'Nickeil Alexander-Walker','SG',27, 60,64,69,73, 60,50,62,74,71,40, 14,35,60,68,40,59, 69,80,randomPotential(), 6,'SF','Canada',196,92,2019,17); // Atlanta
let pl284 = new Player(284,'Luka Garza','C',27, 61,60,52,72, 38,59,30,30,25,20, 93,40,70,37,54,54, 58,80,randomPotential(), 4,'PF','USA',208,106,2021,52); // Minnesota
let pl285 = new Player(285,'Joe Ingles','SF',38, 49,65,81,77, 50,54,56,70,60,53, 12,41,51,60,10,59, 74,80,randomPotential(), 11,'PF','Australia',206,99,0,0); // Minnesota
let pl286 = new Player(286,'Rob Dillingham','PG',20, 49,71,60,80, 75,29,81,76,80,41, 17,32,60,44,22,48, 60,80,randomPotential(), 1,'SG','USA',185,79,2024,8); // Minnesota
let pl287 = new Player(287,'Terrence Shannon Jr.','SG',25, 57,66,55,80, 73,48,79,77,69,19, 17,47,50,50,22,54, 60,80,randomPotential(), 1,'SF','USA',198,97,2024,27); // Minnesota
let pl288 = new Player(288,'PJ Dozier','SF',29, 51,60,50,67, 75,30,73,66,66,36, 24,49,56,54,30,56, 65,81,randomPotential(), 7,'SG','USA',198,92,0,0); // Minnesota
let pl289 = new Player(289,'Leonard Miller','SF',22, 59,60,62,79, 72,45,63,63,60,55, 52,71,55,50,35,52, 60,80,randomPotential(), 2,'PF','Canada',208,95,2023,33); // Minnesota
let pl290 = new Player(290,'Josh Minott','SF',23, 57,55,54,75, 70,52,62,62,53,22, 24,58,55,57,70,60, 60,80,randomPotential(), 3,'PF','Jamaica',203,92,2022,45); // Minnesota
let pl291 = new Player(291,'Daishen Nix','PG',23, 50,50,45,67, 65,53,80,76,65,52, 16,32,51,43,10,63, 62,80,randomPotential(), 4,'SG','USA',196,101,0,0); // Minnesota
let pl292 = new Player(292,'Jesse Edwards','C',25, 54,30,0,61, 47,55,45,42,34,26, 68,67,50,47,68,49, 60,80,randomPotential(), 1,'PF','Netherlands',211,104,0,0); // Minnesota
let pl293 = new Player(293,'Jaylen Clark','SG',24, 48,50,50,69, 67,45,69,76,56,29, 31,50,50,63,40,78, 60,79,randomPotential(), 1,'SF','USA',196,92,2023,53); // Minnesota
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl294 = new Player(294,'Zion Williamson','PF',25, 85,69,34,70, 89,82,75,75,68,57, 50,48,90,52,40,63, 81,60,randomPotential(), 5,'C','USA',198,128,2019,1); // New Orleans
let pl295 = new Player(295,'Dejounte Murray','PG',29, 60,86,60,79, 50,30,73,75,78,65, 22,60,82,68,15,70, 79,80,randomPotential(), 8,'SG','USA',196,81,2016,29); // New Orleans
let pl296 = new Player(296,'Brandon Ingram','SF',28, 74,83,58,80, 67,32,64,64,75,62, 16,49,82,54,35,45, 83,85,randomPotential(), 9,'PF','USA',203,85,2016,2); // New Orleans
let pl297 = new Player(297,'CJ McCollum','SG',34, 51,75,81,80, 70,50,72,74,76,51, 14,41,81,51,35,50, 82,80,randomPotential(), 12,'PG','USA',190,86,2013,10); // New Orleans
let pl298 = new Player(298,'Herbert Jones','SF',27, 62,68,73,82, 62,49,64,83,65,31, 30,31,59,76,50,74, 80,80,randomPotential(), 4,'SG','USA',203,95,2021,35); // New Orleans
let pl299 = new Player(299,'Daniel Theis','C',33, 64,66,46,71, 65,72,47,57,39,23, 56,61,59,62,74,45, 69,65,randomPotential(), 8,'PF','Germany',203,111,0,0); // New Orleans
let pl300 = new Player(300,'Trey Murphy III','SF',25, 57,53,75,86, 72,50,74,74,40,26, 22,51,70,56,30,58, 75,80,randomPotential(), 4,'PF','USA',203,93,2021,17); // New Orleans
let pl301 = new Player(301,'Jose Alvarado','PG',27, 40,63,58,73, 68,32,66,76,63,52, 18,36,59,68,25,84, 68,80,randomPotential(), 4,'SG','Puerto Rico',183,81,0,0); // New Orleans
let pl302 = new Player(302,'Jordan Hawkins','SG',23, 48,63,66,84, 57,38,60,62,65,22, 18,38,69,47,10,30, 67,80,randomPotential(), 2,'PG','USA',196,88,2023,14); // New Orleans
let pl303 = new Player(303,'Javonte Green','SF',32, 58,60,54,75, 75,36,62,64,62,15, 42,46,54,69,40,70, 66,82,randomPotential(), 6,'PF','USA',193,92,0,0); // New Orleans
let pl304 = new Player(304,'Jeremiah Robinson-Earl','PF',25, 63,56,58,77, 59,50,52,52,59,18, 54,58,55,46,25,50, 67,80,randomPotential(), 4,'C','USA',206,104,2021,32); // New Orleans
let pl305 = new Player(305,'Brandon Boston Jr.','SF',24, 45,64,51,77, 70,40,69,73,66,22, 22,40,65,45,30,54, 62,83,randomPotential(), 4,'SG','USA',201,83,2021,51); // New Orleans
let pl306 = new Player(306,'Trey Jemison','C',26, 60,40,1,68, 62,66,45,42,30,17, 80,44,51,54,74,40, 72,82,randomPotential(), 2,'PF','USA',211,117,0,0); // New Orleans
let pl307 = new Player(307,'Karlo Matkovic','PF',24, 61,59,48,68, 57,52,46,41,45,20, 45,59,50,53,64,46, 60,80,randomPotential(), 1,'C','Bosnia and Herzegovina',211,104,2022,52); // New Orleans
let pl308 = new Player(308,'Yves Missi','C',21, 62,32,1,59, 75,57,68,57,25,17, 45,55,50,54,59,40, 60,80,randomPotential(), 1,'PF','Cameroon',211,106,2024,21); // New Orleans
let pl309 = new Player(309,'Jamal Cain','PF',26, 58,49,60,77, 65,50,56,58,43,16, 44,43,58,54,20,65, 61,83,randomPotential(), 3,'SF','USA',201,86,0,0); // New Orleans
let pl310 = new Player(310,'Antonio Reeves','SG',25, 46,69,68,84, 65,29,73,68,60,20, 20,37,60,42,10,35, 60,80,randomPotential(), 1,'SF','USA',196,92,2024,47); // New Orleans
let pl311 = new Player(311,'Matt Ryan','SF',28, 48,55,81,88, 59,44,45,54,57,17, 10,29,58,40,5,30, 61,79,randomPotential(), 4,'SG','USA',198,97,0,0); // New Orleans
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl312 = new Player(312,'Jalen Brunson','PG',29, 61,83,81,82, 65,50,74,74,85,60, 12,35,95,55,5,45, 78,81,randomPotential(), 7,'SG','USA',188,86,2018,33); //New York
let pl313 = new Player(313,'Karl-Anthony Towns','PF',30, 78,75,81,87, 60,77,66,66,55,34, 58,86,90,52,56,40, 83,82,randomPotential(), 10,'C','Dominican',213,112,2015,1); //New York
let pl314 = new Player(314,'Mikal Bridges','SG',29, 60,66,74,84, 75,58,70,79,72,28, 20,35,80,66,30,59, 82,90,randomPotential(), 7,'SF','USA',198,94,2018,10); //New York
let pl315 = new Player(315,'OG Anunoby','SF',28, 55,81,74,74, 75,58,71,81,62,20, 26,39,64,79,35,68, 79,81,randomPotential(), 8,'PF','United Kingdom',201,105,2017,23); //New York
let pl316 = new Player(316,'Josh Hart','SG',30, 57,62,54,75, 59,54,71,76,69,34, 34,73,56,66,20,55, 79,82,randomPotential(), 8,'SF','USA',193,97,217,30); //New York
let pl317 = new Player(317,'Mitchell Robinson','C',27, 65,58,0,51, 73,74,38,55,30,9, 97,62,51,69,84,60, 74,80,randomPotential(), 7,'PF','USA',213,108,2018,36); //New York
let pl318 = new Player(318,'Precious Achiuwa','PF',26, 61,50,37,60, 69,68,65,64,39,18, 70,68,60,63,56,45, 69,76,randomPotential(), 5,'C','Nigeria',203,102,2020,20); //New York
let pl319 = new Player(319,'Miles McBride','PG',25, 49,79,70,75, 70,34,76,76,78,33, 14,21,60,58,10,65, 64,80,randomPotential(), 4,'SG','USA',188,90,2021,36); //New York
let pl320 = new Player(320,'Cameron Payne','PG',31, 42,80,68,83, 62,29,65,65,76,66, 12,36,65,41,20,60, 67,84,randomPotential(), 10,'SG','USA',190,83,2015,14); //New York
let pl321 = new Player(321,'Jericho Sims','C',27, 62,59,0,58, 73,55,70,70,25,13, 80,63,45,48,60,30, 64,80,randomPotential(), 4,'PF','USA',208,111,2021,58); //New York
let pl322 = new Player(322,'Tyler Kolek','PG',24, 47,69,59,83, 64,44,64,74,76,56, 25,35,50,48,15,56, 60,80,randomPotential(), 1,'SG','USA',185,88,2024,34); //New York
let pl323 = new Player(323,'Pacome Dadiet','SG',20, 51,66,60,75, 55,40,68,66,65,24, 22,39,50,50,30,40, 60,80,randomPotential(), 1,'SF','France',201,95,2024,25); //New York
let pl324 = new Player(324,'Kevin McCullar','SF',24, 58,65,59,79, 65,45,65,72,56,23, 24,45,50,57,43,46, 60,80,randomPotential(), 1,'SG','USA',196,95,2024,56); //New York
let pl325 = new Player(325,'Ariel Hukporti','C',23, 56,47,32,61, 58,58,37,37,35,15, 62,68,50,46,80,28, 60,82,randomPotential(), 1,'PF','Germany',213,111,2024,58); //New York
let pl326 = new Player(326,'Jacob Toppin','SF',25, 55,59,49,67, 72,52,58,58,58,24, 37,52,50,53,41,38, 54,80,randomPotential(), 2,'PF','USA',206,92,0,0); //New York
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl327 = new Player(327,'Shai Gilgeous-Alexander','PG',27, 72,85,72,87, 75,50,76,76,84,66, 18,49,98,79,45,85, 82,80,randomPotential(), 7,'SG','Canada',198,81,2018,11);// Oklahoma
let pl328 = new Player(328,'Chet Holmgren','C',23, 73,76,71,78, 65,35,65,65,55,30, 40,79,82,73,89,40, 79,80,randomPotential(), 2,'PF','USA',216,94,2022,2);// Oklahoma
let pl329 = new Player(329,'Jalen Williams','SG',24, 61,86,78,80, 76,40,77,77,76,52, 20,41,82,62,35,65, 80,80,randomPotential(), 3,'SF','USA',196,88,2022,12);// Oklahoma
let pl330 = new Player(330,'Alex Caruso','SG',31, 47,75,70,76, 62,31,72,84,68,45, 22,37,51,80,56,82, 72,81,randomPotential(), 8,'PG','USA',196,84,0,0);// Oklahoma
let pl331 = new Player(331,'Isaiah Hartenstein','C',27, 62,60,31,68, 60,74,52,52,46,33, 90,72,55,55,74,62, 68,77,randomPotential(), 7,'PF','USA',213,113,2017,43);// Oklahoma
let pl332 = new Player(332,'Luguentz Dort','SG',26, 56,61,69,82, 77,60,69,82,62,20, 26,34,65,77,40,56, 79,80,randomPotential(), 6,'SF','Canada',190,97,0,0);// Oklahoma
let pl333 = new Player(333,'Aaron Wiggins','SF',26, 58,58,75,78, 62,35,74,74,60,25, 36,37,67,51,30,66, 68,80,randomPotential(), 4,'SG','USA',198,90,2021,55);// Oklahoma
let pl334 = new Player(334,'Isaiah Joe','SG',26, 52,84,79,83, 69,37,62,67,64,25, 16,37,67,49,15,53, 65,87,randomPotential(), 5,'PG','USA',193,74,2020,49);// Oklahoma
let pl335 = new Player(335,'Cason Wallace','SG',22, 49,71,75,78, 62,45,65,77,68,25, 22,30,55,64,40,71, 71,80,randomPotential(), 2,'PG','USA',193,87,2023,10);// Oklahoma
let pl336 = new Player(336,'Jaylin Williams','C',23, 63,66,70,74, 52,50,40,47,49,44, 32,79,54,57,53,53, 65,80,randomPotential(), 3,'PF','USA',206,108,2022,34);// Oklahoma
let pl337 = new Player(337,'Ousmane Dieng','PF',22, 53,63,50,73, 69,39,68,68,60,31, 22,52,56,40,25,50, 63,80,randomPotential(), 3,'SF','France',208,97,2022,11);// Oklahoma
let pl338 = new Player(338,'Kenrich Williams','PF',31, 54,55,66,51, 62,53,56,65,59,32, 46,51,53,61,25,60, 70,80,randomPotential(), 7,'SF','USA',198,95,0,0);// Oklahoma
let pl339 = new Player(339,'Nikola Topic','PG',20, 53,59,57,87, 59,49,69,66,76,56, 22,37,55,46,27,44, 60,80,randomPotential(), 1,'SG','Serbia',198,90,2024,12);// Oklahoma
let pl340 = new Player(340,'Ajay Mitchell','SG',23, 47,63,63,85, 77,55,73,70,69,42, 18,34,50,47,25,52, 60,80,randomPotential(), 1,'PG','Belgium',190,86,2024,38);// Oklahoma
let pl341 = new Player(341,'Dillon Jones','SF',24, 53,60,57,80, 61,60,65,72,60,38, 42,54,50,54,27,60, 60,80,randomPotential(), 1,'PF','USA',196,106,2024,26);// Oklahoma
let pl342 = new Player(342,'Malevy Leons','SF',26, 56,58,59,79, 50,45,42,65,37,22, 48,60,50,63,63,67, 60,80,randomPotential(), 1,'PF','Netherlands',206,95,0,0);// Oklahoma
let pl343 = new Player(343,'Alex Ducas','SG',25, 46,62,63,77, 60,55,47,57,59,21, 22,44,50,44,20,44, 60,80,randomPotential(), 1,'SF','Australia',201,99,0,0);// Oklahoma
let pl344 = new Player(344,'Adam Flagler','SG',26, 45,67,64,81, 60,37,62,60,59,30, 17,37,50,40,20,45, 60,80,randomPotential(), 2,'PG','USA',190,83,0,0);// Oklahoma
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl345 = new Player(345,'Paolo Banchero','PF',23, 81,87,59,72, 73,67,70,70,66,55, 24,61,86,53,30,45, 84,80,randomPotential(), 3,'SF','USA',208,113,2022,1);// Orlando
let pl346 = new Player(346,'Franz Wagner','SF',24, 69,68,63,85, 65,55,60,63,75,41, 22,48,80,62,20,55, 81,80,randomPotential(), 4,'SG','Germany',208,102,2021,8);// Orlando
let pl347 = new Player(347,'Jalen Suggs','PG',24, 59,69,65,77, 80,49,78,83,76,45, 20,35,69,74,40,75, 76,80,randomPotential(), 4,'SG','USA',196,92,2021,5);// Orlando
let pl348 = new Player(348,'Wendell Carter Jr.','C',26, 75,68,56,72, 58,72,58,45,40,26, 60,81,68,62,50,40, 77,81,randomPotential(), 7,'PF','USA',208,122,2018,7);// Orlando
let pl349 = new Player(349,'Goga Bitadze','C',26, 62,52,38,67, 53,74,43,44,50,30, 78,67,60,51,89,50, 63,80,randomPotential(),  6,'PF','Georgia',211,113,2019,18);// Orlando
let pl350 = new Player(350,'Kentavious Caldwell-Pope','SG',32, 50,75,70,82, 59,50,75,74,65,27, 14,30,60,67,15,63, 79,84,randomPotential(), 12,'SF','USA',196,92,2013,8);// Orlando
let pl351 = new Player(351,'Moritz Wagner','C',28, 65,68,56,81, 65,58,63,57,42,26, 44,63,70,45,30,55, 66,81,randomPotential(), 7,'PF','Germany',211,111,2018,25);// Orlando
let pl352 = new Player(352,'Anthony Black','PG',21, 55,60,63,66, 65,48,65,68,76,38, 20,32,56,59,40,56, 68,80,randomPotential(), 2,'SG','USA',201,89,2023,6);// Orlando
let pl353 = new Player(353,'Jonathan Isaac','PF',28, 60,63,63,76, 70,60,63,70,66,14, 60,74,60,77,84,60, 71,67,randomPotential(), 6,'C','USA',208,104,2017,6);// Orlando
let pl354 = new Player(354,'Cole Anthony','PG',25, 60,64,60,84, 67,49,74,74,74,56, 26,53,68,49,35,59, 75,98,randomPotential(), 5,'SG','USA',188,83,2020,15);// Orlando
let pl355 = new Player(355,'Jett Howard','SF',22, 53,68,64,80, 62,48,59,59,63,19, 22,33,60,51,59,30, 60,80,randomPotential(), 2,'SG','USA',203,97,2023,11);// Orlando
let pl356 = new Player(356,'Tristan Da Silva','SF',24, 59,69,62,84, 57,52,75,57,59,27, 26,44,53,49,15,20, 75,80,randomPotential(), 1,'PF','Germany',203,98,2024,18);// Orlando
let pl357 = new Player(357,'Gary Harris','SG',31, 51,69,69,81, 68,43,65,70,66,25, 14,23,54,61,15,60, 77,83,randomPotential(), 11,'SF','USA',193,95,2014,19);// Orlando
let pl358 = new Player(358,'Caleb Houstan','SG',22, 38,66,65,81, 62,30,68,72,60,13, 28,27,50,56,15,30, 63,80,randomPotential(), 3,'SF','Canada',203,92,2022,32);// Orlando
let pl359 = new Player(359,'Cory Joseph','PG',34, 40,65,72,78, 55,30,62,70,74,50, 16,33,55,53,20,54, 71,84,randomPotential(), 14,'SG','Canada',188,90,2011,29);// Orlando
let pl360 = new Player(360,'Mac McClung','SG',26, 51,54,60,64,72,38,69,60,59,61, 30,56,55,45,32,52, 60,82,randomPotential(), 3,'PG','USA',188,83,0,0);// Orlando
let pl361 = new Player(361,'Trevelin Queen','SG',28, 51,58,50,73, 65,39,60,60,60,32, 42,40,56,50,60,66, 60,83,randomPotential(), 4,'SF','USA',198,86,0,0);// Orlando
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl362 = new Player(362,'Joel Embiid','C',31, 88,80,62,82, 59,86,59,59,47,45, 50,95,98,72,75,50, 81,76,randomPotential(), 9,'PF','USA',213,127,2014,3); //Philadelphia
let pl363 = new Player(363,'Tyrese Maxey','PG',25, 62,69,71,86, 70,34,80,80,79,59, 10,30,90,58,25,45, 81,77,randomPotential(), 5,'SG','USA',188,90,2020,21); //Philadelphia
let pl364 = new Player(364,'Paul George','PF',35, 66,82,72,85, 78,60,69,77,77,40, 18,58,88,75,25,76, 83,93,randomPotential(), 15,'SF','USA',203,99,2010,10); //Philadelphia
let pl365 = new Player(365,'Jared McCain','SG',21, 51,81,72,93, 58,42,66,66,76,42, 16,24,75,45,5,40, 73,80,randomPotential(), 1,'PG','USA',188,88,2024,16); //Philadelphia
let pl366 = new Player(366,'Kelly Oubre Jr.','SF',30, 61,55,55,75, 85,48,62,72,64,18, 32,47,70,54,40,60, 76,84,randomPotential(), 10,'SG','USA',203,92,2015,15); //Philadelphia
let pl367 = new Player(367,'Guerschon Yabusele','PF',30, 60,69,66,66, 60,64,52,50,56,25, 68,52,63,49,45,50, 72,84,randomPotential(), 3,'C','France',203,117,2016,16); //Philadelphia
let pl368 = new Player(368,'Kyle Lowry','PG',39, 43,75,66,81, 62,57,74,74,69,60, 18,40,55,68,20,60, 81,79,randomPotential(), 19,'SG','USA',183,88,2006,24); //Philadelphia
let pl369 = new Player(369,'Caleb Martin','SF',30, 57,57,58,75, 64,48,58,64,59,29, 32,43,58,59,30,60, 74,80,randomPotential(), 6,'PF','USA',196,92,0,0); //Philadelphia
let pl370 = new Player(370,'Andre Drummond','C',32, 63,37,12,59, 69,85,50,48,35,16, 91,97,60,64,60,77, 77,81,randomPotential(), 13,'PF','USA',211,126,2012,9); //Philadelphia
let pl371 = new Player(371,'KJ Martin','PF',24, 61,58,53,66, 80,52,73,73,66,20, 40,50,60,52,40,40, 71,81,randomPotential(), 5,'SF','USA',198,97,2020,52); //Philadelphia
let pl372 = new Player(372,'Eric Gordon','SG',37, 55,70,70,81, 72,50,69,69,69,31, 8,22,65,52,20,50, 81,78,randomPotential(), 17,'SF','USA',190,97,2008,7); //Philadelphia
let pl373 = new Player(373,'Reggie Jackson','PG',35, 45,67,65,85, 75,38,74,74,76,60, 14,33,66,55,10,50, 75,84,randomPotential(), 14,'SG','USA',188,94,2011,24); //Philadelphia
let pl374 = new Player(374,'Ricky Council IV','SG',24, 52,65,50,77, 70,50,64,60,58,22, 30,34,64,44,5,40, 59,80,randomPotential(), 2,'SF','USA',198,92,0,0); //Philadelphia
let pl375 = new Player(375,'Lester QuiNones','C',25, 47,61,69,69, 64,34,60,60,60,33, 42,46,60,41,10,30, 60,80,randomPotential(), 3,'PF','Dominican',196,94,0,0); //Philadelphia
let pl376 = new Player(376,'VJ Edgecombe','SG',20, 55,64,67,78, 78,47,79,81,76,46, 28,42,76,72,15,64, 79,80,randomPotential(), 0,'SF','Bahamas',196,86,2025,3); // UPDATED Philadelphia
let pl377 = new Player(377,'Adem Bona','PF',22, 55,37,0,66,79,63,72,58,42,17, 50,60,50,56,57,60, 60,80,randomPotential(), 1,'C','Nigeria',208,106,2024,41); //Philadelphia
let pl378 = new Player(378,'Justin Edwards','SG',22, 49,62,56,77, 71,49,72,72,60,20, 32,46,50,48,31,52, 60,80,randomPotential(), 1,'SF','USA',198,92,0,0); //Philadelphia
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl379 = new Player(379,'Jusuf Nurkic','C',31, 69,78,38,66, 40,80,41,49,30,40, 74,94,67,59,66,60, 74,72,randomPotential(), 11,'PF','Bosnia and Herzegovina',213,131,2014,16); // Phoenix
let pl380 = new Player(380,'Kevin Durant','PF',37, 80,87,80,84, 67,53,70,74,82,49, 14,62,95,68,53,50, 86,88,randomPotential(), 17,'SF','USA',211,108,2007,2); // Phoenix
let pl381 = new Player(381,'Josh Okogie','SG',27, 49,68,50,74, 82,40,79,79,66,22, 56,35,60,68,45,76, 69,82,randomPotential(), 7,'SF','USA',193,96,2018,20); // Phoenix
let pl382 = new Player(382,'Devin Booker','SG',29, 74,87,64,88, 69,49,73,70,83,69, 16,37,93,59,20,45, 84,81,randomPotential(), 10,'PG','USA',198,93,2015,13); // Phoenix
let pl383 = new Player(383,'Bradley Beal','SG',32, 64,76,73,82, 77,52,66,73,78,54, 22,36,84,54,30,55, 84,82,randomPotential(), 13,'PG','USA',193,93,2012,3); // Phoenix
let pl384 = new Player(384,'Tyus Jones','PG',29, 45,83,71,81, 47,34,61,61,76,76, 10,30,64,49,10,60, 70,84,randomPotential(), 10,'SG','USA',185,88,2015,24); // Phoenix
let pl385 = new Player(385,'Mason Plumlee','C',35, 70,50,14,57, 65,70,47,48,27,39, 68,86,60,58,50,40, 72,83,randomPotential(), 12,'PF','USA',208,115,2013,22); // Phoenix
let pl386 = new Player(386,"Royce O'Neale",'SF',32, 58,60,68,77, 55,57,52,73,58,40, 22,58,55,63,40,53, 76,82,randomPotential(), 8,'PF','USA',193,102,0,0); // Phoenix
let pl387 = new Player(387,'Grayson Allen','SG',30, 50,60,80,86, 71,44,74,68,68,33, 14,35,64,52,30,50, 75,82,randomPotential(), 7,'SF','USA',193,89,2018,21); // Phoenix
let pl388 = new Player(388,'Monte Morris','PG',30, 46,80,79,82, 62,41,73,73,76,56, 10,38,56,49,20,56, 74,81,randomPotential(), 8,'SG','USA',188,83,2017,51); // Phoenix
let pl389 = new Player(389,'Ryan Dunn','SF',22, 49,55,56,53, 69,55,73,80,59,27, 26,39,56,68,55,50, 68,80,randomPotential(), 1,'PF','USA',198,97,2024,28); // Phoenix
let pl390 = new Player(390,'Bol Bol','PF',26, 66,72,54,74, 59,55,58,58,60,16, 50,77,65,52,80,37, 63,77,randomPotential(), 6,'C','Sudan',221,99,2019,44); // Phoenix
let pl391 = new Player(391,'Damion Lee','SG',33, 54,66,57,87, 65,45,58,64,60,25, 16,50,60,45,10,53, 70,79,randomPotential(), 7,'SF','USA',196,95,0,0); // Phoenix
let pl392 = new Player(392,'Oso Ighodaro','PF',23, 62,42,0,62, 80,54,76,64,50,17, 50,66,50,49,55,40, 66,80,randomPotential(), 1,'C','USA',208,106,2024,40); // Phoenix
let pl393 = new Player(393,'TyTy Washington','PG',24, 44,67,45,75, 69,44,70,70,76,43, 12,33,55,49,5,56, 61,80,randomPotential(), 3,'SG','USA',190,89,2022,29); // Phoenix
let pl394 = new Player(394,'Collin Gillespie','PG',26, 47,65,75,77, 62,33,72,72,67,43, 10,32,59,47,10,70, 60,80,randomPotential(), 2,'SG','USA',185,88,0,0); // Phoenix
let pl395 = new Player(395,'Jalen Bridges','SF',24, 53,60,66,79, 52,47,71,67,50,25, 21,41,50,46,25,45, 60,80,randomPotential(),  1,'PF','USA',203,102,0,0); // Phoenix
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl396 = new Player(396,'Robert Williams','C',28, 64,59,25,67, 65,73,61,54,38,25, 90,76,60,74,85,60, 70,81,randomPotential(), 7,'PF','USA',206,107,2018,27); // Portland
let pl397 = new Player(397,'Deandre Ayton','C',27, 76,72,35,76, 72,75,65,55,51,19, 72,87,78,58,53,50, 80,81,randomPotential(), 7,'PF','USA',213,113,2018,1); // Portland
let pl398 = new Player(398,'Shaedon Sharpe','SF',22, 57,81,58,77, 86,40,79,79,73,32, 28,40,77,52,20,50, 75,80,randomPotential(), 3,'SG','Canada',198,90,2022,7); // Portland
let pl399 = new Player(399,'Anfernee Simons','SG',26, 63,82,68,87, 80,31,76,79,76,58, 10,33,83,41,10,30, 75,80,randomPotential(), 7,'PG','USA',190,82,2018,24); // Portland
let pl400 = new Player(400,'Jerami Grant','PF',31, 72,71,69,81, 68,59,67,67,66,30, 22,40,80,64,40,45, 77,82,randomPotential(), 11,'SF','USA',201,95,2014,39); // Portland
let pl401 = new Player(401,'Scoot Henderson','PG',21, 56,77,57,80, 85,53,85,79,76,70, 22,29,70,49,10,50, 78,80,randomPotential(), 2,'SG','USA',190,91,2023,3); // Portland
let pl402 = new Player(402,'Deni Avdija','SF',24, 59,80,69,81, 69,55,65,71,78,71, 26,69,86,67,30,55, 89,84,randomPotential(), 5,'PF','Israel',206,95,2020,9); // Portland UPDATED for 2026
let pl403 = new Player(403,'Donovan Clingan','C',21, 64,49,59,72, 50,68,44,45,36,10, 90,75,58,63,90,53, 67,80,randomPotential(), 1,'PF','USA',218,127,2024,7); // Portland
let pl404 = new Player(404,'Toumani Camara','PF',25, 63,57,60,74, 63,55,53,51,55,20, 56,40,53,59,35,63, 76,80,randomPotential(), 2,'SF','Belgium',203,99,2023,52); // Portland
let pl405 = new Player(405,'Dalano Banton','PG',26, 52,62,58,71, 65,56,66,66,66,50, 30,46,66,58,40,59, 63,80,randomPotential(), 4,'SG','USA',206,92,2024,46); // Portland
let pl406 = new Player(406,'Matisse Thybulle','SF',28, 41,40,59,67, 60,49,66,79,55,19, 20,26,48,78,60,93, 71,80,randomPotential(), 6,'SG','Australia',196,91,2019,20); // Portland
let pl407 = new Player(407,'Jabari Walker','PF',23, 63,60,48,76, 69,46,65,65,50,17, 64,76,59,55,25,45, 67,80,randomPotential(), 3,'C','USA',206,97,2022,57); // Portland
let pl408 = new Player(408,'Duop Reath','C',29, 55,58,65,74, 65,63,49,52,42,20, 56,47,68,48,55,50, 66,80,randomPotential(), 2,'PF','South Sudan',211,111,0,0); // Portland
let pl409 = new Player(409,'Kris Murray','SF',25, 56,60,57,60, 65,50,58,63,59,21, 48,36,55,53,25,62, 68,80,randomPotential(), 2,'PF','USA',203,99,2023,23); // Portland
let pl410 = new Player(410,'Rayan Rupert','SG',21, 49,53,59,75, 59,42,57,62,62,35, 34,39,53,54,15,45, 63,80,randomPotential(), 2,'SF','France',198,92,2023,43); // Portland
let pl411 = new Player(411,'Bryce McGowens','SG',23, 52,69,58,76, 71,38,64,65,64,23, 16,35,56,50,20,45, 65,80,randomPotential(), 3,'SF','USA',201,81,2022,40); // Portland
let pl412 = new Player(412,'Justin Minaya','SF',26, 47,60,44,60, 65,45,60,61,60,19, 50,29,45,55,55,40, 62,81,randomPotential(), 3,'SG','USA',196,95,0,0); // Portland
let pl413 = new Player(413,'Taze Moore','SG',27, 54,58,49,64, 80,45,67,66,58,26, 40,46,50,46,14,50, 60,82,randomPotential(), 2,'SF','USA',196,88,0,0); // Portland
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl414 = new Player(414,'Domantas Sabonis','C',29, 83,81,53,73, 44,72,48,49,50,73, 72,91,80,49,30,45, 80,86,randomPotential(), 9,'PF','Lithuania',208,108,2016,11); // Sacramento
let pl415 = new Player(415,'Keegan Murray','PF',25, 64,70,68,85, 69,50,66,69,60,16, 44,53,65,61,40,50, 82,80,randomPotential(), 3,'SF','USA',203,97,2022,4); // Sacramento
let pl416 = new Player(416,'DeMar DeRozan','SF',36, 73,87,59,84, 78,63,72,72,73,51, 14,39,84,57,25,55, 84,91,randomPotential(), 16,'PF','USA',198,99,2009,9); // Sacramento
let pl417 = new Player(417,'Malik Monk','SG',27, 57,70,65,84, 78,38,70,71,69,70, 12,36,79,51,35,45, 72,80,randomPotential(), 8,'PG','USA',190,90,2017,11); // Sacramento
let pl418 = new Player(418,"De'Aaron Fox",'PG',28, 53,81,59,74, 74,36,87,83,78,66, 18,37,93,63,20,78, 83,80,randomPotential(), 8,'SG','USA',190,83,2017,5); // Sacramento
let pl419 = new Player(419,'Keon Ellis','SG',25, 46,64,76,78, 69,38,71,74,64,27, 26,30,55,74,58,80, 66,80,randomPotential(), 3,'SF','USA',198,79,0,0); // Sacramento
let pl420 = new Player(420,'Kevin Huerter','SG',27, 50,59,67,76, 65,40,74,68,69,38, 18,43,66,55,25,56, 78,83,randomPotential(), 7,'SF','USA',201,86,2018,19); // Sacramento
let pl421 = new Player(421,'Trey Lyles','PF',30, 67,65,70,74, 55,59,56,49,48,22, 18,68,65,50,35,40, 68,84,randomPotential(), 10,'C','Canada',206,106,2015,12); // Sacramento
let pl422 = new Player(422,'Alex Len','C',32, 63,51,52,68, 50,65,43,40,22,18, 74,75,55,54,87,45, 67,78,randomPotential(), 12,'PF','Ukraine',213,113,2013,5); // Sacramento
let pl423 = new Player(423,'Isaac Jones','PF',25, 59,54,25,71, 64,60,60,57,48,18, 42,44,60,50,70,25, 60,80,randomPotential(), 1,'C','USA',203,111,0,0); // Sacramento
let pl424 = new Player(424,'Jae Crowder','SF',35, 54,73,64,77, 63,72,58,69,65,23, 20,51,55,64,25,56, 74,89,randomPotential(), 13,'PF','USA',198,106,2012,34); // Sacramento
let pl425 = new Player(425,'Jordan McLaughlin','PG',29, 41,64,74,73, 64,42,63,64,74,72, 20,31,55,51,20,80, 64,83,randomPotential(), 6,'SG','USA',183,83,0,0); // Sacramento
let pl426 = new Player(426,'Devin Carter','PG',23, 50,57,60,74, 84,50,88,79,69,57, 27,40,55,57,45,55, 64,80,randomPotential(), 1,'SG','USA',188,88,2024,13); // Sacramento
let pl427 = new Player(427,'Colby Jones','SG',23, 46,58,52,67, 62,40,64,65,58,29, 32,43,55,49,50,64, 60,80,randomPotential(), 2,'SF','USA',198,92,2023,34); // Sacramento
let pl428 = new Player(428,'Doug McDermott','SF',33, 60,68,81,80, 57,50,49,50,57,18, 14,32,65,43,10,20, 69,83,randomPotential(), 11,'PF','USA',198,102,2014,11); // Sacramento
let pl429 = new Player(429,'Mason Jones','SG',27, 48,74,64,65, 47,40,54,64,61,49, 16,54,67,46,5,40, 60,80,randomPotential(), 4,'PG','USA',193,90,0,0); // Sacramento
let pl430 = new Player(430,'Isaiah Crawford','SF',24, 55,64,64,73, 64,49,51,51,47,24, 34,49,50,45,40,60, 60,80,randomPotential(), 1,'SG','USA',198,99,0,0); // Sacramento
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl431 = new Player(431,'Victor Wembanyama','C',21, 81,61,57,80, 59,47,56,56,60,47, 56,91,90,80,99,63, 80,88,randomPotential(), 2,'PF','France',221,94,2023,1); // San Antonio
let pl432 = new Player(432,'Harrison Barnes','PF',33, 63,77,70,81, 85,60,67,65,68,20, 24,44,65,53,10,40, 81,82,randomPotential(), 13,'SF','USA',203,102,2012,7); // San Antonio
let pl433 = new Player(433,'Julian Champagnie','SF',24, 50,64,67,84, 57,37,59,59,58,21, 20,51,64,48,45,55, 71,80,randomPotential(), 3,'SG','USA',203,99,0,0); // San Antonio
let pl434 = new Player(434,'Devin Vassell','SG',25, 61,81,67,81, 67,59,62,73,72,44, 12,44,81,65,30,60, 76,82,randomPotential(), 5,'SF','USA',196,90,2020,11); // San Antonio
let pl435 = new Player(435,'Chris Paul','PG',40, 50,74,69,87, 65,52,70,71,77,92, 20,49,59,63,10,70, 78,77,randomPotential(), 20,'SG','USA',183,79,2005,4); // San Antonio
let pl436 = new Player(436,'Stephon Castle','PG',21, 50,60,56,71, 62,49,72,83,68,52, 18,27,70,62,25,58, 75,80,randomPotential(), 1,'SG','USA',198,97,2024,4); // San Antonio
let pl437 = new Player(437,'Keldon Johnson','SF',26, 69,73,60,76, 61,60,66,68,69,34, 34,53,79,56,15,45, 79,80,randomPotential(), 6,'PF','USA',196,99,2019,29); // San Antonio
let pl438 = new Player(438,'Jeremy Sochan','PF',22, 61,57,56,73, 64,50,60,64,69,41, 24,56,70,59,35,53, 78,80,randomPotential(), 3,'SF','USA',203,104,2022,9); // San Antonio
let pl439 = new Player(439,'Zach Collins','C',28, 65,69,59,75, 69,50,56,55,30,46, 56,63,65,54,59,40, 69,80,randomPotential(), 7,'PF','USA',211,113,2017,10); // San Antonio
let pl440 = new Player(440,'Charles Bassey','C',25, 55,59,43,63, 72,59,67,67,32,37, 90,88,60,58,88,56, 61,80,randomPotential(), 4,'PF','Nigeria',208,106,2021,53); // San Antonio
let pl441 = new Player(441,'Sandro Mamukelashvili','PF',26, 60,59,62,72, 59,63,49,49,49,39, 72,81,67,49,50,35, 61,80,randomPotential(), 4,'C','Georgia',211,108,2021,54); // San Antonio
let pl442 = new Player(442,'Tre Jones','PG',25, 45,60,49,83, 61,50,70,70,74,80, 20,39,63,55,10,60, 71,81,randomPotential(), 5,'SG','USA',185,83,2020,41); // San Antonio
let pl443 = new Player(443,'Malaki Branham','SG',22, 59,67,65,85, 65,35,72,72,59,35, 12,32,67,44,10,37, 70,80,randomPotential(), 3,'PG','USA',193,81,2022,20); // San Antonio
let pl444 = new Player(444,'Blake Wesley','SG',22, 58,50,48,65, 74,30,68,68,73,68, 14,32,55,50,20,59, 64,80,randomPotential(), 3,'PG','USA',196,83,2022,25); // San Antonio
let pl445 = new Player(445,'Sidy Cissoko','SF',21, 53,57,42,65, 70,48,64,65,58,32, 40,40,53,56,30,60, 60,80,randomPotential(), 2,'PF','France',203,90,2023,44); // San Antonio
let pl446 = new Player(446,'Harrison Ingram','SF',23, 56,63,54,62,72,63,72,65,60,31, 39,50,50,51,29,49, 60,80,randomPotential(), 1,'PF','USA',196,104,2024,48); // San Antonio
let pl447 = new Player(447,'David Duke Jr.','SG',26, 47,63,49,79, 62,45,73,73,63,39, 50,36,56,41,25,63, 62,83,randomPotential(), 4,'PG','USA',196,92,0,0); // San Antonio
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl448 = new Player(448,'Jakob Poeltl','C',30, 72,59,33,55, 47,70,41,37,28,35, 88,77,65,63,83,50, 72,80,randomPotential(), 9,'PF','Austria',213,111,2016,9); // Toronto
let pl449 = new Player(449,'Scottie Barnes','PF',24, 71,78,49,76, 82,64,72,72,69,62, 50,61,80,75,55,56, 85,80,randomPotential(), 4,'SF','USA',201,102,2021,4); // Toronto
let pl450 = new Player(450,'Gradey Dick','SG',22, 53,80,65,89, 68,44,66,64,69,21, 16,30,75,55,10,50, 73,80,randomPotential(), 2,'SF','USA',109,92,2023,13); // Toronto
let pl451 = new Player(451,'RJ Barrett','SF',25, 66,60,64,70, 72,66,74,74,73,38, 20,51,82,60,20,35, 83,80,randomPotential(), 6,'SG','Canada',198,96,2019,3); // Toronto
let pl452 = new Player(452,'Immanuel Quickley','PG',26, 59,61,70,85, 69,44,72,72,76,60, 12,44,80,54,10,50, 75,79,randomPotential(), 5,'SG','USA',190,86,2020,25); // Toronto
let pl453 = new Player(453,'Kelly Olynyk','C',34, 70,75,70,83, 45,60,31,35,32,50, 44,65,66,54,35,60, 72,82,randomPotential(), 12,'PF','USA',2013,13,211,108); // Toronto
let pl454 = new Player(454,'Chris Boucher','PF',32, 68,66,56,78, 64,70,47,45,31,10, 70,69,70,55,65,50, 67,77,randomPotential(), 8,'C','Saint Lucia',206,90,0,0); // Toronto
let pl455 = new Player(455,'Bruce Brown','PG',29, 50,76,56,76, 70,65,68,68,69,37, 30,46,60,58,35,60, 75,84,randomPotential(), 7,'SG','USA',193,91,2018,42); // Toronto
let pl456 = new Player(456,'Ochai Agbaji','SG',25, 57,70,65,73, 75,54,78,78,65,22, 28,35,56,61,35,50, 72,80,randomPotential(), 3,'SF','USA',196,97,2022,14); // Toronto
let pl457 = new Player(457,'Davion Mitchell','PG',27, 40,71,59,69, 60,50,72,78,76,52, 12,25,56,64,15,50, 70,80,randomPotential(), 4,'SG','USA',188,92,2021,9); // Toronto
let pl458 = new Player(458,"Ja Kobe Walter",'SG',21, 52,64,51,66, 66,47,80,72,60,27, 32,30,64,49,25,50, 69,80,randomPotential(), 1,'SF','USA',196,81,2024,19); // Toronto
let pl459 = new Player(459,'Jonathan Mogbo','PF',24, 56,47,42,72, 65,58,81,69,60,35, 80,53,55,61,50,69, 66,80,randomPotential(), 1,'C','USA',206,102,2024,31); // Toronto
let pl460 = new Player(460,'Jamal Shead','PG',23, 40,64,63,63, 64,39,87,84,76,79, 10,20,56,51,15,60, 65,80,randomPotential(), 1,'SG','USA',183,90,2024,45); // Toronto
let pl461 = new Player(461,'A.J. Lawson','SG',25, 53,58,50,54, 70,34,64,64,59,18, 34,44,66,51,10,50, 60,80,randomPotential(), 3,'SF','Canada',198,81,0,0); // Toronto
let pl462 = new Player(462,'Garrett Temple','SG',39, 44,45,64,74, 59,34,47,66,65,29, 14,33,53,59,30,60, 70,82,randomPotential(), 15,'SF','USA',196,88,0,0); // Toronto
let pl463 = new Player(463,'Jamison Battle','SF',24, 52,62,80,85, 55,45,54,50,52,26, 32,34,65,45,15,30, 63,80,randomPotential(), 1,'PF','USA',201,99,0,0); // Toronto
let pl464 = new Player(464,'Ulrich Chomche','PF',20, 53,49,48,50, 72,58,74,64,49,19, 76,48,50,52,64,53, 60,80,randomPotential(), 1,'C','Cameroon',208,106,2024,57); // Toronto
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl465 = new Player(465,'John Collins','C',28, 75,63,63,79, 75,65,61,55,50,18, 60,79,79,58,55,40, 79,84,randomPotential(), 8,'PF','USA',206,106,2017,19); // Utah
let pl466 = new Player(466,'Lauri Markkanen','PF',28, 78,70,70,86, 52,51,53,55,55,22, 48,68,85,53,30,45, 81,80,randomPotential(), 8,'SF','Finland',213,108,2017,7); // Utah
let pl467 = new Player(467,'Walker Kessler','C',24, 69,58,36,54, 50,64,37,42,34,16, 90,80,58,69,93,35, 74,80,randomPotential(), 3,'PF','USA',213,111,2022,22); // Utah
let pl468 = new Player(468,'Keyonte George','PG',22, 57,69,65,83, 62,45,69,68,77,61, 10,34,77,44,10,35, 78,80,randomPotential(), 2,'SG','USA',193,83,2023,16); // Utah
let pl469 = new Player(469,'Collin Sexton','SG',27, 51,58,74,85, 74,48,78,78,76,60, 22,23,84,48,10,45, 80,81,randomPotential(), 7,'PG','USA',190,86,2018,8); // Utah
let pl470 = new Player(470,'Jordan Clarkson','SG',33, 54,67,63,83, 75,44,69,72,78,55, 22,32,82,43,10,55, 77,83,randomPotential(), 11,'PG','Philippines',190,87,2014,46); // Utah
let pl471 = new Player(471,'Kyle Filipowski','C',22, 62,60,59,57, 56,52,67,47,59,40, 42,72,58,47,20,56, 66,80,randomPotential(), 1,'PF','USA',211,113,2024,32); // Utah
let pl472 = new Player(472,'Taylor Hendricks','PF',22, 59,65,65,78, 68,52,62,65,59,13, 40,58,56,58,60,60, 71,80,randomPotential(), 2,'SF','USA',206,95,2023,9); // Utah
let pl473 = new Player(473,'Brice Sensabaugh','SF',22, 55,74,68,90, 60,54,55,57,64,34, 22,53,68,42,15,50, 67,79,randomPotential(), 2,'SG','USA',198,106,2023,28); // Utah
let pl474 = new Player(474,'Drew Eubanks','C',28, 66,63,39,72, 65,58,51,52,27,22, 66,71,58,49,76,40, 65,83,randomPotential(), 7,'PF','USA',206,111,0,0); // Utah
let pl475 = new Player(475,'Svi Mykhailiuk','SF',28, 50,70,69,75, 59,44,72,72,54,30, 14,31,66,37,10,56, 65,79,randomPotential(), 7,'SG','Ukraine',201,92,2018,47); // Utah
let pl476 = new Player(476,'Johnny Juzang','SG',24, 56,75,75,76, 62,45,60,60,62,19, 22,38,60,45,15,30, 66,80,randomPotential(), 3,'SF','USA',201,97,0,0); // Utah
let pl477 = new Player(477,'Cody Williams','SG',21, 54,56,49,64, 65,41,77,76,72,22, 20,34,45,53,30,35, 69,80,randomPotential(), 1,'SF','USA',201,86,2024,10); // Utah
let pl478 = new Player(478,'Patty Mills','PG',37, 37,77,59,85, 56,41,73,73,76,35, 10,24,55,48,10,55, 70,82,randomPotential(), 16,'SG','Australia',188,81,2009,55); // Utah
let pl479 = new Player(479,'Isaiah Collier','PG',21, 49,55,40,45, 65,50,85,78,76,70, 6,42,45,50,15,66, 67,80,randomPotential(), 1,'SG','USA',190,95,2024,29); // Utah
let pl480 = new Player(480,'Micah Potter','PF',27, 54,60,71,80, 50,60,43,43,32,18, 52,69,53,40,45,30, 62,81,randomPotential(), 4,'C','USA',208,112,0,0); // Utah
let pl481 = new Player(481,'Oscar Tshiebwe','PF',26, 57,59,27,75, 65,59,65,57,30,12, 80,80,45,50,62,35, 60,80,randomPotential(), 2,'C','Democratic Republic of the Congo',206,117,0,0); // Utah
let pl482 = new Player(482,'David Jones','SF',24, 49,57,60,78, 68,49,63,66,50,28, 44,49,45,52,25,65, 60,87,randomPotential(), 1,'SG','Dominican Republic',198,95,0,0); // Utah
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl483 = new Player(483,'Jonas Valanciunas','C',33, 73,71,34,79, 44,79,52,48,25,32, 78,90,70,54,60,30, 75,81,randomPotential(), 13,'PF','Lithuania',211,120); // Washington
let pl484 = new Player(484,'Kyle Kuzma','PF',30, 71,59,63,73, 65,64,64,64,67,47, 24,63,79,51,40,30, 81,83,randomPotential(), 8,'SF','USA',206,100,2017,27); // Washington
let pl485 = new Player(485,'Marvin Bagley III','C',26, 74,64,49,69, 76,70,63,64,52,20, 88,68,70,58,55,35, 73,87,randomPotential(), 7,'PF','USA',208,106,2018,2); // Washington
let pl486 = new Player(486,'Jordan Poole','SG',26, 55,72,64,87, 63,51,71,71,79,53, 10,30,81,53,20,55, 77,80,randomPotential(), 6,'SF','USA',193,87,2019,28); // Washington
let pl487 = new Player(487,'Malcolm Brogdon','PG',32, 59,64,76,87, 62,46,67,70,76,60, 20,42,79,58,15,50, 79,84,randomPotential(), 9,'SG','USA',193,103,2016,36); // Washington
let pl488 = new Player(488,'Alex Sarr','C',20, 65,68,48,66, 67,57,63,62,63,28, 52,55,62,69,85,50, 76,80,randomPotential(), 1,'PF','France',213,92,2024,2); // Washington
let pl489 = new Player(489,'Corey Kispert','SF',26,47,75,75,80, 59,50,66,66,61,27, 14,34,68,52,15,35, 76,80,randomPotential(), 4,'SG','USA',201,99,2021,15); // Washington
let pl490 = new Player(490,'Bilal Coulibaly','SF',21, 59,63,56,71, 75,53,72,75,59,25, 26,41,59,64,50,55, 78,80,randomPotential(), 2,'SG','France',198,88,2023,7); // Washington
let pl491 = new Player(491,'Saddiq Bey','SF',26, 56,61,63,84, 60,59,53,69,66,22, 58,46,70,57,10,50, 80,81,randomPotential(), 5,'PF','USA',201,97,2020,19); // Washington
let pl492 = new Player(492,'Carlton Carrington','PG',20, 54,78,64,78, 65,44,72,62,72,48, 10,46,55,50,15,45, 80,80,randomPotential(), 1,'SG','USA',193,86,2024,14); // Washington
let pl493 = new Player(493,'Jared Butler','SG',25, 48,59,56,77, 68,40,70,70,72,74, 14,31,70,42,25,72, 61,80,randomPotential(), 4,'PG','USA',190,88,2021,40); // Washington
let pl494 = new Player(494,'Justin Champagnie','SF',24, 56,57,70,76, 68,35,63,63,55,20, 70,53,60,52,50,65, 63,80,randomPotential(), 4,'SG','USA',198,90,0,0); // Washington
let pl495 = new Player(495,'Kyshawn George','SF',22, 52,68,46,72, 62,50,54,59,64,30, 24,44,50,54,50,50, 75,80,randomPotential(), 1,'SG','Switzerland ',201,90,2024,24); // Washington
let pl496 = new Player(496,'Richaun Holmes','PF',32, 66,60,27,74, 71,72,47,46,48,18, 64,67,56,51,55,35, 69,82,randomPotential(), 10,'C','USA',208,106,2015,37); // Washington
let pl497 = new Player(497,'Johnny Davis','SG',23, 56,50,48,56, 65,44,68,69,72,20, 20,40,57,61,35,56, 62,80,randomPotential(), 3,'SF','USA',196,88,2022,10); // Washington
let pl498 = new Player(498,'Patrick Baldwin Jr.','SF',23, 56,62,66,65, 52,59,47,54,48,19, 24,71,65,49,50,55, 60,80,randomPotential(), 3,'PF','USA',206,99,2022,28); // Washington
let pl499 = new Player(499,'Anthony Gill','PF',33, 60,62,49,75, 69,50,59,57,44,21, 48,44,56,48,35,40, 60,80,randomPotential(), 5,'C','USA',201,104,0,0); // Washington
let pl500 = new Player(500,'Tristan Vukcevic','C',22, 61,61,52,77, 55,62,47,45,41,29, 32,69,60,47,76,55, 62,80,randomPotential(), 2,'PF','Italy',208,101,2023,42); // Washington

// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl501 = new Player(501,'Jeff Green','PF',39, 68,65,63,80, 74,60,53,65,64,19, 26,36,60,54,45,30, 77,82,randomPotential(), 17,'SF','USA',203,106,2007,5); //Houston

// new Player(8, "Garrison Mathews", "SG",29, 53,71,78,81, 55,34,40,50,66,13, 12,30,55,44,15,59, 67,79,20, 6,'SF','USA',196,97,0,0); // Free Agent
// new Player(14, "David Roddy", "PF",24, 60,62,50,66, 56,63,65,64,56,23, 30,51,59,53,20,50, 68,80,70,  3,'SF','USA',193,115,2022,23); // Free Agent
// new Player(2, 'Cody Zeller',"C",33, 65,60,38,69, 70,65,60,44,30,23, 66,72,58,48,35,45, 68,80,0, 12, "PF",'USA',211,108,2013,4); // Free Agent
// new Player(6, "De'Andre Hunter", "SF",28, 64,70,74,84, 65,55,66,73,60,19, 14,41,76,60,15,45, 80,80,40, 6,'SG','USA',203,102,2019,4); // Cleveland
// let pl5 = new Player(5, "Larry Nance Jr.", "PF",32, 65,64,34,70, 76,59,55,51,54,33, 56,63,52,66,40,76, 73,83,0, 10,'C','USA',203,111,2015,27); // Cleveland
// new Player(16, "Dominick Barlow", "PF",22, 54,63,33,70, 65,52,58,58,59,31, 78,58,54,45,54,50, 63,80,90, 3,'SF','USA',206,100,0,0); // Philadelphia
// new Player(4, "Bogdan Bogdanovic", "SG",33, 60,79,77,90, 65,53,65,65,69,41, 16,33,78,52,16,56, 78,77,0,  8,'SF','Serbia',196,99,2014,27); // Clippers
// new Player(10, "Kevon Harris", "SG",28, 53,62,61,76, 64,48,61,61,59,13, 44,34,53,50,20,56, 62,80,30, 3,'SF','USA',196,97,0,0); // Houston

let atl = new Team("Atlanta Hawks", "atl",'east',0);
let bos = new Team("Boston Celtics", "bos",'east',1);
let bkn = new Team("Brooklyn Nets", "bkn",'east',2);
let cho = new Team("Charlotte Hornets", "cho",'east',3);
let chi = new Team("Chicago Bulls", "chi",'east',4);
let cle = new Team("Cleveland Cavaliers", "cle",'east',5);
let dal = new Team("Dallas Mavericks", "dal",'west',6);
let den = new Team("Denver Nuggets", "den",'west',7);
let det = new Team("Detroit Pistons", "det",'east',8);
let gs = new Team("Golden State Warriors", "gs",'west',9);
let hou = new Team("Houston Rockets", "hou",'west',10);
let ind = new Team("Indiana Pacers", "ind",'east',11);
let lac = new Team("Los Angeles Clippers", "lac",'west',12);
let lal = new Team("Los Angeles Lakers", "lal",'west',13);
let mem = new Team("Memphis Grizzlies", "mem",'west',14);
let mia = new Team("Miami Heat", "mia",'east',15);
let mil = new Team("Milwaukee Bucks", "mil",'east',16);
let min = new Team("Minnesota Timberwolves", "min",'west',17);
let nop = new Team("New Orleans Pelicans", "nop",'west',18);
let nyk = new Team("New York Knicks", "nyk",'east',19);
let okc = new Team("Oklahoma City Thunder","okc",'west',20);
let orl = new Team("Orlando Magic","orl",'east',21);
let phi = new Team("Philadelphia 76ers","phi",'east',22);
let phx = new Team("Phoenix Suns","phx",'west',23);
let por = new Team("Portland Trail Blazers","por",'west',24);
let sac = new Team("Sacramento Kings","sac",'west',25);
let sas = new Team("San Antonio Spurs","sas",'west',26);
let tor = new Team("Toronto Raptors","tor",'east',27);
let uta = new Team("Utah Jazz","uta",'west',28);
let was = new Team("Washington Wizards","was",'east',29);

//console.log(`Team name = ${atl.teamName}`);

const teamsArray = [];
teamsArray.push(atl,bos,bkn,cho,chi,cle,dal,den,det,gs,hou,ind,lac,lal,mem,mia,mil,min,nop,nyk,okc,orl,phi,phx,por,sac,sas,tor,uta,was);
console.log(teamsArray);
let homeTeamSelect = 0;
let awayTeamSelect = 1;

// ---- A function to toggle active HOME team for game simulation and change BUTTON STYLE
let toggleActiveHomeTeam = function (teamsArray){
	for (let i=0; i<teamsArray.length; i++){
		if (i === homeTeamSelect){
			let element = document.querySelector(`.btn-${teamsArray[i].teamShort}-home`);
			element.classList.add("btn-home-active");
		} else {
			let element = document.querySelector(`.btn-${teamsArray[i].teamShort}-home`);
			element.classList.remove("btn-home-active");
		}
	}
}
// ---- A function to toggle active AWAY team for game simulation and change BUTTON STYLE
let toggleActiveAwayTeam = function (teamsArray){
	for (let i=0; i<teamsArray.length; i++){
		if (i === awayTeamSelect){
			let element = document.querySelector(`.btn-${teamsArray[i].teamShort}-away`);
			element.classList.add("btn-away-active");
		} else {
			let element = document.querySelector(`.btn-${teamsArray[i].teamShort}-away`);
			element.classList.remove("btn-away-active");
		}
	}
}

function selectATLhome() {
	homeTeamSelect = 0;
	//console.log(`${teamsArray[0].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectBOShome() {
	homeTeamSelect = 1;
	//console.log(`${teamsArray[1].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectBKNhome() {
	homeTeamSelect = 2;
	//console.log(`${teamsArray[2].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectCHOhome() {
	homeTeamSelect = 3;
	//console.log(`${teamsArray[3].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectCHIhome() {
	homeTeamSelect = 4;
	//console.log(`${teamsArray[4].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectCLEhome() {
	homeTeamSelect = 5;
	//console.log(`${teamsArray[5].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectDALhome() {
	homeTeamSelect = 6;
	//console.log(`${teamsArray[6].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectDENhome() {
	homeTeamSelect = 7;
	//console.log(`${teamsArray[7].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectDEThome() {
	homeTeamSelect = 8;
	//console.log(`${teamsArray[8].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectGShome() {
	homeTeamSelect = 9;
	//console.log(`${teamsArray[9].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectHOUhome() {
	homeTeamSelect = 10;
	//console.log(`${teamsArray[10].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectINDhome() {
	homeTeamSelect = 11;
	//console.log(`${teamsArray[11].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectLAChome() {
	homeTeamSelect = 12;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectLALhome() {
	homeTeamSelect = 13;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectMEMhome() {
	homeTeamSelect = 14;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectMIAhome() {
	homeTeamSelect = 15;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectMILhome() {
	homeTeamSelect = 16;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectMINhome() {
	homeTeamSelect = 17;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectNOPhome() {
	homeTeamSelect = 18;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectNYKhome() {
	homeTeamSelect = 19;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectOKChome() {
	homeTeamSelect = 20;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectORLhome() {
	homeTeamSelect = 21;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectPHIhome() {
	homeTeamSelect = 22;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectPHXhome() {
	homeTeamSelect = 23;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectPORhome() {
	homeTeamSelect = 24;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectSAChome() {
	homeTeamSelect = 25;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectSAShome() {
	homeTeamSelect = 26;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectTORhome() {
	homeTeamSelect = 27;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectUTAhome() {
	homeTeamSelect = 28;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
function selectWAShome() {
	homeTeamSelect = 29;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveHomeTeam(teamsArray);
}
  // ---------------------------------------------------------------------------
function selectATLaway() {
	awayTeamSelect = 0;
	//console.log(`${teamsArray[0].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectBOSaway() {
	awayTeamSelect = 1;
	//console.log(`${teamsArray[1].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectBKNaway() {
	awayTeamSelect = 2;
	//console.log(`${teamsArray[2].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectCHOaway() {
	awayTeamSelect = 3;
	//console.log(`${teamsArray[3].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectCHIaway() {
	awayTeamSelect = 4;
	//console.log(`${teamsArray[4].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectCLEaway() {
	awayTeamSelect = 5;
	//console.log(`${teamsArray[5].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectDALaway() {
	awayTeamSelect = 6;
	//console.log(`${teamsArray[6].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectDENaway() {
	awayTeamSelect = 7;
	//console.log(`${teamsArray[7].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectDETaway() {
	awayTeamSelect = 8;
	//console.log(`${teamsArray[8].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectGSaway() {
	awayTeamSelect = 9;
	//console.log(`${teamsArray[9].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectHOUaway() {
	awayTeamSelect = 10;
	//console.log(`${teamsArray[10].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectINDaway() {
	awayTeamSelect = 11;
	//console.log(`${teamsArray[11].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectLACaway() {
	awayTeamSelect = 12;
	//console.log(`${teamsArray[12].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectLALaway() {
	awayTeamSelect = 13;
	//console.log(`${teamsArray[12].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectMEMaway() {
	awayTeamSelect = 14;
	//console.log(`${teamsArray[12].teamName} selected as away team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectMIAaway() {
	awayTeamSelect = 15;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectMILaway() {
	awayTeamSelect = 16;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectMINaway() {
	awayTeamSelect = 17;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectNOPaway() {
	awayTeamSelect = 18;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectNYKaway() {
	awayTeamSelect = 19;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectOKCaway() {
	awayTeamSelect = 20;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectORLaway() {
	awayTeamSelect = 21;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectPHIaway() {
	awayTeamSelect = 22;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectPHXaway() {
	awayTeamSelect = 23;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectPORaway() {
	awayTeamSelect = 24;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectSACaway() {
	awayTeamSelect = 25;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectSASaway() {
	awayTeamSelect = 26;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectTORaway() {
	awayTeamSelect = 27;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectUTAaway() {
	awayTeamSelect = 28;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}
function selectWASaway() {
	awayTeamSelect = 29;
	//console.log(`${teamsArray[12].teamName} selected as home team!`);
	toggleActiveAwayTeam(teamsArray);
}

// Adding default rosters to each teams
atl.roster.push(pl1, pl2, pl3, pl4, pl5, pl6, pl7, pl8, pl9, pl10, pl11, pl12, pl13, pl14, pl15, pl16, pl17, pl19);
bos.roster.push(pl18, pl20, pl21, pl22, pl23, pl24, pl25, pl26, pl27, pl28, pl29, pl30, pl31, pl32);
bkn.roster.push(pl33, pl34, pl35, pl36, pl37, pl38, pl39, pl40, pl41, pl42, pl43, pl44, pl45, pl46, pl47, pl48, pl49, pl50);
cho.roster.push(pl52, pl53, pl54, pl55, pl56, pl57, pl58, pl59, pl60, pl61, pl62, pl63, pl64, pl65, pl66, pl67);
chi.roster.push(pl68, pl69, pl70, pl71, pl72, pl73, pl74, pl75, pl76, pl77, pl78, pl79, pl80, pl81, pl82, pl83, pl84);
cle.roster.push(pl85, pl86, pl87, pl88, pl89, pl90, pl91, pl92, pl93, pl94, pl95, pl96, pl97, pl98, pl99, pl100);
dal.roster.push(pl213, pl102, pl103, pl104, pl105, pl106, pl107, pl223, pl109, pl110, pl111, pl112, pl113, pl114, pl115, pl116, pl117);
den.roster.push(pl118, pl119, pl120, pl121, pl122, pl123, pl124, pl125, pl126, pl127, pl128, pl129, pl130, pl131, pl132, pl133, pl134);
det.roster.push(pl135, pl136, pl137, pl138, pl139, pl140, pl141, pl142, pl143, pl144, pl145, pl146, pl147, pl148, pl149, pl150);
gs.roster.push(pl151, pl152, pl153, pl154, pl155, pl156, pl157, pl158, pl159, pl160, pl161, pl162, pl163, pl164, pl165, pl166);
hou.roster.push(pl167, pl168, pl169, pl170, pl171, pl172, pl173, pl174, pl175, pl176, pl177, pl178, pl501);
ind.roster.push(pl179, pl180, pl181, pl182, pl183, pl184, pl185, pl186, pl187, pl188, pl189, pl190, pl191, pl192, pl193, pl194, pl195);
lac.roster.push(pl196, pl197, pl198, pl199, pl200, pl201, pl202, pl203, pl204, pl205, pl206, pl207, pl208, pl209, pl210, pl211);
lal.roster.push(pl212,pl101,pl214,pl215,pl216,pl217,pl218,pl219,pl220,pl221,pl222,pl108,pl224,pl225,pl226,pl227);
mem.roster.push(pl228,pl229,pl230,pl231,pl232,pl233,pl234,pl235,pl236,pl237,pl238,pl239,pl240,pl241,pl242);
mia.roster.push(pl243,pl244,pl245,pl246,pl247,pl248,pl249,pl250,pl251,pl252,pl253,pl254,pl255,pl256,pl257);
mil.roster.push(pl258,pl259,pl260,pl261,pl262,pl263,pl264,pl265,pl266,pl267,pl268,pl269,pl270,pl271,pl272,pl273);
min.roster.push(pl276,pl277,pl278,pl279,pl280,pl281,pl282,pl283,pl284,pl285,pl286,pl287,pl288,pl289,pl290,pl291,pl292,pl293);
nop.roster.push(pl294,pl295,pl296,pl297,pl298,pl299,pl300,pl301,pl302,pl303,pl304,pl305,pl306,pl307,pl308,pl309,pl310,pl311);
nyk.roster.push(pl312,pl313,pl314,pl315,pl316,pl317,pl318,pl319,pl320,pl321,pl322,pl323,pl324,pl325,pl326);
okc.roster.push(pl327,pl328,pl329,pl330,pl331,pl332,pl333,pl334,pl335,pl336,pl337,pl338,pl339,pl340,pl341,pl342,pl343,pl344);
orl.roster.push(pl345,pl346,pl347,pl348,pl349,pl350,pl351,pl352,pl353,pl354,pl355,pl356,pl357,pl358,pl359,pl360,pl361);
phi.roster.push(pl362,pl363,pl364,pl365,pl366,pl367,pl368,pl369,pl370,pl371,pl372,pl373,pl374,pl375,pl376,pl377,pl378);
phx.roster.push(pl379,pl380,pl381,pl382,pl383,pl384,pl385,pl386,pl387,pl388,pl389,pl390,pl391,pl392,pl393,pl394,pl395);
por.roster.push(pl396,pl397,pl398,pl399,pl400,pl401,pl402,pl403,pl404,pl405,pl406,pl407,pl408,pl409,pl410,pl411,pl412,pl413);
sac.roster.push(pl414,pl415,pl416,pl417,pl418,pl419,pl420,pl421,pl422,pl423,pl424,pl425,pl426,pl427,pl428,pl429,pl430);
sas.roster.push(pl431,pl432,pl433,pl434,pl435,pl436,pl437,pl438,pl439,pl440,pl441,pl442,pl443,pl444,pl445,pl446,pl447);
tor.roster.push(pl448,pl449,pl450,pl451,pl452,pl453,pl454,pl455,pl456,pl457,pl458,pl459,pl460,pl461,pl462,pl463,pl464);
uta.roster.push(pl465,pl466,pl467,pl468,pl469,pl470,pl471,pl472,pl473,pl474,pl475,pl476,pl477,pl478,pl479,pl480,pl481,pl482);
was.roster.push(pl483,pl484,pl485,pl486,pl487,pl488,pl489,pl490,pl491,pl492,pl493,pl494,pl495,pl496,pl497,pl498,pl499,pl500);


atl.printRoster();
bos.printRoster();
bkn.printRoster();
cho.printRoster();
chi.printRoster();
cle.printRoster();
dal.printRoster();
den.printRoster();
det.printRoster();
gs.printRoster();
hou.printRoster();
ind.printRoster();
lac.printRoster();
lal.printRoster();
mem.printRoster();
mia.printRoster();
mil.printRoster();
min.printRoster();
nop.printRoster();
nyk.printRoster();
okc.printRoster();
orl.printRoster();
phi.printRoster();
phx.printRoster();
por.printRoster();
sac.printRoster();
sas.printRoster();
tor.printRoster();
uta.printRoster();
was.printRoster();

atl.setLineup();
bos.setLineup();
bkn.setLineup();
cho.setLineup();
chi.setLineup();
cle.setLineup();
dal.setLineup();
den.setLineup();
det.setLineup();
gs.setLineup();
hou.setLineup();
ind.setLineup();
lac.setLineup();
lal.setLineup();
mem.setLineup();
mia.setLineup();
mil.setLineup();
min.setLineup();
nop.setLineup();
nyk.setLineup();
okc.setLineup();
orl.setLineup();
phi.setLineup();
phx.setLineup();
por.setLineup();
sac.setLineup();
sas.setLineup();
tor.setLineup();
uta.setLineup();
was.setLineup();

atl.printLineup();
bos.printLineup();
bkn.printLineup();
cho.printLineup();
chi.printLineup();
cle.printLineup();
dal.printLineup();
den.printLineup();
det.printLineup();
gs.printLineup();
hou.printLineup();
ind.printLineup();
lac.printLineup();
lal.printLineup();
mem.printLineup();
mia.printLineup();
mil.printLineup();
nop.printLineup();
nyk.printLineup();
okc.printLineup();
orl.printLineup();
phi.printLineup();
phx.printLineup();
por.printLineup();
sac.printLineup();
sas.printLineup();
tor.printLineup();
uta.printLineup();
was.printLineup();
/*
atl.getTeamOveral ();
bos.getTeamOveral ();
bkn.getTeamOveral ();
cho.getTeamOveral ();
chi.getTeamOveral ();
cle.getTeamOveral ();
dal.getTeamOveral ();
den.getTeamOveral ();
det.getTeamOveral ();
gs.getTeamOveral ();
hou.getTeamOveral ();
ind.getTeamOveral ();
lac.getTeamOveral ();
lal.getTeamOveral ();
mem.getTeamOveral ();
mia.getTeamOveral ();
mil.getTeamOveral ();
min.getTeamOveral ();
nop.getTeamOveral ();
nyk.getTeamOveral ();
okc.getTeamOveral ();
orl.getTeamOveral ();
phi.getTeamOveral ();
phx.getTeamOveral ();
por.getTeamOveral ();
sac.getTeamOveral ();
sas.getTeamOveral ();
tor.getTeamOveral ();
uta.getTeamOveral ();
was.getTeamOveral ();
*/
let gm1 = new Game(12, 5);
let gm2 = new Game(12, 5);

// -------- FUNCTION TO SIMULATE A GAME
let gameSimulation = function (homeTeamSelect, awayTeamSelect, gameType) { // 1 - excebition game; 2 - season game; 3 - playoff game
	 console.log('GAME SIMULATED');

	//  runs SIM GAME function and saves all stats in four arrays
	  let [homeTeamStats, awayTeamStats, homePlayerStats, awayPlayerStats] = gm1.playGame(teamsArray[homeTeamSelect], teamsArray[awayTeamSelect]);
	  console.log(homeTeamStats);
	  console.log(awayTeamStats);
	  
	  // --- Puts in table home / away player stats 
	  //ads WIN / LOSE to treams
	if  (gameType == 2) {
	 
		if (homeTeamStats[0] > awayTeamStats [0]){
			console.log(`Home team wins!`);
			teamsArray[homeTeamSelect].winLose[0]++;
			teamsArray[awayTeamSelect].winLose[1]++;
		} else if(awayTeamStats[0] >  homeTeamStats[0]){
			console.log(`Away team wins!`);
			teamsArray[awayTeamSelect].winLose[0]++;
			teamsArray[homeTeamSelect].winLose[1]++;
		} else {
			console.log(`ERROR or TIE`);
		}
		sortLeagueTable(); //calculates and prints TEAM TABLE % after each game sim

		sortPlayerGameRecord (homeTeamSelect, homePlayerStats); 
		sortPlayerGameRecord (awayTeamSelect, awayPlayerStats);
		
		updatePlayerPersonalRecords (homeTeamSelect, homePlayerStats);
		updatePlayerPersonalRecords (awayTeamSelect, awayPlayerStats);
	 
		 // adds each teams stats to total
		for(let i = 1; i <= 16; i++){
			teamsArray[homeTeamSelect].statsTotal[i] += homeTeamStats[i-1];
			teamsArray[awayTeamSelect].statsTotal[i] += awayTeamStats[i-1];
		}
		teamsArray[homeTeamSelect].statsTotal[17] += awayTeamStats[0]; // adds allowed point for each team
		teamsArray[awayTeamSelect].statsTotal[17] += homeTeamStats[0]; // adds allowed point for each team

		// --- Puts in table home / away player+team average stats 
		document.getElementById(`team-0-tot`).textContent = teamsArray[homeTeamSelect].teamName;
		document.getElementById(`tm0-1-tot`).textContent = (teamsArray[homeTeamSelect].statsTotal[1] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm0-2-tot`).textContent = (teamsArray[homeTeamSelect].statsTotal[2] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm0-3-tot`).textContent = ((teamsArray[homeTeamSelect].statsTotal[2]+teamsArray[homeTeamSelect].statsTotal[3]) / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm0-4-tot`).textContent = (teamsArray[homeTeamSelect].statsTotal[4] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm0-5-tot`).textContent = (teamsArray[homeTeamSelect].statsTotal[5] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm0-6-tot`).textContent = (teamsArray[homeTeamSelect].statsTotal[6] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm0-7-tot`).textContent = (teamsArray[homeTeamSelect].statsTotal[7] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm0-8-tot`).textContent = `${(teamsArray[homeTeamSelect].statsTotal[9] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2)} / ${(teamsArray[homeTeamSelect].statsTotal[10] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2)}`;
		document.getElementById(`tm0-9-tot`).textContent = `${(teamsArray[homeTeamSelect].statsTotal[11] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2)} / ${(teamsArray[homeTeamSelect].statsTotal[12] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2)}`;
		document.getElementById(`tm0-10-tot`).textContent = `${(teamsArray[homeTeamSelect].statsTotal[13] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2)} / ${(teamsArray[homeTeamSelect].statsTotal[14] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2)}`;
		document.getElementById(`tm0-11-tot`).textContent = `${(teamsArray[homeTeamSelect].statsTotal[15] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2)} / ${(teamsArray[homeTeamSelect].statsTotal[16] / teamsArray[homeTeamSelect].statsTotal[0]).toFixed(2)}`;
		
		document.getElementById(`team-1-tot`).textContent = teamsArray[awayTeamSelect].teamName;
		document.getElementById(`tm1-1-tot`).textContent = (teamsArray[awayTeamSelect].statsTotal[1] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm1-2-tot`).textContent = (teamsArray[awayTeamSelect].statsTotal[2] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm1-3-tot`).textContent = ((teamsArray[awayTeamSelect].statsTotal[2]+teamsArray[awayTeamSelect].statsTotal[3]) / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm1-4-tot`).textContent = (teamsArray[awayTeamSelect].statsTotal[4] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm1-5-tot`).textContent = (teamsArray[awayTeamSelect].statsTotal[5] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm1-6-tot`).textContent = (teamsArray[awayTeamSelect].statsTotal[6] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm1-7-tot`).textContent = (teamsArray[awayTeamSelect].statsTotal[7] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2);
		document.getElementById(`tm1-8-tot`).textContent = `${(teamsArray[awayTeamSelect].statsTotal[9] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2)} / ${(teamsArray[awayTeamSelect].statsTotal[10] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2)}`;
		document.getElementById(`tm1-9-tot`).textContent = `${(teamsArray[awayTeamSelect].statsTotal[11] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2)} / ${(teamsArray[awayTeamSelect].statsTotal[12] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2)}`;
		document.getElementById(`tm1-10-tot`).textContent = `${(teamsArray[awayTeamSelect].statsTotal[13] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2)} / ${(teamsArray[awayTeamSelect].statsTotal[14] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2)}`;
		document.getElementById(`tm1-11-tot`).textContent = `${(teamsArray[awayTeamSelect].statsTotal[15] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2)} / ${(teamsArray[awayTeamSelect].statsTotal[16] / teamsArray[awayTeamSelect].statsTotal[0]).toFixed(2)}`;

		for (let i = 0; i<12; i++){
			document.getElementById(`pl${i}-0-tot`).textContent = teamsArray[homeTeamSelect].lineup[i].name;
			document.getElementById(`pl${i}-1-tot`).textContent = (teamsArray[homeTeamSelect].lineup[i].statsTotal[1] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-2-tot`).textContent = (teamsArray[homeTeamSelect].lineup[i].statsTotal[2] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-3-tot`).textContent = ((teamsArray[homeTeamSelect].lineup[i].statsTotal[2]+teamsArray[homeTeamSelect].lineup[i].statsTotal[3]) / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-4-tot`).textContent = (teamsArray[homeTeamSelect].lineup[i].statsTotal[4] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-5-tot`).textContent = (teamsArray[homeTeamSelect].lineup[i].statsTotal[5] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-6-tot`).textContent = (teamsArray[homeTeamSelect].lineup[i].statsTotal[6] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-7-tot`).textContent = (teamsArray[homeTeamSelect].lineup[i].statsTotal[7] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-8-tot`).textContent = `${(teamsArray[homeTeamSelect].lineup[i].statsTotal[9] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2)} / ${(teamsArray[homeTeamSelect].lineup[i].statsTotal[10] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2)}`;
			document.getElementById(`pl${i}-9-tot`).textContent = `${(teamsArray[homeTeamSelect].lineup[i].statsTotal[11] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2)} / ${(teamsArray[homeTeamSelect].lineup[i].statsTotal[12] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2)}`;
			document.getElementById(`pl${i}-10-tot`).textContent = `${(teamsArray[homeTeamSelect].lineup[i].statsTotal[13] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2)} / ${(teamsArray[homeTeamSelect].lineup[i].statsTotal[14] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2)}`;
			document.getElementById(`pl${i}-11-tot`).textContent = `${(teamsArray[homeTeamSelect].lineup[i].statsTotal[15] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2)} / ${(teamsArray[homeTeamSelect].lineup[i].statsTotal[16] / teamsArray[homeTeamSelect].lineup[i].statsTotal[0]).toFixed(2)}`;
		  
			document.getElementById(`pl${i}-2-0-tot`).textContent = teamsArray[awayTeamSelect].lineup[i].name;
			document.getElementById(`pl${i}-2-1-tot`).textContent = (teamsArray[awayTeamSelect].lineup[i].statsTotal[1] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-2-2-tot`).textContent = (teamsArray[awayTeamSelect].lineup[i].statsTotal[2] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-2-3-tot`).textContent = ((teamsArray[awayTeamSelect].lineup[i].statsTotal[2]+teamsArray[awayTeamSelect].lineup[i].statsTotal[3]) / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-2-4-tot`).textContent = (teamsArray[awayTeamSelect].lineup[i].statsTotal[4] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-2-5-tot`).textContent = (teamsArray[awayTeamSelect].lineup[i].statsTotal[5] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-2-6-tot`).textContent = (teamsArray[awayTeamSelect].lineup[i].statsTotal[6] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-2-7-tot`).textContent = (teamsArray[awayTeamSelect].lineup[i].statsTotal[7] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2);
			document.getElementById(`pl${i}-2-8-tot`).textContent = `${(teamsArray[awayTeamSelect].lineup[i].statsTotal[9] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2)} / ${(teamsArray[awayTeamSelect].lineup[i].statsTotal[10] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2)}`;
			document.getElementById(`pl${i}-2-9-tot`).textContent = `${(teamsArray[awayTeamSelect].lineup[i].statsTotal[11] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2)} / ${(teamsArray[awayTeamSelect].lineup[i].statsTotal[12] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2)}`;
			document.getElementById(`pl${i}-2-10-tot`).textContent = `${(teamsArray[awayTeamSelect].lineup[i].statsTotal[13] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2)} / ${(teamsArray[awayTeamSelect].lineup[i].statsTotal[14] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2)}`;
			document.getElementById(`pl${i}-2-11-tot`).textContent = `${(teamsArray[awayTeamSelect].lineup[i].statsTotal[15] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2)} / ${(teamsArray[awayTeamSelect].lineup[i].statsTotal[16] / teamsArray[awayTeamSelect].lineup[i].statsTotal[0]).toFixed(2)}`;
		 
			sortLeaguePlayerStats();
		}
	}
			// Puts in table last games stats
	  for(let i = 0; i<12; i++){
		document.getElementById(`pl${i}-0`).textContent = teamsArray[homeTeamSelect].lineup[i].name;
		document.getElementById(`pl${i}-1`).textContent = homePlayerStats[i][0];
		document.getElementById(`pl${i}-2`).textContent = homePlayerStats[i][1];
		document.getElementById(`pl${i}-3`).textContent = homePlayerStats[i][1]+homePlayerStats[i][2];
		document.getElementById(`pl${i}-4`).textContent = homePlayerStats[i][3];
		document.getElementById(`pl${i}-5`).textContent = homePlayerStats[i][4];
		document.getElementById(`pl${i}-6`).textContent = homePlayerStats[i][5];
		document.getElementById(`pl${i}-7`).textContent = homePlayerStats[i][6];
		document.getElementById(`pl${i}-8`).textContent = `${homePlayerStats[i][8]}/${homePlayerStats[i][9]}`;
		document.getElementById(`pl${i}-9`).textContent = `${homePlayerStats[i][10]}/${homePlayerStats[i][11]}`;
		document.getElementById(`pl${i}-10`).textContent = `${homePlayerStats[i][12]}/${homePlayerStats[i][13]}`;
		document.getElementById(`pl${i}-11`).textContent = `${homePlayerStats[i][14]}/${homePlayerStats[i][15]}`;

		document.getElementById(`pl${i}-2-0`).textContent = teamsArray[awayTeamSelect].lineup[i].name;
		document.getElementById(`pl${i}-2-1`).textContent = awayPlayerStats[i][0];
		document.getElementById(`pl${i}-2-2`).textContent = awayPlayerStats[i][1];
		document.getElementById(`pl${i}-2-3`).textContent = awayPlayerStats[i][1]+awayPlayerStats[i][2];
		document.getElementById(`pl${i}-2-4`).textContent = awayPlayerStats[i][3];
		document.getElementById(`pl${i}-2-5`).textContent = awayPlayerStats[i][4];
		document.getElementById(`pl${i}-2-6`).textContent = awayPlayerStats[i][5];
		document.getElementById(`pl${i}-2-7`).textContent = awayPlayerStats[i][6];
		document.getElementById(`pl${i}-2-8`).textContent = `${awayPlayerStats[i][8]}/${awayPlayerStats[i][9]}`;
		document.getElementById(`pl${i}-2-9`).textContent = `${awayPlayerStats[i][10]}/${awayPlayerStats[i][11]}`;
		document.getElementById(`pl${i}-2-10`).textContent = `${awayPlayerStats[i][12]}/${awayPlayerStats[i][13]}`;
		document.getElementById(`pl${i}-2-11`).textContent = `${awayPlayerStats[i][14]}/${awayPlayerStats[i][15]}`;
	  }
	 // --- Puts in table home / away team stats 
		document.getElementById(`team-0`).textContent = teamsArray[homeTeamSelect].teamName;
		document.getElementById(`tm0-1`).textContent = homeTeamStats[0];
		document.getElementById(`tm0-2`).textContent = homeTeamStats[1];
		document.getElementById(`tm0-3`).textContent = homeTeamStats[1]+homeTeamStats[2];
		document.getElementById(`tm0-4`).textContent = homeTeamStats[3];
		document.getElementById(`tm0-5`).textContent = homeTeamStats[4];
		document.getElementById(`tm0-6`).textContent = homeTeamStats[5];
		document.getElementById(`tm0-7`).textContent = homeTeamStats[6];
		document.getElementById(`tm0-8`).textContent = `${homeTeamStats[8]}/${homeTeamStats[9]}`;
		document.getElementById(`tm0-9`).textContent = `${homeTeamStats[10]}/${homeTeamStats[11]}`;
		document.getElementById(`tm0-10`).textContent = `${homeTeamStats[12]}/${homeTeamStats[13]}`;
		document.getElementById(`tm0-11`).textContent = `${homeTeamStats[14]}/${homeTeamStats[15]}`;
		
		document.getElementById(`team-1`).textContent = teamsArray[awayTeamSelect].teamName;
		document.getElementById(`tm1-1`).textContent = awayTeamStats[0];
		document.getElementById(`tm1-2`).textContent = awayTeamStats[1];
		document.getElementById(`tm1-3`).textContent = awayTeamStats[1]+awayTeamStats[2];
		document.getElementById(`tm1-4`).textContent = awayTeamStats[3];
		document.getElementById(`tm1-5`).textContent = awayTeamStats[4];
		document.getElementById(`tm1-6`).textContent = awayTeamStats[5];
		document.getElementById(`tm1-7`).textContent = awayTeamStats[6];
		document.getElementById(`tm1-8`).textContent = `${awayTeamStats[8]}/${awayTeamStats[9]}`;
		document.getElementById(`tm1-9`).textContent = `${awayTeamStats[10]}/${awayTeamStats[11]}`;
		document.getElementById(`tm1-10`).textContent = `${awayTeamStats[12]}/${awayTeamStats[13]}`;
		document.getElementById(`tm1-11`).textContent = `${awayTeamStats[14]}/${awayTeamStats[15]}`;
		
		if  (gameType == 3) {
			return [homeTeamStats, awayTeamStats, homePlayerStats, awayPlayerStats];
		}
}

// puts player records in each player personal record array
const updatePlayerPersonalRecords = function(teamSelect, playerStatsArray) {
	let totalStatLeaderList = [];
	let playerCounter = 0;
	
	for (let i =0; i < 5; i++) {
		teamsArray[teamSelect].lineup[i].statsTotal[25]++; // adds Games Started + 1 for each starter
		teamsArray[teamSelect].lineup[i].statsTotalByYear[teamsArray[teamSelect].lineup[i].statRowNumber][26]++; // update games Started  +1
	}
	
	for(let i = 0; i < 12; i++) { //  12  vietā vajadzētu būt - teamsArray[teamSelect].lineup[i].length
	
		teamsArray[teamSelect].lineup[i].statsTotal[0]++; // adds game played for players
		teamsArray[teamSelect].lineup[i].statsTotalByYear[teamsArray[teamSelect].lineup[i].statRowNumber][1]++; // adds game played for players
		teamsArray[teamSelect].lineup[i].statsTotalByYear[teamsArray[teamSelect].lineup[i].statRowNumber][0] = currentYear;

		for (let x = 1; x < 24; x++) {
			teamsArray[teamSelect].lineup[i].statsTotal[x] += playerStatsArray[i][x-1]; // adds stats from game to total player stats
			teamsArray[teamSelect].lineup[i].statsTotalByYear[teamsArray[teamSelect].lineup[i].statRowNumber][x+1] += playerStatsArray[i][x-1]; // adds stats from game to total player stats
		}
	
		for (let j = 0; j < 21; j++){
			if (teamsArray[teamSelect].lineup[i].playerRecords[j] < playerStatsArray[i][j]) {
					teamsArray[teamSelect].lineup[i].playerRecords[j] = playerStatsArray[i][j];
			}
		}
	}

			//  ----------->>> Updates Total stats TOP10 stat modal
	for(let i=0; i < 12; i++){
		for(let j = 0; j < nba1GameRecordsTotal.length; j++){
			// NBA record array  ---  pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA, RebTot,fgMade,fgAt, 2ptsFgM,2ptsFgAt  + currentYear + Player Name
			// playerStatsArray  ---  pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA
			
			let playerInListUpdated = 0;
			for (let y = 0; y < 10; y++){
				if(nba1GameRecordsTotal[j][y][0] == teamsArray[teamSelect].lineup[i].id){
					nba1GameRecordsTotal[j][y][1] += playerStatsArray[i][j];
					playerInListUpdated = 1;
				}
			} 
			if (playerInListUpdated == 0){
				//console.log(`${teamsArray[teamSelect].lineup[i].name} is not on ${j}th stat list!`)
				if (nba1GameRecordsTotal[j][9][1] < teamsArray[teamSelect].lineup[i].statsTotal[j+1]){  // adds first player record
					nba1GameRecordsTotal[j][9][0] = teamsArray[teamSelect].lineup[i].id;
					nba1GameRecordsTotal[j][9][1] = teamsArray[teamSelect].lineup[i].statsTotal[j+1];
					nba1GameRecordsTotal[j][9][2] = teamsArray[teamSelect].lineup[i].name;
				}	
			}
			
			for (let x = nba1GameRecordsTotal[0].length-1; x > 0; x--){ // goes through all player stats and updates all records so they are top 10 best
				//console.log(`10th - ${nba1GameRecordsTotal[j][x][1]} <>  9th - ${nba1GameRecordsTotal[j][x-1][1]}`);
				if (nba1GameRecordsTotal[j][x][1] > nba1GameRecordsTotal[j][x-1][1]){

					let temp1 = nba1GameRecordsTotal[j][x-1][0];
					let temp2 = nba1GameRecordsTotal[j][x-1][1];
					let temp3 = nba1GameRecordsTotal[j][x-1][2];
					
					nba1GameRecordsTotal[j][x-1][0] = nba1GameRecordsTotal[j][x][0]; //id
					nba1GameRecordsTotal[j][x-1][1] = nba1GameRecordsTotal[j][x][1]; //stat
					nba1GameRecordsTotal[j][x-1][2] = nba1GameRecordsTotal[j][x][2]; //player name
					
					nba1GameRecordsTotal[j][x][0] = temp1;
					nba1GameRecordsTotal[j][x][1] = temp2;
					nba1GameRecordsTotal[j][x][2] = temp3;
				}
			}
		}
	}
	
}

//Array to update/sort player records for each category
const sortPlayerGameRecord = function (teamSelect, playerStatsArray){
	
	teamsArray[teamSelect].statsTotal[0]++; // adds game played for a team
	
	for(let i=0; i < 12; i++){
		for(let j = 0; j < nba1GameRecords.length; j++){
			// NBA record array  ---  pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA, RebTot,fgMade,fgAt, 2ptsFgM,2ptsFgAt  + currentYear + Player Name
			// playerStatsArray  ---  pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA
				
			if (nba1GameRecords[j][9][0] < playerStatsArray[i][j]){  // adds first player record
				nba1GameRecords[j][9][0] = playerStatsArray[i][j];
				nba1GameRecords[j][9][1] = currentYear;
				nba1GameRecords[j][9][2] = teamsArray[teamSelect].lineup[i].name;
			}			

			for (let x = nba1GameRecords[0].length-1; x > 0; x--){ // goes through all player stats and updates all records so they are top 10 best
				if (nba1GameRecords[j][x][0] > nba1GameRecords[j][x-1][0]){

					let temp1 = nba1GameRecords[j][x-1][0];
					let temp2 = nba1GameRecords[j][x-1][1];
					let temp3 = nba1GameRecords[j][x-1][2];
					
					nba1GameRecords[j][x-1][0] = nba1GameRecords[j][x][0];
					nba1GameRecords[j][x-1][1] = nba1GameRecords[j][x][1];
					nba1GameRecords[j][x-1][2] = nba1GameRecords[j][x][2];
					
					nba1GameRecords[j][x][0] = temp1;
					nba1GameRecords[j][x][1] = temp2;
					nba1GameRecords[j][x][2] = temp3;
				}
			}
		}
	}
}


//  Button to SIMULATE a game
const simGame = document.querySelector('.btn-simGame');
simGame.addEventListener('click', function(){
  console.log('GAME SIMULATED');
  
  gameSimulation (homeTeamSelect, awayTeamSelect, 1);  // 1 - means that stats will not be counted for tems and players in total

});


// Calculates player averages and puts in league leader tables 
let sortLeaguePlayerStats = function (){
	ppgLeaderList = [];
	let playerCounter = 0;
	for (let y = 0; y < teamsArray.length; y++){ // loops all teams
		for(let x = 0; x < teamsArray[y].roster.length; x++){ // loops all y team players
			if (teamsArray[y].roster[x].statsTotalByYear[teamsArray[y].roster[x].statRowNumber][0] == currentYear) { // if a game is played in current year season
				ppgLeaderList.push(teamsArray[y].roster[x]);
				if(ppgLeaderList[playerCounter].statsTotal[0] != 0){
					// pts/reb/ast/stl/blk/fg/pt3/ft
					//gm,pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA
					//  statsTotalByYear = []; year-, games,pts,oreb,dreb,ast, stl,blk,to,fouls,insM, insA,2ptM,2ptA,3ptM,3ptA, ftM,ftA,RebTot,fgMade,fgAt, 2ptsFgM,2ptsFgAt,double,triple,quadriple, gamesStarted
					//ppgLeaderList[playerCounter].perGameStats[0] = parseFloat((ppgLeaderList[playerCounter].statsTotal[1] / ppgLeaderList[playerCounter].statsTotal[0]).toFixed(2));
					//ppgLeaderList[playerCounter].perGameStats[1] = parseFloat(((ppgLeaderList[playerCounter].statsTotal[2]+ppgLeaderList[playerCounter].statsTotal[3]) / ppgLeaderList[playerCounter].statsTotal[0]).toFixed(2));
					//ppgLeaderList[playerCounter].perGameStats[2] = parseFloat((ppgLeaderList[playerCounter].statsTotal[4] / ppgLeaderList[playerCounter].statsTotal[0]).toFixed(2));
					//ppgLeaderList[playerCounter].perGameStats[3] = parseFloat((ppgLeaderList[playerCounter].statsTotal[5] / ppgLeaderList[playerCounter].statsTotal[0]).toFixed(2));
					//ppgLeaderList[playerCounter].perGameStats[4] = parseFloat((ppgLeaderList[playerCounter].statsTotal[6] / ppgLeaderList[playerCounter].statsTotal[0]).toFixed(2));
					ppgLeaderList[playerCounter].perGameStats[0] = parseFloat((ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][2] / ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][1]  ).toFixed(2));
					ppgLeaderList[playerCounter].perGameStats[1] = parseFloat(((ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][3]+ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][4]) / ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][1]).toFixed(2));
					ppgLeaderList[playerCounter].perGameStats[2] = parseFloat((ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][5] / ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][1]).toFixed(2));
					ppgLeaderList[playerCounter].perGameStats[3] = parseFloat((ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][6] / ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][1]).toFixed(2));
					ppgLeaderList[playerCounter].perGameStats[4] = parseFloat((ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][7] / ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][1]).toFixed(2));
					ppgLeaderList[playerCounter].perGameStats[5] = parseFloat((((ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][19]) / (ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][20]))*100).toFixed(2));
					// set 3 pointer % for each player
					if (ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][14] !== 0){
						ppgLeaderList[playerCounter].perGameStats[6] = parseFloat(((ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][14] / ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][15])*100).toFixed(2));
					} else {
						ppgLeaderList[playerCounter].perGameStats[6] = 0;
					}
					// set Free Throw % for each player
					if (ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][16] !== 0){
						ppgLeaderList[playerCounter].perGameStats[7] = parseFloat(((ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][16] / ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][17])*100).toFixed(2));
					} else {
						ppgLeaderList[playerCounter].perGameStats[7] = 0;
					}

					ppgLeaderList[playerCounter].perGameStats[8] = Math.round((
					(ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][19])*85.910 // FG made total
					+ ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][6]*53.897 // Steals total
					+ ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][14]*51.757 // 3PT made total
					+ ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][16]*46.845 // FT made total
					+ ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][7]*39.190 // blocks total
					+ ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][3]*39.190 // Off reb total
					+ ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][4]*14.707 // Def reb total
					+ ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][5]*34.677 // Assists total
					- ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][8]*53.897 // TO total
					- (ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][17] - ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][16])*20.091 // FT missed total
					- (ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][20] - ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][19] )*39.190 // FG missed total
					//) * (1 / (teamsArray[y].minutes[x]*ppgLeaderList[playerCounter].statsTotal[0]));
					) / 20 / ppgLeaderList[playerCounter].statsTotalByYear[ppgLeaderList[playerCounter].statRowNumber][1]);
					
					
					ppgLeaderList[playerCounter].PER = ppgLeaderList[playerCounter].perGameStats[8];
					
					//console.log(`${ppgLeaderList[playerCounter].name}: ${ppgLeaderList[playerCounter].perGameStats[0]}`);
					//console.log(`${ppgLeaderList[playerCounter].name}: ${ppgLeaderList[playerCounter].perGameStats[1]}`);
					//console.log(`${ppgLeaderList[playerCounter].name}: ${ppgLeaderList[playerCounter].perGameStats[5]}%`);
					//console.log(`${ppgLeaderList[playerCounter].name}: ${ppgLeaderList[playerCounter].perGameStats[6]}%`);
					//console.log(`${ppgLeaderList[playerCounter].name}: ${ppgLeaderList[playerCounter].perGameStats[7]}%`);
					//console.log(`${ppgLeaderList[playerCounter].name} - PER: ${ppgLeaderList[playerCounter].PER}`);
				}
				playerCounter++;
			}
		}
	}
	// finds top10 players in each stat and puts in a HTML table
	for(let iteStatType = 0; iteStatType <9; iteStatType++){
		for (let i = 0; i < ppgLeaderList.length; i++) {
		  for (let j = 0; j < ppgLeaderList.length - 1; j++) {
			//(this.roster.length - i -1)

			if (ppgLeaderList[j].perGameStats[iteStatType] < ppgLeaderList[j + 1].perGameStats[iteStatType]) {
			  // If the condition is true then swap them
			  let temp = ppgLeaderList[j];
			  ppgLeaderList[j] = ppgLeaderList[j + 1];
			  ppgLeaderList[j + 1] = temp;
			}
		  }
		}
		for(let it = 0; it < 10; it++){
			document.getElementById(`${iteStatType+1}pg${it+1}`).textContent = ppgLeaderList[it].name;
			document.getElementById(`${iteStatType+1}pg${it+1}-0`).textContent = ppgLeaderList[it].perGameStats[iteStatType];
		}
	}
}

// Function to sort and put in a table team records
let sortLeagueTable = function (){
	let allTeamTable = [];
	
	for (let i = 0; i < teamsArray.length; i++){
		allTeamTable.push(teamsArray[i]);
		if(allTeamTable[i].winLose[0] != 0){
			allTeamTable[i].winLose[2] = parseFloat(((allTeamTable[i].winLose[0] / (allTeamTable[i].winLose[0] + allTeamTable[i].winLose[1]))* 100).toFixed(2)); 
		} else {
			allTeamTable[i].winLose[2] = 0;
		}
		console.log(`WIN PERCENTAGE: ${allTeamTable[i].winLose[2]}`);
	}
	
	for (let i = 0; i < allTeamTable.length; i++) {
		  for (let j = 0; j < allTeamTable.length - 1; j++) {

			if (allTeamTable[j].winLose[2] < allTeamTable[j+1].winLose[2]) {
			  // If the condition is true then swap them
			  let temp = allTeamTable[j];
			  allTeamTable[j] = allTeamTable[j + 1];
			  allTeamTable[j + 1] = temp;
			}
		  }
	}
	
	for (let j = 0; j < allTeamTable.length; j++){
		document.getElementById(`lead${j+1}`).textContent = allTeamTable[j].teamName;
		document.getElementById(`lead${j+1}`).style.backgroundColor = '';
		document.getElementById(`lead${j+1}-0`).textContent = allTeamTable[j].winLose[0];
		document.getElementById(`lead${j+1}-1`).textContent = allTeamTable[j].winLose[1];
		document.getElementById(`lead${j+1}-2`).textContent = allTeamTable[j].winLose[2]+"%";
		draftOrder[j] = allTeamTable[j];
		if (allTeamTable[j].teamName == userTeam.teamName){
			document.getElementById(`lead${j+1}`).style.backgroundColor = '#E4E4E4';
		}
	}
}

// Button to update leader stats
const showLeaders = document.querySelector('.btn-showLeaders');
showLeaders.addEventListener('click', function(){
	sortLeaguePlayerStats();
});

let updateSimSeasonProgress = function (gamesCount){
	document.querySelector('.simSeasonProgresModal-content-update').style.width = `${parseFloat((gamesCount / 870) * 100).toFixed(0)}%`;
	document.querySelector('.simSeasonPercent').textContent = `${parseFloat((gamesCount / 870) * 100).toFixed(0)} %`;
	
};

//FUNCTION ---->   simulates multiple games for each team
const simSeason = document.querySelector('.btn-simSeason');
simSeason.addEventListener('click', function() {
	
	// clears statsTotal, perGameSTats and PER for each player 
	areAllSeasonGamesPlayed = false;
	for (let i = 0; i < teamsArray.length; i++){
		teamsArray[i].winLose[0] = 0;
		teamsArray[i].winLose[1] = 0;
		teamsArray[i].winLose[2] = 0;
		for (let j = 0; j < teamsArray[i].lineup.length; j++){
			//for (let x = 0; x < pl1.statsTotal.length; x++){
			//	teamsArray[i].lineup[j].statsTotal[x] = 0;
			//}
			for (let x = 0; x < pl1.perGameStats.length; x++){
				teamsArray[i].lineup[j].perGameStats[x] = 0;
			}
			teamsArray[i].lineup[j].PER = 0;
			
			// increases stat rows for each season for player info modul
			teamsArray[i].lineup[j].statRowNumber++;
			//updates number of seasons player has actually pleayed at least 1 game so it can be added in player stats page year by year
			teamsArray[i].lineup[j].statsTotalByYear.push([0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0]); // [year, games played..... games started]
		}
	}
	
	// ------- Each team plays 2 games - auto simulation at startup
	let gamesCount = 0;
		for (let i=0; i<teamsArray.length; i++){
			for (let j=0; j<teamsArray.length; j++){
				if (i !== j){
					//gameSimulation (i, j, 2); // 2 - means that stats will be counted for teams and players in total etc.
					setTimeout(function(){
						gameSimulation (i, j, 2);
						gamesCount++;
						updateSimSeasonProgress(gamesCount);
						if (gamesCount == 870){
							calculatePlayerAwards(teamsArray);
							//playerDevelopmentEndYear();
							currentYear++;
							areAllSeasonGamesPlayed = true;
							updateStartingPlayoffPicture();
							document.querySelector(".btn-simSeason").style.backgroundColor = "red";
							document.querySelector(".btn-simSeason").disabled = true; 
							document.querySelector(".btn-playoff").style.backgroundColor = "LightGreen"; // indicates next Playoff needs to be simulated
						}
					}, 0);

				}
			}
		}
});

// FUNCTION ----> calculates all individual and all team award winners
let calculatePlayerAwards = function (teamsArray){
	document.querySelector(".playerAwards").textContent = `NBA Player Awards ${currentYear}`;
	// Calculating putting in HTML MVP player
	let mvpCandidatesList = teamsArray[0].roster[0];
	let currentMVPTeam = teamsArray[0];

	for (let i = 0; i<teamsArray.length; i++){
		for (let j = 0; j<teamsArray[i].roster.length; j++){

			if (teamsArray[i].roster[j].PER + (teamsArray[i].winLose[2]/10) > mvpCandidatesList.PER + (currentMVPTeam.winLose[2]/10)) {
				// If the condition is true then swap them
				mvpCandidatesList = teamsArray[i].roster[j];
				currentMVPTeam = teamsArray[i];
			}
		}
	}
	mvpCandidatesList.playerAwards.push(`${currentYear} - MVP`); // adds MVP award text in player's award variable
	//console.log(`MVP = ${mvpCandidatesList.name} / MVP rating = ${mvpCandidatesList.PER + (currentMVPTeam.winLose[2]/10*2)}`);
	document.getElementById('MVPwinner').textContent = mvpCandidatesList.name;
	for (let i=1; i<= mvpCandidatesList.perGameStats.length-1; i++) {
		document.getElementById(`mvpStat-${i}`).textContent = mvpCandidatesList.perGameStats[i-1];
	}
	
	//Calculating and putting in HTML  Defensive player of the Year
	let defPlayerCandidatesList = teamsArray[0].roster[0];
	
	for (let i = 0; i<teamsArray.length; i++){
		for (let j = 0; j<teamsArray[i].roster.length; j++){
			if ((teamsArray[i].roster[j].perGameStats[3] + teamsArray[i].roster[j].perGameStats[4]) > (defPlayerCandidatesList.perGameStats[3] + defPlayerCandidatesList.perGameStats[4])) {
				// If the condition is true then swap them
				defPlayerCandidatesList = teamsArray[i].roster[j];
			}
		}
	}
	defPlayerCandidatesList.playerAwards.push(`${currentYear} - Defensive Player of the Year`); // adds Def. Pl. award text in player's award variable
	document.getElementById('defensiveWinner').textContent = defPlayerCandidatesList.name;
	for (let i=1; i<= defPlayerCandidatesList.perGameStats.length-1; i++) {
		document.getElementById(`defPlStat-${i}`).textContent = defPlayerCandidatesList.perGameStats[i-1];
	}
	
	//Calculating and putting in HTML  ROOKIE of the year
	let rookieOfTheYear = teamsArray[0].roster[14];
	
	for (let i = 0; i<teamsArray.length; i++){
		for (let j = 0; j<teamsArray[i].roster.length; j++){
			if (teamsArray[i].roster[j].experience == 0){
				if (teamsArray[i].roster[j].PER > rookieOfTheYear.PER) {
					// If the condition is true then swap them
					rookieOfTheYear = teamsArray[i].roster[j];
				}
			}
		}
	}
	rookieOfTheYear.extraDevPoints = 50; // adds extra 30 player development points wor SIM man of the year award
	
	rookieOfTheYear.playerAwards.push(`${currentYear} - Rookie of the Year`); // adds Rookie award text in player's award variable
	document.getElementById('rookieWinner').textContent = rookieOfTheYear.name;
	for (let i=1; i<= rookieOfTheYear.perGameStats.length-1; i++) {
		document.getElementById(`rookPlStat-${i}`).textContent = rookieOfTheYear.perGameStats[i-1];
	}
	
	//Calculating and putting in HTML SIX MAN of the year
	let sixManOfTheYear = teamsArray[0].roster[14];
	
	for (let i = 0; i<teamsArray.length; i++){
		for (let j = 0; j<teamsArray[i].roster.length; j++){
			//console.log(`teamsArray[i].roster[j].totalStats[25] = ${teamsArray[i].roster[j].statsTotal[25]}`);
			if (teamsArray[i].roster[j].statsTotalByYear[ teamsArray[i].roster[j].statRowNumber ][26] < ( teamsArray[i].roster[j].statsTotalByYear[ teamsArray[i].roster[j].statRowNumber ][1] / 2 )){  // if games started in starting 5 is less than half of all games played
			//if (teamsArray[i].roster[j].statsTotal[25] < teamsArray[i].roster[j].statsTotal[0] / 2){ // if games started in starting 5 is less than half of all games played
				if (teamsArray[i].roster[j].PER > sixManOfTheYear.PER) {
					// If the condition is true then swap them
					sixManOfTheYear = teamsArray[i].roster[j];
				}
			}
		}
	}
	sixManOfTheYear.extraDevPoints = 20; // adds extra 30 player development points wor SIM man of the year award
	
	sixManOfTheYear.playerAwards.push(`${currentYear} - SIX Man of the Year`); // adds Six Man award text in player's award variable
	document.getElementById('sixManWinner').textContent = sixManOfTheYear.name;
	for (let i=1; i<= sixManOfTheYear.perGameStats.length-1; i++) {
		document.getElementById(`sixManPlStat-${i}`).textContent = sixManOfTheYear.perGameStats[i-1];
	}	
	
	//Calculating and putting in HTML MOST IMPROVED PLAYER of the year
	let mostImprovedPlayer = teamsArray[0].roster[0];
	let randomTeam = Math.floor(Math.random() * 30 );
	let randomDevelopiongPlayer = Math.floor(Math.random() * teamsArray[randomTeam].roster.length )+1;
	let playerFound = 0;
	do {
	randomDevelopiongPlayer = Math.floor(Math.random() * teamsArray[randomTeam].roster.length );
	if (teamsArray[randomTeam].roster[randomDevelopiongPlayer].age < 30) {  playerFound = 1; }
	} while (playerFound == 0);
	console.log(`MOST IMPROVED PLAYER - ${teamsArray[randomTeam].roster[randomDevelopiongPlayer].name} from ${teamsArray[randomTeam].teamName}`);

	teamsArray[randomTeam].roster[randomDevelopiongPlayer].playerAwards.push(`${currentYear} - Most Improved Player`); // adds Most Improved award text in player's award variable
	
	document.getElementById('mostImprovedWin').textContent = `${teamsArray[randomTeam].roster[randomDevelopiongPlayer].name}  (${teamsArray[randomTeam].teamShort.toUpperCase()})`;
	for (let i=1; i<= teamsArray[randomTeam].roster[randomDevelopiongPlayer].perGameStats.length-1; i++) {
		document.getElementById(`MostImpPlStat-${i}`).textContent = teamsArray[randomTeam].roster[randomDevelopiongPlayer].perGameStats[i-1];
	}
	
	teamsArray[randomTeam].roster[randomDevelopiongPlayer].extraDevPoints = 100;
	
	
	let allNbaForwarders = []; // array of top 9 forwarders
	let allNbaGuards = []; // array of top 6 guards
	let allDefenders = []; // array of top 10 defenders
	let allRookies = []; // array of top 10 rookies
	
	for (let i = 0; i<teamsArray.length; i++){
		for (let j = 0; j<teamsArray[i].roster.length; j++){
			
			// arrange top 9 forwards
			if (teamsArray[i].roster[j].position == 'C' || teamsArray[i].roster[j].position == 'PF' || teamsArray[i].roster[j].position == 'SF'){
				if (allNbaForwarders.length !== 9) {
					allNbaForwarders.push(teamsArray[i].roster[j]);
					allNbaForwarders.sort(function (a, b) {return b.PER - a.PER});
					//points.sort(function(a, b){return b-a});
				} else {
					if (allNbaForwarders[8].PER < teamsArray[i].roster[j].PER) {
						allNbaForwarders[8] = teamsArray[i].roster[j];
						allNbaForwarders.sort(function (a, b) {return b.PER - a.PER});
						//console.log(allNbaForwarders);
					}
				}
			}
			// arrange top 6 guards
			if (teamsArray[i].roster[j].position == 'SG' || teamsArray[i].roster[j].position == 'PG'){
				if (allNbaGuards.length !== 6) {
					allNbaGuards.push(teamsArray[i].roster[j]);
					allNbaGuards.sort(function (a, b) {return b.PER - a.PER});
					//points.sort(function(a, b){return b-a});
				} else {
					if (allNbaGuards[5].PER < teamsArray[i].roster[j].PER) {
						allNbaGuards[5] = teamsArray[i].roster[j];
						allNbaGuards.sort(function (a, b) {return b.PER - a.PER});
						//console.log(allNbaGuards);
						
					}
				}
			}
			// arrange best top 10 defender array
			if (allDefenders.length !== 10) {
				allDefenders.push(teamsArray[i].roster[j]);
				allDefenders.sort(function (a, b) {return (b.perGameStats[3]+b.perGameStats[4]) - (a.perGameStats[3]+a.perGameStats[4])});
			} else {
				if (allDefenders[9].perGameStats[3] + allDefenders[9].perGameStats[4] < teamsArray[i].roster[j].perGameStats[3] + teamsArray[i].roster[j].perGameStats[4]) {
					allDefenders[9] = teamsArray[i].roster[j];
					allDefenders.sort(function (a, b) {return (b.perGameStats[3]+b.perGameStats[4]) - (a.perGameStats[3]+a.perGameStats[4])});
					//console.log(allDefenders);
					
				}
			}
			// arrange top 10 rookies
			if (teamsArray[i].roster[j].experience == 0 && teamsArray[i].roster[j].statsTotalByYear[teamsArray[i].roster[j].statRowNumber][1] > 0){
				if (allRookies.length !== 10) {
					allRookies.push(teamsArray[i].roster[j]);
					allRookies.sort(function (a, b) {return b.PER - a.PER});
					//console.log(...allRookies);
				} else {
					if (allRookies[9].PER < teamsArray[i].roster[j].PER) {
						allRookies[9] = teamsArray[i].roster[j];
						allRookies.sort(function (a, b) {return b.PER - a.PER});
						//console.log(`Rookie list:  ${allRookies}`);
						
					}
				}
			}
		}
	}
	// Fill out HTML all team tables
	let countForwarders = 0;
	let countGuards = 0;
	for (let i=1; i<= 3; i++) {
		for (let j = 1; j <= 3; j++){
			document.getElementById(`${i}-NbaTeamName-${j}`).textContent = allNbaForwarders[countForwarders].name;
			for (let x = 0; x < 8; x++) {
				document.getElementById(`${i}-NbaTeamStat-${j}-${x+1}`).textContent = allNbaForwarders[countForwarders].perGameStats[x];
			}
			allNbaForwarders[countForwarders].playerAwards.push(`${currentYear} - All NBA ${i}. team`); // adds All NBA team text in player's award variable
			countForwarders++;
		}
		for (let j = 4; j <= 5; j++){
			document.getElementById(`${i}-NbaTeamName-${j}`).textContent = allNbaGuards[countGuards].name;
			for (let x = 0; x < 8; x++) {
				document.getElementById(`${i}-NbaTeamStat-${j}-${x+1}`).textContent = allNbaGuards[countGuards].perGameStats[x];
			}
			allNbaGuards[countGuards].playerAwards.push(`${currentYear} - All NBA ${i}. team`); // adds All NBA team text in player's award variable
			countGuards++;
		}
	}
	
	let countDefenders = 0;
	for (let i = 1; i <= 2; i++){
		for (let j = 1; j <= 5; j++){
			document.getElementById(`${i}-DefTeamName-${j}`).textContent = allDefenders[countDefenders].name;
			for (let x = 0; x < 8; x++) {
				//console.log(`allDefenders[countDefenders].perGameStats[x] === ${allDefenders[countDefenders].perGameStats[x]}`);
				document.getElementById(`${i}-DefTeamStat-${j}-${x+1}`).textContent = allDefenders[countDefenders].perGameStats[x];
			}
			allDefenders[countDefenders].playerAwards.push(`${currentYear} - All Defensive ${i}. team`); // adds All Defensive team text in player's award variable
			countDefenders++;
		}
	}
	
	let countRookies = 0;
	for (let i = 1; i <= 2; i++){
		for (let j = 1; j <= 5; j++){
			if (allRookies[countRookies]) {
				document.getElementById(`${i}-RookTeamName-${j}`).textContent = allRookies[countRookies].name;
				for (let x = 0; x < 8; x++) {
					console.log(`RookTeamName[countRookies].perGameStats[x] === ${allRookies[countRookies].perGameStats[x]}`);
					document.getElementById(`${i}-RookTeamStat-${j}-${x+1}`).textContent = allRookies[countRookies].perGameStats[x];
				}
				allRookies[countRookies].playerAwards.push(`${currentYear} - All Rookie ${i}. team`); // adds All Rookie team text in player's award variable
				countRookies++;
			} else {
				document.getElementById(`${i}-RookTeamName-${j}`).textContent = "";
				for (let x = 0; x < 8; x++) {
					document.getElementById(`${i}-RookTeamStat-${j}-${x+1}`).textContent = "";
				}
			}
		}
	}
	
};

let countryRatingsModal = document.querySelector(".displayCountries-modal");
let userTradesModal = document.querySelector(".userTradesModal");
let rookieDraftModal = document.querySelector(".draftRookieModal");
let teamUpgradeModal = document.querySelector(".teamUpgradeModal");
let tradesModal = document.querySelector(".tradesModal");
let mockDraftModal = document.querySelector(".mockDraftModal");
let retiredModal = document.querySelector(".retiredPlayerModal");
let playoffModal = document.querySelector(".playoffModal");
let standings = document.querySelector(".standingsModal");
let roster = document.querySelector(".rosterModal");
let playerInfo = document.querySelector(".playerInfoModal");
let awards = document.querySelector(".modal");
let records = document.querySelector(".recordModal");
let careerTotalStats = document.querySelector(".careerStatModal");
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal  

const showRoster = function (){
	// the fist team roster that is opened always is USER's TEAM
	//currentTeamRoster = userTeam.numberInTeamList;
	roster.style.display = "block";
	
	if (currentTeamRoster === userTeam.numberInTeamList) {
		document.getElementById('teamRoster-userIcon').src = `images/user.png`;
	} else {
		document.getElementById('teamRoster-userIcon').src = ``;
	}
	
	document.getElementById('rosterTitle').textContent = teamsArray[currentTeamRoster].teamName;
	document.getElementById('logo-roster').src = `images/team-roster-icon-${currentTeamRoster+1}.png`;
	for(let i = 1; i <= teamsArray[currentTeamRoster].lineup.length; i++){
		document.getElementsByClassName('rosterTitle').textContent = teamsArray[currentTeamRoster].teamName;
		document.getElementById(`roster-name-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].name;
		document.getElementById(`roster-overal-${i}`).textContent = Math.round(teamsArray[currentTeamRoster].lineup[i-1].overal);
		document.getElementById(`roster-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].position;
		document.getElementById(`roster-sec-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].secPosition;
		document.getElementById(`roster-age-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].age;
		
		if (teamsArray[currentTeamRoster].lineup[i-1].country.length <= 12) {
			document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country;
		} else {
			document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country.slice(0,10) + "...";
		}
		//document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country;
		if (teamsArray[currentTeamRoster].lineup[i-1].experience == 0) {
			document.getElementById(`roster-experience-${i}`).textContent = 'R';
		} else {
			document.getElementById(`roster-experience-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].experience;
		}
	}
};

const nextTeamRoster = function (){
	currentTeamRoster++;
	if (currentTeamRoster > teamsArray.length - 1) currentTeamRoster = 0;
	
	if (currentTeamRoster === userTeam.numberInTeamList) {
		document.getElementById('teamRoster-userIcon').src = `images/user.png`;
	} else {
		document.getElementById('teamRoster-userIcon').src = ``;
	}
	
	//clears roster table before entering current team roster information
	for (i = 1; i <= 18; i++){
		document.getElementById(`roster-name-${i}`).textContent = '';
		document.getElementById(`roster-overal-${i}`).textContent =  '';
		document.getElementById(`roster-position-${i}`).textContent =  '';
		document.getElementById(`roster-sec-position-${i}`).textContent =  '';
		document.getElementById(`roster-age-${i}`).textContent =  '';
		document.getElementById(`roster-country-${i}`).textContent =  '';
		document.getElementById(`roster-experience-${i}`).textContent = '';
	}
	
	for(let i = 1; i <= teamsArray[currentTeamRoster].lineup.length; i++){
		document.getElementById('rosterTitle').textContent = teamsArray[currentTeamRoster].teamName;
		document.getElementById('logo-roster').src = `images/team-roster-icon-${currentTeamRoster+1}.png`;
		document.getElementById(`roster-name-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].name;
		document.getElementById(`roster-overal-${i}`).textContent = Math.round(teamsArray[currentTeamRoster].lineup[i-1].overal);
		document.getElementById(`roster-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].position;
		document.getElementById(`roster-sec-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].secPosition;
		document.getElementById(`roster-age-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].age;
		if (teamsArray[currentTeamRoster].lineup[i-1].country.length <= 12) {
			document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country;
		} else {
			document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country.slice(0,10) + "...";
		}
		//document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country;
		
		if (teamsArray[currentTeamRoster].lineup[i-1].experience == 0) {
			document.getElementById(`roster-experience-${i}`).textContent = 'R';
		} else {
			document.getElementById(`roster-experience-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].experience;
		}
	}
}

const prevousTeamRoster = function (){
	currentTeamRoster--;
	if (currentTeamRoster < 0) currentTeamRoster = teamsArray.length - 1;
	
	if (currentTeamRoster === userTeam.numberInTeamList) {
		document.getElementById('teamRoster-userIcon').src = `images/user.png`;
	} else {
		document.getElementById('teamRoster-userIcon').src = ``;
	}
	
	//clears roster table before entering current team roster information
	for (i = 1; i <= 18; i++){
		document.getElementById(`roster-name-${i}`).textContent = '';
		document.getElementById(`roster-overal-${i}`).textContent =  '';
		document.getElementById(`roster-position-${i}`).textContent =  '';
		document.getElementById(`roster-sec-position-${i}`).textContent =  '';
		document.getElementById(`roster-age-${i}`).textContent =  '';
		document.getElementById(`roster-country-${i}`).textContent =  '';
		document.getElementById(`roster-experience-${i}`).textContent = '';
	}
	
	for(let i = 1; i <= teamsArray[currentTeamRoster].lineup.length; i++){
		document.getElementById('rosterTitle').textContent = teamsArray[currentTeamRoster].teamName;
		document.getElementById('logo-roster').src = `images/team-roster-icon-${currentTeamRoster+1}.png`;
		document.getElementById(`roster-name-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].name;
		document.getElementById(`roster-overal-${i}`).textContent = Math.round(teamsArray[currentTeamRoster].lineup[i-1].overal);
		document.getElementById(`roster-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].position;
		document.getElementById(`roster-sec-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].secPosition;
		document.getElementById(`roster-age-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].age;
		if (teamsArray[currentTeamRoster].lineup[i-1].country.length <= 12) {
			document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country;
		} else {
			document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country.slice(0,10) + "...";
		}
		//document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country;
		if (teamsArray[currentTeamRoster].lineup[i-1].experience == 0) {
			document.getElementById(`roster-experience-${i}`).textContent = 'R';
		} else {
			document.getElementById(`roster-experience-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].experience;
		}
	}
}

const showPlayerInfo = function (selectedPlayer){
	playerInfo.style.display = "block";
	
	let tableTotalStats = document.getElementById("playerInfoTotalStats");
	let tablePerGameStats = document.getElementById("playerInfoPerGameStats");
	let tablePlayerDevelopment = document.getElementById("playerInfoDevelopment");
	// Delete number of rows so actual rows can be put in
	let rowNumberAtStart = tableTotalStats.rows.length;
	let rowNumberAtStartDevelopment = (tablePlayerDevelopment.rows.length);
	while (rowNumberAtStart > 2){
		tableTotalStats.deleteRow(1);
		tablePerGameStats.deleteRow(1);
		rowNumberAtStart--;
	};
	while (rowNumberAtStartDevelopment > 1){
		tablePlayerDevelopment.deleteRow(1);
		rowNumberAtStartDevelopment--;
	};
	
	document.getElementById('playerInfoName').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].name;
	document.getElementById('playerInfoPrimPos').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].position;
	document.getElementById('playerInfoSecPos').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].secPosition;
	document.getElementById('playerInfoCountry').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].country;
	document.getElementById('playerInfoExperience').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].experience;
	document.getElementById('playerInfoAge').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].age;
	document.getElementById('playerInfoHeight').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].height;
	document.getElementById('playerInfoWeight').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].weight;
	document.getElementById('playerInfoDraft').textContent = `${teamsArray[currentTeamRoster].lineup[selectedPlayer].draftYear} / ${teamsArray[currentTeamRoster].lineup[selectedPlayer].draftPosition}`;
	document.getElementById('playerInfoOveral').textContent = `OVERAL:   ${Math.round(teamsArray[currentTeamRoster].lineup[selectedPlayer].overal)}`;
	document.getElementById('plInfo-overal').textContent = Math.round(teamsArray[currentTeamRoster].lineup[selectedPlayer].overal);
	document.getElementById('plInfo-ins').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].ins;
	document.getElementById('plInfo-pt2').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].pt2;
	document.getElementById('plInfo-pt3').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].pt3;
	document.getElementById('plInfo-ftr').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].ft;
	document.getElementById('plInfo-jum').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].jum;
	document.getElementById('plInfo-str').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].str;
	document.getElementById('plInfo-spe').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].spe;
	document.getElementById('plInfo-qui').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].qui;
	document.getElementById('plInfo-dri').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].dri;
	document.getElementById('plInfo-pas').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].pas;
	document.getElementById('plInfo-ore').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].ore;
	document.getElementById('plInfo-dre').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].dre;
	document.getElementById('plInfo-oaw').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].oaw;
	document.getElementById('plInfo-daw').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].daw;
	document.getElementById('plInfo-blk').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].blk;
	document.getElementById('plInfo-stl').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].stl;
	document.getElementById('plInfo-end').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].end;
	document.getElementById('plInfo-inj').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].inj;
	//document.getElementById('plInfo-pot').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].pot;
	if (teamsArray[currentTeamRoster].lineup[selectedPlayer].pot == 0) { document.getElementById('plInfo-pot').textContent = 'A'; }
	else if (teamsArray[currentTeamRoster].lineup[selectedPlayer].pot == 1) { document.getElementById('plInfo-pot').textContent = 'B'; }
	else if (teamsArray[currentTeamRoster].lineup[selectedPlayer].pot == 2) { document.getElementById('plInfo-pot').textContent = 'C'; }
	else if (teamsArray[currentTeamRoster].lineup[selectedPlayer].pot == 3) { document.getElementById('plInfo-pot').textContent = 'D'; }
	else if (teamsArray[currentTeamRoster].lineup[selectedPlayer].pot == 4) { document.getElementById('plInfo-pot').textContent = 'E'; }
	
	// Put in TOTAL STATS row stats from player's statsTotal array
	document.getElementById('plInfoTot-gmPlayed-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[0];
	document.getElementById('plInfoTot-gmStart-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[25];
	document.getElementById('plInfoTot-pts-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[1];
	document.getElementById('plInfoTot-oreb-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[2];
	document.getElementById('plInfoTot-reb-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[17];
	document.getElementById('plInfoTot-ast-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[4];
	document.getElementById('plInfoTot-stl-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[5];
	document.getElementById('plInfoTot-blk-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[6];
	document.getElementById('plInfoTot-to-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[7];
	document.getElementById('plInfoTot-fgM-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[18];
	document.getElementById('plInfoTot-fgA-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[19];
	document.getElementById('plInfoTot-2ptM-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[20];
	document.getElementById('plInfoTot-2ptA-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[21];
	document.getElementById('plInfoTot-3ptM-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[13];
	document.getElementById('plInfoTot-3ptA-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[14];
	document.getElementById('plInfoTot-ftM-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[15];
	document.getElementById('plInfoTot-ftA-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[16];
	document.getElementById('plInfoTot-fouls-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[8];
	document.getElementById('plInfoTot-doubleDouble-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[22];
	document.getElementById('plInfoTot-tripleDouble-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[23];
	document.getElementById('plInfoTot-quadrupleDouble-total').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[24];
	
	document.getElementById('plInfoPG-gmPlayed').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[0];
	document.getElementById('plInfoPG-gmStart').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[25];
	document.getElementById('plInfoPG-pts').textContent = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[1] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[0]).toFixed(2));
	document.getElementById('plInfoPG-oreb').textContent = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[2] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[0]).toFixed(2));
	document.getElementById('plInfoPG-reb').textContent = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[17] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[0]).toFixed(2));
	document.getElementById('plInfoPG-ast').textContent = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[4] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[0]).toFixed(2));
	document.getElementById('plInfoPG-stl').textContent = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[5] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[0]).toFixed(2));
	document.getElementById('plInfoPG-blk').textContent = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[6] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[0]).toFixed(2));
	document.getElementById('plInfoPG-to').textContent = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[7] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[0]).toFixed(2));
	document.getElementById('plInfoPG-fg%').textContent = `${parseFloat((((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[9]+teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[11]+teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[13]) / (teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[10]+teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[12]+teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[14]))*100).toFixed(2))} %`;
	document.getElementById('plInfoPG-3p%').textContent = parseFloat(((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[13] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[14])*100).toFixed(2));
	document.getElementById('plInfoPG-ft%').textContent = parseFloat(((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[15] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotal[16])*100).toFixed(2));
	document.getElementById('plInfoPG-fouls').textContent = 0;
	
	// if games played 1 - make new row for total stats in season
	for (let i = 0; i < teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear.length; i++) {
		let tableRowIndex = 0;
		if (teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][1] !== 0) {
			let rowTotals = tableTotalStats.insertRow(tableRowIndex + 1);
			let rowPerGame = tablePerGameStats.insertRow(tableRowIndex + 1);
			tableRowIndex++;
			let arrayTotals = [];
			let arrayPerGame = [];
			for (let j = 1; j <= 22; j++) {
				arrayTotals.push(rowTotals.insertCell());
			}
			for (let j = 1; j <= 14; j++) {
				arrayPerGame.push(rowPerGame.insertCell());
			}
			arrayTotals[0].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][0]; //YEAR
			arrayTotals[1].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][1]; //games played
			arrayTotals[2].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][26]; //games started
			arrayTotals[3].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][2]; //point
			arrayTotals[4].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][3]; //OFf. Rebounds
			arrayTotals[5].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][18]; //Total Rebounds
			arrayTotals[6].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][5]; //Assist
			arrayTotals[7].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][6]; //Steal
			arrayTotals[8].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][7]; //Block
			arrayTotals[9].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][8]; //Turnovers
			arrayTotals[10].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][19]; //FG made
			arrayTotals[11].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][20]; //FG attempted
			arrayTotals[12].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][21]; //2PT made
			arrayTotals[13].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][22]; //2PT attempted
			arrayTotals[14].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][14]; //3PT made
			arrayTotals[15].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][15]; // 3PT attempted
			arrayTotals[16].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][16]; // FT made
			arrayTotals[17].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][17]; // FR attempted
			arrayTotals[18].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][9]; // fouls
			arrayTotals[19].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][23]; // double-double 
			arrayTotals[20].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][24]; // triple double
			arrayTotals[21].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][25]; // quadruple-double
			
			arrayPerGame[0].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][0]; //YEAR
			arrayPerGame[1].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][1]; //games played
			arrayPerGame[2].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][26]; //games started
			arrayPerGame[3].innerHTML = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][2] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][1]).toFixed(2)); //point PG
			arrayPerGame[4].innerHTML = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][3] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][1]).toFixed(2)); //OFf. Rebounds PG
			arrayPerGame[5].innerHTML = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][18] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][1]).toFixed(2)); //Total Rebounds
			arrayPerGame[6].innerHTML = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][5] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][1]).toFixed(2)); //Assist
			arrayPerGame[7].innerHTML = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][6] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][1]).toFixed(2)); //Steal
			arrayPerGame[8].innerHTML = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][7] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][1]).toFixed(2)); //Block
			arrayPerGame[9].innerHTML = parseFloat((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][8] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][1]).toFixed(2)); //Turnovers
			arrayPerGame[10].innerHTML = parseFloat((((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][21] + teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][14]) / (teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][22]+teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][15]))*100).toFixed(2)); //FG made %
			arrayPerGame[11].innerHTML = parseFloat(((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][14] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][15]) * 100).toFixed(2)); //3PT made %
			arrayPerGame[12].innerHTML = parseFloat(((teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][16] / teamsArray[currentTeamRoster].lineup[selectedPlayer].statsTotalByYear[i][17]) * 100).toFixed(2)); // FT made %
			arrayPerGame[13].innerHTML = 0; // Fouls PG

			//             pts,oreb,dreb,ast, stl,blk,to,fouls,insM, insA,2ptM,2ptA,3ptM,3ptA, ftM,ftA,RebTot,FgM,FgA,     2ptM, 2ptA + double,triple,quadruple
			// year- games,pts,oreb,dreb,ast, stl,blk,to,fouls,insM, insA,2ptM,2ptA,3ptM,3ptA, ftM,ftA,RebTot,fgMade,fgAt, 2ptsFgM,2ptsFgAt,double,triple,quadriple, gamesStarted
			//YEAR GMPl GMSt PTS OREB  REB AST STL BLK TO FGM FGA 2PM 2PA 3PM 3PA FTM FTA FLS DD TD QD
		}
	}
	document.getElementById('plRecord-pts').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[0]; //points
	document.getElementById('plRecord-oreb').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[1]; //Off Rebounds
	document.getElementById('plRecord-dreb').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[2]; //Def Rebounds
	document.getElementById('plRecord-reb').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[16]; //Total rebounds
	document.getElementById('plRecord-ast').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[3]; //Assists
	document.getElementById('plRecord-stl').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[4]; //Steals
	document.getElementById('plRecord-blk').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[5]; //Blocks
	document.getElementById('plRecord-to').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[6]; //Turnovers
	document.getElementById('plRecord-fgM').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[17]; //All field goals made
	document.getElementById('plRecord-fgA').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[18]; //All field goals attempted
	document.getElementById('plRecord-2ptM').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[19]; //2 PT FG made
	document.getElementById('plRecord-2ptA').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[20]; //2 PT FG attempted
	document.getElementById('plRecord-3ptM').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[12]; //3 PT FG made
	document.getElementById('plRecord-3ptA').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[13]; //3 PT FG attempted
	document.getElementById('plRecord-ftM').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[14]; //Free throws made
	document.getElementById('plRecord-ftA').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerRecords[15]; //Free throws attempted

	// inserts player development script
	for (let i = 0; i < teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason.length; i++) {
			let rowPlayerDevelopment = tablePlayerDevelopment.insertRow();
			let arrayDeveleopment = [];
			for (let j = 1; j <= 21; j++) { // number of skills
				arrayDeveleopment.push(rowPlayerDevelopment.insertCell());
				if (j == 2){
					arrayDeveleopment[j-1].innerHTML  = Math.round(teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1]);
				} else {
				arrayDeveleopment[j-1].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1]; 
				}
				
				if (i > 0 && teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1] > teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i-1][j-1]) { 
					let iproveColor = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1] % teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i-1][j-1];
					if (j >= 2) arrayDeveleopment[j-1].style.backgroundColor = "#007a06";
				} else if (i > 0 && teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1] < teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i-1][j-1]) { 
					let declineColor = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1] % teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i-1][j-1];
					if (j >= 2) arrayDeveleopment[j-1].style.backgroundColor = "#b80100";
				}
				
			}
	}
	// enters player award information
	if(teamsArray[currentTeamRoster].lineup[selectedPlayer].playerAwards) {
		let playerAwards = document.querySelector('.playerAwardsBox');
		playerAwards.innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerAwards.join("<br />");
	}
}

	// opens/un-blocks standings modal and puts sorted team data
const showStandings = function (){
	console.log(`STANDINGS BUTTON PRESSED`);
	standings.style.display = "block";
	
	fullTeamTable = [];
	
	for (let i = 0; i < teamsArray.length; i++){
		fullTeamTable.push(teamsArray[i]);
		if(fullTeamTable[i].winLose[0] != 0){
			fullTeamTable[i].winLose[2] = parseFloat(((fullTeamTable[i].winLose[0] / (fullTeamTable[i].winLose[0] + fullTeamTable[i].winLose[1]))* 100).toFixed(2)); 
		} else {
			fullTeamTable[i].winLose[2] = 0;
		}
		//console.log(`WIN PERCENTAGE: ${fullTeamTable[i].winLose[2]}`);
	}
	
	for (let i = 0; i < fullTeamTable.length; i++) {
		  for (let j = 0; j < fullTeamTable.length - 1; j++) {

			if (fullTeamTable[j].winLose[2] < fullTeamTable[j+1].winLose[2]) {
			  // If the condition is true then swap them
			  let temp = fullTeamTable[j];
			  fullTeamTable[j] = fullTeamTable[j + 1];
			  fullTeamTable[j + 1] = temp;
			}
		  }
	}
	//games, pts,oreb,dreb,ast,stl, blk,to,fouls,insM,insA, 2ptM,2ptA,3ptM,3ptA,ftM, ftA,pointAllowed
	for (let x = 0; x < fullTeamTable.length; x++){
		document.getElementById(`stand-${x+1}-name`).textContent = fullTeamTable[x].teamName;
		document.getElementById(`stand-${x+1}-1`).textContent = fullTeamTable[x].winLose[0];
		document.getElementById(`stand-${x+1}-2`).textContent = fullTeamTable[x].winLose[1];
		document.getElementById(`stand-${x+1}-3`).textContent = fullTeamTable[x].winLose[2]+"%";
		document.getElementById(`stand-${x+1}-4`).textContent = fullTeamTable[x].statsTotal[1];
		document.getElementById(`stand-${x+1}-5`).textContent = fullTeamTable[x].statsTotal[17];
		document.getElementById(`stand-${x+1}-6`).textContent = fullTeamTable[x].statsTotal[2];
		document.getElementById(`stand-${x+1}-7`).textContent = fullTeamTable[x].statsTotal[2]+fullTeamTable[x].statsTotal[3];
		document.getElementById(`stand-${x+1}-8`).textContent = fullTeamTable[x].statsTotal[4];
		document.getElementById(`stand-${x+1}-9`).textContent = fullTeamTable[x].statsTotal[5];
		document.getElementById(`stand-${x+1}-10`).textContent = fullTeamTable[x].statsTotal[6];
		document.getElementById(`stand-${x+1}-11`).textContent = fullTeamTable[x].statsTotal[7];
		document.getElementById(`stand-${x+1}-12`).textContent = fullTeamTable[x].statsTotal[8];
		document.getElementById(`stand-${x+1}-13`).textContent = fullTeamTable[x].statsTotal[9]+fullTeamTable[x].statsTotal[11]+fullTeamTable[x].statsTotal[13];
		document.getElementById(`stand-${x+1}-14`).textContent = fullTeamTable[x].statsTotal[10]+fullTeamTable[x].statsTotal[12]+fullTeamTable[x].statsTotal[14];
		document.getElementById(`stand-${x+1}-15`).textContent = parseFloat(((fullTeamTable[x].statsTotal[9]+fullTeamTable[x].statsTotal[11]+fullTeamTable[x].statsTotal[13]) / (fullTeamTable[x].statsTotal[10]+fullTeamTable[x].statsTotal[12]+fullTeamTable[x].statsTotal[14]) * 100).toFixed(2));
		document.getElementById(`stand-${x+1}-16`).textContent = fullTeamTable[x].statsTotal[13];
		document.getElementById(`stand-${x+1}-17`).textContent = fullTeamTable[x].statsTotal[14];
		document.getElementById(`stand-${x+1}-18`).textContent = parseFloat(((fullTeamTable[x].statsTotal[13] / fullTeamTable[x].statsTotal[14]) * 100).toFixed(2));
		document.getElementById(`stand-${x+1}-19`).textContent = fullTeamTable[x].statsTotal[15];
		document.getElementById(`stand-${x+1}-20`).textContent = fullTeamTable[x].statsTotal[16];
		document.getElementById(`stand-${x+1}-21`).textContent = parseFloat(((fullTeamTable[x].statsTotal[15] / fullTeamTable[x].statsTotal[16]) * 100).toFixed(2));
	}
};

 // Standings table collumn sorting function
const sortTable = function (headerNumber){
	console.log(`sortTable function on header selected - header Nr ${headerNumber}`);
	let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("standingsModalTable");
	switching = true;
	// Set the sorting direction to ascending:
	dir = "asc";
	
	while (switching) {
		// Start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		
		/* Loop through all table rows (except the
		first, which contains table headers): */
		for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[headerNumber+1];
			y = rows[i + 1].getElementsByTagName("TD")[headerNumber+1];
			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			if (dir == "asc") {
				if (Number(x.innerHTML) > Number(y.innerHTML)) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (Number(x.innerHTML) < Number(y.innerHTML)) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
		  /* If a switch has been marked, make the switch
		  and mark that a switch has been done: */
		  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		  switching = true;
		  // Each time a switch is done, increase this count by 1:
		  switchcount ++;
		} else {
		  /* If no switching has been done AND the direction is "asc",
		  set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}		
}

const showPlayerAwards = function(){
	awards.style.display = "block";
};

const showRecords = function() {
	records.style.display = "block";
};

const showTotalStats = function() {
	careerTotalStats.style.display = "block";
}

const openPlayoff = function(){
	playoffModal.style.display = "block";
	
	if(areAllSeasonGamesPlayed === true){
		//console.log(`Current Year = ${currentYear}`);
		//playoffInformationByYear(this);
	} 
	
};

const openRetiredPlayers = function() {
	retiredModal.style.display = "block";
}

const openMockDraft = function() {
	mockDraftModal.style.display = "block";
	if (areAllSeasonGamesPlayed == true) {
		mockDraftByYear(currentYear-1);
	}
}

// opens a modal where a user can trade nba players
let openPlayerTrades = function(){
	console.log(`NBA player trade modal opened!`);
	userTradesModal.style.display = "block";
	
	currentTradeTeam[0] = userTeam.numberInTeamList+1;
	document.querySelector(`.logo-userTrades-0`).src = `images/team-roster-icon-${currentTradeTeam[0]}.png`;
	
	if (userTeam.numberInTeamList == currentTradeTeam[0]-1){
		document.getElementById('trade-user-logo').src = `images/user.png`;
		document.getElementById('trade-user-logo').style.visibility = 'visible';
	} else {
		document.getElementById('trade-user-logo').style.visibility = 'hidden';
	}
	
	if (userTeam.numberInTeamList == 1) {
		currentTradeTeam[1] = 3;
		document.querySelector(`.logo-userTrades-1`).src = `images/team-roster-icon-3.png`;
	}
	displayUserTradePlayers(1);
	displayUserTradePlayers(2);
}

let playerTrades = document.querySelector('.playerTrades');
// opens a modal to see history of all nba trades made + free agent moves
const openTrades = function() {
	tradesModal.style.display = "block";
	playerTrades.innerHTML = allPlayerTrades.join("<br />");
}

const showTeamUpgrades = function() {
	teamUpgradeModal.style.display = "block";
}

let countriesListField = document.getElementById('countries-list-field');

// opens a modal to see the popularity and player quality of each country in the game
const showCountryLevels = function(){

	countries.sort(function (a, b) {
		if (b.playerQuality !== a.playerQuality){
			return b.playerQuality - a.playerQuality;
		}
	});

	countryRatingsModal.style.display = "block";
	countriesListField.innerHTML = "";
	for (let i = 0; i < countries.length; i++) {
		countriesListField.innerHTML += `${countries[i].countryName} - ${countries[i].popularity} - ${countries[i].playerQuality}</br>`;
			console.log(countriesListField);
	}
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == awards || event.target == records || event.target == careerTotalStats || event.target == roster || event.target == playerInfo || event.target == standings || event.target == playoffModal || event.target == retiredModal || event.target == mockDraftModal || event.target == tradesModal || event.target == teamUpgradeModal || event.target == userTradesModal || event.target == countryRatingsModal) {
	if (playerInfo.style.display != "block") roster.style.display = "none";
	playerInfo.style.display = "none";
    awards.style.display = "none";
	records.style.display = "none";
	careerTotalStats.style.display = "none";
	standings.style.display = "none";
	playoffModal.style.display = "none";
	retiredModal.style.display = "none";
	mockDraftModal.style.display = "none";
	tradesModal.style.display = "none";
	teamUpgradeModal.style.display = "none";
	userTradesModal.style.display = "none";
	countryRatingsModal.style.display = "none";
  }
}

// When the user clicks on <span> (x), close the modal
const closeRosterModal = function (){
	roster.style.display = "none";
}

const closePlayerInfoModal = function (){
	playerInfo.style.display = "none";
}

const closeAwards = function (){
	awards.style.display = "none";
}
const closeRecords = function (){
  records.style.display = "none";
}
const closeCareerTotalStats = function() {
	careerTotalStats.style.display = "none";
}

const closeStandingsModal = function() {
	standings.style.display = "none";
}

const closePlayoffModal = function() {
	playoffModal.style.display = "none";
}

const closeRetiredModal = function() {
	retiredModal.style.display = "none";
}
const closeMockDraftModal = function() {
	mockDraftModal.style.display = "none";
}
const closeTradesModal = function() {
	tradesModal.style.display = "none";
}
const closeUserTradesModal = function() {
	userTradesModal.style.display = "none";
}

const closeUpgradeModal = function() {
	teamUpgradeModal.style.display = "none";
}

const closedisplayCountriesModal = function() {
	countryRatingsModal.style.display = "none";
}

let ptsRecord = document.querySelector('.points-records-button');
let offRebRecord = document.querySelector('.offReb-records-button');
let defRebRecord = document.querySelector('.defReb-records-button');
let reboundsRecord = document.querySelector('.rebounds-records-button');
let assistsRecord = document.querySelector('.assists-records-button');
let stealsRecord = document.querySelector('.steals-records-button');
let blocksRecord = document.querySelector('.blocks-records-button');
let twoPtsMadeRecord = document.querySelector('.twoPtsMade-records-button');
let twoPtsAttRecord = document.querySelector('.twoPtsAtt-records-button');
let fgMadeRecord = document.querySelector('.fgMade-records-button');
let fgAttRecord = document.querySelector('.fgAtt-records-button');
let threePointerMadeRecord = document.querySelector('.threePointerMade-records-button');
let threePointerAttRecord = document.querySelector('.threePointerAtt-records-button');
let freeThrowMadeRecord = document.querySelector('.freeThrowMade-records-button');
let freeThrowAttRecord = document.querySelector('.freeThrowAtt-records-button');
let turnoversRecord = document.querySelector('.turnovers-records-button');

ptsRecord.addEventListener('click', function () {  // NBA record array  ---  pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA, RebTot,2ptsFgM,2ptsFgAt,fgMade,fgAt  + currentYear + Player Name
	enterPlayerRecords(0);
});
offRebRecord.addEventListener('click', function () {
	enterPlayerRecords(1);
});
defRebRecord.addEventListener('click', function () {
	enterPlayerRecords(2);
});
reboundsRecord.addEventListener('click', function () {
	enterPlayerRecords(16);
});
assistsRecord.addEventListener('click', function () {
	enterPlayerRecords(3);
});
stealsRecord.addEventListener('click', function () {
	enterPlayerRecords(4);
});
blocksRecord.addEventListener('click', function () {
	enterPlayerRecords(5);
});
twoPtsMadeRecord.addEventListener('click', function () {
	enterPlayerRecords(19);
});
twoPtsAttRecord.addEventListener('click', function () {
	enterPlayerRecords(20);
});
fgMadeRecord.addEventListener('click', function () {
	enterPlayerRecords(17);
});
fgAttRecord.addEventListener('click', function () {
	enterPlayerRecords(18);
});
threePointerMadeRecord.addEventListener('click', function () {
	enterPlayerRecords(12);
});
threePointerAttRecord.addEventListener('click', function () {
	enterPlayerRecords(13);
});
freeThrowMadeRecord.addEventListener('click', function () {
	enterPlayerRecords(14);
});
freeThrowAttRecord.addEventListener('click', function () {
	enterPlayerRecords(15);
});
turnoversRecord.addEventListener('click', function () {
	enterPlayerRecords(6);
});

const enterPlayerRecords = function (record){ // inserts nba1GameRecords values in html modal
	for (let i = 1; i <= 10; i++){
		document.getElementById(`rec-year-${i}`).textContent = nba1GameRecords[record][i-1][1];
		document.getElementById(`rec-name-${i}`).textContent = nba1GameRecords[record][i-1][2];
		document.getElementById(`rec-stat-${i}`).textContent = nba1GameRecords[record][i-1][0];
	}
}
const enterPlayerTotalRecords = function (record){ // inserts nba1GameRecordsTotal values in html modal
	for (let i = 1; i <= 10; i++){
		if(nba1GameRecordsTotal[record][i-1][2]){
		document.getElementById(`careerStat-name-${i}`).textContent = nba1GameRecordsTotal[record][i-1][2];
		document.getElementById(`careerStat-stat-${i}`).textContent = nba1GameRecordsTotal[record][i-1][1];
		} else {
			document.getElementById(`careerStat-name-${i}`).textContent = '';
			document.getElementById(`careerStat-stat-${i}`).textContent = '';
		}
	}
}

let ptsTotal = document.querySelector('.points-total-button');
let offRebTotal = document.querySelector('.offReb-total-button');
let defRebTotal = document.querySelector('.defReb-total-button');
let reboundsTotal = document.querySelector('.rebounds-total-button');
let assistsTotal = document.querySelector('.assists-total-button');
let stealsTotal = document.querySelector('.steals-total-button');
let blocksTotal = document.querySelector('.blocks-total-button');
let twoPtsMadeTotal = document.querySelector('.twoPtsMade-total-button');
let twoPtsAttTotal = document.querySelector('.twoPtsAtt-total-button');
let fgMadeTotal = document.querySelector('.fgMade-total-button');
let fgAttTotal = document.querySelector('.fgAtt-total-button');
let threePointerMadeTotal = document.querySelector('.threePointerMade-total-button');
let threePointerAttTotal = document.querySelector('.threePointerAtt-total-button');
let freeThrowMadeTotal = document.querySelector('.freeThrowMade-total-button');
let freeThrowAttTotal = document.querySelector('.freeThrowAtt-total-button');
let turnoversTotal = document.querySelector('.turnovers-total-button');
let doubleDoubleTotal = document.querySelector('.double-total-button');
let tripleDoubleTotal = document.querySelector('.triple-total-button');
let quadrupleDoubleTotal = document.querySelector('.quadruple-total-button');

ptsTotal.addEventListener('click', function () {  // NBA record array  ---  pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA, RebTot,2ptsFgM,2ptsFgAt,fgMade,fgAt  + currentYear + Player Name
	enterPlayerTotalRecords(0);
});
offRebTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(1);
});
defRebTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(2);
});
reboundsTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(16);
});
assistsTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(3);
});
stealsTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(4);
});
blocksTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(5);
});
twoPtsMadeTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(19);
});
twoPtsAttTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(20);
});
fgMadeTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(17);
});
fgAttTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(18);
});
threePointerMadeTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(12);
});
threePointerAttTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(13);
});
freeThrowMadeTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(14);
});
freeThrowAttTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(15);
});
turnoversTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(6);
});
doubleDoubleTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(21);
});
tripleDoubleTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(22);
});
quadrupleDoubleTotal.addEventListener('click', function () {
	enterPlayerTotalRecords(23);
});

let selectedRowsForSwap;
	// Function that enables to to swap players in Roster
let initSwap = function (selectedRow){
	if (selectedRowsForSwap == null) {
		selectedRowsForSwap = selectedRow;
		console.log(`Player 1 selected`);
		document.getElementById(`roster-row-${selectedRow+1}`).style.backgroundColor = '#F3C8A2';
	} else {
		for (let i = 1; i <= 18; i++){
			document.getElementById(`roster-row-${i}`).style.backgroundColor = '';
		}
		let tempPlayer = teamsArray[currentTeamRoster].lineup[selectedRowsForSwap];
		teamsArray[currentTeamRoster].lineup[selectedRowsForSwap] = teamsArray[currentTeamRoster].lineup[selectedRow];
		teamsArray[currentTeamRoster].lineup[selectedRow] = tempPlayer;
		selectedRowsForSwap = null;
		console.log(`Player swap initiated`);
		showRoster();
	}
}

let sortRosterLineup  = function(){
	teamsArray[currentTeamRoster].setLineup();
	showRoster();
}

	// function to increase or decrese player skills - used after SIM SEASON
let playerDevelopmentEndYear = function (){
	let playerUpgradePoints;
	for (let i = 0; i < teamsArray.length; i++){
		for (let j = 0; j < teamsArray[i].lineup.length; j++){
			if (teamsArray[i].lineup[j].age < 30) {
				//playerUpgradePoints = Math.floor(Math.random() * ((30 - teamsArray[i].lineup[j].age) * 10)) + 1;
				switch (teamsArray[i].lineup[j].age) {
						case 18:
							playerUpgradePoints = Math.floor(Math.random() * 40) + 20;
							break;
						case 19:
							playerUpgradePoints = Math.floor(Math.random() * 40) + 20;
							break;
						case 20:
							playerUpgradePoints = Math.floor(Math.random() * 35) + 15;
							break;
						case 21:
							playerUpgradePoints = Math.floor(Math.random() * 35) + 15;
							break;
						case 22:
							playerUpgradePoints = Math.floor(Math.random() * 30) + 10;
							break;
						case 23:
							playerUpgradePoints = Math.floor(Math.random() * 30) + 10;
							break;
						case 24:
							playerUpgradePoints = Math.floor(Math.random() * 25) + 9;
							break;
						case 25:
							playerUpgradePoints = Math.floor(Math.random() * 20) + 8;
							break;
						case 26:
							playerUpgradePoints = Math.floor(Math.random() * 20) + 5;
							break;
						case 27:
							playerUpgradePoints = Math.floor(Math.random() * 20) + 3;
							break;
						case 28:
							playerUpgradePoints = Math.floor(Math.random() * 20) + 2;
							break;
						case 29:
							playerUpgradePoints = Math.floor(Math.random() * 20) + 1;
							break;
				}
			} else if(teamsArray[i].lineup[j].age == 30) {
				playerUpgradePoints = Math.floor(Math.random() * 10) + 1;
				playerUpgradePoints -= (playerUpgradePoints * 2);
			} else if(teamsArray[i].lineup[j].age == 31) {
				playerUpgradePoints = Math.floor(Math.random() * 20) + 10;
				playerUpgradePoints -= (playerUpgradePoints * 2);
			} else if(teamsArray[i].lineup[j].age == 32) {
				playerUpgradePoints = Math.floor(Math.random() * 30) + 15;
				playerUpgradePoints -= (playerUpgradePoints * 2);
			} else if(teamsArray[i].lineup[j].age == 33) {
				playerUpgradePoints = Math.floor(Math.random() * 40) + 20;
				playerUpgradePoints -= (playerUpgradePoints * 2);
			} else if(teamsArray[i].lineup[j].age >= 34) {
				playerUpgradePoints = Math.floor(Math.random() * 60) + 20;
				playerUpgradePoints -= (playerUpgradePoints * 2);
			}
			playerUpgradePoints += teamsArray[i].lineup[j].extraDevPoints; // adds extra development point for winning awards (Rookie, SIX man of the year etc.)
			
			console.log(`${teamsArray[i].lineup[j].name} development points = ${playerUpgradePoints}`);
			
			if (playerUpgradePoints > 0) {
				if (teamsArray[i].lineup[j].pot > 0) { playerUpgradePoints = playerUpgradePoints - (teamsArray[i].lineup[j].pot * 4) }; // if not max potential - skill points are decreased
				if (playerUpgradePoints < 1) { playerUpgradePoints = 1 }; // if skill points are decreased below 1 - set skill points to 1
				for (let x = 0; x < (playerUpgradePoints); x++) {
					let skillToUpgrade = Math.floor(Math.random() * 18) + 1;
					switch (skillToUpgrade) {
						case 1:
							(teamsArray[i].lineup[j].ins < 99) ? teamsArray[i].lineup[j].ins++ : x--;
							break;
						case 2:
							(teamsArray[i].lineup[j].pt2 < 99) ? teamsArray[i].lineup[j].pt2++ : x--;
							break;
						case 3:
							(teamsArray[i].lineup[j].pt3 < 99) ? teamsArray[i].lineup[j].pt3++ : x--;
							break;
						case 4:
							(teamsArray[i].lineup[j].ft < 99) ? teamsArray[i].lineup[j].ft++ : x--;
							break;
						case 5:
							(teamsArray[i].lineup[j].jum < 99) ? teamsArray[i].lineup[j].jum++ : x--;
							break;
						case 6:
							(teamsArray[i].lineup[j].str < 99) ? teamsArray[i].lineup[j].str++ : x--;
							break;
						case 7:
							(teamsArray[i].lineup[j].spe < 99) ? teamsArray[i].lineup[j].spe++ : x--;
							break;
						case 8:
							(teamsArray[i].lineup[j].qui < 99) ? teamsArray[i].lineup[j].qui++ : x--;
							break;
						case 9:
							(teamsArray[i].lineup[j].dri < 99) ? teamsArray[i].lineup[j].dri++ : x--;
							break;
						case 10:
							(teamsArray[i].lineup[j].pas < 99) ? teamsArray[i].lineup[j].pas++ : x--;
							break;
						case 11:
							(teamsArray[i].lineup[j].ore < 99) ? teamsArray[i].lineup[j].ore++ : x--;
							break;
						case 12:
							(teamsArray[i].lineup[j].dre < 99) ? teamsArray[i].lineup[j].dre++ : x--;
							break;
						case 13:
							(teamsArray[i].lineup[j].oaw < 99) ? teamsArray[i].lineup[j].oaw++ : x--;
							break;
						case 14:
							(teamsArray[i].lineup[j].daw < 99) ? teamsArray[i].lineup[j].daw++ : x--;
							break;
						case 15:
							(teamsArray[i].lineup[j].blk < 99) ? teamsArray[i].lineup[j].blk++ : x--;
							break;
						case 16:
							(teamsArray[i].lineup[j].stl < 99) ? teamsArray[i].lineup[j].stl++ : x--;
							break;
						case 17:
							(teamsArray[i].lineup[j].end < 99) ? teamsArray[i].lineup[j].end++ : x--;
							break;
						case 18:
							(teamsArray[i].lineup[j].inj < 99) ? teamsArray[i].lineup[j].inj++ : x--;
							break;
						}
				}
			} else if (playerUpgradePoints < 0) {
				for (let y = 0; y > playerUpgradePoints; y--) {
					let skillToUpgrade = Math.floor(Math.random() * 18) + 1;
					switch (skillToUpgrade) {
						case 1:
							(teamsArray[i].lineup[j].ins > 1) ? teamsArray[i].lineup[j].ins-- : y++;
							break;
						case 2:
							(teamsArray[i].lineup[j].pt2 > 1) ? teamsArray[i].lineup[j].pt2-- : y++;
							break;
						case 3:
							(teamsArray[i].lineup[j].pt3 > 1) ? teamsArray[i].lineup[j].pt3-- : y++;
							break;
						case 4:
							(teamsArray[i].lineup[j].ft > 1) ? teamsArray[i].lineup[j].ft-- : y++;
							break;
						case 5:
							(teamsArray[i].lineup[j].jum > 1) ? teamsArray[i].lineup[j].jum-- : y++;
							break;
						case 6:
							(teamsArray[i].lineup[j].str > 1) ? teamsArray[i].lineup[j].str-- : y++;
							break;
						case 7:
							(teamsArray[i].lineup[j].spe > 1) ? teamsArray[i].lineup[j].spe-- : y++;
							break;
						case 8:
							(teamsArray[i].lineup[j].qui > 1) ? teamsArray[i].lineup[j].qui-- : y++;
							break;
						case 9:
							(teamsArray[i].lineup[j].dri > 1) ? teamsArray[i].lineup[j].dri-- : y++;
							break;
						case 10:
							(teamsArray[i].lineup[j].pas > 1) ? teamsArray[i].lineup[j].pas-- : y++;
							break;
						case 11:
							(teamsArray[i].lineup[j].ore > 1) ? teamsArray[i].lineup[j].ore-- : y++;
							break;
						case 12:
							(teamsArray[i].lineup[j].dre > 1) ? teamsArray[i].lineup[j].dre-- : y++;
							break;
						case 13:
							(teamsArray[i].lineup[j].oaw > 1) ? teamsArray[i].lineup[j].oaw-- : y++;
							break;
						case 14:
							(teamsArray[i].lineup[j].daw > 1) ? teamsArray[i].lineup[j].daw-- : y++;
							break;
						case 15:
							(teamsArray[i].lineup[j].blk > 1) ? teamsArray[i].lineup[j].blk-- : y++;
							break;
						case 16:
							(teamsArray[i].lineup[j].stl > 1) ? teamsArray[i].lineup[j].stl-- : y++;
							break;
						case 17:
							(teamsArray[i].lineup[j].end > 1) ? teamsArray[i].lineup[j].end-- : y++;
							break;
						case 18:
							(teamsArray[i].lineup[j].inj > 1) ? teamsArray[i].lineup[j].inj-- : y++;
							break;
						}
				}
			}
// offense skills +3/ defense sk. +3/ shooting sk. +3/ physical sk. +3/ rookies all sk. +1/ offense boost/ defense boost/ trade bonus +1 overal got
			// Offense skills - dri, pas, ore, oaw
			// Defence skills - dre, daw, blk, stl
			// Shooting skills - ins, pt2, pt3, ft
			// Physical skills - jum, str, spe, qui, end
			if(teamsArray[i].teamUpgrades[0] > 0){ // Offense skill increase
				for (let z = 0; z < (teamsArray[i].teamUpgrades[0] * 1); z++) {
					if (teamsArray[i].lineup[j].dri < 99 || teamsArray[i].lineup[j].pas < 99 || teamsArray[i].lineup[j].ore < 99 || teamsArray[i].lineup[j].oaw < 99 ){
						let skillToUpgrade = Math.floor(Math.random() * 4) + 1;
						if (skillToUpgrade == 1) { (teamsArray[i].lineup[j].dri < 99) ? teamsArray[i].lineup[j].dri++ : z--; }
						else if (skillToUpgrade == 2) { (teamsArray[i].lineup[j].pas < 99) ? teamsArray[i].lineup[j].pas++ : z--; }
						else if (skillToUpgrade == 3) { (teamsArray[i].lineup[j].ore < 99) ? teamsArray[i].lineup[j].ore++ : z--; }
						else if (skillToUpgrade == 4) { (teamsArray[i].lineup[j].oaw < 99) ? teamsArray[i].lineup[j].oaw++ : z--; }
					}
				}
				console.log(`Offense skill increase DONE`);
			}
			if(teamsArray[i].teamUpgrades[1] > 0){ // Defence skill increase
				for (let z = 0; z < teamsArray[i].teamUpgrades[1] * 1; z++) {
					if (teamsArray[i].lineup[j].dre < 99 || teamsArray[i].lineup[j].daw < 99 || teamsArray[i].lineup[j].blk < 99 || teamsArray[i].lineup[j].stl < 99 ){
						let skillToUpgrade = Math.floor(Math.random() * 4) + 1;
						if (skillToUpgrade == 1) { (teamsArray[i].lineup[j].dre < 99) ? teamsArray[i].lineup[j].dre++ : z--; } 					
						else if (skillToUpgrade == 2) { (teamsArray[i].lineup[j].daw < 99) ? teamsArray[i].lineup[j].daw++ : z--; }
						else if (skillToUpgrade == 3) { (teamsArray[i].lineup[j].blk < 99) ? teamsArray[i].lineup[j].blk++ : z--; }
						else if (skillToUpgrade == 4) { (teamsArray[i].lineup[j].stl < 99) ? teamsArray[i].lineup[j].stl++ : z--; }
					}
				}
				console.log(`Defence skill increase DONE`);
			}
			if(teamsArray[i].teamUpgrades[2] > 0){ // Shooting skill increase
				for (let z = 0; z < teamsArray[i].teamUpgrades[2] * 1; z++) {
					if (teamsArray[i].lineup[j].ins < 99 || teamsArray[i].lineup[j].pt2 < 99 || teamsArray[i].lineup[j].pt3 < 99 || teamsArray[i].lineup[j].ft < 99 ){
						let skillToUpgrade = Math.floor(Math.random() * 4) + 1;
						if (skillToUpgrade == 1) { (teamsArray[i].lineup[j].ins < 99) ? teamsArray[i].lineup[j].ins++ : z--; } 					
						else if (skillToUpgrade == 2) { (teamsArray[i].lineup[j].pt2 < 99) ? teamsArray[i].lineup[j].pt2++ : z--; }
						else if (skillToUpgrade == 3) { (teamsArray[i].lineup[j].pt3 < 99) ? teamsArray[i].lineup[j].pt3++ : z--; }
						else if (skillToUpgrade == 4) { (teamsArray[i].lineup[j].ft < 99) ? teamsArray[i].lineup[j].ft++ : z--; }
					}
				}
				console.log(`Shooting skill increase DONE`);
			}
			if(teamsArray[i].teamUpgrades[3] > 0){ // Physical skill increase
				for (let z = 0; z < teamsArray[i].teamUpgrades[3] * 1; z++) {
					if (teamsArray[i].lineup[j].jum < 99 || teamsArray[i].lineup[j].spe < 99 || teamsArray[i].lineup[j].qui < 99 || teamsArray[i].lineup[j].end < 99 ){
						let skillToUpgrade = Math.floor(Math.random() * 5) + 1;
						if (skillToUpgrade == 1) { (teamsArray[i].lineup[j].jum < 99) ? teamsArray[i].lineup[j].jum++ : z--; } 					
						else if (skillToUpgrade == 2) { (teamsArray[i].lineup[j].str < 99) ? teamsArray[i].lineup[j].str++ : z--; }
						else if (skillToUpgrade == 3) { (teamsArray[i].lineup[j].spe < 99) ? teamsArray[i].lineup[j].spe++ : z--; }
						else if (skillToUpgrade == 4) { (teamsArray[i].lineup[j].qui < 99) ? teamsArray[i].lineup[j].qui++ : z--; }
						else if (skillToUpgrade == 5) { (teamsArray[i].lineup[j].end < 99) ? teamsArray[i].lineup[j].end++ : z--; }
					}
				}
				console.log(`Physical skill increase DONE`);
			}
			
			teamsArray[i].lineup[j].extraDevPoints = 0;
			
			teamsArray[i].lineup[j].age++;
			teamsArray[i].lineup[j].calcPlayerOveral();
			teamsArray[i].lineup[j].playerDevelopmentBySeason.push([currentYear+1, teamsArray[i].lineup[j].overal,teamsArray[i].lineup[j].ins,teamsArray[i].lineup[j].pt2,teamsArray[i].lineup[j].pt3,teamsArray[i].lineup[j].ft,teamsArray[i].lineup[j].jum,teamsArray[i].lineup[j].str,teamsArray[i].lineup[j].spe,teamsArray[i].lineup[j].qui,teamsArray[i].lineup[j].dri,teamsArray[i].lineup[j].pas,teamsArray[i].lineup[j].ore,teamsArray[i].lineup[j].dre,teamsArray[i].lineup[j].oaw,teamsArray[i].lineup[j].daw,teamsArray[i].lineup[j].blk,teamsArray[i].lineup[j].stl,teamsArray[i].lineup[j].end,teamsArray[i].lineup[j].inj,teamsArray[i].lineup[j].pot]);
			teamsArray[i].lineup[j].experience++; // increases NBA player experience by 1 year
		}
		teamsArray[i].setLineup();
	}
};

// this function needs to be run right after all season games are played so that starting playoff brackets are fill out in Playoff Modal
let updateStartingPlayoffPicture = function (){
	// need to sort teams from best to worst by season results
	let teamListForPlayoffBracketFill = [];
	let eastTeamList = [];
	let westTeamList = [];
	
	for (let i = 0; i < teamsArray.length; i++){
		teamListForPlayoffBracketFill.push(teamsArray[i]);
	}
	
	// sorts all teams by won/lose record. If wins are equal, then checks PTS / PTS allowed difference
	for (let i = 0; i < teamListForPlayoffBracketFill.length; i++) {
			  
			teamListForPlayoffBracketFill.sort(function (a, b) {
				if (b.winLose[0] !== a.winLose[0]){
					return b.winLose[0] - a.winLose[0];
				//} else if (b.winLose[0] === a.winLose[0] && (b.statsTotal[1] - b.statsTotal[17]) !== (a.statsTotal[1] - a.statsTotal[17])) {
				//	return (b.statsTotal[1] - b.statsTotal[17]) - (a.statsTotal[1] - a.statsTotal[17]);
				} else if ( b.winLose[0] === a.winLose[0]  &&  b.statsTotal[1] !== a.statsTotal[1] ) {
					return b.statsTotal[1] - a.statsTotal[1];
				} else if ( b.winLose[0] === a.winLose[0]  &&  b.statsTotal[1] == a.statsTotal[1] &&  b.statsTotal[17] !== a.statsTotal[17]) {
					return b.statsTotal[17] - a.statsTotal[17];
				} else {
					console.log(`Both team wins and pts-pts.allowed for the both teams are EQUAL ${(b.statsTotal[1] - b.statsTotal[17])} |\ ${(a.statsTotal[1] - a.statsTotal[17])}`);
					alert(`Both team wins and pts-pts.allowed for the both teams are EQUAL ${(b.statsTotal[1] - b.statsTotal[17])} |\ ${(a.statsTotal[1] - a.statsTotal[17])}`);
				}
			});
	}
	// pushes all terams to east and west conference arrays - best to worst record
	for (let i = 0; i < teamListForPlayoffBracketFill.length; i++){
		if (teamListForPlayoffBracketFill[i].conference === 'west'){
			westTeamList.push(teamListForPlayoffBracketFill[i]);
		} else {
			eastTeamList.push(teamListForPlayoffBracketFill[i]);
		}
	}
	//console.log(westTeamList);
	//console.log(eastTeamList);
	westPlayInTeams.push([currentYear-1, westTeamList[6], westTeamList[7], westTeamList[8], westTeamList[9],0,0,0,0]);  // [[year, team7, team8, team9, team10],[]] - will hold west play-in teams for each year
	eastPlayInTeams.push([currentYear-1, eastTeamList[6], eastTeamList[7], eastTeamList[8], eastTeamList[9],0,0,0,0]);
	westPlayoffTeams.push([currentYear-1, westTeamList[0], westTeamList[1], westTeamList[2], westTeamList[3], westTeamList[4], westTeamList[5]]); 
	eastPlayoffTeams.push([currentYear-1, eastTeamList[0], eastTeamList[1], eastTeamList[2], eastTeamList[3], eastTeamList[4], eastTeamList[5]]); 

	playoffYearSelect.appendChild(new Option(`${currentYear-1}`, `${currentYear-1}`, false, true)); // Use the Option constructor: args text, value, defaultSelected, selected
	
	playoffInformationByYear(currentYear-1);
	selectedPlayoffModalYear = currentYear-1;
};

let playoffInformationByYear = function (dropdownYear) {
	
	let option_value;
	let option_text;
	if (typeof dropdownYear === 'object') {
		option_value = dropdownYear.options[dropdownYear.selectedIndex].value;
		option_text = dropdownYear.options[dropdownYear.selectedIndex].text;
		//alert('The option value is "' + option_value + '"\nand the text is "' + option_text + '"');
	} else {
		option_value = dropdownYear;
	}
	selectedPlayoffModalYear = option_value;
	let yearInPlayoffTeamArrays = option_value - 2025;
	
// puts in HTML both PLAY-IN teams  7 - 10
	for (let i = 7; i <= 10; i++) {
		document.querySelector(`.westPlayInName-${i}`).textContent = westPlayInTeams[yearInPlayoffTeamArrays][i-6].teamName;
		document.querySelector(`.eastPlayInName-${i}`).textContent = eastPlayInTeams[yearInPlayoffTeamArrays][i-6].teamName;
	} 
// puts in HTML both Conference teams  1 - 6
	for (let i = 1; i <= 6; i++){
		document.querySelector(`.westName-${i}`).textContent = westPlayoffTeams[yearInPlayoffTeamArrays][i].teamName;
		document.querySelector(`.eastName-${i}`).textContent = eastPlayoffTeams[yearInPlayoffTeamArrays][i].teamName;
	}
// puts in HTML information if PLAY-IN games are simulated
	if (ifPlayInGamesPlayed[yearInPlayoffTeamArrays]){
		document.querySelector(`.west-7-result`).textContent = westPlayInTeams[yearInPlayoffTeamArrays][5]; // puts in points scored
		document.querySelector(`.west-8-result`).textContent = westPlayInTeams[yearInPlayoffTeamArrays][6];
		document.querySelector(`.west-9-result`).textContent = westPlayInTeams[yearInPlayoffTeamArrays][7];
		document.querySelector(`.west-10-result`).textContent = westPlayInTeams[yearInPlayoffTeamArrays][8];
		document.querySelector(`.east-7-result`).textContent = eastPlayInTeams[yearInPlayoffTeamArrays][5];
		document.querySelector(`.east-8-result`).textContent = eastPlayInTeams[yearInPlayoffTeamArrays][6];
		document.querySelector(`.east-9-result`).textContent = eastPlayInTeams[yearInPlayoffTeamArrays][7];
		document.querySelector(`.east-10-result`).textContent = eastPlayInTeams[yearInPlayoffTeamArrays][8];
		
		document.querySelector(`.westPlayInFinalSeed-1`).textContent = westPlayInFinals[yearInPlayoffTeamArrays][2];
		document.querySelector(`.westPlayInFinalSeed-2`).textContent = westPlayInFinals[yearInPlayoffTeamArrays][4];
		document.querySelector(`.westPlayInFinalName-1`).textContent = westPlayInFinals[yearInPlayoffTeamArrays][1].teamName;
		document.querySelector(`.westPlayInFinalName-2`).textContent = westPlayInFinals[yearInPlayoffTeamArrays][3].teamName;
		document.querySelector(`.westPlayInFinalName-1-result`).textContent = westPlayInFinals[yearInPlayoffTeamArrays][5];
		document.querySelector(`.westPlayInFinalName-2-result`).textContent = westPlayInFinals[yearInPlayoffTeamArrays][6];
		
		document.querySelector(`.eastPlayInFinalSeed-1`).textContent = eastPlayInFinals[yearInPlayoffTeamArrays][2];
		document.querySelector(`.eastPlayInFinalSeed-2`).textContent = eastPlayInFinals[yearInPlayoffTeamArrays][4];
		document.querySelector(`.eastPlayInFinalName-1`).textContent = eastPlayInFinals[yearInPlayoffTeamArrays][1].teamName;
		document.querySelector(`.eastPlayInFinalName-2`).textContent = eastPlayInFinals[yearInPlayoffTeamArrays][3].teamName;
		document.querySelector(`.eastPlayInFinalName-1-result`).textContent = eastPlayInFinals[yearInPlayoffTeamArrays][5];
		document.querySelector(`.eastPlayInFinalName-2-result`).textContent = eastPlayInFinals[yearInPlayoffTeamArrays][6];
		 
		document.querySelector(`.westName-${7}`).textContent = westPlayoffTeams[yearInPlayoffTeamArrays][7].teamName;
		document.querySelector(`.eastName-${7}`).textContent = eastPlayoffTeams[yearInPlayoffTeamArrays][7].teamName;
		document.querySelector(`.westName-${8}`).textContent = westPlayoffTeams[yearInPlayoffTeamArrays][8].teamName;
		document.querySelector(`.eastName-${8}`).textContent = eastPlayoffTeams[yearInPlayoffTeamArrays][8].teamName;
		
	} else {
		document.querySelector(`.west-7-result`).textContent = '';
		document.querySelector(`.west-8-result`).textContent = '';
		document.querySelector(`.west-9-result`).textContent = '';
		document.querySelector(`.west-10-result`).textContent = '';
		document.querySelector(`.east-7-result`).textContent = '';
		document.querySelector(`.east-8-result`).textContent = '';
		document.querySelector(`.east-9-result`).textContent = '';
		document.querySelector(`.east-10-result`).textContent = '';
		document.querySelector(`.westName-7`).textContent = '';
		document.querySelector(`.eastName-7`).textContent = '';
		document.querySelector(`.westName-8`).textContent = '';
		document.querySelector(`.eastName-8`).textContent = '';
		document.querySelector(`.westPlayInFinalSeed-1`).textContent =  '';
		document.querySelector(`.westPlayInFinalSeed-2`).textContent =  '';
		document.querySelector(`.westPlayInFinalName-1`).textContent = '';
		document.querySelector(`.westPlayInFinalName-2`).textContent = '';
		document.querySelector(`.westPlayInFinalName-1-result`).textContent = '';
		document.querySelector(`.westPlayInFinalName-2-result`).textContent = '';
		document.querySelector(`.eastPlayInFinalSeed-1`).textContent = '';
		document.querySelector(`.eastPlayInFinalSeed-2`).textContent = '';
		document.querySelector(`.eastPlayInFinalName-1`).textContent = '';
		document.querySelector(`.eastPlayInFinalName-2`).textContent = '';
		document.querySelector(`.eastPlayInFinalName-1-result`).textContent = '';
		document.querySelector(`.eastPlayInFinalName-2-result`).textContent = '';
	}
	
	if (ifQuerterFinalsPlayed[yearInPlayoffTeamArrays]){
		for (let i = 1; i <= 8; i++) {
			document.querySelector(`.westWins-${i}`).textContent = westPlayoffTeams[yearInPlayoffTeamArrays][i+8];
			document.querySelector(`.eastWins-${i}`).textContent = eastPlayoffTeams[yearInPlayoffTeamArrays][i+8];
		}
		document.querySelector(`.west-sf-1`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][5];
		document.querySelector(`.westName-sf-1`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][1].teamName;
		document.querySelector(`.west-sf-2`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][8];
		document.querySelector(`.westName-sf-2`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][4].teamName;
		document.querySelector(`.west-sf-3`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][7];
		document.querySelector(`.westName-sf-3`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][3].teamName;
		document.querySelector(`.west-sf-4`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][6];
		document.querySelector(`.westName-sf-4`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][2].teamName;
		document.querySelector(`.east-sf-1`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][5];
		document.querySelector(`.eastName-sf-1`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][1].teamName;
		document.querySelector(`.east-sf-2`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][8];
		document.querySelector(`.eastName-sf-2`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][4].teamName;
		document.querySelector(`.east-sf-3`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][7];
		document.querySelector(`.eastName-sf-3`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][3].teamName;
		document.querySelector(`.east-sf-4`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][6];
		document.querySelector(`.eastName-sf-4`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][2].teamName;
	} else {
		for (let i = 1; i <= 8; i++) {
			document.querySelector(`.westWins-${i}`).textContent = '';
			document.querySelector(`.eastWins-${i}`).textContent = '';
			if (i <= 4){
				document.querySelector(`.west-sf-${i}`).textContent = '';
				document.querySelector(`.westName-sf-${i}`).textContent = '';
				document.querySelector(`.east-sf-${i}`).textContent = '';
				document.querySelector(`.eastName-sf-${i}`).textContent = '';
				document.querySelector(`.westWins-sf-${i}`).textContent = '';
				document.querySelector(`.eastWins-sf-${i}`).textContent = '';
			}
		}
	}
	
	if (ifConfSemiFinalsPlayed[yearInPlayoffTeamArrays]){
		
		document.querySelector(`.westWins-sf-1`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][9];
		document.querySelector(`.westWins-sf-2`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][12];
		document.querySelector(`.westWins-sf-3`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][11];
		document.querySelector(`.westWins-sf-4`).textContent = westSemiFinalTeams[yearInPlayoffTeamArrays][10];
		document.querySelector(`.eastWins-sf-1`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][9];
		document.querySelector(`.eastWins-sf-2`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][12];
		document.querySelector(`.eastWins-sf-3`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][11];
		document.querySelector(`.eastWins-sf-4`).textContent = eastSemiFinalTeams[yearInPlayoffTeamArrays][10];
		
		
		document.querySelector(`.westName-cf-1`).textContent = westFinalTeams[yearInPlayoffTeamArrays][1].teamName;
		document.querySelector(`.westName-cf-2`).textContent = westFinalTeams[yearInPlayoffTeamArrays][2].teamName;
		document.querySelector(`.west-cf-1`).textContent = westFinalTeams[yearInPlayoffTeamArrays][3];
		document.querySelector(`.west-cf-2`).textContent = westFinalTeams[yearInPlayoffTeamArrays][4];
		document.querySelector(`.eastName-cf-1`).textContent = eastFinalTeams[yearInPlayoffTeamArrays][1].teamName;
		document.querySelector(`.eastName-cf-2`).textContent = eastFinalTeams[yearInPlayoffTeamArrays][2].teamName;
		document.querySelector(`.east-cf-1`).textContent = eastFinalTeams[yearInPlayoffTeamArrays][3];
		document.querySelector(`.east-cf-2`).textContent = eastFinalTeams[yearInPlayoffTeamArrays][4];
	} else {
		document.querySelector(`.westName-cf-1`).textContent = '';
		document.querySelector(`.westName-cf-2`).textContent = '';
		document.querySelector(`.west-cf-1`).textContent = '';
		document.querySelector(`.west-cf-2`).textContent = '';
		document.querySelector(`.eastName-cf-1`).textContent = '';
		document.querySelector(`.eastName-cf-2`).textContent = '';
		document.querySelector(`.east-cf-1`).textContent = '';
		document.querySelector(`.east-cf-2`).textContent = '';
	}
	
	if (ifConfFinalsPlayed[yearInPlayoffTeamArrays]){
		
		for (let i =1; i <=2; i++){
			document.querySelector(`.nbaFinalName-${i}`).textContent = nbaFinalTeams[yearInPlayoffTeamArrays][i].teamName;
			document.querySelector(`.nbaFinal-${i}`).textContent = nbaFinalTeams[yearInPlayoffTeamArrays][i+2];
			
			document.querySelector(`.westWins-cf-${i}`).textContent = westFinalTeams[yearInPlayoffTeamArrays][i+4];
			document.querySelector(`.eastWins-cf-${i}`).textContent = eastFinalTeams[yearInPlayoffTeamArrays][i+4];
		}
	} else {
		for (let i =1; i <=2; i++){
			document.querySelector(`.nbaFinalName-${i}`).textContent = '';
			document.querySelector(`.nbaFinal-${i}`).textContent = '';
			document.querySelector(`.westWins-cf-${i}`).textContent = '';
			document.querySelector(`.eastWins-cf-${i}`).textContent = '';
		}
	}
	
	if (ifFinalsPlayed[yearInPlayoffTeamArrays]){
		for (let i =1; i <=2; i++){
			document.querySelector(`.nbaFinalWins-${i}`).textContent = nbaFinalTeams[yearInPlayoffTeamArrays][i+4];
		}
		document.querySelector(`.nbaChampionText`).textContent = `${selectedPlayoffModalYear} NBA CHAMPIONS: ${nbaChampionsList[yearInPlayoffTeamArrays][1].teamName}`;
	} else {
		for (let i =1; i <=2; i++){
			document.querySelector(`.nbaFinalWins-${i}`).textContent = '';
		}
		document.querySelector(`.nbaChampionText`).textContent = ``;
	}
}

// Function for Playoff modal Play-In button
let btnSimPlayIn = document.querySelector('.btnSimPlayIn');
btnSimPlayIn.addEventListener('click', function() {
	console.log(`button sim play in  --- works`);

	let playoffYearToBeSimulated = selectedPlayoffModalYear-2025; // to understand from which year should the teams and results be taken
	
	// if PLAY-IN buttons hasn't been already pressed the following commands are run 
	if ( !ifPlayInGamesPlayed[playoffYearToBeSimulated] && areAllSeasonGamesPlayed === true) {
		
	// -----> SIMS WEST PLAY-IN GAME Team 7 vs Team 8 and stores team and players stats from the game
		let fullTeamPlayersGameStats = gameSimulation (westPlayInTeams[playoffYearToBeSimulated][1].numberInTeamList, westPlayInTeams[playoffYearToBeSimulated][2].numberInTeamList, 3);
	// winner gets pushed in Western conference array spot 7 
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? westPlayoffTeams[playoffYearToBeSimulated].push(westPlayInTeams[playoffYearToBeSimulated][1]) : westPlayoffTeams[playoffYearToBeSimulated].push(westPlayInTeams[playoffYearToBeSimulated][2]);
	// Loser gets pushed in westPlayInFinals array so that team can later play with Team 9 vs Team 10 winner 
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? westPlayInFinals.push([selectedPlayoffModalYear, westPlayInTeams[playoffYearToBeSimulated][2], 8 ]) : westPlayInFinals.push([selectedPlayoffModalYear, westPlayInTeams[playoffYearToBeSimulated][1], 7 ]);
	// adds both team scores to westPlayInTeams[] array which then will be put in html
		westPlayInTeams[playoffYearToBeSimulated][5] = fullTeamPlayersGameStats[0][0];
		westPlayInTeams[playoffYearToBeSimulated][6] = fullTeamPlayersGameStats[1][0];
		console.log(fullTeamPlayersGameStats);
		
	// -----> SIMS WEST PLAY-IN GAME Team 9 vs Team 10 and stores team and players stats from the game
		fullTeamPlayersGameStats = gameSimulation (westPlayInTeams[playoffYearToBeSimulated][3].numberInTeamList, westPlayInTeams[playoffYearToBeSimulated][4].numberInTeamList, 3);
	// winner gets pushed in westPlayInFinals array so that team can later play with Team 7 vs Team 8 loser 
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? westPlayInFinals[playoffYearToBeSimulated].push(westPlayInTeams[playoffYearToBeSimulated][3], 9) : westPlayInFinals[playoffYearToBeSimulated].push(westPlayInTeams[playoffYearToBeSimulated][4], 10);
	// adds both team scores to westPlayInTeams[] array which then will be put in html
		westPlayInTeams[playoffYearToBeSimulated][7] = fullTeamPlayersGameStats[0][0];
		westPlayInTeams[playoffYearToBeSimulated][8] = fullTeamPlayersGameStats[1][0];
		console.log(fullTeamPlayersGameStats);
		
	// -----> SIMS EAST PLAY-IN GAME Team 7 vs Team 8 and stores team and players stats from the game
		fullTeamPlayersGameStats = gameSimulation (eastPlayInTeams[playoffYearToBeSimulated][1].numberInTeamList, eastPlayInTeams[playoffYearToBeSimulated][2].numberInTeamList, 3);
	// winner gets pushed in Eastern conference array spot 7 
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? eastPlayoffTeams[playoffYearToBeSimulated].push(eastPlayInTeams[playoffYearToBeSimulated][1]) : eastPlayoffTeams[playoffYearToBeSimulated].push(eastPlayInTeams[playoffYearToBeSimulated][2]);
	// Loser gets pushed in eastPlayInFinals array so that team can later play with Team 9 vs Team 10 winner 
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? eastPlayInFinals.push([selectedPlayoffModalYear, eastPlayInTeams[playoffYearToBeSimulated][2], 8]) : eastPlayInFinals.push([selectedPlayoffModalYear, eastPlayInTeams[playoffYearToBeSimulated][1], 7 ]);
	// adds both team scores to eastPlayInTeams[] array which then will be put in html
		eastPlayInTeams[playoffYearToBeSimulated][5] = fullTeamPlayersGameStats[0][0];
		eastPlayInTeams[playoffYearToBeSimulated][6] = fullTeamPlayersGameStats[1][0];
		console.log(fullTeamPlayersGameStats);
		
	// -----> SIMS EAST PLAY-IN GAME Team 9 vs Team 10 and stores team and players stats from the game
		fullTeamPlayersGameStats = gameSimulation (eastPlayInTeams[playoffYearToBeSimulated][3].numberInTeamList, eastPlayInTeams[playoffYearToBeSimulated][4].numberInTeamList, 3);
	// winner gets pushed in westPlayInFinals array so that team can later play with Team 7 vs Team 8 loser 
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? eastPlayInFinals[playoffYearToBeSimulated].push(eastPlayInTeams[playoffYearToBeSimulated][3], 9) : eastPlayInFinals[playoffYearToBeSimulated].push(eastPlayInTeams[playoffYearToBeSimulated][4], 10);
	// adds both team scores to eastPlayInTeams[] array which then will be put in html
		eastPlayInTeams[playoffYearToBeSimulated][7] = fullTeamPlayersGameStats[0][0];
		eastPlayInTeams[playoffYearToBeSimulated][8] = fullTeamPlayersGameStats[1][0];
		console.log(fullTeamPlayersGameStats);
		
	// -----> SIMS WEST PLAY-IN FINAL
		fullTeamPlayersGameStats = gameSimulation (westPlayInFinals[playoffYearToBeSimulated][1].numberInTeamList, westPlayInFinals[playoffYearToBeSimulated][3].numberInTeamList, 3);
		// winner gets pushed in Western conference array spot 8
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? westPlayoffTeams[playoffYearToBeSimulated].push(westPlayInFinals[playoffYearToBeSimulated][1]) : westPlayoffTeams[playoffYearToBeSimulated].push(westPlayInFinals[playoffYearToBeSimulated][3]);
	// adds both team scores to westPlayInFinals[] array which then will be put in html
		westPlayInFinals[playoffYearToBeSimulated][5] = fullTeamPlayersGameStats[0][0];
		westPlayInFinals[playoffYearToBeSimulated][6] = fullTeamPlayersGameStats[1][0];
	
	// -----> SIMS EAST PLAY-IN FINAL
		fullTeamPlayersGameStats = gameSimulation (eastPlayInFinals[playoffYearToBeSimulated][1].numberInTeamList, eastPlayInFinals[playoffYearToBeSimulated][3].numberInTeamList, 3);
		// winner gets pushed in Western conference array spot 8
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? eastPlayoffTeams[playoffYearToBeSimulated].push(eastPlayInFinals[playoffYearToBeSimulated][1]) : eastPlayoffTeams[playoffYearToBeSimulated].push(eastPlayInFinals[playoffYearToBeSimulated][3]);
	// adds both team scores to eastPlayInFinals[] array which then will be put in html
		eastPlayInFinals[playoffYearToBeSimulated][5] = fullTeamPlayersGameStats[0][0];
		eastPlayInFinals[playoffYearToBeSimulated][6] = fullTeamPlayersGameStats[1][0];
		
		ifPlayInGamesPlayed.push(currentYear-1); // pushes in array each year so it can be known that the Play-In games were played
		playoffInformationByYear(selectedPlayoffModalYear); // updates Playoff HTML page
	
	} else if ( ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`PLAY-IN button was already pressed for this PLAYOFF YEAR`);
	} else {
		alert(`SEASON has't been simulated yet. Press SIM SEEASON in main menu`);
	}
});

// Function for Playoff modal CONFERENCE quarter final button
let btnSimQuarterFinal = document.querySelector('.btnSimQuarterFinal');
btnSimQuarterFinal.addEventListener('click', function() {
	console.log(`button sim Quearter Finals  --- works`);

	let numberOfSeriesPlayed = 0;
	let checkIfSeriesIsFinished = [0,0,0,0, 0,0,0,0];
	let playoffYearToBeSimulated = selectedPlayoffModalYear-2025; // to understand from which year should the teams and results be taken
	//let numberOfSeriesPlayed = 0;
	let fullTeamPlayersGameStats;
	//let checkIfSeriesIsFinished = [0,0,0,0, 0,0,0,0];
	
	// westPlayoffTeams.push([GADS;1,2,3,4,5, | 6,7,8,wins1,wins2, | wins3,wins4,wins5,wins6,wins7, | wins8]); 
	// function to sim WESTERN Conference quarter final games
	let simWestConferenceQuarterFinal = function (x, y) {
		fullTeamPlayersGameStats = gameSimulation (westPlayoffTeams[playoffYearToBeSimulated][x].numberInTeamList, westPlayoffTeams[playoffYearToBeSimulated][y].numberInTeamList, 3);
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? westPlayoffTeams[playoffYearToBeSimulated][x+8]++  : westPlayoffTeams[playoffYearToBeSimulated][y+8]++;
		if (westPlayoffTeams[playoffYearToBeSimulated][x+8] === 4 || westPlayoffTeams[playoffYearToBeSimulated][y+8] === 4){
			numberOfSeriesPlayed++;
			checkIfSeriesIsFinished[x-1] = 1;
			// saves winners of each series in westSemiFinalTeams: team + it's seed number
			if (westPlayoffTeams[playoffYearToBeSimulated][x+8] === 4){
				westSemiFinalTeams[playoffYearToBeSimulated][x] = westPlayoffTeams[playoffYearToBeSimulated][x];
				westSemiFinalTeams[playoffYearToBeSimulated][x+4] = x;
			} else if (westPlayoffTeams[playoffYearToBeSimulated][y+8] === 4) {
				westSemiFinalTeams[playoffYearToBeSimulated][x] = westPlayoffTeams[playoffYearToBeSimulated][y];
				westSemiFinalTeams[playoffYearToBeSimulated][x+4] = y;
			}
		}
	}
	//  westSemiFinalTeams = [[Year, TEAM1, TEAM2, TEAM3, TEAM4, seedNr1, seedNr2, seedNr3, seedNr4]]
	// function to sim EASTERN Conference quarter final games
	let simEastConferenceQuarterFinal = function (x, y) {
		fullTeamPlayersGameStats = gameSimulation (eastPlayoffTeams[playoffYearToBeSimulated][x].numberInTeamList, eastPlayoffTeams[playoffYearToBeSimulated][y].numberInTeamList, 3);
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? eastPlayoffTeams[playoffYearToBeSimulated][x+8]++  : eastPlayoffTeams[playoffYearToBeSimulated][y+8]++;
		if (eastPlayoffTeams[playoffYearToBeSimulated][x+8] === 4 || eastPlayoffTeams[playoffYearToBeSimulated][y+8] === 4){
			numberOfSeriesPlayed++;
			checkIfSeriesIsFinished[x+3] = 1;
			// saves winners of each series in westSemiFinalTeams: team + it's seed number
			if (eastPlayoffTeams[playoffYearToBeSimulated][x+8] === 4){
				eastSemiFinalTeams[playoffYearToBeSimulated][x] = eastPlayoffTeams[playoffYearToBeSimulated][x];
				eastSemiFinalTeams[playoffYearToBeSimulated][x+4] = x;
			} else if (eastPlayoffTeams[playoffYearToBeSimulated][y+8] === 4) {
				eastSemiFinalTeams[playoffYearToBeSimulated][x] = eastPlayoffTeams[playoffYearToBeSimulated][y];
				eastSemiFinalTeams[playoffYearToBeSimulated][x+4] = y;
			}
		}
	}
	
	// if PQUARTER FINAL button hasn't been already pressed and PLAY-IN buttons has been - the following commands are run 
	if ( !ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated]) {
		westPlayoffTeams[playoffYearToBeSimulated].push(0,0,0,0,0,0,0,0);
		eastPlayoffTeams[playoffYearToBeSimulated].push(0,0,0,0,0,0,0,0);
		
		westSemiFinalTeams.push([selectedPlayoffModalYear, 0,0,0,0, 0,0,0,0]); // --> [Year, TEAM1, TEAM2, TEAM3, TEAM4, seedNr1, seedNr2, seedNr3, seedNr4]
		eastSemiFinalTeams.push([selectedPlayoffModalYear, 0,0,0,0, 0,0,0,0]); // --> [Year, TEAM1, TEAM2, TEAM3, TEAM4, seedNr1, seedNr2, seedNr3, seedNr4]
		
		do {
			// -----> SIMS WEST CONF. FINAL. 1 VS 8
			if (checkIfSeriesIsFinished[0] !== 1) { simWestConferenceQuarterFinal (1,8); }
			// -----> SIMS WEST CONF. FINAL. 4 VS 5
			if (checkIfSeriesIsFinished[3] !== 1) { simWestConferenceQuarterFinal (4,5); }
			// -----> SIMS WEST CONF. FINAL. 3 VS 6
			if (checkIfSeriesIsFinished[2] !== 1) { simWestConferenceQuarterFinal (3,6); }
			// -----> SIMS WEST CONF. FINAL. 2 VS 7
			if (checkIfSeriesIsFinished[1] !== 1) { simWestConferenceQuarterFinal (2,7); }
			
			// -----> SIMS EAST CONF. FINAL. 1 VS 8
			if (checkIfSeriesIsFinished[4] !== 1) { simEastConferenceQuarterFinal (1,8); }
			// -----> SIMS EAST CONF. FINAL. 4 VS 5
			if (checkIfSeriesIsFinished[7] !== 1) { simEastConferenceQuarterFinal (4,5); }
			// -----> SIMS EAST CONF. FINAL. 3 VS 6
			if (checkIfSeriesIsFinished[6] !== 1) { simEastConferenceQuarterFinal (3,6); }
			// -----> SIMS EAST CONF. FINAL. 2 VS 7
			if (checkIfSeriesIsFinished[5] !== 1) { simEastConferenceQuarterFinal (2,7); }

		} while (numberOfSeriesPlayed !== 8);
		
		console.log(`westSemiFinalTeams:::`);
		console.log(westSemiFinalTeams);
		console.log(`eastSemiFinalTeams:::`);
		console.log(eastSemiFinalTeams);
		
		if (numberOfSeriesPlayed === 8){
			ifQuerterFinalsPlayed.push(currentYear-1); // pushes in array each year so it can be known that the Conference Quarter final games were played
			playoffInformationByYear(selectedPlayoffModalYear); // updates Playoff HTML page
		}
	} else if ( ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`QUARTER FINAL button was already pressed for this PLAYOFF YEAR`);
	} else if ( !ifQuerterFinalsPlayed[playoffYearToBeSimulated] && !ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`PLAY-IN games haven't been played for this year yet!!!\n\nFirst press SIM PLAY-IN`);
	}
});

// Function for Playoff modal CONFERENCE semi finals button
let btnSimConferenceSemiFinal = document.querySelector('.btnSimConferenceSemiFinal');
btnSimConferenceSemiFinal.addEventListener('click', function() {
	console.log(`button sim Conference Semi Finals  --- works`);

	let numberOfSeriesPlayed = 0;
	let checkIfSeriesIsFinished = [0,0, 0,0];
	let playoffYearToBeSimulated = selectedPlayoffModalYear-2025; // to understand from which year should the teams and results be taken
	let fullTeamPlayersGameStats;

	// westSemiFinalTeams.push([GADS | 1,2,3,4,seed1, | seed2, seed3, seed4, wins1, wins2, | wins3, wins4); 0 - 12
	// function to sim WESTERN Conference Semi Final games
	let simWestConferenceSemiFinal = function (x, y) {
		fullTeamPlayersGameStats = gameSimulation (westSemiFinalTeams[playoffYearToBeSimulated][x].numberInTeamList, westSemiFinalTeams[playoffYearToBeSimulated][y].numberInTeamList, 3);
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? westSemiFinalTeams[playoffYearToBeSimulated][x+8]++  : westSemiFinalTeams[playoffYearToBeSimulated][y+8]++;
		if (westSemiFinalTeams[playoffYearToBeSimulated][x+8] === 4 || westSemiFinalTeams[playoffYearToBeSimulated][y+8] === 4){
			numberOfSeriesPlayed++;
			checkIfSeriesIsFinished[x-1] = 1;
			// saves winners of each series in westFinalTeams: team + it's seed number
			if (westSemiFinalTeams[playoffYearToBeSimulated][x+8] === 4){
				westFinalTeams[playoffYearToBeSimulated][x] = westSemiFinalTeams[playoffYearToBeSimulated][x];
				westFinalTeams[playoffYearToBeSimulated][x+2] = westSemiFinalTeams[playoffYearToBeSimulated][x+4];
			} else if (westSemiFinalTeams[playoffYearToBeSimulated][y+8] === 4) {
				westFinalTeams[playoffYearToBeSimulated][x] = westSemiFinalTeams[playoffYearToBeSimulated][y];
				westFinalTeams[playoffYearToBeSimulated][x+2] = westSemiFinalTeams[playoffYearToBeSimulated][y+4];
			}
		}
	}
	// function to sim EASTERN Conference Semi Final games
	let simEastConferenceSemiFinal = function (x, y) {
		fullTeamPlayersGameStats = gameSimulation (eastSemiFinalTeams[playoffYearToBeSimulated][x].numberInTeamList, eastSemiFinalTeams[playoffYearToBeSimulated][y].numberInTeamList, 3);
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? eastSemiFinalTeams[playoffYearToBeSimulated][x+8]++  : eastSemiFinalTeams[playoffYearToBeSimulated][y+8]++;
		if (eastSemiFinalTeams[playoffYearToBeSimulated][x+8] === 4 || eastSemiFinalTeams[playoffYearToBeSimulated][y+8] === 4){
			numberOfSeriesPlayed++;
			checkIfSeriesIsFinished[x+1] = 1;
			// saves winners of each series in eastFinalTeams: team + it's seed number
			if (eastSemiFinalTeams[playoffYearToBeSimulated][x+8] === 4){
				eastFinalTeams[playoffYearToBeSimulated][x] = eastSemiFinalTeams[playoffYearToBeSimulated][x];
				eastFinalTeams[playoffYearToBeSimulated][x+2] = eastSemiFinalTeams[playoffYearToBeSimulated][x+4];
			} else if (eastSemiFinalTeams[playoffYearToBeSimulated][y+8] === 4) {
				eastFinalTeams[playoffYearToBeSimulated][x] = eastSemiFinalTeams[playoffYearToBeSimulated][y];
				eastFinalTeams[playoffYearToBeSimulated][x+2] = eastSemiFinalTeams[playoffYearToBeSimulated][y+4];
			}
		}
	}
	
	// if QUARTER FINAL button hasn't been already pressed and PLAY-IN + QUARTER FINAL buttons have been - the following commands are run 
	if ( !ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] && ifQuerterFinalsPlayed[playoffYearToBeSimulated]) {
		westSemiFinalTeams[playoffYearToBeSimulated].push(0,0,0,0); // adds 4 elements where game WINS are stored
		eastSemiFinalTeams[playoffYearToBeSimulated].push(0,0,0,0);
		
		westFinalTeams.push([selectedPlayoffModalYear, 0,0, 0,0]); // --> [Year, TEAM1, TEAM2, seedNr1, seedNr2]
		eastFinalTeams.push([selectedPlayoffModalYear, 0,0, 0,0]); // --> [Year, TEAM1, TEAM2, seedNr1, seedNr2]
		
		do {  
			// -----> SIMS WEST FINAL. 1 VS 4
			if (checkIfSeriesIsFinished[0] !== 1) { simWestConferenceSemiFinal (1,4); }
			// -----> SIMS WEST FINAL. 2 VS 3
			if (checkIfSeriesIsFinished[1] !== 1) { simWestConferenceSemiFinal (2,3); }
			// -----> SIMS EAST FINAL. 1 VS 4
			if (checkIfSeriesIsFinished[2] !== 1) { simEastConferenceSemiFinal (1,4); }
			// -----> SIMS EAST FINAL. 2 VS 3
			if (checkIfSeriesIsFinished[3] !== 1) { simEastConferenceSemiFinal (2,3); }
		} while (numberOfSeriesPlayed !== 4);
		
		console.log(`westFinalTeams:::`);
		console.log(westFinalTeams);
		console.log(`eastFinalTeams:::`);
		console.log(eastFinalTeams);
		
		if (numberOfSeriesPlayed === 4){
			ifConfSemiFinalsPlayed.push(currentYear-1); // pushes in array each year so it can be known that the Conference Quarter final games were played
			playoffInformationByYear(selectedPlayoffModalYear); // updates Playoff HTML page
		}
	} else if ( ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`SEMI FINALS button was already pressed for this PLAYOFF YEAR`);
	} else if ( !ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && !ifQuerterFinalsPlayed[playoffYearToBeSimulated] && !ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`PLAY-IN and QUARTER FINAL games haven't been played for this year yet!!!\n\nFirst press SIM PLAY-IN and QUARTER FINAL`);
	} else if ( !ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && !ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`QUARTER FINAL games haven't been played for this year yet!!!\n\nFirst press SIM  QUARTER FINAL`);
	}
});


// ----> Function for Playoff modal CONFERENCE  finals button
let btnSimConferenceFinal = document.querySelector('.btnSimConferenceFinal');
btnSimConferenceFinal.addEventListener('click', function() {
	console.log(`button sim Conference Finals  --- works`);

	let numberOfSeriesPlayed = 0;
	let checkIfSeriesIsFinished = [0, 0];
	let playoffYearToBeSimulated = selectedPlayoffModalYear-2025; // to understand from which year should the teams and results be taken
	let fullTeamPlayersGameStats;

	// westFinalTeams.push([GADS | 1,2,seed1,seed2, wins1, | wins2); 0 - 6
	// function to sim WESTERN Conference Semi Final games
	let simWestConferenceFinal = function (x, y) {
		fullTeamPlayersGameStats = gameSimulation (westFinalTeams[playoffYearToBeSimulated][x].numberInTeamList, westFinalTeams[playoffYearToBeSimulated][y].numberInTeamList, 3);
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? westFinalTeams[playoffYearToBeSimulated][x+4]++  : westFinalTeams[playoffYearToBeSimulated][y+4]++;
		if (westFinalTeams[playoffYearToBeSimulated][x+4] === 4 || westFinalTeams[playoffYearToBeSimulated][y+4] === 4){
			numberOfSeriesPlayed++;
			checkIfSeriesIsFinished[0] = 1;
			// saves winners of each series in westFinalTeams: team + it's seed number
			if (westFinalTeams[playoffYearToBeSimulated][x+4] === 4){
				nbaFinalTeams[playoffYearToBeSimulated][1] = westFinalTeams[playoffYearToBeSimulated][x]; // saves team object
				nbaFinalTeams[playoffYearToBeSimulated][3] = westFinalTeams[playoffYearToBeSimulated][x+2]; // team's seed number
			} else if (westFinalTeams[playoffYearToBeSimulated][y+4] === 4) {
				nbaFinalTeams[playoffYearToBeSimulated][1] = westFinalTeams[playoffYearToBeSimulated][y]; // team object
				nbaFinalTeams[playoffYearToBeSimulated][3] = westFinalTeams[playoffYearToBeSimulated][y+2]; // team's seed number
			}
		}
	}
	// function to sim EASTERN Conference Semi Final games
	let simEastConferenceFinal = function (x, y) {
		fullTeamPlayersGameStats = gameSimulation (eastFinalTeams[playoffYearToBeSimulated][x].numberInTeamList, eastFinalTeams[playoffYearToBeSimulated][y].numberInTeamList, 3);
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? eastFinalTeams[playoffYearToBeSimulated][x+4]++  : eastFinalTeams[playoffYearToBeSimulated][y+4]++;
		if (eastFinalTeams[playoffYearToBeSimulated][x+4] === 4 || eastFinalTeams[playoffYearToBeSimulated][y+4] === 4){
			numberOfSeriesPlayed++;
			checkIfSeriesIsFinished[1] = 1;
			// saves winners of each series in eastFinalTeams: team + it's seed number
			if (eastFinalTeams[playoffYearToBeSimulated][x+4] === 4){
				nbaFinalTeams[playoffYearToBeSimulated][2] = eastFinalTeams[playoffYearToBeSimulated][x]; // team object
				nbaFinalTeams[playoffYearToBeSimulated][4] = eastFinalTeams[playoffYearToBeSimulated][x+2]; // team's seed number
			} else if (eastFinalTeams[playoffYearToBeSimulated][y+4] === 4) {
				nbaFinalTeams[playoffYearToBeSimulated][2] = eastFinalTeams[playoffYearToBeSimulated][y]; // team object
				nbaFinalTeams[playoffYearToBeSimulated][4] = eastFinalTeams[playoffYearToBeSimulated][y+2]; // team's seed number
			}
		}
	}
	
	// if QUARTER FINAL button hasn't been already pressed and PLAY-IN + QUARTER FINAL buttons have been - the following commands are run 
	if ( !ifConfFinalsPlayed[playoffYearToBeSimulated] && ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] && ifQuerterFinalsPlayed[playoffYearToBeSimulated]) {
		westFinalTeams[playoffYearToBeSimulated].push(0,0); // adds 2 elements where game WINS are stored
		eastFinalTeams[playoffYearToBeSimulated].push(0,0);
		
		nbaFinalTeams.push([selectedPlayoffModalYear, 0,0, 0,0]); // --> [Year, TEAM1, TEAM2, seedNr1, seedNr2]
		
		do {  
			// -----> SIMS WEST FINAL. 1 VS 2
			if (checkIfSeriesIsFinished[0] !== 1) { simWestConferenceFinal (1,2); }
			// -----> SIMS EAST FINAL. 1 VS 2
			if (checkIfSeriesIsFinished[1] !== 1) { simEastConferenceFinal (1,2); }
		} while (numberOfSeriesPlayed !== 2);
		
		console.log(`nbaFinalTeams:::`);
		console.log(nbaFinalTeams);
		
		if (numberOfSeriesPlayed === 2){
			ifConfFinalsPlayed.push(currentYear-1); // pushes in array each year so it can be known that the Conference Quarter final games were played
			playoffInformationByYear(selectedPlayoffModalYear); // updates Playoff HTML page
		}
	} else if ( ifConfFinalsPlayed[playoffYearToBeSimulated] && ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`SEMI FINALS button was already pressed for this PLAYOFF YEAR`);
	} else if ( !ifConfFinalsPlayed[playoffYearToBeSimulated] && !ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && !ifQuerterFinalsPlayed[playoffYearToBeSimulated] && !ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`PLAY-IN, QUARTER FINAL,SEMI FINAL games haven't been played for this year yet!!!\n\nFirst press SIM PLAY-IN, QUARTER FINAL, CONFERENCE FINALS`);
	} else if ( !ifConfFinalsPlayed[playoffYearToBeSimulated] && !ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && !ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`QUARTER FINAL games haven't been played for this year yet!!!\n\nFirst press SIM  QUARTER FINAL`);
	} else if ( !ifConfFinalsPlayed[playoffYearToBeSimulated] && !ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`Conference Semi Final games haven't been played for this year yet!!!\n\nFirst press SIM SEMI FINALS`);
	}
});

// ----> Function for Playoff modal NBA FINALS button
let btnSimFinal = document.querySelector('.btnSimFinal');
btnSimFinal.addEventListener('click', function() {
	console.log(`button sim Conference Finals  --- works`);

	let numberOfSeriesPlayed = 0;
	let playoffYearToBeSimulated = selectedPlayoffModalYear-2025; // to understand from which year should the teams and results be taken
	let fullTeamPlayersGameStats;

	// nbaFinalTeams.push([GADS | 1,2,seed1,seed2, wins1, | wins2); 0 - 6
	// function to sim NBA FINAL games
	let simNbaFinalGames = function (x, y) {
		
		// clears green color for previous year champion tram upgrade increase
		for (let i = 0; i < teamsArray.length; i++){
			for(let j = 0; j < 9; j++){
				document.getElementById(`teamUpgrade-${i}-${j}`).style.color = "";
			}
		}
		
		fullTeamPlayersGameStats = gameSimulation (nbaFinalTeams[playoffYearToBeSimulated][x].numberInTeamList, nbaFinalTeams[playoffYearToBeSimulated][y].numberInTeamList, 3);
		(fullTeamPlayersGameStats[0][0] > fullTeamPlayersGameStats[1][0]) ? nbaFinalTeams[playoffYearToBeSimulated][x+4]++  : nbaFinalTeams[playoffYearToBeSimulated][y+4]++;
		if (nbaFinalTeams[playoffYearToBeSimulated][x+4] === 4 || nbaFinalTeams[playoffYearToBeSimulated][y+4] === 4){
			if (nbaFinalTeams[playoffYearToBeSimulated][x+4] == 4){
				console.log(`X team wins`);
				nbaChampionsList.push([parseInt(selectedPlayoffModalYear)]);
				nbaChampionsList[playoffYearToBeSimulated].push(nbaFinalTeams[playoffYearToBeSimulated][x]); // saves YEAR and NBA CHAMPION team object
				numberOfSeriesPlayed = 1;
				console.log(nbaChampionsList);
				
				// adds 1 upgrade to random teamUpgrades index
				if ( nbaFinalTeams[playoffYearToBeSimulated][x] == userTeam ) {
					openTeamUpgradeIncreaseModal();
				} else {
					let randomTeamUpgrade = 0;
					do {
						randomTeamUpgrade = Math.floor(Math.random()* 9)
					} while (nbaFinalTeams[playoffYearToBeSimulated][x].teamUpgrades[ randomTeamUpgrade ] >= 5);
					nbaFinalTeams[playoffYearToBeSimulated][x].teamUpgrades[ randomTeamUpgrade ]++; // increases champion's teams upgrade
					document.getElementById(`teamUpgrade-${nbaFinalTeams[playoffYearToBeSimulated][x].numberInTeamList}-${randomTeamUpgrade}`).style.color = "#2AB500"; // colors last champion upgrade in green
				}
				updateTeamUpgrades();				
// offense skills +3/ defense sk. +3/ shooting sk. +3/ physical sk. +3/ rookies all sk. +1/ offense boost/ defense boost/ trade bonus +1 overal got

			} else if (nbaFinalTeams[playoffYearToBeSimulated][y+4] == 4) {
				console.log(`Y team wins`);
				nbaChampionsList.push([parseInt(selectedPlayoffModalYear)]);
				nbaChampionsList[playoffYearToBeSimulated].push(nbaFinalTeams[playoffYearToBeSimulated][y]); // saves YEAR and NBA CHAMPION team object
				numberOfSeriesPlayed = 1;
				console.log(nbaChampionsList);
				
				// adds 1 upgrade to random teamUpgrades index
				if ( nbaFinalTeams[playoffYearToBeSimulated][y] == userTeam ) {
					openTeamUpgradeIncreaseModal();
				} else {
					let randomTeamUpgrade = 0;
					do {
						randomTeamUpgrade = Math.floor(Math.random()* 9)
					} while (nbaFinalTeams[playoffYearToBeSimulated][y].teamUpgrades[ randomTeamUpgrade ] >= 5);
					nbaFinalTeams[playoffYearToBeSimulated][y].teamUpgrades[ randomTeamUpgrade ]++;
					document.getElementById(`teamUpgrade-${nbaFinalTeams[playoffYearToBeSimulated][y].numberInTeamList}-${randomTeamUpgrade}`).style.color = "#2AB500"; // colors last champion upgrade in green
				}
				updateTeamUpgrades();
// offense skills +3/ defense sk. +3/ shooting sk. +3/ physical sk. +3/ rookies all sk. +1/ offense boost/ defense boost/ trade bonus +1 overal got
			} else {
				console.log(`SOME ERROR - data in nbaChampionsList was not pushed in!!!!`);
			}
			numberOfSeriesPlayed = 1;
		}
	}

	// if QUARTER FINAL button hasn't been already pressed and PLAY-IN + QUARTER FINAL buttons have been - the following commands are run 
	if ( !ifFinalsPlayed[playoffYearToBeSimulated] && ifConfFinalsPlayed[playoffYearToBeSimulated] && ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] && ifQuerterFinalsPlayed[playoffYearToBeSimulated]) {
		nbaFinalTeams[playoffYearToBeSimulated].push(0,0); // adds 2 elements where game WINS are stored
		
		do {  
			// -----> SIMS WEST FINAL. 1 VS 2
			simNbaFinalGames (1,2);
		} while (numberOfSeriesPlayed !== 1);
		
		console.log(`nbaFinalTeams:::`);
		console.log(nbaFinalTeams);
		console.log(`nbaChampionsList ---->`);
		console.log(nbaChampionsList);
		
		if (numberOfSeriesPlayed === 1){
			ifFinalsPlayed.push(currentYear-1); // pushes in array each year so it can be known that the Conference Quarter final games were played
			playoffInformationByYear(selectedPlayoffModalYear); // updates Playoff HTML page

			retirePlayers();
			playerDevelopmentEndYear(); // increases/decreases player skills
			seasonsPlayed++;
			nbaDraftAvailable = true;
			selectCountryUpgrade(); // checks if any team has country boost upgrade and applies random country if it has the country boost
			updateCountryValues(); // changes each country's basketball popularity + player quality: random -3...+3 + Country boosts from NBA teams
			
			// after NBA Finals - 5 player trades are made
			for (let i = 0; i < 5; i++){
				tradePlayers();
			}
			// if any team has players with rading >= 90, then one of them is sent away as a FA to other team - this is so 1 team doesn't start to dominate the league
			find90OveralFA();

			allPlayerTrades.push(`--------------------------------------------------------------------------------------------------------------------------------------------------------------------------`);
			
			document.querySelector(".btn-playoff").style.backgroundColor = ""; // green color taken off
			document.querySelector(".btn-mockDraft").style.backgroundColor = "LightGreen"; // indicates next Playoff needs to be simulated
		}
	} else if ( ifFinalsPlayed[playoffYearToBeSimulated] && ifConfFinalsPlayed[playoffYearToBeSimulated] && ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`SIM FINALS button was already pressed for this PLAYOFF YEAR`);
	} else if ( !ifFinalsPlayed[playoffYearToBeSimulated] && !ifConfFinalsPlayed[playoffYearToBeSimulated] && !ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && !ifQuerterFinalsPlayed[playoffYearToBeSimulated] && !ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`PLAY-IN, QUARTER FINAL,SEMI FINAL, CONFERENCE FINALS games haven't been played for this year yet!!!\n\nFirst press SIM PLAY-IN, QUARTER FINAL, SEMI FINALS, CONFERENCE FINALS`);
	} else if ( !ifFinalsPlayed[playoffYearToBeSimulated] && !ifConfFinalsPlayed[playoffYearToBeSimulated] && !ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && !ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`QUARTER FINAL, SEMI FINAL, CONFERENCE FINALS games haven't been played for this year yet!!!\n\nFirst press SIM QUARTER FINAL, SEMI FINALS and CONFERENCE FINALS`);
	} else if ( !ifFinalsPlayed[playoffYearToBeSimulated] && !ifConfFinalsPlayed[playoffYearToBeSimulated] && !ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`SEMI FINAL, CONFERENCE FINALS games haven't been played for this year yet!!!\n\nFirst press SIM SEMI FINAL, CONFERENCE FINALS`);
	} else if ( !ifFinalsPlayed[playoffYearToBeSimulated] && !ifConfFinalsPlayed[playoffYearToBeSimulated] && ifConfSemiFinalsPlayed[playoffYearToBeSimulated] && ifQuerterFinalsPlayed[playoffYearToBeSimulated] && ifPlayInGamesPlayed[playoffYearToBeSimulated] ) {
		alert(`CONFERENCE FINALS games haven't been played for this year yet!!!\n\nFirst press SIM CONFERENCE FINALS`);
	}
	
});

	// Function to retire players who are over 30 age and below 70 overal
let retirePlayers = function (){
	nbaRetiredPlayers.push([currentYear]); // adds new array inside nbaRetiredPlayers array and sets first value currentYear
	for (let i = 0; i < teamsArray.length; i++){
		for (let j = 0; j < teamsArray[i].roster.length; j++){
			teamsArray[i].roster[j].calcPlayerOveral();
			if (teamsArray[i].roster[j].overal < 71.50 && teamsArray[i].roster[j].age > 30){
				
				// Deletes retired player from Teams Lineup array
				for (let x = 0; x < teamsArray[i].lineup.length; x++){
					if ( teamsArray[i].lineup[x]  ==  teamsArray[i].roster[j] ) {
						teamsArray[i].lineup.splice(x,1);
					}
				}
				nbaRetiredPlayers[seasonsPlayed].push(teamsArray[i].roster[j]); // pushes retired player in nbaRetiredPlayers array 
				teamsArray[i].roster.splice(j,1); // take out from team roster retired player using splice() method
			}
		}
	}
	// sorts nbaRetiredPlayers array from best overal to worst overal of retured players
	for (let i = 0; i < nbaRetiredPlayers[seasonsPlayed].length; i++){
		nbaRetiredPlayers[seasonsPlayed].sort(function (a, b) {return b.overal - a.overal});
	}
	
	console.log(nbaRetiredPlayers);
	
	retiredYearSelect.appendChild(new Option(`${currentYear-1}`, `${currentYear-1}`, false, true)); // Use the Option constructor: args text, value, defaultSelected, selected
	
	retiredInformationByYear(currentYear-1);
};


	// Function to display list of retired players from year year
let retiredInformationByYear = function (dropdownYear) {
	
	let option_value;
	let option_text;
	if (typeof dropdownYear === 'object') {
		option_value = dropdownYear.options[dropdownYear.selectedIndex].value;
		option_text = dropdownYear.options[dropdownYear.selectedIndex].text;
		//alert('The option value is "' + option_value + '"\nand the text is "' + option_text + '"');
	} else {
		option_value = dropdownYear;
	}
	selectedPlayoffModalYear = option_value;
	let yearRetiredPlayersArrays = option_value - 2025;
	
	let retiredTable = document.getElementById("retiredPlayerTable"); 
	let rowNumberAtStart = retiredTable.rows.length;
	// deletes rows in case the previous list was longer than the actual new
	while (rowNumberAtStart > 1){ 
		retiredTable.deleteRow(1);
		rowNumberAtStart--;
	};
	
	// make new rows for retired player list from year selected
	for (let i = nbaRetiredPlayers[yearRetiredPlayersArrays].length - 1; i > 0; i--) {
		let tableRowIndex = 0;
		let rowTotals = retiredTable.insertRow(tableRowIndex + 1);

		tableRowIndex++;
		let arrayRetiredPlayers = [];
		for (let j = 1; j <= 3; j++) {
			arrayRetiredPlayers.push(rowTotals.insertCell());
		}
			arrayRetiredPlayers[0].innerHTML = nbaRetiredPlayers[yearRetiredPlayersArrays][i].name; //Retired player name surname
			arrayRetiredPlayers[1].innerHTML = nbaRetiredPlayers[yearRetiredPlayersArrays][i].age; //Retired player age
			arrayRetiredPlayers[2].innerHTML = parseFloat(nbaRetiredPlayers[yearRetiredPlayersArrays][i].overal).toFixed(); //Retired player overal
	}
	
};

	// Function to display list of NBA Mock Draft rookies from each year 
let mockDraftByYear = function (dropdownYear) {
	
	let option_value;
	let option_text;
	if (typeof dropdownYear === 'object') {
		option_value = dropdownYear.options[dropdownYear.selectedIndex].value;
		option_text = dropdownYear.options[dropdownYear.selectedIndex].text;
		//alert('The option value is "' + option_value + '"\nand the text is "' + option_text + '"');
	} else {
		option_value = dropdownYear;
	}
	//selectedPlayoffModalYear = option_value;
	let mockDraftYear = option_value - 2025;
	
	let mockDraftTable = document.getElementById("mockDraftPlayerTable"); 

	let rowNumberAtStart = mockDraftTable.rows.length;
	// deletes rows in case the previous list was longer than the actual new
	while (rowNumberAtStart > 1){ 
		mockDraftTable.deleteRow(1);
		rowNumberAtStart--;
	};

	// make new rows for mock draft list from year selected
	for (let i = rookieClass[mockDraftYear].length - 1; i > 0; i--) {
		let tableRowIndex = 0;
		let rowTotals = mockDraftTable.insertRow(tableRowIndex + 1);

		tableRowIndex++;
		let arrayMockDraftPlayers = [];
		for (let j = 1; j <= 28; j++) {
			arrayMockDraftPlayers.push(rowTotals.insertCell());
		}
			arrayMockDraftPlayers[0].innerHTML = i;
			arrayMockDraftPlayers[1].innerHTML = rookieClass[mockDraftYear][i].name; //Retired player name surname
			arrayMockDraftPlayers[2].innerHTML = rookieClass[mockDraftYear][i].age; //Retired player age
			arrayMockDraftPlayers[3].innerHTML = parseFloat(rookieClass[mockDraftYear][i].overal).toFixed(); //Retired player overal
			arrayMockDraftPlayers[4].innerHTML = rookieClass[mockDraftYear][i].position;
			arrayMockDraftPlayers[5].innerHTML = rookieClass[mockDraftYear][i].secPosition;
			arrayMockDraftPlayers[6].innerHTML = rookieClass[mockDraftYear][i].country; //Retired player age
			
			arrayMockDraftPlayers[7].innerHTML = rookieClass[mockDraftYear][i].ins;
			arrayMockDraftPlayers[8].innerHTML = rookieClass[mockDraftYear][i].pt2;
			arrayMockDraftPlayers[9].innerHTML = rookieClass[mockDraftYear][i].pt3;
			arrayMockDraftPlayers[10].innerHTML = rookieClass[mockDraftYear][i].ft;
			arrayMockDraftPlayers[11].innerHTML = rookieClass[mockDraftYear][i].jum;
			arrayMockDraftPlayers[12].innerHTML = rookieClass[mockDraftYear][i].str;
			arrayMockDraftPlayers[13].innerHTML = rookieClass[mockDraftYear][i].spe;
			arrayMockDraftPlayers[14].innerHTML = rookieClass[mockDraftYear][i].qui;
			arrayMockDraftPlayers[15].innerHTML = rookieClass[mockDraftYear][i].dri;
			arrayMockDraftPlayers[16].innerHTML = rookieClass[mockDraftYear][i].pas;
			arrayMockDraftPlayers[17].innerHTML = rookieClass[mockDraftYear][i].ore;
			arrayMockDraftPlayers[18].innerHTML = rookieClass[mockDraftYear][i].dre;
			arrayMockDraftPlayers[19].innerHTML = rookieClass[mockDraftYear][i].oaw;
			arrayMockDraftPlayers[20].innerHTML = rookieClass[mockDraftYear][i].daw;
			arrayMockDraftPlayers[21].innerHTML = rookieClass[mockDraftYear][i].blk;
			arrayMockDraftPlayers[22].innerHTML = rookieClass[mockDraftYear][i].stl;
			arrayMockDraftPlayers[23].innerHTML = rookieClass[mockDraftYear][i].end;
			arrayMockDraftPlayers[24].innerHTML = rookieClass[mockDraftYear][i].inj;
			arrayMockDraftPlayers[25].innerHTML = "?";
			arrayMockDraftPlayers[26].innerHTML = draftPicksAndTeams[mockDraftYear][i-1][0];
			arrayMockDraftPlayers[27].innerHTML = draftPicksAndTeams[mockDraftYear][i-1][1];
	}
	if (option_value !== currentYear-1 || nbaDraftAvailable == false){
		document.querySelector(".btn-simDraft").disabled = true;  // blocks START DRAFT button
		document.querySelector(".btn-simDraft").style.backgroundColor = "red"; // makes the START DRAFT button red
	} else {
		document.querySelector(".btn-simDraft").disabled = false;  // activates START DRAFT button
		document.querySelector(".btn-simDraft").style.backgroundColor = ""; // takes off red color from the START DRAFT button
		document.querySelector(".btn-simDraft").style.color = "";
	}
};

// function used to update live draft information during NBA draft
let updatedMockDraftinformation = function (currentYear){
	option_value = currentYear;
	
	//selectedPlayoffModalYear = option_value;
	let mockDraftYear = option_value - 2025;
	
	let mockDraftTable = document.getElementById("mockDraftPlayerTable"); 

	let rowNumberAtStart = mockDraftTable.rows.length;
	// deletes rows in case the previous list was longer than the actual new
	while (rowNumberAtStart > 1){ 
		mockDraftTable.deleteRow(1);
		rowNumberAtStart--;
	};

	// make new rows for mock draft list from year selected
	for (let i = rookieClass[mockDraftYear].length - 1; i > 0; i--) {
		let tableRowIndex = 0;
		let rowTotals = mockDraftTable.insertRow(tableRowIndex + 1);

		tableRowIndex++;
		let arrayMockDraftPlayers = [];
		for (let j = 1; j <= 28; j++) {
			arrayMockDraftPlayers.push(rowTotals.insertCell());
		}
			arrayMockDraftPlayers[0].innerHTML = i;
			arrayMockDraftPlayers[1].innerHTML = rookieClass[mockDraftYear][i].name; //Retired player name surname
			arrayMockDraftPlayers[2].innerHTML = rookieClass[mockDraftYear][i].age; //Retired player age
			arrayMockDraftPlayers[3].innerHTML = parseFloat(rookieClass[mockDraftYear][i].overal).toFixed(); //Retired player overal
			arrayMockDraftPlayers[4].innerHTML = rookieClass[mockDraftYear][i].position;
			arrayMockDraftPlayers[5].innerHTML = rookieClass[mockDraftYear][i].secPosition;
			arrayMockDraftPlayers[6].innerHTML = rookieClass[mockDraftYear][i].country; //Retired player age
			
			arrayMockDraftPlayers[7].innerHTML = rookieClass[mockDraftYear][i].ins;
			arrayMockDraftPlayers[8].innerHTML = rookieClass[mockDraftYear][i].pt2;
			arrayMockDraftPlayers[9].innerHTML = rookieClass[mockDraftYear][i].pt3;
			arrayMockDraftPlayers[10].innerHTML = rookieClass[mockDraftYear][i].ft;
			arrayMockDraftPlayers[11].innerHTML = rookieClass[mockDraftYear][i].jum;
			arrayMockDraftPlayers[12].innerHTML = rookieClass[mockDraftYear][i].str;
			arrayMockDraftPlayers[13].innerHTML = rookieClass[mockDraftYear][i].spe;
			arrayMockDraftPlayers[14].innerHTML = rookieClass[mockDraftYear][i].qui;
			arrayMockDraftPlayers[15].innerHTML = rookieClass[mockDraftYear][i].dri;
			arrayMockDraftPlayers[16].innerHTML = rookieClass[mockDraftYear][i].pas;
			arrayMockDraftPlayers[17].innerHTML = rookieClass[mockDraftYear][i].ore;
			arrayMockDraftPlayers[18].innerHTML = rookieClass[mockDraftYear][i].dre;
			arrayMockDraftPlayers[19].innerHTML = rookieClass[mockDraftYear][i].oaw;
			arrayMockDraftPlayers[20].innerHTML = rookieClass[mockDraftYear][i].daw;
			arrayMockDraftPlayers[21].innerHTML = rookieClass[mockDraftYear][i].blk;
			arrayMockDraftPlayers[22].innerHTML = rookieClass[mockDraftYear][i].stl;
			arrayMockDraftPlayers[23].innerHTML = rookieClass[mockDraftYear][i].end;
			arrayMockDraftPlayers[24].innerHTML = rookieClass[mockDraftYear][i].inj;
			arrayMockDraftPlayers[25].innerHTML = "?"; //rookieClass[mockDraftYear][i].potLetter;
			arrayMockDraftPlayers[26].innerHTML = draftPicksAndTeams[mockDraftYear][i-1][0];
			arrayMockDraftPlayers[27].innerHTML = draftPicksAndTeams[mockDraftYear][i-1][1];
	}
	
};

// A function that opens a draft rookie Modal and displays available rookies that can still be drafted
const draftUserRookie = function () {
	rookieDraftModal.style.display = "block";
	
	return new Promise(resolve => {
		
		let rookieDivRow = document.querySelector(".draftRookie-rows");
		rookieDivRow.innerHTML = ""; // Clear old rows
		
		let newColumnDiv = [];
		let rookieData = [];
		let availableRookieCounter = 0;
		
		for (let i = 1; i < rookieClass[seasonsPlayed-1].length; i++){
			if ( !rookieClass[seasonsPlayed-1][i].draftPosition ) {
				rookieData.push([]);
				
				newColumnDiv[availableRookieCounter] = document.createElement("div");
				newColumnDiv[availableRookieCounter].classList.add('draftRookie-columns');
				rookieDivRow.appendChild( newColumnDiv[availableRookieCounter] );
				
				
				for (let j = 0; j < 7; j++) {
					rookieData[availableRookieCounter][j] = document.createElement("div");
					rookieData[availableRookieCounter][j].classList.add('draftRookie-col-content');
					rookieData[availableRookieCounter][j].data = i;
					rookieData[availableRookieCounter][j].onclick = function() { sendRookiePickSelected(i) };
				}
				rookieData[availableRookieCounter][0].innerText = i;
				
				rookieData[availableRookieCounter][1].innerText = rookieClass[seasonsPlayed-1][i].name;
				rookieData[availableRookieCounter][2].innerText = parseFloat(rookieClass[seasonsPlayed-1][i].overal).toFixed();
				rookieData[availableRookieCounter][3].innerText = rookieClass[seasonsPlayed-1][i].age;
				rookieData[availableRookieCounter][4].innerText = rookieClass[seasonsPlayed-1][i].position;
				rookieData[availableRookieCounter][5].innerText = rookieClass[seasonsPlayed-1][i].secPosition;
				rookieData[availableRookieCounter][6].innerText = rookieClass[seasonsPlayed-1][i].country;
				
				for (let x = 0; x < 7; x++){
					newColumnDiv[availableRookieCounter].appendChild( rookieData[availableRookieCounter][x] );
				}

				availableRookieCounter++;
				
				// a function to stop promise and resolve
				let sendRookiePickSelected = function(i){
					console.log(`User selects pick Nr ${i}`);
					rookieDraftModal.style.display = "none";
					resolve( i );
				};
			}
		}
	});
};

// pauses 1 second between each draft pick
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//let draftRookies = function() {
async function draftRookies(){
	
	// A function to increase rookie's stats if his team has teamUpgrade more thatn 0 for Rookies -- teamUpgrades[4]
	let teamUpgradeForRookies = function (rookie, increase){
		for (let i; i < increase; i++){
			let incrSkill = Math.floor(Math.random()* 18)+1;
			console.log(rookie);
			if (incrSkill == 1) { rookie.ins++; }
			else if (incrSkill == 2) { rookie.pt2++; }
			else if (incrSkill == 3) { rookie.pt3++; }
			else if (incrSkill == 4) { rookie.ft++; }
			else if (incrSkill == 5) { rookie.jum++; }
			else if (incrSkill == 6) { rookie.str++; }
			else if (incrSkill == 7) { rookie.spe++; }
			else if (incrSkill == 8) { rookie.qui++; }
			else if (incrSkill == 9) { rookie.dri++; }
			else if (incrSkill == 10) { rookie.pas++; }
			else if (incrSkill == 11) { rookie.ore++; }
			else if (incrSkill == 12) { rookie.dre++; }
			else if (incrSkill == 13) { rookie.oaw++; }
			else if (incrSkill == 14) { rookie.daw++; }
			else if (incrSkill == 15) { rookie.blk++; }
			else if (incrSkill == 16) { rookie.stl++; }
			else if (incrSkill == 17) { rookie.end++; }
			else if (incrSkill == 18) { rookie.inj++; }
			console.log(rookie);
		}
	}
	
	//draftPicksAndTeams;
	let checkCurrentRoster; // will save current roster player position count
	let checkNextPick = 1;
	let pickCounter = 1;
	let userDraftedPlayer;
	
	
	// function to update current draft list status - used in every pick (PC and USERs)
	let updateDraftList = function (pickedPlayer, pickCounter, teamAbrev) {
		
		rookieClass[seasonsPlayed-1][pickedPlayer].draftPosition = pickCounter;
		rookieClass[seasonsPlayed-1][pickedPlayer].draftYear = currentYear-1;
		
		draftPicksAndTeams[seasonsPlayed-1][pickedPlayer-1][0] = pickCounter;
		draftPicksAndTeams[seasonsPlayed-1][pickedPlayer-1][1] = teamAbrev;
		
		
		
	}
	// function to find a specific player position for a team - used by PC picks
	let draftSpecificPosition = function (positionNeeded) {
		for (let i = 1; i <= rookieClass[seasonsPlayed-1].length; i++){
			if (rookieClass[seasonsPlayed-1][i].position == positionNeeded && !rookieClass[seasonsPlayed-1][i].draftPosition) {
				return i;
			}
		}
	}
	// loops through teams to see how many players are the in each position - that helps to decide which to draft afterwardss
	
	for (let i = 1; i <= 2; i++) {
		for (let j = draftOrder.length - 1; j >= 0; j--){
			checkCurrentRoster = [0,0,0,0,0]; // C | PF | SF | SG | PG
			console.log(draftOrder[j]);
			
			// if a team has less than 18 players in roster, it can draft a Rookie
			// user drafts a rookie
			if (draftOrder[j].numberInTeamList == userTeam.numberInTeamList && draftOrder[j].roster.length < 18) {
				console.log(`USERs TEAM DRAFTS`);
				
				//draftUserRookie();
				//userDraftedPlayer = prompt(`Select Rookie pick! Draft Round Nr ${i}. Your pick Nr - ${pickCounter}`);
				userDraftedPlayer = await draftUserRookie(); // Wait for user selection
				draftOrder[j].roster.push( rookieClass[seasonsPlayed-1][userDraftedPlayer] );
				updateDraftList( userDraftedPlayer, pickCounter, draftOrder[j].teamShort.toUpperCase() );
				pickCounter++;
				
			// Computer drafts a rookie
			} else if (draftOrder[j].roster.length < 18) {
				await sleep(1000); // 1 second delay before AI pick
				
				let pick;
				for (let i = 0; i < draftOrder[j].roster.length; i++) {
					if (draftOrder[j].roster[i].position == 'C') { checkCurrentRoster[0]++; }
					else if (draftOrder[j].roster[i].position == 'PF') { checkCurrentRoster[1]++; }
					else if (draftOrder[j].roster[i].position == 'SF') { checkCurrentRoster[2]++; }
					else if (draftOrder[j].roster[i].position == 'SG') { checkCurrentRoster[3]++; }
					else if (draftOrder[j].roster[i].position == 'PG') { checkCurrentRoster[4]++; }
				}
				
				if (checkCurrentRoster[0] < 2) { // if team has less than 2 "C" position players, draft "C" position rookie
					pick = draftSpecificPosition("C");
					draftOrder[j].roster.push( rookieClass[seasonsPlayed-1][pick] );
					console.log(`With Pick Nr ${pickCounter} - ${draftOrder[j].teamName} select ${rookieClass[seasonsPlayed-1][pick].name} from ${rookieClass[seasonsPlayed-1][pick].country}`);
					
					if (draftOrder[j].teamUpgrades[4] > 0) {
						teamUpgradeForRookies( rookieClass[seasonsPlayed-1][pick], (draftOrder[j].teamUpgrades[4] * 5) );
					}
					
					updateDraftList( pick, pickCounter, draftOrder[j].teamShort.toUpperCase() );
				} else if (checkCurrentRoster[1] < 2) { // drafts PF
					pick = draftSpecificPosition("PF");
					draftOrder[j].roster.push( rookieClass[seasonsPlayed-1][pick] );
					console.log(`With Pick Nr ${pickCounter} - ${draftOrder[j].teamName} select ${rookieClass[seasonsPlayed-1][pick].name} from ${rookieClass[seasonsPlayed-1][pick].country}`);
										
					if (draftOrder[j].teamUpgrades[4] > 0) {
						teamUpgradeForRookies( rookieClass[seasonsPlayed-1][pick], (draftOrder[j].teamUpgrades[4] * 5) );
					}
					
					updateDraftList( pick, pickCounter, draftOrder[j].teamShort.toUpperCase() );
				} else if (checkCurrentRoster[2] < 2) { // drafts SF
					pick = draftSpecificPosition("SF");
					draftOrder[j].roster.push( rookieClass[seasonsPlayed-1][pick] );
					console.log(`With Pick Nr ${pickCounter} - ${draftOrder[j].teamName} select ${rookieClass[seasonsPlayed-1][pick].name} from ${rookieClass[seasonsPlayed-1][pick].country}`);
										
					if (draftOrder[j].teamUpgrades[4] > 0) {
						teamUpgradeForRookies( rookieClass[seasonsPlayed-1][pick], (draftOrder[j].teamUpgrades[4] * 5) );
					}
					
					updateDraftList( pick, pickCounter, draftOrder[j].teamShort.toUpperCase() );
				} else if (checkCurrentRoster[3] < 2) { // drafts SG
					pick = draftSpecificPosition("SG");
					draftOrder[j].roster.push( rookieClass[seasonsPlayed-1][pick] );
					console.log(`With Pick Nr ${pickCounter} - ${draftOrder[j].teamName} select ${rookieClass[seasonsPlayed-1][pick].name} from ${rookieClass[seasonsPlayed-1][pick].country}`);
										
					if (draftOrder[j].teamUpgrades[4] > 0) {
						teamUpgradeForRookies( rookieClass[seasonsPlayed-1][pick], (draftOrder[j].teamUpgrades[4] * 5) );
					}
					
					updateDraftList( pick, pickCounter, draftOrder[j].teamShort.toUpperCase() );
				} else if (checkCurrentRoster[4] < 2) { // drafts PG
					pick = draftSpecificPosition("PG");
					draftOrder[j].roster.push( rookieClass[seasonsPlayed-1][pick] );
					console.log(`With Pick Nr ${pickCounter} - ${draftOrder[j].teamName} select ${rookieClass[seasonsPlayed-1][pick].name} from ${rookieClass[seasonsPlayed-1][pick].country}`);
										
					if (draftOrder[j].teamUpgrades[4] > 0) {
						teamUpgradeForRookies( rookieClass[seasonsPlayed-1][pick], (draftOrder[j].teamUpgrades[4] * 5) );
					}
					
					updateDraftList( pick, pickCounter, draftOrder[j].teamShort.toUpperCase() );
				} else { // drafts the next best player
					for (let i = 1; i <= rookieClass[seasonsPlayed-1].length; i++){
						if ( rookieClass[seasonsPlayed-1][i].draftPosition == 0) {
							draftOrder[j].roster.push( rookieClass[seasonsPlayed-1][i] );
							console.log(`With Pick Nr ${pickCounter} - ${draftOrder[j].teamName} select ${rookieClass[seasonsPlayed-1][i].name} from ${rookieClass[seasonsPlayed-1][i].country}`);
												
							if (draftOrder[j].teamUpgrades[4] > 0) {
								teamUpgradeForRookies( rookieClass[seasonsPlayed-1][i], (draftOrder[j].teamUpgrades[4] * 5) );
							}
							
							updateDraftList( i, pickCounter, draftOrder[j].teamShort.toUpperCase() );
							break;
						}
					}
				}
				pickCounter++;
			} else {
				console.log(`${draftOrder[j].teamName} forfeits Pick Nr ${pickCounter}!!!`);
			}
			updatedMockDraftinformation(currentYear-1); // updates information in mock draft
		}
	}
	
	for (let j = 0; j < teamsArray.length; j++){
		teamsArray[j].setLineup();
	}
	rookieClass.push([currentYear+1]);
		// creates 100 new rookies for the next Season!
	for (let i = 0; i < 100; i++ ) {
		createRookie();
	}
	for (let i = 0; i < rookieClass[seasonsPlayed].length; i++){
		rookieClass[seasonsPlayed].sort(function (a, b) {return b.overal - a.overal});
	}
	nbaDraftAvailable = false;
	
	draftPicksAndTeams.push([]);
	for (let i = 0; i < 120; i++){
		draftPicksAndTeams[seasonsPlayed].push(['','']);
	}
	
	mockDraftYearSelect.appendChild(new Option(`${currentYear}`, `${currentYear}`, false, true)); // Use the Option constructor: args text, value, defaultSelected, selected
	mockDraftByYear(currentYear);
	
	document.querySelector(".btn-simSeason").disabled = false;  // activates SIM BUTTON in main page to allow sim next season
	document.querySelector(".btn-simSeason").style.backgroundColor = "LightGreen"; // takes off red color from the SIM SEASON button
	document.querySelector(".btn-simSeason").style.color = "";
	document.querySelector(".btn-mockDraft").style.backgroundColor = ""; // green color taken off
}

draftPicksAndTeams.push([]);
for (let i = 0; i < 120; i++){
	draftPicksAndTeams[seasonsPlayed].push(['','']);
}

	// creates 100 new rookies for the first season!!!
for (let i = 0; i < 100; i++ ) {
	createRookie();
};

// sorts rookieClass array from best overal to worst overal of retured players
	for (let i = 0; i < rookieClass[seasonsPlayed].length; i++){
		rookieClass[seasonsPlayed].sort(function (a, b) {return b.overal - a.overal});
	}

// creates first year in Mock Draft
mockDraftYearSelect.appendChild(new Option(`${currentYear}`, `${currentYear}`, false, true)); // Use the Option constructor: args text, value, defaultSelected, selected

//
mockDraftByYear(currentYear);

for (let i = 1; i < rookieClass[seasonsPlayed].length-1; i++ ) {
	console.log(`Player name - ${rookieClass[seasonsPlayed][i].name} \n| Country - ${rookieClass[seasonsPlayed][i].country} \n| Country - ${parseFloat(rookieClass[seasonsPlayed][i].overal).toFixed()}`);
}
console.log(rookieClass[seasonsPlayed]);

for (let j = 0; j < teamsArray.length; j++){
		draftOrder[j] = teamsArray[j];
}

document.querySelector(".btn-simSeason").style.backgroundColor = "LightGreen";


// Function to trade/swap players between two teams
let tradePlayers = function(){
	
	let randomTeam1 = Math.floor(Math.random() * teamsArray.length);
	let randomTeam2;
	let randomPlayer1, randomPlayer2;
	let playerSave = [0,0];
	
	// Function to find a valid player for trade
	let findPlayerForTrade = function (team){
		let positionCounter = [0,0,0,0,0] // will hold count of how many positions a team has
		let findPlayerIndex = -1;
		
		// counts how many players of all positions are in the team
		for (let i = 0; i < teamsArray[team].roster.length; i++){
			if (teamsArray[team].roster[i].position == 'C') { positionCounter[0]++; }
			else if (teamsArray[team].roster[i].position == 'PF') { positionCounter[1]++; }
			else if (teamsArray[team].roster[i].position == 'SF') { positionCounter[2]++; }
			else if (teamsArray[team].roster[i].position == 'SG') { positionCounter[3]++; }
			else if (teamsArray[team].roster[i].position == 'PG') { positionCounter[4]++; }
		}
		
		// function to find a player that is not last in his position in the team
		let checkPosition = function(findPlayerIndex){
			if (teamsArray[team].roster[findPlayerIndex].position == "C" && positionCounter[0] > 1) { return findPlayerIndex; } 
			else if (teamsArray[team].roster[findPlayerIndex].position == "PF" && positionCounter[1] > 1) { return findPlayerIndex; } 
			else if (teamsArray[team].roster[findPlayerIndex].position == "SF" && positionCounter[2] > 1) { return findPlayerIndex; } 
			else if (teamsArray[team].roster[findPlayerIndex].position == "SG" && positionCounter[3] > 1) { return findPlayerIndex; } 
			else if (teamsArray[team].roster[findPlayerIndex].position == "PG" && positionCounter[4] > 1) { return findPlayerIndex; } 
			else { return -1; }
		}
		
		// searches for a player that is not last of his position in his team
		do {
			findPlayerIndex = Math.floor(Math.random() * teamsArray[team].roster.length);
			checkPosition(findPlayerIndex);
		} while (findPlayerIndex == -1);
		
		return findPlayerIndex;
	}
		
	randomPlayer1 = findPlayerForTrade(randomTeam1); // finds 1st player for trade
	
	let counter = 0;
	let secondPlayerFound = [false, false];
	
	do {
		do {
			do {
				randomTeam2 = Math.floor(Math.random() * teamsArray.length);
			} while (randomTeam2 == randomTeam1);
			
			randomPlayer2 = findPlayerForTrade(randomTeam2); // finds 2nd player for trade
			counter++;
			console.log(`counter ${counter}!!!`);
		} while( (teamsArray[randomTeam1].roster[randomPlayer1].age - teamsArray[randomTeam2].roster[randomPlayer2].age) > 3 || (teamsArray[randomTeam1].roster[randomPlayer1].age - teamsArray[randomTeam2].roster[randomPlayer2].age) < -3 || counter == 100);
	} while ( (teamsArray[randomTeam1].roster[randomPlayer1].overal - teamsArray[randomTeam2].roster[randomPlayer2].overal) > (5 - teamsArray[randomTeam1].teamUpgrades[7] + teamsArray[randomTeam2].teamUpgrades[7]) || (teamsArray[randomTeam1].roster[randomPlayer1].overal - teamsArray[randomTeam2].roster[randomPlayer2].overal) < (-5 - teamsArray[randomTeam1].teamUpgrades[7] + teamsArray[randomTeam2].teamUpgrades[7]) || counter == 100);

	console.log(`COUNTER  = ${counter}`);
	
	// function to delete player traded and saved it before putting it in the new team
	let deleteTradedPlayer = function (randomTeam, randomPlayer, playerSavePosition){
		for (let x = 0; x < teamsArray[randomTeam].lineup.length; x++){
			if ( teamsArray[randomTeam].lineup[x]  ==  teamsArray[randomTeam].roster[randomPlayer] ) {
				teamsArray[randomTeam].lineup.splice(x,1);
			}
		}
		playerSave[playerSavePosition] = teamsArray[randomTeam].roster[randomPlayer]; // saves player before deleting from old team's roster
		teamsArray[randomTeam].roster.splice(randomPlayer,1); 
		teamsArray[randomTeam].setLineup();
	}
	
	console.log(`randomTeam1 = ${teamsArray[randomTeam1].teamShort.toUpperCase()} /// randomPlayer1 = ${randomPlayer1}`)
	console.log(`randomTeam2 = ${teamsArray[randomTeam2].teamShort.toUpperCase()} /// randomPlayer1 = ${randomPlayer2}`)
	console.log(`---------- TRADE ----------`);
	console.log(`1st team - ${teamsArray[randomTeam1].teamShort.toUpperCase()} -- Player -> ${teamsArray[randomTeam1].roster[randomPlayer1].name} (rating: ${Math.round(teamsArray[randomTeam1].roster[randomPlayer1].overal)} / age: ${teamsArray[randomTeam1].roster[randomPlayer1].age}) / position: ${teamsArray[randomTeam1].roster[randomPlayer1].position})`);
	console.log(`2nd team - ${teamsArray[randomTeam2].teamShort.toUpperCase()} -- Player -> ${teamsArray[randomTeam2].roster[randomPlayer2].name} (rating: ${Math.round(teamsArray[randomTeam2].roster[randomPlayer2].overal)} / age: ${teamsArray[randomTeam2].roster[randomPlayer2].age}) / position: ${teamsArray[randomTeam2].roster[randomPlayer2].position})`);
	
	allPlayerTrades.push(`${currentYear} - ${teamsArray[randomTeam1].teamShort.toUpperCase()} - ${teamsArray[randomTeam1].roster[randomPlayer1].name} (rating: ${Math.round(teamsArray[randomTeam1].roster[randomPlayer1].overal)} / age: ${teamsArray[randomTeam1].roster[randomPlayer1].age} / position: ${teamsArray[randomTeam1].roster[randomPlayer1].position})   <-->   ${teamsArray[randomTeam2].teamShort.toUpperCase()} - ${teamsArray[randomTeam2].roster[randomPlayer2].name} (rating: ${Math.round(teamsArray[randomTeam2].roster[randomPlayer2].overal)} / age: ${teamsArray[randomTeam2].roster[randomPlayer2].age} / position: ${teamsArray[randomTeam2].roster[randomPlayer2].position})`);
	
	// runs deleteTradedPlayer() function for the both teams involved in a trade
	deleteTradedPlayer(randomTeam1, randomPlayer1, 0); 
	deleteTradedPlayer(randomTeam2, randomPlayer2, 1);
	
	// puts the saved players into their new teams
	teamsArray[randomTeam2].roster.push( playerSave[0] ); 
	teamsArray[randomTeam1].roster.push( playerSave[1] );
	teamsArray[randomTeam1].setLineup();
	teamsArray[randomTeam2].setLineup();
}

// FUNCTION ----  if any team has players with rading >= 90, then one of them is sent away as a FA to other team - this is so 1 team doesn't start to dominate the league
let find90OveralFA = function (){
	for (let i = 0; i < teamsArray.length; i++){
	console.log(`FA team checked - ${teamsArray[i].teamName}`);
		let count90OveralPlayers = 0;
		
		if (i == userTeam.numberInTeamList ) continue; // skips user's team
		
		for(let j = 0; j < teamsArray[i].roster.length; j++){
			console.log(`Player checked - ${teamsArray[i].roster[j].name} | overal: ${teamsArray[i].roster[j].overal}`);
			//count90OveralPlayers = 0;
			
			if (teamsArray[i].roster[j].overal >= 90){
				count90OveralPlayers++;
				console.log(`90+ overal players - ${teamsArray[i].teamName} -- ${count90OveralPlayers}`);
			}
		}
		if (count90OveralPlayers >= 3){
			let findTeam;  // the new team that will receive the 90+ overal FA player
			let findPlayer;
			let savePlayer;
			
			do { // loop to find the new team
				findTeam = Math.floor(Math.random() * teamsArray.length);
			} while ( teamsArray[i] == teamsArray[findTeam] && teamsArray[findTeam].roster.length < 18);
			console.log(`New team that will receive the FA - ${teamsArray[findTeam].teamName}`);
			
			do { // loop to choose random the 90 FA overal player
				savePlayer = Math.floor(Math.random() * teamsArray[i].roster.length);
			} while (teamsArray[i].roster[savePlayer].overal < 90);
			findPlayer = teamsArray[i].roster[savePlayer]; // saves the 90+ player so it can be later added to the new team
			console.log(findPlayer);
			console.log(`Player that will move to the new team -- ${findPlayer.name}`);
			
			for (let x = 0; x < teamsArray[i].lineup.length; x++){ // loops through old team's lineup so the FA can be deleted/spliced
				if ( teamsArray[i].lineup[x]  ==  teamsArray[i].roster[savePlayer] ) {
					teamsArray[i].lineup.splice(x,1);
				}
			}
			teamsArray[i].roster.splice(savePlayer,1); // deletes the player from old team's roster
			teamsArray[i].setLineup();
			teamsArray[findTeam].roster.push(findPlayer); // adds 90+ FA player to the new team
			teamsArray[findTeam].setLineup();
			allPlayerTrades.push(`${currentYear} - FA move from ${teamsArray[i].teamShort.toUpperCase()} to ${teamsArray[findTeam].teamShort.toUpperCase()} - ${findPlayer.name} (rating: ${Math.round(findPlayer.overal)} / age: ${findPlayer.age} / position: ${findPlayer.position})`);

		}
	}
}

let updateTeamUpgrades = function (){
	for (let i = 0; i < teamsArray.length; i++){
		for (let j = 0; j < 9; j++) {
			document.getElementById(`teamUpgrade-${i}-${j}`).textContent = teamsArray[i].teamUpgrades[j];
		}
		let sum = 0;
		teamsArray[i].teamUpgrades.forEach((el) => sum += el); // sums every element in teamUpgrades array
		document.getElementById(`teamUpgrade-${i}-total`).textContent = sum;
	}
}

let selectUserTeam = function(selectedTeam){
	userTeam = teamsArray[selectedTeam];
	console.log(`${teamsArray[selectedTeam].teamName}`);
	document.querySelector(".teamSelectModal").style.display = "none";
	document.querySelector(".teamSelectInfoModal").style.display = "none";
	document.getElementById("mainMenu-userTeam-logo").src = `images/team-roster-icon-${userTeam.numberInTeamList + 1}.png`;
}

//was.teamUpgrades[0] = 10;
//playerDevelopmentEndYear();
//atl.teamUpgrades[6] = 0;
//bos.teamUpgrades[6] = 5;
//bos.teamUpgrades[5] = 1;
updateTeamUpgrades();

// Function to show general team infromation at start of the game - user needs to select his team
let showTeamInfo = function (selectedTeam){
	
	let teamOveral = 0, teamOffOveral = 0, teamDefOveral = 0;
	let teamInfoPlayerName = document.getElementById("teamInfoPlayerName");
	let teamInfoPlayerOveral = document.getElementById("teamInfoPlayerOveral");
	let teamInfoPlayerAge = document.getElementById("teamInfoPlayerAge");
	let teamSelectInfoModal = document.querySelector(".teamSelectInfoModal");
	
	for (let i = 0; i < teamsArray[selectedTeam].minutes.length; i++) {
		teamOveral = teamOveral + (teamsArray[selectedTeam].minutes[i] * teamsArray[selectedTeam].lineup[i].overal);
		teamOffOveral = teamOffOveral + (teamsArray[selectedTeam].minutes[i] * ((teamsArray[selectedTeam].lineup[i].oaw + teamsArray[selectedTeam].lineup[i].ins + teamsArray[selectedTeam].lineup[i].pt2 + teamsArray[selectedTeam].lineup[i].pt3 + teamsArray[selectedTeam].lineup[i].ft)/5) );
		teamDefOveral = teamDefOveral + (teamsArray[selectedTeam].minutes[i] * ((teamsArray[selectedTeam].lineup[i].daw + teamsArray[selectedTeam].lineup[i].blk + teamsArray[selectedTeam].lineup[i].stl)/3) );
	}
		teamOveral = Math.round(teamOveral / 240);
		teamOffOveral = Math.round(teamOffOveral / 240 * 1.2);
		teamDefOveral = Math.round(teamDefOveral / 240 * 1.5);
	//console.log(teamOveral, teamOffOveral, teamDefOveral);
	
	if (selectedTeam == 5 || selectedTeam == 11 || selectedTeam == 17 || selectedTeam == 23 || selectedTeam == 29){
		document.querySelector(".teamSelectInfoModal").style.left = `${event.clientX - teamSelectInfoModal.offsetWidth}px`;
		document.querySelector(".teamSelectInfoModal").style.top = `${event.clientY}px`;
	} else {
		document.querySelector(".teamSelectInfoModal").style.left = `${event.clientX}px`;
		document.querySelector(".teamSelectInfoModal").style.top = `${event.clientY}px`;
	}
	console.log(event.clientX, event.clientY);
	document.querySelector(".teamSelectInfoModal").style.display = "block";
	document.getElementById("teamInfoName").textContent = `${teamsArray[selectedTeam].teamName}`;
	document.getElementById("teamInfoOveral").textContent = `Team overal: ${teamOveral}`;
	document.getElementById("teamInfoOfense").textContent = `Ofense rating: ${teamOffOveral}`;
	document.getElementById("teamInfoDefense").textContent = `Defense rating: ${teamDefOveral}`;
	teamInfoPlayerName.innerHTML = teamsArray[selectedTeam].playerNameList.join("<br />");
	teamInfoPlayerOveral.innerHTML = teamsArray[selectedTeam].playerOveralList.join("<br />");
	teamInfoPlayerAge.innerHTML = teamsArray[selectedTeam].playerAgeList.join("<br />");
	
	let box = document.querySelector(".selectTeam-row");
	box.addEventListener('mouseleave', () => {
		document.querySelector(".teamSelectInfoModal").style.display = "none";
	});
};

//draftUserRookie();

//let currentTradeTeamLeft = 1;
//let currentTradeTeamRight = 1;
//let selectedPlayersTradeLeft = 0;
//let selectedPlayersTradeRight = 0;

let currentTradeTeam = [1,2]; // saves number of team displayed in each trade box
let selectedPlayersForTrade = [[],[]]; // saves total number of players (0 - 3) selected for trade for each trade box
let selectedPlayerNumbers = [[],[]]; // saves selected player's number in his team roster to know if it's not selected twice

let prevousTeamTrades = function(leftRight){
	currentTradeTeam[leftRight]--;
	//selectedPlayerNumbers[leftRight] = []; // clears saved player' roster numbers
	
	if (currentTradeTeam[0] == currentTradeTeam[1] ){ // if bot teams in trade boxes are equal, the next team is selected
		currentTradeTeam[leftRight]--;
	}
	
	if (currentTradeTeam[leftRight] < 1) currentTradeTeam[leftRight] = teamsArray.length;
	document.querySelector(`.logo-userTrades-${leftRight}`).src = `images/team-roster-icon-${currentTradeTeam[leftRight]}.png`;
	displayUserTradePlayers(leftRight+1);
	if (selectedPlayersForTrade[leftRight] > 0){
		clearPlayerTradeList(leftRight+1,0); // deletes all selected players for trade in the left trade box
	}
	
	console.log(`user team ${userTeam.numberInTeamList} == current team ${currentTradeTeam[0]-1}`);
	if (userTeam.numberInTeamList == currentTradeTeam[0]-1){
		document.getElementById('trade-user-logo').src = `images/user.png`;
		document.getElementById('trade-user-logo').style.visibility = 'visible';
	} else {
		document.getElementById('trade-user-logo').style.visibility = 'hidden';
	}
	
};

let nextTeamTrades = function(leftRight){
	currentTradeTeam[leftRight]++;
		
	if (currentTradeTeam[0] == currentTradeTeam[1] ){ // if bot teams in trade boxes are equal, the next team is selected
		currentTradeTeam[leftRight]++;
	}
	
	if (currentTradeTeam[leftRight] > teamsArray.length) currentTradeTeam[leftRight] = 1;
	document.querySelector(`.logo-userTrades-${leftRight}`).src = `images/team-roster-icon-${currentTradeTeam[leftRight]}.png`;
	displayUserTradePlayers( (leftRight+1) );
	if (selectedPlayersForTrade[leftRight] > 0){
		clearPlayerTradeList(leftRight+1,0); // deletes all selected players for trade in the left trade box
	}
	
	console.log(`user team ${userTeam.numberInTeamList} == current team ${currentTradeTeam[0]-1}`);
	if (userTeam.numberInTeamList == currentTradeTeam[0]-1){
		document.getElementById('trade-user-logo').src = `images/user.png`;
		document.getElementById('trade-user-logo').style.visibility = 'visible';
	} else {
		document.getElementById('trade-user-logo').style.visibility = 'hidden';
	}
};

let displayUserTradePlayers = function(leftRight){
	
	for (let x = 1; x < 19; x++){
		document.querySelector(`.ut-name-${leftRight}-${x}`).innerHTML = '-----';
		document.querySelector(`.ut-over-${leftRight}-${x}`).innerHTML = '';
		document.querySelector(`.ut-age-${leftRight}-${x}`).innerHTML = '';
		document.querySelector(`.ut-potential-${leftRight}-${x}`).innerHTML = '';
		document.querySelector(`.ut-priPos-${leftRight}-${x}`).innerHTML = '';
		document.querySelector(`.ut-secPos-${leftRight}-${x}`).innerHTML = '';
		document.querySelector(`.ut-country-${leftRight}-${x}`).innerHTML = '';
	}
	
	for (let i = 1; i <= teamsArray[currentTradeTeam[leftRight-1]-1].roster.length; i++){
		document.querySelector(`.ut-name-${leftRight}-${i}`).innerHTML = teamsArray[currentTradeTeam[leftRight-1]-1].roster[i-1].name;
		document.querySelector(`.ut-over-${leftRight}-${i}`).innerHTML = Math.round( teamsArray[currentTradeTeam[leftRight-1]-1].roster[i-1].overal );
		document.querySelector(`.ut-age-${leftRight}-${i}`).innerHTML = teamsArray[currentTradeTeam[leftRight-1]-1].roster[i-1].age;
		document.querySelector(`.ut-potential-${leftRight}-${i}`).innerHTML = teamsArray[currentTradeTeam[leftRight-1]-1].roster[i-1].potLetter;
		document.querySelector(`.ut-priPos-${leftRight}-${i}`).innerHTML = teamsArray[currentTradeTeam[leftRight-1]-1].roster[i-1].position;
		document.querySelector(`.ut-secPos-${leftRight}-${i}`).innerHTML = teamsArray[currentTradeTeam[leftRight-1]-1].roster[i-1].secPosition;
		if (teamsArray[currentTradeTeam[leftRight-1]-1].roster[i-1].country.length <= 10) {
			document.querySelector(`.ut-country-${leftRight}-${i}`).innerHTML = teamsArray[currentTradeTeam[leftRight-1]-1].roster[i-1].country;
		} else {
			document.querySelector(`.ut-country-${leftRight}-${i}`).innerHTML = teamsArray[currentTradeTeam[leftRight-1]-1].roster[i-1].country.slice(0,10) + "...";
		}
	}
};

displayUserTradePlayers(1);
displayUserTradePlayers(2);

let addForTrade = function(leftRight, xPlayer){
	if (userTeam.numberInTeamList == currentTradeTeam[0]-1){
		//console.log(`selectedPlayerNumbers[leftRight-1][0] !== xPlayer -> ${selectedPlayerNumbers[leftRight-1][0]} - ${xPlayer}`);
		if ( selectedPlayerNumbers[leftRight-1][0] == xPlayer || selectedPlayerNumbers[leftRight-1][1] == xPlayer || selectedPlayerNumbers[leftRight-1][2] == xPlayer){
		// if the player was already selected for a trade, it won't be added any more times
		console.log(`No player added!`);
		} else if (selectedPlayersForTrade[leftRight-1] < 3 && xPlayer >= 1 && xPlayer <= teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster.length ){
				selectedPlayerNumbers[leftRight-1].push(xPlayer);
				console.log(selectedPlayerNumbers);
				selectedPlayersForTrade[leftRight-1]++;
				document.querySelector(`.utSel-name-${leftRight}-${selectedPlayersForTrade[leftRight-1]}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[xPlayer-1].name;
				document.querySelector(`.utSel-over-${leftRight}-${selectedPlayersForTrade[leftRight-1]}`).innerHTML = Math.round( teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[xPlayer-1].overal );
				document.querySelector(`.utSel-age-${leftRight}-${selectedPlayersForTrade[leftRight-1]}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[xPlayer-1].age;
				document.querySelector(`.utSel-poten-${leftRight}-${selectedPlayersForTrade[leftRight-1]}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[xPlayer-1].potLetter;
				document.querySelector(`.utSel-priPos-${leftRight}-${selectedPlayersForTrade[leftRight-1]}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[xPlayer-1].position;
				document.querySelector(`.utSel-secPos-${leftRight}-${selectedPlayersForTrade[leftRight-1]}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[xPlayer-1].secPosition;
				if (teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[xPlayer-1].country.length <= 10) {
					document.querySelector(`.utSel-country-${leftRight}-${selectedPlayersForTrade[leftRight-1]}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[xPlayer-1].country;
				} else {
					document.querySelector(`.utSel-country-${leftRight}-${selectedPlayersForTrade[leftRight-1]}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[xPlayer-1].country.slice(0,10) + "...";
				}
		}
	} else {
		alert(`You can trade only your team's players!`);
	}
};

let clearPlayerTradeList = function (leftRight, clearNum){
console.log(`in clearPlayerTradeList function => leftRight = ${leftRight} || clearNum = ${clearNum} || selectedPlayerNumbers[leftRight-1] = ${selectedPlayerNumbers[leftRight-1]}`);
	console.log(`BEGINNING - selectedPlayerNumbers[leftRight-1].length = ${selectedPlayerNumbers[leftRight-1].length}`);
	if (selectedPlayerNumbers[leftRight-1].length > 0){
		if (clearNum == 0){ // if clearNum is 0, all 3 selected players are deleted from the box
			selectedPlayersForTrade[leftRight-1] = 0;
			selectedPlayerNumbers[leftRight-1] = []; // clears saved player' roster numbers
			for (let i = 1; i <= 3; i++){ // clears all three players from a trade box
				document.querySelector(`.utSel-name-${leftRight}-${i}`).innerHTML = '-----';
				document.querySelector(`.utSel-over-${leftRight}-${i}`).innerHTML = '';
				document.querySelector(`.utSel-age-${leftRight}-${i}`).innerHTML = '';
				document.querySelector(`.utSel-poten-${leftRight}-${i}`).innerHTML = '';
				document.querySelector(`.utSel-priPos-${leftRight}-${i}`).innerHTML = '';
				document.querySelector(`.utSel-secPos-${leftRight}-${i}`).innerHTML = '';
				document.querySelector(`.utSel-country-${leftRight}-${i}`).innerHTML = '';
			}
		} else if (clearNum >= 1 && clearNum <= selectedPlayerNumbers[leftRight-1].length){ // cleares one specific player in a trade box
			document.querySelector(`.utSel-name-${leftRight}-${clearNum}`).innerHTML = '-----';
			document.querySelector(`.utSel-over-${leftRight}-${clearNum}`).innerHTML = '';
			document.querySelector(`.utSel-age-${leftRight}-${clearNum}`).innerHTML = '';
			document.querySelector(`.utSel-poten-${leftRight}-${clearNum}`).innerHTML = '';
			document.querySelector(`.utSel-priPos-${leftRight}-${clearNum}`).innerHTML = '';
			document.querySelector(`.utSel-secPos-${leftRight}-${clearNum}`).innerHTML = '';
			document.querySelector(`.utSel-country-${leftRight}-${clearNum}`).innerHTML = '';
			selectedPlayersForTrade[leftRight-1]--;
			selectedPlayerNumbers[leftRight-1].splice(clearNum-1, 1); // takes out specific player's roster number in selectedPlayerNumbers array
			console.log(selectedPlayerNumbers);
			
			for (let i = 1; i <= 3; i++){ // clears all three players from a trade box
				document.querySelector(`.utSel-name-${leftRight}-${i}`).innerHTML = '-----';
				document.querySelector(`.utSel-over-${leftRight}-${i}`).innerHTML = '';
				document.querySelector(`.utSel-age-${leftRight}-${i}`).innerHTML = '';
				document.querySelector(`.utSel-poten-${leftRight}-${i}`).innerHTML = '';
				document.querySelector(`.utSel-priPos-${leftRight}-${i}`).innerHTML = '';
				document.querySelector(`.utSel-secPos-${leftRight}-${i}`).innerHTML = '';
				document.querySelector(`.utSel-country-${leftRight}-${i}`).innerHTML = '';
			}
			console.log(`LATER - selectedPlayerNumbers[leftRight-1].length = ${selectedPlayerNumbers[leftRight-1].length}`);
			for (let j = 1; j <= selectedPlayerNumbers[leftRight-1].length; j++){ // updates trade box with the remaining selected players
				document.querySelector(`.utSel-name-${leftRight}-${j}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[selectedPlayerNumbers[leftRight-1][j-1] - 1].name;
				document.querySelector(`.utSel-over-${leftRight}-${j}`).innerHTML = Math.round( teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[selectedPlayerNumbers[leftRight-1][j-1] - 1].overal );
				document.querySelector(`.utSel-age-${leftRight}-${j}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[selectedPlayerNumbers[leftRight-1][j-1] - 1].age;
				document.querySelector(`.utSel-poten-${leftRight}-${j}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[selectedPlayerNumbers[leftRight-1][j-1] - 1].potLetter;
				document.querySelector(`.utSel-priPos-${leftRight}-${j}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[selectedPlayerNumbers[leftRight-1][j-1] - 1].position;
				document.querySelector(`.utSel-secPos-${leftRight}-${j}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[selectedPlayerNumbers[leftRight-1][j-1] - 1].secPosition;
				if (teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[selectedPlayerNumbers[leftRight-1][j-1] - 1].country.length <= 10) {
					document.querySelector(`.utSel-country-${leftRight}-${j}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[selectedPlayerNumbers[leftRight-1][j-1] - 1].country;
				} else {
					document.querySelector(`.utSel-country-${leftRight}-${j}`).innerHTML = teamsArray[ currentTradeTeam[leftRight-1]-1 ].roster[selectedPlayerNumbers[leftRight-1][j-1] - 1].country.slice(0,10) + "...";
				}
			}
			
		}
	}
};

let makeUserTrade = function(){
	
	document.querySelector('.checkTrade-modal').style.display = 'block';
	
	let tradePlCopies = [[],[]]; // Stores the both trade team selected player copies
	let ageBonus = [0,0];
	let totBonus = [0,0];
	
	let ltv; // Left team Trade value
	let rtv; // Left team Trade value
	//ATL - 40/35/37
	//BOS - 33/39/34
	
	let calcTradeValue = function(players){
		for (let i = 0; i < 2; i++){
			for (let j = 0; j < players[i].length; j++){
				if (players[i][j].age >= 19 && players[i][j].age <= 24) { 
					ageBonus[i] += ( (25-players[i][j].age)*2  + 5 );
					totBonus[i] += players[i][j].overal + ( (25-players[i][j].age)*2  + 5 );
				} else if (players[i][j].age >= 25 && players[i][j].age <= 29) {
					ageBonus[i] += ( 30 - players[i][j].age );
					totBonus[i] += players[i][j].overal + ( 30 - players[i][j].age );
				} else if (players[i][j].age >= 30) {
					if (players[i][j].overal <= 80){
						//totBonus[i] += players[i][j].overal;
						totBonus[i] += 80;
					} else {
						totBonus[i] += players[i][j].overal;
					}
				}
				console.log(`age bonus = ${ageBonus[i]}`)
				console.log(`total bonus = ${totBonus[i]}`)
			}
		}
	}
	
	if ( (teamsArray[currentTradeTeam[0]-1].roster.length + (selectedPlayerNumbers[1].length - selectedPlayerNumbers[0].length)) > 18 ) {
		console.log(`(teamsArray[currentTradeTeam[0]-1].roster.length + (selectedPlayerNumbers[1].length - selectedPlayerNumbers[0].length)) = ${(teamsArray[currentTradeTeam[0]-1].roster.length + (selectedPlayerNumbers[1].length - selectedPlayerNumbers[0].length))}`);
		console.log(`Left team does not have enough roster space for the trade!`);
		document.querySelector('.trade-result-text').innerHTML = `${teamsArray[currentTradeTeam[0]-1].teamName} has no roster space`;
		document.querySelector('.span-percent').innerHTML = `0%`;
		document.documentElement.style.setProperty('--my-width', `0%`);
		
	} else if ( (teamsArray[currentTradeTeam[1]-1].roster.length + (selectedPlayerNumbers[0].length - selectedPlayerNumbers[1].length)) > 18 ) {
		console.log(`(teamsArray[currentTradeTeam[1]-1].roster.length + (selectedPlayerNumbers[0].length - selectedPlayerNumbers[1].length)) = ${(teamsArray[currentTradeTeam[1]-1].roster.length + (selectedPlayerNumbers[0].length - selectedPlayerNumbers[1].length))}`);
		console.log(`Right team does not have enough roster space for the trade!`);
		document.querySelector('.trade-result-text').innerHTML = `${teamsArray[currentTradeTeam[1]-1].teamName} has no roster space`;
		document.querySelector('.span-percent').innerHTML = `0%`;
		document.documentElement.style.setProperty('--my-width', `0%`);
	} else {
		console.log(`Trade  valid`);
		// if trade is valid, the traded players are saved in temporary variable
		for (let i = 0; i < selectedPlayerNumbers[0].length; i++){
			//console.log(`LEFT team player nr ${i+1} = ${teamsArray[currentTradeTeam[0]-1].roster[ selectedPlayerNumbers[0][i] -1].name}`);
			tradePlCopies[0].push( teamsArray[currentTradeTeam[0]-1].roster[ selectedPlayerNumbers[0][i] -1 ] );
			//console.log(tradePlCopies[0]);
		}
		for (let j = 0; j < selectedPlayerNumbers[1].length; j++){
			//console.log(`RIGHT team player nr ${j+1} = ${teamsArray[currentTradeTeam[1]-1].roster[ selectedPlayerNumbers[1][j] -1].name}`);
			tradePlCopies[1].push( teamsArray[currentTradeTeam[1]-1].roster[ selectedPlayerNumbers[1][j] -1 ] );
			//console.log(tradePlCopies[1]);
		}
		
		calcTradeValue(tradePlCopies);
			
		if (totBonus[0] - (selectedPlayerNumbers[0].length * 80) >= totBonus[1] - (selectedPlayerNumbers[1].length * 80)){
			
			console.log(`tradePlCopies[0][0].overal - ${tradePlCopies[0][0].overal} | tradePlCopies[0][0].age - ${tradePlCopies[0][0].age}`);
			console.log(`TRADE ACCEPTED! ${ totBonus[0] - (selectedPlayerNumbers[0].length * 80) } <> ${ totBonus[1] - (selectedPlayerNumbers[1].length * 80) }`);
			
			document.querySelector('.trade-result-text').innerHTML = `Trade accepted`;
			let testVar = 100;
			document.querySelector('.span-percent').innerHTML = `${testVar}%`;
			document.documentElement.style.setProperty('--my-width', `${testVar}%`);
			
			// deletes traded players from their old teams
			for (let x = 0; x <= 1; x++) {
				for (let num = 0; num < tradePlCopies[x].length; num++){
					for (let y = 0; y < teamsArray[[currentTradeTeam[x]-1]].lineup.length; y++){
						if ( teamsArray[[currentTradeTeam[x]-1]].lineup[y]  ==  tradePlCopies[x][num] ) {
							teamsArray[[currentTradeTeam[x]-1]].lineup.splice(y,1);
						}
					}
					for (let y = 0; y < teamsArray[[currentTradeTeam[x]-1]].roster.length; y++){
						if ( teamsArray[[currentTradeTeam[x]-1]].roster[y]  ==  tradePlCopies[x][num] ) {
							teamsArray[[currentTradeTeam[x]-1]].roster.splice(y,1);
						}
					}
				}
				// pushes the traded players in their new teams
				if (x == 0) {
					for (let num = 0; num < tradePlCopies[1].length; num++){
						teamsArray[[currentTradeTeam[0]-1]].roster.push(tradePlCopies[1][num]);
					}
				} else {
					for (let num = 0; num < tradePlCopies[0].length; num++){
						teamsArray[[currentTradeTeam[1]-1]].roster.push(tradePlCopies[0][num]) ;
					}
				}
				teamsArray[[currentTradeTeam[x]-1]].setLineup(); // resets both team lineups with the new players
				clearPlayerTradeList(x+1, 0);
				displayUserTradePlayers(x+1);
			}
		} else {
			document.querySelector('.trade-result-text').innerHTML = `Trade denied`;
			
			let calc = ((totBonus[1] - (selectedPlayerNumbers[1].length * 80)) - (totBonus[0] - (selectedPlayerNumbers[0].length * 80))) / 20 * 100;
			let calcTrade = Math.round( Math.max(0, ((50 - calc) / 50) * 100) );
			document.querySelector('.span-percent').innerHTML = `${calcTrade}%`;
			document.documentElement.style.setProperty('--my-width', `${calcTrade}%`);
			
			console.log(`TRADE DENIED! ${ totBonus[0] - (selectedPlayerNumbers[0].length * 80) } <> ${ totBonus[1] - (selectedPlayerNumbers[1].length * 80) }`);
		}
	}
	
	tradePlCopies = [[],[]]; // clears copied trade players in tradePlCopies array
	
};

// a function that checks what players user has selected and looks for an acceptable offer from another team. Used in Trade Players section.
let findTrade = function (){
	let calcTradeValue = 0;
	let pcTradeValue = 0;
	
	let calculateTradeValue = function (team, playerArray){
		let tradeValue = 0;
		
		for (let i = 0; i < playerArray.length; i++){
		if (team.roster[playerArray[i]-1].age >= 19 && team.roster[playerArray[i]-1].age <= 24) { 
			tradeValue += team.roster[playerArray[i]-1].overal + ( (25 - team.roster[playerArray[i]-1].age)*2  + 5 );
		} else if (team.roster[playerArray[i]-1].age >= 25 && team.roster[playerArray[i]-1].age <= 29) {
			tradeValue += team.roster[playerArray[i]-1].overal + ( 30 - team.roster[playerArray[i]-1].age );
		} else if (team.roster[playerArray[i]-1].age >= 30) {
			//tradeValue += team.roster[playerArray[i]-1].overal;
			
			if (team.roster[playerArray[i]-1].overal <= 80){
				tradeValue += 80;
			} else {
				tradeValue += team.roster[playerArray[i]-1].overal;
			}
			
		}
		console.log(`tradeValue = ${tradeValue}`)
	}
		tradeValue = tradeValue - (playerArray.length * 80); // final trade value of user's selected players
		console.log(`${team.teamName} trade value = ${tradeValue}`)
		return tradeValue;
	};

	calcTradeValue = calculateTradeValue( teamsArray[currentTradeTeam[0]-1], selectedPlayerNumbers[0] ); 
	
	let randTeam;
	let randPlayers = [];
	let userTeamRosterSpace = 18 - teamsArray[currentTradeTeam[0]-1].roster.length + selectedPlayerNumbers[0].length - randPlayers.length; // to see how many free roster spaces user has after the trade is made
	console.log(`userTeamRosterSpace - ${userTeamRosterSpace}`);
	let pcTeamRosterSpace;
	let tradeFound = false;
	
	// function to find a player from PC team for a trade. Checks if it's also have not been selected already.
	let findPCplayer = function (PCteam){
		//console.log(`findPCplayer function stated!!!`);
		let playerNum;

		do {
			playerNum = Math.floor(Math.random() * PCteam.roster.length);
		} while (randPlayers.includes(playerNum+1)); // checks if the randPlayers array already has the random player - if true, a new random number is generated
		
		console.log(`${PCteam.teamName} - ${PCteam.roster[playerNum].name} - roster position - ${playerNum}`);
		return playerNum+1;
	}
	
	for (let i = 0; i < 10000 && !tradeFound; i++){
		randPlayers = [];

		do {
			randTeam = Math.floor(Math.random() * 30);
		} while (randTeam === teamsArray[currentTradeTeam[0]-1].numberInTeamList);
		console.log(`PC team - ${teamsArray[randTeam].teamName}`);
		
		// pcTeamRosterSpace = 18 - teamsArray[randTeam].roster.length - selectedPlayerNumbers[0].length + randPlayers.length;  // to see how many free roster spaces PC team has after the trade is made
		pcTeamRosterSpace = 18 - teamsArray[randTeam].roster.length - selectedPlayerNumbers[0].length;  // to see how many free roster spaces PC team has after the trade is made
		console.log(`pcTeamRosterSpace - ${pcTeamRosterSpace}`);
		
		for (let x = 0; x < 3 && !tradeFound; x++) {
			if (userTeamRosterSpace <= 0) break;
		
			// Add a random PC player
			randPlayers.push(findPCplayer(teamsArray[randTeam]));
			
			const pcTradeValue = calculateTradeValue(teamsArray[randTeam], randPlayers);
			
			const updatedUserTeamRosterSpace = 18 - teamsArray[currentTradeTeam[0] - 1].roster.length + selectedPlayerNumbers[0].length - randPlayers.length;
			
			const updatedPcTeamRosterSpace = 18 - teamsArray[randTeam].roster.length - selectedPlayerNumbers[0].length + randPlayers.length;
			
			console.log(`userTeamRosterSpace - ${updatedUserTeamRosterSpace}`);
			console.log(`pcTeamRosterSpace - ${updatedPcTeamRosterSpace}`);
			
			// Trade condition check
			const tradeDifference = pcTradeValue - calcTradeValue;
			if (
				updatedUserTeamRosterSpace >= 0 && 
				updatedPcTeamRosterSpace >= 0 &&
				tradeDifference <= 0 &&
				tradeDifference >= -3
			) {
			  console.log(`${pcTradeValue} - ${calcTradeValue} = ${tradeDifference}`);
			  console.log(`TRADE CAN BE COMPLETED!`);
			  tradeFound = true;
			  console.log(randPlayers);
			  currentTradeTeam[1] = randTeam+1;
			  clearPlayerTradeList(2,0); 
			  document.querySelector(`.logo-userTrades-1`).src = `images/team-roster-icon-${currentTradeTeam[1]}.png`;
			  displayUserTradePlayers(2);
			  for (let i = 0; i < randPlayers.length; i++) {
				 addForTrade(2,randPlayers[i]);
			  }
			}
		}
	}
	if (tradeFound === false){
		alert(`NO OFFER FOUND`);
	}
	console.log(randPlayers);
};

let closeCheckTradeModal = function(){
	document.querySelector('.checkTrade-modal').style.display = 'none';
};


// a function that will open a modal for user to increase their team Upgrade by 1 point
let openTeamUpgradeIncreaseModal = function (){
	document.querySelector('.selectTeamUpgrade-modal').style.display = 'block';
	console.log(`Modal selectTeamUpgrade-modal is opened`);
	
	for (let i = 0; i < 9; i++){
		for (let j = 1; j <= 5; j++) {
			if (userTeam.teamUpgrades[i] >= j) {
				document.querySelector(`.upgradeBar-${i}-${j}`).style.background = '#FFD700';
			} else {
				document.querySelector(`.upgradeBar-${i}-${j}`).style.background = '';
			}
		}
	}
}

let increasedArrows = [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0];

let teamUpgradeSelected = -1; // saves number of the selected upgrade type/number. 0 - upgrade not selected

// a modal appears when user wins a championship. The modal displays team upgrades and user can select one
let selectTeamUpgrade = function (selectedUpgrade) {
	if (selectedUpgrade >= 0 && selectedUpgrade < 9 && increasedArrows[selectedUpgrade] == 1){
		console.log(`selected UP arrow!`);
		for (let i = 0; i < 9; i++) {
				document.querySelector(`.arrow-${i}`).src = `images/arrow-up-white.png`;
				
			if (i == selectedUpgrade){
				document.querySelector(`.arrow-${selectedUpgrade + 9}`).src = `images/arrow-down-green.png`;
				increasedArrows[selectedUpgrade + 9] = 1;
				userTeam.teamUpgrades[i]++;
				teamUpgradeSelected = i;
			}
			increasedArrows[i] = 0;
		}
	} else if (selectedUpgrade > 8 && selectedUpgrade < 18 && increasedArrows[selectedUpgrade] == 1) {

		document.querySelector(`.arrow-${selectedUpgrade}`).src = `images/arrow-down-white.png`;
		increasedArrows[selectedUpgrade] = 0;
		userTeam.teamUpgrades[selectedUpgrade - 9]--;
		teamUpgradeSelected = -1;
		
		for (let j = 0; j < 9; j++){
			document.querySelector(`.arrow-${j}`).src = `images/arrow-up-green.png`;
			increasedArrows[j] = 1;
		}
			
	}
	openTeamUpgradeIncreaseModal();
};

let incrSize = function(arrowNum){
	if (increasedArrows[arrowNum] == 1) {
		document.querySelector(`.arrow-${arrowNum}`).style.width = '80px'; 
		document.querySelector(`.arrow-${arrowNum}`).style.padding = '0px'; 
	}
};

let decrSize = function(arrowNum){
	document.querySelector(`.arrow-${arrowNum}`).style.width = '70px'; 
	document.querySelector(`.arrow-${arrowNum}`).style.padding = '10px'; 
};

let closeUserTeamUpgradeSelect = function (){
	if (teamUpgradeSelected > -1) {
		document.querySelector('.selectTeamUpgrade-modal').style.display = 'none';
		increasedArrows = [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0];
		
		document.getElementById(`teamUpgrade-${userTeam.numberInTeamList}-${teamUpgradeSelected}`).style.color = "#2AB500"; 
		
		for (let j = 0; j < 9; j++){
			document.querySelector(`.arrow-${j}`).src = `images/arrow-up-green.png`;
			document.querySelector(`.arrow-${j+9}`).src = `images/arrow-down-white.png`;
		}
		updateTeamUpgrades();
		teamUpgradeSelected = -1;
	}
};


//openTeamUpgradeIncreaseModal();

let selectCountryUpgrade = function (){
	for (let i = 0; i < teamsArray.length; i++){
		if(teamsArray[i].teamUpgrades[8] > 0){
			let randCountry = Math.floor(Math.random() * countries.length);
			teamsArray[i].youthProgram[0] = countries[randCountry].countryName;
			teamsArray[i].youthProgram[1] = teamsArray[i].teamUpgrades[8];
			console.log(`teamsArray[i].youthProgram[0]  = ${teamsArray[i].youthProgram[0] } -- teamsArray[i].youthProgram[1] = ${teamsArray[i].youthProgram[1]}`);
		}
	}
}

// a function that updates/makes random changes in countries popularity and basketball player quality
let updateCountryValues = function(){
	
	for (let i = 0; i < countries.length; i++){
		let index = Math.floor( (Math.random() * 7) -3);
		
		for (let j = 0; j < teamsArray.length; j++){
			if (teamsArray[j].youthProgram[0] === countries[i].countryName){
				index += teamsArray[j].youthProgram[1]; // increases country's basketball popularity by the the teams Upgrade level
			}
		}
		
		countries[i].popularity += index;
		
		if (countries[i].popularity < 1)  { countries[i].popularity = 1; }
		else if (countries[i].popularity > 2000) { countries[i].popularity = 2000; }
		console.log(`index = ${index} ---> ${countries[i].countryName} popularity -> ${countries[i].popularity}`);
		
		index = Math.floor( (Math.random() * 7) -3);
		
		for (let j = 0; j < teamsArray.length; j++){
			if (teamsArray[j].youthProgram[0] === countries[i].countryName){
				index += teamsArray[j].youthProgram[1]; // increases country's basketball plauyer quality by the the teams Upgrade level
			}
		}
		
		countries[i].playerQuality += index;
		
		if (countries[i].playerQuality < 1) { countries[i].playerQuality = 1; }
		else if (countries[i].playerQuality > 100) { countries[i].playerQuality = 100; }
		console.log(`index = ${index} ---> ${countries[i].countryName} player quality -> ${countries[i].playerQuality}`);
	}
};

//selectCountryUpgrade();
//updateCountryValues();