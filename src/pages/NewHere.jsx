import FormPage from '../components/FormPage.jsx'
import { forms } from '../data/churchData.js'

export default function NewHere() {
  return (
    <FormPage
      eyebrow="Welcome"
      title="New here?"
      intro="We are so glad you came. Tell us a little about yourself so we can welcome you and answer any questions."
      url={forms.newHere}
      image="/images/new-here.jpg"
      note="Only the Vicar and the church office will see your details. We will only contact you with your permission."
    />
  )
}