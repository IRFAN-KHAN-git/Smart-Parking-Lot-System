# Smart Parking System

A web-based **Smart Parking System** that allows users to **add parking slots, view all slots, park vehicles, and remove vehicles** automatically with a modern UI. The system supports **EV charging slots, covered slots, and real-time slot availability tracking**.

## **Live Deployment**
🌐 [Live App Link](https://parking-lot-system.netlify.app/)  

---

## **Features**

- **Add Parking Slot:** Add a new parking slot with options for **covered** and **EV charging**.  
- **View All Slots:** See a list/grid of all slots with **real-time status**: Available / Occupied.  
- **Park Vehicle:** Allocate the **nearest available slot** based on user preferences (**covered / EV charging**).  
- **Remove Vehicle:** Free an occupied slot.  
- **Dashboard Stats:**  
  - Total Slots  
  - Available Slots  
  - Occupied Slots  
  - EV Available  
  - Covered Available  
- **Error Handling:**  
  - Cannot park if no slots match the requirements.  
  - Cannot remove a vehicle from a free slot.  
- **Modern UI:** Tab-based navigation, responsive grid, colored cards for status.

---

## **Tech Stack**

- **Frontend:** React.js  
- **Styling:** Tailwind CSS (glassmorphism-style cards)  
- **Icons:** lucide-react  
- **Deployment:** Vercel / Netlify  
- **Data Storage:** Browser LocalStorage (persistent across reloads)  

---
