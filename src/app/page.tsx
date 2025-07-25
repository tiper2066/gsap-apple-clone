import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import Navbar from '@/components/Navbar';
import Model from '@/components/Model';

export default function Home() {
    return (
        <main id='root'>
            <Navbar />
            <Hero />
            <Highlights />
            <Model />
        </main>
    );
}
