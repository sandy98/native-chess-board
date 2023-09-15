// class HTMLElement {}

// const window = {
//     customElements: {
//         define(id, _) {return id;}
//     }
// };

let pgnReader;
import('../chess-rules.js')
.then(m => {
    pgnReader = m.pgnReader
    console.log(`pgnReader constructor is ${pgnReader.constructor.name}`);
});


onmessage = m => {
    console.log(`gameloader.js as worker: Message received from main script: '${m.data}'`);
    const filename  = m.data;
    fetch(filename)
    .then(data => data.text())
    .then(pgn => {
        if (pgn.length < 1000) {
            throw new Error(`ERROR: Recovered this PGN data: '''${pgn}'''.`);
        } else {
            //postMessage(`Recovered this PGN data length: '''${pgn.length}'''`);
            pgnReader(filename)
            .then(genGames => {
                let done = false;
                while (!done) {
                    const g = genGames.next();
                    //console.log(g);
                    done = g.done;
                    //console.log(done);
                    const game = g.value;
                    if (game) {
                        // console.log(game.title);
                        postMessage(game.toJson());
                    }
                }
            })
            .catch(e => postMessage(`pgnReader ERROR: ${e}`))
        }
    })
    .catch(e => postMessage(`ERROR  in worker: '${e}'`))
  }