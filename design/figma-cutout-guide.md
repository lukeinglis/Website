# Figma Cutout Guide: Office Scene Objects

## Goal
Cut out each interactive object from `design/office-scene-concept.png` as a separate transparent PNG. These will be overlaid on the base image so each object can have individual hover effects (brighten, scale, glow) and trigger popups or navigation.

## Base Image
- File: `design/office-scene-concept.png`
- Dimensions: **1672 x 941**

## Object List

| # | Object | Filename | Notes |
|---|--------|----------|-------|
| 1 | Work Laptop (center) | `work-laptop.png` | Dynamic screen area — include full laptop body |
| 2 | Personal Laptop (right) | `personal-laptop.png` | Dynamic screen area — include full laptop body |
| 3 | TV (right wall) | `tv.png` | Dynamic screen area — include bezel |
| 4 | Window/Monitor (center wall) | `window.png` | Dynamic — will display time-of-day/weather scenes |
| 5 | Photo Frames (right wall, 6 frames) | `photos.png` | Trace as one group — dynamic content |
| 6 | Sticky Notes (desk, right of mouse) | `sticky-notes.png` | The yellow post-it pad |
| 7 | Business Card (desk, far right) | `business-card.png` | Red Hat business card |
| 8 | Research Paper (desk, right of personal laptop) | `research-paper.png` | The papers/book near the laptop |
| 9 | Newspaper (desk, left side) | `newspaper.png` | Open newspaper spread |
| 10 | iPhone (desk, left of work laptop) | `iphone.png` | The phone on the desk |
| 11 | Headphones (desk, left side) | `headphones.png` | Headphones on stand |
| 12 | Diploma (left wall) | `diploma.png` | Auburn University diploma frame |
| 13 | Nintendo Switch (media console, right) | `switch.png` | Just the Switch unit |

Save all exports to: `public/images/zones/`

## Step-by-Step Instructions

### 1. Create the file

1. Go to **figma.com/files**
2. Click **+ New** (top-right) -> **Design File**

### 2. Set up the frame

1. Press **F** (Frame tool)
2. Click and drag to create a frame
3. In the right panel under Design, set **W: 1672** and **H: 941**
4. Press **V** to switch back to Move tool

### 3. Import the office image

1. Drag `office-scene-concept.png` from Finder onto the frame
2. Select the image, set in right panel: **X: 0, Y: 0, W: 1672, H: 941**
3. Image should perfectly fill the frame

### 4. Lock the image layer

1. In the **left panel** (Layers), find the image layer
2. Right-click -> **Lock** (prevents accidental moves)

### 5. Trace an object (repeat for each)

1. Press **P** (Pen tool)
2. Click around the outline of the object, placing points at each corner/curve
   - Straight edges: just click at each corner
   - Curves: click and **drag** to create a curve handle
   - 10-15 points per object is plenty
   - Stay slightly OUTSIDE the edge (1-2px generous)
3. Click your first point to **close the path**
4. Press **V** to go back to Move tool

### 6. Create the masked cutout

1. **Unlock** the garage image (right-click in Layers -> Unlock)
2. **Duplicate** the image: click it, press **Cmd+D**
3. Select BOTH the vector shape AND the top image copy:
   - Click vector shape in Layers
   - Hold **Shift**, click the duplicated image
4. Right-click -> **Use as Mask** (or **Cmd+Shift+M**)
5. You should see just the object isolated on transparent background
6. **Re-lock** the original image (right-click -> Lock)

### 7. Export the cutout

1. Click the **mask group** in Layers
2. Right panel -> scroll to **Export** section
3. Click **+** to add an export
4. Format: **PNG** (transparency is automatic)
5. Click **Export** -> save with the correct filename from the table above

### 8. Clean up before next object

1. **Hide** the mask group (eye icon in Layers) or move it outside the frame
2. Ensure the original locked image is visible
3. Repeat steps 5-7 for the next object

## Tips

- **Zoom in** (Cmd+scroll) when tracing for accuracy
- **Undo** with Cmd+Z if you misplace a point
- **Edit points** after closing: double-click the shape to re-enter edit mode
- **Don't stress perfection** — these sit on top of the identical base image, so a generous outline is invisible
- For the **photo frames**, trace around all 6 frames as one shape
- For the **laptops**, include the full body + screen
- For the **headphones**, include the stand
- For the **diploma**, trace the entire frame including the mat

## After Export

Once all PNGs are in `public/images/zones/`, we will:
1. Build an `OfficeScene` component that layers each cutout at its exact position on the base image
2. Add per-object hover effects (brighten, slight scale-up, glow) that follow the actual object shape
3. Wire up dynamic content areas (laptop screens, TV, window, photo frames)
4. Add popup/modal interactions for static objects (diploma, business card, etc.)
