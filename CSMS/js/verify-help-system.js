/**
 * Verification script for the CSMS Help System
 * This script checks that the help system is properly implemented across all pages
 */

// List of all pages to check
const pagesToCheck = [
  'dashboard.html',
  'curriculum-builder.html',
  'subject-mapping.html',
  'electivesmanager.html',
  'academic-standards.html',
  'cde-pdap-validator.html',
  'grade-weighting.html',
  'pre-requisite.html'
];

// Function to check a single page
function checkPage(page) {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = page;
    
    iframe.onload = function() {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        
        // Check if help button exists
        const helpButton = doc.querySelector('.help-trigger');
        const hasHelpButton = !!helpButton;
        
        // Check if help-templates.js is included
        const scripts = Array.from(doc.querySelectorAll('script'));
        const hasHelpTemplates = scripts.some(script => 
          script.src && script.src.includes('help-templates.js')
        );
        
        // Remove the iframe
        document.body.removeChild(iframe);
        
        resolve({
          page,
          hasHelpButton,
          hasHelpTemplates
        });
      } catch (e) {
        reject(`Error checking ${page}: ${e.message}`);
      }
    };
    
    iframe.onerror = function() {
      reject(`Failed to load ${page}`);
    };
    
    document.body.appendChild(iframe);
  });
}

// Function to check all pages
async function verifyHelpSystem() {
  const results = document.getElementById('verificationResults');
  results.innerHTML = '<h3>Verifying Help System...</h3>';
  
  const tableRows = [];
  let allPassed = true;
  
  for (const page of pagesToCheck) {
    try {
      results.innerHTML += `<p>Checking ${page}...</p>`;
      const result = await checkPage(page);
      
      const status = result.hasHelpButton && result.hasHelpTemplates ? 
        '<span class="test-pass">✓ PASS</span>' : 
        '<span class="test-fail">✗ FAIL</span>';
      
      if (!(result.hasHelpButton && result.hasHelpTemplates)) {
        allPassed = false;
      }
      
      tableRows.push(`
        <tr>
          <td>${page}</td>
          <td>${result.hasHelpButton ? '✓' : '✗'}</td>
          <td>${result.hasHelpTemplates ? '✓' : '✗'}</td>
          <td>${status}</td>
        </tr>
      `);
    } catch (error) {
      console.error(error);
      tableRows.push(`
        <tr>
          <td>${page}</td>
          <td colspan="3"><span class="test-fail">Error: ${error}</span></td>
        </tr>
      `);
      allPassed = false;
    }
  }
  
  const overallStatus = allPassed ? 
    '<span class="test-pass">All tests passed!</span>' : 
    '<span class="test-fail">Some tests failed!</span>';
  
  results.innerHTML = `
    <h3>Help System Verification Results</h3>
    <p>Overall status: ${overallStatus}</p>
    <table class="table">
      <thead>
        <tr>
          <th>Page</th>
          <th>Help Button</th>
          <th>Help Templates</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows.join('')}
      </tbody>
    </table>
  `;
}