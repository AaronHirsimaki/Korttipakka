"use client";

import React, { useState, useEffect } from 'react';

type Suit = 'hertta' | 'ruutu' | 'risti' | 'pata';
type Rank = 'a' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'j' | 'q' | 'k';

interface Card {
  suit: Suit;
  rank: Rank;
}

const allSuits: Suit[] = ['hertta', 'ruutu', 'risti', 'pata'];
const allRanks: Rank[] = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (let suit of allSuits) {
    for (let rank of allRanks) {
      deck.push({ suit, rank });
    }
  }
  return deck;
}

function shuffleDeck(deck: Card[]): Card[] {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

export default function Home() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  useEffect(() => {
    const initialDeck = createDeck();
    const shuffled = shuffleDeck(initialDeck);
    setDeck(shuffled);
  }, []);

  const drawCard = () => {
    if (deck.length === 0) {
      alert("Ei enää kortteja pakassa!");
      return;
    }

    const [drawnCard, ...restOfDeck] = deck;
    setCurrentCard(drawnCard);
    setDeck(restOfDeck);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <div style={{ marginTop: '20px', fontSize: '24px' }}>
      {currentCard ? (
        <img
          src={`/cards/${currentCard.suit}_${currentCard.rank}.png`}
          alt={`${currentCard.suit} of ${currentCard.rank}`}
          style={{ width: '10rem', height: 'auto' }}
        />
      ) : (
        <img
          src="/cards/kortti_tausta.png"
          alt="Kortin tausta"
          style={{ width: '10rem', height: 'auto' }}
        />
      )}
    </div>

    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={drawCard}>Nosta kortti</button>
        <button
          onClick={() => {
            const newDeck = createDeck();
            const shuffledDeck = shuffleDeck(newDeck);
            setDeck(shuffledDeck);
            setCurrentCard(null);
          }}
        >
          Sekoita pakka
        </button>
      </div>
      Pakassa jäljellä: {deck.length} korttia
    </div>
  </div>
  );
}
