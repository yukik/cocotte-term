var term = require('cocotte-term');

var input, output;

input = '2014/1';
output = term(input);
console.log(input);
console.log(output[0]);
console.log(output[1]);


input = ['2013年1月', '2013年4月'];
output = term(input);
console.log(input);
console.log(output[0]);
console.log(output[1]);

