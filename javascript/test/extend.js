function superClass(){
    this.supervalue=true;
}
superClass.prototype.getSupervalue=function(){
    return this.supervalue;
}

function subClass(){
    this.subClass=false;
}
subClass.prototype=new superClass();

subClass.prototype.getSubClass=function(){
    return this.subClass;
}

var testclass=function(){};

testclass.prototype=superClass.prototype;

var test1=new testclass();

var test=new subClass();



