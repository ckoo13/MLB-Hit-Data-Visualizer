const mookieDescription = "Markus Lynn 'Mookie' Betts (born October 7, 1992) is an American professional baseball right fielder for the Los Angeles Dodgers of Major League Baseball (MLB). He previously played for the Boston Red Sox. In 2018, while with the Red Sox, he became the first player in MLB history to win the Most Valuable Player, Silver Slugger, Gold Glove, batting title, and World Series in the same season.";
const tatisDescription = "Fernando Gabriel Tatís Medina Jr., nicknamed 'El Niño' or 'Bebo', is a Dominican professional baseball shortstop and outfielder who plays for the San Diego Padres of Major League Baseball. He is the son of former MLB player Fernando Tatís Sr. Tatís Jr. stands 6 feet 3 inches tall and weighs 217 pounds.";
const troutDescription = "Michael Nelson Trout is an American professional baseball center fielder for the Los Angeles Angels of Major League Baseball. Trout is a ten-time MLB All-Star, three-time American League Most Valuable Player, and is an eight-time winner of the Silver Slugger Award.";
const seagerDescription = "Corey Drew Seager, nicknamed 'Seags', is an American professional baseball shortstop for the Texas Rangers of Major League Baseball. Seager was selected by the Los Angeles Dodgers in the first round of the 2012 Major League Baseball draft, and he made his major league debut in 2015.";
const machadoDescription = "Manuel Arturo Machado is an American professional baseball third baseman and shortstop for the San Diego Padres of Major League Baseball. Machado made his MLB debut in August 2012. Machado had his breakout year in 2013, earning a spot on the American League (AL) All-Star team on his way to leading the league in doubles with 51. He was also recognized as one of the best fielders in the game, winning a Gold Glove Award.";
const harperDescription = "Bryce Aron Max Harper is an American professional baseball right fielder and designated hitter for the Philadelphia Phillies of Major League Baseball. He played in MLB for the Washington Nationals from 2012 through 2018. He has been touted as a 'five-tool player'."
const acunaDescription = "Ronald José Acuña Blanco Jr. is a Venezuelan professional baseball outfielder for the Atlanta Braves of Major League Baseball. He made his MLB debut in 2018, and won the National League Rookie of the Year Award."
const altuveDescription = "José Carlos Altuve is a Venezuelan professional baseball second baseman for the Houston Astros of Major League Baseball. The Astros signed Altuve as an amateur free agent in 2007, and he made his major league debut in 2011."
const freemanDescription = "Frederick Charles Freeman is an American professional baseball first baseman for the Los Angeles Dodgers of Major League Baseball. Previously, Freeman played for the Atlanta Braves for 12 seasons. He made his MLB debut in 2010 and is a six-time MLB All-Star."
const jramDescription = "José Enrique Ramírez is a Dominican professional baseball third baseman for the Cleveland Guardians of Major League Baseball. He signed with the Indians as an amateur free agent on November 26, 2009, and made his MLB debut on September 1, 2013."
const judgeDescription = "Aaron James Judge is an American professional baseball outfielder for the New York Yankees of Major League Baseball. Judge was unanimously selected as the American League Rookie of the Year in 2017 and finished second in voting for the AL Most Valuable Player Award."
const ohtaniDescription = "Shohei Ohtani, nicknamed 'Shotime', is a Japanese professional baseball pitcher, designated hitter and outfielder for the Los Angeles Angels of Major League Baseball. He previously played for the Hokkaido Nippon-Ham Fighters of Nippon Professional Baseball's Pacific League."
const sotoDescription = "Juan José Soto Pacheco, nicknamed 'Childish Bambino', is a Dominican professional baseball outfielder for the Washington Nationals of Major League Baseball. Soto signed with the Nationals as an international free agent in 2015. He made his MLB debut in 2018 and was the runner-up for the NL Rookie of the Year Award."

export const generatePlayerSection = () => {
    const players = ['mookie', 'tatis', 'trout', 'seager', 'machado', 'harper', 'acuna', 'altuve', 'freeman', 'jram', 'judge', 'ohtani', 'soto'];
    const names = ['Mookie Betts', 'Fernando Tatis', 'Mike Trout', 'Corey Seager', 'Manny Machado', 'Bryce Harper', 'Ronald Acuna', 'Jose Altuve', 'Freddie Freeman', 'Jose Ramirez', 'Aaron Judge', 'Shohei Ohtani', 'Juan Soto'];

    const descriptions = [];

    descriptions.push(mookieDescription);
    descriptions.push(tatisDescription);
    descriptions.push(troutDescription);
    descriptions.push(seagerDescription);
    descriptions.push(machadoDescription);
    descriptions.push(harperDescription);
    descriptions.push(acunaDescription);
    descriptions.push(altuveDescription);
    descriptions.push(freemanDescription);
    descriptions.push(jramDescription);
    descriptions.push(judgeDescription);
    descriptions.push(ohtaniDescription);
    descriptions.push(sotoDescription);

    // for each player we create a section div that we append to the corresponding container
    for (let i = 0; i < players.length; i++) {
        let container = document.getElementById(`section-${players[i]}`);

        let sectionDiv = document.createElement('div');
        sectionDiv.classList.add('player-section');

        let playerName = document.createElement('div');
        playerName.classList.add('player-name');
        playerName.innerHTML = names[i];

        let playerHeadshot = document.createElement('div');
        let headshot = document.createElement('img');
        playerHeadshot.classList.add('player-headshot');
        headshot.classList.add('headshot');
        headshot.src = `./assets/slideshow/${players[i]}.png`
        playerHeadshot.appendChild(headshot)

        let bioText = document.createElement('div');
        bioText.classList.add('bio-text');
        bioText.innerHTML = descriptions[i];

        sectionDiv.appendChild(playerName);
        sectionDiv.appendChild(playerHeadshot);
        sectionDiv.appendChild(bioText);

        let graphContainer = document.getElementById(`graph-container-${i}`)
        console.log(graphContainer)
        container.appendChild(sectionDiv);
        container.insertBefore(sectionDiv, graphContainer);
    }
}

document.addEventListener('DOMContentLoaded', e => {
    generatePlayerSection();
})