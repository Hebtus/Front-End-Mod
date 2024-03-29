import styles from "./CancelSessionPage.module.css"

export function CancelSessionPage({ setModal, setShowCloseMessage, setCheckout }) {

  return (

    <div className={styles["page"]} id="page">
      <p className={styles["page--title"]} id="page--title">Leave Checkout?</p>
      <div className={styles["page--content-container"]} id="page--content-container">
        <p className={styles["page--content"]} id="page--content">Are you sure you want to leave checkout? The items you've selected may not be available later.</p>
        <div className={styles["page--buttons-containers"]} id="page--buttons-containers">
          <button className={styles["button-stay"]} onClick={() => setShowCloseMessage(false)} id="button-stay">Stay</button>
          <button className={styles["button-leave"]} onClick={() => { setModal(false); setCheckout(false); }} id="button-leave">Leave</button>
        </div>
      </div>
    </div>

  )
}