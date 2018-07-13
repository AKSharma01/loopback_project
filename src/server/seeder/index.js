'use strict';

let argV = process.argv;

/* ================================================== All Seeder Options ===========================================
 *
 *
 * ================================================================================================================
 */

if(argV.length>3){
	console.log("!!!! too many options")
	// return;
}

let seederOption = argV;

function seederFuntion(seederOption){
	let option = {
		counter: function(){
			require('./counter.js');
			return ;
		},
		orderstatusmaster: function(){
			require('./orderStatusMaster.js');
			return ;
		},
		default: function() {
			console.log("!!!Please provide valid input!!!");
			return ;
		}
	}
	if (seederOption.length <3){
		console.log("\n==========================================================================")
		console.log(' Seeder option := \n' );
		for(let i = 0; i<Object.keys(option).length-1; i++)
			if(Object.keys(option)[i] !== 'default')
				console.log('\t',String(i+1),')',Object.keys(option)[i]);
		console.log("\n==========================================================================")
		return ;
	}
	try{
		return option[seederOption[2]]();
	}
	catch(e){
		console.log("error: ", e);
		option['default']();
		console.log("\n==========================================================================")
		console.log(' Seeder option := \n' );
		for(let i = 0; i<Object.keys(option).length-1; i++)
			if(Object.keys(option)[i] !== 'default')
				console.log('\t',String(i+1),')',Object.keys(option)[i]);
		console.log("\n==========================================================================")
		return ;
	}
}


seederFuntion(seederOption);
