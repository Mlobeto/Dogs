// import React, { useState,  } from "react";
// import { useDispatch,  } from "react-redux";

// import {deleteElementById} from "../../redux/actions"


//    export default function deleteID () {
//    const [dogState, setDogsState] = useState.("");
//    const dispatch = useDispatch();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (dogState.length === 0) {
//         return alert("Please input a id the Dog to start the search");
//       } else {
//         dispatch(deleteElementById(dogState));
//         setDogsState("");
//       }
//     }
  

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         ID del elemento a borrar:
//         <input type="text" value={dogState} onChange={(e) => setDogsState(e.target.value)} />
//       </label>
//       <button type="submit">Delete</button>
//     </form>
//   );
// };


