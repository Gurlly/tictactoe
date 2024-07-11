
import {useState, useEffect} from 'react'

import Nav from "./component/Nav";
import Footer from "./component/Footer";

import { IoPersonOutline } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";

const player = [
  {
    name: "Player One",
    id: "player-one",
    action: "✕",
    box:[]
  },
  {
    name: "Player Two",
    id: "player-two",
    action: "〇",
    box:[]
  }
]

const box = [
  {
    id: 1,
    value: "",
    active: false
  },
  {
    id: 2,
    value: "",
    active: false
  },
  {
    id: 3,
    value: "",
    active: false
  },
  {
    id: 4,
    value: "",
    active: false
  },
  {
    id: 5,
    value: "",
    active: false
  },
  {
    id: 6,
    value: "",
    active: false
  },
  {
    id: 7,
    value: "",
    active: false
  },
  {
    id: 8,
    value: "",
    active: false
  },
  {
    id: 9,
    value: "",
    active: false
  }
]

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

function App() {

  const [dark, setDark] = useState(false);

  const [players, setPlayers] = useState(player);
  const [nameHolder, setNameHolder] = useState("");

  const [boxes, setBoxes] = useState(box);
  const [turn, setTurn] = useState(true);
  const [playerTurn, setPlayerTurn] = useState(players[0]);
  const [winner, setWinner] = useState(false);

  const changeName = (id, name) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => 
        player.id === id ? { ...player, name } : player
      )
    );
    setNameHolder("");
  };

  const updateBox = (box) => {
    // Checks first if the box has no value in it.
    if (box.value === "") {
      // Update the empty box
      setBoxes(prevBoxes =>
        prevBoxes.map(b =>
          b.id === box.id ? { ...b, value: playerTurn.action, active: true } : b
        )
      );

      // Update the box array of the player.
      setPlayers(prevPlayers =>
        prevPlayers.map(player =>
          player.id === playerTurn.id
            ? { ...player, box: [...player.box, box.id] }
            : player
        )
      );

      // Check for a winner
      const playerBoxes = [...playerTurn.box, box.id];

      for (const combination of winningCombinations) {
        if (combination.every(id => playerBoxes.includes(id))) {
          setWinner(true);
          return;
        }
      }

      // Switch the turn to the other player
      setTurn(!turn);
    }
  }

  const resetGame = () => {
    setBoxes(box);
    setPlayers(player);
    setTurn(true);
    setWinner(false);
    setPlayerTurn(players[0]);
  };

  useEffect(() => {
    if(dark) document.getElementById("rootElement").classList.add("dark");
    else document.getElementById("rootElement").classList.remove("dark");

    console.log(players);

  }, [dark, players])

  useEffect(() => {
    setPlayerTurn(turn ? players[0] : players[1]);
  }, [turn, players]);

  useEffect(() => {
    if (winner) {
      setBoxes(prevBoxes => 
        prevBoxes.map(box => ({ ...box, active: true }))
      );
    }
  }, [winner]);

  return (
    <div className="App h-dvh flex flex-col">
      <header className="navbar p-4 border-b-2 border-stone-800 bg-zinc-50
      dark:bg-stone-800 dark:text-zinc-50 dark:border-yellow-600
      ">
        <Nav dark={dark} setDark={setDark} />
      </header>

      <main className="w-max-full flex-1 px-4 py-5 lg:px-0 bg-zinc-200 text-stone-800 dark:bg-stone-500">
         <div className='md:container md:mx-auto h-full flex flex-col'>
            <div className='flex justify-between'>
              <div className='flex'>
                {
                  players.map(player => (
                    <label 
                    key={player.id}
                    htmlFor={player.id}
                    className='
                    p-1 mr-5 border-2 border-stone-800 bg-amber-500 dark:bg-amber-300 rounded-md cursor-pointer
                    '>
                      <IoPersonOutline/>
                    </label>
                  ))
                }
              </div>
              
              <button  
              className='
                p-1 border-2 border-stone-800 bg-stone-400 dark:bg-stone-200 rounded-md cursor-pointer
                  '
              onClick={()=>resetGame()}
              >
                <VscDebugRestart/>
              </button>
            </div>

            <div className='h-full flex flex-col justify-center'>
              <div className='grid grid-cols-3 max-w-96 md:max-w-lg justify-items-center self-center'>
                {
                  boxes.map(box => (
                    <button
                    key={box.id} 
                    className={`
                    border border-stone-800 flex items-center justify-center w-full h-28 p-14 md:p-20 text-2xl font-bold transition-colors ease-linear cursor-pointer
                    ${box.id % 2 === 0 ? "bg-zinc-200 hover:bg-red-200 dark:bg-stone-600" : "bg-zinc-50 hover:bg-green-200 dark:bg-stone-400"}
                    ${box.value === "✕" ? "disabled:bg-green-200" : "disabled:bg-red-200"}
                    `}
                    onClick={()=>{
                      updateBox(box);
                    }}
                    disabled={box.active}
                    >
                      {box.value}
                    </button>
                  ))
                }
              </div>
              <div className=" mt-3">
                {
                winner 
                  ? <h5 className='text-center'>{playerTurn.name} is the Winner</h5>
                  : <h5 className='text-center'>{playerTurn.name} turn</h5>
                }
              </div>
            </div>
         </div>
      </main>

      {/** Modals */}
      {
        players.map(player => (
          <div key={player.id}>
            <input className="modal-state" id={player.id} type="checkbox" />
            <div className="modal">
              <label className="modal-overlay"></label>
              <div className="modal-content min-w-max  flex flex-col gap-5 bg-zinc-50 text-stone-800 dark:bg-stone-800 dark:text-zinc-50">
                <label htmlFor={player.id} className="btn btn-sm btn-circle text-xl bg-zinc-50 dark:bg-stone-800 text-stone-800 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-stone-600 absolute right-4 top-4">✕</label>
                <h2 className="text-xl">{player.name}</h2>
                <div>
                  <div className="form-control relative w-full">
                    <input 
                    className="input bg-zinc-50 text-stone-800 dark:bg-stone-800 dark:text-zinc-50 dark:border-gray-300" 
                    placeholder="Player Name..." 
                    value={nameHolder}
                    onChange={(e) => setNameHolder(e.target.value)}
                    maxLength={10}
                    />
                    <button 
                    className="absolute inset-y-0 right-4 inline-flex items-center text-stone-800 dark:text-zinc-50"
                    onClick={() => changeName(player.id, nameHolder)}
                    >
                      <IoSend />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }

      <footer className="
      w-max-full p-5 border-t-2 border-stone-800 bg-zinc-50 text-stone-800 font-semibold text-lg
      dark:bg-stone-800 dark:text-zinc-50 dark:border-yellow-600
      ">
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
