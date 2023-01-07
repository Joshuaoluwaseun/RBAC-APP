// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("staff")
 .readOwn("task")
 .updateOwn("task")

ac.grant("supervisor")
 .extend("staff")
 .readAny("task")

ac.grant("admin")
 .extend("staff")
 .extend("supervisor")
 .updateAny("task")
 .deleteAny("task")

return ac;
})();
