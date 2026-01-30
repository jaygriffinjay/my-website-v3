import type { PostMeta } from '@/types/post';
import { getAllPosts, getAllDocs, getAllAppRoutes } from '@/lib/posts';

export const metadata: PostMeta = {
  title: 'Debug: Date Analysis',
  slug: 'debug-dates',
  date: '2026-01-30T00:00:00Z',
  description: 'Debug page to analyze all content dates',
  tags: ['debug'],
};

// Server component that loads and displays all dates
export default async function DebugDates() {
  const [posts, docs, appRoutes] = await Promise.all([
    getAllPosts(),
    getAllDocs(),
    getAllAppRoutes(),
  ]);
  const allContent = [...posts, ...docs, ...appRoutes];
  
  // Sort by validity first (invalid at top), then by date
  const sorted = [...allContent].sort((a, b) => {
    const aInvalid = isNaN(new Date(a.metadata.date).getTime());
    const bInvalid = isNaN(new Date(b.metadata.date).getTime());
    if (aInvalid && !bInvalid) return -1;
    if (!aInvalid && bInvalid) return 1;
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'monospace' }}>
      <h1 style={{ color: 'white' }}>🔍 Full Date Data Dump</h1>
      <p style={{ color: 'white' }}>Total content items: {allContent.length}</p>
      
      <div style={{ marginTop: '2rem' }}>
        {sorted.map((item, index) => {
          const dateObj = new Date(item.metadata.date);
          const isInvalid = isNaN(dateObj.getTime());
          const updatedObj = item.metadata.updated ? new Date(item.metadata.updated) : null;
          const updatedInvalid = updatedObj ? isNaN(updatedObj.getTime()) : false;
          
          return (
            <div 
              key={index}
              style={{ 
                marginBottom: '1.5rem', 
                padding: '1rem', 
                background: isInvalid || updatedInvalid ? 'rgba(255, 0, 0, 0.2)' : 'rgba(50, 50, 50, 0.5)',
                borderRadius: '8px',
                border: isInvalid || updatedInvalid ? '2px solid red' : '1px solid #444',
                fontSize: '14px'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: isInvalid || updatedInvalid ? '#ff4444' : '#44ff44', marginBottom: '0.75rem' }}>
                {isInvalid || updatedInvalid ? '❌ INVALID DATE DETECTED' : '✅ Valid'}
              </div>
              
              <div style={{ color: '#aaa', marginBottom: '0.25rem' }}>SOURCE: {item.filename}</div>
              <div style={{ color: 'white', marginBottom: '0.25rem' }}><strong>Title:</strong> {item.metadata.title}</div>
              <div style={{ color: 'white', marginBottom: '0.25rem' }}><strong>Slug:</strong> {item.metadata.slug}</div>
              <div style={{ color: 'white', marginBottom: '0.25rem' }}><strong>Type:</strong> {item.metadata.type || 'post'}</div>
              <div style={{ color: 'white', marginBottom: '0.25rem' }}><strong>Path:</strong> {item.metadata.path || 'N/A'}</div>
              
              <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px' }}>
                <div style={{ color: isInvalid ? '#ff4444' : '#44ff44', marginBottom: '0.25rem' }}>
                  <strong>date:</strong> <code style={{ background: '#222', padding: '2px 6px', borderRadius: '3px', color: isInvalid ? '#ff8888' : '#88ff88' }}>"{item.metadata.date}"</code>
                </div>
                <div style={{ color: '#aaa', marginBottom: '0.25rem' }}>
                  Parsed: {isInvalid ? '⚠️ Invalid Date' : dateObj.toISOString()}
                </div>
                {item.metadata.updated && (
                  <>
                    <div style={{ color: updatedInvalid ? '#ff4444' : '#44ff44', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                      <strong>updated:</strong> <code style={{ background: '#222', padding: '2px 6px', borderRadius: '3px', color: updatedInvalid ? '#ff8888' : '#88ff88' }}>"{item.metadata.updated}"</code>
                    </div>
                    <div style={{ color: '#aaa' }}>
                      Parsed: {updatedInvalid ? '⚠️ Invalid Date' : updatedObj?.toISOString()}
                    </div>
                  </>
                )}
              </div>
              
              <details style={{ marginTop: '0.75rem', color: '#888' }}>
                <summary style={{ cursor: 'pointer', color: '#aaa' }}>Full metadata dump</summary>
                <pre style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#111', borderRadius: '4px', fontSize: '12px', overflow: 'auto' }}>
                  {JSON.stringify(item.metadata, null, 2)}
                </pre>
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
}
