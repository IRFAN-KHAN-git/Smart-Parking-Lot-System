import React, { useState } from 'react';

export default function AddSlotForm({ addSlot }) {
  const [slotNo, setSlotNo] = useState('');
  const [isCovered, setIsCovered] = useState(false);
  const [isEVCharging, setIsEVCharging] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!slotNo) return;
    addSlot(Number(slotNo), isCovered, isEVCharging);
    setSlotNo('');
    setIsCovered(false);
    setIsEVCharging(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-2"
    >
      <h2 className="text-xl font-semibold">Add Parking Slot</h2>
      <input
        type="number"
        placeholder="Slot Number"
        value={slotNo}
        onChange={(e) => setSlotNo(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <div className="flex items-center space-x-4">
        <label>
          <input
            type="checkbox"
            checked={isCovered}
            onChange={(e) => setIsCovered(e.target.checked)}
          />{' '}
          Covered
        </label>
        <label>
          <input
            type="checkbox"
            checked={isEVCharging}
            onChange={(e) => setIsEVCharging(e.target.checked)}
          />{' '}
          EV Charging
        </label>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Slot
      </button>
    </form>
  );
}
