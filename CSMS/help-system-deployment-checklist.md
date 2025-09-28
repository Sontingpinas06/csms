# Help System Deployment Checklist

Use this checklist to ensure the help system is properly deployed across all pages.

## Pre-Deployment Checks

- [ ] All HTML pages have the help button in the top-bar-right section
- [ ] All HTML pages include the help-templates.js script
- [ ] CSS styles for help-trigger are added to dashboard.css
- [ ] Help content is properly defined in help-templates.js for all modules
- [ ] Search functionality includes help option
- [ ] Verification tool is working correctly

## Deployment Steps

1. **Verify HTML Files**:
   - [ ] dashboard.html
   - [ ] curriculum-builder.html
   - [ ] subject-mapping.html
   - [ ] electivesmanager.html
   - [ ] academic-standards.html
   - [ ] cde-pdap-validator.html
   - [ ] grade-weighting.html
   - [ ] pre-requisite.html

2. **Verify JavaScript Files**:
   - [ ] help-templates.js is complete with all module content
   - [ ] script.js has updated openHelp function
   - [ ] script.js has updated search functionality

3. **Verify CSS Files**:
   - [ ] dashboard.css has styles for help-trigger
   - [ ] dashboard.css has styles for help content sections

## Post-Deployment Checks

- [ ] Run verify-help-system.html to confirm all pages pass
- [ ] Manually test help button on each page
- [ ] Verify search integration works correctly
- [ ] Check that help content is context-sensitive

## Notes

- If any issues are found, fix them and re-run the verification tool
- Document any additional changes made during deployment