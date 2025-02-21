#!/usr/bin/env node
"use strict";
const { main } = require("../../bump/src/cli/cli");
main(process.argv.slice(2));

function errorHandler(error) {
  let message = error.message || String(error);
  if (process.env.DEBUG || process.env.NODE_ENV === "development") {
    message = error.stack || message;
  }
  console.error(message);
  process.exit(exit_code_1.ExitCode.FatalError);
}
