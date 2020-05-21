function Car( model, year, miles ) {
 
  this.model = model;
  this.year = year;
  this.miles = miles;

}
 
// using Car.prototype instead of defining the method inside the constrictor function
// to avoid redefinig toString() function for each new instance of Car
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};
 


var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
 
console.log( civic.toString() );
console.log( mondeo.toString() );