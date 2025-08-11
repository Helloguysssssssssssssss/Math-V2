const fs = require("fs");
const path = require("path");

const mainFile = "index.html"; // Your main HTML file
const outputFile = "singlefile.html"; // Final packed site

// Read main HTML
let mainHTML = fs.readFileSync(mainFile, "utf8");

// Game names in your button list
const gameNames = [ "funny shooter 2","snail bob","spacebar clicker","sonic revert","sprunki","sprunki clicker","stackball.io","subway surfers:barcelona", "subway surfers:beijing","subway surfers:berlin","subway surfers:bueno aires","subway surfers:havana","subway surfers:houston","subway:surfers:iceland", "subway surfers:london","subway surfers:mexico","subway surfers:miami","subway surfers:new orleans","subway surfers:monaco",  "subway:surfers:san francisco", "subway surfers:st.petersburg","subway surfers:winter holiday","subway surfers:zurich","super mario 63","suika game","super mario bros","tasty planet", "temple run 2","The Impossible Game","The Impossible Quiz","The Impossible Quiz 2","The Impossible Quizmas","The Impossible Quiz book chapter 1", "The Impossible Quiz book chapter 2","The Impossible Quiz book chapter 3","there is no game","line rider","shift","shift 2","bad ice cream", "fancy pants adventure","fancy pants adventure 2","fancy pants adventure 3","Stickman hook","fancy pants adventure 4 part 2","portal(flash)","stick RPG", "troll face quest","troll face quest 2","troll face quest 3","troll face quest 4","troll face quest 5","troll face quest sports","troll face quest trolltube", "troll face quest video games","troll face quest video games 2","troll face quest tv shows","troll face quest internet memes","troll face quest 13","unfair mario", "uno","vex 1","vex 2","vex 3","vex 4","vex 3 xmas","vex 6","vex 7","vex 8","vex challenges","vex x3m 1","vex x3m 2","whack your boss","whack your computer", "whack the theif","whack your ex (BROKEN)","whack your neighbor","whack your boss 2 (BROKEN)","whack the trump (BROKEN)","whack the terr@r!st (BROKEn)", "whack the cheater (BROKEN)","whack the serial killer (BROKEN)","whack the boss:superhero edition (BROKEN)","whack your teacher (BROKEN)", "whack your zombie neighbor","whack the burglars","whack the creeps","the visitor","the visitor returns","the visitor massacre at camp happy", "super smash flash","super smash flash 2","eaglecraft 1.8","Binding of Isaac Wrath of The Lamb", "Binding of Isaac - Wrath of the Lamb Eternal Edition","Binding of Isaac demo","eaglecraft 1.12.2","bloons","bloons 2","bloons player pack", "bloons player pack 2","bloons player pack 3","bloons player pack 4","bloons player pack 5","bloons pop 3","more bloons","even more bloons", "bloons 2 spring fling","bloons 2 christmas expansion","bloons junior pack","bloons insanity pack","Hot Air Bloon","Who wants to be an bloonionare", "bloons super monkey","Count masters (no saved progress)","man runner 2048 (no saves)","bloons TD 1","bloons TD 2","bloons TD 3","bloons TD 4", "bloons TD 4 expasion pack","bloons TD 5","FNAF pizzeria Simulator","FNAF ultimate custom night","FNAF sister location","fnaf World","deltarune","bendy and the ink machine CH1&2","undertale","sort the court","worlds hardest game","worlds hardest game 2","worlds hardest game 3","worlds hardest game 4","worlds easyest game"
 
];

// Build games object
let gamesObject = "const games = {\n";
gameNames.forEach((name, i) => {
  const fileName = `math${i + 1}.html`;
  if (fs.existsSync(fileName)) {
    let gameHTML = fs.readFileSync(fileName, "utf8")
      .replace(/\n/g, "") // Remove newlines
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/`/g, "\\`"); // Escape backticks for template literals

    gamesObject += `  "${name}": \`${gameHTML}\`,\n`;
  } else {
    gamesObject += `  "${name}": "<html><body><h1>Game Missing</h1></body></html>",\n`;
  }
});
gamesObject += "};";

// Insert loader code before </body>
const loaderCode = `
<div id="gameOverlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:black;">
  <button onclick="closeGame()" style="position:absolute; top:10px; right:10px; z-index:10;">Close</button>
  <iframe id="gameFrame" style="width:100%; height:100%; border:none;"></iframe>
</div>
<script>
${gamesObject}

function openGame(name) {
  const iframe = document.getElementById("gameFrame");
  const blob = new Blob([games[name]], {type: "text/html"});
  iframe.src = URL.createObjectURL(blob);
  document.getElementById("gameOverlay").style.display = "block";
}

function closeGame() {
  document.getElementById("gameOverlay").style.display = "none";
  document.getElementById("gameFrame").src = "";
}

// Hook buttons
document.querySelectorAll(".game-button").forEach((btn, i) => {
  btn.onclick = () => openGame("${gameNames[i]}");
});
</script>
`;

mainHTML = mainHTML.replace("</body>", loaderCode + "\n</body>");

// Write final single HTML
fs.writeFileSync(outputFile, mainHTML, "utf8");
console.log("✅ Packed into", outputFile);
