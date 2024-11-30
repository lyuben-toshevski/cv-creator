const shell = require('shelljs');

const util = require('./hooks-util');

if (util.hasChangedPackageJsonFile) {
  const highVulnerabilitiesRegex = /\d+ (high|critical)/gm;

  const auditReport = shell.exec('npm audit').stdout;

  if (highVulnerabilitiesRegex.test(auditReport)) {
    console.error(
      '\n\nYOU ARE NOT ABLE TO COMMIT AS YOU HAVE PACKAGES THAT ARE VULNERABLE . PLEASE, FIX THE VULNERABILITIES AND TRY AGAIN.\n'
    );
    process.exit(1);
  }
}
