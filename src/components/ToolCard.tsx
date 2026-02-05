import Image from 'next/image';
import { Paragraph } from './Primitives';

interface ToolCardProps {
  logo: string;
  title: string;
  description: string;
  logoSize?: number;
  invert?: boolean;
}

export function ToolCard({ logo, title, description, logoSize = 60, invert = false }: ToolCardProps) {
  return (
    <div style={{ 
      textAlign: 'center', 
      width: '110px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <div style={{ 
        width: `${logoSize}px`, 
        height: `${logoSize}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <Image
          src={logo}
          alt={`${title} logo`}
          width={logoSize}
          height={logoSize}
          style={{ 
            objectFit: 'contain',
            filter: invert ? 'brightness(0) invert(1)' : 'none'
          }}
        />
      </div>
      <div>
        <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{title}</strong>
        <Paragraph style={{ fontSize: '0.875rem', margin: 0 }}>
          {description}
        </Paragraph>
      </div>
    </div>
  );
}
