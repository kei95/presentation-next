import styles from "../styles/Home.module.css";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// server ===================

/**
 * function to retrieve my following users in github
 */
async function fetchFollowers(): Promise<Photo[] | undefined> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    const isResponseSuccessful = res.status < 300 && res.status > 199;

    if (isResponseSuccessful) {
      const jsonRes = await res.json();
      return jsonRes;
    }
  } catch (error) {
    console.error("error!", error);
  }

  // case of failure/error
  return undefined;
}

/**
 * This is where server-side fetch happens
 */
export async function getServerSideProps() {
  const photos = await fetchFollowers();

  return {
    props: { photos }, // will be passed to the page component as props
  };
}

// client ===================

interface PostsProps {
  photos: Awaited<ReturnType<typeof fetchFollowers>>;
}

export default function Home({ photos }: PostsProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Next.js!</h1>
      {photos ? (
        <ul>
          {photos.map((photo, idx) => (
            <a href={photo.url} key={`follower_${photo.thumbnailUrl}_${idx}`}>
              <li className={styles.card}>
                <p>{photo.title}</p>
                {photo.url}
              </li>
            </a>
          ))}
        </ul>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
