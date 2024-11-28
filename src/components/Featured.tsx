import Link from 'next/link';
import Image from 'next/image';

interface Podcast {
  id: number;
  title: string;
  description: string;
  episodes: number;
  image: string;
  url: string;
}

const podcasts: Podcast[] = [
  {
    id: 1,
    title: "AI Frontiers",
    description: "Exploring the latest developments in artificial intelligence, machine learning, and their real-world applications",
    episodes: 10,
    image: "/img/01.png",
    url: "https://app.dailo.org"
  },
  {
    id: 2,
    title: "Blockchain Decoded",
    description: "Understanding blockchain technology, cryptocurrencies, and their impact on the future of finance",
    episodes: 10,
    image: "/img/02.png",
    url: "https://app.dailo.org"
  },
  {
    id: 3,
    title: "ICP Insights",
    description: "Diving deep into the Internet Computer Protocol and its revolutionary approach to cloud computing",
    episodes: 10,
    image: "/img/03.png",
    url: "https://app.dailo.org"
  }
];

export default function Featured() {
  return (
    <section className="min-h-screen flex flex-col justify-between bg-black">
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-4 text-white max-w-3xl">
          <h3 className="text-3xl font-semibold tracking-tight leading-none mb-16 text-center">
            Featured Podcasts
          </h3>
          
          <div className="flex flex-col gap-8">
            {podcasts.map((podcast) => (
              <Link 
                key={podcast.id}
                href={podcast.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-zinc-900/70 border border-white/5 rounded-lg p-1 text-left transition-all hover:bg-zinc-900/80 w-full"
              >
                <div className="flex gap-4">
                  <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-sm">
                    <Image 
                      src={podcast.image} 
                      alt={podcast.title}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover transition-transform"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-2">
                    <p className="text-sm md:text-lg xl:text-xl font-semibold leading-tight tracking-tight text-white opacity-50">{podcast.description}</p>
                    <p className="mt-auto text-xs tracking-wide font-bold text-zinc-500">{podcast.episodes} EPISODES</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <footer className="w-full border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-left text-white/50 text-sm">© Dailo 2024</p>
        </div>
      </footer>
    </section>
  );
} 