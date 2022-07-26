let hitterData;

d3.csv('mookie_tatis_trout.csv', d => {
    return {
       player_name: d['player_name'],
       hit_type: d['events'],
       description: d['des'],
       contact_type: d['bb_type'],
       season: d['game_year'],
       hit_distance: d['hit_distance_sc'],
       exit_velo: d['launch_speed'],
       launch_angle: d['launch_angle'],
       pitch_name: d['pitch_name']
    };
}).then(data => {
    hitterData = data;

    console.log(hitterData);

    //looping through and creating visualizations for everything later

    //createChart(hitterData[0], 0, true);

    //for (let i = 1; i < hitterData.length; i++) {
        //createChart(hitterData[i], i);
    // }
});

const createChart = (hitterData, idx, createXAxisBool) => {
    let width = 800;
    let height = 600;
    let padding = 50;
    let margin = {left: 50, top: 80, bottom: 30, right: 40};


}