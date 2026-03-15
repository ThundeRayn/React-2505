import { useEffect, useRef, useState } from 'react';
import CalendarCard from '../blocks/home/CalendarCard';
import WeatherCard from '../blocks/home/WeatherCard';
import StepsCard from '../blocks/home/StepsCard';
import TodoPreviewCard from '../blocks/home/TodoPreviewCard';
import CatStatusCard from '../blocks/home/CatStatusCard';
import NowPlayingCard from '../blocks/home/NowPlayingCard';

type BentoSize = {
  col: 1 | 2 | 4;
  row: 1 | 2 | 4;
};

function BentoCell({ col, row, children }: { col: BentoSize['col']; row: BentoSize['row']; children: React.ReactNode }) {
  return (
    <div style={{ gridColumn: `span ${col}`, gridRow: `span ${row}`, minWidth: 0, height: '100%' }}>
      {children}
    </div>
  );
}

export default function HomePage() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [cellSize, setCellSize] = useState<number>(140);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const update = () => {
      const width = node.clientWidth;
      const gap = 16;
      const next = Math.floor((width - gap * 3) / 4);
      if (next > 0) setCellSize(next);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8 }}>{greeting}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 500 }}>{dateStr}</p>
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gridAutoRows: `${cellSize}px`,
          gridAutoFlow: 'dense',
          gap: 'var(--bento-gap)',
          ['--bento-gap' as string]: '16px',
          width: '100%',
        }}
      >
        {/* Weather: 4x1 (top) */}
        <BentoCell col={4} row={1}>
          <WeatherCard />
        </BentoCell>

        {/* Calendar: 2x2 */}
        <BentoCell col={2} row={2}>
          <CalendarCard />
        </BentoCell>

        {/* Steps: 2x1 (beside Calendar, top) */}
        <BentoCell col={2} row={1}>
          <StepsCard />
        </BentoCell>

        {/* Now Playing: 2x1 (beside Calendar, bottom) */}
        <BentoCell col={2} row={1}>
          <NowPlayingCard />
        </BentoCell>

        {/* Todo Preview: 4x2 */}
        <BentoCell col={4} row={2}>
          <TodoPreviewCard />
        </BentoCell>

        {/* Cat Status: 4x2 */}
        <BentoCell col={4} row={2}>
          <CatStatusCard />
        </BentoCell>
      </div>
    </div>
  );
}
