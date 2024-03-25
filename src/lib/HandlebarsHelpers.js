import Handlebars from "handlebars";

import handlebarsHelpers from "handlebars-helpers";
const handyHelpers = handlebarsHelpers();

const myHelpers = {
  noop: function (options) {
    return options.fn(this);
  },
  ifEquals: function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  },
};

export default { ...handyHelpers, ...myHelpers };
