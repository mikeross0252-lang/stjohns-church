import { useSearchParams } from 'react-router-dom'
import FormPage from '../components/FormPage.jsx'
import { departments, joinForm, joinLink } from '../data/churchData.js'

export default function Join() {
  const [params] = useSearchParams()
  const dept = departments.find((d) => d.slug === params.get('dept'))

  const generalUrl = joinForm.url.startsWith('PASTE') ? null : joinForm.url
  const url = dept ? joinLink(dept) : generalUrl

  return (
    <FormPage
      eyebrow="Join us"
      title={dept ? `Join ${dept.name}` : 'Join a department'}
      intro={
        dept
          ? `Fill in this short form and the church office will connect you with the ${dept.name} leader.`
          : 'Choose a department and fill in this short form. The church office will connect you with its leader.'
      }
      url={url}
      note="Only the Vicar and the church office will see your details. We will only contact you with your permission."
    />
  )
}