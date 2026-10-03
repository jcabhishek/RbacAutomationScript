const { features } = require("node:process");

const runId = Date.now(); // new number on every run

module.exports = {
  applications: [
    {
      appName: `Indofast Test App ${runId}`,
      appDescription: `Indofast Test Service App ${runId}`
    }
  ],
  pages: [
    {
      pageName: `Indofast dashboard page ${runId}`,
      pageDescription: `Indofast Dashboard Screen ${runId}`
    }
  ],
  features: [
    {
    featurename: `checkpage ${runId}`,
    featureDescription: `checkpage feature ${runId}`,
    }
  ],
  Roles: [
    {
      rolename:`Indofast service automation role ${runId}`,
      roleDescription: `Indofast service automation test role ${runId}`
    }
  ],
  users: [
    {
      userid: `SUNMU00009971`
    }
  ]
};