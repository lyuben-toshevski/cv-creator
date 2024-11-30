const fs = require("fs");
const path = require("path");
const spawnSync = require("child_process").spawnSync;

// Get the branch name and list of the '*.spec.ts' staged files that we are going to edit
const BRANCH_NAME = spawnSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
  encoding: "utf8",
}).stdout;

// Get names of all staged '*.spec.ts' files
let STAGED_FILES = spawnSync(
  "git",
  ["diff", "--cached", "--name-only", "--", "*.spec.ts", "*.spec.tsx"],
  {
    encoding: "utf8",
  }
).stdout.split(/\n/g);

// Remove trailing empty string
STAGED_FILES.pop();

const isMerging = spawnSync("git", [
  "rev-parse",
  "-q",
  "--verify",
  "MERGE_HEAD",
]).status;

// Do not perform actions if there is an ongoing merge
if (isMerging === 0) {
  console.log(
    "\x1b[34m%s\x1b[0m",
    "A merge is in process - staged *.spec.ts files will not be updated."
  );
  process.exit();
}

const checkIfCurrentBranchNameExists = (logFileContentRows = []) =>
  !logFileContentRows.find((row) => new RegExp(BRANCH_NAME, "gi").test(row));

// If a staged file status is DELETED, remove it from the array. We cannot/shouldn't perform changes on deleted files
const removeDeletedStagedFiles = (stagedFiles = [""]) => {
  // Get statuses of *.spec.ts files
  const FILES_STATUS = spawnSync(
    "git",
    ["status", "--porcelain", "--", "*.spec.ts", "*.spec.tsx"],
    {
      encoding: "utf8",
    }
  ).stdout.split(/\n/g);

  FILES_STATUS.pop();

  // If a deleted *.spec.ts file is staged, remove it from the array of files that we are going to update
  FILES_STATUS.forEach((file) => {
    file = file.split("  ");

    if (file[0] === "D") {
      stagedFiles = stagedFiles.filter((stagedFile) => stagedFile !== file[1]);
    }
  });

  return stagedFiles;
};

// Return array of the branch names present in the log file
const getBranchNamesFromLogFile = (logFileContentRows = []) =>
  logFileContentRows.map((row) => row.split(", ")).flat();

const formatDisplay = (branchNames = [""]) => {
  branchNames = removeDuplicateBranchNames(trimEmptyBranchNames(branchNames));
  const allowedEntriesPerRow = 3;
  let formattedRows = [];
  let lineCounter = Math.ceil(branchNames.length / allowedEntriesPerRow);
  let branchNameCounter = 0;

  for (let i = 0; i < lineCounter; i++) {
    formattedRows.push(
      branchNames
        .slice(branchNameCounter, branchNameCounter + allowedEntriesPerRow)
        .join(", ")
    );
    branchNameCounter += allowedEntriesPerRow;
  }

  return formattedRows.join("\n");
};

const updateLogFile = (logFileName = "", formattedRows = "") => {
  const finalDir = path.join(__dirname, "../") + logFileName;

  fs.writeFileSync(finalDir, formattedRows, "utf8");

  spawnSync("git", ["add", `${finalDir}`]);
};

// Remove duplicate branch names if for some reason there are any
const removeDuplicateBranchNames = (logFileBranchNames = []) => [
  ...new Set(logFileBranchNames),
];

// Remove empty strings, so the log file won't have any unneaded comma and space
const trimEmptyBranchNames = (logFileBranchNames = []) =>
  logFileBranchNames.filter((name) => name !== "").map((name) => name.trim());

// Check if the *.spec.ts file already has an existing log file
const hasLogFile = (logFileName = "") =>
  fs.existsSync(path.join(__dirname, "../") + logFileName);

STAGED_FILES = removeDeletedStagedFiles(STAGED_FILES);

/*
 * For each staged spec file, we check if there is an existing log file and get the content and previous branch names.
 * The functionality will not be triggered if there is ongoing merge.
 * */
for (let fileName of STAGED_FILES) {
  const logFileName = fileName.replace(/\.ts?/, ".log");
  const branchNamesToBeWritten = [];
  let logFileContentRows = [];

  if (hasLogFile(logFileName)) {
    logFileContentRows = fs
      .readFileSync(path.join(__dirname, "../") + logFileName, "UTF-8")
      .split(/\n/);

    // the formatters typically add an empty line at the end of a file on save
    if (logFileContentRows[logFileContentRows.length - 1] === "") {
      logFileContentRows.pop();
    }
    // Get the branch names that are currently listed in the log file.
    getBranchNamesFromLogFile(logFileContentRows).forEach((name) =>
      branchNamesToBeWritten.push(name)
    );
  }

  const currentBranchAlreadyWritten =
    checkIfCurrentBranchNameExists(logFileContentRows);

  if (!currentBranchAlreadyWritten) {
    branchNamesToBeWritten.push(BRANCH_NAME);
  }

  // Update file
  const formattedRows = formatDisplay(branchNamesToBeWritten);

  updateLogFile(logFileName, formattedRows);
}
