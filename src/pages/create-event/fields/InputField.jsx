import styles from "./InputField.module.css";
import { useState, useRef, useEffect } from "react";

const InputField = (props) => {
  const [inputCount, setInputCount] = useState(0);
  const [rerender, setRerender] = useState(0);
  const TitleInputRef = useRef();
  const TitleInputWarningRef = useRef();

  let EventTitleClicked = 0;

  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        if (e.target.className == styles["input-field"]) {
          EventTitleClicked = 1;
        }
        if (TitleInputRef.current == null) return;
        if (
          e.target.className != styles["input-field"] &&
          TitleInputRef.current.value.length == 0 &&
          EventTitleClicked == 1
        ) {
          TitleInputRef.current.className = `${styles["input-field"]} ${styles["input-field-error"]}`
        } else if (
          e.target.className != styles["input-field"] &&
          TitleInputRef.current.value.length != 0 &&
          EventTitleClicked == 1
        ) {
          TitleInputRef.current.className = styles["input-field"];
        }
      },
      true
    );
  }, []);

  const inputHandler = (e) => {
    setInputCount(e.target.value.length);
    props.onChange(e);
  };

  return (
    <div className={styles["input-field-frame"]}>
      <p className={styles["input-field-title"]}>
        {props.title} {props.required && "*"}
      </p>
      <input
        className={styles["input-field"]}
        id={"input-field-" + props.title}
        maxLength={props.maxLength || 500}
        onChange={inputHandler}
        ref={TitleInputRef}
        value={props.value}
        disabled={props.disable}
        type={props.type || "text"}
        name={props.name}
      ></input>
      <span className={styles["input-field-monitor"]}>
        <div className={styles["input-field-warning"]} ref={TitleInputWarningRef}>
          {" "}
        </div>
        {props.maxLength ? <div>{inputCount}/{props.maxLength}</div> : null}
      </span>
    </div>
  );
};

export default InputField;
