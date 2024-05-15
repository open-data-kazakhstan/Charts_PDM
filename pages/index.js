import Link from "next/link";
import styles from "../styles/home.module.css";

const Home = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <h1>Welcome to Data Insights</h1>
      <p>Explore our comprehensive data visualizations and gain valuable insights</p>
    </header>
    <main className={styles.main}>
      <div className={styles.buttonContainer}>
        <div className={styles.card}>
          <Link href="/grafics" passHref>
            <button className={styles.button}>View All Grafics</button>
          </Link>
          <p className={styles.description}>Explore various data visualizations and statistics.</p>
        </div>
        <div className={styles.card}>
          <a href="https://pdm.kz" target="_blank" rel="noopener noreferrer">
            <button className={styles.button}>PDM Website</button>
          </a>
          <p className={styles.description}>Visit the official PDM website for more information.</p>
        </div>
      </div>
    </main>
  </div>
);

export default Home;
