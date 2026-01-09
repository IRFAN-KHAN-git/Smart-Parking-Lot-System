import React, { useState } from 'react';

export default function ParkRemove({ parkVehicle, removeVehicle }) {
  const [needsEV, setNeedsEV] = useState(false);
  const [needsCover, setNeedsCover] = useState(false);
  const [slotNo, setSlotNo] = useState('');

  const handlePark = () => {
    parkVehicle(needsEV, needsCover);
    setNeedsEV(false);
    setNeedsCover(false);
  };

  const handleRemove = () => {
    if (!slotNo) return;
    removeVehicle(Number(slotNo));
    setSlotNo('');
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Park / Remove Vehicle</h2>

      <div className="space-y-2">
        <h3 className="font-medium">Park Vehicle</h3>
        <label>
          <input
            type="checkbox"
            checked={needsEV}
            onChange={(e) => setNeedsEV(e.target.checked)}
          />{' '}
          Needs EV Charging
        </label>
        <label className="ml-4">
          <input
            type="checkbox"
            checked={needsCover}
            onChange={(e) => setNeedsCover(e.target.checked)}
          />{' '}
          Needs Covered
        </label>
        <br />
        <button
          onClick={handlePark}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Park Vehicle
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Remove Vehicle</h3>
        <input
          type="number"
          placeholder="Slot Number"
          value={slotNo}
          onChange={(e) => setSlotNo(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <br />
        <button
          onClick={handleRemove}
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
        >
          Remove Vehicle
        </button>
      </div>
    </div>
  );
}
