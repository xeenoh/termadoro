import { GetAllPomodoros } from "../db/queries.js";

export const printAllPomos = () =>{
    console.log( GetAllPomodoros()) ; 
}