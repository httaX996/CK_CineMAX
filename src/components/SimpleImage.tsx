'use client';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function SimpleImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false
}: SimpleImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}
