function Chappie() {
	
	// State determine what Chappie should do when she is asked something.
	// Can be : listen, learn, confirm
	var state = 'listen';
	var memory = new Memory();
	var that = this; // Easy scope in callbacks
	
	// Key to retrieve or save an answer in Memory
	this.key = null;
	
	this.ask = function(sentence)
	{
		// Special action if text field begins with "command "
		// The second word is the name is a js function
		// All the following words are function parameters
		
		this.answer('You : "' + sentence + "'", 'you');
		
		if(sentence.split(' ')[0] == 'command'){
			sentence = sentence.split(' ');
			var func = sentence[1];
			var param = '';
			for(var i = 2; i < sentence.length; i++)
			{
				param += sentence[i] ;
				if (i < sentence.length - 1) {
					param += ", " ;
				}
			}
			return this.eval('that.' + func + '("' + param + '")');
		}
		
		switch(state){
			case 'learn' :
				this.learn(sentence);
				break;
			case 'confirm' :
				this.confirm(sentence);
				break;
			case 'listen' :
			default :
				this.listen(sentence);
				break;
		}
	}	
	
	// Default function. Respond if the question exists as key in Memory
	this.listen = function(sentence)
	{
		var exists = memory.get('commands');
		var command = false;
		if(!exists)
			exists = [];
		for(var i in exists){
			if(exists[i].key == sentence)
				command = exists[i].value;
		}
		if(!command)
		{
			state = 'learn';
			this.key = sentence;
			this.answer('Dites-moi ce que je dois répondre lorsque vous me demandez : "'+sentence+'"', 'learn');
		}
		else
		{	
			this.answer(command);
		}
	}
	
	// Not used at the moment
	this.confirm = function(sentence)
	{
		this.answer('Est-ce bien ce que vous voulez dire ?', 'confirm');
	}
	
	// Register the answer for the previous question
	this.learn = function(sentence)
	{
		memory.add('commands', {key : this.key, value : sentence});
		state = "listen";
		
		this.answer('Commande enregistrée. Vous pouvez me redemander :"' + this.key + '"', 'confirm');
		key = null;
	}
	
	// This function should be overriden to handle Chappie's response
	this.answer = function(answer)
	{
		//Define behaviour in interface
	}
	
	// A sample of what a command could be. This one returns a google search (One word only)
	this.search = function(param)
	{
		param.split(' ')[0];
		
		this.answer('Vous cherchez : <a href="http://gog.is/'+param.replace(/[^a-zA-Z0-9]+/g, ",")+'" target="_blank">'+param+'</a>', 'search');
	}
	
	this.eval = function(query)
	{
		try {
			eval(query);
		} catch (e) {
			this.answer("Désolé, je ne comprends pas cette commande", 'error');
		}
	}
	
	/*
	this.matchRoboticLaws = function(action)
	{
		if(
			!action.canHurtOrExposeHumanToDanger() ||
			( action.isHumanOrder() && !action.canHurtOrExposeHumanToDanger() ) ||
			( action.protectsRobotsExistence() && !action.isHumanOrder() && !action.canHurtOrExposeRobotToDanger())
		)
			return true;
		return false;
	}*/
}