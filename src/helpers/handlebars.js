const Handlebars = require('handlebars');
module.exports = {
    sum:(a,b)=>a+b,
    sortable: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default';
      console.log(sortType);
      const icons = {
        default: 'oi oi-elevator',
        desc: 'oi oi-sort-descending',
        asc: 'oi oi-sort-ascending'
      }

      const types = {
        default: 'asc',
        desc: 'asc',
        asc: 'desc'
      }

      const icon = icons[sortType];
      const type = types[sortType];

      //Chống nhúng hacker nhúng script vào link
      const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);
      const output = `<a href="${href}"><span class="${icon}"></span></a>`;
      return new Handlebars.SafeString(output);
    }
  }