import './SkeletonLoader.css';

export default function SkeletonLoader({ rows = 5, height = 44 }) {
  return (
    <div className="skeleton-loader-container">
      {Array.from({ length: rows }).map((_, idx) => (
        <div 
          key={idx} 
          className="skeleton-row-pulse" 
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}
