import React, { useState, useEffect } from 'react';
import AddSlotForm from './components/AddSlotForm';
import SlotList from './components/SlotList';
import ParkRemove from './components/ParkRemove';
import { Car } from 'lucide-react';

function App() {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('');

  // slots from localstorage
  useEffect(() => {
    const stored = localStorage.getItem('slots');
    if (stored) setSlots(JSON.parse(stored));
  }, []);

  //save slots to localstorage
  useEffect(() => {
    localStorage.setItem('slots', JSON.stringify(slots));
  }, [slots]);

  // add slot
  const addSlot = (slotNo, isCovered, isEVCharging) => {
    if (slots.some((s) => s.slotNo === slotNo)) {
      setMessage(`Slot ${slotNo} already exists`);
      return;
    }
    const newSlot = { slotNo, isCovered, isEVCharging, isOccupied: false };
    setSlots([...slots, newSlot]);
    setMessage(`Slot ${slotNo} added successfully`);
  };

  // park 
  const parkVehicle = (needsEV, needsCover) => {
    const availableSlots = slots
      .filter((s) => !s.isOccupied)
      .filter((s) => (needsEV ? s.isEVCharging : true))
      .filter((s) => (needsCover ? s.isCovered : true))
      .sort((a, b) => a.slotNo - b.slotNo);

    if (availableSlots.length === 0) {
      setMessage('No slot available');
      return;
    }

    availableSlots[0].isOccupied = true;
    setSlots([...slots]);
    setMessage(`Vehicle parked at slot ${availableSlots[0].slotNo}`);
  };

  // remove
  const removeVehicle = (slotNo) => {
    const slot = slots.find((s) => s.slotNo === slotNo);
    if (!slot) {
      setMessage(`Slot ${slotNo} does not exist`);
      return;
    }
    if (!slot.isOccupied) {
      setMessage(`Slot ${slotNo} is already free`);
      return;
    }
    slot.isOccupied = false;
    setSlots([...slots]);
    setMessage(`Vehicle removed from slot ${slotNo}`);
  };

  const stats = {
    total: slots.length,
    occupied: slots.filter((s) => s.isOccupied).length,
    available: slots.filter((s) => !s.isOccupied).length,
    ev: slots.filter((s) => s.isEVCharging && !s.isOccupied).length,
    covered: slots.filter((s) => s.isCovered && !s.isOccupied).length,
  };

  return (
    <div className="min-h-screen p-6 ">
    
  {/* heading */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <Car className="w-10 h-10 text-blue-400" />
        <h1 className="text-4xl font-bold">Smart Parking System</h1>
      </div>
      
    {/* bars */}
      <br />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 m-2">
        <div className="bg-black/10 backdrop-blur-sm p-4 rounded-lg border border-black/20">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Slots</div>
        </div>
        <div className="bg-green-500/20 backdrop-blur-sm p-4 rounded-lg border border-green-500/50">
          <div className="text-2xl font-bold">{stats.available}</div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-lg border border-red-500/50">
          <div className="text-2xl font-bold">{stats.occupied}</div>
          <div className="text-sm text-gray-600">Occupied</div>
        </div>
        <div className="bg-blue-500/20 backdrop-blur-sm p-4 rounded-lg border border-blue-500/50">
          <div className="text-2xl font-bold">{stats.ev}</div>
          <div className="text-sm text-gray-600">EV Available</div>
        </div>
        <div className="bg-purple-500/20 backdrop-blur-sm p-4 rounded-lg border border-purple-500/50">
          <div className="text-2xl font-bold">{stats.covered}</div>
          <div className="text-sm text-gray-600">Covered Available</div>
        </div>
      </div>
      {/* tabs */}

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex gap-2 bg-black/10 backdrop-blur-sm p-1 rounded-lg ">
          <button
            onClick={() => setActiveTab('view')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'view'
                ? 'bg-purple-500 text-white'
                : 'text-black hover:bg-white'
            }`}
          >
            View All Slots
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'add'
                ? 'bg-purple-500 text-white'
                : 'text-black hover:bg-white'
            }`}
          >
            Add Slot
          </button>
          <button
            onClick={() => setActiveTab('park')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'park'
                ? 'bg-purple-500 text-white'
                : 'text-black hover:bg-white'
            }`}
          >
            Park/Remove
          </button>
        </div>

        {/* message */}
        {message && (
          <div className="bg-blue-100 text-blue-800 p-3 rounded">{message}</div>
        )}

        {/* content */}
        {activeTab === 'add' && <AddSlotForm addSlot={addSlot} />}
        {activeTab === 'view' && (
          <SlotList slots={slots} removeVehicle={removeVehicle} />
        )}
        {activeTab === 'park' && (
          <ParkRemove parkVehicle={parkVehicle} removeVehicle={removeVehicle} />
        )}
      </div>
    </div>
  );
}

export default App;
