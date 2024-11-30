// NODE DECLARATIONS //

const fs = require("fs");
const commitMessagePath = ".git/COMMIT_EDITMSG";

// we check this because for newly setup machines that don't have any commits yet, this file may not exist in all cases
if (!fs.existsSync(commitMessagePath)) {
  createFile(commitMessagePath);
}

const message = fs.readFileSync(commitMessagePath, "utf-8");
const shell = require("shelljs");
const branchName = shell.exec("git rev-parse --abbrev-ref HEAD");

// REGEX DECLARATIONS //

const branchNameRegex = /(feature|bug|pipeline)\/.+/gim;
const mergeRegex = /^merge/gim;
const masterBranchRegex = /^master/gim;
const tempBranchRegex = /^temp/gim;
const startsWithBranchNameRegex = /^(feature|bug|pipeline)\/.+/gim;

// CUSTOM COMMIT MESSAGE CHECKS //

const validateCommit = !isTempBranch() && !isMergeCommit() && !isBranchMaster();

if (validateCommit) {
  // if no branch name in the commit message - get the branch name and append it
  const newMessage = messageStartsWithBranchName()
    ? message
    : appendBranchName();
  updateGitCommitMessage(newMessage);
}

// FUNCTION DECLARATIONS //

function appendBranchName() {
  // check if the branch name matches the pattern else return empty string
  const prefix = branchNameRegex.test(branchName)
    ? branchName.match(branchNameRegex)[0]
    : "";
  let updatedMessage = prefix ? prefix + " " + message : message;

  return updatedMessage;
}

function isBranchMaster() {
  return masterBranchRegex.test(branchName);
}

function isMergeCommit() {
  return mergeRegex.test(message);
}

function isTempBranch() {
  return tempBranchRegex.test(branchName);
}

function messageStartsWithBranchName() {
  const matches = message.match(startsWithBranchNameRegex);

  return matches && matches.length > 0;
}

function updateGitCommitMessage(updatedMessage) {
  // if there is a JIRA TAG in the message that was taken from the BRANCH NAME or it was validated/changed to uppercase
  if (message !== updatedMessage) {
    console.warn(
      "Your commit message has been updated by Husky. Check bind/web-apps/.husky-hooks/commit-msg-validator.js for more info."
    );
    fs.writeFileSync(commitMessagePath, updatedMessage, { encoding: "utf-8" });
  } else if (!messageStartsWithBranchName()) {
    // if the message still does not start with JIRA TAG
    console.warn(`If your branch is related to a JIRA story, please consider adding the JIRA TAG to the branch name following the pattern: BIND-XXXXX.
Check bind/web-apps/.husky-hooks/commit-msg-validator.js for more info.`);
  } // else everything was valid in the message and no changes were made
  return;
}

function createFile(path) {
  fs.writeFileSync(path, "", { encoding: "utf-8" });
}
