import Link from "next/link";


const Grafics = () => (
  <div>
    <h1 style={{ color: "#181E35" }}>Вы можете ознакомиться со следующими графиками:</h1>
    <div className="buttonContainer">
      <Link href="/grafics/kz_population" passHref>
        <button className="button">KZ Population</button>
      </Link>
    </div>
  </div>
);

export default Grafics;
