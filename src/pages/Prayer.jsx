import FormPage from '../components/FormPage.jsx'
import { forms } from '../data/churchData.js'

export default function Prayer() {
  return (
    <FormPage
      eyebrow="We stand with you"
      title="Prayer"
      intro="Share your prayer request and our prayer team will pray with you."
      url={forms.prayer}
      image="/images/prayer.jpg"
      note="Your request is read only by the Vicar and the prayer team. You can leave your name blank if you prefer to stay anonymous."
    />
  )
}