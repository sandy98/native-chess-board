onmessage = m => {
    console.log(`gameloader.js as worker: Message received from main script: '${m.data}'`);
    const filename  = m.data;
    import('./chess-rules.js')
    .then(m => {
        const { pgnReader } =  m;
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
    });
}
 