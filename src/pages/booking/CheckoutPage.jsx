import React, { useEffect, useRef, useContext } from "react";
import styles from "./CheckoutPage.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OrderSummary from "./OrderSummary";
import { CheckoutForm } from "./CheckoutForm";
import axios from "axios";
import { AppContext } from "./GetTickets"

export function CheckoutPage({ event, ticketsType, setCheckout, setModal }) {

  const formikRef = useRef();
  const { selectedTickets } = useContext(AppContext);

  const handleSubmit = async () => {
    if (formikRef.current) {
      const values = formikRef.current.values;
      const formikHelpers = formikRef.current.formik;
      console.log(values);
      console.log(values);

      const newBooking = selectedTickets.map((ticket) => {
        return {
          ticketId: ticket._id,
          quantity: ticket.sales,
          price: ticket.price,
        };
      })
      const bookingPost = {
        "eventId": event._id,
        "guestEmail": values.email,
        "phone": values.phone,
        "gender": values.gender,
        "name": {
          "firstName": values.firstName,
          "lastName": values.lastName,
        },
        bookings: newBooking,
      }
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/bookings", bookingPost);
      if (!response || response.status === "fail") {
        console.log("fetch failed for get events");
      } else {
        console.log(response.data)
      }

      formikHelpers.resetForm();
    }
  }


  // const schema = yup.object().shape({
  //   name: yup.object({
  //     firstName: yup.string().required("First name is requried"),
  //     lastName: yup.string().required("Last name is requried"),
  //   }),
  //   email: yup.string().email().required("Email is required"),
  //   confirmEmail: yup.string().oneOf([yup.ref("email"), null], "Emails don't match").required(),
  //   phone: yup.number().min(10).max(11).required("Phone is required"),
  //   gender: yup.boolean().required().oneOf([0, 1], 'Select a gender'),
  // });

  // const { register, handleSubmit, formState: { errors } } = useForm({
  //   resolver: yupResolver(schema),
  // });


  useEffect(() => {
    //remove NEXT LINE when you integrate 

  }, [])

  return (
    <>

      <div className={styles["booking"]}>
        <div className={styles["booking--content"]}>

          <div className={styles["content--header"]}>
            <div className={styles["header--back-title-container"]}>
              <div className="back-btn-container">
                <button className={styles["header--back-btn"]} onClick={() => { }}>
                  <ArrowBackIcon />
                </button>
              </div>
              <h2 className={styles["header--event-title"]}>Checkout</h2>
            </div>
            <div className={styles["header--timer-container"]}>

            </div>
          </div>

          <div className={styles["content--body"]}>
            <div className={styles["body--tickets"]}>
              <h3 className={styles["tickets--title"]}>Billing information</h3>
              <CheckoutForm formikRef={formikRef} />

              <div className={styles["tickets--footer"]}>
                <span className={styles["footer--powered-by"]}>Powered by </span>
                <span className={styles["footer--hebtus"]}>hebtus</span>
              </div>
            </div>

          </div>

          <div className={styles["content--footer"]}>
            <div className={styles["footer--error-container"]}>

            </div>
            <div className={styles["chekout-btn-container"]}>
              <button className={styles["Register-btn"]} onClick={() => { handleSubmit(); }}>Register</button>
            </div>
          </div>

        </div>

        <div className={styles["booking--side"]}>
          <div className={styles["side--event-image-container"]}>
            <img src={event.img_url} alt="eventImage" className={styles["event-image"]} />
          </div>

          <div className={styles["side--order-summary"]}>
            <OrderSummary ticketsType={ticketsType} />
          </div>

        </div>

      </div>
    </>
  )
}