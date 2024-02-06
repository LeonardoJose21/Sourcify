// // import { SearchCheckIcon } from "lucide-react";
// // import { useRouter } from "next/navigation";
// // import { useState } from "react";

// interface ConvBarProps {
//     lastSearch: string[];
//     history: string[];
// };
// export const ConversationBar = ({lastSearch=[], history=[] }: ConvBarProps) => {
//     let content = '';
    
//     // 
//     // const [searchHistory, updateHistory] = useState([]);

//     return (
//         <div className="flex flex-col p-2 space-y-1">

            
//             <span className="text-md text-white">
//                 History
//             </span>
//             <div className="max-h-20 flex flex-col-reverse hover:overflow-y-scroll">
//                 {lastSearch.length==0 &&(
//                     <span className="text-sm font-light text-white">
//                         No searches yet
//                     </span>
//                 )}
//                 {lastSearch.map((el, index) => (
//                     <button className="text-sm text-gray-200 hover:bg-sky-800 rounded p-1 text-left w-full max-h-6 overflow-clip"
//                         key={index}
//                     onClick={ setCurrentMessage(index)}>
//                            {el} 
//                     </button>
//                 ))
//                 }
//             </div>



//         </div>
//     )
// }
// export const setCurrentMessage = (index: number) => {
//     data.push(data[index])
// }
// export const data = [];
// export const lastSearch = [];