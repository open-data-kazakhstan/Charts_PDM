import Link from "next/link";
import styles from "../../styles/grafics.module.css";

const Grafics = () => (
  <div className={styles.container}>
    <h1 className={styles.header}>Вы можете ознакомиться со следующими графиками:</h1>
    <div className={styles.buttonContainer}>
      <Link href="/grafics/kz_population" passHref>
        <button className={styles.button}>KZ Population</button>
      </Link>
      <p className={styles.description}>График, показывающий население Казахстана по регионам.</p>
    </div>
  </div>
);

export default Grafics;
