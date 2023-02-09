import ContactForm from '../../../components/ContactForm';

export default function Contact() {
  return (
    <section>
      <h1>Contact Me:</h1>
      <hr />
      <p>
        <b>Email:</b>{' '}
        <a href='mailto: danielduvall22@gmail.com'>danielduvall22@gmail.com</a>
        <br />
        <b>Phone:</b> <a href='tel:814-494-0811'>(+1) 814-494-0811</a>
      </p>
      <ContactForm />
    </section>
  );
}
