import CakeRecommend from './components/home/\bCakeRecommend';
import CakePick from './components/home/CakePick';
import CategoryCake from './components/home/CategoryCake';

export default function Home() {
  return (
    <div className="w-full h-full">
      <main className="overscroll-y-auto h-full">
        <CakePick />
        <CategoryCake />
        <CakeRecommend />
      </main>
    </div>
  );
}
