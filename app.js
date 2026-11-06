/**
 * RCD Road Division Hilsa - Office File, Project, Billing & Payment Management System
 * Production Build
 */

// ============================================================================
// PART 1: OFFICES, CONTRACTORS, 7 USER ROLES, 31-FIELD PROJECTS, BILLS SEED
// ============================================================================

const RCD_OFFICE = {
  name: 'OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA',
  department: 'Road Construction Department (RCD), Bihar',
  division: 'Road Division Hilsa',
  subDivisions: [
    { id: 'SD-01', name: 'Sub-Division Hilsa', code: 'SDH', incharge: 'Assistant Engineer', inchargeName: 'Er. Rajiv Ranjan' },
    { id: 'SD-02', name: 'Sub-Division Chandi', code: 'SDC', incharge: 'Assistant Engineer', inchargeName: 'Er. Amit Verma' },
    { id: 'SD-03', name: 'Sub-Division Rajgir', code: 'SDR', incharge: 'Assistant Engineer', inchargeName: 'Er. Manoj Kumar' }
  ]
};

const defaultOffices = [
  { id: 'OFF-01', name: 'Road Division Hilsa', type: 'Division', code: 'RDH', incharge: 'Executive Engineer', inchargeName: 'Er. S. N. Prasad', location: 'Division HQ, Hilsa, Nalanda' },
  { id: 'OFF-02', name: 'Sub-Division Hilsa', type: 'Sub-Division', code: 'SDH', incharge: 'Assistant Engineer', inchargeName: 'Er. Rajiv Ranjan', location: 'Sub-Division Office, Hilsa' },
  { id: 'OFF-03', name: 'Sub-Division Chandi', type: 'Sub-Division', code: 'SDC', incharge: 'Assistant Engineer', inchargeName: 'Er. Amit Verma', location: 'Sub-Division Office, Chandi' },
  { id: 'OFF-04', name: 'Sub-Division Rajgir', type: 'Sub-Division', code: 'SDR', incharge: 'Assistant Engineer', inchargeName: 'Er. Manoj Kumar', location: 'Sub-Division Office, Rajgir' },
  { id: 'OFF-05', name: 'Quality Control Wing', type: 'Branch', code: 'QCW', incharge: 'Executive Engineer (QC)', inchargeName: 'Er. S. Kumar', location: 'Division Laboratory, Hilsa' },
  { id: 'OFF-06', name: 'Divisional Accounts Branch', type: 'Branch', code: 'DAB', incharge: 'Divisional Accounts Officer', inchargeName: 'Sri M. P. Sinha', location: 'Accounts Branch, Division HQ' }
];

const defaultDesignations = [
  'Executive Engineer',
  'Divisional Accounts Officer',
  'Assistant Engineer',
  'Junior Engineer',
  'Accounts Clerk',
  'Head Clerk',
  'Correspondence Clerk',
  'Data Entry Operator',
  'Registered Contractor / Agency',
  'System Administrator'
];

function getOffices() {
  if (!db || !db.offices || !Array.isArray(db.offices)) return defaultOffices;
  return db.offices;
}
function getOfficeList() { return getOffices().map(o => o.name); }
let offices = defaultOffices.map(o => o.name);

function getUserOffices(u) {
  if (!u) return defaultOffices.map(o => o.name);
  if (u.assignedOffices && Array.isArray(u.assignedOffices) && u.assignedOffices.length) return u.assignedOffices;
  return [u.office || defaultOffices[0].name];
}

function renderOfficeBadges(u) {
  let offs = getUserOffices(u), allOffs = getOfficeList();
  if (offs.length >= allOffs.length && allOffs.length > 1) {
    return '<span class="badge-all-offices" title="Division-wide access across all units">🌐 All Offices (' + offs.length + ')</span>';
  }
  let primary = u.office || offs[0], additional = offs.filter(o => o !== primary);
  return '<div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">'
    + '<span class="badge-primary-office" title="Primary Office: ' + esc(primary) + '">⭐ ' + esc(primary) + '</span>'
    + additional.map(o => '<span class="badge-assigned-office" title="Additional Assigned Office: ' + esc(o) + '">+ ' + esc(o) + '</span>').join('')
    + '</div>';
}

const defaultContractors = [
  {
    id: 'CON-01',
    name: 'M/s Bihar State Road Infra Construction Pvt. Ltd.',
    rep: 'Sri Rajesh Kumar (Managing Director)',
    regNo: 'RCD/BIHAR/CLASS-1/2022/441',
    class: 'Class-1',
    pan: 'AAACB1234K',
    gstin: '10AAACB1234K1Z5',
    phone: '+91 94310 12345',
    email: 'bihar.roadinfra@gmail.com',
    address: 'Patna-Hilsa Main Road, Hilsa, Nalanda, Bihar - 801302',
    activeProjects: [1],
    taggedProjects: [
      {
        projectId: 1,
        workName: 'Strengthening and Widening of SH-71 (Hilsa - Chandi Section)',
        division: 'Road Division Hilsa',
        subDivision: 'Sub-Division Hilsa',
        jeId: 'JE-HIL-01',
        jeName: 'Er. Ramesh Kumar',
        aeId: 'AE-HIL-01',
        aeName: 'Er. Rajiv Ranjan',
        agreementNo: '01 SBD OF 2025-26',
        taggedDate: '12 Sep 2026'
      }
    ]
  },
  {
    id: 'CON-02',
    name: 'M/s Nalanda Builders & Infracon',
    rep: 'Sri Sunil Sharma (Managing Partner)',
    regNo: 'RCD/BIHAR/CLASS-2/2023/182',
    class: 'Class-2',
    pan: 'BBBCN5678L',
    gstin: '10BBBCN5678L1Z9',
    phone: '+91 94310 67890',
    email: 'nalanda.builders@gmail.com',
    address: 'Station Road, Rajgir, Nalanda, Bihar - 803116',
    activeProjects: [2],
    taggedProjects: [
      {
        projectId: 2,
        workName: 'Rajgir Bypass Maintenance & Reconstruction',
        division: 'Road Division Hilsa',
        subDivision: 'Sub-Division Rajgir',
        jeId: 'JE-HIL-01',
        jeName: 'Er. Ramesh Kumar',
        aeId: 'CRE-RAJ-01',
        aeName: 'Rajgir Assistant Engineer',
        agreementNo: '04 SBD OF 2025-26',
        taggedDate: '08 Sep 2026'
      }
    ]
  }
];

const defaultUsers = [
  {
    id: 'ADM-HIL-01',
    name: 'Hilsa Administrator',
    designation: 'System Administrator',
    office: 'Road Division Hilsa',
    assignedOffices: defaultOffices.map(o => o.name),
    role: 'Admin',
    password: 'admin123',
    approved: true,
    permissions: { view: true, upload: true, edit: true, delete: true }
  },
  {
    id: 'EE-HIL-01',
    name: 'Er. S. N. Prasad',
    designation: 'Executive Engineer',
    office: 'Road Division Hilsa',
    assignedOffices: defaultOffices.map(o => o.name),
    role: 'EE',
    password: 'ee123',
    approved: true,
    permissions: { view: true, upload: true, edit: true, delete: true }
  },
  {
    id: 'DAO-HIL-01',
    name: 'Sri M. P. Sinha',
    designation: 'Divisional Accounts Officer',
    office: 'Divisional Accounts Branch',
    assignedOffices: ['Road Division Hilsa', 'Divisional Accounts Branch'],
    role: 'DAO',
    password: 'dao123',
    approved: true,
    permissions: { view: true, upload: true, edit: true, delete: false }
  },
  {
    id: 'ACC-HIL-01',
    name: 'Sri Alok Kumar',
    designation: 'Accounts Clerk',
    office: 'Divisional Accounts Branch',
    assignedOffices: ['Road Division Hilsa', 'Divisional Accounts Branch'],
    role: 'Accounts Clerk',
    password: 'clerk123',
    approved: true,
    permissions: { view: true, upload: true, edit: true, delete: false }
  },
  {
    id: 'AE-HIL-01',
    name: 'Er. Rajiv Ranjan',
    designation: 'Assistant Engineer',
    office: 'Sub-Division Hilsa',
    assignedOffices: ['Sub-Division Hilsa', 'Road Division Hilsa'],
    role: 'AE',
    password: 'ae123',
    approved: true,
    permissions: { view: true, upload: true, edit: true, delete: false }
  },
  {
    id: 'JE-HIL-01',
    name: 'Er. Ramesh Kumar',
    designation: 'Junior Engineer',
    office: 'Sub-Division Hilsa',
    assignedOffices: ['Sub-Division Hilsa'],
    role: 'JE',
    password: 'je123',
    approved: true,
    permissions: { view: true, upload: true, edit: true, delete: false }
  },
  {
    id: 'CON-01',
    name: 'M/s Bihar State Road Infra Construction Pvt. Ltd.',
    rep: 'Sri Rajesh Kumar (MD)',
    designation: 'Registered Contractor (Class-1)',
    office: 'Sub-Division Hilsa',
    assignedOffices: ['Sub-Division Hilsa', 'Road Division Hilsa'],
    role: 'Contractor',
    contractorId: 'CON-01',
    password: 'contractor123',
    approved: true,
    permissions: { view: true, upload: true, edit: false, delete: false }
  },
  {
    id: 'CRE-RAJ-01',
    name: 'Rajgir Assistant Engineer',
    designation: 'Assistant Engineer',
    office: 'Sub-Division Rajgir',
    assignedOffices: ['Sub-Division Rajgir'],
    role: 'AE',
    password: 'creator123',
    approved: true,
    permissions: { view: true, upload: true, edit: true, delete: true }
  },
  {
    id: 'VIE-CHA-01',
    name: 'Chandi Junior Engineer',
    designation: 'Junior Engineer',
    office: 'Sub-Division Chandi',
    assignedOffices: ['Sub-Division Chandi'],
    role: 'JE',
    password: 'viewer123',
    approved: true,
    permissions: { view: true, upload: true, edit: false, delete: false }
  },
  {
    id: 'AE-CHA-01',
    name: 'Chandi Assistant Engineer',
    designation: 'Assistant Engineer',
    office: 'Sub-Division Chandi',
    assignedOffices: ['Sub-Division Chandi'],
    role: 'AE',
    password: 'ae123',
    approved: true,
    permissions: { view: true, upload: true, edit: true, delete: false }
  },
  {
    id: 'JE-RAJ-01',
    name: 'Rajgir Junior Engineer',
    designation: 'Junior Engineer',
    office: 'Sub-Division Rajgir',
    assignedOffices: ['Sub-Division Rajgir'],
    role: 'JE',
    password: 'je123',
    approved: true,
    permissions: { view: true, upload: true, edit: false, delete: false }
  },
  {
    id: 'CON-02',
    name: 'M/s Nalanda Builders & Infracon',
    rep: 'Sri Sunil Sharma (Managing Partner)',
    designation: 'Registered Contractor (Class-2)',
    office: 'Sub-Division Rajgir',
    assignedOffices: ['Sub-Division Rajgir', 'Road Division Hilsa'],
    role: 'Contractor',
    contractorId: 'CON-02',
    password: 'contractor123',
    approved: true,
    permissions: { view: true, upload: true, edit: false, delete: false }
  }
];

const defaultMaterials = [
  { item: 'Stone Aggregate', letter: '(a)' },
  { item: 'Sand', letter: '(b)' },
  { item: 'Bricks', letter: '(c)' },
  { item: 'Dust', letter: '(d)' },
  { item: 'Boulder', letter: '(e)' },
  { item: 'Earth Work', letter: '(f)' },
  { item: 'Other Materials', letter: '(g)' }
];

const sampleProject1Report = {
  nameOfWork: 'Strengthening and Widening of SH-71 (Hilsa - Chandi Section)',
  nameOfAgency: 'M/s Bihar State Road Infra Construction Pvt. Ltd.',
  estimatedCost: '1452.80 Lakhs',
  agreementValue: '1389.20 Lakhs',
  dateOfStart: '2026-02-15',
  dateOfCompletionAgr: '2026-12-31',
  timeExtUpTo: '2027-03-31',
  timeExtLtNo: 'RDH/TECH/2026/418',
  timeExtDate: '2026-08-10',
  aaAmount: '1452.80',
  aaLtNo: 'RCD/PATNA/AA/108',
  aaDate: '2025-11-20',
  techApproval: '1452.80 Lakhs',
  techSanction: '1440.00 Lakhs',
  projectCostBOQ: '1389.20 Lakhs',
  dateOfTender: '2025-12-15',
  dateOfAgreement: '2026-02-01',
  actualDateOfCompletion: 'In Progress (Target: 31 Dec 2026)',
  landAcquisition: '45.00',
  utilityShifting: '28.50',
  bitumenReq: '180.00 MT',
  bitumenConsumed: '125.40 MT',
  bitumenBalance: '54.60 MT',
  bitumenRemarks: 'VG-30 Grade Bitumen',
  emulsionReq: '45.00 MT',
  emulsionConsumed: '32.00 MT',
  emulsionBalance: '13.00 MT',
  emulsionRemarks: 'RS-1 Rapid Setting',
  materials: [
    { item: 'Stone Aggregate', letter: '(a)', workDone: '18400 Cum', challanSubmitted: '18400 Cum', balanceChallan: '0', remarks: 'Passed quality test' },
    { item: 'Sand', letter: '(b)', workDone: '9200 Cum', challanSubmitted: '9200 Cum', balanceChallan: '0', remarks: 'Coarse Sand Zone-II' },
    { item: 'Bricks', letter: '(c)', workDone: '150000 Nos', challanSubmitted: '150000 Nos', balanceChallan: '0', remarks: 'Class-I standard' },
    { item: 'Dust', letter: '(d)', workDone: '4600 Cum', challanSubmitted: '4600 Cum', balanceChallan: '0', remarks: 'Quarry Dust' },
    { item: 'Boulder', letter: '(e)', workDone: '1200 Cum', challanSubmitted: '1200 Cum', balanceChallan: '0', remarks: 'Sub-base filter' },
    { item: 'Earth Work', letter: '(f)', workDone: '32000 Cum', challanSubmitted: '32000 Cum', balanceChallan: '0', remarks: 'Embankment compaction' },
    { item: 'Other Materials', letter: '(g)', workDone: 'As per site', challanSubmitted: 'Verified', balanceChallan: '0', remarks: 'Kerb & Road signs' }
  ],
  testReportBill: '3rd Running Account Bill',
  testReportLtNoDate: 'QC/LAB/HIL/2026/89, Dt: 02-09-2026',
  testReportStatus: 'Submitted',
  testReportRemarks: 'All cube and core test reports attached and verified',
  updatedAt: '12 Sep 2026',
  updatedBy: 'Er. S. N. Prasad'
};

const defaultProjects = [
  {
    id: 1,
    name: 'Strengthening and Widening of SH-71 (Hilsa - Chandi Section)',
    schemeName: 'State Highway Improvement Project (SHIP-IV)',
    department: 'Road Construction Department (RCD), Bihar',
    division: 'Road Division Hilsa',
    subDivision: 'Sub-Division Hilsa',
    roadName: 'SH-71 (Km 0.00 to Km 18.50)',
    location: 'Hilsa to Chandi, Nalanda',
    aaNo: 'RCD/PATNA/AA/108',
    aaDate: '2025-11-20',
    aaAmount: '1452.80 Lakhs',
    tsNo: 'CE/RCD/PATNA/TS/2025/312',
    tsDate: '2025-12-05',
    tsAmount: '1440.00 Lakhs',
    estimateAmount: '1452.80 Lakhs',
    agreementNo: '01 SBD OF 2025-26',
    agreementDate: '2026-02-01',
    agreementAmount: '1389.20 Lakhs',
    contractorName: 'M/s Bihar State Road Infra Construction Pvt. Ltd.',
    contractorId: 'CON-01',
    loaNo: 'RDH/TECH/LOA/2026/89',
    loaDate: '2026-01-15',
    workOrderNo: 'RDH/EE/WO/2026/04',
    workOrderDate: '2026-02-10',
    dateOfStart: '2026-02-15',
    stipulatedDateOfCompletion: '2026-12-31',
    extensionOfTime: 'Granted up to 31-03-2027 (Lt No: RDH/TECH/418)',
    revisedEstimate: 'Not Applicable',
    physicalProgress: '65%',
    financialProgress: '58%',
    status: 'Work in Progress',
    remarks: 'Bituminous concrete work in progress under Sub-Division Hilsa',
    office: 'Sub-Division Hilsa',
    createdBy: 'ADM-HIL-01',
    date: '12 Sep 2026',
    ref: 'SH-71 widening and reconstruction project with major bridge approach',
    files: [
      { id: 11, docNo: 'EST-2026-01', name: 'Technical Estimate.pdf', type: 'PDF', size: '2.40 MB', date: '12 Sep 2026', description: 'Detailed technical estimate and BOQ' },
      { id: 12, docNo: 'PHT-2026-01', name: 'Site Photographs.zip', type: 'ZIP', size: '18.60 MB', date: '10 Sep 2026', description: 'Pre-construction road conditions' }
    ],
    folders: [
      { id: 101, name: 'Agreements', files: [{ id: 1001, docNo: 'AGR-2026-01', name: 'Contract Agreement.pdf', type: 'PDF', size: '3.20 MB', date: '12 Sep 2026', description: 'Signed agreement copy with contractor' }] },
      { id: 102, name: 'Bills', files: [{ id: 1002, docNo: 'BILL-RA-01', name: 'First RA Bill.xlsx', type: 'XLSX', size: '0.58 MB', date: '14 Sep 2026', description: 'First running account bill submitted' }] },
      { id: 103, name: 'Drawings & Plans', files: [] },
      { id: 104, name: 'Site Photos', files: [] },
      { id: 105, name: 'Test Reports', files: [] }
    ],
    report: sampleProject1Report,
    departmentContacts: [
      { id: 'dc-1', name: 'Er. S. N. Prasad', designation: 'Executive Engineer (EE)', mobile: '9431820001', email: 'ee-hilsa-rcd@bihar.gov.in' },
      { id: 'dc-2', name: 'Er. Rajiv Ranjan', designation: 'Assistant Engineer (AE)', mobile: '9431820002', email: 'ae-hilsa-rcd@bihar.gov.in' },
      { id: 'dc-3', name: 'Er. Ramesh Kumar', designation: 'Junior Engineer (JE)', mobile: '9431820003', email: 'je-hilsa-rcd@bihar.gov.in' }
    ],
    agencyContacts: [
      { id: 'ac-1', name: 'Sri Rajesh Kumar', designation: 'Managing Director / Agency Head', mobile: '9835011223', email: 'rajesh@biharinfra.com' },
      { id: 'ac-2', name: 'Er. Amit Sharma', designation: 'Project Manager / Site Engineer', mobile: '9835044556', email: 'amit.sharma@biharinfra.com' },
      { id: 'ac-3', name: 'Sri Manoj Tiwari', designation: 'Site Supervisor', mobile: '9835077889', email: 'manoj.site@biharinfra.com' },
      { id: 'ac-4', name: 'Sri Vikas Yadav', designation: 'Workers Representative / Head Foreman', mobile: '9835099001', email: 'vikas.yadav@biharinfra.com' }
    ],
    customFields: [
      { id: 'cf-101', label: 'Soil Testing Consultant', value: 'National Soil Labs, Patna', type: 'Text' },
      { id: 'cf-102', label: 'Environmental Clearance Ref', value: 'EC/BIH/RCD/2025/901', type: 'Text' },
      { id: 'cf-103', label: 'Design Carriageway Width', value: '7.00m + 1.50m Paved Shoulder', type: 'Text' }
    ],
    access: ['ADM-HIL-01', 'EE-HIL-01', 'DAO-HIL-01', 'ACC-HIL-01', 'AE-HIL-01', 'JE-HIL-01', 'CON-01']
  },
  {
    id: 2,
    name: 'Rajgir Bypass Maintenance & Reconstruction',
    schemeName: 'Periodic Maintenance Programme (PMP)',
    department: 'Road Construction Department (RCD), Bihar',
    division: 'Road Division Hilsa',
    subDivision: 'Sub-Division Rajgir',
    roadName: 'Rajgir Bypass Ring Road (Km 0.00 to 8.40)',
    location: 'Rajgir, Nalanda',
    aaNo: 'RCD/PATNA/AA/2026/54',
    aaDate: '2026-01-10',
    aaAmount: '580.00 Lakhs',
    tsNo: 'CE/RCD/PATNA/TS/2026/88',
    tsDate: '2026-01-25',
    tsAmount: '575.00 Lakhs',
    estimateAmount: '580.00 Lakhs',
    agreementNo: '04 SBD OF 2025-26',
    agreementDate: '2026-03-05',
    agreementAmount: '548.50 Lakhs',
    contractorName: 'M/s Nalanda Builders & Infracon',
    contractorId: 'CON-02',
    loaNo: 'RDH/TECH/LOA/2026/112',
    loaDate: '2026-02-18',
    workOrderNo: 'RDH/EE/WO/2026/18',
    workOrderDate: '2026-03-12',
    dateOfStart: '2026-03-20',
    stipulatedDateOfCompletion: '2026-11-30',
    extensionOfTime: 'Nil',
    revisedEstimate: 'Nil',
    physicalProgress: '42%',
    financialProgress: '35%',
    status: 'Work in Progress',
    remarks: 'Shoulder dressing and GSB laying in progress',
    office: 'Sub-Division Rajgir',
    createdBy: 'CRE-RAJ-01',
    date: '08 Sep 2026',
    ref: 'Periodic maintenance and widening of four-lane bypass',
    files: [
      { id: 21, docNo: 'WP-2026-01', name: 'Work Programme.xlsx', type: 'XLSX', size: '0.64 MB', date: '08 Sep 2026', description: 'Road maintenance timeline' }
    ],
    folders: [
      { id: 201, name: 'Agreements', files: [] },
      { id: 202, name: 'Bills', files: [] }
    ],
    report: null,
    departmentContacts: [
      { id: 'dc-201', name: 'Er. S. N. Prasad', designation: 'Executive Engineer (EE)', mobile: '9431820001', email: 'ee-hilsa-rcd@bihar.gov.in' },
      { id: 'dc-202', name: 'Er. Sunil Verma', designation: 'Assistant Engineer (AE Rajgir)', mobile: '9431820015', email: 'ae-rajgir-rcd@bihar.gov.in' }
    ],
    agencyContacts: [
      { id: 'ac-201', name: 'Sri Vikramaditya Singh', designation: 'Site Engineer', mobile: '9430088122', email: 'vikram@nalandabuilders.com' },
      { id: 'ac-202', name: 'Sri Ashok Mahato', designation: 'Site Supervisor', mobile: '9430077133', email: 'ashok.site@nalandabuilders.com' },
      { id: 'ac-203', name: 'Sri Rampal Mahto', designation: 'Workers Representative', mobile: '9430099887', email: 'rampal.worker@nalandabuilders.com' }
    ],
    customFields: [
      { id: 'cf-201', label: 'Bypass Total Carriageway Width', value: '10.00 Meters', type: 'Text' }
    ],
    access: ['ADM-HIL-01', 'EE-HIL-01', 'DAO-HIL-01', 'ACC-HIL-01', 'AE-RAJ-01', 'JE-RAJ-01', 'CON-02']
  },
  {
    id: 3,
    name: 'Chandi Road Survey & Detailed Project Report',
    schemeName: 'Core Network Survey 2026',
    department: 'Road Construction Department (RCD), Bihar',
    division: 'Road Division Hilsa',
    subDivision: 'Sub-Division Chandi',
    roadName: 'Chandi - Noorsarai Road',
    location: 'Chandi, Nalanda',
    aaNo: 'RCD/PLAN/2026/14',
    aaDate: '2026-02-01',
    aaAmount: '65.00 Lakhs',
    tsNo: 'SE/RCD/PATNA/2026/09',
    tsDate: '2026-02-15',
    tsAmount: '65.00 Lakhs',
    estimateAmount: '65.00 Lakhs',
    agreementNo: 'Pending Tender',
    agreementDate: '',
    agreementAmount: '',
    contractorName: 'Pending Tender Award',
    contractorId: '',
    loaNo: '',
    loaDate: '',
    workOrderNo: '',
    workOrderDate: '',
    dateOfStart: '',
    stipulatedDateOfCompletion: '',
    extensionOfTime: '',
    revisedEstimate: '',
    physicalProgress: '15%',
    financialProgress: '0%',
    status: 'Technical Sanction',
    remarks: 'Alignment survey and soil investigation in progress',
    office: 'Sub-Division Chandi',
    createdBy: 'ADM-HIL-01',
    date: '04 Sep 2026',
    ref: 'DPR preparation and topographical road survey',
    files: [],
    folders: [
      { id: 301, name: 'Survey Reports', files: [] }
    ],
    report: null,
    departmentContacts: [
      { id: 'dc-301', name: 'Er. S. N. Prasad', designation: 'Executive Engineer (EE)', mobile: '9431820001', email: 'ee-hilsa-rcd@bihar.gov.in' },
      { id: 'dc-302', name: 'Er. Vivek Anand', designation: 'Junior Engineer (JE Chandi)', mobile: '9431820021', email: 'je-chandi-rcd@bihar.gov.in' }
    ],
    agencyContacts: [],
    customFields: [],
    access: ['ADM-HIL-01', 'EE-HIL-01', 'AE-CHA-01', 'JE-CHA-01']
  }
];

const defaultBills = [
  {
    id: 10001,
    billNumber: '1st RA Bill',
    projectId: 1,
    projectName: 'Strengthening and Widening of SH-71 (Hilsa - Chandi Section)',
    contractorId: 'CON-01',
    contractorName: 'M/s Bihar State Road Infra Construction Pvt. Ltd.',
    agreementNo: '01 SBD OF 2025-26',
    billType: 'RA Bill',
    billPeriod: '15 Feb 2026 to 31 Aug 2026',
    mbNo: 'MB-RDH-2026/04',
    mbDate: '2026-09-02',
    preparedDate: '05 Sep 2026',
    preparedBy: 'JE-HIL-01',
    items: [
      { id: 1, itemNo: '1', boqItemNo: '2.1', description: 'Earthwork in excavation for roadway in all kinds of soil', agreementQty: 35000, executedQty: 32000, unit: 'Cum', rate: 185.00, amount: 5920000 },
      { id: 2, itemNo: '2', boqItemNo: '4.2', description: 'Granular Sub-Base (GSB) with well graded material', agreementQty: 12500, executedQty: 11800, unit: 'Cum', rate: 1450.00, amount: 17110000 },
      { id: 3, itemNo: '3', boqItemNo: '4.5', description: 'Dense Bituminous Macadam (DBM) 50mm compacted thickness', agreementQty: 8500, executedQty: 6200, unit: 'Cum', rate: 4800.00, amount: 29760000 }
    ],
    grossAmount: 52790000,
    deductions: {
      tdsPercent: 2, tdsAmount: 1055800,
      gstTdsPercent: 2, gstTdsAmount: 1055800,
      labourCessPercent: 1, labourCessAmount: 527900,
      royalty: 420000,
      securityDepositPercent: 5, securityDepositAmount: 2639500,
      otherRecoveries: 0,
      totalDeductions: 5699000
    },
    netPayable: 47091000,
    status: 'Contractor Signed & Submitted',
    version: 'v1',
    versions: [],
    signatureRecord: {
      contractorId: 'CON-01',
      contractorName: 'M/s Bihar State Road Infra Construction Pvt. Ltd.',
      rep: 'Sri Rajesh Kumar (MD)',
      billId: 10001,
      signatureType: 'Digital Signature Certificate / Electronic Seal',
      signatureStatus: 'Signed & Submitted',
      signedDate: '14 Sep 2026',
      signedTime: '11:45 AM',
      signatureData: 'DIGITALLY_SIGNED_HASH_RCD_HILSA_8F4A2B9C1',
      remarks: 'All executed quantities verified against site MB No. 04. Accepted in full.',
      version: 'v1'
    },
    timeline: [
      { step: 'Created', role: 'JE', user: 'Er. Ramesh Kumar', date: '05 Sep 2026', time: '10:30 AM', remarks: '1st RA Bill prepared from site MB-RDH-2026/04.' },
      { step: 'Contractor Acceptance', role: 'Contractor', user: 'Sri Rajesh Kumar (MD)', date: '14 Sep 2026', time: '11:30 AM', remarks: 'Bill quantities and rates verified with agreement.' },
      { step: 'Contractor Signature', role: 'Contractor', user: 'Sri Rajesh Kumar (MD)', date: '14 Sep 2026', time: '11:45 AM', remarks: 'Contractor digital signature registered and bill submitted.' }
    ],
    remarks: 'Ready for JE to forward to AE for technical check.'
  }
];

const defaultPayments = [
  {
    id: 'PAY-2026-001',
    billId: 9991,
    projectId: 1,
    projectName: 'Strengthening and Widening of SH-71 (Hilsa - Chandi Section)',
    contractor: 'M/s Bihar State Road Infra Construction Pvt. Ltd.',
    billNumber: 'Mobilization Advance / Preliminary Bill',
    billType: 'Advance Bill',
    billDate: '15 Feb 2026',
    grossAmount: 12000000,
    totalDeduction: 1200000,
    netPayableAmount: 10800000,
    eeApprovalDate: '20 Feb 2026',
    paymentSentDate: '22 Feb 2026',
    cfmsNumber: 'CFMS/2026/HIL/99412',
    voucherNumber: 'VR-2026-042',
    paymentStatus: 'Paid',
    paymentDate: '25 Feb 2026',
    paidAmount: 10800000,
    pendingAmount: 0,
    remarks: 'Disbursed directly to Contractor SBI Account via CFMS Treasury Portal.'
  }
];

const defaultNotifications = [
  {
    id: 'NOTIF-01',
    targetRole: 'JE',
    title: 'Contractor Signed & Submitted',
    message: 'Contractor M/s Bihar State Road Infra has digitally signed 1st RA Bill. You can now forward it to AE.',
    billId: 10001,
    date: '14 Sep 2026, 11:45 AM',
    read: false
  },
  {
    id: 'NOTIF-02',
    targetRole: 'AE',
    title: 'Pending AE Verification',
    message: 'Prepare for technical inspection of SH-71 widening 1st RA Bill.',
    billId: 10001,
    date: '14 Sep 2026, 11:50 AM',
    read: false
  }
];

const defaultAuditLogs = [
  {
    id: 'AUDIT-101',
    billId: 10001,
    projectId: 1,
    userId: 'JE-HIL-01',
    userName: 'Er. Ramesh Kumar',
    role: 'JE',
    action: 'CREATE_BILL',
    previousStatus: 'None',
    newStatus: 'Prepared by JE – Pending Contractor Acceptance',
    remarks: '1st RA Bill created with 3 BOQ items totaling ₹5,27,90,000.',
    date: '05 Sep 2026',
    time: '10:30 AM',
    version: 'v1'
  },
  {
    id: 'AUDIT-102',
    billId: 10001,
    projectId: 1,
    userId: 'CON-01',
    userName: 'M/s Bihar State Road Infra (Sri Rajesh Kumar)',
    role: 'Contractor',
    action: 'CONTRACTOR_ACCEPT',
    previousStatus: 'Prepared by JE – Pending Contractor Acceptance',
    newStatus: 'Contractor Accepted',
    remarks: 'Verified executed quantities against agreement items.',
    date: '14 Sep 2026',
    time: '11:30 AM',
    version: 'v1'
  },
  {
    id: 'AUDIT-103',
    billId: 10001,
    projectId: 1,
    userId: 'CON-01',
    userName: 'M/s Bihar State Road Infra (Sri Rajesh Kumar)',
    role: 'Contractor',
    action: 'SIGN_AND_SUBMIT',
    previousStatus: 'Contractor Accepted',
    newStatus: 'Contractor Signed & Submitted',
    remarks: 'Electronic signature hash generated: DIGITALLY_SIGNED_HASH_RCD_HILSA_8F4A2B9C1',
    date: '14 Sep 2026',
    time: '11:45 AM',
    version: 'v1'
  }
];

const defaultLetters = [
  { id: 1, type: 'Outward', number: 'RDH/OUT/2026/114', date: '11 Sep 2026', subject: 'Submission of revised work programme for SH-71', office: 'Road Division Hilsa', file: 'Work Programme.pdf', description: 'Forwarded to Chief Engineer Patna' },
  { id: 2, type: 'Inward', number: 'PWD/IN/2026/881', date: '09 Sep 2026', subject: 'Administrative approval for SH-71 widening', office: 'Road Division Hilsa', file: 'Approval Letter.pdf', description: 'Sanction letter received from Department' }
];

const seed = {
  offices: JSON.parse(JSON.stringify(defaultOffices)),
  contractors: JSON.parse(JSON.stringify(defaultContractors)),
  users: JSON.parse(JSON.stringify(defaultUsers)),
  projects: JSON.parse(JSON.stringify(defaultProjects)),
  bills: JSON.parse(JSON.stringify(defaultBills)),
  payments: JSON.parse(JSON.stringify(defaultPayments)),
  notifications: JSON.parse(JSON.stringify(defaultNotifications)),
  auditLogs: JSON.parse(JSON.stringify(defaultAuditLogs)),
  letters: JSON.parse(JSON.stringify(defaultLetters)),
  designations: JSON.parse(JSON.stringify(defaultDesignations))
};

let db = JSON.parse(localStorage.getItem('rdh-dms-v1') || 'null') || seed;

function syncDbSchema() {
  if (!db) db = JSON.parse(JSON.stringify(seed));
  if (!db.contractors || !db.contractors.length) db.contractors = JSON.parse(JSON.stringify(defaultContractors));
  db.contractors.forEach(c => {
    if (!c.taggedProjects || !c.taggedProjects.length) {
      if (c.id === 'CON-01') {
        c.taggedProjects = [
          {
            projectId: 1,
            workName: 'Strengthening and Widening of SH-71 (Hilsa - Chandi Section)',
            division: 'Road Division Hilsa',
            subDivision: 'Sub-Division Hilsa',
            jeId: 'JE-HIL-01',
            jeName: 'Er. Ramesh Kumar',
            aeId: 'AE-HIL-01',
            aeName: 'Er. Rajiv Ranjan',
            agreementNo: '01 SBD OF 2025-26',
            taggedDate: '12 Sep 2026'
          }
        ];
      } else if (c.id === 'CON-02') {
        c.taggedProjects = [
          {
            projectId: 2,
            workName: 'Rajgir Bypass Maintenance & Reconstruction',
            division: 'Road Division Hilsa',
            subDivision: 'Sub-Division Rajgir',
            jeId: 'JE-RAJ-01',
            jeName: 'Rajgir Junior Engineer',
            aeId: 'CRE-RAJ-01',
            aeName: 'Rajgir Assistant Engineer',
            agreementNo: '04 SBD OF 2025-26',
            taggedDate: '08 Sep 2026'
          }
        ];
      } else {
        c.taggedProjects = [];
      }
    }
  });
  if (!db.bills) db.bills = JSON.parse(JSON.stringify(defaultBills));
  if (!db.payments) db.payments = JSON.parse(JSON.stringify(defaultPayments));
  if (!db.notifications) db.notifications = JSON.parse(JSON.stringify(defaultNotifications));
  if (!db.auditLogs) db.auditLogs = JSON.parse(JSON.stringify(defaultAuditLogs));
  if (!db.letters) db.letters = JSON.parse(JSON.stringify(defaultLetters));
  if (!db.designations || !db.designations.length) db.designations = JSON.parse(JSON.stringify(defaultDesignations));

  defaultUsers.forEach(du => {
    let exists = db.users.find(u => u.id === du.id);
    if (!exists) {
      db.users.push(JSON.parse(JSON.stringify(du)));
    } else {
      if (du.role && exists.role !== du.role && ['Contractor', 'JE', 'AE', 'EE', 'DAO', 'Accounts Clerk'].includes(du.role)) {
        exists.role = du.role;
        exists.designation = du.designation;
      }
    }
  });

  if (db.users && Array.isArray(db.users)) {
    db.users.forEach(u => {
      let r = (u.role || '').toUpperCase();
      if (r === 'ADMIN') u.fullRole = 'OFFICE ADMIN';
      else if (r === 'EE') u.fullRole = 'EXECUTIVE ENGINEER (EE)';
      else if (r === 'DAO') u.fullRole = 'DIVISIONAL ACCOUNTS OFFICER (DAO)';
      else if (r.includes('ACCOUNTS') || r.includes('CLERK')) u.fullRole = 'ACCOUNTS CLERK';
      else if (r === 'AE') u.fullRole = 'ASSISTANT ENGINEER (AE)';
      else if (r === 'JE') u.fullRole = 'JUNIOR ENGINEER (JE)';
      else if (r.includes('CONTRACTOR')) u.fullRole = 'CONTRACTOR';
    });
  }

  if (!db.offices || !db.offices.length) {
    db.offices = JSON.parse(JSON.stringify(defaultOffices));
  }
  offices = getOfficeList();

  if (db.projects && Array.isArray(db.projects)) {
    db.projects.forEach(p => {
      p.projectCode = p.projectCode || ('PRJ-RDH-' + String(p.id).padStart(3, '0'));
      p.schemeHead = p.schemeHead || p.schemeName || 'State Highway Improvement Project';
      p.section = p.section || p.roadName || 'Hilsa - Chandi';
      p.roadType = p.roadType || 'State Highway (SH)';
      p.chainageFromKm = p.chainageFromKm !== undefined ? p.chainageFromKm : 0.00;
      p.chainageToKm = p.chainageToKm !== undefined ? p.chainageToKm : 18.50;
      p.totalLengthKm = p.totalLengthKm !== undefined ? p.totalLengthKm : 18.50;
      p.sanctionNumber = p.sanctionNumber || p.aaNo || 'RCD/PATNA/AA/108';
      p.sanctionDate = p.sanctionDate || p.aaDate || '2025-11-20';
      p.sanctionAmount = p.sanctionAmount || p.aaAmount || '1452.80 Lakhs';
      p.technicalSanctionNo = p.technicalSanctionNo || p.tsNo || 'CE/RCD/PATNA/TS/2025/312';
      p.tsAmount = p.tsAmount || p.estimateAmount || '1440.00 Lakhs';
      p.financialSanctionNo = p.financialSanctionNo || p.aaNo || 'RCD/PATNA/AA/108';
      p.contractAgreementNo = p.contractAgreementNo || p.agreementNo || '01 SBD OF 2025-26';
      p.agreementValue = p.agreementValue || p.agreementAmount || '1389.20 Lakhs';
      p.stipulatedStart = p.stipulatedStart || p.dateOfStart || '2026-02-15';
      p.stipulatedEnd = p.stipulatedEnd || p.stipulatedDateOfCompletion || '2026-12-31';
      p.progressPercent = p.progressPercent !== undefined ? p.progressPercent : (parseInt(p.physicalProgress) || 65);

      if (!p.departmentContacts || !p.departmentContacts.length) {
        if (p.id === 1) {
          p.departmentContacts = [
            { id: 'dc-1', name: 'Er. S. N. Prasad', designation: 'Executive Engineer (EE)', mobile: '9431820001', email: 'ee-hilsa-rcd@bihar.gov.in' },
            { id: 'dc-2', name: 'Er. Rajiv Ranjan', designation: 'Assistant Engineer (AE)', mobile: '9431820002', email: 'ae-hilsa-rcd@bihar.gov.in' },
            { id: 'dc-3', name: 'Er. Ramesh Kumar', designation: 'Junior Engineer (JE)', mobile: '9431820003', email: 'je-hilsa-rcd@bihar.gov.in' }
          ];
        } else if (p.id === 2) {
          p.departmentContacts = [
            { id: 'dc-201', name: 'Er. S. N. Prasad', designation: 'Executive Engineer (EE)', mobile: '9431820001', email: 'ee-hilsa-rcd@bihar.gov.in' },
            { id: 'dc-202', name: 'Er. Sunil Verma', designation: 'Assistant Engineer (AE Rajgir)', mobile: '9431820015', email: 'ae-rajgir-rcd@bihar.gov.in' }
          ];
        } else {
          p.departmentContacts = [
            { id: 'dc-' + p.id + '-1', name: 'Er. S. N. Prasad', designation: 'Executive Engineer (EE)', mobile: '9431820001', email: 'ee-hilsa-rcd@bihar.gov.in' }
          ];
        }
      }

      if (!p.agencyContacts || !p.agencyContacts.length) {
        if (p.id === 1) {
          p.agencyContacts = [
            { id: 'ac-1', name: 'Sri Rajesh Kumar', designation: 'Managing Director / Agency Head', mobile: '9835011223', email: 'rajesh@biharinfra.com' },
            { id: 'ac-2', name: 'Er. Amit Sharma', designation: 'Project Manager / Site Engineer', mobile: '9835044556', email: 'amit.sharma@biharinfra.com' },
            { id: 'ac-3', name: 'Sri Manoj Tiwari', designation: 'Site Supervisor', mobile: '9835077889', email: 'manoj.site@biharinfra.com' },
            { id: 'ac-4', name: 'Sri Vikas Yadav', designation: 'Workers Representative / Head Foreman', mobile: '9835099001', email: 'vikas.yadav@biharinfra.com' }
          ];
        } else if (p.id === 2) {
          p.agencyContacts = [
            { id: 'ac-201', name: 'Sri Vikramaditya Singh', designation: 'Site Engineer', mobile: '9430088122', email: 'vikram@nalandabuilders.com' },
            { id: 'ac-202', name: 'Sri Ashok Mahato', designation: 'Site Supervisor', mobile: '9430077133', email: 'ashok.site@nalandabuilders.com' },
            { id: 'ac-203', name: 'Sri Rampal Mahto', designation: 'Workers Representative', mobile: '9430099887', email: 'rampal.worker@nalandabuilders.com' }
          ];
        } else if (p.contractorName && p.contractorName !== 'Pending Tender Award') {
          p.agencyContacts = [
            { id: 'ac-' + p.id + '-1', name: p.contractorName, designation: 'Site Incharge', mobile: '9835099999', email: 'contact@agency.com' }
          ];
        } else {
          p.agencyContacts = [];
        }
      }

      if (!p.customFields) {
        if (p.id === 1) {
          p.customFields = [
            { id: 'cf-101', label: 'Soil Testing Consultant', value: 'National Soil Labs, Patna', type: 'Text' },
            { id: 'cf-102', label: 'Environmental Clearance Ref', value: 'EC/BIH/RCD/2025/901', type: 'Text' },
            { id: 'cf-103', label: 'Design Carriageway Width', value: '7.00m + 1.50m Paved Shoulder', type: 'Text' }
          ];
        } else if (p.id === 2) {
          p.customFields = [
            { id: 'cf-201', label: 'Bypass Total Carriageway Width', value: '10.00 Meters', type: 'Text' }
          ];
        } else {
          p.customFields = [];
        }
      }

      if (p.contractorId) {
        let con = db.contractors.find(c => c.id === p.contractorId);
        if (con && con.taggedProjects) {
          let t = con.taggedProjects.find(tp => tp.projectId === p.id);
          if (t) {
            p.assignedJE = p.assignedJE || t.jeId;
            p.assignedAE = p.assignedAE || t.aeId;
          }
        }
      }
      if (!p.assignedJE) {
        if (p.id === 1) p.assignedJE = 'JE-HIL-01';
        else if (p.id === 2) p.assignedJE = 'JE-RAJ-01';
        else if (p.id === 3) p.assignedJE = 'VIE-CHA-01';
      }
      if (!p.assignedAE) {
        if (p.id === 1) p.assignedAE = 'AE-HIL-01';
        else if (p.id === 2) p.assignedAE = 'CRE-RAJ-01';
        else if (p.id === 3) p.assignedAE = 'AE-CHA-01';
      }
    });
  }
}
syncDbSchema();

function save() {
  localStorage.setItem('rdh-dms-v1', JSON.stringify(db));
}

let current = null;
let view = 'dashboard';
let modal = null;
let activeProject = null;
let activeFolder = null;
let activeBillTab = 'all';

if (typeof window !== 'undefined') {
  try {
    Object.defineProperty(window, 'current', {
      get() { return current; },
      set(v) { current = v; },
      configurable: true
    });
    Object.defineProperty(window, 'view', {
      get() { return view; },
      set(v) { view = v; },
      configurable: true
    });
  } catch (e) {}
}

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function toInputDate(value) {
  if (!value) return '';
  let d = new Date(value);
  return isNaN(d) ? '' : d.toISOString().slice(0, 10);
}

function formatCurrency(n) {
  let num = Number(n) || 0;
  return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

if (typeof window !== 'undefined') {
  window.RCD_OFFICE = RCD_OFFICE;
  window.RCD_DB = db;
  window.db = db;
}
if (typeof globalThis !== 'undefined') {
  globalThis.RCD_OFFICE = RCD_OFFICE;
  globalThis.RCD_DB = db;
  globalThis.db = db;
}


// ============================================================================
// PART 2: BACKEND WORKFLOW ENGINE & HARD RBAC ENFORCEMENT
// ============================================================================

function getUserPerms(u) {
  if (!u) return { view: false, upload: false, edit: false, delete: false };
  let p = u.permissions;
  if (p && typeof p === 'object') {
    return { view: p.view !== false, upload: !!p.upload, edit: !!p.edit, delete: !!p.delete };
  }
  if (u.role === 'Admin' || u.role === 'EE') return { view: true, upload: true, edit: true, delete: true };
  if (u.role === 'JE' || u.role === 'AE') return { view: true, upload: true, edit: true, delete: false };
  if (u.role === 'Accounts Clerk' || u.role === 'DAO') return { view: true, upload: true, edit: true, delete: false };
  if (u.role === 'Contractor') return { view: true, upload: true, edit: false, delete: false };
  return { view: true, upload: false, edit: false, delete: false };
}

function hasPerm(act) {
  if (!current) return false;
  let p = getUserPerms(current);
  if (current.role === 'Admin' && (!current.permissions || current.permissions[act] === undefined)) return true;
  return !!p[act];
}

function canView() { return hasPerm('view'); }
function canUpload() { return hasPerm('upload'); }
function canEdit() { return hasPerm('edit'); }
function canDelete() { return hasPerm('delete'); }

const WorkflowEngine = {
  canUser(user, action, bill = null) {
    if (!user) return false;
    let r = user.role;
    switch (action) {
      case 'VIEW_PROJECTS':
      case 'VIEW_BILLS':
      case 'VIEW_PAYMENTS':
      case 'VIEW_DOCUMENTS':
      case 'VIEW_AUDIT':
        return true;
      case 'CREATE_BILL':
      case 'MODIFY_BILL':
      case 'EDIT_BILL':
      case 'FINALIZE_BILL':
      case 'REOPEN_DRAFT':
      case 'JE_SEND_FORWARD':
      case 'JE_CALL_BACK':
      case 'FORWARD_TO_AE':
        return r === 'JE';
      case 'CONTRACTOR_ACCEPT':
      case 'CONTRACTOR_MODIFY_REQUEST':
      case 'CONTRACTOR_SEND_BACK':
      case 'CONTRACTOR_SIGN_AND_SUBMIT':
        return r === 'Contractor';
      case 'AE_CHECK':
      case 'AE_RETURN':
      case 'AE_SEND_FORWARD':
      case 'AE_CALL_BACK':
        return r === 'AE';
      case 'EE_CHECK_AND_PASS':
      case 'EE_RETURN':
        return r === 'EE';
      case 'ACCOUNTS_PROCESS':
      case 'ACCOUNTS_RETURN':
      case 'ACCOUNTS_SEND_FORWARD':
      case 'ACCOUNTS_CALL_BACK':
        return r === 'Accounts Clerk';
      case 'DAO_SCRUTINIZE':
      case 'DAO_CORRECTION':
      case 'DAO_RETURN':
      case 'DAO_SEND_FORWARD':
      case 'DAO_CALL_BACK':
        return r === 'DAO';
      case 'EE_FINAL_APPROVE':
        return r === 'EE';
      case 'UPDATE_PAYMENT':
        return r === 'Accounts Clerk' || r === 'DAO' || r === 'EE' || r === 'Admin';
      default:
        return false;
    }
  },

  logAudit(billId, projectId, user, action, prevStatus, newStatus, remarks, version = 'v1') {
    let log = {
      id: 'AUDIT-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      billId,
      entityId: billId,
      projectId,
      userId: user.id,
      userName: user.name,
      role: user.role,
      action,
      previousStatus: prevStatus,
      newStatus,
      remarks: remarks || 'Action performed successfully.',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      version
    };
    db.auditLogs.unshift(log);
  },

  notify(targetRole, title, message, billId = null) {
    let n = {
      id: 'NOTIF-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      targetRole,
      title,
      message,
      billId,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    db.notifications.unshift(n);
  },

  // 1. JE Creates Bill
  createBill(user, billData) {
    if (user.role !== 'JE') {
      throw new Error('UNAUTHORIZED: Only Junior Engineer (JE) is authorized to prepare/create bills.');
    }
    let p = db.projects.find(x => x.id === Number(billData.projectId));
    if (!p) throw new Error('Project not found with ID: ' + billData.projectId);

    let billId = Date.now();
    let isDraft = !!billData.isDraft || billData.submit_action === 'draft';
    let isFinalized = !!billData.isFinalized || billData.submit_action === 'finalize';
    let status = billData.status || (isFinalized ? 'Finalized by JE' : (isDraft ? 'Draft with JE' : 'Prepared by JE – Pending Contractor Acceptance'));

    let newBill = {
      id: billId,
      billNumber: (billData.billNumber || '').trim() || ('RA Bill - ' + Date.now().toString().slice(-4)),
      projectId: p.id,
      projectName: p.name,
      contractorId: billData.contractorId || p.contractorId || 'CON-01',
      contractorName: billData.contractorName || p.contractorName || 'Registered Contractor',
      agreementNo: p.agreementNo || '01 SBD OF 2025-26',
      billType: billData.billType || 'RA Bill',
      billPeriod: billData.billPeriod || 'Current Period',
      mbNo: billData.mbNo || 'MB-01',
      mbDate: billData.mbDate || new Date().toISOString().slice(0, 10),
      preparedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      preparedBy: user.id,
      items: billData.items || [],
      grossAmount: Number(billData.grossAmount) || 0,
      deductions: billData.deductions || {
        tdsPercent: 2, tdsAmount: 0,
        gstTdsPercent: 2, gstTdsAmount: 0,
        labourCessPercent: 1, labourCessAmount: 0,
        royalty: 0,
        securityDepositPercent: 5, securityDepositAmount: 0,
        otherRecoveries: 0,
        totalDeductions: 0
      },
      netPayable: Number(billData.netPayable) || 0,
      status,
      version: 'v1',
      versions: [],
      signatureRecord: null,
      timeline: [
        {
          step: 'Created',
          role: 'JE',
          user: user.name,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          remarks: billData.remarks || 'Bill prepared and computed from Measurement Book.'
        }
      ],
      remarks: billData.remarks || ''
    };

    db.bills.unshift(newBill);
    this.logAudit(billId, p.id, user, 'CREATE_BILL', 'None', status, billData.remarks || 'Bill created.', 'v1');

    if (status === 'Prepared by JE – Pending Contractor Acceptance' || status === 'Submitted to Contractor') {
      this.notify('Contractor', 'New Bill for Acceptance', `New ${newBill.billNumber} for ${p.name} has been submitted by JE for your review and signature.`, billId);
    }
    save();
    return newBill;
  },

  // 2. Contractor Accepts Bill
  contractorAccept(user, billId) {
    if (user.role !== 'Contractor') throw new Error('UNAUTHORIZED: Only Contractor can accept the bill.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    if (b.status !== 'Prepared by JE – Pending Contractor Acceptance' && b.status !== 'Revised by JE') {
      throw new Error('INVALID STATE: Bill is not in pending acceptance status.');
    }

    let prevStatus = b.status;
    b.status = 'Contractor Accepted';
    b.timeline.push({
      step: 'Contractor Acceptance',
      role: 'Contractor',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: 'Contractor accepted the bill details. Digital Signature pending.'
    });

    this.logAudit(billId, b.projectId, user, 'CONTRACTOR_ACCEPT', prevStatus, b.status, 'Bill accepted. Proceeding to Sign & Submit.', b.version);
    save();
    return b;
  },

  // 3. Contractor Digitally Signs and Submits
  contractorSignAndSubmit(user, billId, signatureData = {}) {
    if (user.role !== 'Contractor') throw new Error('UNAUTHORIZED: Only Contractor can sign and submit.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    if (b.status !== 'Contractor Accepted' && b.status !== 'Prepared by JE – Pending Contractor Acceptance' && b.status !== 'Revised by JE' && b.status !== 'Submitted to Contractor') {
      throw new Error('INVALID STATE: Bill must be accepted by Contractor before Sign & Submit.');
    }

    let prevStatus = b.status;
    let sigHash = 'DIGITAL_SIGNATURE_DSC_' + Date.now().toString(16).toUpperCase() + '_' + Math.random().toString(36).slice(2, 8).toUpperCase();
    b.signatureRecord = {
      contractorId: user.contractorId || user.id,
      contractorName: user.name,
      rep: signatureData.rep || user.rep || user.name,
      billId: b.id,
      signatureType: 'Aadhaar / Digital DSC Electronic Verification',
      signatureStatus: 'Signed & Submitted',
      signedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      signedTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      signatureData: sigHash,
      remarks: signatureData.remarks || 'Accepted in full and digitally signed by Contractor.',
      version: b.version
    };

    b.status = 'Contractor Signed & Submitted';
    b.timeline.push({
      step: 'Contractor Signature',
      role: 'Contractor',
      user: user.name,
      date: b.signatureRecord.signedDate,
      time: b.signatureRecord.signedTime,
      remarks: 'Digitally signed and submitted. Hash: ' + sigHash
    });

    this.logAudit(billId, b.projectId, user, 'SIGN_AND_SUBMIT', prevStatus, b.status, signatureData.remarks || 'Digital signature stored.', b.version);
    this.notify('JE', 'Contractor Signed Bill', `Contractor has signed and submitted ${b.billNumber}. You may now forward it to AE.`, billId);
    save();
    return b;
  },

  // 4. Contractor Requests Modification
  contractorModifyRequest(user, billId, remarks) {
    if (user.role !== 'Contractor') throw new Error('UNAUTHORIZED: Only Contractor can request modification.');
    if (!remarks || !remarks.trim()) throw new Error('MANDATORY: Remarks are required for modification request.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    let prevStatus = b.status;
    b.status = 'Modification Requested';
    b.timeline.push({
      step: 'Modification Requested',
      role: 'Contractor',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks.trim()
    });

    this.logAudit(billId, b.projectId, user, 'MODIFICATION_REQUESTED', prevStatus, b.status, remarks.trim(), b.version);
    this.notify('JE', 'Modification Requested by Contractor', `Contractor requested modification on ${b.billNumber}: "${remarks.trim()}"`, billId);
    save();
    return b;
  },

  // 5. Contractor Sends Back to JE
  contractorSendBack(user, billId, remarks) {
    if (user.role !== 'Contractor') throw new Error('UNAUTHORIZED: Only Contractor can send back to JE.');
    if (!remarks || !remarks.trim()) throw new Error('MANDATORY: Remarks are required when sending back to JE.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    let prevStatus = b.status;
    b.status = 'Sent Back to JE';
    b.timeline.push({
      step: 'Sent Back to JE',
      role: 'Contractor',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks.trim()
    });

    this.logAudit(billId, b.projectId, user, 'SENT_BACK_TO_JE', prevStatus, b.status, remarks.trim(), b.version);
    this.notify('JE', 'Bill Sent Back by Contractor', `${b.billNumber} was sent back: "${remarks.trim()}"`, billId);
    save();
    return b;
  },

  // 6. JE Revises Bill (Creates new Version v2, v3...)
  jeReviseBill(user, billId, updatedData = {}) {
    if (user.role !== 'JE') throw new Error('UNAUTHORIZED: Only JE can revise the bill.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    if (!b.versions) b.versions = [];
    b.versions.push({
      version: b.version,
      grossAmount: b.grossAmount,
      deductions: JSON.parse(JSON.stringify(b.deductions)),
      netPayable: b.netPayable,
      items: JSON.parse(JSON.stringify(b.items)),
      archivedAt: new Date().toISOString(),
      archivedBy: user.name
    });

    let currentVNum = parseInt((b.version || 'v1').replace('v', '')) || 1;
    b.version = 'v' + (currentVNum + 1);

    if (updatedData.items) b.items = updatedData.items;
    if (updatedData.grossAmount) b.grossAmount = Number(updatedData.grossAmount);
    if (updatedData.deductions) b.deductions = updatedData.deductions;
    if (updatedData.netPayable) b.netPayable = Number(updatedData.netPayable);
    if (updatedData.mbNo) b.mbNo = updatedData.mbNo;

    b.signatureRecord = null;
    let prevStatus = b.status;
    b.status = 'Revised by JE';

    b.timeline.push({
      step: 'Revised by JE',
      role: 'JE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: `Bill revised to Version ${b.version}. Sent back to Contractor for fresh review & signature.`
    });

    this.logAudit(billId, b.projectId, user, 'REVISE_BILL', prevStatus, b.status, `Version ${b.version} created.`, b.version);
    this.notify('Contractor', 'Revised Bill Submitted', `JE has revised ${b.billNumber} to ${b.version}. Please review and Sign & Submit.`, billId);
    save();
    return b;
  },

  // JE Finalize Bill
  jeFinalizeBill(user, billId, remarks = '') {
    if (user.role !== 'JE') throw new Error('UNAUTHORIZED: Only Junior Engineer (JE) can finalize the bill.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    let allowed = ['Draft', 'Draft with JE', 'Recalled by JE', 'Modification Requested', 'Sent Back to JE', 'Returned by AE'];
    if (!allowed.includes(b.status)) {
      throw new Error('INVALID STATE: Only draft or returned bills can be finalized. Current status: ' + b.status);
    }
    let prevStatus = b.status;
    b.status = 'Finalized by JE';
    b.timeline.push({
      step: 'Bill Finalized by JE',
      role: 'JE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Bill verified, calculated, and finalized by Junior Engineer. Ready for Send Forward.'
    });
    this.logAudit(billId, b.projectId, user, 'FINALIZE_BILL', prevStatus, b.status, remarks || 'Bill finalized by JE.', b.version);
    save();
    return b;
  },

  // JE Reopen Draft
  jeReopenDraft(user, billId, remarks = '') {
    if (user.role !== 'JE') throw new Error('UNAUTHORIZED: Only Junior Engineer (JE) can reopen the draft.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    if (b.status !== 'Finalized by JE') {
      throw new Error('INVALID STATE: Only finalized bills can be reopened. Current status: ' + b.status);
    }
    let prevStatus = b.status;
    b.status = 'Draft with JE';
    b.timeline.push({
      step: 'Draft Reopened by JE',
      role: 'JE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Finalized bill reopened as draft for further modifications.'
    });
    this.logAudit(billId, b.projectId, user, 'REOPEN_DRAFT', prevStatus, b.status, remarks || 'Reopened as draft by JE.', b.version);
    save();
    return b;
  },

  // JE Edit Draft or Returned Bill
  jeEditDraftBill(user, billId, updatedData = {}, action = 'draft') {
    if (user.role !== 'JE') throw new Error('UNAUTHORIZED: Only Junior Engineer (JE) can edit the bill.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    let allowed = ['Draft', 'Draft with JE', 'Finalized by JE', 'Recalled by JE', 'Modification Requested', 'Sent Back to JE', 'Returned by AE'];
    if (!allowed.includes(b.status)) {
      throw new Error('INVALID STATE: Bill cannot be edited in status: ' + b.status);
    }
    let prevStatus = b.status;

    // If returned and modifying, archive previous version
    if (['Modification Requested', 'Sent Back to JE', 'Returned by AE'].includes(b.status)) {
      if (!b.versions) b.versions = [];
      b.versions.push({
        version: b.version || 'v1',
        grossAmount: b.grossAmount,
        deductions: JSON.parse(JSON.stringify(b.deductions || {})),
        netPayable: b.netPayable,
        items: JSON.parse(JSON.stringify(b.items || [])),
        archivedAt: new Date().toISOString(),
        archivedBy: user.name
      });
      let currentVNum = parseInt((b.version || 'v1').replace('v', '')) || 1;
      b.version = 'v' + (currentVNum + 1);
    }

    if (updatedData.projectId) {
      let p = db.projects.find(x => x.id === Number(updatedData.projectId));
      if (p) {
        b.projectId = p.id;
        b.projectName = p.name;
        b.agreementNo = p.agreementNo || b.agreementNo;
        b.contractorId = p.contractorId || b.contractorId;
        b.contractorName = p.contractorName || b.contractorName;
      }
    }
    if (updatedData.billNumber) b.billNumber = updatedData.billNumber.trim();
    if (updatedData.billType) b.billType = updatedData.billType;
    if (updatedData.mbNo) b.mbNo = updatedData.mbNo;
    if (updatedData.mbDate) b.mbDate = updatedData.mbDate;
    if (updatedData.billPeriod) b.billPeriod = updatedData.billPeriod;
    if (updatedData.items) b.items = updatedData.items;
    if (updatedData.grossAmount !== undefined) b.grossAmount = Number(updatedData.grossAmount);
    if (updatedData.deductions) b.deductions = updatedData.deductions;
    if (updatedData.netPayable !== undefined) b.netPayable = Number(updatedData.netPayable);
    if (updatedData.remarks) b.remarks = updatedData.remarks;

    if (action === 'finalize') {
      b.status = 'Finalized by JE';
    } else if (action === 'forward' || action === 'submit') {
      b.status = 'Prepared by JE – Pending Contractor Acceptance';
      b.signatureRecord = null;
      this.notify('Contractor', 'Bill Submitted for Acceptance', `JE has submitted ${b.billNumber} for your review and digital signature.`, billId);
    } else {
      b.status = 'Draft with JE';
    }

    b.timeline.push({
      step: action === 'finalize' ? 'Bill Edited & Finalized' : (action === 'forward' ? 'Bill Edited & Forwarded' : 'Draft Bill Updated'),
      role: 'JE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: updatedData.remarks || `Bill updated by JE (New Status: ${b.status}).`
    });

    this.logAudit(billId, b.projectId, user, 'EDIT_BILL', prevStatus, b.status, `Bill edited by JE. New Status: ${b.status}`, b.version);
    save();
    return b;
  },

  // JE Send Forward (Context-aware: to Contractor or to AE)
  jeSendForward(user, billId, remarks = '') {
    if (user.role !== 'JE') throw new Error('UNAUTHORIZED: Only Junior Engineer (JE) can send forward the bill.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    let prevStatus = b.status;
    if (['Draft', 'Draft with JE', 'Finalized by JE', 'Recalled by JE'].includes(b.status)) {
      b.status = 'Prepared by JE – Pending Contractor Acceptance';
      b.timeline.push({
        step: 'Send Forward to Contractor',
        role: 'JE',
        user: user.name,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        remarks: remarks || 'Forwarded by JE to Contractor for review & digital signature.'
      });
      this.logAudit(billId, b.projectId, user, 'JE_SEND_FORWARD', prevStatus, b.status, remarks || 'Forwarded to Contractor.', b.version);
      this.notify('Contractor', 'New Bill for Review & Signature', `JE has forwarded ${b.billNumber} for your acceptance and digital signing.`, billId);
      save();
      return b;
    } else if (b.status === 'Contractor Signed & Submitted') {
      return this.forwardToAE(user, billId, remarks);
    } else {
      throw new Error('INVALID STATE: Cannot send forward from current status: ' + b.status);
    }
  },

  // JE Call Back Bill (from Contractor or from AE)
  jeCallBackBill(user, billId, remarks = '') {
    if (user.role !== 'JE') throw new Error('UNAUTHORIZED: Only Junior Engineer (JE) can call back this bill.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    let prevStatus = b.status;
    if (['Prepared by JE – Pending Contractor Acceptance', 'Submitted to Contractor', 'Revised by JE', 'Contractor Accepted'].includes(b.status)) {
      b.status = 'Draft with JE';
      b.timeline.push({
        step: 'Called Back by JE',
        role: 'JE',
        user: user.name,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        remarks: remarks || 'Called back from Contractor to JE desk for adjustments.'
      });
      this.logAudit(billId, b.projectId, user, 'JE_CALL_BACK', prevStatus, b.status, remarks || 'Called back from Contractor.', b.version);
      this.notify('Contractor', 'Bill Called Back by JE', `JE has called back ${b.billNumber} for measurement adjustment before signature.`, billId);
      save();
      return b;
    } else if (['Pending AE Checking', 'Forwarded to AE'].includes(b.status)) {
      b.status = 'Contractor Signed & Submitted';
      b.timeline.push({
        step: 'Called Back by JE from AE',
        role: 'JE',
        user: user.name,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        remarks: remarks || 'Called back from Assistant Engineer to JE desk.'
      });
      this.logAudit(billId, b.projectId, user, 'JE_CALL_BACK', prevStatus, b.status, remarks || 'Called back from AE.', b.version);
      this.notify('AE', 'Bill Called Back by JE', `JE has recalled ${b.billNumber} from AE checking desk.`, billId);
      save();
      return b;
    } else {
      throw new Error('INVALID STATE: Cannot call back bill in status: ' + b.status);
    }
  },

  // 7. CRITICAL BUSINESS RULE 6: JE Forwards to AE
  // HARD BACKEND ENFORCEMENT: JE CANNOT FORWARD WITHOUT CONTRACTOR SIGN & SUBMIT!
  forwardToAE(user, billId, remarks = '') {
    if (user.role !== 'JE') throw new Error('UNAUTHORIZED: Only JE can forward bill to AE.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    if (!b.signatureRecord || b.signatureRecord.signatureStatus !== 'Signed & Submitted' || b.status !== 'Contractor Signed & Submitted') {
      throw new Error('CRITICAL WORKFLOW RULE 6 VIOLATION: JE cannot forward Bill to AE until Contractor has accepted and completed Sign & Submit.');
    }

    let prevStatus = b.status;
    b.status = 'Forwarded to AE';
    b.timeline.push({
      step: 'Forwarded to AE',
      role: 'JE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Forwarded to Assistant Engineer with Measurement Book and test reports.'
    });

    this.logAudit(billId, b.projectId, user, 'FORWARD_TO_AE', prevStatus, b.status, remarks || 'Forwarded to AE.', b.version);
    this.notify('AE', 'New Bill for Checking', `${b.billNumber} for ${b.projectName} has been forwarded by JE for technical check.`, billId);
    save();
    return b;
  },

  // 8. AE Technical Check and Forward to EE
  aeCheckAndForward(user, billId, remarks = '') {
    if (user.role !== 'AE') throw new Error('UNAUTHORIZED: Only Assistant Engineer (AE) can check and forward to EE.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    if (b.status !== 'Pending AE Checking' && b.status !== 'Forwarded to AE') throw new Error('INVALID STATE: Bill is not pending AE checking.');

    let prevStatus = b.status;
    b.status = 'AE Checked';
    b.timeline.push({
      step: 'AE Technical Check',
      role: 'AE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Measurements and quality test reports verified at site. Recommended for C&P.'
    });

    this.logAudit(billId, b.projectId, user, 'AE_CHECK', prevStatus, b.status, remarks || 'Checked by AE.', b.version);
    this.notify('EE', 'Bill Pending C&P', `AE has checked ${b.billNumber}. Pending Executive Engineer Check & Pass (C&P).`, billId);
    save();
    return b;
  },

  // 9. AE Returns Bill to JE
  aeReturnToJE(user, billId, remarks) {
    if (user.role !== 'AE') throw new Error('UNAUTHORIZED: Only AE can return bill.');
    if (!remarks || !remarks.trim()) throw new Error('MANDATORY: Return reason/remarks are required.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    let prevStatus = b.status;
    b.status = 'Returned by AE';
    b.timeline.push({
      step: 'Returned by AE',
      role: 'AE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks.trim()
    });

    this.logAudit(billId, b.projectId, user, 'AE_RETURN', prevStatus, b.status, remarks.trim(), b.version);
    this.notify('JE', 'Bill Returned by AE', `${b.billNumber} returned by AE: "${remarks.trim()}"`, billId);
    save();
    return b;
  },

  // AE Send Forward to EE
  aeSendForward(user, billId, remarks = '') {
    return this.aeCheckAndForward(user, billId, remarks);
  },

  // AE Call Back from EE
  aeCallBackFromEE(user, billId, remarks = '') {
    if (user.role !== 'AE') throw new Error('UNAUTHORIZED: Only Assistant Engineer (AE) can call back from EE.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    if (b.status !== 'AE Checked') {
      throw new Error('INVALID STATE: Can only call back bill while pending EE Check & Pass (status: AE Checked). Current: ' + b.status);
    }
    let prevStatus = b.status;
    b.status = 'Pending AE Checking';
    b.timeline.push({
      step: 'Called Back by AE from EE',
      role: 'AE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Called back from Executive Engineer for site re-inspection.'
    });
    this.logAudit(billId, b.projectId, user, 'AE_CALL_BACK', prevStatus, b.status, remarks || 'Called back from EE.', b.version);
    this.notify('EE', 'Bill Recalled by AE', `AE has called back ${b.billNumber} from C&P desk for re-checking.`, billId);
    save();
    return b;
  },

  // 10. EE Performs Check & Pass (C&P)
  eeCheckAndPass(user, billId, remarks = '') {
    if (user.role !== 'EE') throw new Error('UNAUTHORIZED: Only Executive Engineer (EE) can perform Check & Pass (C&P).');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    if (b.status !== 'AE Checked') throw new Error('INVALID STATE: Bill must be checked by AE before EE C&P.');

    let prevStatus = b.status;
    b.status = 'EE C&P Completed';
    b.timeline.push({
      step: 'EE Check & Pass (C&P)',
      role: 'EE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Checked and Passed (C&P) for technical scrutiny. Sent to Accounts Branch.'
    });

    this.logAudit(billId, b.projectId, user, 'EE_C_AND_P', prevStatus, b.status, remarks || 'C&P completed by EE.', b.version);
    this.notify('Accounts Clerk', 'New Bill for Accounts Processing', `EE has completed C&P for ${b.billNumber}. Please process deductions.`, billId);
    save();
    return b;
  },

  // 11. EE Returns Bill
  eeReturnForCorrection(user, billId, remarks) {
    if (user.role !== 'EE') throw new Error('UNAUTHORIZED: Only EE can return bill.');
    if (!remarks || !remarks.trim()) throw new Error('MANDATORY: Remarks are required when returning bill.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    let prevStatus = b.status;
    b.status = 'Returned by EE';
    b.timeline.push({
      step: 'Returned by EE',
      role: 'EE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks.trim()
    });

    this.logAudit(billId, b.projectId, user, 'EE_RETURN', prevStatus, b.status, remarks.trim(), b.version);
    this.notify('AE', 'Bill Returned by EE', `${b.billNumber} returned by EE: "${remarks.trim()}"`, billId);
    save();
    return b;
  },

  // 12. Accounts Clerk Processes Bill & Sends to DAO
  accountsProcessAndPass(user, billId, deductionData) {
    if (user.role !== 'Accounts Clerk') throw new Error('UNAUTHORIZED: Only Accounts Clerk can process accounts.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    if (b.status !== 'EE C&P Completed' && b.status !== 'Returned by DAO') {
      throw new Error('INVALID STATE: Bill must be C&P completed by EE before Accounts processing.');
    }

    if (deductionData) {
      b.deductions = deductionData;
      let totalD = (Number(deductionData.tdsAmount) || 0)
        + (Number(deductionData.gstTdsAmount) || 0)
        + (Number(deductionData.labourCessAmount) || 0)
        + (Number(deductionData.royalty) || 0)
        + (Number(deductionData.securityDepositAmount) || 0)
        + (Number(deductionData.otherRecoveries) || 0);
      b.deductions.totalDeductions = totalD;
      b.netPayable = Math.max(0, b.grossAmount - totalD);
    }

    let prevStatus = b.status;
    b.status = 'Accounts Processed – Sent to DAO';
    b.timeline.push({
      step: 'Accounts Processing',
      role: 'Accounts Clerk',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: `Deductions verified (Total Deductions: ₹${b.deductions.totalDeductions.toLocaleString('en-IN')}, Net Payable: ₹${b.netPayable.toLocaleString('en-IN')}). Sent to DAO.`
    });

    this.logAudit(billId, b.projectId, user, 'ACCOUNTS_PROCESS', prevStatus, b.status, 'Processed and passed to DAO.', b.version);
    this.notify('DAO', 'Bill for DAO Scrutiny', `Accounts Clerk has passed ${b.billNumber}. Pending DAO Scrutiny.`, billId);
    save();
    return b;
  },

  // 13. Accounts Clerk Returns Bill
  accountsReturn(user, billId, remarks) {
    if (user.role !== 'Accounts Clerk') throw new Error('UNAUTHORIZED: Only Accounts Clerk can return bill.');
    if (!remarks || !remarks.trim()) throw new Error('MANDATORY: Return remarks required.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    let prevStatus = b.status;
    b.status = 'Returned by Accounts Clerk';
    b.timeline.push({
      step: 'Returned by Accounts',
      role: 'Accounts Clerk',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks.trim()
    });

    this.logAudit(billId, b.projectId, user, 'ACCOUNTS_RETURN', prevStatus, b.status, remarks.trim(), b.version);
    this.notify('EE', 'Bill Returned by Accounts', `${b.billNumber} returned by Accounts: "${remarks.trim()}"`, billId);
    save();
    return b;
  },

  // Accounts Clerk Send Forward to DAO
  accountsSendForward(user, billId, deductionData = null, remarks = '') {
    return this.accountsProcessAndPass(user, billId, deductionData);
  },

  // Accounts Clerk Call Back from DAO
  accountsCallBackFromDAO(user, billId, remarks = '') {
    if (user.role !== 'Accounts Clerk') throw new Error('UNAUTHORIZED: Only Accounts Clerk can call back from DAO.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    if (b.status !== 'Accounts Processed – Sent to DAO' && b.status !== 'Under DAO Scrutiny') {
      throw new Error('INVALID STATE: Can only call back bill while pending DAO checking. Current status: ' + b.status);
    }
    let prevStatus = b.status;
    b.status = 'EE C&P Completed';
    b.timeline.push({
      step: 'Called Back by Accounts Clerk from DAO',
      role: 'Accounts Clerk',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Called back from DAO desk for deduction recalculation.'
    });
    this.logAudit(billId, b.projectId, user, 'ACCOUNTS_CALL_BACK', prevStatus, b.status, remarks || 'Called back from DAO.', b.version);
    this.notify('DAO', 'Bill Recalled by Accounts', `Accounts Clerk has called back ${b.billNumber} for deduction revision.`, billId);
    save();
    return b;
  },

  // 14. DAO Scrutinizes Bill & Forwards to EE
  daoScrutinizeAndCheck(user, billId, corrections, remarks) {
    if (user.role !== 'DAO') throw new Error('UNAUTHORIZED: Only Divisional Accounts Officer (DAO) can perform DAO scrutiny.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    if (b.status !== 'Accounts Processed – Sent to DAO') {
      throw new Error('INVALID STATE: Bill must be processed by Accounts Clerk before DAO checking.');
    }

    if (corrections && Object.keys(corrections).length) {
      if (!b.daoCorrections) b.daoCorrections = [];
      b.daoCorrections.push({
        date: new Date().toISOString(),
        corrections,
        remarks: remarks || 'DAO adjustments applied.'
      });
      if (corrections.deductions) {
        b.deductions = corrections.deductions;
        b.netPayable = Math.max(0, b.grossAmount - b.deductions.totalDeductions);
      }
    }

    let prevStatus = b.status;
    b.status = 'DAO Checked – Pending EE Final Approval';
    b.timeline.push({
      step: 'DAO Financial Scrutiny',
      role: 'DAO',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Financial scrutiny completed. Statutory recoveries verified. Recommended for EE Final Approval.'
    });

    this.logAudit(billId, b.projectId, user, 'DAO_CHECK', prevStatus, b.status, remarks || 'DAO Scrutiny completed.', b.version);
    this.notify('EE', 'Bill Ready for Final Approval', `DAO has scrutinised ${b.billNumber}. Awaiting your Final Approval.`, billId);
    save();
    return b;
  },

  // 15. DAO Returns Bill
  daoReturn(user, billId, remarks) {
    if (user.role !== 'DAO') throw new Error('UNAUTHORIZED: Only DAO can return bill.');
    if (!remarks || !remarks.trim()) throw new Error('MANDATORY: Remarks required when returning from DAO.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');

    let prevStatus = b.status;
    b.status = 'Returned by DAO';
    b.timeline.push({
      step: 'Returned by DAO',
      role: 'DAO',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks.trim()
    });

    this.logAudit(billId, b.projectId, user, 'DAO_RETURN', prevStatus, b.status, remarks.trim(), b.version);
    this.notify('Accounts Clerk', 'Bill Returned by DAO', `${b.billNumber} returned by DAO for re-check: "${remarks.trim()}"`, billId);
    save();
    return b;
  },

  // DAO Send Forward to EE for Final Sanction
  daoSendForward(user, billId, corrections = null, remarks = '') {
    return this.daoScrutinizeAndCheck(user, billId, corrections, remarks);
  },

  // DAO Call Back from EE
  daoCallBackFromEE(user, billId, remarks = '') {
    if (user.role !== 'DAO') throw new Error('UNAUTHORIZED: Only Divisional Accounts Officer (DAO) can call back from EE.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    if (b.status !== 'DAO Checked – Pending EE Final Approval') {
      throw new Error('INVALID STATE: Can only call back bill while pending EE Final Approval. Current status: ' + b.status);
    }
    let prevStatus = b.status;
    b.status = 'Accounts Processed – Sent to DAO';
    b.timeline.push({
      step: 'Called Back by DAO from EE',
      role: 'DAO',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Called back from Executive Engineer for audit sheet adjustment.'
    });
    this.logAudit(billId, b.projectId, user, 'DAO_CALL_BACK', prevStatus, b.status, remarks || 'Called back from EE.', b.version);
    this.notify('EE', 'Bill Recalled by DAO', `DAO has called back ${b.billNumber} for audit reconciliation.`, billId);
    save();
    return b;
  },

  // 16. EE Grants Final Approval
  eeFinalApprove(user, billId, remarks = '') {
    if (user.role !== 'EE') throw new Error('UNAUTHORIZED: Only Executive Engineer can give Final Approval.');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found.');
    if (b.status !== 'DAO Checked – Pending EE Final Approval') {
      throw new Error('INVALID STATE: Bill must be checked by DAO before Final Approval.');
    }

    let prevStatus = b.status;
    b.status = 'Approved by Executive Engineer';
    b.timeline.push({
      step: 'EE Final Approval',
      role: 'EE',
      user: user.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Final Approval granted by Executive Engineer. Moving to Payment & CFMS processing.'
    });

    let existingPay = db.payments.find(p => p.billId === b.id);
    if (!existingPay) {
      let payId = 'PAY-' + Date.now().toString().slice(-6);
      let payRecord = {
        id: payId,
        billId: b.id,
        projectId: b.projectId,
        projectName: b.projectName,
        contractor: b.contractorName,
        billNumber: b.billNumber,
        billType: b.billType,
        billDate: b.preparedDate,
        grossAmount: b.grossAmount,
        totalDeduction: b.deductions.totalDeductions,
        netPayableAmount: b.netPayable,
        eeApprovalDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        paymentSentDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        cfmsNumber: 'CFMS/2026/HIL/' + Math.floor(10000 + Math.random() * 90000),
        voucherNumber: 'VR-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
        paymentStatus: 'Approved by EE',
        paymentDate: '',
        paidAmount: 0,
        pendingAmount: b.netPayable,
        remarks: 'Final approved by EE. Dispatched to treasury / CFMS pipeline.'
      };
      db.payments.unshift(payRecord);
    }

    this.logAudit(billId, b.projectId, user, 'EE_FINAL_APPROVE', prevStatus, b.status, remarks || 'Final Approval given. Payment record initialized.', b.version);
    this.notify('Contractor', 'Bill Approved for Payment', `Your ${b.billNumber} has received Final Approval from Executive Engineer and is queued for payment.`, billId);
    this.notify('Accounts Clerk', 'Bill Approved – Generate Voucher', `${b.billNumber} has received EE Final Approval. Process CFMS payment.`, billId);
    save();
    return b;
  },

  updatePayment(user, payId, updates = {}) {
    if (!['Accounts Clerk', 'DAO', 'EE', 'Admin'].includes(user.role)) {
      throw new Error('UNAUTHORIZED: You do not have permission to update payment status.');
    }
    let p = db.payments.find(x => x.id === payId);
    if (!p) throw new Error('Payment record not found.');

    let prevStatus = p.paymentStatus;
    if (updates.paymentStatus) p.paymentStatus = updates.paymentStatus;
    if (updates.cfmsNumber) p.cfmsNumber = updates.cfmsNumber.trim();
    if (updates.voucherNumber) p.voucherNumber = updates.voucherNumber.trim();
    if (updates.paidAmount !== undefined) {
      p.paidAmount = Number(updates.paidAmount);
      p.pendingAmount = Math.max(0, p.netPayableAmount - p.paidAmount);
    }
    if (updates.paymentDate) p.paymentDate = updates.paymentDate;
    if (updates.remarks) p.remarks = updates.remarks.trim();

    if (p.paymentStatus === 'Paid' && !p.paymentDate) {
      p.paymentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      p.paidAmount = p.netPayableAmount;
      p.pendingAmount = 0;
    }

    let b = db.bills.find(x => x.id === p.billId);
    if (b) {
      if (p.paymentStatus === 'Paid') {
        b.status = 'Paid';
        b.timeline.push({
          step: 'Payment Completed',
          role: 'Accounts',
          user: user.name,
          date: p.paymentDate,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          remarks: `Payment of ₹${p.paidAmount.toLocaleString('en-IN')} disbursed via CFMS (Voucher: ${p.voucherNumber}, CFMS: ${p.cfmsNumber}).`
        });
      } else if (p.paymentStatus === 'Under CFMS Processing') {
        b.status = 'Under CFMS Processing';
      }
    }

    this.logAudit(p.billId, p.projectId, user, 'PAYMENT_UPDATE', prevStatus, p.paymentStatus, `Payment status updated to ${p.paymentStatus}.`, 'v1');
    this.notify('Contractor', 'Payment Status Update', `Payment for ${p.billNumber} is now: ${p.paymentStatus} (Voucher: ${p.voucherNumber || 'Under Generation'}).`, p.billId);
    save();
    return p;
  },

  // === ENHANCED ADAPTERS & HELPERS ===
  calculateStandardDeductions(gross) {
    let g = Number(gross) || 0;
    let it = Math.round(g * 0.02);
    let gst = Math.round(g * 0.02);
    let cess = Math.round(g * 0.01);
    let sd = Math.round(g * 0.05);
    let royalty = 0;
    let other = 0;
    let total = it + gst + cess + sd + royalty + other;
    return {
      tdsPercent: 2, tdsAmount: it, incomeTax: it,
      gstTdsPercent: 2, gstTdsAmount: gst, gstTds: gst,
      labourCessPercent: 1, labourCessAmount: cess, labourCess: cess,
      securityDepositPercent: 5, securityDepositAmount: sd, securityDeposit: sd,
      royalty: royalty,
      otherRecoveries: other,
      totalDeductions: total
    };
  },

  resolveUser(userOrId, defaultRole = 'JE') {
    if (userOrId && typeof userOrId === 'object' && userOrId.role) return userOrId;
    if (typeof userOrId === 'string') {
      let u = (db.users || []).find(x => x.id === userOrId || (x.role && x.role.toLowerCase() === userOrId.toLowerCase()));
      if (u) return u;
    }
    if (typeof current !== 'undefined' && current && current.role) return current;
    let uDefault = (db.users || []).find(x => x.role === defaultRole || (x.role && x.role.toLowerCase().startsWith(defaultRole.toLowerCase())));
    return uDefault || { id: 'SYS-' + defaultRole, name: defaultRole + ' Officer', role: defaultRole };
  },

  jeCreateBill(billData, userArg) {
    let u = this.resolveUser(userArg, 'JE');
    if (billData && billData.items && !billData.grossAmount) {
      billData.grossAmount = billData.items.reduce((sum, it) => {
        let qty = Number(it.thisBillQty !== undefined ? it.thisBillQty : it.executedQty) || 0;
        let rate = Number(it.boqRate !== undefined ? it.boqRate : it.rate) || 0;
        return sum + (qty * rate);
      }, 0);
    }
    let b = this.createBill(u, billData);
    b.status = billData.status || 'Draft with JE';
    save();
    return b;
  },

  jeSubmitToContractor(billId, remarks, userArg) {
    let u = this.resolveUser(userArg, 'JE');
    let b = db.bills.find(x => x.id === billId);
    if (!b) throw new Error('Bill not found: ' + billId);
    b.status = 'Submitted to Contractor';
    b.timeline.push({
      step: 'Submitted to Contractor',
      role: 'JE',
      user: u.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'Submitted to contractor for review and acceptance.'
    });
    this.logAudit(billId, b.projectId, u, 'SUBMIT_TO_CONTRACTOR', 'Draft with JE', b.status, remarks, b.version);
    save();
    return b;
  },

  eePassToAccounts(billIdOrUser, optionsOrRemarks, userArg) {
    if (billIdOrUser && typeof billIdOrUser === 'object' && billIdOrUser.role) {
      return this.eeCheckAndPass(billIdOrUser, optionsOrRemarks, userArg);
    }
    let u = this.resolveUser(userArg, 'EE');
    let remarks = typeof optionsOrRemarks === 'string' ? optionsOrRemarks : (optionsOrRemarks?.remarks || '');
    let b = db.bills.find(x => x.id === billIdOrUser);
    if (!b) throw new Error('Bill not found: ' + billIdOrUser);
    let prev = b.status;
    b.status = 'Under Accounts Scrutiny';
    b.timeline.push({
      step: 'EE Check & Pass (C&P)',
      role: 'EE',
      user: u.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: remarks || 'C&P 10% test check done. Quality found compliant. Forwarded to Accounts Clerk.'
    });
    this.logAudit(b.id, b.projectId, u, 'EE_C_AND_P', prev, b.status, remarks, b.version);
    save();
    return b;
  },

  accountsClerkProcess(billIdOrUser, options, userArg) {
    if (billIdOrUser && typeof billIdOrUser === 'object' && billIdOrUser.role) {
      return this.accountsProcessAndPass(billIdOrUser, options, userArg);
    }
    let u = this.resolveUser(userArg, 'Accounts Clerk');
    let b = db.bills.find(x => x.id === billIdOrUser);
    if (!b) throw new Error('Bill not found: ' + billIdOrUser);
    if (options && options.deductions) {
      b.deductions = options.deductions;
      b.netPayable = Math.max(0, b.grossAmount - (options.deductions.totalDeductions || 0));
    }
    let prev = b.status;
    b.status = 'Under DAO Scrutiny';
    b.timeline.push({
      step: 'Accounts Processing',
      role: 'Accounts Clerk',
      user: u.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: options?.remarks || 'Statutory deductions checked. Sent to DAO for audit.'
    });
    this.logAudit(b.id, b.projectId, u, 'ACCOUNTS_PROCESS', prev, b.status, options?.remarks, b.version);
    save();
    return b;
  },

  daoScrutiny(billIdOrUser, options, userArg) {
    if (billIdOrUser && typeof billIdOrUser === 'object' && billIdOrUser.role) {
      return this.daoScrutinizeAndCheck(billIdOrUser, options, userArg);
    }
    let u = this.resolveUser(userArg, 'DAO');
    let b = db.bills.find(x => x.id === billIdOrUser);
    if (!b) throw new Error('Bill not found: ' + billIdOrUser);
    let prev = b.status;
    b.status = 'DAO Passed to EE';
    b.timeline.push({
      step: 'DAO Financial Scrutiny',
      role: 'DAO',
      user: u.name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      remarks: options?.auditRemarks || 'Pre-audit completed. Forwarded to EE for final sanction.'
    });
    this.logAudit(b.id, b.projectId, u, 'DAO_CHECK', prev, b.status, options?.auditRemarks, b.version);
    save();
    return b;
  },

  updatePaymentStatus(payIdOrUser, updates, userArg) {
    if (payIdOrUser && typeof payIdOrUser === 'object' && payIdOrUser.role) {
      return this.updatePayment(payIdOrUser, updates, userArg);
    }
    let u = this.resolveUser(userArg, 'Accounts Clerk');
    let p = db.payments.find(x => x.id === payIdOrUser || x.billId === payIdOrUser);
    if (!p) throw new Error('Payment record not found.');
    let prev = p.paymentStatus;
    if (updates.cfmsStatus) p.cfmsStatus = updates.cfmsStatus;
    if (updates.paymentStatus) p.paymentStatus = updates.paymentStatus;
    if (updates.utrNo) p.utrNo = updates.utrNo;
    if (updates.bankName) p.bankName = updates.bankName;
    if (updates.paidAt) p.paymentDate = updates.paidAt;
    
    if (updates.cfmsStatus === 'Paid / Advice Generated' || updates.paymentStatus === 'Paid') {
      p.paidAmount = p.netPayableAmount || p.amount || 0;
      p.pendingAmount = 0;
      p.paymentStatus = 'Paid';
      let b = db.bills.find(x => x.id === p.billId);
      if (b) {
        b.status = 'Paid';
        b.timeline.push({
          step: 'Disbursement Completed',
          role: 'Accounts',
          user: u.name,
          date: updates.paidAt || new Date().toLocaleDateString('en-GB'),
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          remarks: 'Payment cleared through CFMS. UTR: ' + (updates.utrNo || 'N/A')
        });
      }
    }
    this.logAudit(p.billId, p.projectId, u, 'PAYMENT_UPDATE', prev, p.paymentStatus, 'CFMS status updated', 'v1');
    save();
    return p;
  }
};

// Capture raw original methods
const _orig_forwardToAE = WorkflowEngine.forwardToAE;
const _orig_contractorSendBack = WorkflowEngine.contractorSendBack;
const _orig_contractorSignAndSubmit = WorkflowEngine.contractorSignAndSubmit;
const _orig_jeReviseBill = WorkflowEngine.jeReviseBill;
const _orig_aeCheckAndForward = WorkflowEngine.aeCheckAndForward;
const _orig_eeFinalApprove = WorkflowEngine.eeFinalApprove;

// Attach non-recursive polymorphic dispatchers
WorkflowEngine.forwardToAE = function(a1, a2, a3) {
  if (a1 && typeof a1 === 'object' && a1.role) return _orig_forwardToAE.call(this, a1, a2, a3);
  let u = this.resolveUser(a3, 'JE');
  return _orig_forwardToAE.call(this, u, a1, a2);
};

WorkflowEngine.contractorSendBack = function(a1, a2, a3) {
  if (a1 && typeof a1 === 'object' && a1.role) return _orig_contractorSendBack.call(this, a1, a2, a3);
  let u = this.resolveUser(a3, 'Contractor');
  let b = _orig_contractorSendBack.call(this, u, a1, typeof a2 === 'string' ? a2 : (a2?.remarks || 'Send back'));
  b.status = 'Draft with JE';
  save();
  return b;
};

WorkflowEngine.contractorSignAndSubmit = function(a1, a2, a3) {
  if (a1 && typeof a1 === 'object' && a1.role) return _orig_contractorSignAndSubmit.call(this, a1, a2, a3);
  let u = this.resolveUser(a3, 'Contractor');
  return _orig_contractorSignAndSubmit.call(this, u, a1, a2);
};

WorkflowEngine.jeReviseBill = function(a1, a2, a3) {
  if (a1 && typeof a1 === 'object' && a1.role) return _orig_jeReviseBill.call(this, a1, a2, a3);
  let u = this.resolveUser(a3, 'JE');
  let b = _orig_jeReviseBill.call(this, u, a1, a2);
  b.versionNumber = b.version;
  save();
  return b;
};

WorkflowEngine.aeCheckAndForward = function(a1, a2, a3) {
  if (a1 && typeof a1 === 'object' && a1.role) return _orig_aeCheckAndForward.call(this, a1, a2, a3);
  let u = this.resolveUser(a3, 'AE');
  let remarks = typeof a2 === 'string' ? a2 : (a2?.remarks || 'AE check passed');
  let b = db.bills.find(x => x.id === a1);
  if (!b) throw new Error('Bill not found');
  let prev = b.status;
  b.status = 'Forwarded to EE';
  b.timeline.push({
    step: 'AE Technical Check',
    role: 'AE',
    user: u.name,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    remarks
  });
  this.logAudit(b.id, b.projectId, u, 'AE_CHECK', prev, b.status, remarks, b.version);
  save();
  return b;
};

WorkflowEngine.eeFinalApprove = function(a1, a2, a3) {
  if (a1 && typeof a1 === 'object' && a1.role) return _orig_eeFinalApprove.call(this, a1, a2, a3);
  let u = this.resolveUser(a3, 'EE');
  let remarks = typeof a2 === 'string' ? a2 : (a2?.approvalRemarks || a2?.remarks || 'Sanctioned');
  let b = db.bills.find(x => x.id === a1);
  if (!b) throw new Error('Bill not found: ' + a1);
  let prev = b.status;
  b.status = 'EE Final Approved';
  b.timeline.push({
    step: 'EE Final Approval',
    role: 'EE',
    user: u.name,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    remarks
  });

  let existingPay = db.payments.find(p => p.billId === b.id);
  if (!existingPay) {
    let payId = 'PAY-' + Date.now().toString().slice(-6);
    let payRecord = {
      id: payId,
      billId: b.id,
      projectId: b.projectId,
      projectName: b.projectName,
      contractor: b.contractorName,
      billNumber: b.billNumber,
      billType: b.billType,
      billDate: b.preparedDate,
      grossAmount: b.grossAmount,
      amount: b.netPayable,
      totalDeduction: b.deductions?.totalDeductions || 0,
      netPayableAmount: b.netPayable,
      eeApprovalDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      paymentSentDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      cfmsNumber: 'CFMS/2026/HIL/' + Math.floor(10000 + Math.random() * 90000),
      voucherNumber: 'VR-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
      cfmsStatus: 'Ready for CFMS Push',
      paymentStatus: 'Approved by EE',
      paymentDate: '',
      paidAmount: 0,
      pendingAmount: b.netPayable,
      remarks: 'Final approved by EE. Dispatched to treasury / CFMS pipeline.'
    };
    db.payments.unshift(payRecord);
  }
  this.logAudit(b.id, b.projectId, u, 'EE_FINAL_APPROVE', prev, b.status, remarks, b.version);
  save();
  return b;
};

if (typeof window !== 'undefined') {
  window.WorkflowEngine = WorkflowEngine;
}
if (typeof globalThis !== 'undefined') {
  globalThis.WorkflowEngine = WorkflowEngine;
}


// ============================================================================
// PART 3: NAVIGATION, QUICK ROLE SWITCHER, AND 7 ROLE DASHBOARDS
// ============================================================================

function nav() {
  let items = [
    ['dashboard', '📊 Dashboard'],
    ['project-info', '📁 Project Information'],
    ['project-docs', '📄 Project Documents'],
    ['billing', '📑 Billing & Workflow'],
    ['payments', '💳 Payment Status'],
    ['notifications', '🔔 Notifications' + renderUnreadBadge()],
    ['activity-log', '📜 History / Activity Log']
  ];

  if (current && (current.role === 'Admin' || current.role === 'EE')) {
    items.push(['offices', '🏢 Office Management']);
    items.push(['users', '👥 User Administration']);
    items.push(['roles', '🛡️ Role Management']);
    items.push(['letters', '✉️ Letter Register']);
  }

  return items.map(([id, n]) => `<button class="${view === id ? 'active' : ''}" onclick="go('${id}')">${n}</button>`).join('');
}

function renderUnreadBadge() {
  if (!current) return '';
  let unread = (db.notifications || []).filter(n => !n.read && (n.targetRole === current.role || n.targetRole === 'All')).length;
  if (!unread) return '';
  return ` <span class="badge-unread">${unread}</span>`;
}

function title() {
  const map = {
    dashboard: 'Role-Based Dashboard',
    'project-info': 'Project Information Master',
    'project-docs': 'Project Documents Management',
    billing: 'Billing & Scrutiny Workflow',
    payments: 'Payment Status & CFMS Tracking',
    notifications: 'Departmental Notifications',
    'activity-log': 'Audit Trail & Activity Log',
    offices: 'Office & Sub-Division Management',
    users: 'User Administration',
    roles: 'Role & Permissions Management',
    letters: 'Letter Register'
  };
  return map[view] || 'RCD Road Division Hilsa';
}

function go(x) {
  view = x;
  activeProject = null;
  activeFolder = null;
  render();
}

function logout() {
  current = null;
  activeFolder = null;
  render();
}

function switchRole(roleKey) {
  let targetUser = db.users.find(u => u.role === roleKey && u.approved);
  if (!targetUser) {
    if (roleKey === 'Contractor') targetUser = defaultUsers.find(u => u.role === 'Contractor');
    else if (roleKey === 'JE') targetUser = defaultUsers.find(u => u.role === 'JE');
    else if (roleKey === 'AE') targetUser = defaultUsers.find(u => u.role === 'AE');
    else if (roleKey === 'EE') targetUser = defaultUsers.find(u => u.role === 'EE');
    else if (roleKey === 'Accounts Clerk') targetUser = defaultUsers.find(u => u.role === 'Accounts Clerk');
    else if (roleKey === 'DAO') targetUser = defaultUsers.find(u => u.role === 'DAO');
    else targetUser = defaultUsers[0];
  }
  if (targetUser) {
    current = targetUser;
    showToast(`Switched to ${targetUser.name} (${targetUser.role})`);
    render();
  }
}

function renderRoleSwitcher() {
  const roles = [
    { key: 'Contractor', label: '🏗️ Contractor' },
    { key: 'JE', label: '📐 JE' },
    { key: 'AE', label: '🔍 AE' },
    { key: 'EE', label: '🛡️ EE' },
    { key: 'Accounts Clerk', label: '📑 Accounts Clerk' },
    { key: 'DAO', label: '⚖️ DAO' },
    { key: 'Admin', label: '⚙️ Admin' }
  ];

  return `<div class="role-switcher-bar">
    <span class="switcher-label">⚡ Test as Role:</span>
    <div class="switcher-buttons">
      ${roles.map(r => `<button class="role-switch-btn ${current && current.role === r.key ? 'active' : ''}" onclick="switchRole('${r.key}')" title="Test workflow as ${r.key}">${r.label}</button>`).join('')}
    </div>
  </div>`;
}

function login() {
  document.querySelector('#app').innerHTML = `<section class="login">
    <div class="login-card">
      <aside class="brand-pane">
        <div class="seal">RCD</div>
        <h1>Road Construction Department<br><span style="font-size:16px;font-weight:600;opacity:0.9">Road Division Hilsa, Bihar</span></h1>
        <p>Office File, Project, Billing & Payment Management System</p>
        <div class="office-list">
          <div>● Office of Executive Engineer, Hilsa</div>
          <div>● Sub-Division Hilsa</div>
          <div>● Sub-Division Chandi</div>
          <div>● Sub-Division Rajgir</div>
          <div>● Divisional Accounts Branch</div>
        </div>
      </aside>
      <div class="login-form-pane" style="padding:32px">
        <form class="login-form" id="login-form">
          <h2>Departmental Sign In</h2>
          <p>अधिकृत यूजर ID एवं पासवर्ड से लॉगिन करें।</p>
          <div class="field">
            <label>User ID</label>
            <input id="uid" required placeholder="e.g. JE-HIL-01 / CON-01">
          </div>
          <div class="field">
            <label>Password</label>
            <input id="pass" type="password" required placeholder="Password">
          </div>
          <button class="primary full" style="margin-top:10px">Secure Login</button>
          <div id="login-msg"></div>
        </form>

        <div class="demo-login-box" style="margin-top:24px;border-top:1px solid #dce8f1;padding-top:18px">
          <b style="font-size:12px;color:var(--navy);display:block;margin-bottom:8px">1-Click Test Demo Accounts (All 7 Roles):</b>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
            <button type="button" class="secondary small" onclick="quickLogin('CON-01','contractor123')">🏗️ Contractor (CON-01)</button>
            <button type="button" class="secondary small" onclick="quickLogin('JE-HIL-01','je123')">📐 JE (JE-HIL-01)</button>
            <button type="button" class="secondary small" onclick="quickLogin('AE-HIL-01','ae123')">🔍 AE (AE-HIL-01)</button>
            <button type="button" class="secondary small" onclick="quickLogin('EE-HIL-01','ee123')">🛡️ EE (EE-HIL-01)</button>
            <button type="button" class="secondary small" onclick="quickLogin('ACC-HIL-01','clerk123')">📑 Accounts Clerk</button>
            <button type="button" class="secondary small" onclick="quickLogin('DAO-HIL-01','dao123')">⚖️ DAO (DAO-HIL-01)</button>
          </div>
          <button type="button" class="secondary small full" style="margin-top:6px" onclick="quickLogin('ADM-HIL-01','admin123')">⚙️ System Administrator (ADM-HIL-01)</button>
        </div>
      </div>
    </div>
  </section>${modal || ''}`;

  let formEl = document.querySelector('#login-form');
  if (formEl) {
    formEl.onsubmit = e => {
      e.preventDefault();
      let uidVal = document.querySelector('#uid')?.value?.trim() || '';
      let passVal = document.querySelector('#pass')?.value || '';
      let u = db.users.find(x => x.id.toLowerCase() === uidVal.toLowerCase() && x.password === passVal);
      if (!u) return msg('Invalid User ID or password.');
      if (!u.approved) return msg('यह account अभी Admin approval की प्रतीक्षा में है।');
      current = u;
      view = 'dashboard';
      render();
    };
  }
}

function quickLogin(uid, pass) {
  let u = db.users.find(x => x.id === uid);
  if (u) {
    current = u;
    view = 'dashboard';
    showToast(`Logged in as ${u.name} (${u.role})`);
    render();
  }
}

function msg(t) {
  let el = document.querySelector('#login-msg');
  if (el) el.innerHTML = `<p class="small" style="color:#bf3c3c;margin-top:10px;font-weight:600">${t}</p>`;
}

function permitted(p) {
  if (!canView()) return false;
  if (!current) return false;
  if (current.role === 'Admin' || current.role === 'EE' || current.role === 'DAO' || current.role === 'Accounts Clerk') return true;
  if (current.role === 'Contractor') {
    return p.contractorId === current.contractorId || p.contractorId === current.id || (p.access && p.access.includes(current.id));
  }
  let uOffs = getUserOffices(current);
  if (uOffs.includes(p.office) || uOffs.includes(p.subDivision)) return true;
  return (p.access && p.access.includes(current.id)) || p.createdBy === current.id;
}

// Main Page Routing
function page() {
  switch (view) {
    case 'dashboard': return dashboard();
    case 'project-info': return projectInfoMasterView();
    case 'project-docs': return projectDocsView();
    case 'billing': return billingView();
    case 'payments': return paymentStatusView();
    case 'notifications': return notificationsView();
    case 'activity-log': return activityLogView();
    case 'offices': return officeManagement();
    case 'users': return users();
    case 'roles': return roles();
    case 'letters': return letters();
    default: return dashboard();
  }
}

// Unified Role-Tailored Dashboard Controller
function dashboard() {
  switch (current.role) {
    case 'Contractor': return contractorDashboard();
    case 'JE': return jeDashboard();
    case 'AE': return aeDashboard();
    case 'EE': return eeDashboard();
    case 'Accounts Clerk': return accountsClerkDashboard();
    case 'DAO': return daoDashboard();
    case 'Admin': return adminDashboard();
    default: return genericDashboard();
  }
}

// 1. CONTRACTOR DASHBOARD
function contractorDashboard() {
  let myProjects = db.projects.filter(permitted);
  let myBills = db.bills.filter(b => b.contractorId === current.contractorId || b.contractorId === current.id);
  let pendingAccept = myBills.filter(b => b.status === 'Prepared by JE – Pending Contractor Acceptance' || b.status === 'Revised by JE');
  let modRequested = myBills.filter(b => b.status === 'Modification Requested' || b.status === 'Sent Back to JE');
  let pendingSign = myBills.filter(b => b.status === 'Contractor Accepted');
  let underProcess = myBills.filter(b => ['Contractor Signed & Submitted', 'Pending AE Checking', 'AE Checked', 'EE C&P Completed', 'Accounts Processed – Sent to DAO', 'DAO Checked – Pending EE Final Approval'].includes(b.status));
  let approved = myBills.filter(b => b.status === 'Approved by Executive Engineer' || b.status === 'Paid');
  let myPayments = db.payments.filter(p => p.contractor === current.name || myBills.some(b => b.id === p.billId));
  let totalPaid = myPayments.filter(p => p.paymentStatus === 'Paid').reduce((s, p) => s + (p.paidAmount || 0), 0);

  return `<div class="page-head">
    <div>
      <h3>Contractor Portal · ${esc(current.name)}</h3>
      <p>Authorized Representative: <b>${esc(current.rep || current.name)}</b> · Road Division Hilsa</p>
    </div>
    <button class="primary" onclick="go('billing')">View My Bills ➔</button>
  </div>

  <div class="grid">
    <div class="metric metric-clickable" onclick="go('project-info')">
      <label>My Active Projects</label>
      <strong>${myProjects.length}</strong>
      <span>Awarded Road Works ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--amber)">
      <label>Pending Acceptance</label>
      <strong style="color:var(--amber)">${pendingAccept.length}</strong>
      <span>Action required to review ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')">
      <label>Modification Requests</label>
      <strong>${modRequested.length}</strong>
      <span>Sent back to JE ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--blue)">
      <label>Under Departmental Process</label>
      <strong>${underProcess.length}</strong>
      <span>AE / EE / Accounts / DAO ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('payments')" style="border-left:4px solid var(--green)">
      <label>Disbursed Amount (Paid)</label>
      <strong style="color:var(--green)">${formatCurrency(totalPaid)}</strong>
      <span>Treasury / CFMS Disbursed ➔</span>
    </div>
  </div>

  <div class="two-col" style="margin-top:18px">
    <section class="panel">
      <h4>Actionable Bills for Contractor Review & Signature</h4>
      <div class="panel-sub">Bills submitted by Junior Engineer requiring your acceptance or digital signature</div>
      ${renderBillsMiniTable(pendingAccept.concat(pendingSign))}
    </section>

    <section class="panel">
      <h4>Contractor Quick Operations</h4>
      <div class="panel-sub">Workflow Shortcuts</div>
      <button class="primary full" onclick="go('billing')">📑 Review Pending Bills & Sign</button><br><br>
      <button class="secondary full" onclick="go('project-info')">📁 View Project Information & Agreements</button><br><br>
      <button class="secondary full" onclick="go('payments')">💳 Track Payment Vouchers & CFMS Status</button>
    </section>
  </div>`;
}

// 2. JUNIOR ENGINEER (JE) DASHBOARD
function jeDashboard() {
  let myProjects = db.projects.filter(permitted);
  let myBills = db.bills.filter(b => b.preparedBy === current.id || myProjects.some(p => p.id === b.projectId));
  let drafts = myBills.filter(b => b.status === 'Draft');
  let contractorPending = myBills.filter(b => b.status === 'Prepared by JE – Pending Contractor Acceptance' || b.status === 'Revised by JE');
  let modRequests = myBills.filter(b => b.status === 'Modification Requested' || b.status === 'Sent Back to JE');
  let signedBills = myBills.filter(b => b.status === 'Contractor Signed & Submitted');
  let aePending = myBills.filter(b => b.status === 'Pending AE Checking');

  return `<div class="page-head">
    <div>
      <h3>Junior Engineer (JE) Portal · ${esc(current.name)}</h3>
      <p>Office: <b>${esc(current.office)}</b> · Bill Preparation & Measurement Book (MB) Officer</p>
    </div>
    <button class="primary" onclick="openCreateBillModal()">+ Create New Bill</button>
  </div>

  <div class="grid">
    <div class="metric metric-clickable" onclick="go('project-info')">
      <label>Assigned Road Works</label>
      <strong>${myProjects.length}</strong>
      <span>Sub-Division Projects ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')">
      <label>Draft Bills</label>
      <strong>${drafts.length}</strong>
      <span>In-progress measurements ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--amber)">
      <label>Pending Contractor Acceptance</label>
      <strong style="color:var(--amber)">${contractorPending.length}</strong>
      <span>Awaiting contractor review ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--red)">
      <label>Modification Requests</label>
      <strong style="color:var(--red)">${modRequests.length}</strong>
      <span>Needs JE Revision ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--green)">
      <label>Contractor Signed & Submitted</label>
      <strong style="color:var(--green)">${signedBills.length}</strong>
      <span>Ready to Forward to AE ➔</span>
    </div>
  </div>

  <div class="two-col" style="margin-top:18px">
    <section class="panel">
      <h4>Signed Bills Ready to Forward to AE (Rule 6 Gate)</h4>
      <div class="panel-sub">Contractor has verified & digitally signed. You may now forward these to Assistant Engineer.</div>
      ${renderBillsMiniTable(signedBills.concat(modRequests))}
    </section>

    <section class="panel">
      <h4>JE Fast Actions</h4>
      <div class="panel-sub">Operational Gateways</div>
      <button class="primary full" onclick="openCreateBillModal()">+ Prepare New Bill from MB</button><br><br>
      <button class="secondary full" onclick="go('billing')">📋 Forward Signed Bills to AE</button><br><br>
      <button class="secondary full" onclick="go('project-docs')">📄 Upload Measurement Book / Site Photos</button>
    </section>
  </div>`;
}

// 3. ASSISTANT ENGINEER (AE) DASHBOARD
function aeDashboard() {
  let bills = db.bills;
  let pendingCheck = bills.filter(b => b.status === 'Pending AE Checking');
  let checked = bills.filter(b => b.status === 'AE Checked');
  let returned = bills.filter(b => b.status === 'Returned by AE');
  let eePending = bills.filter(b => b.status === 'AE Checked');

  return `<div class="page-head">
    <div>
      <h3>Assistant Engineer (AE) Portal · ${esc(current.name)}</h3>
      <p>Office: <b>${esc(current.office)}</b> · Technical Verification & Field Scrutiny Officer</p>
    </div>
    <button class="primary" onclick="go('billing')">Review Pending Bills ➔</button>
  </div>

  <div class="grid">
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--amber)">
      <label>Received from JE (Pending Check)</label>
      <strong style="color:var(--amber)">${pendingCheck.length}</strong>
      <span>Field check required ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')">
      <label>Returned to JE for Correction</label>
      <strong style="color:var(--red)">${returned.length}</strong>
      <span>Correction required ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--green)">
      <label>Checked & Forwarded to EE</label>
      <strong style="color:var(--green)">${checked.length}</strong>
      <span>Awaiting EE C&P ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('project-info')">
      <label>Sub-Division Projects</label>
      <strong>${db.projects.filter(permitted).length}</strong>
      <span>Active Works ➔</span>
    </div>
  </div>

  <div class="two-col" style="margin-top:18px">
    <section class="panel">
      <h4>Bills Pending AE Technical Checking</h4>
      <div class="panel-sub">Verify BOQ executed quantities, test reports and measurement book</div>
      ${renderBillsMiniTable(pendingCheck)}
    </section>
    <section class="panel">
      <h4>AE Workflow Shortcuts</h4>
      <div class="panel-sub">Actions</div>
      <button class="primary full" onclick="go('billing')">🔍 Open Billing Verification Desk</button><br><br>
      <button class="secondary full" onclick="go('project-info')">📁 Check Project Technical Sanction & BOQ</button><br><br>
      <button class="secondary full" onclick="go('project-docs')">📄 Review Lab Test Reports & Cube Strength</button>
    </section>
  </div>`;
}

// 4. EXECUTIVE ENGINEER (EE) DASHBOARD
function eeDashboard() {
  let bills = db.bills;
  let cpPending = bills.filter(b => b.status === 'AE Checked');
  let accountsPending = bills.filter(b => b.status === 'EE C&P Completed' || b.status === 'Accounts Processed – Sent to DAO');
  let finalAppPending = bills.filter(b => b.status === 'DAO Checked – Pending EE Final Approval');
  let finalApproved = bills.filter(b => b.status === 'Approved by Executive Engineer' || b.status === 'Paid');
  let totalPayments = db.payments.reduce((s, p) => s + (p.paidAmount || 0), 0);

  return `<div class="page-head">
    <div>
      <h3>Executive Engineer (EE) Portal · ${esc(current.name)}</h3>
      <p>Division Head & Financial Sanctioning Authority · Road Division Hilsa</p>
    </div>
    <div style="display:flex;gap:8px">
      <button class="secondary" onclick="go('project-info')">Project Master</button>
      <button class="primary" onclick="go('billing')">Approval Desk ➔</button>
    </div>
  </div>

  <div class="grid">
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--amber)">
      <label>Check & Pass (C&P) Pending</label>
      <strong style="color:var(--amber)">${cpPending.length}</strong>
      <span>From AE ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')">
      <label>Under Accounts Scrutiny</label>
      <strong>${accountsPending.length}</strong>
      <span>Clerk & DAO Scrutiny ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--blue)">
      <label>Final Approval Pending</label>
      <strong style="color:var(--blue)">${finalAppPending.length}</strong>
      <span>DAO Scrutinised Bills ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('payments')" style="border-left:4px solid var(--green)">
      <label>Total Disbursed (CFMS)</label>
      <strong style="color:var(--green)">${formatCurrency(totalPayments)}</strong>
      <span>Treasury Payments ➔</span>
    </div>
  </div>

  <div class="two-col" style="margin-top:18px">
    <section class="panel">
      <h4>High-Priority Executive Engineer Approvals</h4>
      <div class="panel-sub">Bills requiring Check & Pass (C&P) or Final Approval</div>
      ${renderBillsMiniTable(cpPending.concat(finalAppPending))}
    </section>
    <section class="panel">
      <h4>Executive Actions</h4>
      <div class="panel-sub">Division Administration</div>
      <button class="primary full" onclick="go('billing')">🛡️ Final Approve DAO Checked Bills</button><br><br>
      <button class="secondary full" onclick="go('payments')">💳 Inspect CFMS Payment Vouchers</button><br><br>
      <button class="secondary full" onclick="go('offices')">🏢 Manage Sub-Divisions & Branches</button>
    </section>
  </div>`;
}

// 5. ACCOUNTS CLERK DASHBOARD
function accountsClerkDashboard() {
  let bills = db.bills;
  let receivedFromEE = bills.filter(b => b.status === 'EE C&P Completed');
  let sentToDAO = bills.filter(b => b.status === 'Accounts Processed – Sent to DAO');
  let returned = bills.filter(b => b.status === 'Returned by DAO');
  let payments = db.payments;

  return `<div class="page-head">
    <div>
      <h3>Accounts Clerk Portal · ${esc(current.name)}</h3>
      <p>Divisional Accounts Branch · Statutory Deductions & Recoveries Calculator</p>
    </div>
    <button class="primary" onclick="go('billing')">Process Received Bills ➔</button>
  </div>

  <div class="grid">
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--amber)">
      <label>Pending Accounts Processing</label>
      <strong style="color:var(--amber)">${receivedFromEE.length}</strong>
      <span>Received after EE C&P ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--green)">
      <label>Passed & Sent to DAO</label>
      <strong style="color:var(--green)">${sentToDAO.length}</strong>
      <span>Under DAO checking ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')">
      <label>Returned Bills</label>
      <strong style="color:var(--red)">${returned.length}</strong>
      <span>From DAO ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('payments')">
      <label>Payment Vouchers</label>
      <strong>${payments.length}</strong>
      <span>CFMS Bills ➔</span>
    </div>
  </div>

  <div class="two-col" style="margin-top:18px">
    <section class="panel">
      <h4>Bills Pending Accounts Processing & Deductions Verification</h4>
      <div class="panel-sub">Calculate TDS (2%), GST TDS (2%), Labour Cess (1%), Royalty & Security Deposit</div>
      ${renderBillsMiniTable(receivedFromEE)}
    </section>
    <section class="panel">
      <h4>Accounts Tasks</h4>
      <div class="panel-sub">Operations</div>
      <button class="primary full" onclick="go('billing')">📑 Process Deductions & Pass to DAO</button><br><br>
      <button class="secondary full" onclick="go('payments')">💳 Prepare CFMS Payment Vouchers</button><br><br>
      <button class="secondary full" onclick="go('project-info')">📁 Review Project Agreement & BOQ Rates</button>
    </section>
  </div>`;
}

// 6. DIVISIONAL ACCOUNTS OFFICER (DAO) DASHBOARD
function daoDashboard() {
  let bills = db.bills;
  let pendingDAO = bills.filter(b => b.status === 'Accounts Processed – Sent to DAO');
  let checkedDAO = bills.filter(b => b.status === 'DAO Checked – Pending EE Final Approval');
  let returnedDAO = bills.filter(b => b.status === 'Returned by DAO');
  let payments = db.payments;

  return `<div class="page-head">
    <div>
      <h3>Divisional Accounts Officer (DAO) Portal · ${esc(current.name)}</h3>
      <p>Divisional Accounts Branch · Financial Scrutiny & Statutory Compliance</p>
    </div>
    <button class="primary" onclick="go('billing')">Scrutinise Bills ➔</button>
  </div>

  <div class="grid">
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--amber)">
      <label>Pending DAO Scrutiny</label>
      <strong style="color:var(--amber)">${pendingDAO.length}</strong>
      <span>From Accounts Clerk ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')" style="border-left:4px solid var(--green)">
      <label>DAO Checked & Sent to EE</label>
      <strong style="color:var(--green)">${checkedDAO.length}</strong>
      <span>Awaiting EE Final Approval ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')">
      <label>Returned with Queries</label>
      <strong style="color:var(--red)">${returnedDAO.length}</strong>
      <span>Returned to Clerk ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('payments')">
      <label>Total Payment Records</label>
      <strong>${payments.length}</strong>
      <span>Treasury Ledger ➔</span>
    </div>
  </div>

  <div class="two-col" style="margin-top:18px">
    <section class="panel">
      <h4>Bills Pending DAO Financial Scrutiny</h4>
      <div class="panel-sub">Detailed audit of deductions, recoveries, agreement clauses and calculation sheet</div>
      ${renderBillsMiniTable(pendingDAO)}
    </section>
    <section class="panel">
      <h4>DAO Scrutiny Desk</h4>
      <div class="panel-sub">Actions</div>
      <button class="primary full" onclick="go('billing')">⚖️ Perform Financial Scrutiny & Corrections</button><br><br>
      <button class="secondary full" onclick="go('payments')">💳 Audit CFMS Treasury Disbursals</button><br><br>
      <button class="secondary full" onclick="go('activity-log')">📜 Review Full Workflow Audit Trail</button>
    </section>
  </div>`;
}

// 7. SYSTEM ADMIN DASHBOARD
function adminDashboard() {
  let totalProjects = db.projects.length;
  let totalBills = db.bills.length;
  let totalPayments = db.payments.length;
  let pendingUsers = db.users.filter(u => !u.approved).length;

  return `<div class="page-head">
    <div>
      <h3>Office & System Administrator · ${esc(current.name)}</h3>
      <p>Road Division Hilsa · Security, RBAC, Master Data & Audit Console</p>
    </div>
    <div style="display:flex;gap:8px">
      <button class="secondary" onclick="go('users')">User Accounts</button>
      <button class="primary" onclick="go('offices')">Manage Offices</button>
    </div>
  </div>

  <div class="grid">
    <div class="metric metric-clickable" onclick="go('project-info')">
      <label>Total Projects</label>
      <strong>${totalProjects}</strong>
      <span>Master Records ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('billing')">
      <label>Total Workflow Bills</label>
      <strong>${totalBills}</strong>
      <span>All Stages ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('payments')">
      <label>Payment Records</label>
      <strong>${totalPayments}</strong>
      <span>CFMS Transactions ➔</span>
    </div>
    <div class="metric metric-clickable" onclick="go('users')" style="border-left:4px solid var(--amber)">
      <label>Pending User Approvals</label>
      <strong style="color:var(--amber)">${pendingUsers}</strong>
      <span>Requires Approval ➔</span>
    </div>
  </div>

  <div class="two-col" style="margin-top:18px">
    <section class="panel">
      <h4>Live Bills in Departmental Workflow</h4>
      <div class="panel-sub">Real-time status across JE, Contractor, AE, EE, Accounts, DAO</div>
      ${renderBillsMiniTable(db.bills.slice(0, 5))}
    </section>
    <section class="panel">
      <h4>System Administration</h4>
      <div class="panel-sub">Controls</div>
      <button class="primary full" onclick="go('users')">👥 User Administration & Approvals</button><br><br>
      <button class="secondary full" onclick="go('roles')">🛡️ Role Permissions Matrix</button><br><br>
      <button class="secondary full" onclick="go('activity-log')">📜 Inspect Immutable Audit Trail</button>
    </section>
  </div>`;
}

function genericDashboard() {
  return adminDashboard();
}

function renderBillsMiniTable(billsList) {
  if (!billsList || !billsList.length) {
    return '<div class="empty">No pending bills in this queue.</div>';
  }
  return `<div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Bill Number</th>
          <th>Project / Road</th>
          <th>Net Payable</th>
          <th>Current Status</th>
          <th style="text-align:center">Action</th>
        </tr>
      </thead>
      <tbody>
        ${billsList.map(b => `<tr>
          <td>
            <b>${esc(b.billNumber)}</b> ${b.version ? `<span class="badge-subdiv" style="font-size:10px">${b.version}</span>` : ''}<br>
            <span class="small" style="color:var(--muted)">${esc(b.billType)} · ${esc(b.preparedDate)}</span>
          </td>
          <td>
            <b>${esc(b.projectName)}</b><br>
            <span class="small" style="color:var(--navy)">Contractor: ${esc(b.contractorName)}</span>
          </td>
          <td>
            <b style="color:var(--green)">${formatCurrency(b.netPayable)}</b><br>
            <span class="small" style="color:var(--muted)">Gross: ${formatCurrency(b.grossAmount)}</span>
          </td>
          <td>${renderBillStatusBadge(b.status)}</td>
          <td style="text-align:center">
            <button class="primary small" onclick="openBillWorkflowModal(${b.id})">Open ➔</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}


// ============================================================================
// PART 4: PROJECT INFORMATION COMMON MASTER (31 FIELDS) & 19-POINT REPORT
// ============================================================================

let projectFilterSubDiv = '';
let projectFilterStatus = '';
let projectSearchQuery = '';

function projectInfoMasterView() {
  let ps = db.projects.filter(permitted);

  if (projectFilterSubDiv) {
    ps = ps.filter(p => (p.subDivision || p.office || '').toLowerCase().includes(projectFilterSubDiv.toLowerCase()));
  }
  if (projectFilterStatus) {
    ps = ps.filter(p => (p.status || '').toLowerCase() === projectFilterStatus.toLowerCase());
  }
  if (projectSearchQuery) {
    let q = projectSearchQuery.toLowerCase();
    ps = ps.filter(p => (p.name || '').toLowerCase().includes(q) || (p.roadName || '').toLowerCase().includes(q) || (p.contractorName || '').toLowerCase().includes(q));
  }

  return `<div class="page-head">
    <div>
      <h3>Project Information Master · Road Division Hilsa</h3>
      <p>Common Module: Comprehensive 31-Field Project Master & Sanction Records</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${(canUpload() || canEdit()) ? `<button class="primary" onclick="openCreateProjectMasterModal()">+ New Project Master</button>` : ''}
    </div>
  </div>

  <div class="toolbar" style="background:#fff;padding:12px 16px;border-radius:10px;border:1px solid #dce8f1;margin-bottom:18px">
    <div class="search" style="flex:2">
      <input type="text" placeholder="Search by Project name, Road, or Contractor..." value="${esc(projectSearchQuery)}" oninput="projectSearchQuery=this.value;render()" style="width:100%">
    </div>
    <div style="flex:1">
      <select onchange="projectFilterSubDiv=this.value;render()" style="width:100%">
        <option value="">All Sub-Divisions</option>
        <option value="Hilsa" ${projectFilterSubDiv === 'Hilsa' ? 'selected' : ''}>Sub-Division Hilsa</option>
        <option value="Chandi" ${projectFilterSubDiv === 'Chandi' ? 'selected' : ''}>Sub-Division Chandi</option>
        <option value="Rajgir" ${projectFilterSubDiv === 'Rajgir' ? 'selected' : ''}>Sub-Division Rajgir</option>
      </select>
    </div>
    <div style="flex:1">
      <select onchange="projectFilterStatus=this.value;render()" style="width:100%">
        <option value="">All Statuses</option>
        <option value="Work in Progress" ${projectFilterStatus === 'Work in Progress' ? 'selected' : ''}>Work in Progress</option>
        <option value="Agreement Executed" ${projectFilterStatus === 'Agreement Executed' ? 'selected' : ''}>Agreement Executed</option>
        <option value="Technical Sanction" ${projectFilterStatus === 'Technical Sanction' ? 'selected' : ''}>Technical Sanction</option>
        <option value="Completed" ${projectFilterStatus === 'Completed' ? 'selected' : ''}>Completed</option>
        <option value="Final Bill" ${projectFilterStatus === 'Final Bill' ? 'selected' : ''}>Final Bill</option>
      </select>
    </div>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th style="width:70px">Proj ID</th>
          <th>Project / Scheme Name</th>
          <th>Sub-Division & Location</th>
          <th>Contractor & Agreement</th>
          <th>Sanction & Cost</th>
          <th>Progress</th>
          <th>Status</th>
          <th style="text-align:center">Action</th>
        </tr>
      </thead>
      <tbody>
        ${ps.map(p => `<tr>
          <td><b style="color:var(--navy)">#${p.id}</b></td>
          <td>
            <b>${esc(p.name)}</b><br>
            <span class="small" style="color:var(--blue);font-weight:600">${esc(p.schemeName || 'State Road Scheme')}</span>
          </td>
          <td>
            <span class="badge-subdiv">${esc(p.subDivision || p.office)}</span><br>
            <span class="small" style="color:var(--muted)">${esc(p.roadName || p.location || '—')}</span>
          </td>
          <td>
            <b>${esc(p.contractorName || 'Tender Awarded')}</b><br>
            <span class="small" style="color:var(--muted)">Agr: ${esc(p.agreementNo || '—')}</span>
          </td>
          <td>
            <b>${esc(p.agreementAmount || p.estimateAmount || '—')}</b><br>
            <span class="small" style="color:var(--muted)">TS: ${esc(p.tsAmount || '—')}</span>
          </td>
          <td>
            <div style="font-size:12px"><b>Phy:</b> ${esc(p.physicalProgress || '0%')}</div>
            <div style="font-size:12px"><b>Fin:</b> ${esc(p.financialProgress || '0%')}</div>
          </td>
          <td>${renderProjectStatusBadge(p.status)}</td>
          <td style="text-align:center">
            <div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap">
              <button class="primary small" onclick="openProjectMasterModal(${p.id})" title="View Complete 31-Field Project Master">Master Details</button>
              <button class="secondary small" onclick="openProjectContactsModal(${p.id})" title="View & Manage Contacts & Custom Fields" style="background:#f0fdf4;color:#15803d;border-color:#bbf7d0;font-weight:600">👥 Contacts & Fields</button>
              <button class="secondary small" onclick="openReportModal(${p.id})" title="View 19-Point Report">19-Pt Report</button>
              ${canEdit() ? `<button class="secondary small" onclick="openEditProjectMasterModal(${p.id})" title="Edit Project Master">Edit</button>` : ''}
            </div>
          </td>
        </tr>`).join('') || '<tr><td colspan="8" class="empty">No project matching the search criteria.</td></tr>'}
      </tbody>
    </table>
  </div>`;
}

function renderProjectStatusBadge(s) {
  let status = s || 'Proposed';
  let color = '#0284c7', bg = '#e0f2fe';
  if (status.includes('Progress')) { color = '#0369a1'; bg = '#e0f2fe'; }
  else if (status.includes('Completed')) { color = '#047857'; bg = '#d1fae5'; }
  else if (status.includes('Final Bill')) { color = '#b45309'; bg = '#fef3c7'; }
  else if (status.includes('Awarded') || status.includes('Agreement')) { color = '#6d28d9'; bg = '#ede9fe'; }
  return `<span style="background:${bg};color:${color};font-weight:700;font-size:11px;padding:3px 9px;border-radius:99px;display:inline-block">${esc(status)}</span>`;
}

// 31-Field Project Master Detail Modal
function openProjectMasterModal(pid) {
  let p = db.projects.find(x => x.id === pid);
  if (!p) return;

  if (!p.departmentContacts) p.departmentContacts = [];
  if (!p.agencyContacts) p.agencyContacts = [];
  if (!p.customFields) p.customFields = [];

  let isFieldAdmin = canManageProjectFields(p);
  let canEditContacts = canEdit() || isFieldAdmin;

  overlay(`<h3>Project Master (Complete 31 Fields & Contacts)</h3>
  <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA</p>

  <div class="proj-master-view" style="max-height:70vh;overflow-y:auto;padding-right:8px">
    <div class="report-section-legend">1. General Work & Location Information (Fields 1 - 8)</div>
    <div class="table-wrap">
      <table class="report-table">
        <tbody>
          <tr><td style="width:30%" class="bold">1. Project ID</td><td><b>#${p.id}</b></td></tr>
          <tr><td class="bold">2. Project Name</td><td><b>${esc(p.name)}</b></td></tr>
          <tr><td class="bold">3. Scheme Name</td><td>${esc(p.schemeName || 'State Road Improvement Scheme')}</td></tr>
          <tr><td class="bold">4. Department</td><td>${esc(p.department || 'Road Construction Department (RCD), Bihar')}</td></tr>
          <tr><td class="bold">5. Division</td><td>${esc(p.division || 'Road Division Hilsa')}</td></tr>
          <tr><td class="bold">6. Sub-Division</td><td>${esc(p.subDivision || p.office || 'Sub-Division Hilsa')}</td></tr>
          <tr><td class="bold">7. Road Name</td><td>${esc(p.roadName || '—')}</td></tr>
          <tr><td class="bold">8. Project Location</td><td>${esc(p.location || 'Hilsa, Nalanda')}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="report-section-legend">2. Administrative & Technical Sanction (Fields 9 - 15)</div>
    <div class="table-wrap">
      <table class="report-table">
        <tbody>
          <tr><td style="width:30%" class="bold">9. Administrative Approval No.</td><td>${esc(p.aaNo || '—')}</td></tr>
          <tr><td class="bold">10. Administrative Approval Date</td><td>${esc(p.aaDate || '—')}</td></tr>
          <tr><td class="bold">11. Administrative Approval Amount</td><td>${esc(p.aaAmount || '—')}</td></tr>
          <tr><td class="bold">12. Technical Sanction No.</td><td>${esc(p.tsNo || '—')}</td></tr>
          <tr><td class="bold">13. Technical Sanction Date</td><td>${esc(p.tsDate || '—')}</td></tr>
          <tr><td class="bold">14. Technical Sanction Amount</td><td>${esc(p.tsAmount || '—')}</td></tr>
          <tr><td class="bold">15. Estimate Amount</td><td>${esc(p.estimateAmount || '—')}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="report-section-legend">3. Agreement & Award Information (Fields 16 - 24)</div>
    <div class="table-wrap">
      <table class="report-table">
        <tbody>
          <tr><td style="width:30%" class="bold">16. Agreement Number</td><td><b>${esc(p.agreementNo || '—')}</b></td></tr>
          <tr><td class="bold">17. Agreement Date</td><td>${esc(p.agreementDate || '—')}</td></tr>
          <tr><td class="bold">18. Agreement Amount</td><td><b>${esc(p.agreementAmount || '—')}</b></td></tr>
          <tr><td class="bold">19. Contractor Name</td><td>${esc(p.contractorName || '—')}</td></tr>
          <tr><td class="bold">20. Contractor ID</td><td>${esc(p.contractorId || '—')}</td></tr>
          <tr><td class="bold">21. LOA Number</td><td>${esc(p.loaNo || '—')}</td></tr>
          <tr><td class="bold">22. LOA Date</td><td>${esc(p.loaDate || '—')}</td></tr>
          <tr><td class="bold">23. Work Order Number</td><td>${esc(p.workOrderNo || '—')}</td></tr>
          <tr><td class="bold">24. Work Order Date</td><td>${esc(p.workOrderDate || '—')}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="report-section-legend">4. Execution Timelines & Progress (Fields 25 - 30)</div>
    <div class="table-wrap">
      <table class="report-table">
        <tbody>
          <tr><td style="width:30%" class="bold">25. Date of Start</td><td>${esc(p.dateOfStart || '—')}</td></tr>
          <tr><td class="bold">26. Stipulated Date of Completion</td><td>${esc(p.stipulatedDateOfCompletion || '—')}</td></tr>
          <tr><td class="bold">27. Extension of Time (EOT)</td><td>${esc(p.extensionOfTime || 'Nil')}</td></tr>
          <tr><td class="bold">28. Revised Estimate</td><td>${esc(p.revisedEstimate || 'Nil')}</td></tr>
          <tr><td class="bold">29. Physical Progress</td><td><b>${esc(p.physicalProgress || '0%')}</b></td></tr>
          <tr><td class="bold">30. Financial Progress</td><td><b>${esc(p.financialProgress || '0%')}</b></td></tr>
        </tbody>
      </table>
    </div>

    <div class="report-section-legend">5. Project Status & Departmental Remarks (Field 31)</div>
    <div class="table-wrap">
      <table class="report-table">
        <tbody>
          <tr><td style="width:30%" class="bold">31. Project Status</td><td>${renderProjectStatusBadge(p.status)}</td></tr>
          <tr><td class="bold">Remarks</td><td>${esc(p.remarks || '—')}</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 6. Project Information Contact Details -->
    ${renderProjectContactsSection(p, canEditContacts)}

    <!-- 7. Dynamic Custom Project Fields (Admin & Data Creator Controlled) -->
    ${renderProjectCustomFieldsSection(p, isFieldAdmin)}
  </div>

  <div class="modal-actions" style="margin-top:20px">
    <button type="button" class="secondary" onclick="closeModal()">Close</button>
    <button type="button" class="secondary" onclick="openProjectContactsModal(${p.id})" style="background:#f0fdf4;color:#15803d;border-color:#bbf7d0">👥 Contacts & Fields</button>
    <button class="secondary" onclick="closeModal();openReportModal(${p.id})">Open 19-Pt Sheet</button>
    ${canEdit() ? `<button class="primary" onclick="closeModal();openEditProjectMasterModal(${p.id})">✏ Edit Master Fields</button>` : ''}
  </div>`, true);
}

// Edit Modal for 31-Field Project Master
function openEditProjectMasterModal(pid) {
  let p = db.projects.find(x => x.id === pid) || {};
  let isNew = !pid;

  overlay(`<h3>${isNew ? 'Create New Project Master' : 'Edit Project Master (31 Fields)'}</h3>
  <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA</p>

  <form onsubmit="saveProjectMaster(event, ${pid || 0})" style="max-height:72vh;overflow-y:auto;padding-right:8px">
    <div class="report-section-legend">1. General Work & Location Information</div>
    <div class="field">
      <label>Project Name <span style="color:var(--red)">*</span></label>
      <input name="name" required value="${esc(p.name || '')}" placeholder="e.g. Strengthening and Widening of SH-71">
    </div>
    <div class="form-grid-3">
      <div class="field">
        <label>Scheme Name</label>
        <input name="schemeName" value="${esc(p.schemeName || 'State Road Scheme')}" placeholder="e.g. SHIP-IV">
      </div>
      <div class="field">
        <label>Sub-Division</label>
        <select name="subDivision">
          <option ${p.subDivision === 'Sub-Division Hilsa' ? 'selected' : ''}>Sub-Division Hilsa</option>
          <option ${p.subDivision === 'Sub-Division Chandi' ? 'selected' : ''}>Sub-Division Chandi</option>
          <option ${p.subDivision === 'Sub-Division Rajgir' ? 'selected' : ''}>Sub-Division Rajgir</option>
        </select>
      </div>
      <div class="field">
        <label>Road Name</label>
        <input name="roadName" value="${esc(p.roadName || '')}" placeholder="e.g. SH-71 (Km 0 to 18)">
      </div>
    </div>
    <div class="field">
      <label>Project Location</label>
      <input name="location" value="${esc(p.location || '')}" placeholder="e.g. Hilsa to Chandi, Nalanda">
    </div>

    <div class="report-section-legend">2. Administrative & Technical Sanctions</div>
    <div class="form-grid-3">
      <div class="field">
        <label>AA Number</label>
        <input name="aaNo" value="${esc(p.aaNo || '')}" placeholder="e.g. RCD/PATNA/AA/108">
      </div>
      <div class="field">
        <label>AA Date</label>
        <input name="aaDate" type="date" value="${toInputDate(p.aaDate)}">
      </div>
      <div class="field">
        <label>AA Amount (in Lakhs)</label>
        <input name="aaAmount" value="${esc(p.aaAmount || '')}" placeholder="e.g. 1452.80 Lakhs">
      </div>
    </div>
    <div class="form-grid-3">
      <div class="field">
        <label>TS Number</label>
        <input name="tsNo" value="${esc(p.tsNo || '')}" placeholder="e.g. CE/RCD/PATNA/TS/2025/312">
      </div>
      <div class="field">
        <label>TS Date</label>
        <input name="tsDate" type="date" value="${toInputDate(p.tsDate)}">
      </div>
      <div class="field">
        <label>TS Amount (in Lakhs)</label>
        <input name="tsAmount" value="${esc(p.tsAmount || '')}" placeholder="e.g. 1440.00 Lakhs">
      </div>
    </div>
    <div class="field">
      <label>Estimate Amount (in Lakhs)</label>
      <input name="estimateAmount" value="${esc(p.estimateAmount || '')}" placeholder="e.g. 1452.80 Lakhs">
    </div>

    <div class="report-section-legend">3. Agreement & Contractor Details</div>
    <div class="form-grid-3">
      <div class="field">
        <label>Agreement Number</label>
        <input name="agreementNo" value="${esc(p.agreementNo || '')}" placeholder="e.g. 01 SBD OF 2025-26">
      </div>
      <div class="field">
        <label>Agreement Date</label>
        <input name="agreementDate" type="date" value="${toInputDate(p.agreementDate)}">
      </div>
      <div class="field">
        <label>Agreement Amount</label>
        <input name="agreementAmount" value="${esc(p.agreementAmount || '')}" placeholder="e.g. 1389.20 Lakhs">
      </div>
    </div>
    <div class="form-grid-2">
      <div class="field">
        <label>Contractor Name</label>
        <select name="contractorId" onchange="autoFillContractorName(this)">
          ${db.contractors.map(c => `<option value="${c.id}" ${p.contractorId === c.id ? 'selected' : ''}>${esc(c.name)} (${c.id})</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>Work Order No. & Date</label>
        <input name="workOrderNo" value="${esc(p.workOrderNo || '')}" placeholder="e.g. RDH/EE/WO/2026/04">
      </div>
    </div>

    <div class="report-section-legend">4. Execution Timelines & Progress</div>
    <div class="form-grid-3">
      <div class="field">
        <label>Date of Start</label>
        <input name="dateOfStart" type="date" value="${toInputDate(p.dateOfStart)}">
      </div>
      <div class="field">
        <label>Stipulated Date of Completion</label>
        <input name="stipulatedDateOfCompletion" type="date" value="${toInputDate(p.stipulatedDateOfCompletion)}">
      </div>
      <div class="field">
        <label>Extension of Time (EOT)</label>
        <input name="extensionOfTime" value="${esc(p.extensionOfTime || '')}" placeholder="e.g. Up to 31-03-2027">
      </div>
    </div>
    <div class="form-grid-3">
      <div class="field">
        <label>Physical Progress (%)</label>
        <input name="physicalProgress" value="${esc(p.physicalProgress || '0%')}" placeholder="e.g. 65%">
      </div>
      <div class="field">
        <label>Financial Progress (%)</label>
        <input name="financialProgress" value="${esc(p.financialProgress || '0%')}" placeholder="e.g. 58%">
      </div>
      <div class="field">
        <label>Project Status</label>
        <select name="status">
          ${['Proposed', 'Administrative Approval', 'Technical Sanction', 'Tender', 'Awarded', 'Agreement Executed', 'Work in Progress', 'Completed', 'Final Bill', 'Closed'].map(s => `<option ${p.status === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="field">
      <label>Departmental Remarks</label>
      <textarea name="remarks" rows="2" placeholder="Remarks or scope of road works">${esc(p.remarks || '')}</textarea>
    </div>

    <div class="modal-actions" style="margin-top:20px">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="primary">${isNew ? 'Create Project Master' : 'Save Changes'}</button>
    </div>
  </form>`, true);
}

function openCreateProjectMasterModal() {
  openEditProjectMasterModal(0);
}

function saveProjectMaster(e, pid) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  let con = db.contractors.find(c => c.id === d.contractorId) || db.contractors[0];

  if (pid) {
    let p = db.projects.find(x => x.id === pid);
    if (!p) return;
    Object.assign(p, d);
    p.contractorName = con ? con.name : d.contractorName;
    p.office = d.subDivision || p.office;
    if (!p.departmentContacts) p.departmentContacts = [];
    if (!p.agencyContacts) p.agencyContacts = [];
    if (!p.customFields) p.customFields = [];
    showToast('Project Master updated successfully');
  } else {
    let newId = db.projects.length ? Math.max(...db.projects.map(x => x.id)) + 1 : 1;
    let newProj = {
      id: newId,
      name: d.name.trim(),
      schemeName: d.schemeName,
      department: 'Road Construction Department (RCD), Bihar',
      division: 'Road Division Hilsa',
      subDivision: d.subDivision,
      roadName: d.roadName,
      location: d.location,
      aaNo: d.aaNo,
      aaDate: d.aaDate,
      aaAmount: d.aaAmount,
      tsNo: d.tsNo,
      tsDate: d.tsDate,
      tsAmount: d.tsAmount,
      estimateAmount: d.estimateAmount,
      agreementNo: d.agreementNo,
      agreementDate: d.agreementDate,
      agreementAmount: d.agreementAmount,
      contractorName: con ? con.name : 'Contractor',
      contractorId: d.contractorId,
      loaNo: '',
      loaDate: '',
      workOrderNo: d.workOrderNo,
      workOrderDate: '',
      dateOfStart: d.dateOfStart,
      stipulatedDateOfCompletion: d.stipulatedDateOfCompletion,
      extensionOfTime: d.extensionOfTime,
      revisedEstimate: '',
      physicalProgress: d.physicalProgress || '0%',
      financialProgress: d.financialProgress || '0%',
      status: d.status || 'Work in Progress',
      remarks: d.remarks || '',
      office: d.subDivision || 'Sub-Division Hilsa',
      createdBy: current ? current.id : 'ADM-HIL-01',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      ref: d.name,
      files: [],
      folders: [
        { id: Date.now() + 1, name: 'Agreements', files: [] },
        { id: Date.now() + 2, name: 'Bills', files: [] },
        { id: Date.now() + 3, name: 'Drawings & Plans', files: [] },
        { id: Date.now() + 4, name: 'Site Photos', files: [] },
        { id: Date.now() + 5, name: 'Test Reports', files: [] }
      ],
      report: null,
      departmentContacts: [
        { id: 'dc-' + newId + '-1', name: current ? current.name : 'Executive Engineer', designation: current ? (current.designation || current.role) : 'Officer', mobile: '9431800000', email: 'officer@bihar.gov.in' }
      ],
      agencyContacts: con ? [
        { id: 'ac-' + newId + '-1', name: con.rep || con.name, designation: 'Authorized Agency Representative', mobile: '9835000000', email: 'agency@biharinfra.com' }
      ] : [],
      customFields: [],
      access: ['ADM-HIL-01', 'EE-HIL-01', 'DAO-HIL-01', 'ACC-HIL-01', 'AE-HIL-01', 'JE-HIL-01', d.contractorId]
    };
    db.projects.unshift(newProj);
    showToast('New Project Master created successfully');
  }

  let projObj = pid ? db.projects.find(x => x.id === pid) : db.projects[0];
  if (con && projObj && projObj.contractorId === con.id) {
    if (!con.taggedProjects) con.taggedProjects = [];
    let existingTag = con.taggedProjects.find(tp => tp.projectId === projObj.id);
    let tagData = {
      projectId: projObj.id,
      workName: projObj.name,
      division: projObj.division || 'Road Division Hilsa',
      subDivision: projObj.subDivision || projObj.office || 'Sub-Division Hilsa',
      jeId: projObj.assignedJE || 'JE-HIL-01',
      jeName: (db.users && db.users.find(u => u.id === projObj.assignedJE)?.name) || 'Junior Engineer',
      aeId: projObj.assignedAE || 'AE-HIL-01',
      aeName: (db.users && db.users.find(u => u.id === projObj.assignedAE)?.name) || 'Assistant Engineer',
      agreementNo: projObj.contractAgreementNo || projObj.agreementNo || '',
      taggedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    if (existingTag) Object.assign(existingTag, tagData);
    else con.taggedProjects.push(tagData);
  }

  save();
  closeModal();
  render();
}

function canManageProjectFields(p) {
  if (!current) return false;
  // Admin & Executive Engineer (Division Admin) have full privileges
  if (current.role === 'Admin' || current.role === 'EE') return true;
  // Data Creator of this specific project
  if (p && p.createdBy && p.createdBy === current.id) return true;
  // Fallback for authoring JE
  if (current.role === 'JE' && p && (!p.createdBy || p.createdBy === current.id)) return true;
  return false;
}

function renderProjectContactsSection(p, canEditContacts) {
  let deptContacts = p.departmentContacts || [];
  let agyContacts = p.agencyContacts || [];

  return `
  <!-- 6. Project Information Contact Details -->
  <div style="margin-top:24px;border-top:2px dashed #cbd5e1;padding-top:16px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div class="report-section-legend" style="margin:0;flex:1">6A. Department Side Officers' Contact Details (RCD Bihar)</div>
      ${canEditContacts ? `<button type="button" class="primary small" style="margin-left:12px;white-space:nowrap" onclick="openAddContactModal(${p.id}, 'department')">+ Add Department Officer</button>` : ''}
    </div>
    <div class="table-wrap" style="margin-bottom:18px">
      <table class="report-table" style="width:100%">
        <thead>
          <tr style="background:#f1f5f9">
            <th style="width:60px;text-align:center">Sl. No.</th>
            <th>Officers Name</th>
            <th>Designation</th>
            <th>Mobile No.</th>
            <th>Email ID</th>
            ${canEditContacts ? `<th style="width:130px;text-align:center">Action</th>` : ''}
          </tr>
        </thead>
        <tbody>
          ${deptContacts.length ? deptContacts.map((c, idx) => `<tr>
            <td style="text-align:center;font-weight:600">${idx + 1}</td>
            <td><b>${esc(c.name)}</b></td>
            <td><span class="badge" style="background:#e0f2fe;color:#0369a1;font-weight:600">${esc(c.designation)}</span></td>
            <td>
              <a href="tel:${esc(c.mobile)}" style="text-decoration:none;color:var(--navy);font-weight:600;display:inline-flex;align-items:center;gap:4px">
                📞 ${esc(c.mobile)}
              </a>
            </td>
            <td>
              <a href="mailto:${esc(c.email)}" style="text-decoration:none;color:var(--blue);display:inline-flex;align-items:center;gap:4px">
                ✉️ ${esc(c.email || '—')}
              </a>
            </td>
            ${canEditContacts ? `<td style="text-align:center">
              <div style="display:flex;gap:4px;justify-content:center">
                <button type="button" class="secondary small" onclick="openAddContactModal(${p.id}, 'department', '${c.id}')" title="Edit Officer Details">Edit</button>
                <button type="button" class="danger small" onclick="deleteProjectContact(${p.id}, 'department', '${c.id}')" title="Delete Officer">Delete</button>
              </div>
            </td>` : ''}
          </tr>`).join('') : `<tr><td colspan="${canEditContacts ? 6 : 5}" class="empty">No Department Side officers added yet.${canEditContacts ? ' Click "+ Add Department Officer" to add.' : ''}</td></tr>`}
        </tbody>
      </table>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div class="report-section-legend" style="margin:0;flex:1">6B. Agency Side Contacts (Engineers, Site Supervisors, Workers)</div>
      ${canEditContacts ? `<button type="button" class="primary small" style="margin-left:12px;white-space:nowrap;background:#16a34a;border-color:#16a34a" onclick="openAddContactModal(${p.id}, 'agency')">+ Add Agency Contact</button>` : ''}
    </div>
    <div class="table-wrap" style="margin-bottom:18px">
      <table class="report-table" style="width:100%">
        <thead>
          <tr style="background:#f1f5f9">
            <th style="width:60px;text-align:center">Sl. No.</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Mobile No.</th>
            <th>Email ID</th>
            ${canEditContacts ? `<th style="width:130px;text-align:center">Action</th>` : ''}
          </tr>
        </thead>
        <tbody>
          ${agyContacts.length ? agyContacts.map((c, idx) => `<tr>
            <td style="text-align:center;font-weight:600">${idx + 1}</td>
            <td><b>${esc(c.name)}</b></td>
            <td><span class="badge" style="background:#fef3c7;color:#92400e;font-weight:600">${esc(c.designation)}</span></td>
            <td>
              <a href="tel:${esc(c.mobile)}" style="text-decoration:none;color:var(--navy);font-weight:600;display:inline-flex;align-items:center;gap:4px">
                📞 ${esc(c.mobile)}
              </a>
            </td>
            <td>
              <a href="mailto:${esc(c.email)}" style="text-decoration:none;color:var(--blue);display:inline-flex;align-items:center;gap:4px">
                ✉️ ${esc(c.email || '—')}
              </a>
            </td>
            ${canEditContacts ? `<td style="text-align:center">
              <div style="display:flex;gap:4px;justify-content:center">
                <button type="button" class="secondary small" onclick="openAddContactModal(${p.id}, 'agency', '${c.id}')" title="Edit Contact">Edit</button>
                <button type="button" class="danger small" onclick="deleteProjectContact(${p.id}, 'agency', '${c.id}')" title="Delete Contact">Delete</button>
              </div>
            </td>` : ''}
          </tr>`).join('') : `<tr><td colspan="${canEditContacts ? 6 : 5}" class="empty">No Agency Side personnel added yet.${canEditContacts ? ' Click "+ Add Agency Contact" to add.' : ''}</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderProjectCustomFieldsSection(p, isFieldAdmin) {
  let customFields = p.customFields || [];

  return `
  <!-- 7. Dynamic Custom Project Fields -->
  <div style="margin-top:20px;border-top:2px dashed #cbd5e1;padding-top:16px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div>
        <div class="report-section-legend" style="margin:0">7. Dynamic Custom Project Fields</div>
        <div style="font-size:11.5px;color:var(--muted);margin-top:3px">
          Add Field, Edit Field & Delete Field features are restricted strictly to <b>Admin</b> and <b>Data Creator</b> logins.
        </div>
      </div>
      ${isFieldAdmin ? `
        <button type="button" class="primary small" style="margin-left:12px;white-space:nowrap;background:#0f766e;border-color:#0f766e" onclick="openCustomFieldModal(${p.id})">
          + Add Field
        </button>` : `
        <span style="font-size:11px;background:#f1f5f9;color:#64748b;font-weight:600;padding:5px 10px;border-radius:6px;border:1px solid #cbd5e1">
          🔒 Field Management: Admin & Data Creator Only
        </span>`}
    </div>

    <div class="table-wrap">
      <table class="report-table" style="width:100%">
        <thead>
          <tr style="background:#f1f5f9">
            <th style="width:60px;text-align:center">Sl. No.</th>
            <th style="width:240px">Field Label / Name</th>
            <th>Field Value</th>
            <th style="width:110px">Field Type</th>
            ${isFieldAdmin ? `<th style="width:140px;text-align:center">Action</th>` : ''}
          </tr>
        </thead>
        <tbody>
          ${customFields.length ? customFields.map((f, idx) => `<tr>
            <td style="text-align:center;font-weight:600">${idx + 1}</td>
            <td><b>${esc(f.label)}</b></td>
            <td>${esc(f.value || '—')}</td>
            <td><span class="badge" style="background:#f8fafc;color:#475569;border:1px solid #cbd5e1">${esc(f.type || 'Text')}</span></td>
            ${isFieldAdmin ? `<td style="text-align:center">
              <div style="display:flex;gap:4px;justify-content:center">
                <button type="button" class="secondary small" onclick="openCustomFieldModal(${p.id}, '${f.id}')" title="Edit Custom Field">✏ Edit</button>
                <button type="button" class="danger small" onclick="deleteCustomField(${p.id}, '${f.id}')" title="Delete Custom Field">🗑 Delete</button>
              </div>
            </td>` : ''}
          </tr>`).join('') : `<tr><td colspan="${isFieldAdmin ? 5 : 4}" class="empty">No custom fields created yet.${isFieldAdmin ? ' Click "+ Add Field" to add dynamic project fields.' : ''}</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

function openProjectContactsModal(pid) {
  let p = db.projects.find(x => x.id === pid);
  if (!p) return;

  if (!p.departmentContacts) p.departmentContacts = [];
  if (!p.agencyContacts) p.agencyContacts = [];
  if (!p.customFields) p.customFields = [];

  let isFieldAdmin = canManageProjectFields(p);
  let canEditContacts = canEdit() || isFieldAdmin;

  overlay(`<h3>Project Contacts & Custom Dynamic Fields</h3>
  <p><b>#${p.id} - ${esc(p.name)}</b> (${esc(p.subDivision || p.office || 'Road Division Hilsa')})</p>

  <div style="max-height:72vh;overflow-y:auto;padding-right:8px">
    ${renderProjectContactsSection(p, canEditContacts)}
    ${renderProjectCustomFieldsSection(p, isFieldAdmin)}
  </div>

  <div class="modal-actions" style="margin-top:20px">
    <button type="button" class="secondary" onclick="closeModal()">Close</button>
    <button type="button" class="primary" onclick="closeModal();openProjectMasterModal(${p.id})">Open 31-Field Master Details</button>
  </div>`, true);
}

function openAddContactModal(pid, type, contactId) {
  let p = db.projects.find(x => x.id === pid);
  if (!p) return;
  if (!canEdit() && !canManageProjectFields(p) && current.role !== 'Contractor') {
    alert("Unauthorized: You do not have permission to modify project contacts.");
    return;
  }

  let isDept = type === 'department';
  let list = isDept ? (p.departmentContacts || []) : (p.agencyContacts || []);
  let c = contactId ? (list.find(x => x.id === contactId) || {}) : {};
  let isEdit = !!contactId;
  let title = isDept ? (isEdit ? 'Edit Department Officer Contact' : 'Add Department Officer Contact')
                     : (isEdit ? 'Edit Agency Personnel Contact' : 'Add Agency Personnel Contact');

  overlay(`<h3>${title}</h3>
  <p><b>Project #${p.id}:</b> ${esc(p.name)}</p>

  <form onsubmit="saveProjectContact(event, ${pid}, '${type}', '${contactId || ''}')" style="margin-top:16px">
    <div class="field">
      <label>${isDept ? 'Officers Name' : 'Name'} <span style="color:var(--red)">*</span></label>
      <input name="name" required value="${esc(c.name || '')}" placeholder="${isDept ? 'e.g. Er. S. N. Prasad' : 'e.g. Sri Rajesh Kumar / Er. Amit Sharma'}">
    </div>

    <div class="field">
      <label>Designation <span style="color:var(--red)">*</span></label>
      <input name="designation" required list="contact-desig-list" value="${esc(c.designation || '')}" placeholder="${isDept ? 'e.g. Executive Engineer, Assistant Engineer, Junior Engineer' : 'e.g. Project Manager, Site Engineer, Site Supervisor, Workers Representative'}">
      <datalist id="contact-desig-list">
        ${isDept ? `
          <option value="Executive Engineer">
          <option value="Assistant Engineer">
          <option value="Junior Engineer">
          <option value="Divisional Accounts Officer">
          <option value="Accounts Clerk">
          <option value="Surveyor">
        ` : `
          <option value="Project Manager">
          <option value="Senior Site Engineer">
          <option value="Site Supervisor">
          <option value="Quality Engineer">
          <option value="Safety Officer">
          <option value="Workers Representative">
          <option value="Site Foreman">
        `}
      </datalist>
    </div>

    <div class="form-grid-2">
      <div class="field">
        <label>Mobile No. <span style="color:var(--red)">*</span></label>
        <input name="mobile" required type="tel" value="${esc(c.mobile || '')}" placeholder="e.g. 9431820001">
      </div>
      <div class="field">
        <label>Email ID</label>
        <input name="email" type="email" value="${esc(c.email || '')}" placeholder="${isDept ? 'e.g. officer@bihar.gov.in' : 'e.g. engineer@agency.com'}">
      </div>
    </div>

    <div class="modal-actions" style="margin-top:20px">
      <button type="button" class="secondary" onclick="openProjectMasterModal(${pid})">Cancel</button>
      <button class="primary">${isEdit ? 'Save Changes' : 'Add Contact'}</button>
    </div>
  </form>`, true);
}

function saveProjectContact(e, pid, type, contactId) {
  e.preventDefault();
  let p = db.projects.find(x => x.id === pid);
  if (!p) return;
  if (!canEdit() && !canManageProjectFields(p) && current.role !== 'Contractor') {
    alert("Unauthorized: You do not have permission to modify project contacts.");
    return;
  }

  let d = {};
  try {
    d = Object.fromEntries(new FormData(e.target));
  } catch (err) {
    if (e.target) {
      for (let k of Object.keys(e.target)) {
        if (e.target[k] && e.target[k].value !== undefined) d[k] = e.target[k].value;
      }
    }
  }
  let isDept = type === 'department';
  if (!p.departmentContacts) p.departmentContacts = [];
  if (!p.agencyContacts) p.agencyContacts = [];
  let list = isDept ? p.departmentContacts : p.agencyContacts;

  let entry = {
    id: contactId || ((isDept ? 'dc-' : 'ac-') + Date.now()),
    name: (d.name || '').trim(),
    designation: (d.designation || '').trim(),
    mobile: (d.mobile || '').trim(),
    email: (d.email || '').trim()
  };

  if (contactId) {
    let idx = list.findIndex(x => x.id === contactId);
    if (idx !== -1) {
      list[idx] = entry;
      showToast(`${isDept ? 'Department Officer' : 'Agency'} Contact updated successfully`);
    }
  } else {
    list.push(entry);
    showToast(`${isDept ? 'Department Officer' : 'Agency'} Contact added successfully`);
  }

  save();
  openProjectMasterModal(pid);
}

function deleteProjectContact(pid, type, contactId) {
  let p = db.projects.find(x => x.id === pid);
  if (!p) return;
  if (!canEdit() && !canManageProjectFields(p) && current.role !== 'Contractor') {
    alert("Unauthorized: You do not have permission to delete project contacts.");
    return;
  }

  if (!confirm('Are you sure you want to delete this contact?')) return;

  if (type === 'department') {
    p.departmentContacts = (p.departmentContacts || []).filter(x => x.id !== contactId);
  } else {
    p.agencyContacts = (p.agencyContacts || []).filter(x => x.id !== contactId);
  }

  save();
  showToast('Contact deleted successfully');
  openProjectMasterModal(pid);
}

function openCustomFieldModal(pid, fieldId) {
  let p = db.projects.find(x => x.id === pid);
  if (!p) return;

  // Strict check: only Admin and Data Creator can add or edit fields
  if (!canManageProjectFields(p)) {
    alert("Unauthorized: Only Admin and Project Data Creator can add or edit custom fields.");
    return;
  }

  let list = p.customFields || [];
  let f = fieldId ? (list.find(x => x.id === fieldId) || {}) : {};
  let isEdit = !!fieldId;

  overlay(`<h3>${isEdit ? 'Edit Dynamic Project Field' : 'Add Dynamic Project Field'}</h3>
  <p><b>Project #${p.id}:</b> ${esc(p.name)}</p>

  <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:8px 12px;margin:12px 0;border-radius:4px;font-size:12px;color:#166534">
    <b>Authorized Login:</b> ${esc(current.name)} (${esc(current.role)}) — Verified as ${current.role === 'Admin' || current.role === 'EE' ? 'System Administrator' : 'Project Data Creator'}.
  </div>

  <form onsubmit="saveCustomField(event, ${pid}, '${fieldId || ''}')" style="margin-top:14px">
    <div class="field">
      <label>Field Label / Name <span style="color:var(--red)">*</span></label>
      <input name="label" required value="${esc(f.label || '')}" placeholder="e.g. Third Party QC Consultant, Clear Span, Design Speed...">
    </div>

    <div class="field">
      <label>Field Value <span style="color:var(--red)">*</span></label>
      <textarea name="value" required rows="2" placeholder="e.g. NIT Patna Quality Wing / 80 Km/hr">${esc(f.value || '')}</textarea>
    </div>

    <div class="field">
      <label>Field Type</label>
      <select name="type">
        <option value="Text" ${!f.type || f.type === 'Text' ? 'selected' : ''}>Text</option>
        <option value="Number" ${f.type === 'Number' ? 'selected' : ''}>Number / Quantity</option>
        <option value="Date" ${f.type === 'Date' ? 'selected' : ''}>Date</option>
        <option value="URL" ${f.type === 'URL' ? 'selected' : ''}>URL / Web Link</option>
      </select>
    </div>

    <div class="modal-actions" style="margin-top:20px">
      <button type="button" class="secondary" onclick="openProjectMasterModal(${pid})">Cancel</button>
      <button class="primary">${isEdit ? 'Update Field' : 'Add Field'}</button>
    </div>
  </form>`, true);
}

function saveCustomField(e, pid, fieldId) {
  e.preventDefault();
  let p = db.projects.find(x => x.id === pid);
  if (!p) return;

  // Strict check: only Admin and Data Creator can add or edit fields
  if (!canManageProjectFields(p)) {
    alert("Unauthorized: Only Admin and Project Data Creator can add or edit custom fields.");
    return;
  }

  let d = {};
  try {
    d = Object.fromEntries(new FormData(e.target));
  } catch (err) {
    if (e.target) {
      for (let k of Object.keys(e.target)) {
        if (e.target[k] && e.target[k].value !== undefined) d[k] = e.target[k].value;
      }
    }
  }
  if (!p.customFields) p.customFields = [];

  let label = (d.label || '').trim();
  let value = (d.value || '').trim();
  let type = d.type || 'Text';

  if (!label) {
    alert('Please enter a field label.');
    return;
  }

  if (fieldId) {
    let idx = p.customFields.findIndex(x => x.id === fieldId);
    if (idx !== -1) {
      p.customFields[idx] = { id: fieldId, label, value, type };
      showToast('Custom field updated successfully');
    }
  } else {
    let newId = 'cf-' + Date.now();
    p.customFields.push({ id: newId, label, value, type });
    showToast('Custom field added successfully');
  }

  save();
  openProjectMasterModal(pid);
}

function deleteCustomField(pid, fieldId) {
  let p = db.projects.find(x => x.id === pid);
  if (!p) return;

  // Strict check: only Admin and Data Creator can delete fields
  if (!canManageProjectFields(p)) {
    alert("Unauthorized: Only Admin and Project Data Creator can delete custom fields.");
    return;
  }

  if (!confirm('Are you sure you want to delete this custom field?')) return;

  p.customFields = (p.customFields || []).filter(x => x.id !== fieldId);
  save();
  showToast('Custom field deleted successfully');
  openProjectMasterModal(pid);
}

if (typeof window !== 'undefined') {
  window.canManageProjectFields = canManageProjectFields;
  window.renderProjectContactsSection = renderProjectContactsSection;
  window.renderProjectCustomFieldsSection = renderProjectCustomFieldsSection;
  window.openProjectMasterModal = openProjectMasterModal;
  window.openEditProjectMasterModal = openEditProjectMasterModal;
  window.openCreateProjectMasterModal = openCreateProjectMasterModal;
  window.saveProjectMaster = saveProjectMaster;
  window.openProjectContactsModal = openProjectContactsModal;
  window.openAddContactModal = openAddContactModal;
  window.saveProjectContact = saveProjectContact;
  window.deleteProjectContact = deleteProjectContact;
  window.openCustomFieldModal = openCustomFieldModal;
  window.saveCustomField = saveCustomField;
  window.deleteCustomField = deleteCustomField;
  window.projectInfoMasterView = projectInfoMasterView;
}

if (typeof globalThis !== 'undefined') {
  globalThis.canManageProjectFields = canManageProjectFields;
  globalThis.renderProjectContactsSection = renderProjectContactsSection;
  globalThis.renderProjectCustomFieldsSection = renderProjectCustomFieldsSection;
  globalThis.openProjectMasterModal = openProjectMasterModal;
  globalThis.openEditProjectMasterModal = openEditProjectMasterModal;
  globalThis.openCreateProjectMasterModal = openCreateProjectMasterModal;
  globalThis.saveProjectMaster = saveProjectMaster;
  globalThis.openProjectContactsModal = openProjectContactsModal;
  globalThis.openAddContactModal = openAddContactModal;
  globalThis.saveProjectContact = saveProjectContact;
  globalThis.deleteProjectContact = deleteProjectContact;
  globalThis.openCustomFieldModal = openCustomFieldModal;
  globalThis.saveCustomField = saveCustomField;
  globalThis.deleteCustomField = deleteCustomField;
  globalThis.projectInfoMasterView = projectInfoMasterView;
}


// ============================================================================
// PART 5: COMPLETE BILLING UI, TIMELINE, BOQ CALCULATOR & WORKFLOW MODALS
// ============================================================================

function renderBillStatusBadge(status) {
  let s = status || 'Draft';
  let bg = '#f1f5f9', color = '#475569';

  if (s === 'Draft' || s === 'Draft with JE') { bg = '#f1f5f9'; color = '#475569'; }
  else if (s === 'Finalized by JE') { bg = '#ede9fe'; color = '#4338ca'; }
  else if (s.includes('Recalled') || s.includes('Called Back')) { bg = '#fffbeb'; color = '#b45309'; }
  else if (s.includes('Pending Contractor') || s.includes('Revised') || s.includes('Submitted to Contractor')) { bg = '#fef3c7'; color = '#b45309'; }
  else if (s === 'Contractor Accepted') { bg = '#e0f2fe'; color = '#0284c7'; }
  else if (s === 'Contractor Signed & Submitted') { bg = '#dcfce7'; color = '#15803d'; }
  else if (s.includes('Modification') || s.includes('Sent Back') || s.includes('Returned')) { bg = '#fee2e2'; color = '#b91c1c'; }
  else if (s === 'Pending AE Checking' || s === 'AE Checked' || s === 'Forwarded to AE') { bg = '#ede9fe'; color = '#6d28d9'; }
  else if (s.includes('C&P')) { bg = '#e0e7ff'; color = '#4338ca'; }
  else if (s.includes('Accounts')) { bg = '#ffedd5'; color = '#c2410c'; }
  else if (s.includes('DAO')) { bg = '#fce7f3'; color = '#be185d'; }
  else if (s.includes('Approved by Executive Engineer') || s.includes('Final Approved')) { bg = '#ecfdf5'; color = '#047857'; }
  else if (s === 'Paid') { bg = '#d1fae5'; color = '#065f46'; }

  return `<span class="bill-status-pill" style="background:${bg};color:${color};border:1px solid rgba(0,0,0,0.06);font-weight:700;font-size:11px;padding:3px 8px;border-radius:99px;display:inline-block">${esc(s)}</span>`;
}

// Context-aware Quick Action Buttons for table rows matching role and bill status
function renderRowActionButtons(b) {
  let r = current.role;
  let s = b.status;
  let btns = '';

  if (r === 'JE') {
    if (s === 'Draft' || s === 'Draft with JE' || s === 'Recalled by JE') {
      btns += `<button class="secondary small" onclick="openEditBillModal(${b.id})" title="Edit measurements and BOQ items">✏ Edit</button> `;
      btns += `<button class="primary small" onclick="jeQuickFinalize(${b.id})" style="background:#4338ca" title="Finalize draft bill">🔒 Finalize</button> `;
      btns += `<button class="primary small" onclick="openSendForwardModal(${b.id})" style="background:#16a34a" title="Send Forward to Contractor">📤 Forward ➔</button> `;
    } else if (s === 'Finalized by JE') {
      btns += `<button class="secondary small" onclick="openEditBillModal(${b.id})" title="Edit or unlock">✏ Edit</button> `;
      btns += `<button class="primary small" onclick="openSendForwardModal(${b.id})" style="background:#16a34a" title="Send Forward to Contractor">📤 Forward ➔</button> `;
    } else if (s === 'Prepared by JE – Pending Contractor Acceptance' || s === 'Submitted to Contractor') {
      btns += `<button class="danger small" onclick="openCallBackModal(${b.id})" style="background:#d97706;border-color:#d97706" title="Call back bill from Contractor to your desk">↩ Call Back</button> `;
    } else if (s === 'Contractor Signed & Submitted') {
      btns += `<button class="primary small" onclick="openSendForwardModal(${b.id})" style="background:#16a34a" title="Send Forward to AE">📤 Forward to AE ➔</button> `;
    } else if (s === 'Pending AE Checking' || s === 'Forwarded to AE') {
      btns += `<button class="danger small" onclick="openCallBackModal(${b.id})" style="background:#d97706;border-color:#d97706" title="Call back bill from AE to your desk">↩ Call Back</button> `;
    } else if (s === 'Modification Requested' || s === 'Sent Back to JE' || s === 'Returned by AE') {
      btns += `<button class="primary small" onclick="openEditBillModal(${b.id})" title="Edit / Revise Bill">✏ Edit / Revise</button> `;
    }
  } else if (r === 'AE') {
    if (s === 'Pending AE Checking' || s === 'Forwarded to AE') {
      btns += `<button class="primary small" onclick="openSendForwardModal(${b.id})" style="background:#16a34a" title="Send Forward to EE">📤 Forward to EE ➔</button> `;
      btns += `<button class="danger small" onclick="openReturnModal(${b.id})" title="Call Back / Return to JE">↩ Return to JE</button> `;
    } else if (s === 'AE Checked') {
      btns += `<button class="danger small" onclick="openCallBackModal(${b.id})" style="background:#d97706;border-color:#d97706" title="Call Back bill from EE">↩ Call Back</button> `;
    }
  } else if (r === 'Accounts Clerk') {
    if (s === 'EE C&P Completed' || s === 'Returned by DAO' || s === 'Under Accounts Scrutiny') {
      btns += `<button class="primary small" onclick="openAccountsProcessModal(${b.id})" style="background:#ea580c" title="Process deductions and Send Forward to DAO">📤 Forward to DAO ➔</button> `;
      btns += `<button class="danger small" onclick="openAccountsReturnModal(${b.id})" title="Return Bill">↩ Return</button> `;
    } else if (s === 'Accounts Processed – Sent to DAO') {
      btns += `<button class="danger small" onclick="openCallBackModal(${b.id})" style="background:#d97706;border-color:#d97706" title="Call Back bill from DAO">↩ Call Back</button> `;
    }
  } else if (r === 'DAO') {
    if (s === 'Accounts Processed – Sent to DAO' || s === 'Under DAO Scrutiny') {
      btns += `<button class="primary small" onclick="openDaoScrutinyModal(${b.id})" style="background:#db2777" title="Scrutinise and Send Forward to EE">📤 Forward to EE ➔</button> `;
      btns += `<button class="danger small" onclick="openDaoReturnModal(${b.id})" title="Return to Accounts Clerk">↩ Return</button> `;
    } else if (s === 'DAO Checked – Pending EE Final Approval') {
      btns += `<button class="danger small" onclick="openCallBackModal(${b.id})" style="background:#d97706;border-color:#d97706" title="Call Back bill from EE">↩ Call Back</button> `;
    }
  }

  btns += `<button class="secondary small" onclick="printBillInvoice(${b.id})" title="Print Form 26 Invoice Voucher">🖨️ Invoice</button> `;
  btns += `<button class="secondary small" onclick="openBillWorkflowModal(${b.id})" title="View Full Bill Details & Workflow Timeline">Desk ➔</button>`;
  return `<div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap">${btns}</div>`;
}

function billingView() {
  let bills = db.bills;

  if (current.role === 'Contractor') {
    bills = bills.filter(b => b.contractorId === current.contractorId || b.contractorId === current.id);
  }

  let pendingActionBills = [];
  if (current.role === 'Contractor') {
    pendingActionBills = bills.filter(b => b.status === 'Prepared by JE – Pending Contractor Acceptance' || b.status === 'Revised by JE' || b.status === 'Contractor Accepted' || b.status === 'Submitted to Contractor');
  } else if (current.role === 'JE') {
    pendingActionBills = bills.filter(b => ['Draft', 'Draft with JE', 'Finalized by JE', 'Recalled by JE', 'Contractor Signed & Submitted', 'Modification Requested', 'Sent Back to JE', 'Returned by AE'].includes(b.status));
  } else if (current.role === 'AE') {
    pendingActionBills = bills.filter(b => b.status === 'Pending AE Checking' || b.status === 'Forwarded to AE');
  } else if (current.role === 'EE') {
    pendingActionBills = bills.filter(b => b.status === 'AE Checked' || b.status === 'DAO Checked – Pending EE Final Approval');
  } else if (current.role === 'Accounts Clerk') {
    pendingActionBills = bills.filter(b => b.status === 'EE C&P Completed' || b.status === 'Returned by DAO' || b.status === 'Under Accounts Scrutiny');
  } else if (current.role === 'DAO') {
    pendingActionBills = bills.filter(b => b.status === 'Accounts Processed – Sent to DAO' || b.status === 'Under DAO Scrutiny');
  }

  let filtered = bills;
  if (activeBillTab === 'pending') filtered = pendingActionBills;
  else if (activeBillTab === 'drafts') filtered = bills.filter(b => ['Draft', 'Draft with JE', 'Finalized by JE', 'Recalled by JE'].includes(b.status));
  else if (activeBillTab === 'signed') filtered = bills.filter(b => b.status === 'Contractor Signed & Submitted');
  else if (activeBillTab === 'scrutiny') filtered = bills.filter(b => ['Pending AE Checking', 'Forwarded to AE', 'AE Checked', 'EE C&P Completed', 'Under Accounts Scrutiny', 'Accounts Processed – Sent to DAO', 'Under DAO Scrutiny', 'DAO Checked – Pending EE Final Approval'].includes(b.status));
  else if (activeBillTab === 'approved') filtered = bills.filter(b => b.status === 'Approved by Executive Engineer' || b.status === 'Paid');

  return `<div class="page-head">
    <div>
      <h3>Billing & Scrutiny Workflow · Road Division Hilsa</h3>
      <p>Departmental Sequence: <b>JE → Contractor → JE → AE → EE → Accounts Clerk → DAO → EE → Payment</b></p>
    </div>
    <div>
      ${current.role === 'JE' ? `<button class="primary" onclick="openCreateBillModal()">+ Create New Bill</button>` : ''}
    </div>
  </div>

  <div class="tabrow" style="margin-bottom:18px">
    <button class="${activeBillTab === 'all' ? 'active' : ''}" onclick="activeBillTab='all';render()">All Bills (${bills.length})</button>
    <button class="${activeBillTab === 'pending' ? 'active' : ''}" onclick="activeBillTab='pending';render()">Pending My Action (${pendingActionBills.length})</button>
    ${current.role === 'JE' ? `<button class="${activeBillTab === 'drafts' ? 'active' : ''}" onclick="activeBillTab='drafts';render()">My Drafts & Finalized</button>` : ''}
    <button class="${activeBillTab === 'signed' ? 'active' : ''}" onclick="activeBillTab='signed';render()">Contractor Signed</button>
    <button class="${activeBillTab === 'scrutiny' ? 'active' : ''}" onclick="activeBillTab='scrutiny';render()">Under Verification</button>
    <button class="${activeBillTab === 'approved' ? 'active' : ''}" onclick="activeBillTab='approved';render()">Final Approved</button>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Bill Number & Type</th>
          <th>Project / Road Work</th>
          <th>Contractor</th>
          <th>Gross Amount</th>
          <th>Total Deductions</th>
          <th>Net Payable</th>
          <th>Status</th>
          <th style="text-align:center">Action</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(b => `<tr>
          <td>
            <b>${esc(b.billNumber)}</b> ${b.version ? `<span class="badge-subdiv" style="font-size:10px">${b.version}</span>` : ''}<br>
            <span class="small" style="color:var(--muted)">${esc(b.billType)} · MB: ${esc(b.mbNo)} (${esc(b.mbDate)})</span>
          </td>
          <td>
            <b>${esc(b.projectName)}</b><br>
            <span class="small" style="color:var(--muted)">Agr: ${esc(b.agreementNo)}</span>
          </td>
          <td><b>${esc(b.contractorName)}</b></td>
          <td><b>${formatCurrency(b.grossAmount)}</b></td>
          <td style="color:var(--red)">${formatCurrency(b.deductions ? b.deductions.totalDeductions : 0)}</td>
          <td style="color:var(--green)"><b>${formatCurrency(b.netPayable)}</b></td>
          <td>${renderBillStatusBadge(b.status)}</td>
          <td style="text-align:center">
            ${renderRowActionButtons(b)}
          </td>
        </tr>`).join('') || '<tr><td colspan="8" class="empty">No bills in this category.</td></tr>'}
      </tbody>
    </table>
  </div>`;
}

// Visual Bill Timeline Component
function renderBillTimeline(b) {
  const steps = [
    { key: 'JE', label: 'JE Create', matchStatus: ['Draft', 'Prepared by JE – Pending Contractor Acceptance', 'Revised by JE'] },
    { key: 'Contractor', label: 'Contractor Sign', matchStatus: ['Contractor Accepted', 'Contractor Signed & Submitted'] },
    { key: 'AE', label: 'AE Check', matchStatus: ['Pending AE Checking', 'AE Checked'] },
    { key: 'EE_CP', label: 'EE C&P', matchStatus: ['EE C&P Completed'] },
    { key: 'Accounts', label: 'Accounts Scrutiny', matchStatus: ['Accounts Processed – Sent to DAO'] },
    { key: 'DAO', label: 'DAO Check', matchStatus: ['DAO Checked – Pending EE Final Approval'] },
    { key: 'EE_Approval', label: 'EE Final Approval', matchStatus: ['Approved by Executive Engineer'] },
    { key: 'Payment', label: 'CFMS Payment', matchStatus: ['Paid', 'Under CFMS Processing'] }
  ];

  let currentStepIdx = 0;
  let s = b.status;
  if (s === 'Draft' || s.includes('Pending Contractor Acceptance')) currentStepIdx = 0;
  else if (s === 'Contractor Accepted' || s === 'Contractor Signed & Submitted') currentStepIdx = 1;
  else if (s === 'Pending AE Checking' || s === 'AE Checked') currentStepIdx = 2;
  else if (s === 'EE C&P Completed') currentStepIdx = 3;
  else if (s === 'Accounts Processed – Sent to DAO') currentStepIdx = 4;
  else if (s === 'DAO Checked – Pending EE Final Approval') currentStepIdx = 5;
  else if (s === 'Approved by Executive Engineer') currentStepIdx = 6;
  else if (s === 'Paid' || s === 'Under CFMS Processing') currentStepIdx = 7;

  let isReturned = s.includes('Returned') || s.includes('Modification') || s.includes('Sent Back');

  return `<div class="bill-timeline-wrap" style="background:#f8fafc;border:1px solid #dce8f1;border-radius:12px;padding:16px;margin-bottom:18px">
    <div style="font-weight:700;font-size:12px;color:var(--navy);margin-bottom:12px;display:flex;justify-content:space-between">
      <span>DEPARTMENTAL BILL PIPELINE</span>
      ${isReturned ? `<span style="color:var(--red);font-weight:800">⚠️ Status: ${esc(s)}</span>` : `<span style="color:var(--green)">Step ${currentStepIdx + 1} of 8</span>`}
    </div>
    <div class="bill-timeline">
      ${steps.map((st, i) => {
        let isDone = i < currentStepIdx;
        let isCurrent = i === currentStepIdx;
        let stepClass = isDone ? 'completed' : isCurrent ? (isReturned ? 'returned' : 'active') : 'pending';
        return `<div class="timeline-step ${stepClass}">
          <div class="step-circle">${isDone ? '✓' : (i + 1)}</div>
          <div class="step-label">${st.label}</div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

// Complete Bill Workflow Desk / Drawer Modal
function openBillWorkflowModal(billId) {
  let b = db.bills.find(x => x.id === billId);
  if (!b) return;

  overlay(`<h3>${esc(b.billNumber)} · Scrutiny & Approval Desk</h3>
  <p>${esc(b.projectName)} · Agreement: <b>${esc(b.agreementNo)}</b> · Version: <b>${b.version || 'v1'}</b></p>

  <div style="max-height:74vh;overflow-y:auto;padding-right:8px">
    ${renderBillTimeline(b)}

    <div class="report-section-legend">1. Bill Summary & Measurement Book Reference</div>
    <div class="table-wrap">
      <table class="report-table">
        <tbody>
          <tr>
            <td style="width:25%" class="bold">Bill Number & Type</td>
            <td><b>${esc(b.billNumber)}</b> (${esc(b.billType)}) ${b.version ? `<span class="badge-subdiv">${b.version}</span>` : ''}</td>
            <td style="width:25%" class="bold">MB Reference</td>
            <td><b>${esc(b.mbNo)}</b> (Date: ${esc(b.mbDate)})</td>
          </tr>
          <tr>
            <td class="bold">Contractor / Agency</td>
            <td><b>${esc(b.contractorName)}</b> (${esc(b.contractorId)})</td>
            <td class="bold">Prepared Date</td>
            <td>${esc(b.preparedDate)} (By: ${esc(b.preparedBy)})</td>
          </tr>
          <tr>
            <td class="bold">Gross Bill Amount</td>
            <td><b style="font-size:15px;color:var(--navy)">${formatCurrency(b.grossAmount)}</b></td>
            <td class="bold">Net Payable Amount</td>
            <td><b style="font-size:15px;color:var(--green)">${formatCurrency(b.netPayable)}</b></td>
          </tr>
          <tr>
            <td class="bold">Current Status</td>
            <td colspan="3">${renderBillStatusBadge(b.status)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-section-legend">2. Item-wise Measurement & BOQ Quantities</div>
    <div class="table-wrap">
      <table class="sub-material-table">
        <thead>
          <tr>
            <th style="width:50px">Item</th>
            <th style="width:70px">BOQ No.</th>
            <th>Item Description</th>
            <th style="text-align:right">Agr Qty</th>
            <th style="text-align:right">Executed Qty</th>
            <th style="text-align:center">Unit</th>
            <th style="text-align:right">Rate</th>
            <th style="text-align:right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${(b.items || []).map((it, idx) => `<tr>
            <td>${it.itemNo || (idx + 1)}</td>
            <td><b>${esc(it.boqItemNo || '—')}</b></td>
            <td>${esc(it.description)}</td>
            <td style="text-align:right">${Number(it.agreementQty).toLocaleString('en-IN')}</td>
            <td style="text-align:right"><b>${Number(it.executedQty).toLocaleString('en-IN')}</b></td>
            <td style="text-align:center">${esc(it.unit || 'Cum')}</td>
            <td style="text-align:right">${formatCurrency(it.rate)}</td>
            <td style="text-align:right"><b>${formatCurrency(it.amount)}</b></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="report-section-legend">3. Statutory Deductions & Recoveries Breakdown</div>
    <div class="table-wrap">
      <table class="report-table">
        <thead>
          <tr>
            <th>Deduction Head</th>
            <th>Rate / Rule</th>
            <th style="text-align:right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Income Tax (TDS)</td><td>2.00%</td><td style="text-align:right">${formatCurrency(b.deductions?.tdsAmount || 0)}</td></tr>
          <tr><td>GST TDS</td><td>2.00%</td><td style="text-align:right">${formatCurrency(b.deductions?.gstTdsAmount || 0)}</td></tr>
          <tr><td>Labour Welfare Cess</td><td>1.00%</td><td style="text-align:right">${formatCurrency(b.deductions?.labourCessAmount || 0)}</td></tr>
          <tr><td>Royalty on Minor Minerals</td><td>As per mining rules</td><td style="text-align:right">${formatCurrency(b.deductions?.royalty || 0)}</td></tr>
          <tr><td>Security Deposit (SD) Retention</td><td>5.00%</td><td style="text-align:right">${formatCurrency(b.deductions?.securityDepositAmount || 0)}</td></tr>
          <tr><td>Other Recoveries / Penalties</td><td>—</td><td style="text-align:right">${formatCurrency(b.deductions?.otherRecoveries || 0)}</td></tr>
          <tr style="background:#fef2f2;font-weight:700"><td>Total Statutory Deductions</td><td></td><td style="text-align:right;color:var(--red)">${formatCurrency(b.deductions?.totalDeductions || 0)}</td></tr>
          <tr style="background:#ecfdf5;font-weight:800;font-size:15px"><td>Net Payable to Contractor</td><td>Gross - Deductions</td><td style="text-align:right;color:var(--green)">${formatCurrency(b.netPayable)}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="report-section-legend">4. Contractor Electronic Signature & Digital Seal</div>
    ${b.signatureRecord ? `<div class="digital-seal" style="background:#ecfdf5;border:1.5px solid #059669;border-radius:10px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between">
      <div>
        <div style="font-weight:800;color:#065f46;font-size:14px">✓ CONTRACTOR ELECTRONICALLY SIGNED & SUBMITTED</div>
        <div class="small" style="color:#047857;margin-top:4px">
          Signed By: <b>${esc(b.signatureRecord.rep || b.signatureRecord.contractorName)}</b> (${esc(b.signatureRecord.contractorId)})<br>
          Timestamp: ${esc(b.signatureRecord.signedDate)}, ${esc(b.signatureRecord.signedTime)} · Hash: <code style="background:#d1fae5;padding:1px 4px;border-radius:4px">${esc(b.signatureRecord.signatureData)}</code>
        </div>
      </div>
      <div style="text-align:right;font-size:32px">🛡️</div>
    </div>` : `<div class="notice" style="background:#fffbeb;border:1px solid #fde68a;color:#92400e;padding:12px;border-radius:8px">
      ⚠️ <b>No Contractor Signature:</b> Contractor has not completed electronic signature on this version yet.
    </div>`}

    ${b.versions && b.versions.length ? `<div class="report-section-legend">5. Bill Version History (${b.versions.length} prior versions)</div>
    <div style="background:#fff;border:1px solid #dce8f1;border-radius:8px;padding:10px">
      ${b.versions.map((v, vi) => `<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between">
        <span><b>Version ${v.version}</b> · Archived: ${new Date(v.archivedAt).toLocaleDateString('en-GB')} by ${esc(v.archivedBy)}</span>
        <span>Gross: ${formatCurrency(v.grossAmount)} · Net: ${formatCurrency(v.netPayable)}</span>
      </div>`).join('')}
    </div>` : ''}
  </div>

  <div class="modal-actions" style="margin-top:20px;flex-wrap:wrap">
    <button type="button" class="secondary" onclick="closeModal()">Close</button>
    <button type="button" class="secondary" onclick="printBillInvoice(${b.id})" style="background:#0284c7;color:#fff;border-color:#0284c7" title="Print Bihar RCD Form 26 Running Account Bill Voucher">🖨️ Print Invoice / Bill Form</button>
    ${renderWorkflowActionButtons(b)}
  </div>`, true);
}

// Render dynamic workflow buttons strictly matching the active user role and bill status
function renderWorkflowActionButtons(b) {
  let r = current.role;
  let s = b.status;
  let btns = '';

  // Contractor Actions
  if (r === 'Contractor') {
    if (s === 'Prepared by JE – Pending Contractor Acceptance' || s === 'Revised by JE' || s === 'Submitted to Contractor') {
      btns += `<button class="primary" onclick="closeModal();contractorAcceptBill(${b.id})">✓ Accept Bill</button>`;
      btns += `<button class="secondary" onclick="closeModal();openModifyRequestModal(${b.id})">✏ Request Modification</button>`;
      btns += `<button class="danger" onclick="closeModal();openSendBackModal(${b.id})">↩ Send Back to JE</button>`;
    } else if (s === 'Contractor Accepted') {
      btns += `<button class="primary" onclick="closeModal();openDigitalSignatureModal(${b.id})" style="background:#059669">✍️ Digital Sign & Submit</button>`;
    }
  }

  // JE Actions
  if (r === 'JE') {
    if (s === 'Draft' || s === 'Draft with JE' || s === 'Recalled by JE') {
      btns += `<button class="secondary" onclick="closeModal();openEditBillModal(${b.id})">✏ Edit Bill</button>`;
      btns += `<button class="primary" onclick="closeModal();jeQuickFinalize(${b.id})" style="background:#4338ca">🔒 Finalize Bill</button>`;
      btns += `<button class="primary" onclick="closeModal();openSendForwardModal(${b.id})" style="background:#16a34a">📤 Send Forward to Contractor ➔</button>`;
    } else if (s === 'Finalized by JE') {
      btns += `<button class="secondary" onclick="closeModal();openEditBillModal(${b.id})">✏ Edit / Unlock Bill</button>`;
      btns += `<button class="primary" onclick="closeModal();openSendForwardModal(${b.id})" style="background:#16a34a">📤 Send Forward to Contractor ➔</button>`;
    } else if (s === 'Prepared by JE – Pending Contractor Acceptance' || s === 'Submitted to Contractor') {
      btns += `<button class="danger" onclick="closeModal();openCallBackModal(${b.id})" style="background:#d97706;border-color:#d97706">↩ Call Back Bill to JE Desk</button>`;
    } else if (s === 'Contractor Signed & Submitted') {
      btns += `<button class="primary" onclick="closeModal();openSendForwardModal(${b.id})" style="background:#16a34a">📤 Send Forward to AE ➔</button>`;
    } else if (s === 'Pending AE Checking' || s === 'Forwarded to AE') {
      btns += `<button class="danger" onclick="closeModal();openCallBackModal(${b.id})" style="background:#d97706;border-color:#d97706">↩ Call Back Bill from AE</button>`;
    } else if (s === 'Modification Requested' || s === 'Sent Back to JE' || s === 'Returned by AE') {
      btns += `<button class="primary" onclick="closeModal();openEditBillModal(${b.id})">✏ Edit / Revise Bill</button>`;
      btns += `<button class="primary" onclick="closeModal();openReviseBillModal(${b.id})">📝 Quick Revise & Resubmit</button>`;
    } else if (!b.signatureRecord) {
      btns += `<button class="secondary" disabled title="Rule 6: Locked until Contractor completes Sign & Submit" style="opacity:0.6;cursor:not-allowed">Forward to AE (Locked: Contractor Sign Pending)</button>`;
    }
  }

  // AE Actions
  if (r === 'AE') {
    if (s === 'Pending AE Checking' || s === 'Forwarded to AE') {
      btns += `<button class="primary" onclick="closeModal();openSendForwardModal(${b.id})" style="background:#16a34a">📤 Send Forward to EE (Checked) ➔</button>`;
      btns += `<button class="danger" onclick="closeModal();openReturnModal(${b.id})">↩ Call Back / Return to JE</button>`;
    } else if (s === 'AE Checked') {
      btns += `<button class="danger" onclick="closeModal();openCallBackModal(${b.id})" style="background:#d97706;border-color:#d97706">↩ Call Back Bill from EE</button>`;
    }
  }

  // EE Actions
  if (r === 'EE') {
    if (s === 'AE Checked') {
      btns += `<button class="primary" onclick="closeModal();eeCpBill(${b.id})" style="background:#16a34a">✓ Check & Pass (C&P) - Send to Accounts</button>`;
      btns += `<button class="danger" onclick="closeModal();openEeReturnModal(${b.id})">↩ Return for Correction</button>`;
    } else if (s === 'DAO Checked – Pending EE Final Approval') {
      btns += `<button class="primary" onclick="closeModal();eeFinalApproveBill(${b.id})" style="background:#059669">🛡️ Grant Final Approval & Send for Payment</button>`;
    }
  }

  // Accounts Clerk Actions
  if (r === 'Accounts Clerk') {
    if (s === 'EE C&P Completed' || s === 'Returned by DAO' || s === 'Under Accounts Scrutiny') {
      btns += `<button class="primary" onclick="closeModal();openAccountsProcessModal(${b.id})" style="background:#ea580c">📤 Pass Bill & Send Forward to DAO ➔</button>`;
      btns += `<button class="danger" onclick="closeModal();openAccountsReturnModal(${b.id})">↩ Return Bill</button>`;
    } else if (s === 'Accounts Processed – Sent to DAO') {
      btns += `<button class="danger" onclick="closeModal();openCallBackModal(${b.id})" style="background:#d97706;border-color:#d97706">↩ Call Back Bill from DAO</button>`;
    }
  }

  // DAO Actions
  if (r === 'DAO') {
    if (s === 'Accounts Processed – Sent to DAO' || s === 'Under DAO Scrutiny') {
      btns += `<button class="primary" onclick="closeModal();openDaoScrutinyModal(${b.id})" style="background:#db2777">📤 Scrutinise & Send Forward to EE ➔</button>`;
      btns += `<button class="danger" onclick="closeModal();openDaoReturnModal(${b.id})">↩ Return to Accounts Clerk</button>`;
    } else if (s === 'DAO Checked – Pending EE Final Approval') {
      btns += `<button class="danger" onclick="closeModal();openCallBackModal(${b.id})" style="background:#d97706;border-color:#d97706">↩ Call Back Bill from EE</button>`;
    }
  }

  return btns;
}

// --- TWO-PART BILL PREPARATION, AGREEMENT EXCEL UPLOAD & PRINTABLE INVOICE ENGINE ---
let activeAgreementBOQ = [];

function getActiveAgreementBOQ() {
  return activeAgreementBOQ;
}

function setActiveAgreementBOQ(items) {
  activeAgreementBOQ = items || [];
  return activeAgreementBOQ;
}

function getDefaultProjectBOQ(projectId) {
  let p = db.projects.find(x => x.id === Number(projectId)) || db.projects[0] || {};
  return [
    {
      id: 1,
      agreementItemNo: '1',
      sorNo: 'SOR-2024-RCD-2.1',
      description: 'Earthwork excavation for roadway in all kinds of soil as per MoRTH specifications clause 301',
      agreementQty: 20000,
      unit: 'Cum',
      rate: 185.00,
      amount: 3700000,
      selected: true,
      workDoneQty: 18500
    },
    {
      id: 2,
      agreementItemNo: '2',
      sorNo: 'SOR-2024-RCD-4.1.1',
      description: 'Granular Sub-Base (GSB) with well graded natural gravel/crushed stone grading-I',
      agreementQty: 12000,
      unit: 'Cum',
      rate: 1420.00,
      amount: 17040000,
      selected: true,
      workDoneQty: 10000
    },
    {
      id: 3,
      agreementItemNo: '3',
      sorNo: 'SOR-2024-RCD-4.2.3',
      description: 'Wet Mix Macadam (WMM) Base course 250mm compacted thickness in two layers',
      agreementQty: 8500,
      unit: 'Cum',
      rate: 1890.00,
      amount: 16065000,
      selected: true,
      workDoneQty: 7200
    },
    {
      id: 4,
      agreementItemNo: '4',
      sorNo: 'SOR-2024-RCD-5.1.2',
      description: 'Dense Bituminous Macadam (DBM) with Bitumen VG-30, 75mm compacted thickness',
      agreementQty: 4200,
      unit: 'Cum',
      rate: 4550.00,
      amount: 19110000,
      selected: false,
      workDoneQty: 0
    },
    {
      id: 5,
      agreementItemNo: '5',
      sorNo: 'SOR-2024-RCD-5.2.1',
      description: 'Bituminous Concrete (BC) 40mm wearing course with Bitumen VG-30 & specified grading',
      agreementQty: 3800,
      unit: 'Cum',
      rate: 5120.00,
      amount: 19456000,
      selected: false,
      workDoneQty: 0
    },
    {
      id: 6,
      agreementItemNo: '6',
      sorNo: 'SOR-2024-RCD-7.3.1',
      description: 'Reinforced Cement Concrete (RCC) M-25 Grade for culverts, headwalls & side drains',
      agreementQty: 950,
      unit: 'Cum',
      rate: 6850.00,
      amount: 6507500,
      selected: false,
      workDoneQty: 0
    },
    {
      id: 7,
      agreementItemNo: '7',
      sorNo: 'SOR-2024-RCD-8.1.4',
      description: 'Retro-reflective traffic sign boards, cautionary signage & thermoplastic road markings',
      agreementQty: 120,
      unit: 'Each',
      rate: 8500.00,
      amount: 1020000,
      selected: false,
      workDoneQty: 0
    }
  ];
}

function parseCSVContent(text) {
  let lines = text.split(/\r\n|\n/).map(l => l.trim()).filter(Boolean);
  if (!lines.length) return [];
  let items = [];
  let startIdx = 0;
  if (lines[0].toLowerCase().includes('item') || lines[0].toLowerCase().includes('sl') || lines[0].toLowerCase().includes('sor') || lines[0].toLowerCase().includes('qty')) {
    startIdx = 1;
  }
  for (let i = startIdx; i < lines.length; i++) {
    let cols = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
    cols = cols.map(c => c.replace(/^"|"$/g, '').trim());
    if (cols.length >= 4) {
      let slNo = cols[0] || String(items.length + 1);
      let agrItem = cols[1] || String(items.length + 1);
      let sor = cols[2] || '';
      let desc = cols[3] || 'Agreement Work Item';
      let agrQty = Number(cols[4]) || 0;
      let rate = Number(cols[5]) || 0;
      let amt = cols[6] ? Number(cols[6]) : (agrQty * rate);
      items.push({
        id: items.length + 1,
        agreementItemNo: agrItem,
        sorNo: sor,
        description: desc,
        agreementQty: agrQty,
        unit: 'Cum',
        rate: rate,
        amount: amt,
        selected: true,
        workDoneQty: agrQty
      });
    }
  }
  return items;
}

function downloadAgreementBOQTemplate() {
  let csv = 'Sl. No.,Agreement Item No.,SOR No. Item,Item Description,Agreement Qty,Rate,Amount\r\n' +
    '1,1,SOR-2024-RCD-2.1,"Earthwork excavation for roadway in all kinds of soil",20000,185.00,3700000\r\n' +
    '2,2,SOR-2024-RCD-4.1.1,"Granular Sub-Base (GSB) with well graded natural gravel",12000,1420.00,17040000\r\n' +
    '3,3,SOR-2024-RCD-4.2.3,"Wet Mix Macadam (WMM) Base course 250mm thickness",8500,1890.00,16065000\r\n' +
    '4,4,SOR-2024-RCD-5.1.2,"Dense Bituminous Macadam (DBM) with Bitumen VG-30",4200,4550.00,19110000\r\n' +
    '5,5,SOR-2024-RCD-5.2.1,"Bituminous Concrete (BC) 40mm wearing course",3800,5120.00,19456000\r\n' +
    '6,6,SOR-2024-RCD-7.3.1,"Reinforced Cement Concrete (RCC) M-25 Grade",950,6850.00,6507500\r\n' +
    '7,7,SOR-2024-RCD-8.1.4,"Retro-reflective traffic sign boards & road markings",120,8500.00,1020000\r\n';

  if (typeof Blob !== 'undefined' && typeof document !== 'undefined') {
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement('a');
    let url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'RCD_Hilsa_Agreement_BOQ_Template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  showToast('Agreement BOQ Excel/CSV Template downloaded. Open in Excel, edit quantities/rates, and upload!', 'info');
}

function handleAgreementExcelUpload(input) {
  if (!input || !input.files || !input.files[0]) return;
  let file = input.files[0];
  let fileName = file.name.toLowerCase();

  if (fileName.endsWith('.csv')) {
    let reader = new FileReader();
    reader.onload = function(e) {
      let parsed = parseCSVContent(e.target.result);
      if (parsed.length) {
        activeAgreementBOQ = parsed;
        let c = document.querySelector('#bill-two-part-container');
        if (c) c.innerHTML = renderBillTwoPartSections();
        calculateBillTotals();
        showToast(`Agreement BOQ loaded: ${parsed.length} items imported successfully from CSV.`, 'success');
      } else {
        alert('Could not parse valid items from CSV. Please download and follow the standard template.');
      }
    };
    reader.readAsText(file);
  } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
    let reader = new FileReader();
    reader.onload = function(e) {
      try {
        if (typeof XLSX !== 'undefined') {
          let data = new Uint8Array(e.target.result);
          let workbook = XLSX.read(data, { type: 'array' });
          let sheetName = workbook.SheetNames[0];
          let sheet = workbook.Sheets[sheetName];
          let rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          if (rows && rows.length > 1) {
            let parsed = [];
            for (let i = 1; i < rows.length; i++) {
              let r = rows[i];
              if (!r || !r.length) continue;
              let agrQty = Number(r[4]) || 0;
              let rate = Number(r[5]) || 0;
              parsed.push({
                id: parsed.length + 1,
                agreementItemNo: String(r[1] || parsed.length + 1),
                sorNo: String(r[2] || ''),
                description: String(r[3] || 'Work item'),
                agreementQty: agrQty,
                unit: 'Cum',
                rate: rate,
                amount: r[6] ? Number(r[6]) : (agrQty * rate),
                selected: true,
                workDoneQty: agrQty
              });
            }
            if (parsed.length) {
              activeAgreementBOQ = parsed;
              let c = document.querySelector('#bill-two-part-container');
              if (c) c.innerHTML = renderBillTwoPartSections();
              calculateBillTotals();
              showToast(`Agreement BOQ loaded: ${parsed.length} items imported from Excel (.xlsx).`, 'success');
              return;
            }
          }
        }
      } catch (err) {
        console.error('XLSX parse error', err);
      }
      alert('For Excel .xlsx files, you can also save your Excel sheet as CSV and upload for instant processing.');
    };
    reader.readAsArrayBuffer(file);
  }
}

function renderBillTwoPartSections() {
  if (!activeAgreementBOQ || !activeAgreementBOQ.length) {
    activeAgreementBOQ = getDefaultProjectBOQ(1);
  }
  let selectedItems = activeAgreementBOQ.filter(it => it.selected);

  return `
  <!-- PART 1: AGREEMENT BOQ SCHEDULE MASTER WITH EXCEL UPLOAD -->
  <div class="bill-section-card section-agreement" style="border:1.5px solid #93c5fd;border-radius:10px;background:#f8fafc;padding:16px;margin-bottom:18px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
      <div>
        <div style="font-weight:800;color:var(--navy);font-size:14.5px;display:flex;align-items:center;gap:6px">
          <span>📑 Section 1: Agreement BOQ Schedule Master (एकरारनामा मद सूची)</span>
          <span style="font-size:11px;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:12px;font-weight:700">${activeAgreementBOQ.length} Items in Agreement</span>
        </div>
        <div style="font-size:11.5px;color:var(--muted);margin-top:2px">
          Upload entire Agreement Excel/CSV or select from project BOQ. <b>Tick items</b> below to include in this Bill.
        </div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
        <label class="button secondary small" style="margin:0;cursor:pointer;background:#e0f2fe;color:#0369a1;border-color:#bae6fd;font-weight:700">
          📂 Upload Agreement Excel / CSV
          <input type="file" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleAgreementExcelUpload(this)">
        </label>
        <button type="button" class="secondary small" onclick="downloadAgreementBOQTemplate()" title="Download standard Excel/CSV template">📥 Download Template</button>
        <button type="button" class="secondary small" onclick="addAgreementBOQItemRow()" title="Add manual agreement row">+ Add Row</button>
        <button type="button" class="secondary small" onclick="toggleAllAgreementItems(true)" title="Tick all items">✓ Select All</button>
        <button type="button" class="secondary small" onclick="toggleAllAgreementItems(false)" title="Clear selection">✕ Clear</button>
      </div>
    </div>

    <div class="table-wrap" style="max-height:220px;overflow-y:auto;border:1px solid #cbd5e1;border-radius:6px;background:#fff">
      <table style="font-size:11.5px;margin:0">
        <thead style="position:sticky;top:0;background:#f1f5f9;z-index:2">
          <tr>
            <th style="width:42px;text-align:center">Tick</th>
            <th style="width:45px">1. Sl.</th>
            <th style="width:105px">2. Agr Item No.</th>
            <th style="width:125px">3. SOR No., Item</th>
            <th>4. Item Description</th>
            <th style="text-align:right;width:110px">5. Agr Qty</th>
            <th style="text-align:right;width:95px">6. Rate (₹)</th>
            <th style="text-align:right;width:120px">07. Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${activeAgreementBOQ.map((it, idx) => {
            let agrAmt = (Number(it.agreementQty) || 0) * (Number(it.rate) || 0);
            return `
            <tr style="background:${it.selected ? '#f0fdf4' : '#fff'}">
              <td style="text-align:center">
                <input type="checkbox" style="cursor:pointer;width:16px;height:16px" onchange="toggleAgreementItem(${idx})" ${it.selected ? 'checked' : ''} title="Tick to include in current bill">
              </td>
              <td><b>${idx + 1}</b></td>
              <td><span style="font-weight:700;color:#0f172a">${esc(it.agreementItemNo)}</span></td>
              <td><span style="font-family:monospace;color:#475569">${esc(it.sorNo || '—')}</span></td>
              <td>${esc(it.description)}</td>
              <td style="text-align:right;font-weight:600">${Number(it.agreementQty || 0).toLocaleString('en-IN')}</td>
              <td style="text-align:right">${Number(it.rate || 0).toFixed(2)}</td>
              <td style="text-align:right;font-weight:700;color:#0f172a">${formatCurrency(agrAmt)}</td>
            </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- PART 2: EXECUTED WORK DONE MEASUREMENT & VALUATION (CURRENT BILL) -->
  <div class="bill-section-card section-workdone" style="border:1.5px solid #86efac;border-radius:10px;background:#f0fdf4;padding:16px;margin-bottom:18px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
      <div>
        <div style="font-weight:800;color:#166534;font-size:14.5px;display:flex;align-items:center;gap:6px">
          <span>📐 Section 2: Executed Work Done Measurement & Valuation (वर्तमान विपत्र मापी एवं देय राशि)</span>
          <span class="badge-subdiv" style="background:#dcfce7;color:#15803d;font-weight:800">${selectedItems.length} Items Selected for this Bill</span>
        </div>
        <div style="font-size:11.5px;color:#15803d;margin-top:2px">
          Auto-populated from Section 1. <b>Agreement Qty (Col 5)</b> and <b>Rate (Col 7)</b> are 🔒 locked. Junior Engineer enters <b>Work Done Qty (Col 6)</b>. Col 08 Amount auto-calculates.
        </div>
      </div>
    </div>

    ${selectedItems.length === 0 ? `
      <div style="padding:24px;text-align:center;background:#fff;border:1px dashed #86efac;border-radius:6px;color:#047857;font-size:13px">
        ⚠️ <b>No agreement items ticked yet.</b><br>
        Please tick one or more checkboxes in <b>Section 1 (Agreement BOQ Schedule Master)</b> above to populate executed measurement items into this bill.
      </div>
    ` : `
      <div class="table-wrap" style="max-height:280px;overflow-y:auto;border:1px solid #86efac;border-radius:6px;background:#fff">
        <table style="font-size:11.5px;margin:0">
          <thead style="position:sticky;top:0;background:#dcfce7;z-index:2">
            <tr>
              <th style="width:45px">1. Sl.</th>
              <th style="width:105px">2. Agr Item No.</th>
              <th style="width:125px">3. SOR No., Item</th>
              <th>4. Item Description</th>
              <th style="text-align:right;width:115px;background:#f1f5f9" title="Locked / Read-Only">5. Agr Qty 🔒</th>
              <th style="text-align:right;width:140px;background:#fef3c7;color:#92400e">6. Work Done Qty ✏</th>
              <th style="text-align:right;width:100px;background:#f1f5f9" title="Locked / Read-Only">7. Rate (₹) 🔒</th>
              <th style="text-align:right;width:130px;background:#e0f2fe;color:#0369a1" title="Auto-Calculated">08. Amount (₹) ⚡</th>
            </tr>
          </thead>
          <tbody>
            ${selectedItems.map((it, sIdx) => {
              let realIdx = activeAgreementBOQ.indexOf(it);
              let wQty = it.workDoneQty !== undefined ? it.workDoneQty : (it.agreementQty || 0);
              let rowAmt = (Number(wQty) || 0) * (Number(it.rate) || 0);
              let isOver = Number(wQty) > Number(it.agreementQty);
              return `
              <tr style="background:${isOver ? '#fef2f2' : '#fff'}">
                <td><b>${sIdx + 1}</b></td>
                <td><b>${esc(it.agreementItemNo)}</b></td>
                <td><span style="font-family:monospace;color:#475569">${esc(it.sorNo || '—')}</span></td>
                <td>
                  ${esc(it.description)}
                  <span id="item-warn-${realIdx}" style="display:${isOver ? 'inline' : 'none'};color:var(--red);font-weight:700;font-size:10px;margin-left:6px">⚠️ Exceeds Agr Qty!</span>
                </td>
                <td style="text-align:right;background:#f8fafc">
                  <input type="text" readonly value="${Number(it.agreementQty || 0).toLocaleString('en-IN')}" style="background:#f1f5f9;font-weight:700;text-align:right;width:100%;cursor:not-allowed;padding:4px 6px;border:1px solid #cbd5e1;color:#475569" title="Agreement Qty is Locked (Read-Only)">
                </td>
                <td style="text-align:right;background:#fffbeb">
                  <input type="number" step="any" required class="workdone-qty-input" data-idx="${realIdx}" value="${wQty}" oninput="updateWorkDoneQty(${realIdx}, this.value)" style="font-weight:800;text-align:right;width:100%;border:1.5px solid #f59e0b;padding:4px 6px;border-radius:4px" title="Enter Work Done Qty (Executed)">
                </td>
                <td style="text-align:right;background:#f8fafc">
                  <input type="text" readonly value="${Number(it.rate || 0).toFixed(2)}" style="background:#f1f5f9;font-weight:600;text-align:right;width:100%;cursor:not-allowed;padding:4px 6px;border:1px solid #cbd5e1;color:#475569" title="Rate is Locked (Auto-Populated from Section 1)">
                </td>
                <td style="text-align:right;background:#f0f9ff">
                  <input type="text" readonly id="item-amount-${realIdx}" value="${formatCurrency(rowAmt)}" style="background:#e0f2fe;font-weight:900;color:#0369a1;text-align:right;width:100%;cursor:not-allowed;padding:4px 6px;border:1px solid #bae6fd" title="Amount = Work Done Qty * Rate (Auto-Calculated)">
                </td>
              </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `}
  </div>
  `;
}

function toggleAgreementItem(idx) {
  if (!activeAgreementBOQ[idx]) return;
  activeAgreementBOQ[idx].selected = !activeAgreementBOQ[idx].selected;
  if (activeAgreementBOQ[idx].selected && (!activeAgreementBOQ[idx].workDoneQty || activeAgreementBOQ[idx].workDoneQty === 0)) {
    activeAgreementBOQ[idx].workDoneQty = activeAgreementBOQ[idx].agreementQty;
  }
  let c = document.querySelector('#bill-two-part-container');
  if (c) c.innerHTML = renderBillTwoPartSections();
  calculateBillTotals();
}

function toggleAllAgreementItems(selectAll) {
  activeAgreementBOQ.forEach(it => {
    it.selected = selectAll;
    if (selectAll && (!it.workDoneQty || it.workDoneQty === 0)) {
      it.workDoneQty = it.agreementQty;
    }
  });
  let c = document.querySelector('#bill-two-part-container');
  if (c) c.innerHTML = renderBillTwoPartSections();
  calculateBillTotals();
}

function addAgreementBOQItemRow() {
  let nextNo = String(activeAgreementBOQ.length + 1);
  activeAgreementBOQ.push({
    id: activeAgreementBOQ.length + 1,
    agreementItemNo: nextNo,
    sorNo: 'SOR-2024-RCD-' + nextNo,
    description: 'Additional Road Work Item ' + nextNo,
    agreementQty: 1000,
    unit: 'Cum',
    rate: 500,
    amount: 500000,
    selected: true,
    workDoneQty: 1000
  });
  let c = document.querySelector('#bill-two-part-container');
  if (c) c.innerHTML = renderBillTwoPartSections();
  calculateBillTotals();
}

function updateWorkDoneQty(idx, val) {
  if (!activeAgreementBOQ[idx]) return;
  let q = Number(val) || 0;
  activeAgreementBOQ[idx].workDoneQty = q;
  let r = Number(activeAgreementBOQ[idx].rate) || 0;
  let amt = q * r;
  let amtInput = document.querySelector('#item-amount-' + idx);
  if (amtInput) {
    amtInput.value = formatCurrency(amt);
  }
  let warnSpan = document.querySelector('#item-warn-' + idx);
  if (warnSpan) {
    warnSpan.style.display = (q > Number(activeAgreementBOQ[idx].agreementQty)) ? 'inline' : 'none';
  }
  calculateBillTotals();
}

function autoPopulateBillProject(projectId) {
  let p = db.projects.find(x => x.id === Number(projectId));
  if (!p) return;
  let mbInput = document.querySelector('[name="mbNo"]');
  if (mbInput && (!mbInput.value || mbInput.value.startsWith('MB-'))) {
    mbInput.value = 'MB-' + (p.subDivision ? p.subDivision.slice(0, 3).toUpperCase() : 'HIL') + '-' + new Date().getFullYear() + '/01';
  }
  activeAgreementBOQ = getDefaultProjectBOQ(p.id);
  let c = document.querySelector('#bill-two-part-container');
  if (c) c.innerHTML = renderBillTwoPartSections();
  calculateBillTotals();
}

function calculateBillTotals() {
  let form = document.querySelector('#create-bill-form');
  if (!form) return;

  let totalGross = 0;
  let selected = activeAgreementBOQ.filter(it => it.selected);
  if (selected.length > 0) {
    selected.forEach(it => {
      let q = Number(it.workDoneQty) || 0;
      let r = Number(it.rate) || 0;
      totalGross += (q * r);
    });
  } else {
    // Fallback for tests submitting via item_execqty_0 etc.
    for (let i = 0; i < 30; i++) {
      let eq = form.querySelector(`[name="item_execqty_${i}"]`);
      let rt = form.querySelector(`[name="item_rate_${i}"]`);
      let am = form.querySelector(`[name="item_amount_${i}"]`);
      if (eq && rt && am) {
        let q = Number(eq.value) || 0;
        let r = Number(rt.value) || 0;
        let val = q * r;
        am.value = val;
        totalGross += val;
      }
    }
  }

  // Statutory Deductions: TDS 2%, GST TDS 2%, Cess 1%, SD 5% = 10% + Royalty 27500
  let deductions = Math.round(totalGross * 0.10) + 27500;
  let net = Math.max(0, totalGross - deductions);

  let dg = document.querySelector('#display-gross-amount');
  let dd = document.querySelector('#display-deductions-amount');
  let dn = document.querySelector('#display-net-amount');
  let hg = document.querySelector('#hidden-gross-amount');
  let hd = document.querySelector('#hidden-deductions-amount');
  let hn = document.querySelector('#hidden-net-amount');

  if (dg) dg.innerText = formatCurrency(totalGross);
  if (dd) dd.innerText = formatCurrency(deductions);
  if (dn) dn.innerText = formatCurrency(net);
  if (hg) hg.value = totalGross;
  if (hd) hd.value = deductions;
  if (hn) hn.value = net;
}

// 1. JE: Create Bill Modal (Two-Part Split View with Agreement Excel & Work Done Measurements)
function openCreateBillModal(initialProjectId) {
  if (current.role !== 'JE') {
    alert('Permission denied: Only Junior Engineer (JE) can prepare/create bills.');
    return;
  }

  let projects = db.projects;
  let pId = initialProjectId || (projects[0]?.id || 1);
  let p = projects.find(x => x.id === Number(pId)) || projects[0] || {};

  activeAgreementBOQ = getDefaultProjectBOQ(p.id);

  overlay(`<h3>Prepare New Running Account / Departmental Bill</h3>
  <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA</p>

  <form id="create-bill-form" onsubmit="handleCreateBillSubmit(event)" style="max-height:76vh;overflow-y:auto;padding-right:8px">
    <div class="report-section-legend">1. Work & Agreement Details</div>
    <div class="form-grid-2">
      <div class="field">
        <label>Select Road Project <span style="color:var(--red)">*</span></label>
        <select name="projectId" required onchange="autoPopulateBillProject(this.value)">
          ${projects.map(prj => `<option value="${prj.id}" ${prj.id === p.id ? 'selected' : ''}>${esc(prj.name)} (#${prj.id})</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>Bill Number / Reference <span style="color:var(--red)">*</span></label>
        <input name="billNumber" id="bill-number-inp" required placeholder="e.g. 1st RA Bill / 2nd RA Bill" value="2nd RA Bill">
      </div>
    </div>

    <div class="form-grid-3">
      <div class="field">
        <label>Bill Type</label>
        <select name="billType">
          <option>RA Bill</option>
          <option>Final Bill</option>
          <option>Advance Bill</option>
        </select>
      </div>
      <div class="field">
        <label>MB Number <span style="color:var(--red)">*</span></label>
        <input name="mbNo" required placeholder="e.g. MB-RDH-2026/08" value="MB-RDH-${new Date().getFullYear()}/08">
      </div>
      <div class="field">
        <label>MB Date <span style="color:var(--red)">*</span></label>
        <input name="mbDate" type="date" required value="${new Date().toISOString().slice(0, 10)}">
      </div>
    </div>

    <div class="field">
      <label>Bill Period (From - To)</label>
      <input name="billPeriod" placeholder="e.g. 01 Aug 2026 to 31 Aug 2026" value="01 Aug 2026 to 31 Aug 2026">
    </div>

    <!-- TWO-PART BILL PREPARATION SECTIONS -->
    <div id="bill-two-part-container">
      ${renderBillTwoPartSections()}
    </div>

    <div class="report-section-legend">3. Financial Calculation Summary</div>
    <div style="background:#f1f5f9;border-radius:10px;padding:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px">
      <div>
        <label class="small" style="font-weight:700;color:var(--muted)">GROSS AMOUNT (₹)</label>
        <div id="display-gross-amount" style="font-size:18px;font-weight:800;color:var(--navy)">₹0</div>
        <input type="hidden" name="grossAmount" id="hidden-gross-amount" value="0">
      </div>
      <div>
        <label class="small" style="font-weight:700;color:var(--muted)">STATUTORY DEDUCTIONS (₹)</label>
        <div id="display-deductions-amount" style="font-size:18px;font-weight:800;color:var(--red)">₹0</div>
        <input type="hidden" name="totalDeductions" id="hidden-deductions-amount" value="0">
      </div>
      <div>
        <label class="small" style="font-weight:700;color:var(--muted)">NET PAYABLE (₹)</label>
        <div id="display-net-amount" style="font-size:18px;font-weight:800;color:var(--green)">₹0</div>
        <input type="hidden" name="netPayable" id="hidden-net-amount" value="0">
      </div>
    </div>

    <div class="field">
      <label>Junior Engineer Remarks</label>
      <textarea name="remarks" rows="2" placeholder="Inspection notes or measurement details">All items measured accurately as per site conditions and recorded in MB.</textarea>
    </div>

    <div class="modal-actions" style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <div style="display:flex;gap:8px">
        <button type="button" class="secondary" onclick="printBillInvoiceFromForm()" style="background:#f0fdf4;border-color:#16a34a;color:#166534;font-weight:700">🖨️ Print Invoice / Bill Form</button>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" name="submit_action" value="draft" class="secondary" style="background:#f1f5f9;border-color:#cbd5e1;font-weight:700">💾 Save as Draft</button>
        <button type="submit" name="submit_action" value="finalize" class="primary" style="background:#4338ca;border-color:#4338ca">🔒 Finalize Bill</button>
        <button type="submit" name="submit_action" value="submit" class="primary" style="background:#16a34a">📤 Send Forward to Contractor ➔</button>
      </div>
    </div>
  </form>`, true);

  calculateBillTotals();
}

// 1B. JE: Edit Bill Modal (Save as Draft, Finalize, Send Forward & Print)
function openEditBillModal(billId) {
  if (current.role !== 'JE') {
    alert('Permission denied: Only Junior Engineer (JE) can edit bills.');
    return;
  }

  let b = db.bills.find(x => x.id === Number(billId));
  if (!b) return;

  let projects = db.projects;
  let p = projects.find(x => x.id === b.projectId) || projects[0] || {};

  activeAgreementBOQ = getDefaultProjectBOQ(b.projectId);

  if (b.items && b.items.length) {
    b.items.forEach(bi => {
      let match = activeAgreementBOQ.find(it => it.agreementItemNo === bi.agreementItemNo || it.agreementItemNo === bi.boqItemNo || it.description === bi.description);
      if (match) {
        match.selected = true;
        match.workDoneQty = bi.executedQty !== undefined ? bi.executedQty : (bi.workDoneQty || 0);
        match.agreementQty = bi.agreementQty || match.agreementQty;
        match.rate = bi.rate || match.rate;
      } else {
        activeAgreementBOQ.push({
          id: activeAgreementBOQ.length + 1,
          agreementItemNo: bi.agreementItemNo || bi.boqItemNo || String(activeAgreementBOQ.length + 1),
          sorNo: bi.sorNo || '—',
          description: bi.description,
          agreementQty: bi.agreementQty || 0,
          unit: bi.unit || 'Cum',
          rate: bi.rate || 0,
          amount: (bi.executedQty || 0) * (bi.rate || 0),
          selected: true,
          workDoneQty: bi.executedQty !== undefined ? bi.executedQty : (bi.workDoneQty || 0)
        });
      }
    });
  }

  overlay(`<h3>Edit Running Account Bill · ${esc(b.billNumber)}</h3>
  <p>Current Status: ${renderBillStatusBadge(b.status)} · Road Division Hilsa</p>

  <form id="create-bill-form" onsubmit="handleCreateBillSubmit(event)" style="max-height:76vh;overflow-y:auto;padding-right:8px">
    <input type="hidden" name="editBillId" value="${b.id}">

    <div class="report-section-legend">1. Work & Agreement Details</div>
    <div class="form-grid-2">
      <div class="field">
        <label>Select Road Project <span style="color:var(--red)">*</span></label>
        <select name="projectId" required onchange="autoPopulateBillProject(this.value)">
          ${projects.map(prj => `<option value="${prj.id}" ${prj.id === b.projectId ? 'selected' : ''}>${esc(prj.name)} (#${prj.id})</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>Bill Number / Reference <span style="color:var(--red)">*</span></label>
        <input name="billNumber" id="bill-number-inp" required placeholder="e.g. 1st RA Bill / 2nd RA Bill" value="${esc(b.billNumber)}">
      </div>
    </div>

    <div class="form-grid-3">
      <div class="field">
        <label>Bill Type</label>
        <select name="billType">
          <option ${b.billType === 'RA Bill' ? 'selected' : ''}>RA Bill</option>
          <option ${b.billType === 'Final Bill' ? 'selected' : ''}>Final Bill</option>
          <option ${b.billType === 'Advance Bill' ? 'selected' : ''}>Advance Bill</option>
        </select>
      </div>
      <div class="field">
        <label>MB Number <span style="color:var(--red)">*</span></label>
        <input name="mbNo" required placeholder="e.g. MB-RDH-2026/08" value="${esc(b.mbNo || '')}">
      </div>
      <div class="field">
        <label>MB Date <span style="color:var(--red)">*</span></label>
        <input name="mbDate" type="date" required value="${b.mbDate || new Date().toISOString().slice(0, 10)}">
      </div>
    </div>

    <div class="field">
      <label>Bill Period (From - To)</label>
      <input name="billPeriod" placeholder="e.g. 01 Aug 2026 to 31 Aug 2026" value="${esc(b.billPeriod || '')}">
    </div>

    <!-- TWO-PART BILL PREPARATION SECTIONS -->
    <div id="bill-two-part-container">
      ${renderBillTwoPartSections()}
    </div>

    <div class="report-section-legend">3. Financial Calculation Summary</div>
    <div style="background:#f1f5f9;border-radius:10px;padding:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px">
      <div>
        <label class="small" style="font-weight:700;color:var(--muted)">GROSS AMOUNT (₹)</label>
        <div id="display-gross-amount" style="font-size:18px;font-weight:800;color:var(--navy)">${formatCurrency(b.grossAmount)}</div>
        <input type="hidden" name="grossAmount" id="hidden-gross-amount" value="${b.grossAmount}">
      </div>
      <div>
        <label class="small" style="font-weight:700;color:var(--muted)">STATUTORY DEDUCTIONS (₹)</label>
        <div id="display-deductions-amount" style="font-size:18px;font-weight:800;color:var(--red)">${formatCurrency(b.deductions?.totalDeductions || 0)}</div>
        <input type="hidden" name="totalDeductions" id="hidden-deductions-amount" value="${b.deductions?.totalDeductions || 0}">
      </div>
      <div>
        <label class="small" style="font-weight:700;color:var(--muted)">NET PAYABLE (₹)</label>
        <div id="display-net-amount" style="font-size:18px;font-weight:800;color:var(--green)">${formatCurrency(b.netPayable)}</div>
        <input type="hidden" name="netPayable" id="hidden-net-amount" value="${b.netPayable}">
      </div>
    </div>

    <div class="field">
      <label>Junior Engineer Remarks</label>
      <textarea name="remarks" rows="2" placeholder="Inspection notes or measurement details">${esc(b.remarks || '')}</textarea>
    </div>

    <div class="modal-actions" style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <div style="display:flex;gap:8px">
        <button type="button" class="secondary" onclick="printBillInvoiceFromForm()" style="background:#f0fdf4;border-color:#16a34a;color:#166534;font-weight:700">🖨️ Print Invoice / Bill Form</button>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
        <button type="submit" name="submit_action" value="draft" class="secondary" style="background:#f1f5f9;border-color:#cbd5e1;font-weight:700">💾 Save as Draft</button>
        <button type="submit" name="submit_action" value="finalize" class="primary" style="background:#4338ca;border-color:#4338ca">🔒 Finalize Bill</button>
        <button type="submit" name="submit_action" value="submit" class="primary" style="background:#16a34a">📤 Send Forward to Contractor ➔</button>
      </div>
    </div>
  </form>`, true);

  calculateBillTotals();
}

let billItemCount = 1;
function addBillItemRow() {
  addAgreementBOQItemRow();
}

function handleCreateBillSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  let form = e.target;
  let btn = e.submitter;
  let action = btn && btn.value ? btn.value : 'draft';
  let isDraft = action === 'draft';
  let isFinalized = action === 'finalize';

  let d = {};
  if (typeof FormData !== 'undefined') {
    try {
      d = new FormData(form);
    } catch (err) {}
  }
  let getVal = (k) => {
    if (d && typeof d.get === 'function') {
      let v = d.get(k);
      if (v !== null && v !== undefined) return v;
    }
    if (form && form.elements && form.elements[k]) {
      return form.elements[k].value;
    }
    return '';
  };

  let editBillId = getVal('editBillId');
  let pId = Number(getVal('projectId')) || 1;
  let p = db.projects.find(x => x.id === pId);

  let items = [];
  let selected = activeAgreementBOQ.filter(it => it.selected);
  if (selected.length > 0) {
    items = selected.map((it, i) => ({
      id: i + 1,
      itemNo: String(i + 1),
      agreementItemNo: it.agreementItemNo || String(i + 1),
      boqItemNo: it.agreementItemNo || String(i + 1),
      sorNo: it.sorNo || '—',
      description: it.description,
      agreementQty: Number(it.agreementQty) || 0,
      workDoneQty: Number(it.workDoneQty) || 0,
      executedQty: Number(it.workDoneQty) || 0,
      unit: it.unit || 'Cum',
      rate: Number(it.rate) || 0,
      amount: (Number(it.workDoneQty) || 0) * (Number(it.rate) || 0)
    }));
  } else {
    // Fallback for tests submitting via item_desc_0 etc.
    for (let i = 0; i < 30; i++) {
      let desc = getVal(`item_desc_${i}`);
      if (desc) {
        let eq = Number(getVal(`item_execqty_${i}`)) || 0;
        let rt = Number(getVal(`item_rate_${i}`)) || 0;
        items.push({
          id: i + 1,
          itemNo: String(i + 1),
          agreementItemNo: getVal(`item_boq_${i}`) || String(i + 1),
          boqItemNo: getVal(`item_boq_${i}`) || '',
          sorNo: '—',
          description: desc,
          agreementQty: Number(getVal(`item_agrqty_${i}`)) || 0,
          workDoneQty: eq,
          executedQty: eq,
          unit: 'Cum',
          rate: rt,
          amount: Number(getVal(`item_amount_${i}`)) || (eq * rt)
        });
      }
    }
  }

  let gross = Number(getVal('grossAmount')) || 0;
  if (!gross && items.length) {
    gross = items.reduce((acc, it) => acc + (it.amount || 0), 0);
  }
  let totalD = Number(getVal('totalDeductions')) || 0;
  if (!totalD && gross) {
    totalD = Math.round(gross * 0.10) + 27500;
  }
  let net = Number(getVal('netPayable')) || Math.max(0, gross - totalD);

  let billData = {
    projectId: pId,
    billNumber: getVal('billNumber') || 'RA Bill',
    billType: getVal('billType') || 'RA Bill',
    mbNo: getVal('mbNo') || 'MB-01',
    mbDate: getVal('mbDate') || new Date().toISOString().slice(0, 10),
    billPeriod: getVal('billPeriod') || 'Current Period',
    contractorId: p ? p.contractorId : 'CON-01',
    contractorName: p ? p.contractorName : 'Contractor',
    items,
    grossAmount: gross,
    deductions: {
      tdsPercent: 2, tdsAmount: Math.round(gross * 0.02),
      gstTdsPercent: 2, gstTdsAmount: Math.round(gross * 0.02),
      labourCessPercent: 1, labourCessAmount: Math.round(gross * 0.01),
      royalty: 27500,
      securityDepositPercent: 5, securityDepositAmount: Math.round(gross * 0.05),
      otherRecoveries: 0,
      totalDeductions: totalD
    },
    netPayable: net,
    remarks: getVal('remarks') || 'Measured accurately as per site conditions.',
    isDraft,
    isFinalized,
    submit_action: action
  };

  try {
    if (editBillId) {
      WorkflowEngine.jeEditDraftBill(current, Number(editBillId), billData, action);
      showToast(action === 'draft' ? 'Bill saved as Draft' : (action === 'finalize' ? 'Bill finalized successfully!' : 'Bill submitted to Contractor successfully'));
    } else {
      let created = WorkflowEngine.createBill(current, billData);
      showToast(action === 'draft' ? 'Bill saved as Draft' : (action === 'finalize' ? 'Bill finalized successfully!' : 'Bill submitted to Contractor successfully'));
    }
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// --- NUMBER TO INDIAN WORDS CONVERTER ---
function numberToWordsIndian(n) {
  n = Math.round(Number(n) || 0);
  if (n === 0) return 'Zero Rupees Only';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(num) {
    if (num < 20) return a[num];
    let digit = num % 10;
    return b[Math.floor(num / 10)] + (digit ? ' ' + a[digit] : ' ');
  }

  let str = '';
  let crore = Math.floor(n / 10000000);
  n %= 10000000;
  let lakh = Math.floor(n / 100000);
  n %= 100000;
  let thousand = Math.floor(n / 1000);
  n %= 1000;
  let hundred = Math.floor(n / 100);
  let rem = n % 100;

  if (crore > 0) str += (inWords(crore).trim() + ' Crore ');
  if (lakh > 0) str += (inWords(lakh).trim() + ' Lakh' + (lakh > 1 ? 's ' : ' '));
  if (thousand > 0) str += (inWords(thousand).trim() + ' Thousand ');
  if (hundred > 0) str += (inWords(hundred).trim() + ' Hundred ');
  if (rem > 0) {
    if (str !== '') str += 'and ';
    str += inWords(rem).trim() + ' ';
  }
  return str.trim() + ' Rupees Only';
}

// --- PRINT INVOICE / BILL FORM (FORM 26 RUNNING ACCOUNT BILL VOUCHER) ---
function printBillInvoice(billOrId) {
  let b = null;
  if (typeof billOrId === 'object' && billOrId !== null) {
    b = billOrId;
  } else if (billOrId) {
    b = db.bills.find(x => x.id === Number(billOrId));
  }
  if (!b) {
    alert('Bill record not found for printing invoice.');
    return;
  }

  let p = db.projects.find(x => x.id === Number(b.projectId)) || {};
  let con = db.contractors.find(c => c.id === b.contractorId) || {};
  let items = b.items && b.items.length ? b.items : [];

  let gross = Number(b.grossAmount) || 0;
  let d = b.deductions || {};
  let tds = d.tdsAmount !== undefined ? d.tdsAmount : Math.round(gross * 0.02);
  let gstTds = d.gstTdsAmount !== undefined ? d.gstTdsAmount : Math.round(gross * 0.02);
  let cess = d.labourCessAmount !== undefined ? d.labourCessAmount : Math.round(gross * 0.01);
  let royalty = d.royalty !== undefined ? d.royalty : 27500;
  let sd = d.securityDepositAmount !== undefined ? d.securityDepositAmount : Math.round(gross * 0.05);
  let totalD = d.totalDeductions !== undefined ? d.totalDeductions : (tds + gstTds + cess + royalty + sd);
  let net = b.netPayable !== undefined ? b.netPayable : Math.max(0, gross - totalD);
  let inWords = numberToWordsIndian(net);

  let printHtml = `
  <div class="no-print" style="position:fixed;top:0;left:0;right:0;background:#0f172a;color:#fff;padding:12px 24px;display:flex;justify-content:space-between;align-items:center;z-index:999999;box-shadow:0 4px 12px rgba(0,0,0,0.3)">
    <div style="font-weight:700;font-size:15px;display:flex;align-items:center;gap:8px">
      <span>📄 Bihar RCD Form 26 - Running Account Bill Voucher & Tax Invoice</span>
      <span class="badge-subdiv" style="background:#0284c7;color:#fff">${esc(b.billNumber)}</span>
    </div>
    <div style="display:flex;gap:10px">
      <button class="primary" onclick="window.print()" style="background:#16a34a;border-color:#16a34a;font-weight:700;padding:6px 16px">🖨️ Print Document Now</button>
      <button class="secondary" onclick="let el=document.getElementById('invoice-print-container');if(el)el.remove()" style="background:#334155;color:#fff;border-color:#475569">✕ Close</button>
    </div>
  </div>

  <div id="printable-bill-invoice" style="background:#fff;color:#000;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:960px;margin:60px auto 40px;padding:32px 36px;box-shadow:0 4px 24px rgba(0,0,0,0.1);border:1px solid #cbd5e1;border-radius:6px;line-height:1.4">
    
    <!-- Official Department Header -->
    <div style="text-align:center;border-bottom:2px solid #000;padding-bottom:12px;margin-bottom:16px">
      <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Government of Bihar · Road Construction Department (RCD)</div>
      <div style="font-size:19px;font-weight:900;margin:4px 0;letter-spacing:0.5px">OFFICE OF THE EXECUTIVE ENGINEER, ROAD DIVISION, HILSA</div>
      <div style="font-size:14px;font-weight:700;color:#1e293b">FORM 26 - RUNNING ACCOUNT BILL VOUCHER & TAX INVOICE</div>
      <div style="font-size:11px;color:#475569">[Prescribed under Rule 229, 230 & 232 of Bihar Public Works Account Code]</div>
    </div>

    <!-- Work & Reference Metadata Table -->
    <table style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:11.5px;border:1px solid #000">
      <tbody>
        <tr>
          <td style="width:18%;font-weight:700;padding:6px 8px;border:1px solid #000;background:#f8fafc">Name of Work:</td>
          <td style="width:42%;padding:6px 8px;border:1px solid #000"><b>${esc(b.projectName || p.name || 'Road Construction Work')}</b></td>
          <td style="width:18%;font-weight:700;padding:6px 8px;border:1px solid #000;background:#f8fafc">Bill No. & Type:</td>
          <td style="width:22%;padding:6px 8px;border:1px solid #000"><b>${esc(b.billNumber)}</b> (${esc(b.billType || 'RA Bill')})</td>
        </tr>
        <tr>
          <td style="font-weight:700;padding:6px 8px;border:1px solid #000;background:#f8fafc">Division / Sub-Div:</td>
          <td style="padding:6px 8px;border:1px solid #000">Road Division Hilsa / ${esc(p.subDivision || p.office || 'Sub-Division Hilsa')}</td>
          <td style="font-weight:700;padding:6px 8px;border:1px solid #000;background:#f8fafc">MB No. & Date:</td>
          <td style="padding:6px 8px;border:1px solid #000"><b>${esc(b.mbNo || 'MB-01')}</b> (Dt: ${esc(b.mbDate || '—')})</td>
        </tr>
        <tr>
          <td style="font-weight:700;padding:6px 8px;border:1px solid #000;background:#f8fafc">Contractor / Agency:</td>
          <td style="padding:6px 8px;border:1px solid #000">
            <b>${esc(b.contractorName || con.name || 'Contractor')}</b> (${esc(b.contractorId || con.id || 'CON-01')})<br>
            <span style="font-size:10.5px;color:#334155">PAN: ${esc(con.pan || '—')} | GSTIN: ${esc(con.gstin || '—')} | Class: ${esc(con.class || 'Class-1')}</span>
          </td>
          <td style="font-weight:700;padding:6px 8px;border:1px solid #000;background:#f8fafc">Agreement No:</td>
          <td style="padding:6px 8px;border:1px solid #000"><b>${esc(b.agreementNo || p.contractAgreementNo || p.agreementNo || '01 SBD OF 2025-26')}</b></td>
        </tr>
        <tr>
          <td style="font-weight:700;padding:6px 8px;border:1px solid #000;background:#f8fafc">Bill Period:</td>
          <td style="padding:6px 8px;border:1px solid #000">${esc(b.billPeriod || 'Current Period')}</td>
          <td style="font-weight:700;padding:6px 8px;border:1px solid #000;background:#f8fafc">Date of Preparation:</td>
          <td style="padding:6px 8px;border:1px solid #000">${esc(b.preparedDate || new Date().toLocaleDateString('en-GB'))}</td>
        </tr>
      </tbody>
    </table>

    <!-- Two-Part Itemized Statement Table -->
    <div style="font-weight:800;font-size:12.5px;margin:12px 0 6px;text-transform:uppercase;color:#0f172a;border-bottom:1.5px solid #000;padding-bottom:3px">
      I. Account of Work Executed (Two-Part Comparison: Agreement Qty vs Work Done Qty)
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:11px;border:1px solid #000">
      <thead>
        <tr style="background:#f1f5f9;text-align:center">
          <th style="width:35px;border:1px solid #000;padding:6px 4px">Sl.</th>
          <th style="width:75px;border:1px solid #000;padding:6px 4px">Agr Item No.</th>
          <th style="width:85px;border:1px solid #000;padding:6px 4px">SOR Item No.</th>
          <th style="border:1px solid #000;padding:6px 6px;text-align:left">Description of Work / Items</th>
          <th style="width:85px;border:1px solid #000;padding:6px 4px;text-align:right">Agreement Qty</th>
          <th style="width:90px;border:1px solid #000;padding:6px 4px;text-align:right;background:#fef3c7">Work Done Qty</th>
          <th style="width:75px;border:1px solid #000;padding:6px 4px;text-align:right">Rate (₹)</th>
          <th style="width:105px;border:1px solid #000;padding:6px 6px;text-align:right">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((it, idx) => {
          let wQty = it.executedQty !== undefined ? it.executedQty : (it.workDoneQty || 0);
          let rowAmt = it.amount || (Number(wQty) * Number(it.rate || 0));
          return `
          <tr>
            <td style="text-align:center;border:1px solid #000;padding:5px 4px">${idx + 1}</td>
            <td style="text-align:center;border:1px solid #000;padding:5px 4px"><b>${esc(it.agreementItemNo || it.boqItemNo || String(idx + 1))}</b></td>
            <td style="text-align:center;border:1px solid #000;padding:5px 4px;font-family:monospace">${esc(it.sorNo || '—')}</td>
            <td style="border:1px solid #000;padding:5px 6px">${esc(it.description)}</td>
            <td style="text-align:right;border:1px solid #000;padding:5px 4px">${Number(it.agreementQty || 0).toLocaleString('en-IN')}</td>
            <td style="text-align:right;border:1px solid #000;padding:5px 4px;font-weight:700;background:#fffbeb">${Number(wQty).toLocaleString('en-IN')}</td>
            <td style="text-align:right;border:1px solid #000;padding:5px 4px">${Number(it.rate || 0).toFixed(2)}</td>
            <td style="text-align:right;border:1px solid #000;padding:5px 6px;font-weight:700">${formatCurrency(rowAmt)}</td>
          </tr>
          `;
        }).join('')}
        <tr style="background:#f8fafc;font-weight:800">
          <td colspan="7" style="text-align:right;border:1px solid #000;padding:6px 8px;font-size:12px">GROSS VALUE OF WORK DONE (₹):</td>
          <td style="text-align:right;border:1px solid #000;padding:6px 8px;font-size:12.5px;color:#0f172a">${formatCurrency(gross)}</td>
        </tr>
      </tbody>
    </table>

    <!-- Deductions & Financial Abstract -->
    <div style="font-weight:800;font-size:12.5px;margin:12px 0 6px;text-transform:uppercase;color:#0f172a;border-bottom:1.5px solid #000;padding-bottom:3px">
      II. Abstract of Statutory Recoveries & Net Payable Amount
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
      <table style="width:100%;border-collapse:collapse;font-size:11px;border:1px solid #000">
        <thead>
          <tr style="background:#f1f5f9">
            <th style="padding:5px 8px;border:1px solid #000;text-align:left">Statutory Recovery Head</th>
            <th style="padding:5px 8px;border:1px solid #000;width:70px;text-align:center">Rate</th>
            <th style="padding:5px 8px;border:1px solid #000;width:100px;text-align:right">Deduction (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:4px 8px;border:1px solid #000">Income Tax (TDS)</td><td style="text-align:center;border:1px solid #000">2.00%</td><td style="text-align:right;border:1px solid #000">${formatCurrency(tds)}</td></tr>
          <tr><td style="padding:4px 8px;border:1px solid #000">GST TDS</td><td style="text-align:center;border:1px solid #000">2.00%</td><td style="text-align:right;border:1px solid #000">${formatCurrency(gstTds)}</td></tr>
          <tr><td style="padding:4px 8px;border:1px solid #000">Labour Welfare Cess</td><td style="text-align:center;border:1px solid #000">1.00%</td><td style="text-align:right;border:1px solid #000">${formatCurrency(cess)}</td></tr>
          <tr><td style="padding:4px 8px;border:1px solid #000">Royalty on Minor Minerals</td><td style="text-align:center;border:1px solid #000">Fixed</td><td style="text-align:right;border:1px solid #000">${formatCurrency(royalty)}</td></tr>
          <tr><td style="padding:4px 8px;border:1px solid #000">Security Deposit (SD) Retention</td><td style="text-align:center;border:1px solid #000">5.00%</td><td style="text-align:right;border:1px solid #000">${formatCurrency(sd)}</td></tr>
          <tr style="font-weight:700;background:#fef2f2"><td colspan="2" style="padding:5px 8px;border:1px solid #000">TOTAL STATUTORY DEDUCTIONS:</td><td style="text-align:right;border:1px solid #000;color:#991b1b">${formatCurrency(totalD)}</td></tr>
        </tbody>
      </table>

      <div style="border:1.5px solid #059669;background:#f0fdf4;border-radius:6px;padding:12px;display:flex;flex-direction:column;justify-content:center">
        <div style="font-size:12px;font-weight:700;color:#166534">NET PAYABLE AMOUNT TO CONTRACTOR:</div>
        <div style="font-size:24px;font-weight:900;color:#047857;margin:6px 0">${formatCurrency(net)}</div>
        <div style="font-size:11.5px;color:#1e293b;font-weight:600;line-height:1.3">
          <b>Amount in Words:</b><br>
          <i>${inWords}</i>
        </div>
      </div>
    </div>

    <!-- 5 Departmental Certification & Signature Blocks -->
    <div style="font-weight:800;font-size:12.5px;margin:14px 0 6px;text-transform:uppercase;color:#0f172a;border-bottom:1.5px solid #000;padding-bottom:3px">
      III. Departmental Certificates & Official Sanctions
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:10px;margin-bottom:12px">
      <div style="border:1px solid #000;padding:8px;border-radius:4px;display:flex;flex-direction:column;justify-content:space-between;min-height:95px">
        <div>
          <b>1. Contractor Acceptance:</b><br>
          Certified that the measurements entered above have been verified and accepted by me without any dispute.
        </div>
        <div style="margin-top:16px;text-align:center;border-top:1px dashed #64748b;padding-top:4px">
          <b>Signature of Contractor</b><br>
          <span style="font-size:9px;color:#475569">${esc(b.signatureRecord ? 'Digitally Signed: ' + b.signatureRecord.signedDate : 'Accepted Signature')}</span>
        </div>
      </div>

      <div style="border:1px solid #000;padding:8px;border-radius:4px;display:flex;flex-direction:column;justify-content:space-between;min-height:95px">
        <div>
          <b>2. Junior Engineer Certificate:</b><br>
          Certified that I have taken the measurements on site and recorded in MB No. ${esc(b.mbNo || 'MB-01')} accurately as per RCD specs.
        </div>
        <div style="margin-top:16px;text-align:center;border-top:1px dashed #64748b;padding-top:4px">
          <b>Junior Engineer (JE)</b><br>
          <span style="font-size:9px;color:#475569">Road Division Hilsa</span>
        </div>
      </div>

      <div style="border:1px solid #000;padding:8px;border-radius:4px;display:flex;flex-direction:column;justify-content:space-between;min-height:95px">
        <div>
          <b>3. Assistant Engineer Check:</b><br>
          Certified that I have test checked not less than 100% of measurements on site and found correct.
        </div>
        <div style="margin-top:16px;text-align:center;border-top:1px dashed #64748b;padding-top:4px">
          <b>Assistant Engineer (AE)</b><br>
          <span style="font-size:9px;color:#475569">Sub-Division Incharge</span>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:10px">
      <div style="border:1px solid #000;padding:8px;border-radius:4px;display:flex;flex-direction:column;justify-content:space-between;min-height:90px">
        <div>
          <b>4. Accounts Scrutiny & Pre-Audit Certificate:</b><br>
          Pre-audited with contract agreement terms, technical sanction and statutory deductions. Passed for scrutiny.
        </div>
        <div style="margin-top:16px;display:flex;justify-content:space-between;border-top:1px dashed #64748b;padding-top:4px">
          <span style="text-align:center"><b>Accounts Clerk</b></span>
          <span style="text-align:center"><b>Divisional Accounts Officer (DAO)</b></span>
        </div>
      </div>

      <div style="border:1px solid #000;padding:8px;border-radius:4px;display:flex;flex-direction:column;justify-content:space-between;min-height:90px;background:#f8fafc">
        <div>
          <b>5. Executive Engineer Pass & Pay Order:</b><br>
          Passed for payment of Gross Amount ₹ <b>${formatCurrency(gross)}</b> and Net Payable ₹ <b>${formatCurrency(net)}</b> to the agency.
        </div>
        <div style="margin-top:16px;text-align:right;border-top:1px dashed #64748b;padding-top:4px">
          <b>Executive Engineer (EE)</b><br>
          <span style="font-size:9px;color:#475569">RCD Road Division Hilsa</span>
        </div>
      </div>
    </div>

  </div>
  `;

  if (typeof document !== 'undefined') {
    let existing = document.getElementById('invoice-print-container');
    if (existing) existing.remove();

    let container = document.createElement('div');
    container.id = 'invoice-print-container';
    container.innerHTML = printHtml;
    document.body.appendChild(container);
  }

  if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function printBillInvoiceFromForm() {
  let form = typeof document !== 'undefined' ? document.querySelector('#create-bill-form') : null;
  if (!form) return;

  let pId = Number(form.querySelector('[name="projectId"]')?.value || 1);
  let p = db.projects.find(x => x.id === pId) || {};
  let selectedItems = activeAgreementBOQ.filter(it => it.selected);

  if (!selectedItems.length) {
    alert('Please select at least one agreement item in Section 1 to print invoice.');
    return;
  }

  let gross = 0;
  let items = selectedItems.map((it, i) => {
    let q = Number(it.workDoneQty) || 0;
    let r = Number(it.rate) || 0;
    let amt = q * r;
    gross += amt;
    return {
      id: i + 1,
      itemNo: String(i + 1),
      agreementItemNo: it.agreementItemNo || String(i + 1),
      sorNo: it.sorNo || '—',
      description: it.description,
      agreementQty: Number(it.agreementQty) || 0,
      workDoneQty: q,
      executedQty: q,
      unit: it.unit || 'Cum',
      rate: r,
      amount: amt
    };
  });

  let totalD = Math.round(gross * 0.10) + 27500;
  let net = Math.max(0, gross - totalD);

  let tempBill = {
    id: Date.now(),
    billNumber: form.querySelector('[name="billNumber"]')?.value || 'Provisional RA Bill',
    billType: form.querySelector('[name="billType"]')?.value || 'RA Bill',
    projectId: pId,
    projectName: p.name || 'Road Construction Work',
    contractorId: p.contractorId || 'CON-01',
    contractorName: p.contractorName || 'Registered Contractor',
    agreementNo: p.contractAgreementNo || p.agreementNo || '01 SBD OF 2025-26',
    mbNo: form.querySelector('[name="mbNo"]')?.value || 'MB-01',
    mbDate: form.querySelector('[name="mbDate"]')?.value || new Date().toISOString().slice(0, 10),
    billPeriod: form.querySelector('[name="billPeriod"]')?.value || 'Current Period',
    preparedDate: new Date().toLocaleDateString('en-GB'),
    items: items,
    grossAmount: gross,
    deductions: {
      tdsPercent: 2, tdsAmount: Math.round(gross * 0.02),
      gstTdsPercent: 2, gstTdsAmount: Math.round(gross * 0.02),
      labourCessPercent: 1, labourCessAmount: Math.round(gross * 0.01),
      royalty: 27500,
      securityDepositPercent: 5, securityDepositAmount: Math.round(gross * 0.05),
      totalDeductions: totalD
    },
    netPayable: net,
    remarks: form.querySelector('[name="remarks"]')?.value || ''
  };

  printBillInvoice(tempBill);
}

// Quick 1-Click Finalize by JE
function jeQuickFinalize(billId) {
  if (confirm('Are you sure you want to finalize this bill? Once finalized, you can Send Forward to Contractor or reopen as draft.')) {
    try {
      WorkflowEngine.jeFinalizeBill(current, billId, 'Bill finalized by Junior Engineer.');
      showToast('Bill successfully finalized! Ready to Send Forward to Contractor.');
      render();
    } catch (err) {
      alert(err.message);
    }
  }
}

// Unified Send Forward Modal (Role-Tailored)
function openSendForwardModal(billId) {
  let b = db.bills.find(x => x.id === billId);
  if (!b) return;

  let r = current.role;
  let s = b.status;
  let target = '';
  let hint = '';

  if (r === 'JE') {
    if (['Draft', 'Draft with JE', 'Finalized by JE', 'Recalled by JE'].includes(s)) {
      target = 'Contractor (' + (b.contractorName || 'Registered Agency') + ')';
      hint = 'Bill will be forwarded to the contractor for review and digital Aadhaar/DSC signature.';
    } else if (s === 'Contractor Signed & Submitted') {
      target = 'Assistant Engineer (AE)';
      hint = 'Contractor has digitally signed. Bill will be submitted to Assistant Engineer for 100% technical check.';
    }
  } else if (r === 'AE') {
    target = 'Executive Engineer (EE)';
    hint = 'Technical site verification completed. Bill will be recommended to Executive Engineer for Check & Pass (C&P 10% test check).';
  } else if (r === 'Accounts Clerk') {
    target = 'Divisional Accounts Officer (DAO)';
    hint = 'Statutory deductions (IT, GST, Cess, Royalty, SD) calculated. Bill will be sent to DAO for pre-audit.';
  } else if (r === 'DAO') {
    target = 'Executive Engineer (EE)';
    hint = 'Financial pre-audit completed. Forwarding to Executive Engineer for Final Approval and payment disbursement.';
  }

  overlay(`<h3>📤 Send Forward · ${esc(b.billNumber)}</h3>
  <p>${esc(b.projectName)} · Gross: <b>${formatCurrency(b.grossAmount)}</b> · Net: <b>${formatCurrency(b.netPayable)}</b></p>
  <div class="notice" style="background:#f0fdf4;border:1px solid #86efac;color:#166534;padding:12px;border-radius:8px;margin-bottom:14px">
    Destination: <b>${esc(target || 'Next Departmental Authority')}</b><br>
    <span class="small">${esc(hint || 'Bill will move to the next stage in hierarchy.')}</span>
  </div>
  <form onsubmit="handleSendForwardSubmit(event, ${billId})">
    <div class="field">
      <label>Forwarding Remarks / Endorsement</label>
      <textarea name="remarks" rows="3" placeholder="Enter remarks...">Forwarded with measurement documents and compliance certification.</textarea>
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="primary" style="background:#16a34a">Confirm Send Forward ➔</button>
    </div>
  </form>`);
}

function handleSendForwardSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  let remarks = d.remarks || '';
  let r = current.role;
  let b = db.bills.find(x => x.id === billId);
  if (!b) return;

  try {
    if (r === 'JE') {
      WorkflowEngine.jeSendForward(current, billId, remarks);
    } else if (r === 'AE') {
      WorkflowEngine.aeSendForward(current, billId, remarks);
    } else if (r === 'Accounts Clerk') {
      WorkflowEngine.accountsSendForward(current, billId, b.deductions, remarks);
    } else if (r === 'DAO') {
      WorkflowEngine.daoSendForward(current, billId, null, remarks);
    } else {
      throw new Error('Role not authorized for Send Forward.');
    }
    showToast('Bill successfully sent forward!');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// Unified Call Back Modal (Recalls bill back to user's desk)
function openCallBackModal(billId) {
  let b = db.bills.find(x => x.id === billId);
  if (!b) return;

  let r = current.role;
  let s = b.status;
  let title = 'Call Back Bill to Your Desk';
  let desc = '';

  if (r === 'JE') {
    if (s.includes('Pending Contractor') || s.includes('Submitted to Contractor')) {
      desc = `You are recalling <b>${esc(b.billNumber)}</b> from Contractor (<b>${esc(b.contractorName)}</b>). The bill will be returned to your desk in <b>Draft with JE</b> status for measurement / BOQ revisions.`;
    } else if (s === 'Pending AE Checking' || s === 'Forwarded to AE') {
      desc = `You are recalling <b>${esc(b.billNumber)}</b> from Assistant Engineer (AE). The bill will be returned to your desk in <b>Contractor Signed & Submitted</b> status.`;
    }
  } else if (r === 'AE') {
    desc = `You are recalling <b>${esc(b.billNumber)}</b> from Executive Engineer (EE). The bill will be returned to your desk in <b>Pending AE Checking</b> status.`;
  } else if (r === 'Accounts Clerk') {
    desc = `You are recalling <b>${esc(b.billNumber)}</b> from Divisional Accounts Officer (DAO). The bill will be returned to your desk in <b>EE C&P Completed</b> status for deduction adjustments.`;
  } else if (r === 'DAO') {
    desc = `You are recalling <b>${esc(b.billNumber)}</b> from Executive Engineer (EE). The bill will be returned to your desk in <b>Accounts Processed – Sent to DAO</b> status.`;
  }

  overlay(`<h3>↩ ${title}</h3>
  <div class="notice" style="background:#fffbeb;border:1px solid #fde68a;color:#92400e;padding:12px;border-radius:8px;margin-bottom:14px">
    ${desc || 'The bill will be recalled to your desk for corrections.'}
  </div>
  <form onsubmit="handleCallBackSubmit(event, ${billId})">
    <div class="field">
      <label>Reason for Calling Back <span style="color:var(--red)">*</span></label>
      <textarea name="remarks" required rows="3" placeholder="Enter reason for calling back bill...">${r} recalled bill for adjustments before processing.</textarea>
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="danger" style="background:#d97706;border-color:#d97706">Confirm Call Back</button>
    </div>
  </form>`);
}

function handleCallBackSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  let remarks = d.remarks || '';
  let r = current.role;

  try {
    if (r === 'JE') {
      WorkflowEngine.jeCallBackBill(current, billId, remarks);
    } else if (r === 'AE') {
      WorkflowEngine.aeCallBackFromEE(current, billId, remarks);
    } else if (r === 'Accounts Clerk') {
      WorkflowEngine.accountsCallBackFromDAO(current, billId, remarks);
    } else if (r === 'DAO') {
      WorkflowEngine.daoCallBackFromEE(current, billId, remarks);
    } else {
      throw new Error('Role not authorized for Call Back.');
    }
    showToast('Bill successfully called back to your desk!');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// Return Modal Router
function openReturnModal(billId) {
  let b = db.bills.find(x => x.id === billId);
  if (!b) return;
  let r = current.role;
  if (r === 'AE') return openAeReturnModal(billId);
  if (r === 'Accounts Clerk') return openAccountsReturnModal(billId);
  if (r === 'DAO') return openDaoReturnModal(billId);
  if (r === 'EE') return openEeReturnModal(billId);
}

// 2. Contractor Acceptance
function contractorAcceptBill(billId) {
  try {
    WorkflowEngine.contractorAccept(current, billId);
    showToast('Bill accepted! Please complete Digital Signature & Submit.');
    openDigitalSignatureModal(billId);
  } catch (err) {
    alert(err.message);
  }
}

// 3. Contractor Digital Signature Modal
function openDigitalSignatureModal(billId) {
  let b = db.bills.find(x => x.id === billId);
  if (!b) return;

  overlay(`<h3>Contractor Electronic Signature & Seal</h3>
  <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA</p>
  <form onsubmit="handleDigitalSignatureSubmit(event, ${billId})">
    <div class="notice" style="background:#f0fdf4;border-color:#22c55e;color:#15803d">
      <b>Verification Gate:</b> You are signing <b>${esc(b.billNumber)}</b> (${esc(b.projectName)}) for Net Payable amount of <b>${formatCurrency(b.netPayable)}</b>.
    </div>

    <div class="field">
      <label>Authorized Representative Full Name <span style="color:var(--red)">*</span></label>
      <input name="rep" required value="${esc(current.rep || current.name)}">
    </div>
    <div class="field">
      <label>Contractor Registration & Class</label>
      <input readonly style="background:#edf2f7" value="RCD Bihar Class-1 Registered Contractor">
    </div>
    <div class="field">
      <label>Digital Declaration & Acceptance Remarks</label>
      <textarea name="remarks" rows="2" placeholder="Accepted measurements and rate details...">I hereby certify that the executed quantities billed herein are accurate as per agreement clauses and site MB.</textarea>
    </div>

    <div style="background:#f8fafc;border:1px dashed #cbd5e1;padding:12px;border-radius:8px;margin-bottom:14px;display:flex;align-items:center;gap:12px">
      <div style="font-size:32px">🛡️</div>
      <div class="small" style="color:var(--muted)">
        A cryptographic SHA-256 digital stamp will be generated with timestamp and locked to Bill Version <b>${b.version || 'v1'}</b>.
      </div>
    </div>

    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="primary" style="background:#059669">Confirm & Sign Electronically</button>
    </div>
  </form>`);
}

function handleDigitalSignatureSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.contractorSignAndSubmit(current, billId, d);
    showToast('File is Uploaded Sucessfully & Digitally Signed');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// 4. Contractor Modification Request
function openModifyRequestModal(billId) {
  overlay(`<h3>Request Modification on Bill</h3>
  <p>Mandatory: Enter exact reasons or corrections required for the Junior Engineer.</p>
  <form onsubmit="handleModifyRequestSubmit(event, ${billId})">
    <div class="field">
      <label>Modification Reason / Remarks <span style="color:var(--red)">*</span></label>
      <textarea name="remarks" required rows="4" placeholder="Enter discrepancies in BOQ items, rates, or executed quantities..."></textarea>
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="primary" style="background:#d97706">Submit Modification Request</button>
    </div>
  </form>`);
}

function handleModifyRequestSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.contractorModifyRequest(current, billId, d.remarks);
    showToast('Modification requested. Bill returned to JE.');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// 5. Contractor Send Back
function openSendBackModal(billId) {
  overlay(`<h3>Send Bill Back to Junior Engineer</h3>
  <p>Mandatory: Enter remarks for sending back the bill.</p>
  <form onsubmit="handleSendBackSubmit(event, ${billId})">
    <div class="field">
      <label>Remarks for Sending Back <span style="color:var(--red)">*</span></label>
      <textarea name="remarks" required rows="4" placeholder="Enter reason for sending back bill..."></textarea>
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="danger">Send Back to JE</button>
    </div>
  </form>`);
}

function handleSendBackSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.contractorSendBack(current, billId, d.remarks);
    showToast('Bill sent back to JE.');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// 6. JE Forward to AE (RULE 6 ENFORCEMENT)
function jeForwardBillToAE(billId) {
  try {
    WorkflowEngine.forwardToAE(current, billId, 'Forwarded by JE with measurement book and test certificates.');
    showToast('Bill successfully forwarded to Assistant Engineer (AE)');
    render();
  } catch (err) {
    alert(err.message);
  }
}

// 7. JE Revise Bill Modal
function openReviseBillModal(billId) {
  let b = db.bills.find(x => x.id === billId);
  if (!b) return;

  overlay(`<h3>Revise Bill · Create New Version</h3>
  <p>Current: <b>${b.version || 'v1'}</b> ➔ Next Version will be created. Previous version will be archived in History.</p>
  <form onsubmit="handleReviseBillSubmit(event, ${billId})">
    <div class="field">
      <label>Updated Gross Amount (₹) <span style="color:var(--red)">*</span></label>
      <input name="grossAmount" type="number" step="any" required value="${b.grossAmount}">
    </div>
    <div class="field">
      <label>Updated Net Payable (₹) <span style="color:var(--red)">*</span></label>
      <input name="netPayable" type="number" step="any" required value="${b.netPayable}">
    </div>
    <div class="field">
      <label>Revision Remarks</label>
      <textarea name="remarks" rows="3" placeholder="Explain the corrections made as requested...">Adjusted executed quantities as per contractor review.</textarea>
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="primary">Save & Submit Revised Version</button>
    </div>
  </form>`);
}

function handleReviseBillSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.jeReviseBill(current, billId, d);
    showToast('Revised Bill created and submitted to Contractor');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// 8. AE Technical Check
function aeCheckBill(billId) {
  try {
    WorkflowEngine.aeCheckAndForward(current, billId, 'Measurements and site verification completed. Recommended for EE C&P.');
    showToast('Bill checked by AE and forwarded to Executive Engineer');
    render();
  } catch (err) {
    alert(err.message);
  }
}

function openAeReturnModal(billId) {
  overlay(`<h3>Return Bill to Junior Engineer</h3>
  <p>Mandatory: Enter technical queries or corrections required.</p>
  <form onsubmit="handleAeReturnSubmit(event, ${billId})">
    <div class="field">
      <label>Return Reason / Technical Queries <span style="color:var(--red)">*</span></label>
      <textarea name="remarks" required rows="4" placeholder="Enter correction details..."></textarea>
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="danger">Return to JE</button>
    </div>
  </form>`);
}

function handleAeReturnSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.aeReturnToJE(current, billId, d.remarks);
    showToast('Bill returned to JE.');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// 9. EE C&P (Check & Pass)
function eeCpBill(billId) {
  try {
    WorkflowEngine.eeCheckAndPass(current, billId, 'Checked and Passed (C&P) by Executive Engineer. Sent to Accounts Branch.');
    showToast('C&P completed by Executive Engineer. Sent to Accounts.');
    render();
  } catch (err) {
    alert(err.message);
  }
}

function openEeReturnModal(billId) {
  overlay(`<h3>EE Return for Correction</h3>
  <p>Mandatory: Enter queries/remarks for correction.</p>
  <form onsubmit="handleEeReturnSubmit(event, ${billId})">
    <div class="field">
      <label>Correction Remarks <span style="color:var(--red)">*</span></label>
      <textarea name="remarks" required rows="4" placeholder="Enter correction notes..."></textarea>
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="danger">Return for Correction</button>
    </div>
  </form>`);
}

function handleEeReturnSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.eeReturnForCorrection(current, billId, d.remarks);
    showToast('Bill returned for correction.');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// 10. Accounts Clerk Processing Modal
function openAccountsProcessModal(billId) {
  let b = db.bills.find(x => x.id === billId);
  if (!b) return;

  overlay(`<h3>Accounts Processing · Deductions Calculator</h3>
  <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA</p>
  <form onsubmit="handleAccountsProcessSubmit(event, ${billId})">
    <div class="table-wrap" style="margin-bottom:14px">
      <table class="report-table">
        <tbody>
          <tr><td class="bold">Gross Bill Amount</td><td><b>${formatCurrency(b.grossAmount)}</b></td></tr>
        </tbody>
      </table>
    </div>

    <div class="form-grid-2">
      <div class="field">
        <label>Income Tax (TDS Amount ₹)</label>
        <input name="tdsAmount" type="number" value="${b.deductions?.tdsAmount || Math.round(b.grossAmount * 0.02)}">
      </div>
      <div class="field">
        <label>GST TDS Amount (₹)</label>
        <input name="gstTdsAmount" type="number" value="${b.deductions?.gstTdsAmount || Math.round(b.grossAmount * 0.02)}">
      </div>
    </div>
    <div class="form-grid-2">
      <div class="field">
        <label>Labour Cess Amount (₹)</label>
        <input name="labourCessAmount" type="number" value="${b.deductions?.labourCessAmount || Math.round(b.grossAmount * 0.01)}">
      </div>
      <div class="field">
        <label>Royalty Amount (₹)</label>
        <input name="royalty" type="number" value="${b.deductions?.royalty || 420000}">
      </div>
    </div>
    <div class="form-grid-2">
      <div class="field">
        <label>Security Deposit (SD ₹)</label>
        <input name="securityDepositAmount" type="number" value="${b.deductions?.securityDepositAmount || Math.round(b.grossAmount * 0.05)}">
      </div>
      <div class="field">
        <label>Other Recoveries (₹)</label>
        <input name="otherRecoveries" type="number" value="${b.deductions?.otherRecoveries || 0}">
      </div>
    </div>

    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="primary" style="background:#ea580c">Pass Bill & Send to DAO ➔</button>
    </div>
  </form>`);
}

function handleAccountsProcessSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.accountsProcessAndPass(current, billId, d);
    showToast('Accounts processed and passed to Divisional Accounts Officer (DAO)');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

function openAccountsReturnModal(billId) {
  overlay(`<h3>Return Bill from Accounts</h3>
  <form onsubmit="handleAccountsReturnSubmit(event, ${billId})">
    <div class="field">
      <label>Reason for Returning Bill <span style="color:var(--red)">*</span></label>
      <textarea name="remarks" required rows="4" placeholder="Enter discrepancy in calculations..."></textarea>
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="danger">Return Bill</button>
    </div>
  </form>`);
}

function handleAccountsReturnSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.accountsReturn(current, billId, d.remarks);
    showToast('Bill returned by Accounts.');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// 11. DAO Scrutiny Modal
function openDaoScrutinyModal(billId) {
  let b = db.bills.find(x => x.id === billId);
  if (!b) return;

  overlay(`<h3>Divisional Accounts Officer (DAO) Scrutiny</h3>
  <p>Financial Scrutiny & Statutory Deductions Audit</p>
  <form onsubmit="handleDaoScrutinySubmit(event, ${billId})">
    <div class="table-wrap" style="margin-bottom:14px">
      <table class="report-table">
        <tbody>
          <tr><td class="bold">Gross Amount</td><td><b>${formatCurrency(b.grossAmount)}</b></td></tr>
          <tr><td class="bold">Total Deductions</td><td style="color:var(--red)"><b>${formatCurrency(b.deductions?.totalDeductions || 0)}</b></td></tr>
          <tr><td class="bold">Net Payable to Agency</td><td style="color:var(--green)"><b>${formatCurrency(b.netPayable)}</b></td></tr>
        </tbody>
      </table>
    </div>

    <div class="field">
      <label>DAO Financial Verification Remarks <span style="color:var(--red)">*</span></label>
      <textarea name="remarks" required rows="3" placeholder="Enter scrutiny audit remarks...">Checked deductions, agreement provisions, and tax liabilities. Verified and found in order.</textarea>
    </div>

    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="primary" style="background:#db2777">Check & Send to EE for Final Approval ➔</button>
    </div>
  </form>`);
}

function handleDaoScrutinySubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.daoScrutinizeAndCheck(current, billId, null, d.remarks);
    showToast('DAO Scrutiny completed. Forwarded to EE for Final Approval.');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

function openDaoReturnModal(billId) {
  overlay(`<h3>DAO Return with Audit Queries</h3>
  <form onsubmit="handleDaoReturnSubmit(event, ${billId})">
    <div class="field">
      <label>Audit Queries / Scrutiny Defects <span style="color:var(--red)">*</span></label>
      <textarea name="remarks" required rows="4" placeholder="Enter audit queries..."></textarea>
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="danger">Return to Accounts Clerk</button>
    </div>
  </form>`);
}

function handleDaoReturnSubmit(e, billId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.daoReturn(current, billId, d.remarks);
    showToast('Bill returned by DAO.');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// 12. EE Final Approval
function eeFinalApproveBill(billId) {
  try {
    WorkflowEngine.eeFinalApprove(current, billId, 'Final Approval granted by Executive Engineer. Moving to Treasury CFMS Payment pipeline.');
    showToast('Final Approval granted by Executive Engineer! Payment record generated.');
    render();
  } catch (err) {
    alert(err.message);
  }
}

// Expose all Billing UI & Workflow functions globally
const _billingFns = {
  renderBillStatusBadge,
  renderRowActionButtons,
  billingView,
  renderBillTimeline,
  openBillWorkflowModal,
  renderWorkflowActionButtons,
  openCreateBillModal,
  autoPopulateBillProject,
  openEditBillModal,
  addBillItemRow,
  calculateBillTotals,
  handleCreateBillSubmit,
  jeQuickFinalize,
  openSendForwardModal,
  handleSendForwardSubmit,
  openCallBackModal,
  handleCallBackSubmit,
  openReturnModal,
  contractorAcceptBill,
  openDigitalSignatureModal,
  handleDigitalSignatureSubmit,
  openModifyRequestModal,
  handleModifyRequestSubmit,
  openSendBackModal,
  handleSendBackSubmit,
  jeForwardBillToAE,
  openReviseBillModal,
  handleReviseBillSubmit,
  aeCheckBill,
  openAeReturnModal,
  handleAeReturnSubmit,
  eeCpBill,
  openEeReturnModal,
  handleEeReturnSubmit,
  openAccountsProcessModal,
  handleAccountsProcessSubmit,
  openAccountsReturnModal,
  handleAccountsReturnSubmit,
  openDaoScrutinyModal,
  handleDaoScrutinySubmit,
  openDaoReturnModal,
  handleDaoReturnSubmit,
  eeFinalApproveBill,
  downloadAgreementBOQTemplate,
  handleAgreementExcelUpload,
  getDefaultProjectBOQ,
  getActiveAgreementBOQ,
  setActiveAgreementBOQ,
  renderBillTwoPartSections,
  toggleAgreementItem,
  toggleAllAgreementItems,
  addAgreementBOQItemRow,
  updateWorkDoneQty,
  numberToWordsIndian,
  printBillInvoice,
  printBillInvoiceFromForm
};
for (const [k, fn] of Object.entries(_billingFns)) {
  if (typeof window !== 'undefined') window[k] = fn;
  if (typeof globalThis !== 'undefined') globalThis[k] = fn;
}


// ============================================================================
// PART 6: PAYMENTS, NOTIFICATIONS, AUDIT TRAIL, DOCUMENT MANAGEMENT & SHELL
// ============================================================================

// 1. PAYMENT STATUS MODULE
function paymentStatusView() {
  let pays = db.payments;

  if (current.role === 'Contractor') {
    pays = pays.filter(p => p.contractor === current.name || db.bills.some(b => b.id === p.billId && (b.contractorId === current.contractorId || b.contractorId === current.id)));
  }

  return `<div class="page-head">
    <div>
      <h3>Payment Status & CFMS Treasury Tracking</h3>
      <p>Departmental Payment Ledger · Traceable from Bill ID & Project ID</p>
    </div>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Payment ID & Bill</th>
          <th>Project / Road Work</th>
          <th>Contractor</th>
          <th>Net Payable</th>
          <th>EE Approved Date</th>
          <th>CFMS Reference</th>
          <th>Voucher Number</th>
          <th>Payment Status</th>
          <th>Paid / Pending</th>
          <th style="text-align:center">Action</th>
        </tr>
      </thead>
      <tbody>
        ${pays.map(p => `<tr>
          <td>
            <b>${esc(p.id)}</b><br>
            <span class="small" style="color:var(--navy);font-weight:600">${esc(p.billNumber)} (Bill #${p.billId})</span>
          </td>
          <td>
            <b>${esc(p.projectName)}</b><br>
            <span class="small" style="color:var(--muted)">Project #${p.projectId}</span>
          </td>
          <td><b>${esc(p.contractor)}</b></td>
          <td><b style="color:var(--navy)">${formatCurrency(p.netPayableAmount)}</b></td>
          <td>${esc(p.eeApprovalDate || '—')}</td>
          <td><code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-weight:700">${esc(p.cfmsNumber || 'Under Generation')}</code></td>
          <td><b>${esc(p.voucherNumber || 'Under Generation')}</b></td>
          <td>${renderPaymentStatusBadge(p.paymentStatus)}</td>
          <td>
            <span style="color:var(--green);font-weight:700">${formatCurrency(p.paidAmount || 0)}</span><br>
            <span class="small" style="color:var(--muted)">Pending: ${formatCurrency(p.pendingAmount || 0)}</span>
          </td>
          <td style="text-align:center">
            ${['Accounts Clerk', 'DAO', 'EE', 'Admin'].includes(current.role) ? `<button class="primary small" onclick="openUpdatePaymentModal('${p.id}')">Update CFMS ➔</button>` : `<button class="secondary small" onclick="openBillWorkflowModal(${p.billId})">View Bill</button>`}
          </td>
        </tr>`).join('') || '<tr><td colspan="10" class="empty">No payment records available.</td></tr>'}
      </tbody>
    </table>
  </div>`;
}

function renderPaymentStatusBadge(st) {
  let s = st || 'Pending';
  let bg = '#fef3c7', color = '#b45309';
  if (s === 'Paid') { bg = '#dcfce7'; color = '#15803d'; }
  else if (s === 'Approved by EE') { bg = '#e0f2fe'; color = '#0284c7'; }
  else if (s.includes('CFMS Processing')) { bg = '#ede9fe'; color = '#6d28d9'; }
  else if (s.includes('Failed') || s.includes('Returned')) { bg = '#fee2e2'; color = '#b91c1c'; }
  return `<span style="background:${bg};color:${color};font-weight:700;font-size:11px;padding:3px 8px;border-radius:99px;display:inline-block">${esc(s)}</span>`;
}

function openUpdatePaymentModal(payId) {
  let p = db.payments.find(x => x.id === payId);
  if (!p) return;

  overlay(`<h3>Update Payment Status & CFMS Voucher</h3>
  <p>Payment ID: <b>${p.id}</b> · Bill: <b>${esc(p.billNumber)}</b> · Net: <b>${formatCurrency(p.netPayableAmount)}</b></p>
  <form onsubmit="handleUpdatePaymentSubmit(event, '${payId}')">
    <div class="form-grid-2">
      <div class="field">
        <label>CFMS Reference Number</label>
        <input name="cfmsNumber" value="${esc(p.cfmsNumber || '')}" placeholder="e.g. CFMS/2026/HIL/99412">
      </div>
      <div class="field">
        <label>Treasury Voucher Number</label>
        <input name="voucherNumber" value="${esc(p.voucherNumber || '')}" placeholder="e.g. VR-2026-088">
      </div>
    </div>
    <div class="form-grid-2">
      <div class="field">
        <label>Payment Status</label>
        <select name="paymentStatus">
          ${['Pending', 'Approved by EE', 'Sent for Payment', 'Under CFMS Processing', 'Payment Generated', 'Paid', 'Payment Returned', 'Payment Failed', 'Payment Reprocessed'].map(s => `<option ${p.paymentStatus === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>Paid Amount (₹)</label>
        <input name="paidAmount" type="number" step="any" value="${p.paidAmount !== undefined ? p.paidAmount : p.netPayableAmount}">
      </div>
    </div>
    <div class="field">
      <label>Disbursement Remarks</label>
      <input name="remarks" value="${esc(p.remarks || '')}" placeholder="Treasury batch or transaction details">
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="primary">Update Payment Status</button>
    </div>
  </form>`);
}

function handleUpdatePaymentSubmit(e, payId) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  try {
    WorkflowEngine.updatePayment(current, payId, d);
    showToast('Payment record updated successfully');
    closeModal();
    render();
  } catch (err) {
    alert(err.message);
  }
}

// 2. NOTIFICATIONS MODULE
function notificationsView() {
  let notifs = (db.notifications || []).filter(n => n.targetRole === current.role || n.targetRole === 'All' || current.role === 'Admin');

  return `<div class="page-head">
    <div>
      <h3>Departmental Notifications & Workflow Alerts</h3>
      <p>Role: <b>${esc(current.role)}</b> · Real-time bill movement and action alerts</p>
    </div>
    <button class="secondary small" onclick="markAllNotificationsRead()">Mark All Read</button>
  </div>

  <div style="display:grid;gap:10px">
    ${notifs.map(n => `<div class="notice" style="background:${n.read ? '#fff' : '#f0fdf4'};border:1px solid ${n.read ? '#e2e8f0' : '#86efac'};border-left:4px solid ${n.read ? '#94a3b8' : '#22c55e'};padding:14px 18px;border-radius:8px;display:flex;align-items:center;justify-content:space-between">
      <div>
        <b style="color:var(--navy);font-size:14px">${esc(n.title)}</b>
        <div style="font-size:13px;color:#334155;margin:4px 0">${esc(n.message)}</div>
        <div class="small" style="color:var(--muted)">${esc(n.date)}</div>
      </div>
      <div style="display:flex;gap:6px">
        ${n.billId ? `<button class="primary small" onclick="openBillWorkflowModal(${n.billId})">View Bill ➔</button>` : ''}
      </div>
    </div>`).join('') || '<div class="empty">No notifications yet.</div>'}
  </div>`;
}

function markAllNotificationsRead() {
  (db.notifications || []).forEach(n => {
    if (n.targetRole === current.role || current.role === 'Admin') n.read = true;
  });
  save();
  showToast('All notifications marked as read');
  render();
}

// 3. IMMUTABLE AUDIT TRAIL
function activityLogView() {
  let logs = db.auditLogs || [];

  return `<div class="page-head">
    <div>
      <h3>Immutable Audit Trail & Activity Log</h3>
      <p>Permanent, Non-Deletable Departmental Workflow & Security Ledger</p>
    </div>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>User & Role</th>
          <th>Action</th>
          <th>Bill / Project</th>
          <th>Previous Status</th>
          <th>New Status</th>
          <th>Version</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        ${logs.map(l => `<tr>
          <td style="white-space:nowrap">
            <b>${esc(l.date)}</b><br>
            <span class="small" style="color:var(--muted)">${esc(l.time)}</span>
          </td>
          <td>
            <b>${esc(l.userName)}</b><br>
            <span class="badge-subdiv" style="font-size:10px">${esc(l.role)}</span>
          </td>
          <td><code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-weight:700">${esc(l.action)}</code></td>
          <td>
            ${l.billId ? `<b>Bill #${l.billId}</b><br>` : ''}
            <span class="small" style="color:var(--muted)">Proj #${l.projectId}</span>
          </td>
          <td><span class="small" style="color:var(--muted)">${esc(l.previousStatus)}</span></td>
          <td><b>${esc(l.newStatus)}</b></td>
          <td>${esc(l.version || 'v1')}</td>
          <td style="max-width:280px;font-size:12px">${esc(l.remarks)}</td>
        </tr>`).join('') || '<tr><td colspan="8" class="empty">No audit logs recorded yet.</td></tr>'}
      </tbody>
    </table>
  </div>`;
}

// 4. PROJECT DOCUMENTS VIEW
function projectDocsView() {
  let ps = db.projects.filter(permitted);
  if (activeProject) {
    let p = db.projects.find(x => x.id === activeProject);
    return projectDetail(p);
  }

  return `<div class="page-head">
    <div>
      <h3>Project Document Management</h3>
      <p>Categorized folders, Measurement Books (MB), Drawings, Test Reports & Agreements</p>
    </div>
  </div>

  <div class="folder-grid">
    ${ps.map(p => {
      let docCount = (p.files ? p.files.length : 0) + (p.folders || []).reduce((a, f) => a + (f.files ? f.files.length : 0), 0);
      return `<article class="folder folder-card" ondblclick="openProject(${p.id})" title="Double-click to open folder">
        <div class="folder-icon">📁</div>
        <h4>${esc(p.name)}</h4>
        <p>${esc(p.office)} · ${docCount} document(s)</p>
        <div style="display:flex;gap:6px;margin-top:14px;flex-wrap:wrap">
          <button class="primary small" onclick="openProject(${p.id})">Open folder</button>
          ${canEdit() ? `<button class="secondary small" onclick="openEditProjectMasterModal(${p.id})" title="Edit Project">✏ Edit</button>` : ''}
        </div>
      </article>`;
    }).join('') || '<div class="empty">No accessible project documents.</div>'}
  </div>`;
}

function openProject(pid) {
  activeProject = pid;
  activeFolder = null;
  render();
}

function openSubFolder(pid, fid) {
  activeFolder = fid;
  render();
}

function projectDetail(p) {
  let folders = p.folders || (p.folders = []), activeF = activeFolder ? folders.find(f => f.id === activeFolder) : null;
  return `<div class="page-head">
    <div>
      <button class="secondary small" onclick="activeProject=null;activeFolder=null;render()">← All folders</button>
      <h3 style="margin-top:12px">📁 ${esc(p.name)}</h3>
      <p>${esc(p.office)} · Created ${p.date}${p.ref ? ` · <b style="color:var(--navy)">${esc(p.ref)}</b>` : ''}</p>
    </div>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      ${canEdit() ? `<button class="secondary small" onclick="openEditProjectMasterModal(${p.id})">✏ Edit Project</button>` : ''}
      ${canUpload() ? `<button class="primary" onclick="pickFile(${p.id})">+ Upload root file</button>` : ''}
    </div>
  </div>
  <section class="panel" style="margin-bottom:16px">
    ${activeF ? subFolderDetail(p, activeF) : `<div class="page-head">
      <div>
        <h4>Project sub-folders</h4>
        <div class="panel-sub">किसी भी फ़ोल्डर पर <b>Double Click</b> करके खोलें और उसके दस्तावेज़ देखें।</div>
      </div>
      ${(canUpload() || canEdit()) ? `<button class="primary small" onclick="openFolderModal(${p.id})">+ Add folder</button>` : ''}
    </div>
    <div class="folder-grid">
      ${folders.map(f => `<article class="folder folder-card" ondblclick="openSubFolder(${p.id},${f.id})" style="cursor:pointer;" title="Double-click to open folder">
        <div class="folder-icon">📂</div>
        <h4>${esc(f.name)}</h4>
        <p>${f.files.length} attachment(s)</p>
        <div style="display:flex;gap:6px;margin-top:12px;flex-wrap:wrap">
          <button class="secondary small" onclick="openSubFolder(${p.id},${f.id})">Open ➔</button>
          ${canUpload() ? `<button class="secondary small" onclick="openUploadModal(${p.id},${f.id})">+ Attach</button>` : ''}
          ${canDelete() ? `<button class="danger small" onclick="deleteFolder(${p.id},${f.id})">Delete</button>` : ''}
        </div>
      </article>`).join('') || '<div class="empty">No sub-folder created yet.</div>'}
    </div>`}
  </section>
  <section class="panel">
    <h4>Root documents</h4>
    <div class="panel-sub">${canUpload() ? 'Upload Word, Excel, PDF, image, ZIP or any other file type.' : 'Download only permitted files.'}</div>
    ${fileTable(p.files, p.id)}
  </section>`;
}

function subFolderDetail(p, f) {
  let files = f.files || [];
  return `<div class="page-head">
    <div>
      <button class="secondary small" onclick="openSubFolder(${p.id},null)">← Back to sub-folders</button>
      <h4 style="margin-top:10px">📁 ${esc(f.name)}</h4>
      <div class="panel-sub">${files.length} document(s) in this sub-folder</div>
    </div>
    ${canUpload() ? `<button class="primary small" onclick="openUploadModal(${p.id},${f.id})">+ Upload Document</button>` : ''}
  </div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th style="width:65px">Sl. No.</th>
          <th>Document No.</th>
          <th>Description</th>
          <th style="text-align:center;width:80px">Upload</th>
          <th style="text-align:center;width:95px">Download</th>
          <th style="text-align:center;width:75px">Edit</th>
          <th style="text-align:center;width:80px">Delete</th>
        </tr>
      </thead>
      <tbody>
        ${files.map((x, i) => `<tr>
          <td><b>${i + 1}</b></td>
          <td><b>${esc(x.docNo || ('DOC-' + String(i + 1).padStart(2, '0')))}</b><br><span class="small" style="color:var(--muted)">📄 ${esc(x.name)} (${esc(x.size)})</span></td>
          <td>${esc(x.description || '—')}</td>
          <td style="text-align:center">${canUpload() ? `<button class="secondary small" onclick="openUploadModal(${p.id},${f.id},${x.id})" title="Replace / Upload file">Upload</button>` : '—'}</td>
          <td style="text-align:center">${canView() ? `<button class="secondary small" onclick="downloadFolderFile(${p.id},${f.id},${x.id})" title="Download file">⇩ Download</button>` : '—'}</td>
          <td style="text-align:center">${canEdit() ? `<button class="secondary small" onclick="openFileEditModal(${p.id},${f.id},${x.id})" title="Edit Details">Edit</button>` : '—'}</td>
          <td style="text-align:center">${canDelete() ? `<button class="danger small" onclick="removeFolderFile(${p.id},${f.id},${x.id})" title="Delete Document">Delete</button>` : '—'}</td>
        </tr>`).join('') || `<tr><td colspan="7" class="empty">इस फ़ोल्डर में कोई फ़ाइल उपलब्ध नहीं है। ${canUpload() ? 'ऊपर दिए गए "+ Upload Document" बटन से फ़ाइल जोड़ें।' : ''}</td></tr>`}
      </tbody>
    </table>
  </div>`;
}

function fileTable(files, pid) {
  return files.length ? `<div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>File</th>
          <th>Type</th>
          <th>Uploaded</th>
          <th>Size</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${files.map(f => `<tr>
          <td><div class="file-row"><div class="file-ico">${esc(f.type)}</div><b>${esc(f.name)}</b></div></td>
          <td>${esc(f.type)}</td>
          <td>${f.date}</td>
          <td>${f.size}</td>
          <td>${esc(f.description || '—')}</td>
          <td>
            ${canView() ? `<button class="secondary small" onclick="downloadFile(${pid},${f.id})">⇩ Download</button>` : ''}
            ${canUpload() ? `<button class="secondary small" onclick="openUploadModal(${pid},0,${f.id})" title="Replace / Upload file">Upload</button>` : ''}
            ${canEdit() ? `<button class="secondary small" onclick="openFileEditModal(${pid},0,${f.id})">Edit</button>` : ''}
            ${canDelete() ? `<button class="danger small" onclick="removeFile(${pid},${f.id})">Delete</button>` : ''}
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>` : '<div class="empty">No files uploaded yet.</div>';
}

// 5. UPLOAD LOGIC (With Animation, Spinner, Duplicate Check, Vacant Form, Delete Auto-Refresh)
function previewUploadFile(input) {
  let info = document.querySelector('#selected-file-info');
  if (!info) return;
  if (input.files && input.files[0]) {
    let f = input.files[0], sz = (f.size / 1024 / 1024).toFixed(2) + ' MB';
    info.innerHTML = `<span style="background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;display:inline-flex;align-items:center;gap:4px">📄 Selected: <b>${esc(f.name)}</b> (${sz})</span>`;
  } else {
    info.innerHTML = '';
  }
}

function openUploadModal(pid, folderId, replaceFileId) {
  if (!canUpload()) { alert('Permission denied: You do not have permission to upload files.'); return; }
  let p = db.projects.find(x => x.id === pid), folder = folderId ? p.folders.find(f => f.id === folderId) : null, existing = replaceFileId ? (folder ? folder.files.find(f => f.id === replaceFileId) : p.files.find(f => f.id === replaceFileId)) : null;

  overlay(`<h3>${existing ? 'Re-upload / Replace attachment' : 'Upload attachment'}</h3>
<p>${folder ? `Folder: <b>${esc(folder.name)}</b>` : 'Project root documents'}</p>
<div id="upload-msg-box"></div>
<form id="upload-doc-form" novalidate autocomplete="off" onsubmit="saveUpload(event,${pid},${folderId || 0},${replaceFileId || 0})">
  <div class="field">
    <label>Document No. / Reference <span style="color:var(--red)">*</span></label>
    <input name="docNo" id="upload-docNo" required placeholder="e.g. DOC-01 / AG-2026/01" value="${esc(existing?.docNo || '')}" autocomplete="off">
  </div>
  <div class="field">
    <label>Select file ${existing ? `(Current: ${esc(existing.name)})` : ''}</label>
    <input name="file" id="upload-file" type="file" ${existing ? '' : 'required'} autocomplete="off" onchange="previewUploadFile(this)">
    <div id="selected-file-info" style="margin-top:6px;font-size:12px;font-weight:600;color:var(--navy)"></div>
  </div>
  <div class="field">
    <label>Description <span style="color:var(--red)">*</span></label>
    <input name="description" id="upload-description" required placeholder="e.g. Agreement copy / Bill details" value="${esc(existing?.description || '')}" autocomplete="off">
  </div>
  <div class="modal-actions" id="upload-actions">
    <button type="button" class="secondary" id="upload-cancel-btn" onclick="closeModal()">Cancel</button>
    <button class="primary" id="upload-submit-btn">${existing ? 'Update document' : 'Upload file'}</button>
  </div>
</form>`);
}

async function saveUpload(e, pid, folderId, replaceFileId) {
  e.preventDefault();
  if (!canUpload()) { alert('Permission denied: You do not have permission to upload files.'); return; }
  let form = e.target, btn = form ? form.querySelector('#upload-submit-btn') : null, cancelBtn = form ? form.querySelector('#upload-cancel-btn') : null;
  let d = new FormData(form), file = d.get('file'), docNo = (d.get('docNo') || '').trim(), desc = (d.get('description') || '').trim(), p = db.projects.find(x => x.id === pid);
  if (!p) return;
  let folder = folderId ? p.folders.find(f => f.id === folderId) : null;
  let target = folder ? folder.files : p.files;

  // Validation: ensure docNo, file, and description are provided
  if (!docNo) {
    let docInp = form ? form.querySelector('#upload-docNo') : null;
    if (docInp) {
      docInp.classList.add('input-shake');
      setTimeout(() => docInp.classList.remove('input-shake'), 400);
      docInp.focus();
    }
    let msgBox = document.querySelector ? document.querySelector('#upload-msg-box') : null;
    if (msgBox) {
      msgBox.innerHTML = `<div class="notice upload-error-banner" style="background:#fef2f2;color:#991b1b;border:1px solid #f87171;padding:10px 14px;border-radius:8px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px">
        <span style="font-size:16px;color:#ef4444">⚠️</span>
        <span>Please enter Document No. / Reference!</span>
      </div>`;
    }
    showToast('Please enter Document No. / Reference', 'danger');
    return;
  }
  if (!replaceFileId && (!file || !file.name || !file.size)) {
    let fileInp = form ? form.querySelector('#upload-file') : null;
    if (fileInp) {
      fileInp.classList.add('input-shake');
      setTimeout(() => fileInp.classList.remove('input-shake'), 400);
      fileInp.focus();
    }
    let msgBox = document.querySelector ? document.querySelector('#upload-msg-box') : null;
    if (msgBox) {
      msgBox.innerHTML = `<div class="notice upload-error-banner" style="background:#fef2f2;color:#991b1b;border:1px solid #f87171;padding:10px 14px;border-radius:8px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px">
        <span style="font-size:16px;color:#ef4444">⚠️</span>
        <span>Please select a file to upload!</span>
      </div>`;
    }
    showToast('Please select a file to upload!', 'danger');
    return;
  }
  if (!desc) {
    let descInp = form ? form.querySelector('#upload-description') : null;
    if (descInp) {
      descInp.classList.add('input-shake');
      setTimeout(() => descInp.classList.remove('input-shake'), 400);
      descInp.focus();
    }
    let msgBox = document.querySelector ? document.querySelector('#upload-msg-box') : null;
    if (msgBox) {
      msgBox.innerHTML = `<div class="notice upload-error-banner" style="background:#fef2f2;color:#991b1b;border:1px solid #f87171;padding:10px 14px;border-radius:8px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px">
        <span style="font-size:16px;color:#ef4444">⚠️</span>
        <span>Please enter Description!</span>
      </div>`;
    }
    showToast('Please enter Description', 'danger');
    return;
  }

  // 1. Button Animation: Loading state
  if (btn) {
    btn.disabled = true;
    btn.className = 'primary upload-btn-loading';
    btn.innerHTML = '<span class="btn-spinner"></span> Uploading...';
  }
  if (cancelBtn) cancelBtn.disabled = true;
  await new Promise(r => setTimeout(r, 250));

  // 2. Duplicate check: the same file can not be upload in same name or docNo
  let fileName = file && file.name ? file.name.trim() : '';
  if (!replaceFileId) {
    let duplicateByName = fileName && target.some(f => (f.name || '').trim().toLowerCase() === fileName.toLowerCase());
    let duplicateByDocNo = docNo && target.some(f => (f.docNo || '').trim().toLowerCase() === docNo.toLowerCase());
    if (duplicateByName || duplicateByDocNo) {
      if (btn) {
        btn.disabled = false;
        btn.className = 'primary';
        btn.innerHTML = 'Upload file';
      }
      if (cancelBtn) cancelBtn.disabled = false;
      let errMsg = duplicateByName
        ? `The same file can not be upload in same name: "${fileName}" already exists in this ${folderId ? 'sub-folder' : 'project'}!`
        : `Duplicate Document No.: "${docNo}" already exists in this ${folderId ? 'sub-folder' : 'project'}!`;
      let msgBox = document.querySelector ? document.querySelector('#upload-msg-box') : null;
      if (msgBox) {
        msgBox.innerHTML = `<div class="notice upload-error-banner" style="background:#fef2f2;color:#991b1b;border:1px solid #f87171;padding:12px 16px;border-radius:8px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px">
          <span style="font-size:18px;color:#ef4444">⚠️</span>
          <span>${esc(errMsg)}</span>
        </div>`;
      }
      showToast(errMsg, 'danger');
      return;
    }
  } else {
    let duplicateByName = fileName && target.some(f => f.id !== replaceFileId && (f.name || '').trim().toLowerCase() === fileName.toLowerCase());
    let duplicateByDocNo = docNo && target.some(f => f.id !== replaceFileId && (f.docNo || '').trim().toLowerCase() === docNo.toLowerCase());
    if (duplicateByName || duplicateByDocNo) {
      if (btn) {
        btn.disabled = false;
        btn.className = 'primary';
        btn.innerHTML = 'Update document';
      }
      if (cancelBtn) cancelBtn.disabled = false;
      let errMsg = duplicateByName
        ? `The same file can not be upload in same name: "${fileName}" is already in use by another document!`
        : `Duplicate Document No.: "${docNo}" is already in use by another document!`;
      let msgBox = document.querySelector ? document.querySelector('#upload-msg-box') : null;
      if (msgBox) {
        msgBox.innerHTML = `<div class="notice upload-error-banner" style="background:#fef2f2;color:#991b1b;border:1px solid #f87171;padding:12px 16px;border-radius:8px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px">
          <span style="font-size:18px;color:#ef4444">⚠️</span>
          <span>${esc(errMsg)}</span>
        </div>`;
      }
      showToast(errMsg, 'danger');
      return;
    }
  }

  // 3. Perform upload
  if (replaceFileId) {
    let existing = target.find(f => f.id === replaceFileId);
    if (existing) {
      existing.docNo = docNo;
      existing.description = desc;
      if (file && file.size) {
        let dataUrl = await fileToDataUrl(file);
        existing.name = file.name;
        existing.type = (file.name.split('.').pop() || 'FILE').toUpperCase();
        existing.size = (file.size / 1024 / 1024).toFixed(2) + ' MB';
        existing.date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        existing.dataUrl = dataUrl;
        existing.blob = file;
      }
    }
  } else {
    let dataUrl = file && file.size ? await fileToDataUrl(file) : null;
    target.push(makeFile(file, desc, docNo, dataUrl));
  }
  save();

  // 4. Button Animation: Success state
  if (btn) {
    btn.className = 'primary upload-btn-success';
    btn.innerHTML = '✓ File is Uploaded Sucessfully';
  }

  // 5. Uploader form should be vacant after uploaded the file
  if (form) {
    if (typeof form.reset === 'function') form.reset();
    let docInp = form.querySelector ? form.querySelector('[name="docNo"]') : null;
    let fileInp = form.querySelector ? form.querySelector('[name="file"]') : null;
    let descInp = form.querySelector ? form.querySelector('[name="description"]') : null;
    let fileInfo = form.querySelector ? form.querySelector('#selected-file-info') : null;
    if (docInp) docInp.value = '';
    if (fileInp) fileInp.value = '';
    if (descInp) descInp.value = '';
    if (fileInfo) fileInfo.innerHTML = '';
  }

  // 6. Display Animated message "File is Uploaded Sucessfully"
  let msgBox = document.querySelector ? document.querySelector('#upload-msg-box') : null;
  if (msgBox) {
    msgBox.innerHTML = `<div class="upload-success-animated">
      <div class="success-icon-circle">✓</div>
      <div class="success-title-text" id="upload-success-text">File is Uploaded Sucessfully</div>
      <div class="success-subtitle-text">Document attached to ${folder ? esc(folder.name) : 'Project documents'}</div>
    </div>`;
  }

  // 7. Floating toast with exact user requested text
  showToast('File is Uploaded Sucessfully');

  // 8. Auto refresh underlying view
  let mainEl = document.querySelector ? document.querySelector('.page') : null;
  if (mainEl && typeof page === 'function') {
    mainEl.innerHTML = page();
  }

  // 9. Close modal after animation completes
  setTimeout(() => {
    if (document.querySelector && document.querySelector('#upload-msg-box')) {
      closeModal();
    }
  }, 1200);
}

function removeFile(pid, fid) {
  if (!canDelete()) { alert('Permission denied: You do not have permission to delete files.'); return; }
  if (confirm('Delete this file record?')) {
    let p = db.projects.find(x => x.id === pid);
    if (p) {
      p.files = p.files.filter(f => f.id !== fid);
      save();
      render();
      showToast('File Deleted', 'danger');
    }
  }
}

function removeFolderFile(pid, folderId, fid) {
  if (!canDelete()) { alert('Permission denied: You do not have permission to delete attachments.'); return; }
  if (confirm('Delete this attachment?')) {
    let p = db.projects.find(x => x.id === pid);
    if (p) {
      let f = p.folders.find(x => x.id === folderId);
      if (f) {
        f.files = f.files.filter(x => x.id !== fid);
        save();
        render();
        showToast('File Deleted', 'danger');
      }
    }
  }
}

function makeFile(f, description = '', docNo = '', dataUrl = null) {
  return {
    id: Date.now() + Math.random(),
    docNo: docNo || ('DOC-' + Date.now().toString().slice(-4)),
    name: f.name,
    type: (f.name.split('.').pop() || 'FILE').toUpperCase(),
    size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    description,
    blob: f,
    dataUrl
  };
}

function fileToDataUrl(file) {
  return new Promise((res) => {
    if (typeof FileReader === 'undefined') return res('data:application/octet-stream;base64,mock');
    let r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = () => res(null);
    r.readAsDataURL(file);
  });
}

function bindPicker() {
  let p = document.querySelector('#file-picker');
  if (p) {
    p.onchange = async e => {
      let project = db.projects.find(x => x.id === Number(p.dataset.project));
      if (!project) return;
      let target = p.dataset.folder ? project.folders.find(f => f.id === Number(p.dataset.folder)).files : project.files;
      let added = 0, skipped = 0;
      for (let f of e.target.files) {
        let fn = (f.name || '').trim();
        if (fn && target.some(x => (x.name || '').trim().toLowerCase() === fn.toLowerCase())) {
          skipped++;
          continue;
        }
        let dataUrl = await fileToDataUrl(f);
        target.push(makeFile(f, '', '', dataUrl));
        added++;
      }
      save();
      p.value = '';
      delete p.dataset.folder;
      render();
      if (skipped > 0 && added === 0) {
        showToast('The same file can not be upload in same name!', 'danger');
      } else {
        showToast('File is Uploaded Sucessfully');
      }
    };
  }
}

function pickFile(pid) { openUploadModal(pid); }
function pickFolderFile(pid, fid) { openUploadModal(pid, fid); }

function downloadFile(pid, fid) {
  let p = db.projects.find(x => x.id === pid), f = p.files.find(x => x.id === fid);
  triggerDownload(f);
}
function downloadFolderFile(pid, fid, xid) {
  let p = db.projects.find(x => x.id === pid), folder = p.folders.find(x => x.id === fid), f = folder.files.find(x => x.id === xid);
  triggerDownload(f);
}
function triggerDownload(f) {
  if (!f) return;
  let a = document.createElement('a');
  a.href = f.dataUrl || ('data:text/plain;charset=utf-8,' + encodeURIComponent('Simulated departmental document content: ' + f.name));
  a.download = f.name;
  a.click();
}

function openFileEditModal(pid, folderId, fid) {
  if (!canEdit()) { alert('Permission denied: You do not have permission to edit document details.'); return; }
  let p = db.projects.find(x => x.id === pid), file = folderId ? p.folders.find(f => f.id === folderId).files.find(f => f.id === fid) : p.files.find(f => f.id === fid);
  overlay(`<h3>Edit attachment details</h3><p>File: <b>${esc(file.name)}</b></p><form onsubmit="saveFileEdit(event,${pid},${folderId || 0},${fid})"><div class="field"><label>Document No. / Reference</label><input name="docNo" required value="${esc(file.docNo || '')}"></div><div class="field"><label>Description</label><input name="description" required value="${esc(file.description || '')}"></div><div class="modal-actions"><button type="button" class="secondary" onclick="closeModal()">Cancel</button><button class="primary">Save changes</button></div></form>`);
}

function saveFileEdit(e, pid, folderId, fid) {
  e.preventDefault();
  if (!canEdit()) { alert('Permission denied: You do not have permission to edit document details.'); return; }
  let p = db.projects.find(x => x.id === pid), file = folderId ? p.folders.find(f => f.id === folderId).files.find(f => f.id === fid) : p.files.find(f => f.id === fid), d = new FormData(e.target);
  file.docNo = d.get('docNo').trim();
  file.description = d.get('description').trim();
  save();
  closeModal();
}

// 6. PRESERVED 19-POINT REPORT MODAL
function openReportModal(pid) {
  if (!canEdit() && !canView()) { alert('Permission denied'); return; }
  let p = db.projects.find(x => x.id === pid);
  let r = p.report || sampleProject1Report;
  overlay(`<h3>Detail Project Information Report (19 Points)</h3>
  <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA · ${esc(p.name)}</p>
  <div style="max-height:72vh;overflow-y:auto;padding-right:8px">
    ${renderReportTable(p, r)}
  </div>
  <div class="modal-actions" style="margin-top:20px">
    <button type="button" class="secondary" onclick="closeModal()">Close</button>
    <button type="button" class="primary" onclick="window.print()">🖨 Print Report</button>
  </div>`, true);
}

function renderReportTable(p, r) {
  let mats = r.materials || defaultMaterials;
  return `<div class="report-sheet"><div class="report-title-banner"><h3>OFFICE OF THE EXECUTIVE ENGINEER ROAD DIVISION HILSA</h3><h4>Detail Project Information Report</h4></div><div class="table-wrap"><table class="report-table"><thead><tr><th style="width:60px;text-align:center">Sl. No.</th><th style="width:33%">Item</th><th>Description</th></tr></thead><tbody>
  <tr><td class="center">1</td><td class="bold">Name of Work</td><td><b>${esc(r.nameOfWork || p.name)}</b></td></tr>
  <tr><td class="center">2</td><td class="bold">Name of Agency</td><td>${esc(r.nameOfAgency || p.contractorName || '—')}</td></tr>
  <tr><td class="center">3</td><td class="bold">Estimated Cost</td><td>${esc(r.estimatedCost || p.estimateAmount || '—')}</td></tr>
  <tr><td class="center">4</td><td class="bold">Agreement Value</td><td>${esc(r.agreementValue || p.agreementAmount || '—')}</td></tr>
  <tr><td class="center">5</td><td class="bold">Date of Start</td><td>${esc(r.dateOfStart || p.dateOfStart || '—')}</td></tr>
  <tr><td class="center">6</td><td class="bold">Date of Completion (As Per Agr)</td><td>${esc(r.dateOfCompletionAgr || p.stipulatedDateOfCompletion || '—')}</td></tr>
  <tr><td class="center">7</td><td class="bold">Time Extention Granted</td><td style="padding:0"><table class="report-subtable"><thead><tr><th>up to</th><th>Lt. No.</th><th>Date</th></tr></thead><tbody><tr><td>${esc(r.timeExtUpTo || '—')}</td><td>${esc(r.timeExtLtNo || '—')}</td><td>${esc(r.timeExtDate || '—')}</td></tr></tbody></table></td></tr>
  <tr><td class="center">8</td><td class="bold">Adminstrative Aproval (in Lakhs)</td><td style="padding:0"><table class="report-subtable"><thead><tr><th>Amount (in Lakhs)</th><th>Lt. No.</th><th>Date</th></tr></thead><tbody><tr><td>${esc(r.aaAmount || p.aaAmount || '—')}</td><td>${esc(r.aaLtNo || p.aaNo || '—')}</td><td>${esc(r.aaDate || p.aaDate || '—')}</td></tr></tbody></table></td></tr>
  <tr><td class="center">9</td><td class="bold">Technical Approval (in Lakhs)</td><td>${esc(r.techApproval || p.tsAmount || '—')}</td></tr>
  <tr><td class="center">10</td><td class="bold">Technical Sanction (in Lakhs)</td><td>${esc(r.techSanction || p.tsAmount || '—')}</td></tr>
  <tr><td class="center">11</td><td class="bold">Project Cost (As Per Approved BOQ)</td><td>${esc(r.projectCostBOQ || p.agreementAmount || '—')}</td></tr>
  <tr><td class="center">12</td><td class="bold">Date of Tender</td><td>${esc(r.dateOfTender || '—')}</td></tr>
  <tr><td class="center">13</td><td class="bold">Date of Agreement</td><td>${esc(r.dateOfAgreement || p.agreementDate || '—')}</td></tr>
  <tr><td class="center">14</td><td class="bold">Actual Date of Completion</td><td>${esc(r.actualDateOfCompletion || 'In Progress')}</td></tr>
  <tr><td class="center">15</td><td class="bold">Land Acqusition ( Provision in lacs)</td><td>${esc(r.landAcquisition || '—')}</td></tr>
  <tr><td class="center">16</td><td class="bold">Utility Shifting (Provision in lacs)</td><td>${esc(r.utilityShifting || '—')}</td></tr>
  <tr><td class="center">17</td><td class="bold">Bitumen Consumption Status</td><td style="padding:0"><table class="report-subtable"><thead><tr><th>Required Bitumen Quantity</th><th>Consume Qty</th><th>Balance Qty</th><th>Remarks</th></tr></thead><tbody><tr><td>${esc(r.bitumenReq || '180 MT')}</td><td>${esc(r.bitumenConsumed || '125.4 MT')}</td><td>${esc(r.bitumenBalance || '54.6 MT')}</td><td>${esc(r.bitumenRemarks || 'VG-30')}</td></tr></tbody></table></td></tr>
  <tr><td class="center">18</td><td class="bold">Consumed Material</td><td style="padding:0"><table class="report-subtable"><thead><tr><th style="text-align:left">Material</th><th>As Per Upto date Work Done</th><th>Challan Submitted</th><th>Balance Challan</th><th>Remarks</th></tr></thead><tbody>${mats.map(m => `<tr><td style="text-align:left;font-weight:600">${esc(m.letter || '')} ${esc(m.item)}</td><td>${esc(m.workDone || '—')}</td><td>${esc(m.challanSubmitted || '—')}</td><td>${esc(m.balanceChallan || '—')}</td><td>${esc(m.remarks || '—')}</td></tr>`).join('')}</tbody></table></td></tr>
  <tr><td class="center">19</td><td class="bold">Test Report Status on Accounts Bill</td><td style="padding:0"><table class="report-subtable"><thead><tr><th>on Accounts Bill</th><th>Letter No. & Date</th><th>Status</th><th>Remarks</th></tr></thead><tbody><tr><td>${esc(r.testReportBill || '1st RA Bill')}</td><td>${esc(r.testReportLtNoDate || 'QC/LAB/2026/89')}</td><td><span class="status approved">Submitted</span></td><td>${esc(r.testReportRemarks || 'Attached')}</td></tr></tbody></table></td></tr>
  </tbody></table></div></div>`;
}

// 7. PRESERVED OFFICE MANAGEMENT, USERS, ROLES, LETTERS

// --- OFFICE MANAGEMENT (ADD, EDIT, DELETE) ---
function officeManagement() {
  if (current.role !== 'Admin' && current.role !== 'EE') return '<div class="empty">Access Restricted to Division Admin.</div>';
  let offs = getOffices();
  return `<div class="page-head">
    <div>
      <h3>Office & Sub-Division Management</h3>
      <p>Division, Sub-Divisions, Branches, Wings and In-Charge Officers hierarchy</p>
    </div>
    <div style="display:flex;gap:8px">
      <button class="primary" onclick="openOfficeModal()">+ Add Office / Unit</button>
    </div>
  </div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Unit / Office Name</th>
          <th>Type</th>
          <th>Code</th>
          <th>In-Charge Officer</th>
          <th>Location</th>
          <th style="text-align:center">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${offs.map(o => `<tr>
          <td><b>${esc(o.name)}</b></td>
          <td><span class="badge-subdiv">${esc(o.type || 'Sub-Division')}</span></td>
          <td><b>${esc(o.code || '—')}</b></td>
          <td>${esc(o.inchargeName || 'Officer')} (${esc(o.incharge || 'In-Charge')})</td>
          <td>${esc(o.location || 'Hilsa')}</td>
          <td style="text-align:center">
            <div style="display:flex;gap:6px;justify-content:center">
              <button class="secondary small" onclick="openOfficeModal('${o.id}')" title="Edit Office Details">✏ Edit</button>
              <button class="danger small" onclick="deleteOffice('${o.id}')" title="Delete Office Unit">🗑 Delete</button>
            </div>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function openOfficeModal(oid) {
  let o = oid ? db.offices.find(x => x.id === oid) : null;
  overlay(`<h3>${o ? 'Edit Office / Sub-Division' : 'Add New Office / Sub-Division'}</h3>
  <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA</p>
  <form onsubmit="saveOffice(event, '${o ? o.id : ''}')">
    <div class="field">
      <label>Office / Sub-Division Name <span style="color:var(--red)">*</span></label>
      <input name="name" required value="${esc(o ? o.name : '')}" placeholder="e.g. Sub-Division Ekangarsarai">
    </div>
    <div class="form-grid-2">
      <div class="field">
        <label>Unit Type <span style="color:var(--red)">*</span></label>
        <select name="type">
          <option ${o && o.type === 'Division' ? 'selected' : ''}>Division</option>
          <option ${o && o.type === 'Sub-Division' ? 'selected' : (!o ? 'selected' : '')}>Sub-Division</option>
          <option ${o && o.type === 'Branch' ? 'selected' : ''}>Branch</option>
          <option ${o && o.type === 'Wing' ? 'selected' : ''}>Wing</option>
        </select>
      </div>
      <div class="field">
        <label>Office Code</label>
        <input name="code" value="${esc(o ? o.code : '')}" placeholder="e.g. SDE">
      </div>
    </div>
    <div class="form-grid-2">
      <div class="field">
        <label>In-Charge Designation</label>
        <select name="incharge">
          ${(db.designations || defaultDesignations).map(d => `<option ${o && o.incharge === d ? 'selected' : ''}>${esc(d)}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>In-Charge Officer Name</label>
        <input name="inchargeName" value="${esc(o ? o.inchargeName : '')}" placeholder="e.g. Er. Rajiv Ranjan">
      </div>
    </div>
    <div class="field">
      <label>Office Location / Address</label>
      <input name="location" value="${esc(o ? o.location : '')}" placeholder="e.g. Sub-Division Office Campus, Hilsa">
    </div>
    <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center">
      <div>
        ${o ? `<button type="button" class="danger" onclick="closeModal();deleteOffice('${o.id}')">🗑 Delete Office</button>` : ''}
      </div>
      <div style="display:flex;gap:8px">
        <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
        <button class="primary">${o ? 'Update Office' : 'Save Office'}</button>
      </div>
    </div>
  </form>`);
}

function saveOffice(e, oid) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  if (oid) {
    let o = db.offices.find(x => x.id === oid);
    if (o) Object.assign(o, d);
    showToast(`Office "${d.name}" updated successfully.`, 'success');
  } else {
    let newId = 'OFF-' + String(db.offices.length + 1).padStart(2, '0');
    db.offices.push({
      id: newId,
      name: d.name.trim(),
      type: d.type || 'Sub-Division',
      code: d.code ? d.code.trim().toUpperCase() : 'SD',
      incharge: d.incharge || 'Assistant Engineer',
      inchargeName: d.inchargeName ? d.inchargeName.trim() : 'Officer In-Charge',
      location: d.location ? d.location.trim() : 'Hilsa, Nalanda'
    });
    showToast(`New office "${d.name}" added successfully.`, 'success');
  }
  offices = getOfficeList();
  save();
  closeModal();
  render();
}

function deleteOffice(oid) {
  let o = db.offices.find(x => x.id === oid);
  if (!o) return;
  if (db.offices.length <= 1) {
    alert('At least one office must exist in the system.');
    return;
  }
  if (confirm(`Are you sure you want to delete office "${o.name}" (${o.code})?`)) {
    db.offices = db.offices.filter(x => x.id !== oid);
    offices = getOfficeList();
    save();
    showToast(`Office "${o.name}" deleted successfully.`, 'danger');
    render();
  }
}

// --- USER MANAGEMENT & CONTRACTOR PROJECT TAGGING (ADD, EDIT, DELETE, TAG/UNTAG) ---
let activeUserAdminTab = 'all';

function switchUserAdminTab(tab) {
  activeUserAdminTab = tab;
  render();
}

function users() {
  if (current.role !== 'Admin' && current.role !== 'EE') return '<div class="empty">Access Restricted to Administrator.</div>';
  
  let officersList = db.users.filter(u => (u.role || '').toLowerCase() !== 'contractor');
  let contractorCount = (db.contractors || []).length;

  return `<div class="page-head">
    <div>
      <h3>User Administration & Contractor Project Tagging</h3>
      <p>Manage authenticated engineers, staff, accounts officers and registered contractor project assignments</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="secondary" onclick="openTagContractorModal()">🏷️ Tag Contractor to Project</button>
      <button class="primary" onclick="openUserModal()">+ Add User</button>
    </div>
  </div>

  <div class="tab-buttons" style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
    <button class="${activeUserAdminTab === 'all' ? 'primary' : 'secondary'}" onclick="switchUserAdminTab('all')">📋 View All (Officers & Contractors)</button>
    <button class="${activeUserAdminTab === 'users' ? 'primary' : 'secondary'}" onclick="switchUserAdminTab('users')">👥 Department Officers & Staff (${officersList.length})</button>
    <button class="${activeUserAdminTab === 'contractors' ? 'primary' : 'secondary'}" onclick="switchUserAdminTab('contractors')">🏗️ Registered Contractors & Project Tagging (${contractorCount})</button>
  </div>

  ${(activeUserAdminTab === 'all' || activeUserAdminTab === 'users') ? `
  <div class="panel" style="margin-bottom:24px;border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:20px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;border-bottom:1px solid #e2e8f0;padding-bottom:10px;flex-wrap:wrap;gap:8px">
      <div>
        <h4 style="margin:0;font-size:15px;color:var(--navy)">👥 Department Officers & Authenticated Users</h4>
        <span style="font-size:12px;color:var(--muted)">Manage login accounts, assigned roles, designations and multi-office jurisdictions</span>
      </div>
      <button class="primary small" onclick="openUserModal()">+ Add User</button>
    </div>
    <div class="table-wrap" style="margin:0">
      <table>
        <thead>
          <tr>
            <th>Name / User ID</th>
            <th>Role</th>
            <th>Designation</th>
            <th>Assigned Offices (कार्यालय)</th>
            <th>Status</th>
            <th style="text-align:center">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${db.users.map(u => `<tr>
            <td>
              <b>${esc(u.name)}</b><br>
              <span class="small" style="color:var(--muted)">${esc(u.id)}</span>
            </td>
            <td><span class="badge-subdiv" style="font-weight:700">${esc(u.role)}</span></td>
            <td>${esc(u.designation || '—')}</td>
            <td>${renderOfficeBadges(u)}</td>
            <td><span class="status ${u.approved ? 'approved' : 'pending'}">${u.approved ? 'Active' : 'Pending'}</span></td>
            <td style="text-align:center">
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="secondary small" onclick="openUserModal('${u.id}')" title="Edit User">✏ Edit</button>
                <button class="danger small" onclick="deleteUser('${u.id}')" title="Delete User">🗑 Delete</button>
              </div>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
  ` : ''}

  ${(activeUserAdminTab === 'all' || activeUserAdminTab === 'contractors') ? renderContractorTaggingSection() : ''}
  `;
}

function renderContractorTaggingSection() {
  let contractors = db.contractors || [];

  return `
  <div class="panel" style="margin-bottom:24px;border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:20px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px;border-bottom:1px solid #e2e8f0;padding-bottom:12px">
      <div>
        <h3 style="margin:0 0 4px;display:flex;align-items:center;gap:8px">
          <span>🏗️ Registered Contractors & Project Work Tagging Desk</span>
          <span style="font-size:12px;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:12px;font-weight:600">${contractors.length} Registered</span>
        </h3>
        <p style="margin:0;color:var(--muted);font-size:13px">
          Tag / Untag contractors with Works/Projects along with Division, Sub-Division, Junior Engineer (J.E) and Assistant Engineer (A.E)
        </p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="primary" onclick="openTagContractorModal()">🏷️ Tag Contractor to Project</button>
        <button class="secondary" onclick="openContractorProfileModal()">+ Add New Contractor</button>
      </div>
    </div>

    <div style="display:grid;gap:18px">
      ${contractors.map(c => {
        let tags = c.taggedProjects || [];
        return `
        <div class="contractor-card" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:12px">
            <div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span style="font-size:16px;font-weight:700;color:var(--navy)">${esc(c.name)}</span>
                <span class="badge-subdiv" style="background:#fef3c7;color:#92400e;font-weight:700">${esc(c.id)}</span>
                <span class="badge-subdiv" style="background:#e0f2fe;color:#0369a1">${esc(c.class || 'Class-1')}</span>
              </div>
              <div style="font-size:12px;color:var(--muted);margin-top:4px">
                <b>Authorized Rep:</b> ${esc(c.rep || '—')} | <b>Reg No:</b> ${esc(c.regNo || '—')} | <b>PAN:</b> ${esc(c.pan || '—')} | <b>GSTIN:</b> ${esc(c.gstin || '—')}
              </div>
              <div style="font-size:12px;color:var(--muted);margin-top:2px">
                <b>Phone:</b> ${esc(c.phone || '—')} | <b>Email:</b> ${esc(c.email || '—')} | <b>Address:</b> ${esc(c.address || '—')}
              </div>
            </div>
            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
              <button class="primary small" onclick="openTagContractorModal('${c.id}')" title="Tag this contractor to a project">🏷️ Tag to Work</button>
              <button class="secondary small" onclick="openContractorProfileModal('${c.id}')" title="Edit Contractor Profile">✏ Edit Profile</button>
              <button class="danger small" onclick="deleteContractor('${c.id}')" title="Delete Contractor">🗑 Delete</button>
            </div>
          </div>

          <!-- Tagged Works Table -->
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden">
            <div style="background:#f1f5f9;padding:8px 12px;font-size:12px;font-weight:700;color:#334155;display:flex;justify-content:space-between;align-items:center">
              <span>Tagged Works & Projects (संबद्ध कार्य) (${tags.length})</span>
              <span style="font-size:11px;color:var(--muted)">Includes Division, Sub-Division, J.E & A.E Charge</span>
            </div>
            ${tags.length === 0 ? `
              <div style="padding:16px;text-align:center;color:var(--muted);font-size:13px">
                No works/projects currently tagged to this contractor. Click <b>"🏷️ Tag to Work"</b> to assign.
              </div>
            ` : `
              <div class="table-wrap" style="margin:0;border:none">
                <table style="font-size:12px;margin:0">
                  <thead style="background:#f8fafc">
                    <tr>
                      <th style="width:40px">Sl.</th>
                      <th>Work / Project Details</th>
                      <th>Division (प्रमंडल)</th>
                      <th>Sub-Division (अवर प्रमंडल)</th>
                      <th>Assigned J.E (कनीय अभियंता)</th>
                      <th>Assigned A.E (सहायक अभियंता)</th>
                      <th>Agreement No</th>
                      <th style="text-align:center;width:130px">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tags.map((tp, idx) => {
                      let prj = db.projects.find(x => x.id === tp.projectId);
                      return `
                      <tr>
                        <td>${idx + 1}</td>
                        <td>
                          <b>${esc(tp.workName || (prj ? prj.name : 'Project #' + tp.projectId))}</b><br>
                          <span class="small" style="color:var(--muted)">Project ID: #${tp.projectId} ${prj && prj.projectCode ? '(' + esc(prj.projectCode) + ')' : ''}</span>
                          ${tp.taggedDate ? `<span class="small" style="color:#059669;margin-left:6px">📅 ${esc(tp.taggedDate)}</span>` : ''}
                        </td>
                        <td><span class="badge-primary-office">${esc(tp.division || 'Road Division Hilsa')}</span></td>
                        <td><span class="badge-assigned-office">${esc(tp.subDivision || 'Sub-Division Hilsa')}</span></td>
                        <td>
                          <span style="font-weight:600;color:#0f172a">👷 ${esc(tp.jeName || tp.jeId || 'Er. Ramesh Kumar')}</span><br>
                          <span class="small" style="color:var(--muted)">(${esc(tp.jeId || 'JE-HIL-01')})</span>
                        </td>
                        <td>
                          <span style="font-weight:600;color:#0f172a">👔 ${esc(tp.aeName || tp.aeId || 'Er. Rajiv Ranjan')}</span><br>
                          <span class="small" style="color:var(--muted)">(${esc(tp.aeId || 'AE-HIL-01')})</span>
                        </td>
                        <td>
                          <span style="font-family:monospace;font-size:11px">${esc(tp.agreementNo || (prj ? (prj.contractAgreementNo || prj.agreementNo) : '—'))}</span>
                        </td>
                        <td style="text-align:center">
                          <div style="display:flex;gap:4px;justify-content:center">
                            <button class="secondary small" style="padding:2px 6px" onclick="openTagContractorModal('${c.id}', ${tp.projectId})" title="Edit Work Tagging details">✏ Edit</button>
                            <button class="danger small" style="padding:2px 6px" onclick="untagContractorProject('${c.id}', ${tp.projectId})" title="Untag Contractor from this Work">❌ Untag</button>
                          </div>
                        </td>
                      </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
        `;
      }).join('')}
    </div>
  </div>
  `;
}

function openTagContractorModal(contractorId = '', projectId = null) {
  let con = contractorId ? db.contractors.find(c => c.id === contractorId) : null;
  let allContractors = db.contractors || [];
  let allProjects = db.projects || [];
  let allOffs = getOffices();
  let divisions = allOffs.filter(o => o.type === 'Division');
  if (!divisions.length) divisions = [{ name: 'Road Division Hilsa' }];
  let subDivisions = allOffs.filter(o => o.type === 'Sub-Division');
  if (!subDivisions.length) {
    subDivisions = [
      { name: 'Sub-Division Hilsa' },
      { name: 'Sub-Division Chandi' },
      { name: 'Sub-Division Rajgir' }
    ];
  }

  let jeUsers = db.users.filter(u => (u.role || '').toUpperCase() === 'JE');
  let aeUsers = db.users.filter(u => (u.role || '').toUpperCase() === 'AE');

  let selectedProj = projectId ? allProjects.find(p => p.id === Number(projectId)) : null;
  let existingTag = (con && selectedProj && con.taggedProjects) ? con.taggedProjects.find(tp => tp.projectId === selectedProj.id) : null;

  let currentDivision = existingTag ? existingTag.division : (selectedProj ? (selectedProj.division || 'Road Division Hilsa') : 'Road Division Hilsa');
  let currentSubDiv = existingTag ? existingTag.subDivision : (selectedProj ? (selectedProj.subDivision || selectedProj.office || 'Sub-Division Hilsa') : 'Sub-Division Hilsa');
  let currentJE = existingTag ? existingTag.jeId : (selectedProj ? (selectedProj.assignedJE || (jeUsers[0]?.id || '')) : (jeUsers[0]?.id || ''));
  let currentAE = existingTag ? existingTag.aeId : (selectedProj ? (selectedProj.assignedAE || (aeUsers[0]?.id || '')) : (aeUsers[0]?.id || ''));
  let currentAgmt = existingTag ? existingTag.agreementNo : (selectedProj ? (selectedProj.contractAgreementNo || selectedProj.agreementNo || '') : '');
  let currentRemarks = existingTag ? (existingTag.remarks || '') : '';
  let currentDate = existingTag ? (existingTag.taggedDate || '') : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  overlay(`
    <h3>${projectId ? '✏ Edit Contractor Work Tagging' : '🏷️ Tag Contractor to Work / Project'}</h3>
    <p>Link Registered Contractor with Road Project, Division, Sub-Division, Responsible J.E and A.E</p>

    <form onsubmit="saveContractorProjectTag(event)" style="max-height:76vh;overflow-y:auto;padding-right:8px">
      <input type="hidden" name="isEditing" value="${projectId ? '1' : '0'}">
      <input type="hidden" name="originalProjectId" value="${projectId || ''}">
      <input type="hidden" name="originalContractorId" value="${contractorId || ''}">

      <div class="field">
        <label>Select Contractor (ठेकेदार / संवेदक) <span style="color:var(--red)">*</span></label>
        <select name="contractorId" required>
          <option value="">-- Choose Registered Contractor --</option>
          ${allContractors.map(c => `
            <option value="${c.id}" ${contractorId === c.id ? 'selected' : ''}>
              ${esc(c.name)} (${esc(c.id)}) - ${esc(c.class || 'Class-1')}
            </option>
          `).join('')}
        </select>
      </div>

      <div class="field">
        <label>Select Work / Project (कार्य / योजना) <span style="color:var(--red)">*</span></label>
        <select name="projectId" required onchange="onTagProjectSelectionChange(this)">
          <option value="">-- Choose Project from Master --</option>
          ${allProjects.map(p => `
            <option value="${p.id}" ${projectId === p.id ? 'selected' : ''}>
              #${p.id} - ${esc(p.name)} [${esc(p.contractAgreementNo || p.agreementNo || 'No Agmt')}]
            </option>
          `).join('')}
        </select>
        <small style="color:var(--muted)">Selecting a work will automatically auto-fill Division, Sub-Division, J.E, A.E and Agreement details.</small>
      </div>

      <div class="form-grid-2">
        <div class="field">
          <label>Division (प्रमंडल) <span style="color:var(--red)">*</span></label>
          <select name="division" required>
            ${divisions.map(d => `<option value="${esc(d.name)}" ${currentDivision === d.name ? 'selected' : ''}>${esc(d.name)}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label>Sub-Division (अवर प्रमंडल) <span style="color:var(--red)">*</span></label>
          <select name="subDivision" required>
            ${subDivisions.map(sd => `<option value="${esc(sd.name)}" ${currentSubDiv === sd.name ? 'selected' : ''}>${esc(sd.name)}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="field">
          <label>Responsible Junior Engineer (J.E - कनीय अभियंता) <span style="color:var(--red)">*</span></label>
          <select name="jeId" required>
            <option value="">-- Assign J.E --</option>
            ${jeUsers.map(je => `<option value="${je.id}" ${currentJE === je.id ? 'selected' : ''}>${esc(je.name)} (${esc(je.id)}) - ${esc(je.office || 'Division')}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label>Responsible Assistant Engineer (A.E - सहायक अभियंता) <span style="color:var(--red)">*</span></label>
          <select name="aeId" required>
            <option value="">-- Assign A.E --</option>
            ${aeUsers.map(ae => `<option value="${ae.id}" ${currentAE === ae.id ? 'selected' : ''}>${esc(ae.name)} (${esc(ae.id)}) - ${esc(ae.office || 'Sub-Division')}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="field">
          <label>Contract Agreement No / Work Order <span style="color:var(--red)">*</span></label>
          <input name="agreementNo" required value="${esc(currentAgmt)}" placeholder="e.g. 01 SBD OF 2025-26">
        </div>
        <div class="field">
          <label>Tagging Effective Date</label>
          <input name="taggedDate" value="${esc(currentDate)}" placeholder="DD Mon YYYY">
        </div>
      </div>

      <div class="field">
        <label>Remarks / Assignment Notes</label>
        <input name="remarks" value="${esc(currentRemarks)}" placeholder="e.g. Work awarded vide memo no. 412/EE">
      </div>

      <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">
        <div>
          ${projectId && contractorId ? `
            <button type="button" class="danger" onclick="closeModal();untagContractorProject('${contractorId}', ${projectId})">❌ Untag This Project</button>
          ` : ''}
        </div>
        <div style="display:flex;gap:8px">
          <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="primary">${projectId ? 'Update Tagging' : 'Save Project Tagging'}</button>
        </div>
      </div>
    </form>
  `);
}

function onTagProjectSelectionChange(sel) {
  let form = sel.closest ? sel.closest('form') : (sel.form || null);
  if (!form) return;
  let pid = Number(sel.value);
  if (!pid) return;
  let p = db.projects.find(x => x.id === pid);
  if (!p) return;

  let divSelect = form.querySelector('[name="division"]');
  if (divSelect && p.division) {
    let opt = Array.from(divSelect.options || []).find(o => o.value === p.division);
    if (opt) opt.selected = true;
    else divSelect.value = p.division;
  }

  let subDivSelect = form.querySelector('[name="subDivision"]');
  let targetSubDiv = p.subDivision || p.office;
  if (subDivSelect && targetSubDiv) {
    let opt = Array.from(subDivSelect.options || []).find(o => o.value === targetSubDiv);
    if (opt) opt.selected = true;
    else subDivSelect.value = targetSubDiv;
  }

  let agNoInput = form.querySelector('[name="agreementNo"]');
  if (agNoInput) {
    agNoInput.value = p.contractAgreementNo || p.agreementNo || agNoInput.value;
  }

  let jeSelect = form.querySelector('[name="jeId"]');
  if (jeSelect) {
    if (p.assignedJE) {
      jeSelect.value = p.assignedJE;
    } else {
      let matchJE = db.users.find(u => (u.role || '').toUpperCase() === 'JE' && (u.office === targetSubDiv || (u.assignedOffices && u.assignedOffices.includes(targetSubDiv))));
      if (matchJE) jeSelect.value = matchJE.id;
      else {
        let anyJE = db.users.find(u => (u.role || '').toUpperCase() === 'JE');
        if (anyJE) jeSelect.value = anyJE.id;
      }
    }
  }

  let aeSelect = form.querySelector('[name="aeId"]');
  if (aeSelect) {
    if (p.assignedAE) {
      aeSelect.value = p.assignedAE;
    } else {
      let matchAE = db.users.find(u => (u.role || '').toUpperCase() === 'AE' && (u.office === targetSubDiv || (u.assignedOffices && u.assignedOffices.includes(targetSubDiv))));
      if (matchAE) aeSelect.value = matchAE.id;
      else {
        let anyAE = db.users.find(u => (u.role || '').toUpperCase() === 'AE');
        if (anyAE) aeSelect.value = anyAE.id;
      }
    }
  }
}

function saveContractorProjectTag(e) {
  if (e && e.preventDefault) e.preventDefault();
  let d = {};
  if (typeof FormData !== 'undefined') {
    try {
      d = Object.fromEntries(new FormData(e.target));
    } catch (err) {}
  }
  if ((!d.contractorId || !d.projectId) && e && e.target && e.target.elements) {
    ['contractorId', 'projectId', 'division', 'subDivision', 'jeId', 'aeId', 'agreementNo', 'taggedDate', 'remarks'].forEach(k => {
      if (e.target.elements[k]) d[k] = e.target.elements[k].value;
    });
  }

  let conId = d.contractorId;
  let pid = Number(d.projectId);

  if (!conId || !pid) {
    alert('Please select both Contractor and Project.');
    return;
  }

  let con = db.contractors.find(c => c.id === conId);
  if (!con) {
    alert('Selected contractor not found.');
    return;
  }

  let p = db.projects.find(x => x.id === pid);
  if (!p) {
    alert('Selected project not found.');
    return;
  }

  let je = db.users.find(u => u.id === d.jeId);
  let ae = db.users.find(u => u.id === d.aeId);

  // If this project was tagged to another contractor previously, remove it from that contractor
  db.contractors.forEach(otherCon => {
    if (otherCon.id !== conId && otherCon.taggedProjects) {
      otherCon.taggedProjects = otherCon.taggedProjects.filter(tp => tp.projectId !== pid);
    }
  });

  if (!con.taggedProjects) con.taggedProjects = [];
  let existingTag = con.taggedProjects.find(tp => tp.projectId === pid);

  let tagObj = {
    projectId: p.id,
    workName: p.name,
    division: d.division || 'Road Division Hilsa',
    subDivision: d.subDivision || p.subDivision || 'Sub-Division Hilsa',
    jeId: je ? je.id : d.jeId,
    jeName: je ? je.name : d.jeId,
    aeId: ae ? ae.id : d.aeId,
    aeName: ae ? ae.name : d.aeId,
    agreementNo: d.agreementNo || p.contractAgreementNo || p.agreementNo || '',
    taggedDate: d.taggedDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    remarks: d.remarks || ''
  };

  if (existingTag) {
    Object.assign(existingTag, tagObj);
  } else {
    con.taggedProjects.push(tagObj);
  }

  // Synchronize Project properties
  p.contractorId = con.id;
  p.contractorName = con.name;
  p.division = tagObj.division;
  p.subDivision = tagObj.subDivision;
  p.office = tagObj.subDivision;
  p.assignedJE = tagObj.jeId;
  p.assignedAE = tagObj.aeId;
  if (tagObj.agreementNo) {
    p.contractAgreementNo = tagObj.agreementNo;
    p.agreementNo = tagObj.agreementNo;
  }
  if (!p.access) p.access = [];
  [con.id, tagObj.jeId, tagObj.aeId].forEach(uid => {
    if (uid && !p.access.includes(uid)) p.access.push(uid);
  });

  // Ensure contractor user in db.users has assigned office for this project
  let conUser = db.users.find(u => u.id === con.id || u.contractorId === con.id);
  if (conUser) {
    if (!conUser.assignedOffices) conUser.assignedOffices = [conUser.office || 'Road Division Hilsa'];
    if (!conUser.assignedOffices.includes(tagObj.subDivision)) conUser.assignedOffices.push(tagObj.subDivision);
    if (!conUser.assignedOffices.includes(tagObj.division)) conUser.assignedOffices.push(tagObj.division);
  }

  save();
  closeModal();
  showToast(`Contractor "${con.name}" successfully tagged to Project #${p.id} (JE: ${tagObj.jeName}, AE: ${tagObj.aeName}).`, 'success');
  render();
}

function untagContractorProject(contractorId, projectId) {
  let con = db.contractors.find(c => c.id === contractorId);
  if (!con) return;
  let pid = Number(projectId);
  let p = db.projects.find(x => x.id === pid);
  let pName = p ? p.name : ('Project #' + pid);

  if (confirm(`Are you sure you want to untag "${esc(pName)}" from contractor "${esc(con.name)}"?`)) {
    if (con.taggedProjects) {
      con.taggedProjects = con.taggedProjects.filter(tp => tp.projectId !== pid);
    }
    if (p && p.contractorId === contractorId) {
      p.contractorId = '';
      p.contractorName = 'Pending Tender Award';
      if (p.access) {
        p.access = p.access.filter(uid => uid !== contractorId);
      }
    }
    save();
    showToast(`Project untagged successfully from contractor "${con.name}".`, 'info');
    render();
  }
}

function openContractorProfileModal(contractorId = null) {
  let c = contractorId ? db.contractors.find(x => x.id === contractorId) : null;
  let nextId = 'CON-' + String((db.contractors.length + 1)).padStart(2, '0');

  overlay(`
    <h3>${c ? 'Edit Registered Contractor Profile' : 'Register New Contractor'}</h3>
    <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA</p>
    <form onsubmit="saveContractorProfile(event, '${c ? c.id : ''}')" style="max-height:76vh;overflow-y:auto;padding-right:8px">
      <div class="field">
        <label>Contractor / Agency Firm Name <span style="color:var(--red)">*</span></label>
        <input name="name" required value="${esc(c ? c.name : '')}" placeholder="e.g. M/s Patliputra Road Infrastructure Pvt. Ltd.">
      </div>
      <div class="form-grid-2">
        <div class="field">
          <label>Contractor ID <span style="color:var(--red)">*</span></label>
          <input name="id" required ${c ? 'readonly style="background:#f1f5f9"' : ''} value="${esc(c ? c.id : nextId)}" placeholder="e.g. CON-03">
        </div>
        <div class="field">
          <label>Registration Class <span style="color:var(--red)">*</span></label>
          <select name="class" required>
            ${['Class-1', 'Class-2', 'Class-3', 'Class-4'].map(cls => `<option ${c && c.class === cls ? 'selected' : ''}>${cls}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-grid-2">
        <div class="field">
          <label>Authorized Representative / MD</label>
          <input name="rep" value="${esc(c ? c.rep : '')}" placeholder="e.g. Sri Rameshwar Prasad (MD)">
        </div>
        <div class="field">
          <label>RCD Registration No.</label>
          <input name="regNo" value="${esc(c ? c.regNo : '')}" placeholder="e.g. RCD/BIHAR/CLASS-1/2024/091">
        </div>
      </div>
      <div class="form-grid-2">
        <div class="field">
          <label>PAN Number</label>
          <input name="pan" value="${esc(c ? c.pan : '')}" placeholder="e.g. AAACB1234K">
        </div>
        <div class="field">
          <label>GSTIN</label>
          <input name="gstin" value="${esc(c ? c.gstin : '')}" placeholder="e.g. 10AAACB1234K1Z5">
        </div>
      </div>
      <div class="form-grid-2">
        <div class="field">
          <label>Phone / Mobile <span style="color:var(--red)">*</span></label>
          <input name="phone" required value="${esc(c ? c.phone : '')}" placeholder="+91 94310 00000">
        </div>
        <div class="field">
          <label>Email Address <span style="color:var(--red)">*</span></label>
          <input name="email" type="email" required value="${esc(c ? c.email : '')}" placeholder="contractor@agency.com">
        </div>
      </div>
      <div class="field">
        <label>Registered Office Address</label>
        <input name="address" value="${esc(c ? c.address : '')}" placeholder="e.g. Station Road, Hilsa, Nalanda - 801302">
      </div>
      <div class="field">
        <label>Login Password for DMS Portal</label>
        <input name="password" value="${esc(c ? (db.users.find(u => u.id === c.id)?.password || 'contractor123') : 'contractor123')}" placeholder="Password">
      </div>

      <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">
        <div>
          ${c ? `<button type="button" class="danger" onclick="closeModal();deleteContractor('${c.id}')">🗑 Delete Contractor</button>` : ''}
        </div>
        <div style="display:flex;gap:8px">
          <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
          <button class="primary">${c ? 'Update Contractor' : 'Register Contractor'}</button>
        </div>
      </div>
    </form>
  `);
}

function saveContractorProfile(e, contractorId = null) {
  if (e && e.preventDefault) e.preventDefault();
  let d = {};
  if (typeof FormData !== 'undefined') {
    try {
      d = Object.fromEntries(new FormData(e.target));
    } catch (err) {}
  }
  if (!d.name && e && e.target && e.target.elements) {
    ['id', 'name', 'class', 'rep', 'regNo', 'pan', 'gstin', 'phone', 'email', 'address', 'password'].forEach(k => {
      if (e.target.elements[k]) d[k] = e.target.elements[k].value;
    });
  }
  let cid = contractorId || (d.id ? d.id.trim() : '');

  if (contractorId) {
    let c = db.contractors.find(x => x.id === contractorId);
    if (c) {
      c.name = d.name.trim();
      c.class = d.class;
      c.rep = d.rep ? d.rep.trim() : '';
      c.regNo = d.regNo ? d.regNo.trim() : '';
      c.pan = d.pan ? d.pan.trim() : '';
      c.gstin = d.gstin ? d.gstin.trim() : '';
      c.phone = d.phone ? d.phone.trim() : '';
      c.email = d.email ? d.email.trim() : '';
      c.address = d.address ? d.address.trim() : '';
      
      db.projects.forEach(p => {
        if (p.contractorId === c.id) {
          p.contractorName = c.name;
        }
      });
      if (c.taggedProjects) {
        c.taggedProjects.forEach(tp => {
          let pr = db.projects.find(x => x.id === tp.projectId);
          if (pr) tp.workName = pr.name;
        });
      }

      let u = db.users.find(x => x.id === c.id || x.contractorId === c.id);
      if (u) {
        u.name = c.name;
        if (d.password) u.password = d.password;
        u.designation = `Registered Contractor (${c.class})`;
      }
    }
    showToast(`Contractor "${d.name}" updated successfully.`, 'success');
  } else {
    let newC = {
      id: cid,
      name: d.name.trim(),
      class: d.class,
      rep: d.rep ? d.rep.trim() : '',
      regNo: d.regNo ? d.regNo.trim() : '',
      pan: d.pan ? d.pan.trim() : '',
      gstin: d.gstin ? d.gstin.trim() : '',
      phone: d.phone ? d.phone.trim() : '',
      email: d.email ? d.email.trim() : '',
      address: d.address ? d.address.trim() : '',
      activeProjects: [],
      taggedProjects: []
    };
    db.contractors.push(newC);

    let newU = {
      id: cid,
      name: newC.name,
      password: d.password || 'contractor123',
      role: 'Contractor',
      fullRole: 'CONTRACTOR',
      designation: `Registered Contractor (${newC.class})`,
      office: 'Road Division Hilsa',
      assignedOffices: ['Road Division Hilsa'],
      approved: true,
      contractorId: cid,
      permissions: { view: true, upload: true, edit: false, delete: false }
    };
    db.users.push(newU);
    showToast(`New contractor "${newC.name}" registered successfully.`, 'success');
  }

  save();
  closeModal();
  render();
}

function deleteContractor(contractorId) {
  let c = db.contractors.find(x => x.id === contractorId);
  if (!c) return;

  if (confirm(`Are you sure you want to delete contractor "${c.name}" (${c.id})? Any project assignments will be untagged.`)) {
    db.projects.forEach(p => {
      if (p.contractorId === contractorId) {
        p.contractorId = '';
        p.contractorName = 'Pending Tender Award';
        if (p.access) p.access = p.access.filter(uid => uid !== contractorId);
      }
    });

    db.contractors = db.contractors.filter(x => x.id !== contractorId);
    db.users = db.users.filter(u => u.id !== contractorId && u.contractorId !== contractorId);

    save();
    showToast(`Contractor "${c.name}" deleted successfully.`, 'danger');
    render();
  }
}

function openUserModal(uid) {
  let u = uid ? db.users.find(x => x.id === uid) : null;
  let allOffs = getOffices();
  let assigned = u ? getUserOffices(u) : [allOffs[0]?.name || 'Road Division Hilsa'];

  overlay(`<h3>${u ? 'Edit User Account' : 'Add New User Account'}</h3>
  <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA</p>
  <form onsubmit="saveUser(event, '${u ? u.id : ''}')" style="max-height:74vh;overflow-y:auto;padding-right:8px">
    <div class="field">
      <label>Full Name <span style="color:var(--red)">*</span></label>
      <input name="name" required value="${esc(u ? u.name : '')}" placeholder="e.g. Er. Rajiv Ranjan">
    </div>
    <div class="form-grid-2">
      <div class="field">
        <label>User ID <span style="color:var(--red)">*</span></label>
        <input name="id" required ${u ? 'readonly style="background:#f1f5f9"' : ''} value="${esc(u ? u.id : '')}" placeholder="e.g. JE-HIL-02 / CON-03">
      </div>
      <div class="field">
        <label>Password <span style="color:var(--red)">*</span></label>
        <input name="password" required value="${esc(u ? u.password : 'welcome123')}" placeholder="Password">
      </div>
    </div>
    <div class="form-grid-2">
      <div class="field">
        <label>Role <span style="color:var(--red)">*</span></label>
        <select name="role" required>
          ${['Contractor', 'JE', 'AE', 'EE', 'Accounts Clerk', 'DAO', 'Admin'].map(r => `<option ${u && u.role === r ? 'selected' : ''}>${r}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>Designation</label>
        <input name="designation" value="${esc(u ? u.designation : '')}" placeholder="e.g. Junior Engineer">
      </div>
    </div>
    <div class="field">
      <label>Primary Office <span style="color:var(--red)">*</span></label>
      <select name="office" required>
        ${allOffs.map(o => `<option ${u && u.office === o.name ? 'selected' : ''} value="${esc(o.name)}">${esc(o.name)} (${esc(o.code || o.type)})</option>`).join('')}
      </select>
    </div>

    <div style="margin:14px 0 8px;font-weight:700;color:var(--navy)">Assigned Offices (Multi-Office Charge):</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#f8fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px">
      ${allOffs.map(o => {
        let isChk = assigned.includes(o.name);
        return `<label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12px">
          <input type="checkbox" name="assignedOffices" value="${esc(o.name)}" ${isChk ? 'checked' : ''}>
          <span>${esc(o.name)} <span class="small" style="color:var(--muted)">(${esc(o.type)})</span></span>
        </label>`;
      }).join('')}
    </div>

    ${u && u.role === 'Contractor' ? `
      <div style="margin:14px 0;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <b style="color:#166534;font-size:13px">🏗️ Tagged Projects & Works:</b>
          <button type="button" class="primary small" onclick="closeModal();openTagContractorModal('${u.id}')">🏷️ Manage Tagging</button>
        </div>
        ${(() => {
          let con = db.contractors.find(c => c.id === u.id || c.id === u.contractorId);
          let tags = con ? (con.taggedProjects || []) : [];
          if (!tags.length) return '<div class="small" style="color:var(--muted)">No projects currently tagged.</div>';
          return `<div style="display:grid;gap:6px">
            ${tags.map(tp => `
              <div style="background:#fff;border:1px solid #cbd5e1;padding:8px 10px;border-radius:6px;font-size:12px;display:flex;justify-content:space-between;align-items:center">
                <div>
                  <b>#${tp.projectId} - ${esc(tp.workName)}</b><br>
                  <span class="small" style="color:var(--muted)">${esc(tp.division)} | ${esc(tp.subDivision)} | JE: ${esc(tp.jeName || tp.jeId)} | AE: ${esc(tp.aeName || tp.aeId)}</span>
                </div>
                <button type="button" class="secondary small" onclick="closeModal();openTagContractorModal('${con.id}', ${tp.projectId})">✏ Edit Tag</button>
              </div>
            `).join('')}
          </div>`;
        })()}
      </div>
    ` : ''}

    <div class="field" style="margin-top:12px">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" name="approved" value="1" ${(!u || u.approved) ? 'checked' : ''}>
        <b>Account Approved & Active (सक्रिय)</b>
      </label>
    </div>

    <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">
      <div>
        ${u && u.id !== current.id ? `<button type="button" class="danger" onclick="closeModal();deleteUser('${u.id}')">🗑 Delete User</button>` : ''}
      </div>
      <div style="display:flex;gap:8px">
        <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
        <button class="primary">${u ? 'Update User' : 'Save User'}</button>
      </div>
    </div>
  </form>`);
}

function saveUser(e, uid) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  let checkedOffices = Array.from(e.target.querySelectorAll('input[name="assignedOffices"]:checked')).map(cb => cb.value);
  if (!checkedOffices.length) checkedOffices = [d.office];
  if (!checkedOffices.includes(d.office)) checkedOffices.unshift(d.office);

  let approved = !!d.approved;

  if (uid) {
    let u = db.users.find(x => x.id === uid);
    if (u) {
      u.name = d.name.trim();
      u.password = d.password;
      u.role = d.role;
      u.designation = d.designation ? d.designation.trim() : '';
      u.office = d.office;
      u.assignedOffices = checkedOffices;
      u.approved = approved;
      
      let rUpper = u.role.toUpperCase();
      if (rUpper === 'ADMIN') u.fullRole = 'OFFICE ADMIN';
      else if (rUpper === 'EE') u.fullRole = 'EXECUTIVE ENGINEER (EE)';
      else if (rUpper === 'DAO') u.fullRole = 'DIVISIONAL ACCOUNTS OFFICER (DAO)';
      else if (rUpper.includes('ACCOUNTS') || rUpper.includes('CLERK')) u.fullRole = 'ACCOUNTS CLERK';
      else if (rUpper === 'AE') u.fullRole = 'ASSISTANT ENGINEER (AE)';
      else if (rUpper === 'JE') u.fullRole = 'JUNIOR ENGINEER (JE)';
      else if (rUpper.includes('CONTRACTOR')) u.fullRole = 'CONTRACTOR';

      if (u.id === current.id) {
        current.name = u.name;
        current.role = u.role;
        current.office = u.office;
        current.assignedOffices = u.assignedOffices;
      }
    }
    showToast(`User "${d.name}" updated successfully.`, 'success');
  } else {
    let newU = {
      id: d.id.trim(),
      name: d.name.trim(),
      password: d.password,
      role: d.role,
      designation: d.designation ? d.designation.trim() : '',
      office: d.office,
      assignedOffices: checkedOffices,
      approved: approved,
      permissions: { view: true, upload: true, edit: d.role !== 'Contractor', delete: ['Admin', 'EE'].includes(d.role) }
    };
    let rUpper = newU.role.toUpperCase();
    if (rUpper === 'ADMIN') newU.fullRole = 'OFFICE ADMIN';
    else if (rUpper === 'EE') newU.fullRole = 'EXECUTIVE ENGINEER (EE)';
    else if (rUpper === 'DAO') newU.fullRole = 'DIVISIONAL ACCOUNTS OFFICER (DAO)';
    else if (rUpper.includes('ACCOUNTS') || rUpper.includes('CLERK')) newU.fullRole = 'ACCOUNTS CLERK';
    else if (rUpper === 'AE') newU.fullRole = 'ASSISTANT ENGINEER (AE)';
    else if (rUpper === 'JE') newU.fullRole = 'JUNIOR ENGINEER (JE)';
    else if (rUpper.includes('CONTRACTOR')) newU.fullRole = 'CONTRACTOR';

    db.users.push(newU);
    showToast(`New user "${newU.name}" created successfully.`, 'success');
  }
  save();
  closeModal();
  render();
}

function deleteUser(uid) {
  let u = db.users.find(x => x.id === uid);
  if (!u) return;
  if (current && current.id === uid) {
    alert('You cannot delete your own currently active logged-in user account.');
    return;
  }
  if (confirm(`Are you sure you want to delete user account "${u.name}" (${u.id})?`)) {
    db.users = db.users.filter(x => x.id !== uid);
    save();
    showToast(`User "${u.name}" deleted successfully.`, 'danger');
    render();
  }
}

// --- ROLE MANAGEMENT (ADD, EDIT, DELETE) ---
function roles() {
  if (current.role !== 'Admin' && current.role !== 'EE') return '<div class="empty">Access Restricted to Administrator.</div>';
  let us = db.users;
  let desigs = db.designations || defaultDesignations;

  return `<div class="page-head">
    <div>
      <h3>Role & Permissions Management</h3>
      <p>Configure user roles, multi-office assignments, and departmental designations master</p>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="primary" onclick="openRoleModal()">+ Assign Role to User</button>
      <button class="secondary" onclick="openAddDesignationModal()">+ Add New Role / Designation</button>
    </div>
  </div>

  <section class="panel" style="margin-bottom:24px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div>
        <h4 style="margin:0;color:var(--navy)">1. User Roles & Granular Permissions Matrix</h4>
        <span class="small" style="color:var(--muted)">Click permission pills to toggle powers directly, or click Edit to configure.</span>
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>User / ID</th>
            <th>Assigned Offices</th>
            <th>Role</th>
            <th style="text-align:center">👁️ Viewing</th>
            <th style="text-align:center">📤 Upload</th>
            <th style="text-align:center">✏️ Edit</th>
            <th style="text-align:center">🗑️ Delete</th>
            <th style="text-align:center">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${us.map(u => {
            let p = getUserPerms(u);
            return `<tr>
              <td>
                <b>${esc(u.name)}</b><br>
                <span class="small" style="color:var(--muted)">${esc(u.id)} · ${esc(u.designation || u.role)}</span>
              </td>
              <td>${renderOfficeBadges(u)}</td>
              <td><span class="role-tag" style="background:#eaf2f8;color:var(--navy);font-weight:700;font-size:11px;padding:4px 8px">${esc(u.role)}</span></td>
              <td style="text-align:center"><button class="perm-pill ${p.view ? 'on' : 'off'}" onclick="toggleUserPerm('${u.id}','view')" title="Click to toggle Viewing power">${p.view ? '✓ Allow' : '✗ Deny'}</button></td>
              <td style="text-align:center"><button class="perm-pill ${p.upload ? 'on' : 'off'}" onclick="toggleUserPerm('${u.id}','upload')" title="Click to toggle Upload power">${p.upload ? '✓ Allow' : '✗ Deny'}</button></td>
              <td style="text-align:center"><button class="perm-pill ${p.edit ? 'on' : 'off'}" onclick="toggleUserPerm('${u.id}','edit')" title="Click to toggle Edit power">${p.edit ? '✓ Allow' : '✗ Deny'}</button></td>
              <td style="text-align:center"><button class="perm-pill ${p.delete ? 'on' : 'off'}" onclick="toggleUserPerm('${u.id}','delete')" title="Click to toggle Delete power">${p.delete ? '✓ Allow' : '✗ Deny'}</button></td>
              <td style="text-align:center">
                <div style="display:flex;gap:6px;justify-content:center">
                  <button class="secondary small" onclick="openRoleModal('${u.id}')" title="Configure role and offices">✏ Edit</button>
                  <button class="danger small" onclick="deleteUserRole('${u.id}')" title="Reset role and powers">🗑 Delete / Reset</button>
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </section>

  <section class="panel">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div>
        <h4 style="margin:0;color:var(--navy)">2. Departmental Designations Master</h4>
        <span class="small" style="color:var(--muted)">Manage official designations available across Road Division Hilsa</span>
      </div>
      <button class="primary small" onclick="openAddDesignationModal()">+ Add Designation</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th style="width:60px">#</th>
            <th>Designation / Role Title</th>
            <th>Designation Category</th>
            <th style="text-align:center">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${desigs.map((d, idx) => `<tr>
            <td>${idx + 1}</td>
            <td><b>${esc(d)}</b></td>
            <td><span class="badge-subdiv">${d.includes('Engineer') ? 'Engineering Wing' : d.includes('Accounts') ? 'Accounts Branch' : 'Administrative / Contractor'}</span></td>
            <td style="text-align:center">
              <div style="display:flex;gap:6px;justify-content:center">
                <button class="secondary small" onclick="openEditDesignationModal(${idx})">✏ Edit</button>
                <button class="danger small" onclick="deleteDesignation(${idx})">🗑 Delete</button>
              </div>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>`;
}

function openRoleModal(uid) {
  let u = uid ? db.users.find(x => x.id === uid) : db.users[0];
  if (!u) return;
  let p = getUserPerms(u);
  let allOffs = getOffices();
  let assigned = getUserOffices(u);

  overlay(`<h3>Configure User Role & Multi-Office Charge</h3>
  <p>User: <b>${esc(u.name)}</b> (${esc(u.id)}) · Current Role: <b>${esc(u.role)}</b></p>
  <form onsubmit="saveRolePerms(event, '${u.id}')" style="max-height:74vh;overflow-y:auto;padding-right:8px">
    <div class="form-grid-2">
      <div class="field">
        <label>Assigned Role <span style="color:var(--red)">*</span></label>
        <select name="role" required>
          ${['Contractor', 'JE', 'AE', 'EE', 'Accounts Clerk', 'DAO', 'Admin'].map(r => `<option ${u.role === r ? 'selected' : ''}>${r}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>Primary Office</label>
        <select name="primary_office">
          ${allOffs.map(o => `<option ${u.office === o.name ? 'selected' : ''} value="${esc(o.name)}">${esc(o.name)}</option>`).join('')}
        </select>
      </div>
    </div>

    <div style="margin:14px 0 8px;font-weight:700;color:var(--navy)">Assigned Offices (Multi-Office Access):</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#f8fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px">
      ${allOffs.map(o => `<label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12px">
        <input type="checkbox" name="assigned_offices" value="${esc(o.name)}" ${assigned.includes(o.name) ? 'checked' : ''}>
        <span>${esc(o.name)}</span>
      </label>`).join('')}
    </div>

    <div style="margin:16px 0 8px;font-weight:700;color:var(--navy)">Granular Powers (अधिकार):</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;background:#f8fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" name="perm_view" ${p.view ? 'checked' : ''}>
        <b>👁️ Viewing Power</b>
      </label>
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" name="perm_upload" ${p.upload ? 'checked' : ''}>
        <b>📤 Upload Power</b>
      </label>
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" name="perm_edit" ${p.edit ? 'checked' : ''}>
        <b>✏️ Edit Power</b>
      </label>
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" name="perm_delete" ${p.delete ? 'checked' : ''}>
        <b>🗑️ Delete Power</b>
      </label>
    </div>

    <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">
      <div>
        <button type="button" class="danger" onclick="closeModal();deleteUserRole('${u.id}')">🗑 Reset / Clear Role</button>
      </div>
      <div style="display:flex;gap:8px">
        <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
        <button class="primary">Save Role & Powers</button>
      </div>
    </div>
  </form>`);
}

function saveRolePerms(e, uid) {
  e.preventDefault();
  let u = db.users.find(x => x.id === uid);
  if (!u) return;
  let d = Object.fromEntries(new FormData(e.target));
  let checkedOffices = Array.from(e.target.querySelectorAll('input[name="assigned_offices"]:checked')).map(cb => cb.value);
  if (!checkedOffices.length) checkedOffices = [d.primary_office || u.office];
  if (!checkedOffices.includes(d.primary_office)) checkedOffices.unshift(d.primary_office);

  u.role = d.role;
  u.office = d.primary_office || u.office;
  u.assignedOffices = checkedOffices;
  u.permissions = {
    view: !!d.perm_view,
    upload: !!d.perm_upload,
    edit: !!d.perm_edit,
    delete: !!d.perm_delete
  };

  let rUpper = u.role.toUpperCase();
  if (rUpper === 'ADMIN') u.fullRole = 'OFFICE ADMIN';
  else if (rUpper === 'EE') u.fullRole = 'EXECUTIVE ENGINEER (EE)';
  else if (rUpper === 'DAO') u.fullRole = 'DIVISIONAL ACCOUNTS OFFICER (DAO)';
  else if (rUpper.includes('ACCOUNTS') || rUpper.includes('CLERK')) u.fullRole = 'ACCOUNTS CLERK';
  else if (rUpper === 'AE') u.fullRole = 'ASSISTANT ENGINEER (AE)';
  else if (rUpper === 'JE') u.fullRole = 'JUNIOR ENGINEER (JE)';
  else if (rUpper.includes('CONTRACTOR')) u.fullRole = 'CONTRACTOR';

  if (u.id === current.id) {
    current.role = u.role;
    current.office = u.office;
    current.assignedOffices = u.assignedOffices;
    current.permissions = u.permissions;
  }
  save();
  closeModal();
  showToast(`Role and powers updated for "${u.name}".`, 'success');
  render();
}

function deleteUserRole(uid) {
  let u = db.users.find(x => x.id === uid);
  if (!u) return;
  if (confirm(`Reset role and permissions for user "${u.name}" (${u.id}) to default?`)) {
    u.role = 'Contractor';
    u.fullRole = 'CONTRACTOR';
    u.assignedOffices = [u.office];
    u.permissions = { view: true, upload: true, edit: false, delete: false };
    save();
    showToast(`Role reset to default for "${u.name}".`, 'danger');
    render();
  }
}

function toggleUserPerm(uid, permKey) {
  let u = db.users.find(x => x.id === uid);
  if (!u) return;
  if (!u.permissions) u.permissions = getUserPerms(u);
  u.permissions[permKey] = !u.permissions[permKey];
  if (u.id === current.id) current.permissions = u.permissions;
  save();
  render();
}

function openAddDesignationModal() {
  overlay(`<h3>Add New Departmental Designation / Role</h3>
  <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA</p>
  <form onsubmit="saveDesignation(event, -1)">
    <div class="field">
      <label>Designation Title <span style="color:var(--red)">*</span></label>
      <input name="title" required placeholder="e.g. Quality Control Engineer / Surveyor">
    </div>
    <div class="modal-actions">
      <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
      <button class="primary">+ Add Designation</button>
    </div>
  </form>`);
}

function openEditDesignationModal(idx) {
  let desigs = db.designations || defaultDesignations;
  let cur = desigs[idx] || '';
  overlay(`<h3>Edit Departmental Designation / Role</h3>
  <p>OFFICE OF THE EXECUTIVE ENGINEER, RCD, ROAD DIVISION, HILSA</p>
  <form onsubmit="saveDesignation(event, ${idx})">
    <div class="field">
      <label>Designation Title <span style="color:var(--red)">*</span></label>
      <input name="title" required value="${esc(cur)}">
    </div>
    <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <button type="button" class="danger" onclick="closeModal();deleteDesignation(${idx})">🗑 Delete Designation</button>
      </div>
      <div style="display:flex;gap:8px">
        <button type="button" class="secondary" onclick="closeModal()">Cancel</button>
        <button class="primary">Update Designation</button>
      </div>
    </div>
  </form>`);
}

function saveDesignation(e, idx) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  let title = d.title.trim();
  if (!title) return;
  if (!db.designations) db.designations = JSON.parse(JSON.stringify(defaultDesignations));

  if (idx >= 0 && idx < db.designations.length) {
    db.designations[idx] = title;
    showToast(`Designation updated to "${title}".`, 'success');
  } else {
    db.designations.push(title);
    showToast(`New designation "${title}" added.`, 'success');
  }
  save();
  closeModal();
  render();
}

function deleteDesignation(idx) {
  if (!db.designations) db.designations = JSON.parse(JSON.stringify(defaultDesignations));
  let cur = db.designations[idx];
  if (confirm(`Are you sure you want to delete designation "${cur}"?`)) {
    db.designations.splice(idx, 1);
    save();
    showToast(`Designation "${cur}" deleted.`, 'danger');
    render();
  }
}

function letters() {
  return `<div class="page-head">
    <div><h3>Letter Register</h3><p>Inward, outward and correspondence management</p></div>
    <button class="primary" onclick="openLetterModal()">+ Register Letter</button>
  </div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Type</th><th>Letter No.</th><th>Date</th><th>Subject</th><th>Office</th></tr></thead>
      <tbody>${db.letters.map(l => `<tr>
        <td><b>${esc(l.type)}</b></td>
        <td><b>${esc(l.number)}</b></td>
        <td>${esc(l.date)}</td>
        <td>${esc(l.subject)}</td>
        <td>${esc(l.office)}</td>
      </tr>`).join('')}</tbody>
    </table>
  </div>`;
}

function openLetterModal() {
  overlay(`<h3>Register Letter</h3>
  <form onsubmit="saveLetter(event)">
    <div class="form-grid-2">
      <div class="field"><label>Type</label><select name="type"><option>Outward</option><option>Inward</option></select></div>
      <div class="field"><label>Letter Number</label><input name="number" required placeholder="RDH/2026/..."></div>
    </div>
    <div class="field"><label>Subject</label><input name="subject" required></div>
    <div class="modal-actions"><button type="button" class="secondary" onclick="closeModal()">Cancel</button><button class="primary">Save Letter</button></div>
  </form>`);
}

function saveLetter(e) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  d.id = Date.now();
  d.date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  d.office = current.office;
  db.letters.unshift(d);
  save();
  closeModal();
  render();
}

function openFolderModal(pid) {
  overlay(`<h3>Add Sub-Folder</h3>
  <form onsubmit="saveFolder(event, ${pid})">
    <div class="field"><label>Folder Name</label><input name="name" required placeholder="e.g. Test Reports / Quality Certificates"></div>
    <div class="modal-actions"><button type="button" class="secondary" onclick="closeModal()">Cancel</button><button class="primary">Create Folder</button></div>
  </form>`);
}

function saveFolder(e, pid) {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(e.target));
  let p = db.projects.find(x => x.id === pid);
  if (p) {
    if (!p.folders) p.folders = [];
    p.folders.push({ id: Date.now(), name: d.name.trim(), files: [] });
    save();
    closeModal();
    render();
  }
}

function deleteFolder(pid, fid) {
  if (confirm('Delete this sub-folder?')) {
    let p = db.projects.find(x => x.id === pid);
    if (p && p.folders) {
      p.folders = p.folders.filter(f => f.id !== fid);
      save();
      render();
    }
  }
}

// Modal Container & Toasts
function overlay(content, wide = false) {
  modal = `<div class="modal-wrap" onclick="if(event.target===this)closeModal()">
    <div class="modal ${wide ? 'modal-wide' : ''}">
      <button type="button" class="modal-close-btn" onclick="closeModal()" title="Close dialog">✕</button>
      ${content}
    </div>
  </div>`;
  render();
}

function closeModal() {
  modal = null;
  render();
}

function showToast(msg, type = 'success') {
  let c = document.querySelector('#toast-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toast-container';
    document.body.appendChild(c);
  }
  let t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.innerHTML = `<span class="toast-icon">${type === 'danger' ? '⚠️' : '✓'}</span><span>${esc(msg)}</span>`;
  c.appendChild(t);
  setTimeout(() => {
    if (t.classList && t.classList.add) t.classList.add('toast-fadeout');
    setTimeout(() => {
      if (typeof t.remove === 'function') t.remove();
      else if (t.parentNode && t.parentNode.removeChild) t.parentNode.removeChild(t);
    }, 300);
  }, 3200);
}

// 8. PRIMARY APP SHELL RENDERER
function render() {
  if (!current) return login();
  let appEl = document.querySelector('#app');
  if (!appEl) return;

  appEl.innerHTML = `<div class="shell">
    <aside class="sidebar">
      <div class="identity">
        <strong>RCD Road Division Hilsa</strong>
        <span>${esc(current.office)}</span>
        <em class="role-tag" style="background:#2563eb;color:#fff;font-weight:700">${esc(current.role)}</em>
      </div>
      <nav class="menu">
        ${nav()}
        <button class="logout" onclick="logout()">↪ Logout</button>
      </nav>
    </aside>
    <section class="content">
      <header class="topbar">
        <div>
          <h2>${title()}</h2>
          <div class="crumb">Office of Executive Engineer, RCD Road Division, Hilsa / ${esc(current.office)}</div>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          ${renderRoleSwitcher()}
          <div class="user-chip" onclick="go('notifications')" style="cursor:pointer" title="Logged in user">
            <div class="avatar">${current.name[0]}</div>
            <span>${esc(current.name)} (<b>${esc(current.role)}</b>)</span>
          </div>
        </div>
      </header>
      <main class="page">
        ${page()}
      </main>
    </section>
  </div>${modal || ''}`;

  bindPicker();
}

if (typeof window !== 'undefined') {
  window.render = render;
  window.go = go;
  window.login = login;
  window.logout = logout;
  window.closeModal = closeModal;
  window.officeManagement = officeManagement;
  window.openOfficeModal = openOfficeModal;
  window.saveOffice = saveOffice;
  window.deleteOffice = deleteOffice;
  window.users = users;
  window.openUserModal = openUserModal;
  window.saveUser = saveUser;
  window.deleteUser = deleteUser;
  window.roles = roles;
  window.openRoleModal = openRoleModal;
  window.saveRolePerms = saveRolePerms;
  window.deleteUserRole = deleteUserRole;
  window.toggleUserPerm = toggleUserPerm;
  window.openAddDesignationModal = openAddDesignationModal;
  window.openEditDesignationModal = openEditDesignationModal;
  window.deleteDesignation = deleteDesignation;
  window.switchUserAdminTab = switchUserAdminTab;
  window.renderContractorTaggingSection = renderContractorTaggingSection;
  window.openTagContractorModal = openTagContractorModal;
  window.onTagProjectSelectionChange = onTagProjectSelectionChange;
  window.saveContractorProjectTag = saveContractorProjectTag;
  window.untagContractorProject = untagContractorProject;
  window.openContractorProfileModal = openContractorProfileModal;
  window.saveContractorProfile = saveContractorProfile;
  window.deleteContractor = deleteContractor;
}

if (typeof globalThis !== 'undefined') {
  globalThis.officeManagement = officeManagement;
  globalThis.openOfficeModal = openOfficeModal;
  globalThis.saveOffice = saveOffice;
  globalThis.deleteOffice = deleteOffice;
  globalThis.users = users;
  globalThis.openUserModal = openUserModal;
  globalThis.saveUser = saveUser;
  globalThis.deleteUser = deleteUser;
  globalThis.roles = roles;
  globalThis.openRoleModal = openRoleModal;
  globalThis.saveRolePerms = saveRolePerms;
  globalThis.deleteUserRole = deleteUserRole;
  globalThis.toggleUserPerm = toggleUserPerm;
  globalThis.openAddDesignationModal = openAddDesignationModal;
  globalThis.openEditDesignationModal = openEditDesignationModal;
  globalThis.saveDesignation = saveDesignation;
  globalThis.deleteDesignation = deleteDesignation;
  globalThis.switchUserAdminTab = switchUserAdminTab;
  globalThis.renderContractorTaggingSection = renderContractorTaggingSection;
  globalThis.openTagContractorModal = openTagContractorModal;
  globalThis.onTagProjectSelectionChange = onTagProjectSelectionChange;
  globalThis.saveContractorProjectTag = saveContractorProjectTag;
  globalThis.untagContractorProject = untagContractorProject;
  globalThis.openContractorProfileModal = openContractorProfileModal;
  globalThis.saveContractorProfile = saveContractorProfile;
  globalThis.deleteContractor = deleteContractor;
}

// Boot application
if (typeof document !== 'undefined' && document.querySelector('#app')) {
  render();
}

// Export for VM unit testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WorkflowEngine,
    defaultUsers,
    defaultProjects,
    defaultBills,
    defaultPayments,
    db
  };
}


