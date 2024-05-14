import React from "react";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

const DropdownMenu = () => {
    return (
        <div className={styles.dropdownContent}>
            <Link href="/grafics/kz_population" passHref className={styles.dropdownLink}>KZ Population</Link>

        </div>
    );
};

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <img src="/logo.png" alt="Logo" className={styles.logoImage} />
            </div>
            <div className={styles.links}>
                <Link href="/" passHref className={styles.link}>Home</Link>
                <div className={styles.dropdown}>
                    <Link href="/grafics/" passHref className={styles.link}>Grafics</Link>
                    <DropdownMenu />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
