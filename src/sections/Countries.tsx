import { countries, countryCount, type Country } from '../data/countries';
import styles from '../styles/Portfolio.module.css';

function ConstituentCountries({ entries }: { entries: readonly Country[] }) {
  return (
    <ul className={styles.countryRegions} role="list">
      {entries.map(entry => (
        <li className={styles.countryRegion} key={entry.name}>
          {entry.flag ? (
            <>
              <img className={styles.countryRegionFlag} src={entry.flag} alt="" width="72" height="48" loading="lazy" />
              <p className={styles.countryRegionName}>{entry.name}</p>
            </>
          ) : (
            <p className={styles.countryRegionWordmark}>
              {entry.name.split(' ').map((word, index) => <span key={`${word}-${index}`}>{word}{' '}</span>)}
            </p>
          )}
          {entry.regions && <ConstituentCountries entries={entry.regions} />}
        </li>
      ))}
    </ul>
  );
}

export function Countries() {
  return (
    <section id="countries" className={`${styles.section} ${styles.countries}`} aria-labelledby="countries-title">
      <div className={styles.sectionLabel}>
        <h2 id="countries-title" className={styles.countriesTitle}>Countries along the way</h2>
        <i aria-hidden="true" />
        <span className={styles.labelAside}>{countryCount} COUNTRIES · STILL EXPLORING</span>
      </div>
      <div className={styles.countriesGridFrame}>
        <ul className={styles.countriesGrid} role="list">
          {countries.map(country => (
            <li className={`${styles.country} ${country.regions ? styles.countryGroup : ''}`} key={country.name}>
              <div className={styles.countryMain}>
                {country.flag && <img className={styles.countryFlag} src={country.flag} alt="" width="108" height="72" loading="lazy" />}
                <div className={styles.countryIdentity}>
                  <p className={styles.countryCode}><span aria-hidden="true" />{country.code}</p>
                  <p className={styles.countryName}>{country.name}</p>
                </div>
              </div>
              {country.regions && <ConstituentCountries entries={country.regions} />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
