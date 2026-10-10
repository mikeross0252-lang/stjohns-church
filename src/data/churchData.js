export const church = {
  name: "St John's Military Protestant Church",
  shortName: "St John's",
  tagline: 'In This Sign Conquer',
  location: 'Kawo, Kaduna',
  address: '41 Engineers Brigade, Dalet Cantonment, Kawo, Kaduna',
  email: 'stjohnsmilprotestantdaletcant@gmail.com',
  phone: 'ADD_CHURCH_PHONE',
  mapEmbedUrl: '',
  coordinates: '10.586399780496683, 7.455893499333141',
  builder: {
    name: 'Naphtali Luwum Babangida',
    url: 'https://portfolio-ip4m.vercel.app',
  },
}

export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Departments', to: '/departments' },
  { label: 'Events', to: '/events' },
  { label: 'Watch', to: '/watch' },
  { label: 'Talks', to: '/talks' },
]

export const moreNav = [
  { label: 'Prayer', to: '/prayer' },
  { label: 'Services', to: '/services' },
  { label: 'Bulletin', to: '/bulletin' },
  { label: 'Giving', to: '/giving' },
  { label: 'Contact', to: '/contact' },
]

// One Google Form for joining any department.
// Not built yet. While url starts with PASTE, the Join buttons stay inactive.
// Later: url = the form's /viewform link, departmentField = 'entry.123456789'
export const joinForm = {
  url: 'PASTE_JOIN_FORM_LINK',
  departmentField: '',
}

export const joinLink = (dept) => {
  if (!joinForm.url || joinForm.url.startsWith('PASTE')) return null
  if (!joinForm.departmentField) return joinForm.url
  const sep = joinForm.url.includes('?') ? '&' : '?'
  return `${joinForm.url}${sep}usp=pp_url&${joinForm.departmentField}=${encodeURIComponent(dept.name)}`
}

// Fill these in for each department as the information arrives.
// groupPhoto example: '/images/departments/choir.jpg'
// leader.photo example: '/images/leaders/choir-leader.jpg'
// whatsapp: digits only with country code, e.g. '2349012345678'
const blank = (slug, name, summary) => ({
  slug,
  name,
  summary,
  about: 'A short description of this department will be added here.',
  groupPhoto: '',
  leader: { name: 'To be added', title: 'Leader', photo: '' },
  meets: [{ day: 'To be added', time: '', place: '' }],
  socials: { whatsapp: '', facebook: '', instagram: '', x: '', email: '' },
})

export const departments = [
  // Chaplaincy does not hold meetings, so its meets list is empty
  { ...blank('chaplaincy', 'Chaplaincy', 'Pastoral care and spiritual direction.'), meets: [] },
  {
    ...blank('choir', 'Choir', 'Leading the congregation in worship through song.'),
    meets: [{ day: 'Thursday & Saturday', time: '5:00 PM', place: '' }],
  },
  {
    ...blank('band', 'Band', 'Instrumental music for worship.'),
    meets: [{ day: 'Tuesday, Thursday & Saturday', time: '4:00 PM', place: '' }],
  },
  blank('ushers', 'Ushers', 'Welcoming and guiding members and visitors.'),
  {
    ...blank('new-life-for-all', 'New Life for All', 'A fellowship group of the church.'),
    meets: [{ day: 'Tuesday & Saturday', time: '5:00 PM', place: '' }],
  },
  {
    ...blank('christian-women-fellowship', 'Christian Women Fellowship', 'Fellowship and support for women of the church.'),
    meets: [{ day: 'Saturday', time: '8:00 AM', place: '' }],
  },
  blank('media-group', 'Media Group', 'Sound, recording and church communications.'),
  {
    ...blank('youth', 'Youth', 'Fellowship and growth for the young people of the church.'),
    meets: [{ day: 'Sunday', time: '3:00 PM', place: '' }],
  },
  blank('mens-fellowship', "Men's Fellowship", 'Fellowship and support for the men of the church.'),
]

export const social = {
  youtube: 'https://www.youtube.com/@stjohnsmpc_dalet_kaduna',
  facebook: '',
  instagram: 'https://www.instagram.com/stjohnsmcpdalet',
  tiktok: 'https://www.tiktok.com/@stjohnsmpc_dalet_kaduna',
  x: 'https://x.com/stjohnsmpcdalet',
  whatsapp: '',
  email: 'stjohnsmilprotestantdaletcant@gmail.com',
}

// Newest first.
export const vicars = [
  { name: 'Capt-Rev JN Jacob', from: '2025', to: 'Present', photo: '/images/vicars/jn-jacob.jpg' },
  { name: 'Capt-Rev JA Milila', from: '2022', to: '2025', photo: '' },
  { name: "Capt-Rev JM Dan'Amariya", from: '2022', to: '2022', photo: '' },
  { name: 'Capt-Rev J Bayei', from: '2019', to: '2022', photo: '' },
  { name: 'Lt-Rev AO Idasho', from: '2016', to: '2019', photo: '' },
  { name: 'Lt-Rev AD Owa', from: '2015', to: '2016', photo: '' },
  { name: 'Lt-Rev AO Idasho', from: '2014', to: '2015', photo: '' },
  { name: 'Wo-Rev Adu R', from: '2013', to: '2014', photo: '' },
  { name: 'Sgt-Rev Elijah A', from: '2013', to: '2013', photo: '' },
  { name: 'Sgt-Rev N Saba', from: '2012', to: '2013', photo: '' },
  { name: 'Sgt-Rev J Kenan', from: '2012', to: '2012', photo: '' },
  { name: 'Wo-Rev D Aweh', from: '2008', to: '2012', photo: '' },
  { name: 'Wo-Rev J Waziri', from: '2007', to: '2008', photo: '' },
  { name: 'Wo-Rev Nimram', from: '2005', to: '2007', photo: '' },
  { name: 'Wo-Rev D Nanzin', from: '2003', to: '2005', photo: '' },
  { name: 'Sgt-Rev Dan Auta', from: '2001', to: '2003', photo: '' },
  { name: 'Sgt-Rev Kaburuk DM', from: '1993', to: '2001', photo: '' },
]

// Live streams and videos. platform: youtube, facebook, tiktok, instagram or x
// Example:
// { id: 'w1', title: 'Sunday Service', platform: 'youtube', url: 'https://www.youtube.com/watch?v=VIDEO_ID', thumbnail: '', date: '2026-10-11', live: false }
export const watch = []

// Edit these categories after talking to the Vicar.
export const talkCategories = [
  { slug: 'marriage', name: 'Marriage', description: 'Talks on building a godly marriage.' },
  { slug: 'faith', name: 'Faith', description: 'Talks on growing in faith.' },
]

// Example:
// { id: 't1', category: 'marriage', title: 'Talk title', speaker: 'Name', date: '2026-10-11', audio: 'https://...', video: '', videoPlatform: 'youtube' }
export const talks = []

// Church programs and service times.
export const services = [
  { name: 'Adult Sunday School', day: 'Sunday', time: '8:00 AM' },
  { name: 'Sunday Service', day: 'Sunday', time: '9:00 AM' },
  { name: 'Youth', day: 'Sunday', time: '3:00 PM' },
  { name: 'BB/GB', day: 'Monday & Thursday', time: '4:00 PM' },
  { name: 'NLFA', day: 'Tuesday & Saturday', time: '5:00 PM' },
  { name: 'Mid-week Service', day: 'Wednesday', time: '5:00 PM' },
  { name: 'Choir', day: 'Thursday & Saturday', time: '5:00 PM' },
  { name: 'Bible Studies', day: 'Friday', time: '4:30 PM' },
  { name: 'CWF Meeting', day: 'Saturday', time: '8:00 AM' },
]

// Date format is year-month-day. Example:
// { title: 'Harvest Thanksgiving', date: '2026-10-25', time: '9:00 AM', place: 'Church auditorium', description: '' }
export const events = []

// Draft text. The Vicar must approve it before launch.
export const welcome = {
  title: 'You are welcome here',
  text: 'Whether this is your first visit or you have been with us for years, we are glad you are here. Come as you are, worship with us, and find a place in our church family.',
}

// Fill these in when the church gives you the text. Empty ones stay hidden.
// history: a list of paragraphs. beliefs: a list of short statements.
export const about = {
  history: [],
  vision: '',
  mission: '',
  beliefs: [],
}

// Google Form links (the links ending in /viewform)
export const forms = {
  newHere: 'https://docs.google.com/forms/d/e/1FAIpQLSc3DK2gzwk8ItwdUbjj2TZjMjwVndTcKyt3DCw-Fe8E7oEWKg/viewform',
  prayer: 'https://docs.google.com/forms/d/e/1FAIpQLSfhiqKcz6ZgYfq6qR_4ehNEXhjrjEq_O3K8VOLnnXbzCKQNQg/viewform',
}

// Add the newest bulletin first. url can be a Google Drive share link,
// or a small PDF saved in public/bulletins/, written like '/bulletins/2026-10-11.pdf'
// Example: { title: 'Sunday 11 October 2026', date: '2026-10-11', url: 'https://...', note: '' }
export const bulletins = []

// Add ONLY accounts that the Vicar or the church treasurer has approved.
// To hide the account until it is approved, change accounts to: []
export const giving = {
  intro:
    'Thank you for supporting the work of the church. You can give by bank transfer to the account below.',
  accounts: [
    {
      purpose: 'General giving',
      bank: 'First Bank Nigeria',
      accountName: 'ST JOHN MILITARY CHURCH',
      accountNumber: '2003716706',
    },
  ],
  note: '',
}