import ContactForm from '../../../components/ContactForm';

export default function Contact() {
  return (
    <section>
      <h1>Contact Me:</h1>
      <hr />
      <p>
        <b>
          <a href='mailto: danielduvall22@gmail.com'>Email:</a>
        </b>{' '}
        danielduvall22@gmail.com
        <br />
        <b>
          <a href='tel:814-494-0811'>Phone:</a>
        </b>{' '}
        (+1) 814-494-0811
      </p>

      <ContactForm />
    </section>
  );
}
