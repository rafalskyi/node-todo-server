"use strict";
module.exports.process = function (data) {
  switch (process.argv[2]) {
    case '--drop':
      this.drop(Object.keys(data.tables), function (err) {
        if (err) return console.log(err);
        console.log('Data has been dropped...');
        process.exit(0);
      });
      break;
    case '--create':
      this.fixtures(data, function (err) {
        if (err) return console.log(err);
        console.log('Data has been loaded...');
        process.exit(0);
      });
      break;
    default:
      console.log('use --create or --drop');
      process.exit(0);
  }
};
