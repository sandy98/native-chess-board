
import {
    versionInfo, version, onePixel, classicSet, asciiBoard,
    svg_figures, blackFigures, whiteFigures, defaultFen, boardColors, MoveEvaluation, 
    isOdd, isEven,rowcol2name, square2san, san2square,  
    index2rowcol, isDarkSquare, fen2obj, obj2fen, fenPos2short, fenPos2long, 
    rPosFromFen, ChessValidator, FakeValidator, ChessGame, assortedFens
 } from './chess-rules.js';

export const boardModes = {
    analysis: 1,
    view: 2,
    play: 3,
    setup: 4
} 


export class ChessBoard extends HTMLElement {
    constructor() {
        super();
        this.version = version;
        this.versionInfo = versionInfo;
        this.selectedSquare = 64;
        this._validator = new ChessGame();
        this.defaultPos = `rnbqkbnrpppppppp${'0'.repeat(32)}PPPPPPPPRNBQKBNR`;
        this.automaticPromotion = null;
        this.current = 0;
        this.rows = 8;
        this.cols = 8;
        this.root = this.attachShadow({mode: 'closed'});
        this.appliedStyle = document.createElement('style');
        this.root.appendChild(this.appliedStyle);
        this.mainDiv = document.createElement('div');
        this.mainDiv.setAttribute("id", "main-div");
        this.mainDiv.className = 'main-container';
        this.root.appendChild(this.mainDiv);
        this.mainDiv.innerHTML = `
        <div
           id="promotion-dialog" 
           style="opacity: 1; display: none; border: solid 1px; padding: 0; top: 0px; left: 0px; position: absolute; z-index: 1007; flex-direction: column;"
        >
        </div>
            <div id="board-div" class="panel">
                <div id="the-board" class="board">
                </div>
            </div>
            <div id="accesories-panel" class="panel" style="display: flex;">
              <div id="card-panel" class="panel" style="display: flex; padding: 0;">
                <chess-card></chess-card>
              </div>
              <div id="setup-panel" class="panel" style="display: none; padding: 10px;">${this.setupPanel}</div>
            </div>
        </div>
     `;
    }

    get boardMode() {
        return +this.getAttribute("board-mode") || boardModes.analysis;
    }
    set boardMode(value) {
        if (value < boardModes.analysis || value > boardModes.setup) {
            throw new Error("Board Mode must be one of 'analysis', 'view', 'play', 'setup'.");
        }
        this.setAttribute('board-mode', value);
    }

    onclickReset = _ => {
        this.reset(new ChessGame(), `${this.root.querySelector('#cboFens').value}`);
    }

    handleAutopromotion = ev => {
        const figure = ev.target.getAttribute('figure') || ev.target.parentNode.getAttribute('figure');
        if (figure === '0' || !figure) {
            this.automaticPromotion = null;
        } else {
            this.automaticPromotion = figure;
        }
    }

    get setupPanel() {
        let extraSquare = -12;
        const decamelize = str => str.replace(/([a-z])([A-Z0-9])/g, g => `${g[0]} ${g[1]}`)
                                  .replace(/^(.)/, g => `${g[0].toUpperCase()}`)

        const makeFiguresRow = (figures, backgr = 'dark') => {
            const backgr1 = backgr === 'dark' ? 'light' : 'dark';
            let figuresRow = `<div class="row">`;
            for (let f of figures) {
            figuresRow += `<div figure="${f}" number="${extraSquare++}" class="square ${isEven(figures.indexOf(f)) ? backgr : backgr1}">
            <img src="${classicSet[f]}" /></div>`
            }
            figuresRow += `</div>`
            return figuresRow;
        }

        let cboFens = `<select id="cboFens">`
        let index = 0;
        for (let fen in assortedFens) {
            cboFens += `<option ${index === 0 ? 'selected' : ''} 
                           value="${assortedFens[fen]}">${decamelize(fen)}</option>`
            index += 1;
        }
        cboFens += `</select>`

        const bFiguresRow = makeFiguresRow(blackFigures, 'light');
        const wFiguresRow = makeFiguresRow(whiteFigures, 'dark');
        const trashRow = `<div class="row" style="margin-top: 10px; display: flex; flex-direction: row; justify-content: center;">
                            &nbsp;
                            <div title="Delete figure" class="square light" style="border: solid 1px;" number="-13">${svg_figures.trashbin}</div>
                          </div>`

        const castling = this.castling.split('');
        const renglonStyle = 'style="margin: 2px; display: flex; flex-direction: row; justify-content: stretch; align-items: center;"';
        const castlingRow = `<div ${renglonStyle}>
          <span>Castling</span>&nbsp;&nbsp;&nbsp;
          <div class="square ${castling.includes('K') ? 'dark' : 'light'}" 
            id="w-king-castle-btn"
          >
            <img draggable="false" src="${classicSet.K}" />
          </div>
          <div class="square ${castling.includes('Q') ? 'dark' : 'light'}" 
            id="w-queen-castle-btn"
          >
            <img draggable="false" src="${classicSet.Q}" />
          </div>
          <div class="square ${castling.includes('k') ? 'dark' : 'light'}" 
            id="b-king-castle-btn"
          >
            <img draggable="false" src="${classicSet.k}" />
          </div>
          <div class="square ${castling.includes('q') ? 'dark' : 'light'}" 
            id="b-queen-castle-btn"
          >
            <img draggable="false" src="${classicSet.q}" />
          </div>
        </div>`;
        const activeColorRow = `<div ${renglonStyle}>
            <span>Active Color</span>&nbsp;&nbsp;&nbsp;
            <button id="active-color-btn"><img draggable="false" src="${this.activeColor === 'b' ? 
                classicSet.k : 
                classicSet.K}" />
            </button>
        </div>`;
        const humanSideRow = `<div ${renglonStyle}>
            <span>Human Side</span>&nbsp;&nbsp;&nbsp;
            <button id="human-side-btn"><img draggable="false" src="${this.humanSide === 'b' ? 
                classicSet.k : 
                classicSet.K}" />
            </button>
        </div>`;
        const promotionFigures = this.activeColor === 'w' ? 'QRBN' : 'qrbn';
        const automaticPromotionRow = `
            <div ${renglonStyle}>
              <span>Automatic Promotion</span>&nbsp;&nbsp;&nbsp;
              <div title="No automatic promotion" figure="0" class="square ${!this.automaticPromotion ? 'dark' : 'light'} autoprom">
                ${svg_figures.navail}
              </div>
              <div title="Queen" figure="Q" class="square ${this.automaticPromotion === 'Q' ? 'dark' : 'light'} autoprom">
                <img src="${classicSet[promotionFigures[0]]}" />
              </div>
              <div title="Rook" figure="R" class="square ${this.automaticPromotion === 'R' ? 'dark' : 'light'} autoprom">
                <img src="${classicSet[promotionFigures[1]]}" />
              </div>
              <div title="Bishop" figure="B" class="square ${this.automaticPromotion === 'B' ? 'dark' : 'light'} autoprom">
                <img src="${classicSet[promotionFigures[2]]}" />
              </div>
              <div title="Knight" figure="N" class="square ${this.automaticPromotion === 'N' ? 'dark' : 'light'} autoprom">
                <img src="${classicSet[promotionFigures[3]]}" />
              </div>
            </div>
        `
        const html = `
            <!--<h2 style="color: cadetblue;">Chessboard Setup Panel</h2>-->
        <div id="setup-panel-container" style="overflow-y: auto;">
            <div class="renglon">
              <button id="setup-reset-btn">Reset</button>&nbsp;&nbsp;&nbsp;${cboFens}
            <div>
            <div style="max-height: 0.5vw;">&nbsp;</div>
            <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
              <div style="width: 15%; max-width: 15%; display: flex; flex-direction: column; justify-content: stretch; align-items: space-around;">
                ${trashRow}
              </div>
              <div style="width: 60%; max-width: 60%; display: flex; flex-direction: column; justify-content: stretch; align-items: space-around;">
                ${bFiguresRow}
                ${wFiguresRow}
              </div>
            </div>
            <div style="max-height: 0.5vw;">&nbsp;</div>
            ${castlingRow}
            <div style="max-height: 0.5vw;">&nbsp;</div>
            ${activeColorRow}
            <div style="max-height: 0.3vw;">&nbsp;</div>
            <div class="renglon">
              <span style="font-size: 0.8vw;">FEN</span>&nbsp;
              <span style="user-select: text; font-size: 0.8vw; padding-left: 3px; padding-right: 3px; border: solid 1px;">${this.fen}</span>
            </div>
            <div style="max-height: 0.5vw;">&nbsp;</div>
            ${humanSideRow}
            <div style="max-height: 0.5vw;">&nbsp;</div>
            ${automaticPromotionRow}
        </div>
        `
        return html;
    }

    get humanSide() {
        return this.getAttribute('human-side') || 'w';
    }
    set humanSide(value) {
        if (!['w', 'b'].includes(value)) return;
        this.setAttribute('human-side', value);
    }


    get squares() {
        return this.root.querySelectorAll('.row .square');
    } 

    get figures() {
        return this.root.querySelectorAll('.row .square img');
    }
    
    get activeColor() {
        const { activeColor } = fen2obj(this.validator.fens[this.current]);
        return activeColor;
    }

    get enPassant() {
        const { enPassant } = fen2obj(this.validator.fens[this.current]);
        return enPassant;
    }

    get castling() {
        const { castling } = fen2obj(this.validator.fens[this.current]);
        return castling;
    }

    get position() {
        const { fenPos } = fen2obj(this.validator.fens[this.current]);
        return fenPos2long(fenPos);
    }

    get validator() {
        if (!this._validator) this._validator = new ChessGame();
        return this._validator;
    }

    set validator(value) {
        const valid = !!value && value.move && typeof(value.move) === 'function' && value.fens;
        if (!valid) throw new Error('Validator must be an object with a "move" function and an array of "fen" strings.');
        this._validator = value;
        //this.reset(this.validator.fens[0]);
        this.current = 0; 
        this.renderHtml();
    }

    get style() {
        const [widthFactor, heightFactor] = window.innerWidth > window.innerHeight ? [2, 1] : [1, 2];
        const flexDirection = widthFactor > 1 ? 'row' : 'column';
        console.log(`widthFactor: ${widthFactor} 
                     heightFactor: ${heightFactor} 
                     flexDirection: ${flexDirection}`);

        return `
        :host {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 110%;
            user-select: none;
        }
        .square img {
            cursor: grab;
        }
        .square.promotion img {
            cursor: pointer;
        }
        .autoprom {
            cursor: pointer;
        }
        .main-container {
            width: ${this.boardSize * widthFactor + 0}px;
            min-width: ${this.boardSize * widthFactor + 0}px;
            height: ${this.boardSize * heightFactor + 0}px;
            min-height: ${this.boardSize * heightFactor + 0}px;
            display: flex;
            flex-direction: ${flexDirection};
            justify-content: stretch;
            align-items: stretch;
            background: inherit;
            user-select: none;
        }
        .panel {
            width: ${this.boardSize + 0}px;
            min-width: ${this.boardSize + 0}px;
            height: ${this.boardSize + 0}px;
            min-height: ${this.boardSize + 0}px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: auto;
            background: whitesmoke;
            z-index: 1;
            overflow: hidden;
        }
        .board {
            width: ${this.boardSize}px;
            min-width: ${this.boardSize}px;
            max-width: ${this.boardSize}px;
            height: ${this.boardSize}px;
            min-height: ${this.boardSize}px;
            max-height: ${this.boardSize}px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            background: whitesmoke;
            z-index: 2;
            border: solid 1px black;
            margin-right: 2px;
            overflow: hidden;
        }
        .row {
            width: ${this.boardSize / 8}px;
            min-width: ${this.boardSize / 8}px;
            max-width: ${this.boardSize / 8}px;
            height: ${this.boardSize / 8}px;
            min-height: ${this.boardSize / 8}px;
            max-height: ${this.boardSize / 8}px;
            display: flex;
            flex-direction: row;
        }
        .square {
            width: ${this.boardSize / 8}px;
            min-width: ${this.boardSize / 8}px;
            max-width: ${this.boardSize / 8}px;
            height: ${this.boardSize / 8}px;
            min-height: ${this.boardSize / 8}px;
            max-height: ${this.boardSize / 8}px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            z-index: 3;
        }
        .square[number="${this.selectedSquare}"] {
            background: ${this.selectedBackground};
        }


        .dark {
            background:  ${boardColors[this.backgroundSchema].dark};
        }

        .light {
            background: ${boardColors[this.backgroundSchema].light};
        }

        `
    }


    async copyFen(fen = this.fen) {
        // const permissionState = await navigator.permissions.query()
        console.log("Will try to copy position to clipboard");        
        try {
            await navigator.clipboard.writeText(fen);
            console.log("Fen text copied to clipboard");
            return fen;
        } catch(e) {
            console.error("Error while copying position to clipboard: " + e);
            return e;
        }      
    }

    get selectedBackground() {
        switch (this.backgroundSchema) {
            case 'acqua':
            case 'blue':
                return "#00ff00";
            case 'green':
                return "#0000ff";
            default:
                return "#ff0000";
        }
    }

    get selectedSquare() {
         return this.getAttribute("selected-square") === null ? 64 : +this.getAttribute("selected-square");
    }
    set selectedSquare(value) {
        if (value < -12 || value > 64) throw new Error('Incorrect index for square.\nMust be between 0 and 63 to select or 64 to unselect.');
        this.setAttribute("selected-square", value);
    }

    get backgroundSchema() {
        return this.getAttribute('background-schema') || 'blue';
    }
    set backgroundSchema(newSchema) {
        if (!(newSchema in boardColors)) throw new Error("Unknown color schema.");
        this.setAttribute('background-schema', newSchema);
    }

    get boardSize() {
        return +this.getAttribute('board-size') || 600;
    }
    set boardSize(newSize) {
        this.setAttribute('board-size', newSize);
    }

    get flipped() {
        return this.getAttribute('flipped') !== null;
    }
    set flipped(value) {
        if (!!value) {
            this.setAttribute('flipped', '');
        } else {
            this.removeAttribute('flipped');
        }
    }
    flip() { this.flipped = !this.flipped;}

    get debug() {
        return this.getAttribute('debug') !== null;
    }
    set debug(value) {
        if (!!value) {
            this.setAttribute('debug', '');
        } else {
            this.removeAttribute('debug');
        }
    }

    get automaticPromotion() {
        return this.getAttribute("automatic-promotion");
    }
    set automaticPromotion(value) {
        if ('QRBN'.indexOf(value) === -1 && value !== null) throw new Error("Promotion figure must be one of 'Q', 'R', 'B', 'N', or null.");
        if (!value) {
            this.removeAttribute('automatic-promotion');
        } else {
            this.setAttribute('automatic-promotion', value);
        }
    }

    render() {
        this.renderStyle();
        this.renderHtml();
    }

    renderStyle() {
        this.appliedStyle.textContent = this.style;
        this.emitRepaint('style');
    }

    renderHtml() {
        this.removeListeners();
        // this.mainDiv.innerHTML = this.html;
        const { promotionDialogContent, boardRows } = this.html;
        this.the_board && (this.the_board.innerHTML = boardRows);
        this.promotionDialog && (this.promotionDialog.innerHTML = promotionDialogContent);
        this.chessCard && this.chessCard.render && this.chessCard.render();
        this.root.querySelector('#setup-panel').innerHTML = this.setupPanel;
        this.addProperties();
        this.addListeners();
        this.emitRepaint('content');
    }

    get html() {
        const flexDirection = this.activeColor === 'w' ? (this.flipped ? 'column-reverse' : 'column') : (this.flipped ? 'column' : 'column-reverse');
        const position = this.position;
        const xor = this.flipped ? 63 : 0;
        const xor_row = this.flipped ? 0 : 7;
        const xor_col = this.flipped ? 7 : 0;
        let boardRows = ``;
        for (let r = 0; r < 8; r += 1 ) {
            const row = r ^ xor_row;
            boardRows +=  `<div class="row" index="${row}">`
            for (let c = 0; c < 8; c += 1) {
                const col = c ^ xor_col;
                const number = row * 8 + col;
                const sqName = square2san(number);
                const sqIndex = (r * 8 + c) ^ xor;
                const figure = position[sqIndex];
                const backColor = (isEven(r) && isEven(c)) || (isOdd(r) && isOdd(c)) ? 'light' : 'dark'
                const sqSize = this.boardSize / 8;
                const sqContent =  figure === '0' ? '' : `<img  style="cursor:${this.canHumanMove(number) ? 'grab' : 'not-allowed'}" width="${sqSize}px" height="${sqSize}px" src="${classicSet[figure]}" />`
                boardRows += `<div 
                          class="square ${backColor}" 
                          index="${sqIndex}" 
                          number="${number}" 
                          row="${row}" 
                          col="${col}"
                          figure="${figure}"
                          ${this.debug ? 'title' : 'aria-label'}="${sqName}"
                         >
                           ${sqContent}
                         </div>`
            }
            boardRows += `</div>`;
        }

        this.promotionDialog.style.flexDirection = flexDirection;
        let promotionDialogContent = ``;
        const figures = this.activeColor === 'w' ? 'QRBN' : 'qrbn';
        for (let n = 0; n < 4; n += 1) {
            promotionDialogContent += `
          <div 
            class="square promotion" 
            figure="${figures[n]}"
            style="border: none;"
            >
            <img
              draggable="false" 
              src="${classicSet[figures[n]]}"
              width="${this.squareSize}px" 
              height="${this.squareSize}px"
            />
          </div>
            `
        }
        
        return { promotionDialogContent, boardRows};
        
     }

    emitRepaint(reason = "content") {
        const ev = new CustomEvent('repaint', {detail: {reason, current: this.current}});
        this.dispatchEvent(ev);
    }

    static get observedAttributes() {
        return ['human-side', 
                'board-mode', 
                'selected-square', 
                'board-size', 
                'flipped', 
                'background-schema',
                'automatic-promotion'
               ];
    }

    static get boardModes() {
        return boardModes;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        this.debug && console.log(`'${name}' has changed from '${oldValue}'  to '${newValue}' `);

        if (name === 'board-mode') {
            if (+newValue === boardModes.setup) {
                this.root.querySelector('#setup-panel').style.display = 'flex';
                this.root.querySelector('#card-panel').style.display = 'none';
            } else {
                this.root.querySelector('#setup-panel').style.display = 'none';
                this.root.querySelector('#card-panel').style.display = 'flex';
            }
            this.renderHtml();
        }

        if (name === 'human-side') {
            if (newValue === 'b') {
                this.flipped = true;
            } else {
                this.flipped = false;
            }
            this.renderHtml();
        }

        if (name === 'background-schema' || name === 'selected-square') {
            return this.renderStyle();
        }

        if (name === 'flipped' || name === 'automatic-promotion') {
            return this.renderHtml();
        }

        if (name === 'board-size') {
            this.render();
            return this.emitRepaint('resize');
        }
    }

    get chessCard() {
        return this.root.querySelector("chess-card");
    }

    connectedCallback() {
        this.the_board = this.root.querySelector('#the-board');
        if (this.chessCard) {
            this.debug && console.log("Chess card detected, setting it up.");
            this.chessCard.parent = this;
        }
        window.addEventListener('resize', this.checkLimits);
        this.mainDiv.addEventListener('contextmenu', this.oncontextMenu);
        this.mainDiv.addEventListener('dblclick', this.dblclick);
        this.debug && console.log("Connected to DOM. Now rendering...");
        this.render();
        this.checkLimits();
    }

    disconnectedCallback() {
        window.removeEventListenerEventListener('resize', this.checkLimits);
        this.mainDiv.removeEventListener('contextmenu', this.oncontextMenu);
        this.mainDiv.removeEventListener('dblclick', this.dblclick);
        this.debug && console.log("Diconnected from DOM. Bye for now...");
        this.removeListeners();
    }

    adoptedCallback() {
        
    }

    dblclick = ev => {
        ev && ev.stopPropagation();
        ev && ev.preventDefault();
        this.flip();
    }

    asciiDiagram(fen = this.fen) {
        let pos = 0;
        let asciiBoardArray = asciiBoard.split('');
        const len = asciiBoardArray.length;
        const { fenPos } = fen2obj(fen);
        const lfenPos = fenPos2long(fenPos);
        for (let n = 0; n < len; n += 1) {
            if (asciiBoardArray[n] === '.') {
                const realPos = this.flipped ? pos ^ 63 : pos;
                asciiBoardArray[n] = lfenPos[realPos] === '0' ? ' ' : lfenPos[realPos];
                pos += 1;
                if (pos === 64) break;
            }
        }
        return asciiBoardArray.join('');
    }

    imageDiagram(percent = 60 , fen = this.fen) {
        const size = percent * this.boardSize / 100;
        const sqSize = size / 8;
        const canvas = document.createElement('canvas');
        canvas.style.margin = '10px';
        canvas.setAttribute("width", size);
        canvas.setAttribute("height", size);
        canvas.style.width = `${size}px`;
        canvas.style.minWidth = `${size}px`;
        canvas.style.height = `${size}px`;
        canvas.style.minHeight = `${size}px`;
        canvas.style.border = 'solid 1px black';
        const ctx = canvas.getContext('2d');

        const { fenPos } = fen2obj(fen);
        const lfenPos = fenPos2long(fenPos);

        for (let y = 0; y < 8; y += 1) {
            for (let x = 0; x < 8; x += 1) {
                const index = (y * 8 + x) ^ (this.flipped ? 63 : 0);
                ctx.fillStyle = isDarkSquare(index) ? 
                boardColors[this.backgroundSchema].light :
                boardColors[this.backgroundSchema].dark;
                ctx.fillRect(x * sqSize, y * sqSize, sqSize, sqSize);
                if (lfenPos[index] !== '0') {
                    const image = new Image(sqSize, sqSize);
                    image.src = classicSet[lfenPos[index]];
                    ctx.drawImage(image, x * sqSize, y * sqSize, sqSize, sqSize);
                }
            }
        }
        return canvas;
    }

    figurineDiagram(fen = this.fen) {
        const mainDiv = document.createElement('div');
        mainDiv.style.margin = '5px';
        mainDiv.style.width = '16rem';
        mainDiv.style.minWidth = '16rem';
        mainDiv.style.height = '16rem';
        mainDiv.style.minHeight = '16rem';
        mainDiv.style.border = 'solid 1px black';
        mainDiv.style.display = 'flex';
        mainDiv.style.flexDirection = 'row';
        mainDiv.style.justifyContent = 'center';
        //mainDiv.style.alignItems = 'stretch';
        mainDiv.style.flexWrap = 'wrap';

        const { fenPos } = fen2obj(fen);
        const lfenPos = fenPos2long(fenPos);

        for (let y = 0; y < 8; y += 1) {
            for (let x = 0; x < 8; x += 1) {
                const index = (y * 8 + x) ^ (this.flipped ? 63 : 0);
                const square = document.createElement('div');
                square.style.width = '2rem';
                square.style.minWidth = '2rem';
                square.style.height = '2rem';
                square.style.minHeight = '2rem';
                square.style.border = 'none';
                square.style.display = 'flex';
                square.style.flexDirection = 'row';
                square.style.justifyContent = 'center';
                square.style.alignItems = 'center';
                square.style.background = isDarkSquare(index) ? 'white' : 'silver';
                if (lfenPos[index] !== '0') {
                    square.innerHTML = svg_figures[lfenPos[index]];
                }
                mainDiv.appendChild(square);
            }
        }
        return mainDiv;
    }

    showDiagram(type = "i", fen = this.fen, percent = 80) {
        if (!/^[if]$/.test(type.toLowerCase())) throw new Error(`Error in parameter 'type'. Unknown type of diagram "${type}". Must be one of 'i' or 'f'` );
        const dialog = document.createElement('dialog');
        dialog.style.padding = '0';
        const diagram = type === 'i' ? this.imageDiagram(percent, fen) : this.figurineDiagram(fen);
        dialog.appendChild(diagram);
        const cancelDialog = ev => {
            this.debug && console.log("Dismissing diagram dialog.");
            dialog.removeEventListener('cancel', cancelDialog);
            document.body.removeChild(dialog);
            return true;
        }
        dialog.addEventListener('cancel', cancelDialog);
        document.body.appendChild(dialog);
        dialog.showModal();
    }

    get fen() {
        return this.fens[this.current];
    }

    get(sq, fen = this.fen) {
        if (this.validator.isWrongFen(fen)) return null;
        if (typeof(sq) === 'string') sq = san2square(sq);
        if (sq < 0 || sq > 63) throw new Error(`Wrong square in 'get' function: '${square2san(sq)}'`)
        return rPosFromFen(fen)[sq];
    }

    set(sq, figure, fen = this.fen) {
        if (this.validator.isWrongFen(fen)) return false;
        if (typeof(sq) === 'string') sq = san2square(sq);
        if (sq < 0 || sq > 63) throw new Error(`Wrong square in 'set' function: '${square2san(sq)}'`)
        if (!figure || "pnbrqkPNBRQK0".indexOf(figure) === -1) throw new Error(`Wrong figure in 'set' function: '${figure}'`);
        const rpos = rPosFromFen(fen).split('');
        const fenobj = fen2obj(fen);
        rpos[sq] = figure;
        const fenpos = rpos.map((v, i) => v = rpos[i ^ 56]).join('');
        fenobj.fenPos = fenPos2short(fenpos);
        this.validator.fens[this.current] = obj2fen(fenobj);
        this.renderHtml();
        return true;
    }  

    toggleActiveColor = (_, fen = this.fen) => {
        const newActiveColor = this.activeColor === 'w' ? 'b' : 'w';
        const fenobj = fen2obj(fen);
        fenobj.activeColor = newActiveColor;
        const newFen = obj2fen(fenobj);
        this.validator.fens[this.current] = newFen;
        this.renderHtml();
    } 

    toggleHumanSide = (_, fen = this.fen) => {
        this.humanSide = this.humanSide === 'w' ? 'b' : 'w';
        this.renderHtml();
    } 

    toggleCastling = (fen = this.fen, color = 'w', side = 'k') => {
        let newCastling = this.castling;
        let arrCastling = new Array(4);
        if (newCastling.includes('K')) {
            arrCastling[0] = 'K';
        } else {
            arrCastling[0] = null;
        }
        if (newCastling.includes('Q')) {
            arrCastling[1] = 'Q';
        } else {
            arrCastling[1] = null;
        }
        if (newCastling.includes('k')) {
            arrCastling[2] = 'k';
        } else {
            arrCastling[2] = null;
        }
        if (newCastling.includes('q')) {
            arrCastling[3] = 'q';
        } else {
            arrCastling[3] = null;
        }

        const [toReplace, order] = color === 'w' ? (side === 'k' ? ['K', 0] : ['Q', 1]) : 
        (side === 'k' ? ['k', 2] : ['q', 3]);
        if (arrCastling.includes(toReplace)) {
            arrCastling[order] = null;
        } else {
            arrCastling[order] = toReplace;
        }
        newCastling = arrCastling.join('');
        if (!newCastling.length) newCastling = '-';

        const fenobj = fen2obj(fen);
        fenobj.castling = newCastling;
        const newFen = obj2fen(fenobj);
        this.validator.fens[this.current] = newFen;
        this.renderHtml();
    }

    toggleWKCastling = (_, fen = this.fen) => {
        this.toggleCastling(fen, 'w', 'k');
    }

    toggleWQCastling = (_, fen = this.fen) => {
        this.toggleCastling(fen, 'w', 'q');
    }
    
    toggleBKCastling = (_, fen = this.fen) => {
        this.toggleCastling(fen, 'b', 'k');
    }
    
    toggleBQCastling = (_, fen = this.fen) => {
        this.toggleCastling(fen, 'b', 'q');
    }
    
    unset(sq, fen = this.fen) {
        this.set(sq, '0', fen);
    }

    reset = (validator = new ChessGame(), fen = defaultFen) => {
        //this.validator.reset(fen);
        this.validator = validator;
        this.validator.fens = [fen];
        this.current = 0;
        this.renderHtml();
    }

    undo = () => {
        this.validator.undo();
        this.goto();
    }

    goto = (where = this.validator.fens.length - 1) => {
        const oldCurrent = this.current;
        if (where > this.validator.fens.length - 1) {
            throw new Error("Index out of range.")
        }
        if (where < 0) where = this.validator.fens.length - 1;
        //this.fen = this.validator.fens[where];
        this.current = where;
        if (this.current !== oldCurrent || this.validator.constructor.name === 'FakeValidator') {
            const ev = new CustomEvent('changepos', {detail: this.current});
            this.dispatchEvent(ev);
            this.renderHtml();
        }
        return this.current;
    }

    prev = () => this.goto(this.current - 1)

    next = () => this.current < (this.validator.fens.length - 1) ? this.goto(this.current + 1) : null
    
    replay = (interval = 1) => {
        this.goto(0);
        for (let n = 1; n < this.fens.length; n += 1) {
            setTimeout(() => this.next(), interval * n * 1000);
        } 
    }

    checkLimits = _ => {
        if (this.boardSize > window.innerWidth) {
            this.boardSize = window.innerWidth;
        }
        this.renderStyle();
    }

    static offset = el => {
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }
    
    get fens() {return this.validator.fens;}
    get sansInfo() {return this.validator.sansInfo;}
    get sans() {return this.validator.sans;}
    get moves() {return this.validator.moves;}
    get squareSize() {return +this.boardSize / this.rows; } 
    get left() { return ChessBoard.offset(this.mainDiv).left; }
    get top() { return ChessBoard.offset(this.mainDiv).top; }

    get promotionDialog() { return this.mainDiv.querySelector("#promotion-dialog"); }

    get promotionDialogTargets() { return this.mainDiv.querySelectorAll("#promotion-dialog div.square"); }

    showPromotionDialog = (from, to) => {
        const dark = boardColors[this.backgroundSchema].dark;
        const light = boardColors[this.backgroundSchema].light;
        const squares = this.promotionDialog.querySelectorAll("div.square");
        const top = this.activeColor === 'w' ? (this.flipped ? this.top + this.squareSize * 4 : this.top) : (this.flipped ? this.top : this.top + this.squareSize * 4);
        this.promotionDialog.style.top = `${top}px`;
        const col = index2rowcol(to).col;
        const left = this.left + (this.flipped ? col ^ 7 : col) * this.squareSize;
        this.promotionDialog.style.left = `${left}px`;
        // this.debug && console.log(isDarkSquare(to) ? "Going to DARK." : "Going to LIGHT.");
        squares.forEach(sq => sq.style.background = isDarkSquare(to) ? dark : light) 
        this.promotionDialog.from = from;
        this.promotionDialog.to = to;
        this.squares.forEach(sq => sq.style.opacity = 0.4)
        this._waitingForPromotion = true;
        this.promotionDialog.style.display = 'flex';
        //this.promotionDialog.showModal();
    }

    oncanceldialog = ev => {
        // this.debug && console.log("Cancel Key bypassed.");
        ev.preventDefault();
        return false;
    }

    onclickdialog = ev => {
        const target = ev.target === 'HTMLDivElement' ? ev.target : ev.target.parentNode;
        const figure = target.getAttribute("figure");
        this.promotionDialog.style.display = 'none'; 
        this.squares.forEach(sq => sq.style.opacity = 1)
        this._waitingForPromotion = false;
        this.tryMove(this.promotionDialog.from, this.promotionDialog.to, figure);
    } 

    oncontextMenu = ev => {
        if (this.debug) return true;
        ev.stopPropagation();
        ev.preventDefault();
        return false;
    }

    tryMove = (from, to, promotion = this.automaticPromotion) => {
        
        if(typeof(from) !== 'string' && from && to) {
            if (to < 0) return this.selectedSquare = 64;
            if (from < 0 || to < 0 || from > 63 || to > 63) throw new Error("Squares out of range. Both 'from' and 'to' must be between 0 and 63.");
        }
    
       if (this.current !== this.validator.fens.length - 1) return false;
        
       this.selectedSquare = 64;
       const response = typeof(from) === 'string' ? 
       this.validator.strMove(from) :
       this.validator.move(from, to, promotion);

        if (response === MoveEvaluation.INCOMPLETE_INFO) {
            this.showPromotionDialog(from, to);
            return false;
        } else if (response === MoveEvaluation.INVALID_MOVE) {
            return false;
        }

        this.goto()

        setTimeout(() => {
            const ev = new CustomEvent('move', {detail: response.movedata});
            this.dispatchEvent(ev);
        }, 0);

        // const rFenPos = this.validator.rFenPos;
        const [/* showChecks, */ isChecked, isCheckMated, isStaleMated] = this.activeColor === "w" ? 
        [/* this.validator.blackChecks, */ this.validator.isWhiteChecked, this.validator.isWhiteCheckMated, this.validator.isWhiteStaleMated] : 
        [/* this.validator.whiteChecks, */ this.validator.isBlackChecked, this.validator.isBlackCheckMated, this.validator.isBlackStaleMated];
        if (isChecked()) {
            setTimeout(() => {
                const mate = isCheckMated();
                const ev = new CustomEvent(mate ? 'checkmate' : 'check', {detail: response.movedata});
                this.dispatchEvent(ev);
            }, 10);
        } else if (isStaleMated()) {
            setTimeout(() => {
                const ev = new CustomEvent('stalemate', {detail: response.movedata});
                this.dispatchEvent(ev);
            }, 10);
        } else {
            let reason = null;
            let result = '*';
            if (this.validator.isThreeFold()) {
                reason = 'Threefold repetition';
                result = '1/2-1/2';
            } else if (this.validator.isFiftyMovesRule()) {
                reason = 'Fifty moves rule';
                result = '1/2-1/2';
            }
            if (reason) {
                setTimeout(() => {
                    const ev = new CustomEvent('draw', {detail: {movedata: response.movedata, result, reason}});
                    this.dispatchEvent(ev);
                    this.debug && console.log("Dispatching draw event");
                }, 10)
            }
        }
        return true;
    }

    onclickordrag = ev => {
        // ev && this.debug && console.log(`Type: ${ev.type} - Target: ${ev.target.constructor.name}.`)
        const square = ev.target.constructor.name === "HTMLDivElement" ? ev.target : ev.target.parentNode;
        const index = +square.getAttribute("number");
        if (this.selectedSquare === 64) {
            if (square.isEmpty) return;
            if (this.boardMode === boardModes.play && !this.canHumanMove(index)) return;
            return this.selectedSquare = index;
        } else if (+index === +this.selectedSquare) {
            return this.selectedSquare = 64;
        } else {
            // this.debug && console.clear() && console.log(`Msg from 'onclickordrag': Will try to move from ${this.selectedSquare} to ${index}`)
            if (this.selectedSquare >= 0) {
                if (index === -13) {
                    this.unset(this.selectedSquare);
                    return this.selectedSquare = 64;
                }
                if (this.boardMode !== boardModes.setup) {
                    return this.tryMove(this.selectedSquare, index);
                } else {
                    this.set(index, this.root.querySelector(`div.square[number="${this.selectedSquare}"]`)
                    .getAttribute('figure'));
                    this.unset(this.selectedSquare);
                    return this.selectedSquare = 64;
                }
            } else {
                if (index < 0) return this.selectedSquare = index;
                // console.log("Trying to move from ", this.selectedSquare, " to ", index);
                this.set(index, this.root.querySelector(`div.square[number="${this.selectedSquare}"]`)
                .getAttribute('figure'));
                return this.selectedSquare = 64;
            }
        }
    }

    onclick = ev => {

        ev && ev.stopPropagation();
        ev && ev.preventDefault();
        if (this._waitingForPromotion) return false;
        const evtarget = ev.target.constructor.name === "HTMLImageElement" ? ev.target.parentNode : ev.target;
        ev && this.debug && console.log(`Click on X: ${ev.x} - Y: ${ev.y} - Number: ${evtarget.getAttribute("number")}`);
        return this.onclickordrag(ev);
    }

    ondragstart = ev => {
        ev && ev.stopPropagation();
        if (this._waitingForPromotion) {
            ev.preventDefault();
            return false;
        }
  //      ev && this.debug && console.log(`Dragstart on X: ${ev.x} - Y: ${ev.y}`);
        //this.createGhost(ev);
        //const dragImage = new Image(0, 0);
        //dragImage.src = onePixel;
        //ev.dataTransfer.setDragImage(dragImage, ev.x, ev.y);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.height = this.squareSize;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(ev.target, 0, 0);
//        canvas.style.backgroundColor = 'transparent';
//        document.body.appendChild(canvas);
        ev.dataTransfer.setDragImage(canvas, 0, 0);
        ev.target.style.opacity = .1;
        this.onclickordrag(ev);
    }

    ondrag = ev => {
        // ev && this.debug && console.log(`Dragging on X: ${ev.x} - Y: ${ev.y}`);
    }

    ondragend = ev => {
 //       ev && this.debug && console.log(`Dragging ended at X: ${ev.x} - Y: ${ev.y}`);
        ev.target.style.opacity = "1";
        if (this.ghostImage) this.destroyGhost();
        // return this.onclickordrag(ev);
    }

    ondragenter = ev => {
        //ev && this.debug && console.log(`Element entered to square ${ev.target.getAttribute("index")} on X: ${ev.x} - Y: ${ev.y}`);
        ev.preventDefault();
    }

    ondragover = ev => {
        //ev && this.debug && console.log(`Dragging element over square ${ev.target.getAttribute("index")} on X: ${ev.x} - Y: ${ev.y}`);
        ev.preventDefault();
        if (this.ghostImage) {
            const index = ev.target.getAttribute("index");
            const {row, col} = index2rowcol(index ^ 56);
            // this.debug && console.log("Ghost image exists, now moving it.");
            this.ghostImage.style.top = `${this.top + this.squareSize * row}px`;
            this.ghostImage.style.left = `${this.left + this.squareSize * col}px`;
        }        
    }

    ondragleave = ev => {
        //ev && this.debug && console.log(`Element leaving square ${ev.target.getAttribute("index")} on X: ${ev.x} - Y: ${ev.y}`);
        ev.preventDefault();
    }

    ondrop = ev => {
 //       ev && this.debug && console.log(`Element dropped on square ${ev.target.getAttribute("index")} on X: ${ev.x} - Y: ${ev.y}`);
        ev.preventDefault();
        return this.onclickordrag(ev);
    }


    addProperties() {
        this.squares.forEach( sq => {
            sq.number = +sq.getAttribute('number');
            sq.index = +sq.getAttribute('index');
            sq.row = +sq.getAttribute('row');
            sq.col = +sq.getAttribute('col');
            sq.figure = sq.getAttribute('figure');
            sq.image = sq.querySelector("img");
            sq.name = rowcol2name(sq.row, sq.col);
            sq.isBlack = blackFigures.indexOf(sq.figure) !== -1;
            sq.isWhite = whiteFigures.indexOf(sq.figure) !== -1;
            sq.isEmpty = sq.figure == "0";
            sq.isBlackPromotion = sq.row === 0;
            sq.isWhitePromotion = sq.row === 7;
            sq.isWhiteKingOrigin = sq.index === 4;
            sq.isBlackKingOrigin = sq.index === 60;
            sq.isEnPassant = sq.name === this.enPassant;
        })
    }

    addListeners() {
        this.promotionDialog && this.promotionDialog.addEventListener("cancel", this.oncanceldialog);
        this.promotionDialog && this.promotionDialogTargets.forEach(t => t.addEventListener("click", this.onclickdialog));
        this.squares && this.squares.length && this.squares.forEach( sq => {
            sq.addEventListener('click', this.onclick);
            sq.addEventListener('dragenter', this.ondragenter);
            sq.addEventListener('dragover', this.ondragover);
            sq.addEventListener('dragleave', this.ondragleave);
            sq.addEventListener('drop', this.ondrop);
        })
        this.figures && this.figures.length && this.figures.forEach(f => {
            f.addEventListener('dragstart', this.ondragstart);
            f.addEventListener('drag', this.ondrag);
            f.addEventListener('dragend', this.ondragend);
        })
        this.root.querySelector('#setup-reset-btn') && this.root.querySelector('#setup-reset-btn')
                                     .addEventListener('click', this.onclickReset);
        this.root.querySelector('#active-color-btn') && this.root.querySelector('#active-color-btn')
                                     .addEventListener('click', this.toggleActiveColor);
        this.root.querySelector('#human-side-btn') && this.root.querySelector('#human-side-btn')
                                     .addEventListener('click', this.toggleHumanSide);
        this.root.querySelector("#w-king-castle-btn") && this.root.querySelector("#w-king-castle-btn")
                                     .addEventListener('click', this.toggleWKCastling);
        this.root.querySelector("#w-queen-castle-btn") && this.root.querySelector("#w-queen-castle-btn")
                                     .addEventListener('click', this.toggleWQCastling);
        this.root.querySelector("#b-king-castle-btn") && this.root.querySelector("#b-king-castle-btn")
                                     .addEventListener('click', this.toggleBKCastling);
        this.root.querySelector("#b-queen-castle-btn") && this.root.querySelector("#b-queen-castle-btn")
                                     .addEventListener('click', this.toggleBQCastling);
        this.root.querySelectorAll('div.autoprom').forEach(ap => ap.addEventListener('click', this.handleAutopromotion));
    }

    removeListeners() {
        this.promotionDialog && this.promotionDialog.removeEventListener("cancel", this.oncanceldialog);
        this.promotionDialog && this.promotionDialogTargets.forEach(t => t.removeEventListener("click", this.onclickdialog));
        this.squares && this.squares.length && this.squares.forEach( sq => {
            sq.removeEventListener('click', this.onclick);
            sq.removeEventListener('dragenter', this.ondragenter);
            sq.removeEventListener('dragover', this.ondragover);
            sq.removeEventListener('dragleave', this.ondragleave);
            sq.removeEventListener('drop', this.ondrop);
        })
        this.figures && this.figures.length && this.figures.forEach(f => {
            f.removeEventListener('dragstart', this.ondragstart);
            f.removeEventListener('drag', this.ondrag);
            f.removeEventListener('dragend', this.ondragend);
        })
        this.root.querySelector('#setup-reset-btn') && this.root.querySelector('#setup-reset-btn')
                                    .removeEventListener('click', this.onclickReset);
        this.root.querySelector('#active-color-btn') && this.root.querySelector('#active-color-btn')
                                    .removeEventListener('click', this.toggleActiveColor);
        this.root.querySelector('#human-side-btn') && this.root.querySelector('#human-side-btn')
                                    .removeEventListener('click', this.toggleHumanSide);
       this.root.querySelector("#w-king-castle-btn") && this.root.querySelector("#w-king-castle-btn")
                                    .removeEventListener('click', this.toggleWKCastling);
       this.root.querySelector("#w-queen-castle-btn") && this.root.querySelector("#w-queen-castle-btn")
                                    .removeEventListener('click', this.toggleWQCastling);
       this.root.querySelector("#b-king-castle-btn") && this.root.querySelector("#b-king-castle-btn")
                                    .removeEventListener('click', this.toggleBKCastling);
       this.root.querySelector("#b-queen-castle-btn") && this.root.querySelector("#b-queen-castle-btn")
                                    .removeEventListener('click', this.toggleBQCastling);
       this.root.querySelectorAll('div.autoprom').forEach(ap => ap.removeEventListener('click', this.handleAutopromotion));

    }

    canHumanMove(fromSquare, fen = this.fen) {
        if (typeof(fromSquare) === 'string') fromSquare = san2square(fromSquare);
        let realSquare = null;
        for(let sq of this.squares) {
            if (+sq.number === fromSquare) {
                realSquare = sq;
                break;
            }
        } 
        if (!realSquare) return false;
        if (realSquare.isEmpty) return false;
        const activeColor = fen2obj(fen).activeColor;
        if (activeColor === 'w' && realSquare.isBlack) return false;
        if (activeColor === 'b' && realSquare.isWhite) return false;

        const { analysis, view, setup } = boardModes;
        const mode = this.boardMode;
        if (mode === analysis || mode === view || mode === setup) {
            return true;
        }
        if (activeColor === 'w' && this.humanSide === 'b') return false;
        if (activeColor === 'b' && this.humanSide === 'w') return false;

        return true;

    }

}

window.customElements.define("chess-board", ChessBoard);

export class ChessCard extends HTMLElement {
    constructor() {
        super();
        this._parent = null;
        this.root = this.attachShadow({mode: 'closed'});
    }

    get fontSize() {
        const attrFontSize = this.getAttribute('font-size');
        if ( attrFontSize === null) {
            return 1.7;
        } else {
            return +attrFontSize;
        }
    }
    set fontSize(value) {
        if (isNaN(value)) return;
        this.setAttribute('font-size', value);
    }

    static get observedAttributes() {return ['font-size'];}

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (name === 'font-size')
            this.render();
    }

    connectedCallback() {
        //console.log("Rendering from connectedCallback!");
        document.body.addEventListener('keyup', this.onkeyup);
        this.render();
    }

    disconnectedCallback() {
        document.body.removeEventListener('keyup', this.onkeyup);
    }

    onclick = ev => this.parent.goto(+ev.target.title)

    onkeyup = ev => {
        // console.log(ev.keyCode);
        if ([37, 39].includes(ev.keyCode)) {
            ev.stopPropagation();
            ev.preventDefault();
        }
        if (ev.keyCode === 37) return this.parent.prev() && false;
        if (ev.keyCode === 39) return this.parent.next() && false;
        return false;
    }

    addHandlers() {
        this && this.sans && this.sans.forEach(s => s.addEventListener('click', this.onclick))
    }

    removeHandlers() {
        this && this.sans && this.sans.forEach(s => s.removeEventListener('click', this.onclick))
    }

    render() {
        this.removeHandlers();
        const size = this.parent.boardSize;
        const current = this.parent.current;
        const foreColor = boardColors[this.parent.backgroundSchema].dark;
        const backColor = boardColors[this.parent.backgroundSchema].light;
        let html = `
        <style>
            span.san {
                cursor: pointer;
                font-size: ${this.fontSize}vw;
            }
            span.san:hover {
                background: lightskyblue;
            }
            span.san[title="${current}"] {
                color: ${foreColor};
                background: ${backColor};
            }
        </style>
        <div class = "panel"
         style="border: none; 
                width: ${size}px;
                /* top: ${this.parent ? this.parent.top : 0}px; */ 
                /* position: fixed; */
                min-width: ${size}px;
                height: ${size - 10}px;
                min-height: ${size - 10}px;
                padding: 5px;
                flex-wrap: wrap;
                overflow: auto;
                "
        >
       `
       html += this.validator ? this.validator.toHtml() : '';
       html += `</div>`
       this.root.innerHTML = html;
       this.addHandlers();
       this.root.querySelector('.panel').scrollTop = this.root.querySelector('.panel').scrollHeight;
    }

    get sans() {
        return this.root.querySelectorAll("span.san");
    }

    get parent() {
        if (!this._parent) {
            this._parent = document.querySelector("chess-board");
        }
        if (!this._parent) throw new Error("No ChessBoard to attach to.");
        return this._parent;
    }

    set parent(newChessBoard) {
        if (newChessBoard.constructor.name !== 'ChessBoard') throw new Error("Chess card parent must be a Chess Board.");
        this._parent = newChessBoard;
    }

    get validator() {
        return this.parent ? this.parent.validator : null;
    }

}

window.customElements.define("chess-card", ChessCard);

