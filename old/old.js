// line(offX, offY + tileOffsetR / 2, offX + tileOffsetC / 2, offY, color);
// line(offX + tileOffsetC / 2, offY, offX + tileOffsetC, offY + tileOffsetR / 2, color);
// line(offX + tileOffsetC, offY + tileOffsetR / 2, offX + tileOffsetC / 2, offY + tileOffsetR, color);
// line(offX + tileOffsetC / 2, offY + tileOffsetR, offX, offY + tileOffsetR / 2, color);

//----------------------------

  // if (gx == tileX && gy == tileY) {
  //   fill('#C5DB3B')
  // }
  // else {
  //   if (map[gy][gx] == 0) {
  //     fill('lightgreen')
  //   }
  //   if (map[gy][gx] == 1) {
  //     fill('blue')
  //   }
  //   if (map[gy][gx] == 2) {
  //     fill('yellow')
  //   }
  //}

  // change if stament to array

//----------------------------------

// function loadImg(gx, gy) {
//   img = map[gy][gx]
//   img = tiles[img]
// }

//-----------------------------------

// beginShape()
// vertex(offX, offY + tileOffsetR / 2)
// vertex(offX + tileOffsetC / 2, offY)
// vertex(offX + tileOffsetC, offY + tileOffsetR / 2)
// vertex(offX + tileOffsetC / 2, offY + tileOffsetR)
// endShape(CLOSE);

//-------------------------------------

// originY = (height - totalHeight) / 2 + totalHeight / 2 - (height * 0.05)

//-------------------------------------

// function hover(tileX, tileY) {
//   if (tileX >= 0 && tileX < Xtiles && tileY >= 0 && tileY < Ytiles) {
//     tileType = map[tileY][tileX]
//     map[tileY][tileX] = 4
//   }
// }

//-------------------------------------

// switch (this.direction) {
//     case 0: // North heading - Possible bitmasks, 1 , 2 , 4 , 

//         switch (this.activeBitmask) {
//             case 1:
//                 this.activeBitmask
//         }

//         break

//     case 1:
//         break

//     case 2:
//         break

//     case 3:
//         break

// }

// -----------------------



// let TRACK_STRAIGHT = [
//   TRACKDIR.N + TRACKDIR.S,
//   TRACKDIR.E + TRACKDIR.W,
//   TRACKDIR.SW + TRACKDIR.NE,
//   TRACKDIR.NW + TRACKDIR.SE]

// let TRACK_CURVE = [
// ]

// let TRACK_JUNCTION = []

// let TRACK_CROSSROAD = []


// const TRACKDIR = {  // Each directions bitmask consant
//   N: 2,
//   NE: 4,
//   E: 8,
//   SE: 16,
//   S: 32,
//   SW: 64,
//   W: 128,
//   NW: 1
// }

// const TRACKSTRAIGHT = { // Every directions values. This means that north could be any combinations of bitmasks for N , NE and NW, same for every other direction.
//   NS: TRACKDIR.N + TRACKDIR.S,
//   EW: TRACKDIR.E + TRACKDIR.W,
//   SWNE: TRACKDIR.SW + TRACKDIR.NE,
//   NWSE: TRACKDIR.NW + TRACKDIR.SE
// }

// const TRACKJUNCTION = {
//   0: TRACKSTRAIGHT.NS + (TRACKDIR.NE | TRACKDIR.SE | TRACKDIR.NW | TRACKDIR.SW),
//   1: TRACKSTRAIGHT.EW + (TRACKDIR.NE | TRACKDIR.SE | TRACKDIR.NW | TRACKDIR.SW),
//   2: TRACKSTRAIGHT.SWNE + (TRACKDIR.S | TRACKDIR.E | TRACKDIR.N | TRACKDIR.W),
//   3: TRACKSTRAIGHT.NWSE + (TRACKDIR.S | TRACKDIR.E | TRACKDIR.N | TRACKDIR.W)
// }

//https://www.istockphoto.com/vector/railway-kit-gm1450125259-487130540
//write build mode + trCK PLACMENT ALGORITHMS
//https://kenney.nl/assets/train-kit