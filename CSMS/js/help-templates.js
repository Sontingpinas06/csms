/**
 * Help Templates for CSMS Modules
 * Contains module-specific help content for each section of the application
 */

const helpTemplates = {
  // Dashboard help content
  dashboard: {
    title: "Dashboard Help",
    sections: [
      {
        heading: "Getting Started",
        content: "The Dashboard provides quick access to all major modules in the CSMS system. Click on any card to navigate to that module."
      },
      {
        heading: "Navigation Tips",
        content: "Use the sidebar for navigation between modules. The Dashboard shows a summary of all available tools."
      },
      {
        heading: "Key Features",
        content: "View system-wide statistics, access quick links to frequently used modules, and check notifications."
      }
    ]
  },
  
  // Electives Manager help content
  electives: {
    title: "Electives Manager Help",
    sections: [
      {
        heading: "Managing Electives",
        content: "Create, categorize, and assign elective subjects by term and grade. Use the Elective Catalog to browse all available options."
      },
      {
        heading: "Assignments",
        content: "Assign electives to specific terms and grades using the Assignments section. You can also set capacity limits and prerequisites."
      },
      {
        heading: "Exporting Data",
        content: "Use the Export button to download elective data in various formats for reporting or sharing with other systems."
      }
    ]
  },
  
  // Curriculum Builder help content
  curriculum: {
    title: "Curriculum Builder Help",
    sections: [
      {
        heading: "Building Curriculum",
        content: "Plan courses and sequences by strand. Create curriculum templates that align with academic standards."
      },
      {
        heading: "Course Sequencing",
        content: "Arrange courses in logical progression paths. Define relationships between courses across grade levels."
      },
      {
        heading: "Sharing & Export",
        content: "Use the export feature to share curriculum plans with other educators or for administrative review."
      }
    ]
  },
  
  // Subject Mapping help content
  subjectMapping: {
    title: "Subject Mapping Help",
    sections: [
      {
        heading: "Mapping Subjects",
        content: "Map subjects to specific academic standards and requirements. Create relationships between subjects and learning outcomes."
      },
      {
        heading: "Standards Alignment",
        content: "Align subjects with state or national standards. Track coverage of required learning objectives."
      },
      {
        heading: "Visualization",
        content: "View graphical representations of subject relationships and dependencies across the curriculum."
      }
    ]
  },
  
  // Academic Standards help content
  academicStandards: {
    title: "Academic Standards Help",
    sections: [
      {
        heading: "Managing Standards",
        content: "Browse and manage academic standards for your institution. Import standards from external sources or create custom ones."
      },
      {
        heading: "Standards Hierarchy",
        content: "Organize standards in hierarchical structures. Group related standards for easier management."
      },
      {
        heading: "Integration",
        content: "Link standards to specific curriculum elements. Track standards coverage across your curriculum."
      }
    ]
  },
  
  // CDE PDAP Validator help content
  cdePdap: {
    title: "CDE PDAP Validator Help",
    sections: [
      {
        heading: "Validation Process",
        content: "Validate your curriculum against CDE PDAP requirements. Run compliance checks against current standards."
      },
      {
        heading: "Reporting",
        content: "Generate compliance reports for administrative review. Export findings in various formats."
      },
      {
        heading: "Remediation",
        content: "Identify gaps in compliance and get suggestions for improvement. Track progress toward full compliance."
      }
    ]
  },
  
  // Grade Weighting help content
  gradeWeighting: {
    title: "Grade Weighting Help",
    sections: [
      {
        heading: "Weighting Schemes",
        content: "Configure grade weighting schemes for different course types. Set up custom grading scales and assessment weights."
      },
      {
        heading: "Templates",
        content: "Create reusable weighting templates. Apply weighting templates to multiple courses at once."
      },
      {
        heading: "Calculation Rules",
        content: "Define rules for how final grades are calculated. Configure special handling for specific assessment types."
      }
    ]
  },
  
  // Pre-requisites help content
  prerequisites: {
    title: "Pre-requisites Help",
    sections: [
      {
        heading: "Defining Prerequisites",
        content: "Define prerequisites for courses and subject sequences. Create dependency maps between related subjects."
      },
      {
        heading: "Grade Requirements",
        content: "Set up grade requirements for course progression. Configure minimum performance thresholds."
      },
      {
        heading: "Validation",
        content: "Validate student eligibility against prerequisites. Identify and resolve prerequisite conflicts."
      }
    ]
  }
};