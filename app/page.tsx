import { WallCalendar } from "@/components/WallCalendar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.canvas}>
        <WallCalendar />
      </section>
    </main>
  );
}
