/**
 * Debug script for the CSMS Help System
 * This script helps identify issues with the help system implementation
 */

// Function to check if openHelp function exists
function checkOpenHelpFunction() {
  if (typeof openHelp === 'function') {
    console.log('✓ openHelp function exists');
    return true;
  } else {
    console.error('✗ openHelp function does not exist');
    return false;
  }
}

// Function to check if helpTemplates object exists
function checkHelpTemplates() {
  if (typeof helpTemplates === 'object') {
    console.log('✓ helpTemplates object exists');
    return true;
  } else {
    console.error('✗ helpTemplates object does not exist');
    return false;
  }
}

// Function to check if help button exists
function checkHelpButton() {
  const helpButton = document.querySelector('.help-trigger');
  if (helpButton) {
    console.log('✓ Help button exists in the DOM');
    return true;
  } else {
    console.error('✗ Help button does not exist in the DOM');
    return false;
  }
}

// Function to check if help button has onclick handler
function checkHelpButtonHandler() {
  const helpButton = document.querySelector('.help-trigger');
  if (helpButton && helpButton.getAttribute('onclick') === 'openHelp()') {
    console.log('✓ Help button has correct onclick handler');
    return true;
  } else {
    console.error('✗ Help button does not have correct onclick handler');
    return false;
  }
}

// Function to check if search includes help option
function checkSearchHelp() {
  // This is a simplified check - actual implementation would depend on how search is implemented
  const searchSuggestions = document.querySelectorAll('.search-suggestion');
  const hasHelpSuggestion = Array.from(searchSuggestions).some(suggestion => 
    suggestion.dataset.section === 'help'
  );
  
  if (hasHelpSuggestion) {
    console.log('✓ Search includes help option');
    return true;
  } else {
    console.log('? Could not verify if search includes help option (may need manual check)');
    return false;
  }
}

// Main debug function
function debugHelpSystem() {
  console.log('=== CSMS Help System Debug ===');
  
  const results = {
    openHelpFunction: checkOpenHelpFunction(),
    helpTemplates: checkHelpTemplates(),
    helpButton: checkHelpButton(),
    helpButtonHandler: checkHelpButtonHandler(),
    searchHelp: checkSearchHelp()
  };
  
  console.log('=== Debug Summary ===');
  for (const [test, passed] of Object.entries(results)) {
    console.log(`${passed ? '✓' : '✗'} ${test}: ${passed ? 'PASS' : 'FAIL'}`);
  }
  
  const allPassed = Object.values(results).every(result => result);
  console.log(`Overall status: ${allPassed ? 'PASS' : 'FAIL'}`);
  
  return results;
}

// Auto-run debug when script is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Debug script loaded. Run debugHelpSystem() to check help system.');
});