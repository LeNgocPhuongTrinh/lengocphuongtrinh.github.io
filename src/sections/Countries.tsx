import { countries } from '../data/countries';
import styles from '../styles/Portfolio.module.css';

export function Countries() {
  return (
    <section id="countries" className={`${styles.section} ${styles.countries}`} aria-labelledby="countries-title">
      <div className={styles.sectionLabel}>
        <h2 id="countries-title" className={styles.countriesTitle}>Countries along the way</h2>
        <i aria-hidden="true" />
        <span className={styles.labelAside}>{countries.length} COUNTRIES · STILL EXPLORING</span>
      </div>
      <div className={styles.countriesGridFrame}>
        <ul className={styles.countriesGrid} role="list">
          {countries.map(country => (
            <li className={styles.country} key={country.code}>
              <img className={styles.countryFlag} src={country.flag} alt="" width="108" height="72" loading="lazy" />
              <div className={styles.countryIdentity}>
                <p className={styles.countryCode}><span aria-hidden="true" />{country.code}</p>
                <p className={styles.countryName}>{country.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
