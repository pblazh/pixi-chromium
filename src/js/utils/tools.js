define([], function(){
    'use strict';

    function extend(Child, Parent){
        Child.prototype = Object.create(Parent.prototype);
        Child.prototype.constructor = Child;
        Child.prototype.uber = Parent;
        return Child;
    }

    return {
        extend,
    }

});
