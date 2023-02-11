import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <section>
      <h1>Contact Me:</h1>
      <hr />
      <p>
        <a href='mailto: danielduvall22@gmail.com'>
          <b>Email:</b>{' '}
        </a>
        danielduvall22@gmail.com
        <br />
        <a href='tel:814-494-0811'>
          <b>Phone:</b>{' '}
        </a>
        (+1) 814-494-0811
      </p>
      <ContactForm />
    </section>
  );
}
