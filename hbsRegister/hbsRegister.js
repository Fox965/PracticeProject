const hbs = require("hbs");
const path = require("path");
hbs.registerPartials(path.join(__dirname, '../views/partials'));
hbs.registerHelper('ifCond', (value1, operator, value2, options) => {
    switch (operator) {
        case '===':
            return (value1 === value2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (value1 !== value2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (value1 < value2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (value1 <= value2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (value1 > value2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (value1 >= value2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
})