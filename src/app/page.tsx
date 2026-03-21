import Hero from '@/components/Hero'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Home.module.css'
import { join } from 'path'
import * as fs from 'fs'

export const dynamic = 'force-dynamic'

interface Activity {
  id: number;
  title: string;
  date: string;
  coverImage: string;
  images: string[];
}

async function getActivities(): Promise<Activity[]> {
  const configPath = join(process.cwd(), 'src', 'config', 'activities.json')
  const fileContent = fs.readFileSync(configPath, 'utf8')
  return JSON.parse(fileContent)
}

export default async function Home() {
  const activities = await getActivities()
  const previewActivities = (activities || []).slice(0, 6)

  return (
    <div>
      <Hero />
      <section className={styles.previewSection}>
        <div className="container">
          <h2>최신 활동</h2>
          <div className={styles.previewGrid}>
            {previewActivities.map((activity: Activity) => (
              <Link key={activity.id} href={`/archive/records/${activity.id}`} className={styles.previewItem}>
                <div className={styles.previewImage}>
                  <Image
                    src={activity.coverImage}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                {activity.title && (
                  <div className={styles.previewOverlay}>
                    <h3>{activity.title}</h3>
                    {activity.date && <p className={styles.previewDate}>{activity.date}</p>}
                  </div>
                )}
              </Link>
            ))}
          </div>
          <div className={styles.viewAllContainer}>
            <Link href="/archive/records" className={styles.viewAllLink}>
              모든 작품 보기 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
