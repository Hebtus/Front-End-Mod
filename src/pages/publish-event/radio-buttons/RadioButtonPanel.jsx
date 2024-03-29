import styles from "./radio-button-panel.module.css";

const RadioButtonPanel = (props) => {
  return (
    <div>
      {props.inputArray.map((input) => {
        return (
        <div className={styles["wrapper"]}>
          <input
            id = {input.title}
            className={styles["event-privacy-radiobutton"]}
            type="radio"
            name={input.name}
            onChange={props.onChange}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles["radio-button-title"]}>{input.title}</span>
            <span className={styles["radio-button-description"]}>
              {input.description}
            </span>
          </div>
        </div>
      )})}
    </div>
  );
};

export default RadioButtonPanel;
