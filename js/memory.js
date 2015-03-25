function Memory()
{
	//localStorage.clear();
	//console.log(localStorage);

	this.get = function(key)
	{
		if(!localStorage[key])
			return false;
		return JSON.parse(localStorage[key]);
	}
	
	this.add = function(key, value)
	{
		var obj;
		if(localStorage[key])
			obj = this.get(key);
		else
			obj = [];
		obj.push(value);
		this.set(key, obj);
	}
	
	this.set = function(key, object)
	{
		localStorage[key] = JSON.stringify(object);
	}
}