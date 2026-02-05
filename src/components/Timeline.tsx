import React, { useState } from 'react';
import { css, keyframes } from '@emotion/react';

interface TimelineEvent {
  year: string;
  title: string;
  company?: string;
  detail?: string;
  y: number;
  leftOffset?: number;
}

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
`;

const containerStyles = css`
  min-height: 100vh;
  padding: 0 20px 80px;
  overflow: visible;
  position: relative;
`;

const contentStyles = css`
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 0;
  align-items: start;
  z-index: 1;
`;

const svgContainerStyles = css`
  position: relative;
  width: 60px;
  z-index: 1;
`;

const sideStyles = css`
  position: relative;
  height: 1490px;
`;

const cardBaseStyles = css`
  position: absolute;
  transform: translateY(-50%);
  max-width: 400px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  padding: 20px;
  background: hsl(220, 20%, 12%);
  border: 1px solid hsl(210, 100%, 65%, 0.2);
  border-radius: 8px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05);

  &:hover {
    border-color: hsl(210, 100%, 65%, 0.4);
    box-shadow: 
      0 8px 30px rgba(0, 0, 0, 0.5),
      0 0 0 1px hsl(210, 100%, 65%, 0.3);
  }
`;

const cardStyles = css`
  ${cardBaseStyles};
  animation: ${slideInRight} 0.6s ease-out backwards;
`;

const cardYearStyles = css`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 4px;
`;

const cardYearHighlightStyles = css`
  ${cardYearStyles};
  color: hsl(210, 100%, 65%);
`;

const cardTitleStyles = css`
  font-size: 19px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 6px;
  line-height: 1.3;
`;

const cardDetailStyles = css`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const cardDetailCollapsedStyles = css`
  max-height: 0;
  opacity: 0;
  margin-top: 0;
`;

const cardDetailExpandedStyles = css`
  max-height: 200px;
  opacity: 1;
  margin-top: 4px;
`;

export default function Timeline() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Calculate y position based on date
  // Timeline spans 2021-2026, from y=1555 (2021-01) to y=65 (2026-01)
  const getYPosition = (year: number, month: number): number => {
    const startYear = 2021;
    const startMonth = 1;
    const totalMonths = (2026 - 2021) * 12;
    const timelineHeight = 1490; // Reduced from 2870
    const monthsFromStart = (year - startYear) * 12 + (month - startMonth);
    return 1555 - (monthsFromStart / totalMonths) * timelineHeight;
  };

  const devMilestones: TimelineEvent[] = [
    { year: 'Jan 2026', title: 'Strava Analyzer', detail: 'Webapp for analyzing personal Strava data', y: getYPosition(2026, 1) },
    { year: 'Jan 2026', title: 'jaygriff.com v3', detail: 'This version launched Jan 19. Built with Next.js, TypeScript, Emotion CSS, Radix UI', y: getYPosition(2026, 1) },
    { year: 'Dec 2025', title: 'Iterative Canvas', detail: 'AI-powered time blocker with natural language scheduling', y: getYPosition(2025, 12) },
    { year: 'Sep 2025', title: 'Locus', detail: 'Chrome extension for launching bookmarks', y: getYPosition(2025, 9) },
    { year: 'Jul 2025', title: 'Skim Milk Hybrid', detail: 'Client website: React, Vite, TypeScript, styled-components', y: getYPosition(2025, 7) },
    { year: 'Jun 2025', title: 'shape-forge', detail: 'React, Vite, TypeScript, Tailwind', y: getYPosition(2025, 6) },
    { year: 'Mar 2025', title: 'StickerPickle', detail: 'React, Vite, TypeScript, Tailwind', y: getYPosition(2025, 3) },
    { year: 'Jul 2024', title: 'Golf Ball Garage', detail: 'Next.js with Stripe integration', y: getYPosition(2024, 7) },
    { year: 'Dec 2022', title: 'Mood Calculator', detail: 'CLI app: Python, Rich, Pytest, ASCII art', y: getYPosition(2022, 12) },
    { year: 'Jun 2022', title: 'First HTML/CSS Pages', detail: 'Static websites (lost to old computer)', y: getYPosition(2022, 6) },
    { year: 'Aug 2021', title: 'First Script', detail: 'AutoHotkey script to launch websites with a hotkey.', y: getYPosition(2021, 8) },
    { year: 'Jun 2021', title: 'Become Turbo Computer Nerd', detail: 'Tech becomes my biggest hobby by far. It\'s not even close.', y: getYPosition(2021, 6) },
    { year: 'May 2021', title: 'Masters of Accounting', detail: 'Earned degree', y: getYPosition(2021, 5) },
  ];

  return (
    <div css={containerStyles}>
      <div css={contentStyles}>
        {/* SVG Timeline with years */}
        <div css={svgContainerStyles}>
            <svg width="250" height="1490" viewBox="-40 65 290 1490" fill="none" style={{ border: '1px solid red' }}>
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(210, 100%, 70%)" />
                  <stop offset="50%" stopColor="hsl(210, 100%, 60%)" />
                  <stop offset="100%" stopColor="hsl(210, 100%, 50%)" />
                </linearGradient>
              </defs>
              
              {/* Tick marks - Years (big) and Months (small) */}
              {(() => {
                const ticks = [];
                const startYear = 2021;
                const endYear = 2026;
                const totalMonths = (endYear - startYear) * 12;
                const timelineHeight = 1490; // from y=65 to y=1555
                
                // Create a map of Y positions to events for offset lookup
                const milestoneMap = new Map(devMilestones.map(m => [m.y, m]));
                
                for (let month = 0; month <= totalMonths; month++) {
                  // Simple linear progression from bottom (2019) to top (2026)
                  const y = 1555 - (month / totalMonths) * timelineHeight;
                  
                  // Timeline line at center x=30
                  const x = 30;
                  
                  const isYear = month % 12 === 0;
                  const isHalfYear = month % 6 === 0 && !isYear;
                  
                  // Left-aligned tick marks - all start at x=15, extend right
                  let tickLength = isYear ? 36 : (isHalfYear ? 24 : 12);
                  let x1 = 15;
                  let x2 = 15 + tickLength;
                  
                  // Check if this tick mark has events
                  const matchingEvents = devMilestones.filter(m => Math.abs(m.y - y) < 5);
                  const hasEvent = matchingEvents.length > 0;
                  
                  const strokeWidth = 2; // Same thickness for all
                  const opacity = 0.9; // Same opacity for all
                  const tickColor = hasEvent ? "hsl(45, 100%, 60%)" : "hsl(210, 100%, 65%)";
                  
                  const isHovered = hasEvent && hoveredPosition !== null && Math.abs(hoveredPosition - y) < 5;
                  const finalX2 = isHovered ? 200 : x2;
                  
                  ticks.push(
                    <line 
                      key={`tick-${month}`}
                      x1={x1} 
                      y1={y} 
                      x2={finalX2} 
                      y2={y} 
                      stroke={tickColor} 
                      strokeWidth={strokeWidth}
                      opacity={opacity}
                      strokeLinecap="round"
                    />
                  );
                  
                  // Add year labels at year tick marks
                  if (isYear) {
                    const year = startYear + (month / 12);
                    const shortYear = year.toString().slice(-2);
                    ticks.push(
                      <text
                        key={`year-label-${month}`}
                        x={10}
                        y={y + 6}
                        fill="hsl(210, 100%, 65%)"
                        fontSize="24"
                        fontWeight="400"
                        fontFamily="var(--font-sekuya)"
                        textAnchor="end"
                        opacity={0.8}
                      >
                        {shortYear}
                      </text>
                    );
                  }
                  
                  // Add hover target for events
                  if (hasEvent) {
                    ticks.push(
                      <rect
                        key={`hover-target-${month}`}
                        x={x1 - 15}
                        y={y - 15}
                        width={30}
                        height={30}
                        fill="transparent"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredPosition(y)}
                        onMouseLeave={() => setHoveredPosition(null)}
                      />
                    );
                  }
                }
                
                return ticks;
              })()}
            </svg>
          </div>

          {/* All cards on right side */}
          <div css={sideStyles}>
            {devMilestones.map((item, idx) => {
              const isExpanded = expandedCards.has(idx);
              const isHovered = hoveredPosition !== null && Math.abs(hoveredPosition - item.y) < 5;
              
              // Calculate vertical offset for multiple cards at same position
              const cardsAtSamePosition = devMilestones.filter(m => Math.abs(m.y - item.y) < 5);
              const indexAtPosition = cardsAtSamePosition.findIndex(m => m.title === item.title);
              const verticalOffset = indexAtPosition * 180; // 240px spacing between cards
              
              return (
                <div 
                  key={idx} 
                  css={cardStyles}
                  style={{ 
                    top: `${item.y + verticalOffset}px`, 
                    left: '205px',
                    opacity: isHovered ? 1 : 0,
                    pointerEvents: isHovered ? 'auto' : 'none',
                    transform: 'translateY(-50%)',
                    zIndex: isHovered ? 10 : 1
                  }}
                  onClick={() => toggleCard(idx)}
                >
                  <div css={cardYearHighlightStyles}>{item.year}</div>
                  <div css={cardTitleStyles}>{item.title}</div>
                  {item.detail && (
                    <div css={cardDetailStyles}>
                      {item.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
}
