let currentYear = 2025;
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

// TEAM CLASS
class Team {
	teamName;
	conference;
	teamRating;
	roster = [];
	lineup = [];
	minutes = [32, 32, 32, 32, 32, 20, 15, 10, 10, 10, 8, 7];
	statsTotal = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	winLose = [0,0,0]; //win, lose, percentage
	teamShort;

  constructor(teamName, teamShort) {
    this.teamName = teamName;
	this.teamShort = teamShort;
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
		if (this.lineup[j].secPosition == "C" && this.lineup[j].overal > this.lineup[0].overal) {
			let temp = this.lineup[0];
			this.lineup[0] = this.lineup[j];
			this.lineup[j] = temp;
			console.log("C position updated - " + this.lineup[0].name);
		} else if (this.lineup[j].secPosition == "PF" && this.lineup[j].overal > this.lineup[1].overal) {
			let temp = this.lineup[1];
			this.lineup[1] = this.lineup[j];
			this.lineup[j] = temp;
			console.log("PF position updated - " + this.lineup[0].name);
		} else if (this.lineup[j].secPosition == "SF" && this.lineup[j].overal > this.lineup[2].overal) {
			let temp = this.lineup[2];
			this.lineup[2] = this.lineup[j];
			this.lineup[j] = temp;
			console.log("SF position updated - " + this.lineup[0].name);
		} else if (this.lineup[j].secPosition == "SG" && this.lineup[j].overal > this.lineup[3].overal) {
			let temp = this.lineup[3];
			this.lineup[3] = this.lineup[j];
			this.lineup[j] = temp;
			console.log("SG position updated - " + this.lineup[0].name);
		} else if (this.lineup[j].secPosition == "PG" && this.lineup[j].overal > this.lineup[4].overal) {
			let temp = this.lineup[4];
			this.lineup[4] = this.lineup[j];
			this.lineup[j] = temp;
			console.log("PG position updated - " + this.lineup[0].name);
		}
	}
	// sorts reserves by overal
	for (let x = 5; x < this.lineup.length-1; x++) {
		if (this.lineup[x].overal < this.lineup[x+1].overal){
			let temp = this.lineup[x];
			this.lineup[x] = this.lineup[x+1];
			this.lineup[x+1] = temp;
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
}

//13. ${this.lineup[12].name} - ${Math.round(this.lineup[12].overal)}
//14. ${this.lineup[13].name} - ${Math.round(this.lineup[13].overal)}
//15. ${this.lineup[14].name} - ${Math.round(this.lineup[14].overal)}
//16. ${this.lineup[15].name} - ${Math.round(this.lineup[15].overal)}
//17. ${this.lineup[16].name} - ${Math.round(this.lineup[16].overal)}

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
  overal;
  statRowNumber = -1;
  statsTotal = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0]; // games,pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA, RebTot,fgMade,fgAt, 2ptsFgM,2ptsFgAt,double,triple,quadriple, gamesStarted
  statsTotalByYear = []; // YEAR, GM Pl, GM St, PTS,OREB,REB,AST,STL,BLK,TO,FGM,FGA,2PM,2PA,3PM,3PA,FTM,FTA,FLS,DD,TD,QD
  perGameStats = [0,0,0,0,0,0,0,0,0]; // pts/reb/ast/stl/blk/fg%/pt3%/ft%/PER
  perGameStatsByYear = []; // YEAR, GM Pl, GM St, PTS,OREB,REB,AST,STL,BLK,TO,FGM,FGA,2PM,2PA,3PM,3PA,FTM,FTA,FLS
  PER = 0; // Player Efficiency Rating
  playerDevelopmentBySeason = []; // stores player stats from each season to see development/regression
	experience;
	secPosition;
	country;
	draftYear;
	draftPosition;
	height;
	weight;
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
		  (ins +
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
		  18,
		 this.playerDevelopmentBySeason.push([currentYear, this.overal,this.ins,this.pt2,this.pt3,this.ft,this.jum,this.str,this.spe,this.qui,this.dri,this.pas,this.ore,this.dre,this.oaw,this.daw,this.blk,this.stl,this.end,this.inj,this.pot]);
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
    let posH = (this.min / 4) * 8;
    let posA = (this.min / 4) * 8;
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

    let attackers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // counts number of possesions for each player
    let shots = [0, 0, 0, 0]; // ins, 2pt, 3pt, ft shot count in total for a team
	let gameStats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // team pts, !empty!, team stl, team blk, 2ptm, 2pt, 3pt made, 3pt total, off reb home, def reb away, assistHome, assistsAway
    
	let homeTeamStats = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //gm,pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA + RebTot,FgM,FgA,2ptM, 2ptA
	let awayTeamStats = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //gm,pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA
	let homePlayerStats = Array(); // pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA + RebTot,FgM,FgA,2ptM, 2ptA + double,triple,quadruple
	let awayPlayerStats = Array(); // pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA + RebTot,FgM,FgA,2ptM, 2ptA + double,triple,quadruple
	for (let i=0; i<16; i++){
		homePlayerStats[i] = Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); // 24 elements
		awayPlayerStats[i] = Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		console.log(`homePlayerStats[${i}] values: ${homePlayerStats[i]}`);
		console.log(`awayPlayerStats[${i}] values: ${awayPlayerStats[i]}`);
	}
	
	// do HOME team attacks
	for (let i = 0; i < posH*4; i++) {
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
	for (let i = 0; i < posA*4; i++) {
		let [attackersTemp2, shotsTemp2, gameStatsTemp2, attackingTeamStatsTemp2, defendingTeamStatsTemp2, attackingPlayerStatsTemp2, defendingPlayerStatsTemp2] = this.doAttack(away, home);

		for(let i=0; i < 16; i++){
			homeTeamStats[i] += defendingTeamStatsTemp2[i];
			awayTeamStats[i] += attackingTeamStatsTemp2[i];
			//console.log(`homeTeamStats[i] values = ${homeTeamStats[i]}`);
			//console.log(`awayTeamStats[i] values = ${awayTeamStats[i]}`);
		}
	  
		for(let i=0; i < home.minutes.length; i++){
			for(let j = 0; j < 16; j++){
				homePlayerStats[i][j]+= defendingPlayerStatsTemp2[i][j];
				awayPlayerStats[i][j]+= attackingPlayerStatsTemp2[i][j];
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
		let attackingTeamStats = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA
		let defendingTeamStats = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA
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
		attAssistChanceTotal = (attAssistChanceTotal / 35640) * 210;
		
		for (let i = 0; i < defenceTeam.minutes.length; i++) {
			defChanceTotal = defChanceTotal + (defenceTeam.minutes[i] * (defenceTeam.lineup[i].spe + defenceTeam.lineup[i].qui*0.2 + defenceTeam.lineup[i].daw*0.3));
		}
		defChanceTotal = (defChanceTotal / 35640) * 40;
		assist = Math.floor(attAssistChanceTotal - defChanceTotal);
		//console.log(`ASSIST CHANCE for the attacking team: ${attAssistChanceTotal} / ${defChanceTotal} = ${assist}`);
		if(assist >= randAssist){
			do {
				let rand1 = Math.floor(Math.random() * 107328) + 1;
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
				randShot = Math.floor(Math.random()*99) +1;
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
				randShot = Math.floor(Math.random()*99) +1;
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
    let ballSecuring =
      15 -
      ((homeTeam.lineup[attacker].dri +
        homeTeam.lineup[attacker].pas +
        homeTeam.lineup[attacker].qui) /
        100) *
        5;
    let teamSteal = 0;
    let teamStealChance;
    let stealerFound = 0;
    for (let i = 0; i < awayTeam.minutes.length; i++) {
      teamSteal =
        teamSteal +
        awayTeam.minutes[i] * (awayTeam.lineup[i].stl + awayTeam.lineup[i].daw);
    }
    teamSteal = (teamSteal / 47520) * 10;
    teamStealChance = Math.floor(ballSecuring + teamSteal);

    let checkIfStolen = Math.floor(Math.random() * 100) + 1;

    if (checkIfStolen <= teamStealChance) {
      do {
        let rand1 = Math.floor(Math.random() * 21384) + 1;
        let findStealer = Math.floor(Math.random() * awayTeam.minutes.length);
        let stealersSkills =
          (awayTeam.lineup[findStealer].stl * 2 +
            awayTeam.lineup[findStealer].daw +
            awayTeam.lineup[findStealer].qui * 0.5) *
          awayTeam.minutes[findStealer];

        if (stealersSkills >= rand1) {
          stealerFound++;
             console.log(
               `Ball STOLEN from ${homeTeam.lineup[attacker].name} by ${awayTeam.lineup[findStealer].name} !!!`
             );
          return [attacker, findStealer, 1, 1];
        }
      } while (stealerFound == 0);
    } else {
      return [0, 0, 0, 0]; // RETURNS attacking player, defending player, 1/0 lost ball, 1/0 stolen ball
    }
  }
	/*
	*
	!-------- Method to simulate if shot is blocked ---------!
	*
	*/
  checkBlock (attacker, homeTeam, awayTeam) {
    let teamBlock = 0;
    let blockerFound = 0;
    for (let i = 0; i < awayTeam.minutes.length; i++) {
      teamBlock =
        teamBlock +
        awayTeam.minutes[i] * (awayTeam.lineup[i].blk + awayTeam.lineup[i].daw);
    }
    teamBlock = (teamBlock / 47520) * 10;
    //console.log(`teamBlock = ${teamBlock} ???`);

    let checkIfBlocked = Math.floor(Math.random() * 100) + 1;

    if (checkIfBlocked <= teamBlock) {
      do {
        let rand1 = Math.floor(Math.random() * 11409) + 1;
        let findBlocker = Math.floor(Math.random() * awayTeam.minutes.length);
        let blockersSkills =
          (awayTeam.lineup[findBlocker].blk * 2 +
            awayTeam.lineup[findBlocker].daw * 0.1 +
            awayTeam.lineup[findBlocker].jum * 0.3) *
          awayTeam.minutes[findBlocker];

        if (blockersSkills >= rand1) {
          blockerFound++;
          console.log(
            `${homeTeam.lineup[attacker].name}'s shot BLOCKED by ${awayTeam.lineup[findBlocker].name} !!!`
          );
          return [attacker, findBlocker, 1, 1];
        }
      } while (blockerFound == 0);
    } else {
      return [0, 0, 0, 0]; // RETURNS attacking player, defending player, 1/0 lost shot, 1/0 blocked shot
    }
  }
}

// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl1 = new Player(1, "Trae Young", "PG",26,  56,76,77,85, 60,40,74,74,86,94, 8,23,90,44,10,56, 84,86,40,  6, "SG",'USA',185,74,2018,5); // Atlanta
let pl2 = new Player(2, 'Cody Zeller',"C",32, 66,60,22,69, 68,65,60,44,30,23, 66,72,58,48,35,45, 68,80,0, 11, "PF",'USA',211,108,2013,4); // Atlanta
let pl3 = new Player(3, "Clint Capela", "C",30, 70,40,0,63, 60,75,50,48,38,17, 96,84,64,71,80,45, 76,83,0,  10, "PF",'Switzerland',208,108,2014,25); // Atlanta
let pl4 = new Player(4, "Bogdan Bogdanovic", "SG",32, 60,79,77,90, 65,53,65,65,69,41, 16,33,78,52,16,56, 78,77,0,  7,'SF','Serbia',196,99,2014,27); // Atlanta
let pl5 = new Player(5, "Larry Nance Jr.", "PF",31, 65,64,34,70, 76,59,55,51,54,33, 56,63,52,66,40,76, 73,83,0, 9,'C','USA',203,111,2015,27); // Atlanta
let pl6 = new Player(6, "De'Andre Hunter", "SF",27, 64,70,74,84, 65,55,66,73,60,19, 14,41,76,60,15,45, 80,80,40, 5,'SG','USA',203,102,2019,4); // Atlanta
let pl7 = new Player(7, "Onyeka Okongwu", "C", 24, 64,68,33,79, 65,60,64,64,44,19, 74,59,60,63,75,35, 70,83,60, 4,'PF','USA',203,106,2020,6); // Atlanta
let pl8 = new Player(8, "Garrison Mathews", "SG",28, 53,71,78,81, 55,34,40,50,66,13, 12,30,55,44,15,59, 67,79,20, 5,'SF','USA',196,97,0,0); // Atlanta
let pl9 = new Player(9, "Vit Krejci", "SG",24, 50,54,70,83, 66,30,65,65,60,33, 18,37,46,46,20,45, 67,80,60, 3,'SF','Czechia',203,88, 2020,37); // Atlanta
let pl10 = new Player(10, "Kevon Harris", "SG",27, 53,62,61,76, 64,48,61,61,59,13, 44,34,53,50,20,56, 62,80,30, 2,'SF','USA',196,97,0,0); // Atlanta
let pl11 = new Player(11, "Jalen Johnson", "PF",23, 70,66,64,72, 72,58,66,66,48,39, 28,79,73,59,50,59, 70,80,70, 3,'PF','USA',206,99,2021,20); // Atlanta
let pl12 = new Player(12, "Zaccharie Risacher", "SF",19, 64,62,60,72, 57,46,60,72,69,50, 32,51,60,65,45,45, 80,80,100,  0,'SG','France',206,90,2024,1); // Atlanta
let pl13 = new Player(13, "Dyson Daniels", "PG", 21, 53,62,51,64, 65,42,69,74,76,45, 32,49,49,70,35,86, 70,80,90, 2,'SG','Australia',203,90,2022,8); // Atlanta
let pl14 = new Player(14, "David Roddy", "PF",23, 60,62,50,66, 56,63,65,64,56,23, 30,51,59,53,20,50, 68,80,70,  2,'SF','USA',193,115,2022,23); // Atlanta
let pl15 = new Player(15, "Kobe Bufkin", "SG",21, 53,69,50,73, 68,30,76,76,77,50, 22,50,56,45,45,59, 61,80,90, 1,'PG','USA',193,88,2023,15); // Atlanta
let pl16 = new Player(16, "Dominick Barlow", "PF",21, 54,63,33,70, 65,52,58,58,59,31, 78,58,54,45,54,50, 63,80,90  , 2,'SF','USA',206,100,0,0); // Atlanta
let pl17 = new Player(17, "Mouhamed Gueye", "PF",22, 60,57,53,63, 65,53,57,57,50,20, 86,59,52,50,60,52, 62,80,80, 1,'C','Senegal',211,95,2023,39); // Atlanta
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl18 = new Player(18, "Jrue Holiday", "PG", 34, 55,61,78,83, 58,39,69,86,76,53, 26,46,70,80,40,60, 83,80,0  ,15,'SG','USA',193,92,2009,17); // Boston
let pl19 = new Player(19, "Kristaps Porzingis", "C",29, 80,82,70,85, 68,64,56,55,58,24, 42,71,88,67,84,45, 80,77,20, 8,'PF','Latvia',218,108,2015,4); // Boston
let pl20 = new Player(20, "Al Horford", "C", 38, 67,73,80,76, 59,81,43,57,40,35, 34,68,55,70,60,40, 77,78,0 , 17,'PF','Dominican Republis',206,108,2007,3); // Boston
let pl21 = new Player(21, "Jaylen Brown", "SF", 28, 72,86,69,72, 74,59,69,77,76,38, 26,51,86,70,30,60, 80,82,20 ,8,'SG','USA',198,101,216,3); // Boston
let pl22 = new Player(22, "Payton Pritchard", "PG",26, 45,80,75,86, 56,31,65,65,69,55, 28,38,80,40,7,45, 67,81,40, 4,'SG','USA',185,88,2020,26); // Boston
let pl23 = new Player(23, "Jayson Tatum", "PF", 26, 78,86,70,83, 73,61,72,78,76,50, 20,73,93,70,30,50, 84,80,40  ,7,'SF','USA',203,95,2017,3); // Boston
let pl24 = new Player(24, "Derrick White", "SG",30, 56,74,76,89, 65,36,78,83,76,57, 16,39,69,76,59,54, 77,81,0  ,7,'PG','USA',193,86,2017,29); // Boston
let pl25 = new Player(25, "Lonnie Walker IV","SG",26, 56,62,72,76, 73,54,79,79,68,26, 10,41,75,51,35,53, 70,82,40 , 6,'SF','USA',193,92,2018,18); // Boston
let pl26 = new Player(26, "Xavier Tillman Sr.", "C",25, 66,53,46,57, 59,62,36,57,51,26, 60,55,54,74,66,75, 67,80,50, 4,'PF','USA',203,111,2020,35); // Boston
let pl27 = new Player(27, "Jordan Walsh", "SF",20, 55,55,58,71, 76,44,67,67,58,37, 44,47,53,63,40,62, 60,80,100, 1,'PF','USA',201,92,2023,38); // Boston
let pl28 = new Player(28, "JD Davison", "PG", 22, 45,63,61,73, 74,44,75,75,76,72, 26,45,58,47,50,50, 55,80,80, 2,'SG','USA',185,88,2022,53); // Boston
let pl29 = new Player(29, "Luke Kornet", "C", 29, 64,46,32,82, 52,56,28,27,33,25, 86,52,55,57,84,40, 64,77,10, 7,'PF','USA',218,113,0,0); // Boston
let pl30 = new Player(30, "Sam Hauser","SF",27, 51,74,82,89, 52,56,51,52,33,17, 20,48,64,44,35,40, 67,80,30, 3,'PF','USA',203,97,0,0); // Boston
let pl31 = new Player(31, "Neemias Queta","C",25, 58,47,0,71, 55,66,49,49,28,22, 90,70,60,54,80,60, 60,80,50, 3,'C','Portugal',213,111,2021,39); // Boston
let pl32 = new Player(32, "Jaden Springer","SG",22, 45,63,40,82, 62,39,72,72,71,31, 48,33,53,65,55,90, 59,80,80, 3,'PG','USA',193,92,2021,28); // Boston
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl33 = new Player(33, "Shake Milton","SG",28 , 50,82,60,82, 67,28,67,69,74,46, 18,46,65,43,20,50, 69,83,20, 6,'PG','USA',196,92,2018,54); // Brooklyn
let pl34 = new Player(34, "Bojan Bogdanovic", "SF",35, 56,80,79,80, 55,50,57,62,64,24, 14,38,81,51,5,37, 79,84,0, 10,'PF','Bosnia and Herzegovina',201,102,2011,31); // Brooklyn
let pl35 = new Player(35, "Dorian Finney-Smith", "PF",31, 56,61,58,72, 70,52,57,72,50,20, 40,40,50,63,35,51, 77,81,0, 8,'SF','USA',201,99,0,0); // Brooklyn
let pl36 = new Player(36, "Killian Hayes", "PG",23, 50,69,37,75, 60,46,69,69,73,73, 8,39,53,58,35,66, 76,83,70, 4,'SG','France',196,88,2020,7); // Brooklyn
let pl37 = new Player(37, "Keon Johnson", "SG",22, 48,58,60,76, 88,30,83,74,62,42, 24,29,59,56,30,62, 64,80,10, 3,'SF','USA',196,84,2021,21); // Brooklyn
let pl38 = new Player(38, "Trendon Watford", "PF",24, 68,58,60,76, 70,69,53,53,40,34, 44,60,64,45,35,50, 66,80,60, 3,'C','USA',206,108,0,0); // Brooklyn
let pl39 = new Player(39, "Nic Claxton", "C",25, 67,64,25,55, 69,61,59,67,39,25, 66,87,64,73,85,45, 75,80,50, 5,'PF','USA',211,97,2019,31); // Brooklyn
let pl40 = new Player(40, "Ziaire Williams","SF",23, 57,56,50,80, 72,30,77,77,69,26, 24,50,58,57,15,54, 69,80,70,  3,'SG','USA',206,97,2021,10); // Brooklyn
let pl41 = new Player(41, "Jalen Wilson", "SF",24, 47,62,58,79, 65,20,72,69,58,24, 50,46,53,39,10,30, 65,80,60,  1,'PF','USA',203,102,2023,51); // Brooklyn
let pl42 = new Player(42, "Cameron Johnson", "PF",28, 62,71,75,82, 69,50,60,60,49,31, 24,44,77,55,20,55, 77,78,20, 5,'SF','USA',203,95,2019,11 ); // Brooklyn
let pl43 = new Player(43, "Dennis Schroder", "PG",31, 44,76,67,83, 64,36,74,78,76,71, 12,29,66,50,10,45, 77,80,0, 11,'SG','Germany',185,78,2013,17); // Brooklyn
let pl44 = new Player(44, "Ben Simmons", "SF",28, 70,36,30,44, 70,60,77,77,76,86, 40,67,55,68,45,54, 73,80,20, 6,'PG','Australia',208,108,2016,1); // Brooklyn
let pl45 = new Player(45, "Amari Bailey", "PG",20, 50,69,58,70, 61,36,74,74,69,39, 24,37,52,44,10,46, 56,90,100, 1,'SG','USA',196,83,2023,41); // Brooklyn
let pl46 = new Player(46, "Dariq Whitehead", "SF",20, 52,66,59,79, 72,42,69,69,68,34, 17,38,50,52,32,54, 60,77,100, 1,'SG','USA',201,99,2023,22); // Brooklyn
let pl47 = new Player(47, "Cam Thomas", "SG",23, 67,72,70,85, 69,44,67,67,72,33, 10,36,85,43,15,40, 72,80,70, 3,'SF','USA',193,95,2021,27); // Brooklyn
let pl48 = new Player(48, "Day'Ron Sharpe", "C",23, 54,39,36,61, 63,69,51,51,48,33, 93,89,60,57,74,45, 63,80,70, 3,'PF','USA',211,120,2021,29); // Brooklyn
let pl49 = new Player(49, "Noah Clowney", "PF",20, 65,59,56,70, 65,54,54,54,49,18, 50,67,54,56,68,40, 66,80,100, 1,'C','USA',208,95,2023,21); // Brooklyn
let pl50 = new Player(50, "Jaylen Martin", "SG",20, 51,46,40,60, 73,30,73,66,55,51, 53,44,50,50,53,36, 55,82,100, 0,'SF','USA',198,97,0,0); // Brooklyn
let pl51 = new Player(51, "Mark Armstrong", "PG",20, 51,50,28,80, 60,30,65,65,60,24, 10,30,50,40,10,40, 50,80,100, 0,'SG','USA',188,90,0,0); // Brooklyn
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl52 = new Player(52, "LaMelo Ball", "PG",23, 63,68,70,83, 69,40,74,74,78,86, 30,56,90,63,20,75, 81,82,70, 4,'SG','USA',201,81,2020,3); // Charlotte
let pl53 = new Player(53, "Tre Mann", "PG",23, 53,70,62,77, 58,43,64,64,73,60, 14,47,59,50,15,65, 71,80,70, 3,'SG','USA',190,80,2021,18); // Charlotte
let pl54 = new Player(54, "Nick Richards","PF",27, 59,49,33,73, 65,55,62,60,25,11, 76,76,60,55,70,25, 67,84,30,  4,'C','Jamaica',213,111,2020,42); // Charlotte
let pl55 = new Player(55, "Grant Williams","PF",26, 60,63,67,76, 56,63,48,60,56,29, 30,42,60,55,38,38, 72,80,40,  4,'C','USA',198,107,2019,22 ); // Charlotte
let pl56 = new Player(56, "Seth Curry", "SG",34, 38,63,70,90, 58,31,68,68,68,31, 22,29,59,42,20,53, 73,80,0, 10,'PG','USA',185,83,0,0); // Charlotte Hornets
let pl57 = new Player(57, "Tidjane Salaun", "PF",19, 58,62,52,73, 70,50,61,72,56,32, 42,47,55,54,40,49, 68,80,100, 0,'SF','France',208,91,2024,6); // Charlotte
let pl58 = new Player(58, "Miles Bridges", "SF",26, 71,63,60,82, 72,63,65,66,66,32, 20,61,80,50,40,45, 80,85,40, 5,'PF','USA',201,102,2018,12); // Charlotte
let pl59 = new Player(59, "Taj Gibson","PF",39, 67,72,26,71, 48,73,39,47,25,20, 48,46,54,57,51,40, 65,83,0,  15,'C','USA',206,105,2009,26); // Charlotte
let pl60 = new Player(60, "Vasilije Micic", "PG",30, 47,77,47,81, 52,34,65,65,76,80, 8,23,56,42,10,45, 69,82,0,  1,'SG','Serbia',196,90,2014,52); // Charlotte
let pl61 = new Player(61, "Josh Green", "SG",24, 51,67,67,68, 70,50,76,76,60,31, 20,34,53,56,10,53, 70,83,60,  4,'PF','Australia',196,90,2020,18); // Charlotte
let pl62 = new Player(62, "Cody Martin", "SF",29, 59,32,51,65, 65,48,58,62,63,40, 32,43,50,57,35,66, 71,80,10, 5,'SG','USA',196,92,2019,36); // Charlotte
let pl63 = new Player(63, "Nick Smith Jr.","SG",20, 52,47,74,86, 76,38,74,74,69,29, 18,27,65,41,15,25, 64,80,100,   1,'PG','USA',200,100,0,0); // Charlotte
let pl64 = new Player(64, "Moussa Diabate", "C",22, 53,58,40,64, 68,50,63,63,30,23, 87,51,55,53,60,60, 57,80,80,  2,'PF','France',211,95,2022,43); // Charlotte
let pl65 = new Player(65, "Keyontae Johnson", "SG",24, 53,58,60,71, 71,50,71,68,54,32, 40,43,45,49,30,48, 60,80,60, 1,'SF','USA',200,100,0,0); // Charlotte
let pl66 = new Player(66, "Brandon Miller", "SG",22, 58,81,67,82, 75,41,68,72,76,26, 18,39,79,55,30,50, 82,80,80, 1,'SF','USA',206,91,2023,2); // Charlotte
let pl67 = new Player(67, "Mark Williams", "C",23, 67,50,0,71, 65,70,55,54,25,16, 92,86,65,59,70,53, 71,80,70, 2,'PF','USA',213,109,2022,15); // Charlotte
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl68 = new Player(68, "Torrey Craig", "SF",34, 53,44,64,71, 63,39,53,70,59,19, 46,51,51,64,50,47, 69,80,0, 7,'PF','USA',201,100,0,0); // Chicago Bulls
let pl69 = new Player(69, "Lonzo Ball", "PG",27, 52,55,66,75, 65,42,75,76,76,62, 20,47,56,70,40,72, 82,75,30, 5,'SG','USA',198,86,2017,2); // Chicago Bulls
let pl70 = new Player(70, "Jevon Carter", "PG",29, 39,79,68,79, 61,50,66,73,69,37, 14,32,55,58,30,60, 65,81,10, 6,'SG','USA',185,90,2018,32); // Chicago Bulls
let pl71 = new Player(71, "Talen Horton-Tucker", "SG",24, 62,32,49,77, 63,59,60,68,72,63, 18,40,66,56,35,69, 70,80,60, 5,'PG','USA',193,106,2019,46); // Chicago Bulls
let pl72 = new Player(72, "Josh Giddey", "SF",22, 63,75,59,80, 64,50,69,69,79,71, 42,72,73,56,40,45, 78,80,90, 3,'PG','Australia',203,95,2021,6); // Chicago Bulls
let pl73 = new Player(73, "Ayo Dosunmu", "SG",24, 52,81,69,81, 65,42,66,68,69,40, 18,30,60,53,30,53, 77,80,60, 3,'PG','USA',196,90,2021,38); // Chicago Bulls
let pl74 = new Player(74, "Jalen Smith", "PF",24, 65,62,69,74, 76,55,59,58,28,17, 74,76,64,51,65,30, 66,80,60,  4,'C','USA',208,97,2020,10); // Chicago Bulls
let pl75 = new Player(75, "Matas Buzelis", "SF",20, 63,63,63,68, 74,50,76,60,59,40, 38,57,60,54,59,48, 60,80,100, 0,'PF','Lithuania',208,94,2024,11); // Chicago Bulls
let pl76 = new Player(76, "Chris Duarte", "SG",27, 56,43,58,81, 53,49,55,58,65,25, 20,41,60,56,15,55, 69,80,30, 3,'SF','Dominican Republic',198,86,2021,13); // Chicago Bulls
let pl77 = new Player(77, "E.J. Liddell", "PF",24, 60,69,56,76, 79,55,63,63,50,28, 39,66,50,53,69,44, 52,80,60, 1,'SF','USA',201,108,2022,41); // Chicago Bulls
let pl78 = new Player(78, "Julian Phillips", "SF",21, 49,58,51,70, 70,30,63,68,56,14, 26,26,51,52,35,50, 58,80,90, 1,'PF','USA',203,89,2023,35); // Chicago Bulls
let pl79 = new Player(79, "Zach LaVine", "SG",29, 70,80,67,84, 87,39,74,74,78,44, 10,50,80,54,15,45, 82,83,10, 10,'SF','USA',196,90,2014,13); // Chicago Bulls
let pl80 = new Player(80, "Adama Sanogo", "C",22, 57,60,49,72, 52,61,60,58,40,18, 70,74,50,46,56,46, 57,80,80 , 1,'PF','Mali',206,111,0,0); // Chicago Bulls
let pl81 = new Player(81, "Dalen Terry", "SG",22, 51,62,43,61, 59,48,66,66,70,41, 34,44,50,58,45,65, 59,80,80, 2,'SF','USA',201,88,2022,18); // Chicago Bulls
let pl82 = new Player(82, "Nikola Vucevic", "C",34, 73,71,54,82, 35,79,52,39,25,35, 58,82,80,51,40,40, 81,77,0, 13,'PF','Montenegro',208,117,2011,16); // Chicago Bulls
let pl83 = new Player(83, "Coby White", "PG",24, 56,62,70,83, 71,46,75,75,76,51, 10,40,80,48,10,40, 79,80,70, 5,'SG','USA',196,88,2019,7); // Chicago Bulls
let pl84 = new Player(84, "Patrick Williams", "PF",23, 51,69,75,77, 67,54,60,65,60,17, 26,54,55,62,50,53, 77,81,70, 4,'SF','USA',201,97,2020,4); // Chicago Bulls
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl85 = new Player(85, "Donovan Mitchell", "SG",28, 65,84,70,86, 87,50,85,80,80,62, 18,43,91,68,30,70, 84,80,20, 7,'PG','USA',190,97,2017,13); //Cleveland
let pl86 = new Player(86, "Ty Jerome", "SG",27, 48,77,60,83, 52,46,59,63,76,55, 12,33,60,47,10,55, 67,80,30, 5,'PG','USA',196,88,2019,24); //Cleveland
let pl87 = new Player(87, "Evan Mobley", "PF",23, 73,59,47,71, 71,64,62,69,50,38, 52,84,77,77,71,53, 83,80,70, 3,'C','USA',211,97,2021,3); //Cleveland
let pl88 = new Player(88, "Jarrett Allen", "C",26, 75,72,27,74, 69,74,65,62,25,31, 74,80,66,68,73,40, 78,82,40, 7,'PF','USA',211,110,2017,22); //Cleveland
let pl89 = new Player(89, "Caris LeVert", "SG",30, 64,61,54,74, 70,44,65,67,76,53, 18,40,70,56,25,60, 78,78,0, 8,'SF','USA',198,92,2016,20); //Cleveland
let pl90 = new Player(90, "Sam Merrill", "SG",28, 45,71,80,89, 50,34,52,54,66,34, 14,33,65,42,5,40, 64,79,20, 4,'PG','USA',193,92,2020,60); //Cleveland
let pl91 = new Player(91, "Dean Wade", "PF",28, 59,60,70,69, 73,50,52,58,50,18, 22,53,50,56,30,55, 69,79,20, 5,'SF','USA',206,103,0,0); //Cleveland
let pl92 = new Player(92, "Darius Garland", "PG",24, 49,76,74,86, 74,30,78,78,79,71, 10,23,80,48,5,56, 83,80,60, 5,'SG','USA',185,87,2019,5); //Cleveland
let pl93 = new Player(93, "Isaac Okoro", "SF",23, 57,50,66,70, 70,57,67,75,62,22, 24,25,53,66,25,53, 77,82,70, 4,'SG','USA',196,102,2020,5); //Cleveland
let pl94 = new Player(94, "Max Strus", "SF",28, 55,75,70,81, 64,30,66,66,59,31, 16,38,64,42,15,40, 75,85,20, 5,'SG','USA',196,97,0,0); //Cleveland
let pl95 = new Player(95, "Georges Niang", "PF",31, 55,74,79,86, 62,50,34,45,57,20, 12,44,65,46,15,35, 66,84,0, 8,'SF','USA',201,104,2016,50); //Cleveland
let pl96 = new Player(96, "Craig Porter Jr.","PG",24, 51,76,43,73, 62,38,69,69,63,66, 22,49,60,52,45,53, 62,80,60, 1,'SG','USA',188,84,0,0); //Cleveland
let pl97 = new Player(97, "Jaylon Tyson", "SG",22, 54,68,56,79, 65,53,70,66,65,37, 21,47,51,47,40,46, 60,80,80, 0,'SF','USA',198,97,2024,20); //Cleveland
let pl98 = new Player(98, "JT Thor", "PF",22, 59,62,52,64, 72,40,74,74,50,15, 32,45,49,53,55,35, 62,80,80, 3,'C','USA',208,92,2021,37); //Cleveland
let pl99 = new Player(99, "Luke Travers", "SG",23, 46,62,54,68, 65,38,58,56,61,21, 27,33,50,45,46,36, 60,80,70, 0,'SF','Australia',203,90,2022,56); //Cleveland
let pl100 = new Player(100, "Tristan Thompson", "C",33, 57,57,25,59, 64,64,53,54,29,14, 88,68,52,53,45,35, 61,90,0, 13,'PF','Canada',206,115,2011,4); //Cleveland
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl101 = new Player(101, "Luka Doncic", "PG",25, 80,78,78,78, 69,62,74,74,85,90, 16,81,98,62,25,59, 87,85,50, 6,'SG','Slovenia',201,104,2018,3); // Dallas
let pl102 = new Player(102, "Kyrie Irving", "SG",32, 58,88,81,90, 70,27,75,75,89,53, 40,44,90,56,25,60, 84,80,0, 13,'PG','USA',188,88,2011,1); // Dallas
let pl103 = new Player(103, "Spencer Dinwiddie", "PG",31, 58,42,60,79, 65,35,72,72,78,60, 10,29,59,52,20,45, 77,77,0,  10,'SG','USA',196,97,2014,38); // Dallas
let pl104 = new Player(104, "Reggie Bullock", "SF",31, 63,75,68,84,50,49,63,65,53,29,12,35,56,52,10,45,72,80,0, 2,'PF','USA',200,100,0,0);
let pl105 = new Player(105, "Klay Thompson", "SF",34, 52,80,81,85, 57,52,61,70,57,26, 12,35,77,64,30,45, 82,94,0, 11,'SG','USA',198,97,2011,11); // Dallas
let pl106 = new Player(106, "Dereck Lively II", "C",20, 66,50,0,51, 57,60,40,47,42,19, 78,68,59,60,83,50, 73,80,100, 1,'PF','USA',2016,104,2023,12);  // Dallas
let pl107 = new Player(107, "JaVale McGee", "C",34, 67,53,29,60,50,60,46,44,33,18,80,72,55,45,89,40,57,85,0, 2,'PF','USA',200,100,0,0);
let pl108 = new Player(108, "Maxi Kleber", "PF",30, 67,60,60,79,54,60,62,60,40,27,38,57,53,52,63,35,70,79,0, 2,'PF','USA',200,100,0,0);
let pl109 = new Player(109, "P.J. Washington", "PF",26, 70,69,58,70, 59,58,65,65,60,26, 28,52,65,51,54,53, 80,79,40, 5,'SF','USA',201,104,2019,12); // Dallas
let pl110 = new Player(110, "Daniel Gafford", "C",26, 69,55,0,67, 70,63,65,60,25,18, 76,62,66,66,90,51, 69,80,40, 5,'PF','USA',208,106,2019,38); // Dallas
let pl111 = new Player(111, "Davis Bertans", "PF",30, 68,70,71,86,53,52,66,65,50,29,12,45,65,48,35,40,69,80,0, 2,'PF','USA',200,100,0,0);
let pl112 = new Player(112, "Theo Pinson", "SF",27,55,60,61,85,60,40,70,71,57,55,18,47,53,46,15,59,54,80,35, 2,'PF','USA',200,100,0,0);
let pl113 = new Player(113, "Jaden Hardy", "SG",20, 58,55,54,79,70,39,78,77,63,55,16,30,45,46,23,55,58,90,95, 2,'PF','USA',200,100,0,0);
let pl114 = new Player(114, "Dwight Powell", "C",31, 70,55,39,75,54,65,61,48,42,29,60,57,58,47,45,54,68,79,0, 2,'PF','USA',200,100,0,0);
let pl115 = new Player(115, "Tyler Dorsey", "SG",26, 50,52,60,66,55,41,70,70,55,39,18,43,60,40,10,35,63,78,40, 2,'PF','USA',200,100,0,0);
let pl116 = new Player(116, "McKinley Wright IV", "PG",24, 47,45,47,80,63,37,74,73,65,49,20,31,45,50,25,53,55,85,65, 2,'PF','USA',200,100,0,0);
let pl117 = new Player(117, "Facundo Campazzo", "PG",31, 55,51,54,82,45,46,72,70,69,72,12,28,50,55,25,80,70,83,0, 2,'PF','USA',200,100,0,0);
// ins/2p/3p/ft/jum/str/spe/qui/dri/pas/ore/dre/oaw/daw/blk/stl/end/inj/pot - experience
let pl118 = new Player(118, "Nikola Jokic", "C",29, 85,84,65,81, 53,86,53,52,66,93, 58,96,97,68,45,58, 81,83,10,  9,'PF','Serbia',211,128,2014,41); // Denver
let pl119 = new Player(119, "Aaron Gordon", "PF",27, 67,56,54,70,80,60,69,63,50,41,40,58,69,56,40,45,77,86,40, 2,'PF','USA',200,100,0,0);
let pl120 = new Player(120, "Michael Porter Jr.", "SF",24, 73,74,73,79,64,54,70,71,64,25,38,70,80,48,45,45,74,72,70, 2,'PF','USA',200,100,0,0);
let pl121 = new Player(121, "Bruce Brown", "PG",26, 61,47,56,74,58,57,72,74,66,43,36,47,54,59,40,59,71,89,40, 2,'SG','USA',200,100,0,0);
let pl122 = new Player(122, "Russell Westbrook","PG",36, 58,60,47,68, 80,65,79,79,76,72, 44,59,70,57,25,67, 83,92,0, 16,'SG','USA',193,90,2008,4); // Denver
let pl123 = new Player(123, "Jeff Green", "PF",36, 63,63,58,80,58,59,63,60,54,29,22,42,60,50,30,40,74,84,0, 2,'PF','USA',200,100,0,0);
let pl124 = new Player(124, "Christian Braun", "SG",21, 55,62,61,74,59,44,73,70,54,39,22,43,53,45,27,52,69,94,90, 2,'SF','USA',200,100,0,0);
let pl125 = new Player(125, "Kentavious Caldwell-Pope", "SG",29, 60,69,62,81,49,50,75,72,60,31,16,31,58,60,15,59,78,89,15, 2,'PG','USA',200,100,0,0);
let pl126 = new Player(126, "Jamal Murray", "PG",27, 60,83,80,85, 70,44,70,70,79,74, 18,39,84,55,40,53, 81,78,30,  7,'SG','Canada',193,97,2016,7); // Denver
let pl127 = new Player(127, "DeAndre Jordan", "C",34, 67,35,10,47,63,70,60,51,30,23,82,90,52,51,81,35,63,74,0, 2,'PF','USA',200,100,0,0);
let pl128 = new Player(128, "Zeke Nnaji", "PF",21, 70,68,73,66,62,59,74,73,37,19,46,46,56,48,30,40,61,84,85, 2,'C','USA',200,100,0,0);
let pl129 = new Player(129, "Davon Reed", "SG",27, 51,74,67,65,55,50,66,64,64,36,14,51,47,48,20,58,60,78,35, 2,'SF','USA',200,100,0,0);
let pl130 = new Player(130, "Ish Smith", "PG",34, 54,69,54,67,50,32,84,83,76,80,14,38,58,47,25,59,69,80,0, 2,'SG','USA',200,100,0,0);
let pl131 = new Player(131, "Peyton Watson", "SG",20, 52,54,53,67,62,45,67,67,57,40,39,42,45,50,47,42,64,95,95, 2,'SF','USA',200,100,0,0);
let pl132 = new Player(132, "Vlatko Cancar", "PF",25, 67,50,54,74,50,56,57,57,48,34,34,48,20,50,55,89,55, 2,'C','USA',200,100,0,0);
let pl133 = new Player(133, "Collin Gillespie", "PG",23, 52,60,64,84,52,33,77,77,67,57,20,33,50,45,36,38,60,85,80, 2,'SG','USA',200,100,0,0);
let pl134 = new Player(134, "Jack White", "SF",25, 55,52,53,72,52,53,56,57,44,25,42,42,40,47,35,37,55,88,50, 2,'SG','USA',200,100,0,0);
// ins/2p/3p/ft/jum/str/spe/qui/dri/pas/ore/dre/oaw/daw/blk/stl/end/inj/pot
let pl135 = new Player(135, "Bojan Bogdanovic", "SF", 33, 62,67,68,86,45,55,65,64,58,29,14,38,74,47,5,35,79,89,0, 2,'PF','USA',200,100,0,0); // -> plays now in Brooklyn Nets
let pl136 = new Player(136, "Cade Cunningham", "PG",23, 67,84,53,85, 70,52,73,73,76,81, 16,48,84,59,30,55, 83,80,70, 3,'SG','USA',198,98,2021,1);//Detroit
let pl137 = new Player(137, "Saddiq Bay", "SF",23, 58,62,64,83,50,49,63,63,59,36,24,48,70,54,10,50,79,95,80, 2,'PF','USA',200,100,0,0);
let pl138 = new Player(138, "Jaden Ivey", "SG",22, 58,73,66,74, 75,44,81,81,76,54, 26,31,77,56,35,45, 80,80,80, 2,'PG','USA',193,88,2022,5);//Detroit
let pl139 = new Player(139, "Isaiah Stewart", "PF",23, 69,66,64,73, 60,76,53,61,24,18, 68,71,56,51,60,30, 75,77,70, 4,'C','USA',203,113,2020,16);//Detroit
let pl140 = new Player(140, "Jalen Duren", "C",21, 72,45,0,69, 74,71,63,63,49,30, 88,93,65,56,56,40, 76,80,90, 2,'PF','USA',208,113,2022,13);//Detroit
let pl141 = new Player(141, "Cory Joseph", "PG",31, 60,69,58,78,48,40,70,70,72,59,16,34,53,50,20,55,70,90,0, 2,'PF','USA',200,100,0,0);
let pl142 = new Player(142, "Tim Hardaway Jr.", "SG",32, 53,72,66,81, 68,45,58,65,68,24, 8,39,74,44,10,40, 77,83,0, 11,'SF','USA',196,92,2013,24);//Detroit
let pl143 = new Player(143, "Hamidou Diallo", "SG",24, 62,59,45,62,85,48,78,78,64,31,38,55,65,51,25,66,65,86,70, 2,'PF','USA',200,100,0,0);
let pl144 = new Player(144, "Kevin Knox", "SF",23, 50,49,56,70,60,59,72,72,60,25,20,46,59,47,25,35,65,88,75, 2,'PF','USA',200,100,0,0);
let pl145 = new Player(145, "Isaiah Livers", "PF",24, 48,56,62,82,55,48,69,69,58,38,35,46,53,47,30,54,68,85,70, 2,'PF','USA',200,100,0,0);
let pl146 = new Player(146, "Rodney McGruder", "SG",31, 63,57,60,65,55,45,68,65,60,33,30,37,49,55,15,45,67,84,0, 2,'PF','USA',200,100,0,0);
let pl147 = new Player(147, "Buddy Boeheim", "PG",23, 54,63,64,80,53,44,55,55,54,51,25,37,50,40,46,32,60,90,70, 2,'PF','USA',200,100,0,0);
let pl148 = new Player(148, "Tobias Harris", "PF",32, 71,75,63,87, 69,63,65,57,69,33, 22,59,65,53,30,53, 81,82,0, 13,'SF','USA',203,102,2011,19);//Detroit
let pl149 = new Player(149, "Alec Burks", "SG",31, 54,61,66,79,53,45,73,73,65,42,18,46,66,52,72,88,0, 2,'PF','USA',200,100,0,0);
let pl150 = new Player(150, "Marvin Bagley III", "PF",23, 68,66,49,66,65,68,70,71,52,23,70,71,77,47,50,35,75,83,80, 2,'PF','USA',200,100,0,0);
// ins/2p/3p/ft/jum/str/spe/qui/dri/pas/ore/dre/oaw/daw/blk/stl/end/inj/pot
let pl151 = new Player(151, "Stephen Curry", "PG",36, 53,80,90,92, 63,38,74,74,87,60, 12,44,97,55,20,40, 84,86,0,  15,'SG','USA',188,83,2009,7); // Golden State
let pl152 = new Player(152, "Andrew Wiggins", "SF",27, 63,62,63,72,85,53,81,81,70,34,26,33,82,63,35,50,85,90,45, 2,'SG','USA',200,100,0,0);
let pl153 = new Player(153, "Jordan Poole", "SG",23, 62,67,58,88,59,51,73,73,76,53,10,32,81,45,15,50,74,89,80, 2,'PG','USA',200,100,0,0);
let pl154 = new Player(154, "Klay Thompson", "SG",32, 64,78,75,84,53,52,71,74,66,36,10,33,85,62,30,50,79,70,0, 2,'SF','USA',200,100,0,0);
let pl155 = new Player(155, "James Wiseman", "C",21, 73,53,50,61,58,60,68,68,40,22,46,76,70,50,64,20,70,78,85, 2,'PF','USA',200,100,0,0);
let pl156 = new Player(156, "Draymond Green", "PF",34, 57,51,52,71, 56,75,63,72,68,71, 28,74,51,76,53,59, 78,88,0, 12,'SF','USA',198,104,2012,35); // Golden State
let pl157 = new Player(157, "Kevon Looney", "C",26, 68,60,27,60,54,64,58,63,48,40,80,64,50,51,55,53,66,93,40, 2,'PF','USA',200,100,0,0);
let pl158 = new Player(158, "JaMychal Green", "PF",32, 60,68,61,78,60,59,59,55,35,26,58,70,59,48,50,66,70,85,0, 2,'SF','USA',200,100,0,0);
let pl159 = new Player(159, "Donte DiVincenzo", "SG",25, 58,62,58,76,75,50,85,85,69,48,30,55,60,60,20,67,73,87,50, 2,'SF','USA',200,100,0,0);
let pl160 = new Player(160, "Moses Moody", "SG",20, 60,70,60,77,58,54,71,71,64,23,18,37,59,52,30,20,61,88,90, 2,'SF','USA',200,100,0,0);
let pl161 = new Player(161, "Jonathan Kuminga", "PF",22, 65,70,54,70, 80,63,74,74,57,28, 34,48,75,57,35,50, 71,80,80, 3,'SF','Democratic Republic of the Congo ',203,95,2021,7); // Golden State
let pl162 = new Player(162, "Ryan Rollins", "PG",20, 51,63,62,76,68,39,82,82,65,60,26,37,51,45,31,46,65,85,90, 2,'SG','USA',200,100,0,0);
let pl163 = new Player(163, "Patrick Baldwin Jr.", "SF",20, 61,60,60,71,52,59,57,57,48,33,34,46,50,43,30,30,65,85,90, 2,'SG','USA',200,100,0,0);
let pl164 = new Player(164, "Andre Iguodala", "SF",38, 64,60,56,70,55,63,73,73,68,57,20,45,54,63,30,66,80,70,0, 2,'PF','USA',200,100,0,0);
let pl165 = new Player(165, "Ty Jerome", "SG",25, 51,57,58,78,50,46,68,68,76,61,14,34,63,47,15,55,65,85,50, 2,'SF','USA',200,100,0,0);
let pl166 = new Player(166, "Anthony Lamb", "SF",24, 53,59,60,74,55,55,62,62,50,31,46,37,53,45,20,25,65,85,65, 2,'SG','USA',200,100,0,0);
// ins/2p/3p/ft/jum/str/spe/qui/dri/pas/ore/dre/oaw/daw/blk/stl/end/inj/pot
let pl167 = new Player(167, "Jalen Green","SG",22, 66,73,63,80, 82,45,78,78,76,40, 12,53,82,52,20,45, 82,80,80, 3,'PG','USA',193,80,2021,2); // Houston
let pl168 = new Player(168, "Kevin Porter Jr.","PG",22, 64,59,61,69,62,42,79,79,72,70,16,41,75,46,20,60,75,84,85, 2,'SG','USA',200,100,0,0);
let pl169 = new Player(169, "Jabari Smith","PF",19, 66,65,66,75,60,55,72,72,60,40,37,64,70,55,55,54,74,90,100, 2,'C','USA',200,100,0,0);
let pl170 = new Player(170, "Tari Eason","SF",21, 61,60,62,73,65,60,72,72,60,35,46,52,60,52,42,52,70,90,85, 2,'SG','USA',200,100,0,0);
let pl171 = new Player(171, "Kenyon Martin Jr.","SF",21, 68,50,60,66,64,52,75,75,59,30,40,51,59,44,53,45,70,92,85, 2,'SG','USA',200,100,0,0);
let pl172 = new Player(172, "Josh Christopher","SG",21, 61,46,47,73,60,45,73,73,63,50,28,37,65,51,15,70,65,94,85, 2,'SF','USA',200,100,0,0);
let pl173 = new Player(173, "Garrison Mathews","SG",26, 59,71,65,83,50,40,50,50,56,22,12,30,57,42,20,53,68,90,40, 2,'SF','USA',200,100,0,0); // plays in Atlanta now
let pl174 = new Player(174, "Eric Gordon","SG",34, 57,60,65,81,60,50,74,74,70,42,8,22,68,49,20,50,78,77,0, 2,'PF','USA',200,100,0,0);
let pl175 = new Player(175, "Alperen Sengun","C",22, 75,70,38,69, 59,76,42,54,52,55, 62,71,83,60,54,59, 77,80,80,  3,'PF','Turkey',211,106,2021,16); // Houston
let pl176 = new Player(176, "Usman Garuba","PF",20, 63,49,50,57,56,60,64,64,50,38,48,74,45,60,70,49,60,90,90, 2,'C','USA',200,100,0,0);
let pl177 = new Player(177, "Daishen Nix","PG",20, 55,50,53,68,60,53,83,83,78,60,19,32,40,44,10,73,60,90,90, 2,'SG','USA',200,100,0,0);
let pl178 = new Player(178, "Reed Sheppard","SG",20, 48,69,74,83, 77,46,80,79,66,55, 15,32,62,61,27,68, 73,80,100, 0,'PG','USA',188,83,2024,3); // Houston
// ins/2p/3p/ft/jum/str/spe/qui/dri/pas/ore/dre/oaw/daw/blk/stl/end/inj/pot
let pl179 = new Player(179, "Tyrese Haliburton","PG",24, 59,87,72,85, 60,49,73,73,82,96, 12,38,85,63,40,65, 82,80,60, 4,'SG','USA',196,83,2020,12); // Indiana
let pl180 = new Player(180, "Bennedict Mathurin","SG",20, 58,67,72,74,65,44,80,80,76,55,31,42,70,46,23,44,72,92,90, 2,'SF','USA',200,100,0,0);
let pl181 = new Player(181, "Buddy Hield","SG",30, 60,70,70,86,60,37,72,73,70,41,18,44,75,46,20,50,78,92,0, 2,'SF','USA',200,100,0,0);
let pl182 = new Player(182, "Jalen Smith","PF",22, 70,52,52,74,66,58,64,64,40,20,70,81,65,48,64,25,62,88,80, 2,'C','USA',200,100,0,0);
let pl183 = new Player(183, "Chris Duarte","SF",25, 58,69,63,81,51,48,62,62,63,35,18,42,63,50,15,55,75,85,50, 2,'SG','USA',200,100,0,0);
let pl184 = new Player(184, "Isaiah Jackson","PF",20, 67,54,39,66,65,57,68,68,45,21,76,61,60,50,85,60,64,84,90, 2,'C','USA',200,100,0,0);
let pl185 = new Player(185, "Andrew Nembhard","SG",22, 51,61,60,75,56,40,72,72,66,54,29,34,55,41,20,45,65,88,80, 2,'SF','USA',200,100,0,0);
let pl186 = new Player(186, "Goga Bitadze","C",23, 69,68,42,69,51,64,51,52,45,34,68,55,60,43,86,45,60,87,70, 2,'PF','USA',200,100,0,0);
let pl187 = new Player(187, "T.J. McConnell","PG",30, 58,75,54,76,50,38,71,71,70,90,18,39,52,60,15,83,70,80,0, 2,'SG','USA',200,100,0,0);
let pl188 = new Player(188, "Aaron Nesmith","SF",23, 68,70,52,79,53,44,60,61,60,24,24,50,54,42,25,45,61,85,70, 2,'SG','USA',200,100,0,0);
let pl189 = new Player(189, "Terry Taylor","SG",23, 67,72,52,70,63,58,72,72,64,31,90,39,62,44,25,35,68,86,70, 2,'SF','USA',200,100,0,0);
let pl190 = new Player(190, "Oshae Brissett","SF",24, 58,35,61,72,63,62,63,65,50,26,48,57,58,38,40,53,68,90,60, 2,'SG','USA',200,100,0,0);
let pl191 = new Player(191, "Myles Turner","C",26, 68,74,58,76,55,66,53,42,31,25,36,66,69,65,89,45,77,85,40, 2,'PF','USA',200,100,0,0);
let pl192 = new Player(192, "James Johnson","PF",35, 62,58,51,60,55,68,63,53,62,47,28,49,53,58,62,56,68,84,0, 2,'C','USA',200,100,0,0);
let pl193 = new Player(193, "Daniel Theis","C",30, 69,75,54,72,57,71,54,64,40,33,56,63,59,55,68,45,67,86,0, 2,'PF','USA',200,100,0,0);
let pl194 = new Player(194, "Kendall Brown","SG",19, 57,54,56,64,70,37,70,70,62,50,25,35,50,52,42,45,60,95,100, 2,'SF','USA',200,100,0,0);
let pl195 = new Player(195, "Trevelin Queen","SG",25, 53,53,58,69,60,39,66,66,61,51,34,44,45,41,41,45,60,90,50, 2,'SF','USA',200,100,0,0);
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl196 = new Player(196, "Norman Powell","SG",29, 59,68,65,82,65,40,75,78,70,34,12,35,74,56,20,60,70,85,10, 2,'SF','USA',200,100,0,0);
let pl197 = new Player(197, "Bones Hyland", "SG",24, 54,55,60,78, 58,32,77,77,69,62, 10,42,75,46,25,64, 68,80,70, 3,'SG','USA',188,78,2021,26); // Clippers
let pl198 = new Player(198, "Ivica Zubac","C",27, 72,64,10,72, 65,70,26,35,25,19, 78,86,67,50,72,25, 71,80,30, 8,'PF','Bosnia and Herzegovina',213,108,2016,32); // Clippers
let pl199 = new Player(199, "Luke Kennard","SG",26, 63,74,75,87,50,37,64,63,60,41,8,40,65,38,10,40,72,90,40, 2,'SF','USA',200,100,0,0);
let pl200 = new Player(200, "Terance Mann","SG",28, 57,53,63,79, 69,40,61,63,69,31, 34,43,59,48,20,40, 72,80,20, 5,'SF','USA',196,97,2019,48); // Clippers
let pl201 = new Player(201, "Nicolas Batum","PF",36, 54,69,74,71, 70,55,58,65,61,40, 32,42,50,56,45,55, 75,83,0, 16,'SF','France',203,104,2008,25); // Clippers
let pl202 = new Player(202, "Amir Coffey","SG",25, 68,57,65,80,59,44,70,70,65,37,14,37,59,46,15,45,63,88,50, 2,'SF','USA',200,100,0,0);
let pl203 = new Player(203, "Marcus Morris","PF",33, 61,75,65,77,53,65,68,45,46,30,24,49,64,51,20,45,77,80,0, 2,'C','USA',200,100,0,0);
let pl204 = new Player(204, "John Wall","PG",32, 58,60,54,75,60,50,80,80,78,87,12,31,78,64,35,65,80,70,0, 2,'SG','USA',200,100,0,0);
let pl205 = new Player(205, "Robert Covington","PF",32, 59,50,61,81,53,53,63,64,55,28,22,59,59,72,55,78,77,86,0, 2,'SF','USA',200,100,0,0);
let pl206 = new Player(206, "Moses Brown","C",23, 60,36,0,59,57,64,40,38,33,13,84,83,60,48,76,53,57,85,70, 2,'PF','USA',200,100,0,0);
let pl207 = new Player(207, "James Harden","PG",35, 70,71,74,87, 70,61,75,75,85,90, 12,50,80,58,40,55, 84,95,0,  15,'SG','USA',196,99,2009,3); // Clippers
let pl208 = new Player(208, "Brandon Boston Jr","SG",21, 60,64,52,81,63,40,76,76,65,34,16,44,61,42,30,54,60,90,90, 2,'SF','USA',200,100,0,0);
let pl209 = new Player(209, "Kawhi Leonard","SF",33, 75,80,79,87, 69,69,74,80,76,36, 26,52,90,78,45,70, 81,80,0,  12,'PF','USA',201,102,2011,15); // Clippers
let pl210 = new Player(210, "Moussa Diabate","PF",20, 58,54,53,57,60,50,67,67,45,30,36,54,50,46,65,34,60,90,95, 2,'C','USA',200,100,0,0);
let pl211 = new Player(211, "Jason Preston","PG",23, 55,55,58,60,62,42,77,77,70,72,21,47,55,48,27,50,62,95,70, 2,'SG','USA',200,100,0,0);
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl212 = new Player(212, "LeBron James", "SF", 40, 80,68,75,73,79,79,82,82,82,85,18,56,98,70,30,59,90,87,0, 21, "PF",'USA',206,113,2003,1); //Lakers
let pl213 = new Player(213, "Anthony Davis","C", 31, 80,69,29,82,76,82,74,73,65,35,64,90,95,84,87,58,85,80,0, 12, "PF",'USA',208,114,2012,1); //Lakers
let pl214 = new Player(214, "D'Angelo Russell","PG", 28, 60,71,83,80,61,44,76,76,80,70,8,30,79,50,25,50,80,83,30, 9, "SG",'USA',190,87,2015,2); //Lakers
let pl215 = new Player(215, "Christian Wood", "PF",29, 75,61,50,70,56,64,52,46,50,20,36,87,70,54,59,40,73,81,10, 8, "C",'USA',203,97,0,0); //Lakers
let pl216 = new Player(216, "Jarred Vanderbilt", "PF", 25, 55,59,29,66,70,60,65,73,55,22,60,73,50,78,40,82,70,78,50, 6, "C",'USA',203,97,2018,41); //Lakers
let pl217 = new Player(217, "Gabe Vincent", "PG", 28, 45,83,69,84, 56,30,68,68,70,35, 30,23,54,49,5,59, 70,82,20, 5, "SG",'USA',190,88,0,0); //Lakers
let pl218 = new Player(218, "Jaxson Hayes", "C", 24, 68,58,26,62, 65,62,50,58,30,24, 56,58,56,62,54,58, 66,80,60, 5, "PF",'USA',213,99,2019,8); //Lakers
let pl219 = new Player(219, "Rui Hachimura", "PF", 26, 70,75,72,74, 70,69,62,64,62,26, 22,47,74,50,25,40, 76,80,50, 5, "SF",'Japan',203,104,2019,9); //Lakers
let pl220 = new Player(220, "Cam Reddish", "SF", 25, 58,50,66,83, 74,42,75,75,71,28, 20,33,57,65,25,67, 73,80,50, 5, "SG",'USA',203,98,2019,10); //Lakers
let pl221 = new Player(221, "Jordan Goodwin", "PG", 25, 46,61,50,75, 45,40,65,66,68,56, 48,64,54,60,35,64, 67,80,60, 3, "SG",'USA',190,90,0,0); //Lakers
let pl222 = new Player(222, "Austin Reaves", "SG", 26, 57,73,69,85, 70,40,73,73,63,62, 16,40,73,53,15,45, 78,80,60, 3, "PG",'USA',196,93,0,0); //Lakers
let pl223 = new Player(223, "Max Christie", "SG", 21, 55,70,67,78, 72,45,77,77,60,23, 12,48,52,52,30,40, 64,80,90, 2, "SF",'USA',198,86,2022,35); //Lakers
let pl224 = new Player(224, "Bronny James", "SG", 19, 51,53,59,68, 80,50,77,77,60,40, 22,40,55,60,40,55, 70,90,100, 0, "PG",'USA',188,95,2024,55); //Lakers
let pl225 = new Player(225, "Jalen Hood-Schifino", "SG", 21, 55,69,53,70, 62,38,69,69,72,46, 14,36,55,50,35,50, 55,80,80, 1, "PG",'USA',198,97,2023,17); //Lakers
let pl226 = new Player(226, "Maxwell Lewis", "SF", 22, 46,60,57,67, 65,34,57,65,60,21, 20,30,46,46,31,33, 53,80,70, 1, "SG",'USA',201,88,2023,40); //Lakers
let pl227 = new Player(227, "Dalton Knecht", "SF", 23, 58,69,70,77, 67,40,76,49,58,30, 20,40,60,45,30,35, 60,80,80, 0, "SG",'USA',196,98,2024,17); //Lakers
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl228 = new Player(228, 'Ja Morant','PG',25, 67,80,51,76, 87,42,85,85,86,83, 22,50,90,62,30,53, 82,80,60, 5,'SG','USA',188,78,2019,2); //Memphis
let pl229 = new Player(229, 'Jaren Jackson Jr.','C',25, 75,58,58,80, 65,72,53,70,50,26, 34,53,84,76,80,55, 78,94,50, 6,'PF','USA',208,109,2018,4); //Memphis
let pl230 = new Player(230, 'Desmond Bane','SG',26, 60,75,81,87, 68,46,64,70,72,57, 18,44,85,62,25,53, 79,78,40, 4,'SF','USA',196,97,2020,30); //Memphis
let pl231 = new Player(231, 'GG Jackson II','SF',20, 65,60,65,75, 72,52,72,69,52,17, 30,42,70,50,35,40, 75,80,100, 1,'PF','USA',206,97,2023,45); //Memphis
let pl232 = new Player(232, 'Brandon Clarke','PF',28, 66,76,28,69, 70,54,74,73,59,24, 70,64,68,68,66,59, 71,80,20, 5,'C','Canada',203,97,2019,21); //Memphis
let pl233 = new Player(233, "Marcus Smart", "PG",30, 45,80,51,76, 70,63,65,83,64,56, 16,30,59,77,20,80, 80,83,0, 10,'SG','USA',190,99,2014,6); //Memphis
let pl234 = new Player(234, 'Luke Kennard','SG',28, 47,70,90,88, 50,30,59,58,68,59, 16,40,65,38,5,40, 73,80,20, 7,'PG','USA',196,93,2017,12); //Memphis
let pl235 = new Player(235, 'Santi Aldama','PF',23, 64,66,64,69, 49,60,49,50,32,31, 38,62,60,56,56,50, 71,79,70, 3,'SF','Spain',211,101,2021,30); //Memphis
let pl236 = new Player(236, 'Zach Edey','C',22, 70,50,30,70, 56,65,36,21,29,20, 69,75,60,52,72,33, 68,80,80, 0,'PF','Canada',224,137,2024,9); //Memphis
let pl237 = new Player(237, 'Jaylen Wells','SF',21, 48,62,69,81, 57,50,76,65,65,24, 24,40,52,39,30,33, 65,80,90, 0,'SG','USA',203,92,2024,39); //Memphis
let pl238 = new Player(238, 'Vince Williams Jr.','SG',24, 51,50,65,80, 60,42,58,72,60,44, 30,58,59,64,45,56, 73,80,60, 2,'SF','USA',193,92,2022,47); //Memphis
let pl239 = new Player(239, 'Jake LaRavia','PF',23, 61,66,54,82, 62,52,49,59,58,26, 46,34,60,50,25,59, 67,80,70, 2,'SF','USA',203,106,2022,19); //Memphis
let pl240 = new Player(240, 'Scotty Pippen Jr.','PG',24, 45,68,70,74, 69,29,72,72,69,67, 30,31,64,52,35,85, 70,80,60, 2,'SG','USA',185,83,0,0); //Memphis
let pl241 = new Player(241, 'John Konchar','SF',28, 49,66,66,80, 60,30,52,59,66,34, 44,57,45,54,60,66, 68,84,20, 5,'SG','USA',196,95,0,0); //Memphis
let pl242 = new Player(242, 'Jay Huff','C',26, 57,62,64,75, 52,52,38,37,33,15, 40,66,56,47,66,53, 55,77,40, 3,'PF','USA',216,108,0,0); //Memphis
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl243 = new Player(243,'Jimmy Butler','PF',35, 76,71,65,85, 72,66,74,82,76,53, 38,38,82,76,20,70, 83,81,0, 13,'SF','USA',201,104,2011,30); // Miami Heat
let pl244 = new Player(244,'Bam Adebayo','C',27, 76,60,35,75, 76,75,64,74,59,41, 48,86,78,83,53,55, 80,90,30,  7,'PF','USA',206,115,2017,14); // Miami Heat
let pl245 = new Player(245,'Tyler Herro','SG',24, 58,70,73,87, 62,49,69,68,73,48, 10,52,82,46,5,40, 81,80,60,  5,'PG','USA',196,88,2019,13); // Miami Heat
let pl246 = new Player(246,'Terry Rozier', "PG",30, 61,80,65,86, 74,52,72,72,78,60, 16,37,79,52,20,53, 83,82,0, 9,'SG','USA',185,86,2015,16); // Miami Heat
let pl247 = new Player(247,'Jaime Jaquez Jr.','SF',23, 61,74,52,81, 72,58,57,65,63,33, 28,35,65,61,15,59, 78,80,70, 1,'SG','USA',198,102,2023,18); // Miami Heat
let pl248 = new Player(248,'Duncan Robinson','SF',30, 51,71,76,88, 62,25,49,55,62,36, 6,30,65,40,15,45, 76,83,0, 6,'SG','USA',201,97,0,0); // Miami Heat
let pl249 = new Player(249,'Kevin Love','PF',36, 68,63,60,82, 60,72,56,44,42,40, 46,90,68,51,20,35, 79,77,0, 16,'C','USA',203,113,2008,5); // Miami Heat
let pl250 = new Player(250,'Nikola Jovic','PF',21, 56,60,66,77, 62,34,58,58,60,36, 22,67,60,49,30,50, 68,80,90, 2,'C','Serbia',208,94,2022,27); // Miami Heat
let pl251 = new Player(251,'Alec Burks','SG',33, 60,65,68,86, 59,38,68,68,69,32, 14,40,70,52,15,50, 72,85,0, 13,'SF','USA',198,97,2011,12); // Miami Heat
let pl252 = new Player(252,'Josh Richardson','SG',31, 50,72,58,90, 62,47,70,71,68,34, 18,34,59,63,25,56, 78,83,0, 9,'PG','USA',196,90,2015,40); // Miami Heat
let pl253 = new Player(253,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl254 = new Player(254,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl255 = new Player(255,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl256 = new Player(256,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl257 = new Player(257,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl258 = new Player(258,'Giannis Antetokounmpo','PF',30, 83,62,48,67, 75,84,79,76,77,67, 54,90,97,82,55,60, 82,91,0, 11,'SF','Greece',211,109,2013,15); // Milwaukee
let pl259 = new Player(259,'Damian Lillard','PG',34, 58,78,70,92, 79,53,77,77,85,70, 10,40,94,51,15,50, 86,98,0,  12,'SG','USA',188,88,2012,6); // Milwaukee
let pl260 = new Player(260,'Khris Middleton','SF',33, 67,87,69,83, 56,63,61,74,67,71, 20,53,80,65,20,54, 81,90,0,  12,'SG','USA',201,100,2012,39); // Milwaukee
let pl261 = new Player(261,'Brook Lopez','C',36, 70,84,63,81, 50,79,25,50,25,19, 48,50,64,70,88,35, 80,79,0, 16,'PF','USA',216,127,2008,10); // Milwaukee
let pl262 = new Player(262,'Gary Trent Jr.','SG',25, 58,66,72,77, 80,48,75,75,69,21, 10,29,70,47,10,59, 78,82,50, 6,'SF','USA',196,94,2018,37); // Milwaukee
let pl263 = new Player(263,'Anzejs Pasecniks','C',29, 60,57,40,58, 37,58,35,42,22,15, 70,53,59,50,66,36, 65,80,10, 2,'PF','Latvia',216,103,2017,25); // Milwaukee
let pl264 = new Player(264,'Bobby Portis','PF',29, 73,75,68,79, 54,70,55,54,42,20, 60,83,80,55,30,50, 72,84,10, 9,'C','USA',208,113,2015,22); // Milwaukee
let pl265 = new Player(265,'Taurean Prince','SF',30, 58,59,67,81, 74,50,70,68,60,25, 10,36,65,58,30,54, 74,81,0, 8,'PF','USA',198,98,2016,12); // Milwaukee
let pl266 = new Player(266,'Delon Wright','PG',32, 46,58,55,80, 59,48,63,74,76,58, 28,40,51,70,30,91, 70,84,0, 9,'SG','USA',196,83,2015,20); // Milwaukee
let pl267 = new Player(267,'Pat Connaughton','SG',31, 52,59,55,75, 80,35,67,68,68,35, 26,51,53,55,25,45, 69,83,0, 9,'SF','USA',196,94,2015,41); // Milwaukee
let pl268 = new Player(268,'MarJon Beauchamp','SF',24, 50,71,60,70, 72,42,66,66,60,18, 34,46,63,50,20,45, 63,80,60, 2,'SG','USA',198,90,2022,24); // Milwaukee
let pl269 = new Player(269,'Andre Jackson Jr.','SG',23, 51,58,60,72, 74,40,77,77,59,31, 54,44,47,58,20,50, 60,80,70, 1,'SF','USA',198,95,2023,36); // Milwaukee
let pl270 = new Player(270,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl271 = new Player(271,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl272 = new Player(272,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl273 = new Player(273,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl274 = new Player(274,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl275 = new Player(275,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl276 = new Player(276,'Anthony Edwards','SG',23, 73,77,65,83, 87,52,81,80,76,53, 16,49,90,67,30,60, 84,83,70, 4,'SF','USA',193,102,2020,1); // Minnesota
let pl277 = new Player(277,'Rudy Gobert','C',32, 66,44,0,63, 47,77,38,55,25,14, 80,97,64,73,84,40, 80,81,0, 11,'PF','USA',216,117,2013,27); // Minnesota
let pl278 = new Player(278,'Julius Randle','PF',30, 77,75,49,74, 59,77,63,66,70,51, 44,83,88,56,20,35, 82,84,0, 10,'C','USA',203,113,2014,7); // Minnesota
let pl279 = new Player(279,'Mike Conley','PG',37, 41,57,80,91, 72,30,73,74,79,74, 12,30,60,60,15,64, 81,82,0, 17,'SG','USA',183,79,2007,4); // Minnesota
let pl280 = new Player(280,'Naz Reid','C',25, 77,66,71,71, 65,77,40,44,48,21, 42,65,75,63,71,54, 69,80,50, 5,'PF','USA',206,119,0,0); // Minnesota
let pl281 = new Player(281,'Donte DiVincenzo','SG',27, 48,71,75,77, 75,50,77,77,69,39, 28,48,73,69,20,73, 75,81,30, 6,'SF','USA',193,92,2018,17); // Minnesota
let pl282 = new Player(282,'Jaden McDaniels','SF',24, 57,62,61,72, 70,50,69,83,68,18, 26,36,55,78,53,51, 77,90,60, 4,'PF','USA',206,83,2020,28); // Minnesota
let pl283 = new Player(283,'Nickeil Alexander-Walker','SG',26, 60,64,69,73, 60,50,62,74,71,40, 14,35,60,68,40,59, 69,80,40, 5,'SF','Canada',196,92,2019,17); // Minnesota
let pl284 = new Player(284,'Luka Garza','C',26, 61,60,52,72, 38,59,30,30,25,20, 93,40,70,37,54,54, 58,80,40, 3,'PF','USA',208,106,2021,52); // Minnesota
let pl285 = new Player(285,'Joe Ingles','SF',37, 49,65,81,77, 50,54,56,70,60,53, 12,41,51,60,10,59, 74,80,0, 10,'PF','Australia',206,99,0,0); // Minnesota
let pl286 = new Player(286,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl287 = new Player(287,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl288 = new Player(288,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl289 = new Player(289,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl290 = new Player(290,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl291 = new Player(291,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl292 = new Player(292,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
let pl293 = new Player(293,'Player name','C',30, 50,50,50,50, 50,50,50,50,50,50, 50,50,50,50,50,50, 50,50,50, 0,'PF','USA',200,100,0,0);
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl294 = new Player(294,'Zion Williamson','PF',24, 85,69,34,70, 89,82,75,75,68,57, 50,48,90,52,40,63, 81,60,60, 4,'C','USA',198,128,2019,1); // New Orleans
let pl295 = new Player(295,'Dejounte Murray','PG',28, 60,86,60,79, 50,30,73,75,78,65, 22,60,82,68,15,70, 79,80,20, 7,'SG','USA',196,81,2016,29); // New Orleans
let pl296 = new Player(296,'Brandon Ingram','SF',27, 74,83,58,80, 67,32,64,64,75,62, 16,49,82,54,35,45, 83,85,30, 8,'PF','USA',203,85,2016,2); // New Orleans
let pl297 = new Player(297,'CJ McCollum','SG',33, 51,75,81,80, 70,50,72,74,76,51, 14,41,81,51,35,50, 82,80,0, 11,'PG','USA',190,86,2013,10); // New Orleans
let pl298 = new Player(298,'Herbert Jones','SF',26, 62,68,73,82, 62,49,64,83,65,31, 30,31,59,76,50,74, 80,80,40, 3,'SG','USA',203,95,2021,35); // New Orleans
let pl299 = new Player(299,'Daniel Theis','C',32, 64,66,46,71, 65,72,47,57,39,23, 56,61,59,62,74,45, 69,65,0, 7,'PF','Germany',203,111,0,0); // New Orleans
let pl300 = new Player(300,'Trey Murphy III','SF',24, 57,53,75,86, 72,50,74,74,40,26, 22,51,70,56,30,58, 75,80,60, 3,'PF','USA',203,93,2021,17); // New Orleans
let pl301 = new Player(301,'Jose Alvarado','PG',26, 40,63,58,73, 68,32,66,76,63,52, 18,36,59,68,25,84, 68,80,40, 3,'SG','Puerto Rico',183,81,0,0); // New Orleans
let pl302 = new Player(302,'Jordan Hawkins','SG',22, 48,63,66,84, 57,38,60,62,65,22, 18,38,69,47,10,30, 67,80,80, 1,'PG','USA',196,88,2023,14); // New Orleans
let pl303 = new Player(303,'Javonte Green','SF',31, 58,60,54,75, 75,36,62,64,62,15, 42,46,54,69,40,70, 66,82,0, 5,'PF','USA',193,92,0,0); // New Orleans
let pl304 = new Player(304,'Jeremiah Robinson-Earl','PF',24, 63,56,58,77, 59,50,52,52,59,18, 54,58,55,46,25,50, 67,80,60, 3,'C','USA',206,104,2021,32); // New Orleans
let pl305 = new Player(305,'Brandon Boston Jr.','SF',23, 45,64,51,77, 70,40,69,73,66,22, 22,40,65,45,30,54, 62,83,70, 3,'SG','USA',201,83,2021,51); // New Orleans
let pl306 = new Player(306,'Trey Jemison','C',25, 60,40,1,68, 62,66,45,42,30,17, 80,44,51,54,74,40, 72,82,50, 1,'PF','USA',211,117,0,0); // New Orleans
let pl307 = new Player(307,'Karlo Matkovic','PF',23, 61,59,48,68, 57,52,46,41,45,20, 45,59,50,53,64,46, 60,80,70, 0,'C','Bosnia and Herzegovina',211,104,2022,52); // New Orleans
let pl308 = new Player(308,'Yves Missi','C',20, 62,32,1,59, 75,57,68,57,25,17, 45,55,50,54,59,40, 60,80,100, 0,'PF','Cameroon',211,106,2024,21); // New Orleans
let pl309 = new Player(309,'Jamal Cain','PF',25, 58,49,60,77, 65,50,56,58,43,16, 44,43,58,54,20,65, 61,83,50, 2,'SF','USA',201,86,0,0); // New Orleans
let pl310 = new Player(310,'Antonio Reeves','SG',24, 46,69,68,84, 65,29,73,68,60,20, 20,37,60,42,10,35, 60,80,60, 0,'SF','USA',196,92,2024,47); // New Orleans
let pl311 = new Player(311,'Matt Ryan','SF',27, 48,55,81,88, 59,44,45,54,57,17, 10,29,58,40,5,30, 61,79,30, 3,'SG','USA',198,97,0,0); // New Orleans
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl312 = new Player(312,'Jalen Brunson','PG',28, 61,83,81,82, 65,50,74,74,85,60, 12,35,95,55,5,45, 78,81,20, 6,'SG','USA',188,86,2018,33); //New York
let pl313 = new Player(313,'Karl-Anthony Towns','PF',29, 78,75,81,87, 60,77,66,66,55,34, 58,86,90,52,56,40, 83,82,10, 9,'C','Dominican',213,112,2015,1); //New York
let pl314 = new Player(314,'Mikal Bridges','SG',28, 60,66,74,84, 75,58,70,79,72,28, 20,35,80,66,30,59, 82,90,20, 6,'SF','USA',198,94,2018,10); //New York
let pl315 = new Player(315,'OG Anunoby','SF',27, 55,81,74,74, 75,58,71,81,62,20, 26,39,64,79,35,68, 79,81,30, 7,'PF','United Kingdom',201,105,2017,23); //New York
let pl316 = new Player(316,'Josh Hart','SG',29, 57,62,54,75, 59,54,71,76,69,34, 34,73,56,66,20,55, 79,82,10, 7,'SF','USA',193,97,217,30); //New York
let pl317 = new Player(317,'Mitchell Robinson','C',26, 65,58,0,51, 73,74,38,55,30,9, 97,62,51,69,84,60, 74,80,40, 6,'PF','USA',213,108,2018,36); //New York
let pl318 = new Player(318,'Precious Achiuwa','PF',25, 61,50,37,60, 69,68,65,64,39,18, 70,68,60,63,56,45, 69,76,50, 4,'C','Nigeria',203,102,2020,20); //New York
let pl319 = new Player(319,'Miles McBride','PG',24, 49,79,70,75, 70,34,76,76,78,33, 14,21,60,58,10,65, 64,80,60, 3,'SG','USA',188,90,2021,36); //New York
let pl320 = new Player(320,'Cameron Payne','PG',30, 42,80,68,83, 62,29,65,65,76,66, 12,36,65,41,20,60, 67,84,0, 9,'SG','USA',190,83,2015,14); //New York
let pl321 = new Player(321,'Jericho Sims','C',26, 62,59,0,58, 73,55,70,70,25,13, 80,63,45,48,60,30, 64,80,40, 3,'PF','USA',208,111,2021,58); //New York
let pl322 = new Player(322,'Tyler Kolek','PG',23, 47,69,59,83, 64,44,64,74,76,56, 25,35,50,48,15,56, 60,80,70, 0,'SG','USA',185,88,2024,34); //New York
let pl323 = new Player(323,'Pacome Dadiet','SG',19, 51,66,60,75, 55,40,68,66,65,24, 22,39,50,50,30,40, 60,80,100, 0,'SF','France',201,95,2024,25); //New York
let pl324 = new Player(324,'Kevin McCullar','SF',23, 58,65,59,79, 65,45,65,72,56,23, 24,45,50,57,43,46, 60,80,70, 0,'SG','USA',196,95,2024,56); //New York
let pl325 = new Player(325,'Ariel Hukporti','C',22, 56,47,32,61, 58,58,37,37,35,15, 62,68,50,46,80,28, 60,82,80, 0,'PF','Germany',213,111,2024,58); //New York
let pl326 = new Player(326,'Jacob Toppin','SF',24, 55,59,49,67, 72,52,58,58,58,24, 37,52,50,53,41,38, 54,80,60, 1,'PF','USA',206,92,0,0); //New York
// ins/2p/3p/ft/ jum/str/spe/qui/dri/pas/ ore/dre/oaw/daw/blk/stl/ end/inj/pot - experience - secondPosition,country,height,weight, draft year,draft pick
let pl327 = new Player(327,'Shai Gilgeous-Alexander','PG',26, 72,85,72,87, 75,50,76,76,84,66, 18,49,98,79,45,85, 82,80,40, 6,'SG','Canada',198,81,2018,11);// Oklahoma
let pl328 = new Player(328,'Chet Holmgren','C',22, 73,76,71,78, 65,35,65,65,55,30, 40,79,82,73,89,40, 79,80,80, 1,'PF','USA',216,94,2022,2);// Oklahoma
let pl329 = new Player(329,'Jalen Williams','SG',23, 61,86,78,80, 76,40,77,77,76,52, 20,41,82,62,35,65, 80,80,70, 2,'SF','USA',196,88,2022,12);// Oklahoma
let pl330 = new Player(330,'Alex Caruso','SG',30, 47,75,70,76, 62,31,72,84,68,45, 22,37,51,80,56,82, 72,81,0, 7,'PG','USA',196,84,0,0);// Oklahoma
let pl331 = new Player(331,'Isaiah Hartenstein','C',26, 62,60,31,68, 60,74,52,52,46,33, 90,72,55,55,74,62, 68,77,40, 6,'PF','USA',213,113,2017,43);// Oklahoma
let pl332 = new Player(332,'Luguentz Dort','SG',25, 56,61,69,82, 77,60,69,82,62,20, 26,34,65,77,40,56, 79,80,50, 5,'SF','Canada',190,97,0,0);// Oklahoma
let pl333 = new Player(333,'Aaron Wiggins','SF',25, 58,58,75,78, 62,35,74,74,60,25, 36,37,67,51,30,66, 68,80,50, 3,'SG','USA',198,90,2021,55);// Oklahoma
let pl334 = new Player(334,'Isaiah Joe','SG',25, 52,84,79,83, 69,37,62,67,64,25, 16,37,67,49,15,53, 65,87,50, 4,'PG','USA',193,74,2020,49);// Oklahoma
let pl335 = new Player(335,'Cason Wallace','SG',21, 49,71,75,78, 62,45,65,77,68,25, 22,30,55,64,40,71, 71,80,90, 1,'PG','USA',193,87,2023,10);// Oklahoma
let pl336 = new Player(336,'Jaylin Williams','C',22, 63,66,70,74, 52,50,40,47,49,44, 32,79,54,57,53,53, 65,80,80, 2,'PF','USA',206,108,2022,34);// Oklahoma
let pl337 = new Player(337,'Ousmane Dieng','PF',21, 53,63,50,73, 69,39,68,68,60,31, 22,52,56,40,25,50, 63,80,90, 2,'SF','France',208,97,2022,11);// Oklahoma
let pl338 = new Player(338,'Kenrich Williams','PF',30, 54,55,66,51, 62,53,56,65,59,32, 46,51,53,61,25,60, 70,80,0, 6,'SF','USA',198,95,0,0);// Oklahoma
let pl339 = new Player(339,'Nikola Topic','PG',19, 53,59,57,87, 59,49,69,66,76,56, 22,37,55,46,27,44, 60,80,100, 0,'SG','Serbia',198,90,2024,12);// Oklahoma
let pl340 = new Player(340,'Ajay Mitchell','SG',22, 47,63,63,85, 77,55,73,70,69,42, 18,34,50,47,25,52, 60,80,80, 0,'PG','Belgium',190,86,2024,38);// Oklahoma
let pl341 = new Player(341,'Dillon Jones','SF',23, 53,60,57,80, 61,60,65,72,60,38, 42,54,50,54,27,60, 60,80,70, 0,'PF','USA',196,106,2024,26);// Oklahoma
let pl342 = new Player(342,'Malevy Leons','SF',25, 56,58,59,79, 50,45,42,65,37,22, 48,60,50,63,63,67, 60,80,50, 0,'PF','Netherlands',206,95,0,0);// Oklahoma
let pl343 = new Player(343,'Alex Ducas','SG',24, 46,62,63,77, 60,55,47,57,59,21, 22,44,50,44,20,44, 60,80,60, 0,'SF','Australia',201,99,0,0);// Oklahoma
let pl344 = new Player(344,'Adam Flagler','SG',25, 45,67,64,81, 60,37,62,60,59,30, 17,37,50,40,20,45, 60,80,50, 1,'PG','USA',190,83,0,0);// Oklahoma


// let  = new Player( "John Collins", "PF",27,  80, 69, 81, 75, 85, 75, 71, 65, 60, 37, 67, 85, 70, 57, 68, 37, 92, 84, 82,  7,'C','USA'); - Utah Jazz
// let  = new Player( "Justin Holiday", "SG", 33, 56, 50, 66, 82, 57, 46, 74, 68, 54, 32, 12, 38, 54, 52, 30, 58, 68, 82, 0 ); - free agent
// let  = new Player( "AJ Griffin", "SF", 19, 46, 68, 70, 79, 58, 49, 69, 66, 50, 26, 15, 40, 56, 46, 35, 40, 68, 90, 90 );  - free agent
// let  = new Player( "Aaron Holiday", "PG", 26, 51, 57, 65, 84, 60, 45, 80, 75, 65, 57, 10, 30, 58, 48, 20, 59, 60, 78, 55 ); - Houston Rockets
// let  = new Player( "Chris Silva", "PF", 26, 64, 52, 25, 70, 65, 58, 68, 63, 50, 34, 90, 74, 53, 45, 68, 35, 57, 75, 60 ); G league in 2024
// let  = new Player( "Tyson Etienne", "PG", 23, 41, 44, 60, 77, 59, 46, 82, 80, 55, 35, 12, 30, 57, 47, 5, 50, 60, 90, 60 ); G league in 2024
// let  = new Player( "Trent Forrest", "PG", 24, 50, 70, 18, 85, 54, 50, 78, 79, 64, 51, 22, 37, 45, 44, 15, 59, 61, 79, 65 ); - free agent
// let  = new Player( "Malcolm Brogdon", "PG", 30, 55, 78, 65, 88, 53, 49, 77, 76, 73, 67, 20, 40, 70, 46, 15, 50, 75, 75, 10 ); // Washington
// let  = new Player( "Robert Williams", "C", 25, 66, 60, 10, 66, 65, 60, 68, 69, 44, 36, 90, 75, 58, 75, 90, 60, 69, 80, 60 ); Portland Trailblazers
// let  = new Player( "Danilo Gallinari", "PF", 34, 60, 62, 78, 87, 45, 53, 62, 61, 55, 33, 16, 50, 70, 44, 20, 45, 75, 65, 0 ); Free agent
// let  = new Player("Kevin Durant", "PF",34, 73,82,75,88,55,58,75,72,80,52,14,62,97,55,55,55,87,77,0); // Phoenix Suns
// let  = new Player("T.J. Warren","SF",29, 65,70,63,78,55,55,68,65,60,22,34,45,70,47,30,56,76,40,0); // Free agent
// let  = new Player("Paul George","SG",32, 68,71,68,84,74,60,75,75,77,49,18,60,84,72,25,84,83,75,0); // Philadelphia 76ers
// let  = new Player("DeMar DeRozan", "SF",33, 65,76,50,83,70,55,80,78,75,51,16,39,90,52,15,50,84,85,0); // Sacremento Kings
// let  = new Player(34, "Yuta Watanabe", "SF",28, 60,61,62,66,50,54,59,58,50,28,36,59,51,48,45,53,61,70,20); // Free agent
// let  = new Player(35, "RaiQuan Gray", "PF",23, 65,51,36,73,51,66,57,55,48,24,30,49,48,47,25,50,54,88,60); // Free agent
// let  = new Player(37, "David Duke Jr.", "SG",23, 50,50,40,81,59,46,71,73,60,28,64,39,51,54,35,63,64,80,75); // San ANtonio
// let  = new Player(38, "Markieff Morris", "PF",33, 63,71,60,77,45,60,57,56,57,33,36,58,65,49,35,54,74,70,0, 2,'PF','USA',200,100,0,0); // Dallas Mavericks
// let  = new Player(40, "Patty Mills", "SG",34, 58,72,74,85,40,48,70,66,65,50,10,24,66,41,10,53,69,85,0, 2,'PF','USA',200,100,0,0); //Utah Jazz
// let  = new Player(45, "Kessler Edwards", "SF",22, 49,70,61,84,61,51,69,66,55,21,32,47,48,45,55,55,69,82,85, 2,'PF','USA',200,100,0,0); // Dallas Mavericks
// let  = new Player(46, "Alondes Williams", "SG",23, 51,47,45,69,56,45,69,67,56,36,18,30,47,45,10,40,53,90,60, 2,'PF','USA',200,100,0,0); // Free agent
// let  = new Player(49, "Joe Harris", "SG",31, 61,75,80,78,44,50,69,66,59,33,16,38,65,43,15,35,75,75,0, 2,'PF','USA',200,100,0,0); // Free agent
// let  = new Player(50, "Royce O'Neale", "SF",29, 62,51,66,79,60,53,70,69,59,39,18,58,43,60,25,54,71,89,15, 2,'PF','USA',200,100,0,0); // Phoenix Suns
// let  = new Player(110, "Frank Ntilikina", "SG",24, 53,60,56,77,56,48,77,79,70,57,14,30,48,55,20,63,65,80,70, 2,'PF','USA',200,100,0,0); // Free agent
// let  = new Player(197, "Reggie Jackson","PG",32, 56,67,58,85,66,39,79,79,78,70,14,35,70,51,10,50,73,90,0, 2,'PF','USA',200,100,0,0); // Philadelphia
// let  = new Player(178, "Boban Marjanovic","C",34, 72,65,40,76,30,65,25,25,25,29,91,91,70,43,59,35,58,80,0, 2,'PF','USA',200,100,0,0); // Free agent
// let  = new Player(66, "Bryce McGowens", "SG",20, 56,58,45,83,63,44,67,66,58,25,15,45,60,40,15,40,63,95,100, 2,'PF','USA',200,100,0,0); // Portland Trailblazers
// let  = new Player(53, "Terry Rozier", "SG",28, 57,70,65,82,54,46,81,76,68,54,18,45,75,50,15,60,76,86,30, 2,'PF','USA',200,100,0,0); // Miami Heat
// let  = new Player(55, "Dennis Smith Jr.", "PG",25, 55,50,53,65,68,50,75,72,64,68,18,35,60,43,25,68,63,70,65, 2,'PF','USA',200,100,0,0); // Free agent
// let  = new Player(60, "Kelly Oubre Jr.", "SF",27, 61,65,56,74,64,51,68,65,55,24,26,49,70,50,35,59,75,83,40, 2,'PF','USA',200,100,0,0); // Philadelphia
// let  = new Player(56, "James Bouknight", "SG",22, 53,46,58,87,60,44,72,70,59,41,52,36,63,48,15,40,69,87,85, 0,'PF','USA',200,100,0,0); // Free agent
// let  = new Player(63, "Jalen McDaniels", "PF",24, 66,63,61,73,56,50,70,68,54,31,34,53,60,46,40,53,67,85,65, 2,'PF','USA',200,100,0,0); // Sacremento
// let  = new Player(59, "Kai Jones", "C",21, 58,45,34,67,65,58,64,61,38,20,40,65,51,50,70,51,53,90,90, 2,'PF','USA',200,100,0,0); // Clippers
// let  = new Player(64, "Mason Plumlee", "C",32, 67,49,8,55,55,65,62,60,37,49,66,74,58,50,63,55,72,88,0, 2,'PF','USA',200,100,0,0); // Phoenix Suns
// let  = new Player(65, "JT Thor", "PF",20, 65,45,46,60,63,45,67,64,45,36,30,44,47,47,63,53,57,90,100, 2,'PF','USA',200,100,0,0); // Cleveland

let atl = new Team("Atlanta Hawks", "atl");
let bos = new Team("Boston Celtics", "bos");
let bkn = new Team("Brooklyn Nets", "bkn");
let cho = new Team("Charlotte Hornets", "cho");
let chi = new Team("Chicago Bulls", "chi");
let cle = new Team("Cleveland Cavaliers", "cle");
let dal = new Team("Dallas Mavericks", "dal");
let den = new Team("Denver Nuggets", "den");
let det = new Team("Detroit Pistons", "det");
let gs = new Team("Golden State Warriors", "gs");
let hou = new Team("Houston Rockets", "hou");
let ind = new Team("Indiana Pacers", "ind");
let lac = new Team("Los Angeles Clippers", "lac");
let lal = new Team("Los Angeles Lakers", "lal");
let mem = new Team("Memphis Grizzlies", "mem");
let mia = new Team("Miami Heat", "mia");
let mil = new Team("Milwaukee Bucks", "mil");
let min = new Team("Minnesota Timberwolves", "min");
let nop = new Team("New Orleans Pelicans", "nop");
let nyk = new Team("New York Knicks", "nyk");
let okc = new Team("Oklahoma City Thunder","okc");
//console.log(`Team name = ${atl.teamName}`);

const teamsArray = [];
teamsArray.push(atl,bos,bkn,cho,chi,cle,dal,den,det,gs,hou,ind,lac,lal,mem,mia,mil,min,nop,nyk,okc);
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

// Adding default rosters to each teams
atl.roster.push(pl1, pl2, pl3, pl4, pl5, pl6, pl7, pl8, pl9, pl10, pl11, pl12, pl13, pl14, pl15, pl16, pl17);
bos.roster.push(pl18, pl19, pl20, pl21, pl22, pl23, pl24, pl25, pl26, pl27, pl28, pl29, pl30, pl31, pl32);
bkn.roster.push(pl33, pl34, pl35, pl36, pl37, pl38, pl39, pl40, pl41, pl42, pl43, pl44, pl45, pl46, pl47, pl48, pl49, pl50, pl51);
cho.roster.push(pl52, pl53, pl54, pl55, pl56, pl57, pl58, pl59, pl60, pl61, pl62, pl63, pl64, pl65, pl66, pl67);
chi.roster.push(pl68, pl69, pl70, pl71, pl72, pl73, pl74, pl75, pl76, pl77, pl78, pl79, pl80, pl81, pl82, pl83, pl84);
cle.roster.push(pl85, pl86, pl87, pl88, pl89, pl90, pl91, pl92, pl93, pl94, pl95, pl96, pl97, pl98, pl99, pl100);
dal.roster.push(pl101, pl102, pl103, pl104, pl105, pl106, pl107, pl108, pl109, pl110, pl111, pl112, pl113, pl114, pl115, pl116, pl117);
den.roster.push(pl118, pl119, pl120, pl121, pl122, pl123, pl124, pl125, pl126, pl127, pl128, pl129, pl130, pl131, pl132, pl133, pl134);
det.roster.push(pl135, pl136, pl137, pl138, pl139, pl140, pl141, pl142, pl143, pl144, pl145, pl146, pl147, pl148, pl149, pl150);
gs.roster.push(pl151, pl152, pl153, pl154, pl155, pl156, pl157, pl158, pl159, pl160, pl161, pl162, pl163, pl164, pl165, pl166);
hou.roster.push(pl167, pl168, pl169, pl170, pl171, pl172, pl173, pl174, pl175, pl176, pl177, pl178);
ind.roster.push(pl179, pl180, pl181, pl182, pl183, pl184, pl185, pl186, pl187, pl188, pl189, pl190, pl191, pl192, pl193, pl194, pl195);
lac.roster.push(pl196, pl197, pl198, pl199, pl200, pl201, pl202, pl203, pl204, pl205, pl206, pl207, pl208, pl209, pl210, pl211);
lal.roster.push(pl212,pl213,pl214,pl215,pl216,pl217,pl218,pl219,pl220,pl221,pl222,pl223,pl224,pl225,pl226,pl227);
mem.roster.push(pl228,pl229,pl230,pl231,pl232,pl233,pl234,pl235,pl236,pl237,pl238,pl239,pl240,pl241,pl242);
mia.roster.push(pl243,pl244,pl245,pl246,pl247,pl248,pl249,pl250,pl251,pl252,pl253,pl254,pl255,pl256,pl257);
mil.roster.push(pl258,pl259,pl260,pl261,pl262,pl263,pl264,pl265,pl266,pl267,pl268,pl269,pl270,pl271,pl272,pl273);
min.roster.push(pl276,pl277,pl278,pl279,pl280,pl281,pl282,pl283,pl284,pl285,pl286,pl287,pl288,pl289,pl290,pl291,pl292,pl293);
nop.roster.push(pl294,pl295,pl296,pl297,pl298,pl299,pl300,pl301,pl302,pl303,pl304,pl305,pl306,pl307,pl308,pl309,pl310,pl311);
nyk.roster.push(pl312,pl313,pl314,pl315,pl316,pl317,pl318,pl319,pl320,pl321,pl322,pl323,pl324,pl325,pl326);
okc.roster.push(pl327,pl328,pl329,pl330,pl331,pl332,pl333,pl334,pl335,pl336,pl337,pl338,pl339,pl340,pl341,pl342,pl343,pl344);

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

let gm1 = new Game(12, 5);
let gm2 = new Game(12, 5);

// -------- FUNCTION TO SIMULATE A GAME
let gameSimulation = function (homeTeamSelect, awayTeamSelect, gameType) { // 1 - excebition game; 2 - season game
	 console.log('GAME SIMULATED');

	//  runs SIM GAME function and saves all stats in four arrays
	  let [homeTeamStats, awayTeamStats, homePlayerStats, awayPlayerStats] = gm1.playGame(teamsArray[homeTeamSelect], teamsArray[awayTeamSelect]);
	  
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
		for(let i = 1; i <= 17; i++){
			teamsArray[homeTeamSelect].statsTotal[i] += homeTeamStats[i-1];
			teamsArray[awayTeamSelect].statsTotal[i] += awayTeamStats[i-1];
		}

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

// Calculates player averages and puts in league leader tables 
let sortLeaguePlayerStats = function (){
	ppgLeaderList = [];
	let playerCounter = 0;
	for (let y = 0; y < teamsArray.length; y++){
		for(let x = 0; x < teamsArray[y].roster.length; x++){
			ppgLeaderList.push(teamsArray[y].roster[x]);
			if(ppgLeaderList[playerCounter].statsTotal[0] != 0){
				// pts/reb/ast/stl/blk/fg/pt3/ft
				//gm,pts,oreb,dreb,ast,stl,blk,to,fouls,insM,insA,2ptM,2ptA,3ptM,3ptA,ftM,ftA
				ppgLeaderList[playerCounter].perGameStats[0] = parseFloat((ppgLeaderList[playerCounter].statsTotal[1] / ppgLeaderList[playerCounter].statsTotal[0]).toFixed(2));
				ppgLeaderList[playerCounter].perGameStats[1] = parseFloat(((ppgLeaderList[playerCounter].statsTotal[2]+ppgLeaderList[playerCounter].statsTotal[3]) / ppgLeaderList[playerCounter].statsTotal[0]).toFixed(2));
				ppgLeaderList[playerCounter].perGameStats[2] = parseFloat((ppgLeaderList[playerCounter].statsTotal[4] / ppgLeaderList[playerCounter].statsTotal[0]).toFixed(2));
				ppgLeaderList[playerCounter].perGameStats[3] = parseFloat((ppgLeaderList[playerCounter].statsTotal[5] / ppgLeaderList[playerCounter].statsTotal[0]).toFixed(2));
				ppgLeaderList[playerCounter].perGameStats[4] = parseFloat((ppgLeaderList[playerCounter].statsTotal[6] / ppgLeaderList[playerCounter].statsTotal[0]).toFixed(2));
				ppgLeaderList[playerCounter].perGameStats[5] = parseFloat((((ppgLeaderList[playerCounter].statsTotal[9]+ppgLeaderList[playerCounter].statsTotal[11]+ppgLeaderList[playerCounter].statsTotal[13]) / (ppgLeaderList[playerCounter].statsTotal[10]+ppgLeaderList[playerCounter].statsTotal[12]+ppgLeaderList[playerCounter].statsTotal[14]))*100).toFixed(2));
				// set 3 pointer % for each player
				if (ppgLeaderList[playerCounter].statsTotal[13] !== 0){
					ppgLeaderList[playerCounter].perGameStats[6] = parseFloat(((ppgLeaderList[playerCounter].statsTotal[13] / ppgLeaderList[playerCounter].statsTotal[14])*100).toFixed(2));
				} else {
					ppgLeaderList[playerCounter].perGameStats[6] = 0;
				}
				// set Free Throw % for each player
				if (ppgLeaderList[playerCounter].statsTotal[15] !== 0){
					ppgLeaderList[playerCounter].perGameStats[7] = parseFloat(((ppgLeaderList[playerCounter].statsTotal[15] / ppgLeaderList[playerCounter].statsTotal[16])*100).toFixed(2));
				} else {
					ppgLeaderList[playerCounter].perGameStats[7] = 0;
				}
				
				//Player efficiency rating calculation
				ppgLeaderList[playerCounter].perGameStats[8] = Math.round((
				(ppgLeaderList[playerCounter].statsTotal[9] + ppgLeaderList[playerCounter].statsTotal[11] + ppgLeaderList[playerCounter].statsTotal[13])*85.910 
				+ ppgLeaderList[playerCounter].statsTotal[5]*53.897 
				+ ppgLeaderList[playerCounter].statsTotal[13]*51.757 
				+ ppgLeaderList[playerCounter].statsTotal[15]*46.845 
				+ ppgLeaderList[playerCounter].statsTotal[6]*39.190 
				+ ppgLeaderList[playerCounter].statsTotal[2]*39.190 
				+ ppgLeaderList[playerCounter].statsTotal[3]*14.707
				+ ppgLeaderList[playerCounter].statsTotal[4]*34.677  
				- ppgLeaderList[playerCounter].statsTotal[7]*53.897
				- (ppgLeaderList[playerCounter].statsTotal[16] - ppgLeaderList[playerCounter].statsTotal[15])*20.091 
				- ( (ppgLeaderList[playerCounter].statsTotal[10] - ppgLeaderList[playerCounter].statsTotal[9]) + (ppgLeaderList[playerCounter].statsTotal[12] - ppgLeaderList[playerCounter].statsTotal[11]) + (ppgLeaderList[playerCounter].statsTotal[14] - ppgLeaderList[playerCounter].statsTotal[13]) )*39.190
				//) * (1 / (teamsArray[y].minutes[x]*ppgLeaderList[playerCounter].statsTotal[0]));
				) / 20 / ppgLeaderList[playerCounter].statsTotal[0]);
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
	allTeamTable = [];
	
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
		document.getElementById(`lead${j+1}-0`).textContent = allTeamTable[j].winLose[0];
		document.getElementById(`lead${j+1}-1`).textContent = allTeamTable[j].winLose[1];
		document.getElementById(`lead${j+1}-2`).textContent = allTeamTable[j].winLose[2]+"%";
	}
}

// Button to update leader stats
const showLeaders = document.querySelector('.btn-showLeaders');
showLeaders.addEventListener('click', function(){
	sortLeaguePlayerStats();
});

		//Function to simulate multiple games for each team
const simSeason = document.querySelector('.btn-simSeason');
simSeason.addEventListener('click', function() {
	
	// clears statsTotal, perGameSTats and PER for each player 
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
			teamsArray[i].lineup[j].statsTotalByYear.push([0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0]);
		}
	}
	
	// ------- Each team plays 2 games - auto simulation at startup
	let gamesCount = 0;
	//do {
		for (let i=0; i<teamsArray.length; i++){
			for (let j=0; j<teamsArray.length; j++){
				if (i !== j){
					gameSimulation (i, j, 2); // 2 - means that stats will be counted for teams and players in total etc.
				}
			}
		}
	//	gamesCount++;
	//} while(gamesCount < 4);
	
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
	document.getElementById('rookieWinner').textContent = rookieOfTheYear.name;
	for (let i=1; i<= rookieOfTheYear.perGameStats.length-1; i++) {
		document.getElementById(`rookPlStat-${i}`).textContent = rookieOfTheYear.perGameStats[i-1];
	}
	
	//Calculating and putting in HTML SIX MAN of the year
	let sixManOfTheYear = teamsArray[0].roster[14];
	
	for (let i = 0; i<teamsArray.length; i++){
		for (let j = 0; j<teamsArray[i].roster.length; j++){
			//console.log(`teamsArray[i].roster[j].totalStats[25] = ${teamsArray[i].roster[j].statsTotal[25]}`);
			if (teamsArray[i].roster[j].statsTotal[25] < teamsArray[i].roster[j].statsTotal[0] / 2){
				if (teamsArray[i].roster[j].PER > sixManOfTheYear.PER) {
					// If the condition is true then swap them
					sixManOfTheYear = teamsArray[i].roster[j];
				}
			}
		}
	}
	document.getElementById('sixManWinner').textContent = sixManOfTheYear.name;
	for (let i=1; i<= sixManOfTheYear.perGameStats.length-1; i++) {
		document.getElementById(`sixManPlStat-${i}`).textContent = sixManOfTheYear.perGameStats[i-1];
	}	
	
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
						console.log(allNbaForwarders);
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
						console.log(allNbaGuards);
						
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
					console.log(allDefenders);
					
				}
			}
			// arrange top 10 rookies
			if (teamsArray[i].roster[j].experience == 0){
				if (allRookies.length !== 10) {
					allRookies.push(teamsArray[i].roster[j]);
					allRookies.sort(function (a, b) {return b.PER - a.PER});
					console.log(...allRookies);
				} else {
					if (allRookies[9].PER < teamsArray[i].roster[j].PER) {
						allRookies[9] = teamsArray[i].roster[j];
						allRookies.sort(function (a, b) {return b.PER - a.PER});
						console.log(`Rookie list:  ${allRookies}`);
						
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
			countForwarders++;
		}
		for (let j = 4; j <= 5; j++){
			document.getElementById(`${i}-NbaTeamName-${j}`).textContent = allNbaGuards[countGuards].name;
			for (let x = 0; x < 8; x++) {
				document.getElementById(`${i}-NbaTeamStat-${j}-${x+1}`).textContent = allNbaGuards[countGuards].perGameStats[x];
			}
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
			countDefenders++;
		}
	}
	
	let countRookies = 0;
	for (let i = 1; i <= 2; i++){
		for (let j = 1; j <= 5; j++){
			document.getElementById(`${i}-RookTeamName-${j}`).textContent = allRookies[countRookies].name;
			for (let x = 0; x < 8; x++) {
				console.log(`RookTeamName[countRookies].perGameStats[x] === ${allRookies[countRookies].perGameStats[x]}`);
				document.getElementById(`${i}-RookTeamStat-${j}-${x+1}`).textContent = allRookies[countRookies].perGameStats[x];
			}
			countRookies++;
		}
	}
	
	playerDevelopmentEndYear();
	currentYear++;
		
});

let roster = document.querySelector(".rosterModal");
let playerInfo = document.querySelector(".playerInfoModal");
let awards = document.querySelector(".modal");
let records = document.querySelector(".recordModal");
let careerTotalStats = document.querySelector(".careerStatModal");
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 

let currentTeamRoster = 0;
const showRoster = function (){
	roster.style.display = "block";
	for(let i = 1; i <= teamsArray[currentTeamRoster].lineup.length; i++){
		document.getElementsByClassName('rosterTitle').textContent = teamsArray[currentTeamRoster].teamName;
		document.getElementById(`roster-name-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].name;
		document.getElementById(`roster-overal-${i}`).textContent = Math.round(teamsArray[currentTeamRoster].lineup[i-1].overal);
		document.getElementById(`roster-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].position;
		document.getElementById(`roster-sec-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].secPosition;
		document.getElementById(`roster-age-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].age;
		document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country;
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
	for(let i = 1; i <= teamsArray[currentTeamRoster].lineup.length; i++){
		document.getElementById('rosterTitle').textContent = teamsArray[currentTeamRoster].teamName;
		document.getElementById('logo-roster').src = `images/team-roster-icon-${currentTeamRoster+1}.png`;
		document.getElementById(`roster-name-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].name;
		document.getElementById(`roster-overal-${i}`).textContent = Math.round(teamsArray[currentTeamRoster].lineup[i-1].overal);
		document.getElementById(`roster-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].position;
		document.getElementById(`roster-sec-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].secPosition;
		document.getElementById(`roster-age-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].age;
		document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country;
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
	for(let i = 1; i <= teamsArray[currentTeamRoster].lineup.length; i++){
		document.getElementById('rosterTitle').textContent = teamsArray[currentTeamRoster].teamName;
		document.getElementById('logo-roster').src = `images/team-roster-icon-${currentTeamRoster+1}.png`;
		document.getElementById(`roster-name-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].name;
		document.getElementById(`roster-overal-${i}`).textContent = Math.round(teamsArray[currentTeamRoster].lineup[i-1].overal);
		document.getElementById(`roster-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].position;
		document.getElementById(`roster-sec-position-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].secPosition;
		document.getElementById(`roster-age-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].age;
		document.getElementById(`roster-country-${i}`).textContent = teamsArray[currentTeamRoster].lineup[i-1].country;
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
	document.getElementById('plInfo-pot').textContent = teamsArray[currentTeamRoster].lineup[selectedPlayer].pot;
	
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

	for (let i = 0; i < teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason.length; i++) {
			let rowPlayerDevelopment = tablePlayerDevelopment.insertRow();
			let arrayDeveleopment = [];
			for (let j = 1; j <= 21; j++) {
				arrayDeveleopment.push(rowPlayerDevelopment.insertCell());
				if (j == 2){
					arrayDeveleopment[j-1].innerHTML  = Math.round(teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1]);
				} else {
				arrayDeveleopment[j-1].innerHTML = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1]; 
				}
				
				if (i > 0 && teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1] > teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i-1][j-1]) { 
					let iproveColor = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1] % teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i-1][j-1];
					if (j >= 2) arrayDeveleopment[j-1].style.backgroundColor = "LightGreen" ;
				} else if (i > 0 && teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1] < teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i-1][j-1]) { 
					let declineColor = teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i][j-1] % teamsArray[currentTeamRoster].lineup[selectedPlayer].playerDevelopmentBySeason[i-1][j-1];
					if (j >= 2) arrayDeveleopment[j-1].style.backgroundColor = "LightCoral" ;
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

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == awards || event.target == records || event.target == careerTotalStats || event.target == roster || event.target == playerInfo) {
	if (playerInfo.style.display != "block") roster.style.display = "none";
	playerInfo.style.display = "none";
    awards.style.display = "none";
	records.style.display = "none";
	careerTotalStats.style.display = "none";
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

const enterPlayerRecords = function (record){ // inserts nba1GameRecordsTotal values in html modal
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
	} else {
		let tempPlayer = teamsArray[currentTeamRoster].lineup[selectedRowsForSwap];
		teamsArray[currentTeamRoster].lineup[selectedRowsForSwap] = teamsArray[currentTeamRoster].lineup[selectedRow];
		teamsArray[currentTeamRoster].lineup[selectedRow] = tempPlayer;
		selectedRowsForSwap = null;
		console.log(`Player swap initiated`);
		showRoster();
	}
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
			console.log(`${teamsArray[i].lineup[j].name} development points = ${playerUpgradePoints}`);
			
			if (playerUpgradePoints > 0) {
				for (let x = 0; x < playerUpgradePoints; x++) {
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
			teamsArray[i].lineup[j].age++;
			teamsArray[i].lineup[j].calcPlayerOveral();
			teamsArray[i].lineup[j].playerDevelopmentBySeason.push([currentYear+1, teamsArray[i].lineup[j].overal,teamsArray[i].lineup[j].ins,teamsArray[i].lineup[j].pt2,teamsArray[i].lineup[j].pt3,teamsArray[i].lineup[j].ft,teamsArray[i].lineup[j].jum,teamsArray[i].lineup[j].str,teamsArray[i].lineup[j].spe,teamsArray[i].lineup[j].qui,teamsArray[i].lineup[j].dri,teamsArray[i].lineup[j].pas,teamsArray[i].lineup[j].ore,teamsArray[i].lineup[j].dre,teamsArray[i].lineup[j].oaw,teamsArray[i].lineup[j].daw,teamsArray[i].lineup[j].blk,teamsArray[i].lineup[j].stl,teamsArray[i].lineup[j].end,teamsArray[i].lineup[j].inj,teamsArray[i].lineup[j].pot]);

		}
		teamsArray[i].setLineup();
	}
};