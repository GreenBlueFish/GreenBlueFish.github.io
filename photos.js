const total = 79;
const folder = "projects/images/photography/";

// photos that look bad at the top (they can still show up at the bottom)
const bottomOnly = [11, 40, 42, 46, 48, 49, 50, 60, 61, 64, 70, 72];

// caption for each photo, keyed by photo number
const captions = {
  1: "Ripley's Aquarium",
  2: "Looking over Toronto from the CN Tower",
  3: "Looking over Toronto from the CN Tower",
  4: "On the road to somewhere, I can't remember where",
  5: "Ripley's Aquarium",
  7: "On Endor, Yub nub!",
  9: "Alcatraz",
  10: "Alcatraz",
  11: "Boat locks",
  13: "Alcatraz",
  16: "On Endor, Yub nub!",
  17: "Golden Gate Bridge, turns out you can't walk on either side :(",
  20: "On Endor, Yub nub!",
  23: "Palace of Fine Arts, San Francisco",
  24: "Palace of Fine Arts, San Francisco",
  25: "Palace of Fine Arts, San Francisco",
  26: "Alcatraz courtyard wall, a reminder that I shouldn't take freedom for granted",
  28: "San Francisco",
  31: "Ice or clouds?",
  32: "Ice or clouds?",
  34: "What could this be?",
  41: "Entering the Fjords of Quebec",
  42: "Peggy's Cove, Nova Scotia",
  47: "Zagreb, Croatia",
  48: "Croatia",
  51: "Croatia",
  53: "Croatia",
  54: "Croatia, bunkers on the island of Vis",
  55: "Croatia, small church on the island of Vis",
  57: "British Museum",
  58: "The Harwell Dekatron at Bletchley Park, the National Museum of Computing",
  59: "In Oxford",
  60: "Holy Trinity Church in Stratford, where Shakespeare is buried",
  61: "The Enigma Machine at Bletchley Park, the National Museum of Computing",
  62: "My brother ruined the photo, to my dismay",
  63: "Porcelain, lots and lots of porcelain",
  64: "Cryostat",
  65: "Blood moon",
  68: "Harvard plane"
};

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const all = Array.from({ length: total }, (_, i) => i + 1);
const topPool = all.filter(n => !bottomOnly.includes(n));
const bottomPool = all;

// every photo number tried so far (shown or failed), so nothing repeats
const used = new Set();

function showPhoto(id, pool) {
  const el = document.getElementById(id);
  if (!el) return;

  const available = pool.filter(n => !used.has(n));
  if (available.length === 0) return;

  const n = pickRandom(available);
  used.add(n);

  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.alt = captions[n] || "A photo I took";

  // if this file doesn't exist, drop it and try another photo
  img.onerror = () => {
    figure.remove();
    showPhoto(id, pool);
  };

  img.src = `${folder}photo${n}.jpg`;
  figure.appendChild(img);

  if (captions[n]) {
    const cap = document.createElement("figcaption");
    cap.textContent = captions[n];
    figure.appendChild(cap);
  }

  el.appendChild(figure);
}

showPhoto("photo-top", topPool);
showPhoto("photo-bottom", bottomPool);