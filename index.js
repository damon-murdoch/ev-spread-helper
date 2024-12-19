// Parse Showdown Export
function parseShowdownExport() {
  // Get the showdown export text area
  const showdownExport = document.getElementById('showdownExport');

  // Get the content from the text area
  const content = showdownExport.value;

  // Parse the showdown sets from the content
  const sets = parseSets(content);

  // Return the sets
  return sets;
}

// Create Item Table
function createItemTable(set, setNo, items) {
  // Dereference Species
  const species = set["species"];

  console.log(`Generating table ${setNo} (${species}) ...`);

  // Clear instructions div
  const parent = document.getElementById('instructions');

  // Create a new table for the spread
  const newTable = document.createElement('table');
  newTable.classList.add("table", "table-dark");

  // Create the header for the table
  const tableHeader = document.createElement('thead');

  // Assign table header contents
  tableHeader.innerHTML = `<tr>
<th colspan=${colsPerRow}>
  Spread ${setNo} 
  <span class='text-secondary'>(${species})</span>
</th>
</tr>
`;

  // Add table header to table
  newTable.appendChild(tableHeader);

  // Create the body for the table
  const tableBody = document.createElement('tbody');
  tableBody.classList.add("text-left");

  // Iterator
  let i = 0;

  // Get all of the item names
  const keys = Object.keys(items);

  // While we have not reached the end of the array
  while (i < keys.length) {
    // Create the table row
    const row = document.createElement('tr');

    // Create 'colsPerRow' columns per row
    for (let j = i + colsPerRow; i < j; i++) {
      // Create the table column
      const col = document.createElement('td');

      // Index is in range
      if (i < keys.length) {
        // Get the item name and quantity
        const item = keys[i];
        let quantity = items[item];

        // Create the input group container
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group'); // Bootstrap input group

        // Create the readonly input field for the item name
        const input = document.createElement('input');
        input.classList.add('form-control');
        input.type = 'text';
        input.value = `${quantity}x ${item}`;
        input.readOnly = true; // Make the input readonly
        input.classList.add('me-2'); // Add margin to the right of the label

        // Create the decrement button with quantity
        const button = document.createElement('button');
        button.style = 'width: 10%';
        button.textContent = `${quantity}`;
        button.classList.add('btn', 'btn-secondary', 'btn-sm');

        // On click, decrement the value and update button text
        button.onclick = function () {
          if (quantity > 0) {
            quantity -= 1; // Decrease the quantity
            button.textContent = `${quantity}`; // Update the button text to reflect the new quantity
          }

          // Disable button and change text color to gray when quantity reaches 0
          if (quantity === 0) {
            button.disabled = true;
          }
        };

        // Append the input field and button to the input group
        inputGroup.appendChild(input);
        inputGroup.appendChild(button);

        // Add the input group to the column
        col.appendChild(inputGroup);
      } else {
        // Empty column
        col.innerHTML = `-`;
      }

      // Add column to the row
      row.appendChild(col);
    }

    // Add the row to the body
    tableBody.appendChild(row);
  }

  // Add table body to table
  newTable.appendChild(tableBody);

  // Append table to the parent
  parent.appendChild(newTable);
}

function get_stat_evs(value, modifiers, pokerus = false) {
  const results = [];
  let remainder = value;

  for (const modifier of modifiers) {
    const adjusted = pokerus ? modifier * 2 : modifier;
    const amount = (remainder / adjusted) | 0;
    results.push(amount);

    remainder %= adjusted;
  }

  return results;
}

function get_ev_jobs(evs, items, pokerus = false) {

  // Loop over the evs
  for (const stat in evs) {
    // Get the ev number for the stat
    const value = evs[stat];

    const stat_evs = get_stat_evs(value, pokeJobEvs, pokerus);

    // Loop over the indexes
    for (const index in stat_evs) {
      if (stat_evs[index] > 0) {

        // Generate basic string
        let evJob = `${statHeaders[stat]} Job - ${pokeJobs[index]}`;

        // Replace power item placeholder
        if (evJob.includes('[pi]')) {
          evJob = evJob.replace('[pi]', ` + ${powerItems[stat]}`);
        }

        // Add action to the list
        items[evJob] = stat_evs[index];
      }
    }
  }

  return items;
}

function get_ev_battles(evs, game, items, pokerus = false) {

  // EV Modifier
  const modifier = [9, 2, 1];

  // Loop over the evs
  for (const stat in evs) {
    // Get the ev number for the stat
    const value = evs[stat];

    const stat_evs = get_stat_evs(value, modifier, pokerus);

    // Any 'big' items required
    if (stat_evs[0] > 0) {
      // Get the name of the item required
      const evBigItem = `${evMons[game][stat]} + ${powerItems[stat]}`;

      // Add the item, quantity to the list
      items[evBigItem] = stat_evs[0];
    }

    // Any 'mid' items required
    if (stat_evs[1] > 0) {
      // Get the name of the item required
      const evMidItem = `${evMons[game][stat]} + Macho Brace`;

      // Add the item, quantity to the list
      items[evMidItem] = stat_evs[1];
    }

    // Any 'small' items required
    if (stat_evs[2] > 0) {
      // Get the name of the item required
      const evSmallItem = `${evMons[game][stat]}`

      // Add the item, quantity to the list
      items[evSmallItem] = stat_evs[2];
    }
  }

  return items;
}

function get_ev_items(evs, game, items) {

  // Create the per-game modifier array
  const modifiers = [evModifierBig[game], evModifierSmall[game]];

  // Loop over the evs
  for (const stat in evs) {

    // Get the ev number for the stat
    const value = evs[stat];

    const stat_evs = get_stat_evs(value, modifiers, false);

    // Any 'big' items required
    if (stat_evs[0] > 0) {
      // Get the name of the item required
      const evBigItem = evIncreaseBig[stat];

      // Add the item, quantity to the list
      items[evBigItem] = stat_evs[0];
    }

    // Any 'small' items required
    if (stat_evs[1] > 0) {
      // Get the name of the item required
      const evSmallItem = evIncreaseSmall[stat];

      // Add the item, quantity to the list
      items[evSmallItem] = stat_evs[1];
    }
  }

  return items
}

function get_iv_items(ivs, items) {

  // Loop over the ivs
  for (const stat in ivs) {
    // Get the ev number for the stat
    const value = ivs[stat];

    // Value less than 31
    if (value < 31) {

      // If stat is less than 15, and has
      // an iv-zeroing item associated
      if (value < 15 && stat in ivMin) {

        // Get the iv-min item required
        const ivMinItem = ivMin[stat];

        // Add the iv-min item to the list
        items[ivMinItem] = 1;

        // Non-zero ivs
        if (value > 0) {
          // Add the iv increasing item required
          const ivIncreaseItem = ivIncrease[stat];
          items[ivIncreaseItem] = value;
        }
      }
      else // Value over 15/stat not in iv min
      {
        // Get the number of items required
        const ivReduce = 31 - value;

        // At least one item required
        if (ivReduce > 0) {
          // Get the iv-reducing item required
          const ivReduceItem = ivDecrease[stat];
          items[ivReduceItem] = ivReduce;
        }
      }
    }
  }

  return items
}

function init(game) {
  // Enable or disable Pokerus
  const pokerus = document.getElementById('pokerus');

  // Game does not support pokerus
  if (usePkrs[game] === false) {
    // Clear and disable cb
    pokerus.disabled = true;
    pokerus.checked = false;
  } else {
    // Enable the checkbox
    pokerus.disabled = false;
  }

  // Clear instructions div
  const parent = document.getElementById('instructions');
  parent.innerHTML = "";
}

// Instructions Generator
function generate() {

  // Get the game to generate instructions for
  const game = document.getElementById('game').value;

  // Reset instructions
  init(game);

  // Parse the showdown set export
  const sets = parseShowdownExport();

  // Set number
  let setNo = 1;

  // Loop over all of the sets
  for (const set of sets) {

    // Set is not null
    if (set !== null) {

      // Items Table
      // Format: 
      // key = item name
      // value = quantity
      let items = {
        // Required to reset existing evs
        "Fresh Start Mochi (Optional)": 1
      }

      // Get the nature from the set
      const nature = set.nature.toLowerCase();

      // Nature is valid
      if (nature in natureMint) {
        // Add the mint to the items (Optional)
        items[`${natureMint[nature]} (Optional)`] = 1;
      }

      // Tera Type provided
      const teraType = set.other["tera type"];
      console.log(teraType);
      if (teraType) {
        // Add tera shards to the items (Optional, SV Only)
        items[`${teraType} Tera Shards (Optional, SV Only)`] = 50;
      }

      // Get the pokerus value from the checkbox
      const pokerus = document.getElementById('pokerus').checked;

      switch (game) {
        // Sword & Shield Battles
        case 'bss':
        // Scarlet & Violet Battles
        case 'bsv':
          items = get_ev_battles(set.evs, game, items, pokerus);
          break;
        // Sword & Shield Jobs
        case 'jobs': {
          items = get_ev_jobs(set.evs, items, pokerus);
        }; break;
        default: {
          // Game-Specific
          switch (game) {
            // Main Series
            case 'main': {
              // Add Bottle Caps
              items["Bottle Caps / Gold Bottle Cap (Optional)"] = 1;
            }; break;

            // Emerald Battle Revolution
            case 'ebr': {
              // Add Bottle Cap
              items["Bottle Cap (Optional)"] = 1;

              // Get the iv items for the game, set
              items = get_iv_items(set.ivs, items);
            }; break;
          }

          // Get the ev items for the game, set
          items = get_ev_items(set.evs, game, items);
        }; break;
      }

      // Create the item table, increment set number
      createItemTable(set, setNo++, items);
    }
  }
}

// Load Main
init('main');