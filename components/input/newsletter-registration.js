import { useRef, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailRef = useRef();

  const notificationCtx = useContext(NotificationContext);

  const { showNotification } = notificationCtx;

  function registrationHandler(e) {
    e.preventDefault();
    const emailValue = emailRef.current.value;

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: emailValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok)
          res.json().then((data) => {
            throw new Error(data.message);
          });
        return res.json();
      })
      .then((data) => {
        showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
          status: 'success',
        });
      })
      .catch((err) => {
        showNotification({
          title: 'Error!',
          message: err.message || 'Somethong went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
