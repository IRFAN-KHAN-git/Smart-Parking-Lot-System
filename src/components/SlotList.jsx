import React from 'react';
import { Car, Home, Zap, X } from 'lucide-react'; // import icons

export default function SlotList({ slots, removeVehicle }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Parking Slots</h2>

      {slots.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Car className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No parking slots available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map((slot) => (
            <div
              key={slot.slotNo}
              className={`p-4 rounded-lg border-2 transition-all ${
                slot.isOccupied
                  ? 'bg-red-500/20 border-red-500'
                  : 'bg-green-500/20 border-green-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-2xl font-bold">{slot.slotNo}</div>
                  <div
                    className={`text-sm font-semibold ${
                      slot.isOccupied ? 'text-red-300' : 'text-green-300'
                    }`}
                  >
                    {slot.isOccupied ? 'OCCUPIED' : 'AVAILABLE'}
                  </div>
                </div>
                <Car
                  className={`w-8 h-8 ${
                    slot.isOccupied ? 'text-red-400' : 'text-green-400'
                  }`}
                />
              </div>

              <div className="flex gap-2 mb-3">
                {slot.isCovered && (
                  <span className="flex items-center gap-1 text-xs bg-purple-500/30 px-2 py-1 rounded border border-purple-400">
                    <Home className="w-3 h-3" />
                    Covered
                  </span>
                )}
                {slot.isEVCharging && (
                  <span className="flex items-center gap-1 text-xs bg-yellow-500/30 px-2 py-1 rounded border border-yellow-400">
                    <Zap className="w-3 h-3" />
                    EV
                  </span>
                )}
              </div>

              {slot.isOccupied && (
                <button
                  onClick={() => removeVehicle(slot.slotNo)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Remove Vehicle
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
