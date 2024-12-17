import { ref, set, push, onValue, update } from 'firebase/database';
import { db } from '../lib/firebase';
import type { RSVP, Gift } from '../types';

// RSVP Functions
export async function addRSVP(rsvp: Omit<RSVP, 'id'>) {
  try {
    const rsvpsRef = ref(db, 'rsvps');
    const newRsvpRef = push(rsvpsRef);
    await set(newRsvpRef, {
      ...rsvp,
      timestamp: new Date().toISOString(),
    });
    return newRsvpRef.key;
  } catch (error) {
    console.error('Error adding RSVP:', error);
    throw error;
  }
}

export function subscribeToRSVPs(callback: (rsvps: RSVP[]) => void) {
  const rsvpsRef = ref(db, 'rsvps');
  return onValue(rsvpsRef, (snapshot) => {
    const data = snapshot.val();
    const rsvps = data ? Object.entries(data).map(([id, value]) => ({
      id,
      ...(value as Omit<RSVP, 'id'>),
    })) : [];
    callback(rsvps);
  });
}

// Gift Functions
export async function updateGift(giftId: string, updates: Partial<Gift>) {
  const giftRef = ref(db, `gifts/${giftId}`);
  await update(giftRef, updates);
}

export function subscribeToGifts(callback: (gifts: Gift[]) => void) {
  const giftsRef = ref(db, 'gifts');
  return onValue(giftsRef, (snapshot) => {
    const data = snapshot.val();
    const gifts = data ? Object.entries(data).map(([id, value]) => ({
      id,
      ...(value as Omit<Gift, 'id'>),
    })) : [];
    callback(gifts);
  });
}

export async function processGiftContribution(
  giftId: string,
  amount: number,
  contributorName: string
) {
  const giftRef = ref(db, `gifts/${giftId}`);
  const gift = await new Promise<Gift>((resolve) => {
    onValue(giftRef, (snapshot) => {
      resolve({ id: giftId, ...snapshot.val() } as Gift);
    }, { onlyOnce: true });
  });

  const newRemainingPrice = gift.remainingPrice - amount;
  const newContributors = gift.contributors + 1;
  const newStatus = newRemainingPrice <= 0 ? 'received' : 'partial';

  await update(giftRef, {
    remainingPrice: newRemainingPrice,
    contributors: newContributors,
    status: newStatus,
  });

  // Record the contribution
  const contributionRef = ref(db, `contributions/${giftId}`);
  await push(contributionRef, {
    contributorName,
    amount,
    timestamp: new Date().toISOString(),
  });
}