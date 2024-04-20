// @ts-ignore 
// игнор стоит на то, что название индетификаторов экспорта и импорта совпадает. Это можно избежать изменив нахвание пр импорте.
const App = require("./app");

function bootstrup() {
	new App;
};

bootstrup();